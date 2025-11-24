"use client"

import { useState } from 'react'
import { Metadata } from 'next'
import QRCode from 'qrcode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Download, Wifi, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function WiFiQRGenerator() {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA')
  const [hidden, setHidden] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateWiFiQR = async () => {
    if (!ssid.trim()) {
      toast.error('Please enter a network name (SSID)')
      return
    }

    if (encryption !== 'nopass' && !password.trim()) {
      toast.error('Please enter a password for secured networks')
      return
    }

    setIsGenerating(true)
    toast.info('Generating WiFi QR code...')

    try {
      // WiFi QR code format: WIFI:T:WPA;S:mynetwork;P:mypassword;H:false;;
      let wifiString = `WIFI:T:${encryption};S:${ssid};`
      
      if (encryption !== 'nopass') {
        wifiString += `P:${password};`
      }
      
      wifiString += `H:${hidden};;`

      const qrDataUrl = await QRCode.toDataURL(wifiString, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 1,
        margin: 1,
        width: 1000,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })

      setQrCode(qrDataUrl)
      toast.success('WiFi QR code generated successfully!')
    } catch (error) {
      console.error('Error generating WiFi QR code:', error)
      toast.error('Failed to generate QR code. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQR = () => {
    if (!qrCode) {
      toast.error('Please generate a QR code first')
      return
    }

    const link = document.createElement('a')
    link.href = qrCode
    link.download = `wifi-${ssid.replace(/\s+/g, '_')}-qr.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR code downloaded!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wifi className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">WiFi QR Code Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your WiFi credentials instantly. Generate a QR code that automatically connects devices to your network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>WiFi Network Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ssid">Network Name (SSID) *</Label>
                <Input
                  id="ssid"
                  type="text"
                  placeholder="Enter your WiFi network name"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">The exact name of your WiFi network</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="encryption">Security Type *</Label>
                <Select value={encryption} onValueChange={(value: any) => setEncryption(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WPA">WPA/WPA2/WPA3 (Most common)</SelectItem>
                    <SelectItem value="WEP">WEP (Legacy)</SelectItem>
                    <SelectItem value="nopass">No Password (Open)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Check your router settings if unsure</p>
              </div>

              {encryption !== 'nopass' && (
                <div className="space-y-2">
                  <Label htmlFor="password">WiFi Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your WiFi password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Your password is processed locally and never stored</p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hidden"
                  checked={hidden}
                  onCheckedChange={(checked) => setHidden(checked as boolean)}
                />
                <Label htmlFor="hidden" className="text-sm font-normal cursor-pointer">
                  Hidden Network (SSID not broadcast)
                </Label>
              </div>

              <Button
                onClick={generateWiFiQR}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? 'Generating...' : 'Generate WiFi QR Code'}
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card>
            <CardHeader>
              <CardTitle>Your WiFi QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              {qrCode ? (
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                    <img src={qrCode} alt="WiFi QR Code" className="w-full max-w-sm" />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Network Details:</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>SSID:</strong> {ssid}</p>
                      <p><strong>Security:</strong> {encryption === 'nopass' ? 'Open Network' : encryption}</p>
                      {encryption !== 'nopass' && (
                        <p><strong>Password:</strong> {'•'.repeat(password.length)}</p>
                      )}
                      <p><strong>Hidden:</strong> {hidden ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  <Button onClick={downloadQR} className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <Wifi className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Fill in your WiFi details and click generate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use Your WiFi QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                <h4 className="font-semibold">Print or Display</h4>
                <p className="text-sm text-gray-600">
                  Print the QR code or display it on a screen where guests can easily scan it.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                <h4 className="font-semibold">Scan with Camera</h4>
                <p className="text-sm text-gray-600">
                  Guests open their camera app and point it at the QR code. Most modern phones detect WiFi QR codes automatically.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                <h4 className="font-semibold">Auto-Connect</h4>
                <p className="text-sm text-gray-600">
                  The device will automatically connect to your WiFi network without typing the password.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 className="font-semibold text-sm mb-2">📱 Compatibility Note:</h4>
              <p className="text-sm text-gray-700">
                WiFi QR codes work on iOS 11+, Android 10+, and most modern devices. Older devices may need a third-party QR scanner app.
              </p>
            </div>

            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
              <h4 className="font-semibold text-sm mb-2">🔒 Privacy & Security:</h4>
              <p className="text-sm text-gray-700">
                Your WiFi credentials are processed entirely in your browser and never sent to our servers. The QR code is generated locally for your privacy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Popular Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="text-2xl">🏠</div>
                <div>
                  <h4 className="font-semibold text-sm">Home Networks</h4>
                  <p className="text-xs text-gray-600">Let guests connect easily without asking for passwords</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">🏢</div>
                <div>
                  <h4 className="font-semibold text-sm">Offices</h4>
                  <p className="text-xs text-gray-600">Simplify guest WiFi access for clients and visitors</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">☕</div>
                <div>
                  <h4 className="font-semibold text-sm">Cafes & Restaurants</h4>
                  <p className="text-xs text-gray-600">Display QR codes on tables or menus for customer access</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-2xl">🏨</div>
                <div>
                  <h4 className="font-semibold text-sm">Hotels & Airbnb</h4>
                  <p className="text-xs text-gray-600">Include in welcome packets for seamless guest experience</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
