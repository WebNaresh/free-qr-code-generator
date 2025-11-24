"use client"

import { useState, useRef } from 'react'
import jsQR from 'jsqr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Camera, CheckCircle, XCircle, Info, Link as LinkIcon, Wifi, Mail, Phone, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface QRValidationResult {
  isValid: boolean
  data: string
  type: string
  details: Record<string, string>
  format: string
  size: {
    width: number
    height: number
  }
}

export default function QRValidator() {
  const [validationResult, setValidationResult] = useState<QRValidationResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const detectQRType = (data: string): { type: string; details: Record<string, string> } => {
    const details: Record<string, string> = {}
    
    // URL
    if (data.startsWith('http://') || data.startsWith('https://')) {
      try {
        const url = new URL(data)
        details['URL'] = data
        details['Protocol'] = url.protocol
        details['Domain'] = url.hostname
        details['Path'] = url.pathname
        if (url.search) details['Query Parameters'] = url.search
        return { type: 'URL', details }
      } catch {
        return { type: 'URL', details: { 'URL': data } }
      }
    }
    
    // Email
    if (data.startsWith('mailto:')) {
      details['Email'] = data.replace('mailto:', '')
      return { type: 'Email', details }
    }
    
    // Phone
    if (data.startsWith('tel:')) {
      details['Phone Number'] = data.replace('tel:', '')
      return { type: 'Phone', details }
    }
    
    // SMS
    if (data.startsWith('sms:') || data.startsWith('smsto:')) {
      const parts = data.split(':')
      details['Phone Number'] = parts[1]?.split('?')[0] || ''
      const message = data.match(/body=([^&]*)/)?.[1]
      if (message) details['Message'] = decodeURIComponent(message)
      return { type: 'SMS', details }
    }
    
    // WiFi
    if (data.startsWith('WIFI:')) {
      const ssidMatch = data.match(/S:([^;]+)/)
      const typeMatch = data.match(/T:([^;]+)/)
      const passMatch = data.match(/P:([^;]+)/)
      const hiddenMatch = data.match(/H:([^;]+)/)
      
      if (ssidMatch) details['SSID'] = ssidMatch[1]
      if (typeMatch) details['Encryption'] = typeMatch[1]
      if (passMatch) details['Password'] = passMatch[1]
      if (hiddenMatch) details['Hidden Network'] = hiddenMatch[1] === 'true' ? 'Yes' : 'No'
      
      return { type: 'WiFi', details }
    }
    
    // vCard
    if (data.startsWith('BEGIN:VCARD')) {
      const nameMatch = data.match(/FN:([^\n]+)/)
      const emailMatch = data.match(/EMAIL[^:]*:([^\n]+)/)
      const telMatch = data.match(/TEL[^:]*:([^\n]+)/)
      const orgMatch = data.match(/ORG:([^\n]+)/)
      const titleMatch = data.match(/TITLE:([^\n]+)/)
      
      if (nameMatch) details['Name'] = nameMatch[1]
      if (emailMatch) details['Email'] = emailMatch[1]
      if (telMatch) details['Phone'] = telMatch[1]
      if (orgMatch) details['Organization'] = orgMatch[1]
      if (titleMatch) details['Title'] = titleMatch[1]
      
      return { type: 'vCard', details }
    }
    
    // Calendar Event
    if (data.startsWith('BEGIN:VEVENT')) {
      const summaryMatch = data.match(/SUMMARY:([^\n]+)/)
      const locationMatch = data.match(/LOCATION:([^\n]+)/)
      const startMatch = data.match(/DTSTART:([^\n]+)/)
      
      if (summaryMatch) details['Event'] = summaryMatch[1]
      if (locationMatch) details['Location'] = locationMatch[1]
      if (startMatch) details['Start Time'] = startMatch[1]
      
      return { type: 'Calendar Event', details }
    }
    
    // Geo Location
    if (data.startsWith('geo:')) {
      const coords = data.replace('geo:', '').split(',')
      if (coords.length >= 2) {
        details['Latitude'] = coords[0]
        details['Longitude'] = coords[1]
      }
      return { type: 'Geo Location', details }
    }
    
    // Plain text
    details['Content'] = data
    details['Length'] = `${data.length} characters`
    return { type: 'Plain Text', details }
  }

  const processQRCode = (imageData: ImageData) => {
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    })

    if (code && code.data) {
      const { type, details } = detectQRType(code.data)
      
      const result: QRValidationResult = {
        isValid: true,
        data: code.data,
        type,
        details,
        format: 'QR Code',
        size: {
          width: imageData.width,
          height: imageData.height
        }
      }
      
      setValidationResult(result)
      toast.success('QR code validated successfully!')
      return true
    }
    
    return false
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    setIsProcessing(true)
    setValidationResult(null)

    try {
      const reader = new FileReader()
      
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            toast.error('Failed to process image')
            setIsProcessing(false)
            return
          }
          
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          
          const success = processQRCode(imageData)
          
          if (!success) {
            setValidationResult({
              isValid: false,
              data: '',
              type: 'Invalid',
              details: { 'Error': 'No valid QR code detected in the image' },
              format: 'Unknown',
              size: { width: img.width, height: img.height }
            })
            toast.error('No valid QR code found in the image')
          }
          
          setPreviewImage(canvas.toDataURL())
          setIsProcessing(false)
        }
        
        img.onerror = () => {
          toast.error('Failed to load image')
          setIsProcessing(false)
        }
        
        img.src = event.target?.result as string
      }
      
      reader.onerror = () => {
        toast.error('Failed to read file')
        setIsProcessing(false)
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error processing file:', error)
      toast.error('Failed to process the image')
      setIsProcessing(false)
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }
      
      setStream(mediaStream)
      setIsScanning(true)
      toast.info('Camera started. Position QR code in view.')
      
      scanFromCamera()
    } catch (error) {
      console.error('Error accessing camera:', error)
      toast.error('Failed to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsScanning(false)
  }

  const scanFromCamera = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanFromCamera)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const success = processQRCode(imageData)

    if (success) {
      setPreviewImage(canvas.toDataURL())
      stopCamera()
    } else {
      requestAnimationFrame(scanFromCamera)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'URL': return <LinkIcon className="h-5 w-5" />
      case 'WiFi': return <Wifi className="h-5 w-5" />
      case 'Email': return <Mail className="h-5 w-5" />
      case 'Phone': return <Phone className="h-5 w-5" />
      case 'SMS': return <Phone className="h-5 w-5" />
      case 'vCard': return <FileText className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">QR Code Validator & Decoder</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a QR code image or scan with your camera to validate and decode its contents
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Validate QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 bg-blue-600 hover:bg-blue-700"
                  disabled={isProcessing || isScanning}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8" />
                    <span>Upload QR Code Image</span>
                  </div>
                </Button>
              </div>

              <div>
                {!isScanning ? (
                  <Button
                    onClick={startCamera}
                    className="w-full h-32 bg-green-600 hover:bg-green-700"
                    disabled={isProcessing}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Camera className="h-8 w-8" />
                      <span>Scan with Camera</span>
                    </div>
                  </Button>
                ) : (
                  <Button
                    onClick={stopCamera}
                    className="w-full h-32 bg-red-600 hover:bg-red-700"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <XCircle className="h-8 w-8" />
                      <span>Stop Camera</span>
                    </div>
                  </Button>
                )}
              </div>
            </div>

            {/* Camera Preview */}
            {isScanning && (
              <div className="mt-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full"
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 border-4 border-green-500 opacity-50 pointer-events-none"></div>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Validation Result */}
        {validationResult && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>QR Code Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {previewImage && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img 
                      src={previewImage} 
                      alt="QR Code" 
                      className="w-full rounded"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {validationResult.isValid ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  Validation Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className={validationResult.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <AlertDescription>
                    {validationResult.isValid ? 
                      '✅ Valid QR code detected and decoded successfully' : 
                      '❌ No valid QR code found in the image'}
                  </AlertDescription>
                </Alert>

                {validationResult.isValid && (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(validationResult.type)}
                        <h3 className="font-semibold">Type: {validationResult.type}</h3>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        {Object.entries(validationResult.details).map(([key, value]) => (
                          <div key={key} className="border-b border-blue-100 pb-2 last:border-0">
                            <p className="text-xs text-gray-600 font-medium">{key}</p>
                            <p className="text-sm break-all mt-1">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Technical Details</h4>
                      <div className="space-y-1 text-xs">
                        <p><strong>Format:</strong> {validationResult.format}</p>
                        <p><strong>Image Size:</strong> {validationResult.size.width} × {validationResult.size.height}px</p>
                        <p><strong>Data Length:</strong> {validationResult.data.length} characters</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <h4 className="font-semibold text-sm mb-2">🔒 Privacy Note</h4>
                      <p className="text-xs text-gray-700">
                        All QR code processing happens locally in your browser. No data is sent to our servers.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use the QR Code Validator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                <h4 className="font-semibold">Upload or Scan</h4>
                <p className="text-sm text-gray-600">
                  Choose to upload an image file containing a QR code, or use your device camera to scan in real-time.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                <h4 className="font-semibold">Automatic Detection</h4>
                <p className="text-sm text-gray-600">
                  Our validator automatically detects and decodes the QR code, identifying its type and contents.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                <h4 className="font-semibold">View Details</h4>
                <p className="text-sm text-gray-600">
                  See the decoded information, QR type, and technical details all processed securely in your browser.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
              <h4 className="font-semibold text-sm mb-2">✨ Supported QR Types:</h4>
              <ul className="text-sm text-gray-700 space-y-1 grid md:grid-cols-2 gap-2">
                <li>• URLs and Website Links</li>
                <li>• WiFi Network Credentials</li>
                <li>• Email Addresses</li>
                <li>• Phone Numbers & SMS</li>
                <li>• vCard Contact Information</li>
                <li>• Calendar Events</li>
                <li>• Geo Locations</li>
                <li>• Plain Text</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
