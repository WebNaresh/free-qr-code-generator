"use client"

import { useState } from 'react'
import QRCode from 'qrcode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Download, User, Mail, Phone, Building, MapPin, Globe } from 'lucide-react'
import { toast } from 'sonner'

export default function VCardQRGenerator() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    email: '',
    phone: '',
    mobile: '',
    website: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    notes: ''
  })

  const [qrCode, setQrCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateVCardString = () => {
    // vCard 3.0 format
    let vcard = 'BEGIN:VCARD\n'
    vcard += 'VERSION:3.0\n'
    
    // Name
    if (formData.firstName || formData.lastName) {
      vcard += `N:${formData.lastName};${formData.firstName};;;\n`
      vcard += `FN:${formData.firstName} ${formData.lastName}\n`
    }
    
    // Organization
    if (formData.organization) {
      vcard += `ORG:${formData.organization}\n`
    }
    
    // Title
    if (formData.title) {
      vcard += `TITLE:${formData.title}\n`
    }
    
    // Email
    if (formData.email) {
      vcard += `EMAIL;TYPE=INTERNET,WORK:${formData.email}\n`
    }
    
    // Phone numbers
    if (formData.phone) {
      vcard += `TEL;TYPE=WORK,VOICE:${formData.phone}\n`
    }
    
    if (formData.mobile) {
      vcard += `TEL;TYPE=CELL:${formData.mobile}\n`
    }
    
    // Website
    if (formData.website) {
      vcard += `URL:${formData.website}\n`
    }
    
    // Address
    if (formData.street || formData.city || formData.state || formData.zip || formData.country) {
      vcard += `ADR;TYPE=WORK:;;${formData.street};${formData.city};${formData.state};${formData.zip};${formData.country}\n`
    }
    
    // Notes
    if (formData.notes) {
      vcard += `NOTE:${formData.notes}\n`
    }
    
    vcard += 'END:VCARD'
    
    return vcard
  }

  const generateQR = async () => {
    // Validation
    if (!formData.firstName && !formData.lastName) {
      toast.error('Please enter at least a first or last name')
      return
    }

    if (!formData.email && !formData.phone && !formData.mobile) {
      toast.error('Please enter at least one contact method (email or phone)')
      return
    }

    setIsGenerating(true)
    toast.info('Generating contact QR code...')

    try {
      const vcardString = generateVCardString()
      
      const qrDataUrl = await QRCode.toDataURL(vcardString, {
        errorCorrectionLevel: 'M',
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
      toast.success('Contact QR code generated successfully!')
    } catch (error) {
      console.error('Error generating vCard QR code:', error)
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
    const fileName = `contact-${formData.firstName || 'card'}-${formData.lastName || 'qr'}.png`
    link.download = fileName.replace(/\s+/g, '_')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR code downloaded!')
  }

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      organization: '',
      title: '',
      email: '',
      phone: '',
      mobile: '',
      website: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      notes: ''
    })
    setQrCode('')
    toast.success('Form cleared!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="h-10 w-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">vCard QR Code Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a digital business card QR code. Share your contact information instantly with a single scan.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-600" />
                    Personal Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Professional Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    Contact Methods
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Work Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile *</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Address (Optional)
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="San Francisco"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="CA"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP/Postal Code</Label>
                        <Input
                          id="zip"
                          value={formData.zip}
                          onChange={(e) => handleInputChange('zip', e.target.value)}
                          placeholder="94102"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="USA"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Additional information..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={generateQR}
                    disabled={isGenerating}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {isGenerating ? 'Generating...' : 'Generate vCard QR Code'}
                  </Button>
                  <Button onClick={clearForm} variant="outline">
                    Clear Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* QR Code Display */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Your Contact QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                {qrCode ? (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                      <img src={qrCode} alt="vCard QR Code" className="w-full" />
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Contact Preview:</h4>
                      <div className="space-y-1 text-xs">
                        {(formData.firstName || formData.lastName) && (
                          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                        )}
                        {formData.title && <p><strong>Title:</strong> {formData.title}</p>}
                        {formData.organization && <p><strong>Company:</strong> {formData.organization}</p>}
                        {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
                        {formData.mobile && <p><strong>Mobile:</strong> {formData.mobile}</p>}
                        {formData.website && <p><strong>Website:</strong> {formData.website}</p>}
                      </div>
                    </div>

                    <Button onClick={downloadQR} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-12 text-center">
                    <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Fill in your details and generate your contact QR code</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use Your vCard QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">1</div>
                <h4 className="font-semibold">Add to Materials</h4>
                <p className="text-sm text-gray-600">
                  Print on business cards, email signatures, presentations, or display on your website.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">2</div>
                <h4 className="font-semibold">Scan to Connect</h4>
                <p className="text-sm text-gray-600">
                  Others scan your QR code with their smartphone camera to instantly access your contact info.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">3</div>
                <h4 className="font-semibold">Save Contact</h4>
                <p className="text-sm text-gray-600">
                  Your details appear ready to save directly to their phone contacts with one tap.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">4</div>
                <h4 className="font-semibold">Stay Connected</h4>
                <p className="text-sm text-gray-600">
                  No more manual typing or lost business cards. Networking made simple and error-free.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
              <h4 className="font-semibold text-sm mb-2">✨ Pro Tips:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Include your QR code in email signatures for easy contact sharing</li>
                <li>• Print on the back of business cards for a modern touch</li>
                <li>• Use in LinkedIn posts or professional social media profiles</li>
                <li>• Perfect for conference badges and networking events</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
