"use client"

import type React from "react"

import { useState, useRef } from "react"
import QRCode from "qrcode"
import html2canvas from "html2canvas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Star, Globe, Upload, X, Palette, Sparkles } from "lucide-react"
import { trackQRGeneration } from "@/lib/analytics"
import AnalyticsDashboard from "./AnalyticsDashboard"
import CustomizationPanel from "./CustomizationPanel"
import TemplateSelector from "./TemplateSelector"
import { type QRCustomization, defaultCustomization } from "@/lib/customization"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [qrType, setQrType] = useState<"feedback" | "website">("feedback")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [customization, setCustomization] = useState<QRCustomization>(defaultCustomization)
  const [showCustomization, setShowCustomization] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(url, {
        errorCorrectionLevel: "H",
        type: "image/png",
        quality: 1,
        margin: 1,
        width: 1000,
        color: {
          dark: customization.qrCodeColor,
          light: customization.qrCodeBackground,
        },
      })
      setQrCode(response)

      await trackQRGeneration({
        businessName,
        url,
        qrType,
        hasLogo: !!uploadedImage,
      })
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const downloadQRCodePage = async () => {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current, {
        scale: 2,
      })
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `${businessName.replace(/\s+/g, "_")}_${qrType}_qrcode.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getHeaderText = () => {
    if (customization.customHeader) return customization.customHeader
    return qrType === "feedback" ? "Give your feedback" : "Visit our website"
  }

  const getSubHeaderText = () => {
    if (customization.customSubheader) return customization.customSubheader
    return qrType === "feedback" ? "We value your opinion!" : "Discover more about us"
  }

  const getFooterText = () => {
    if (customization.customFooter) return customization.customFooter
    return qrType === "feedback" ? "Scan to share your thoughts" : "Scan to visit our website"
  }

  const getHeaderSizeClass = () => {
    const sizes = {
      small: "text-2xl",
      medium: "text-3xl",
      large: "text-4xl",
      xl: "text-5xl",
    }
    return sizes[customization.headerSize]
  }

  const getPaddingClass = () => {
    const paddings = {
      tight: "p-6",
      normal: "p-12",
      spacious: "p-16",
    }
    return paddings[customization.padding]
  }

  const getShadowClass = () => {
    const shadows = {
      none: "",
      light: "shadow-sm",
      medium: "shadow-lg",
      heavy: "shadow-2xl",
    }
    return shadows[customization.shadowIntensity]
  }

  const getLogoSizeClass = () => {
    const sizes = {
      small: "w-12 h-12",
      medium: "w-20 h-20",
      large: "w-32 h-32",
    }
    return sizes[customization.logoSize]
  }

  const applyTemplate = (templateCustomization: Partial<QRCustomization>) => {
    setCustomization({ ...customization, ...templateCustomization })
  }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">QR Code Generator</CardTitle>
          <p className="text-center text-gray-600">Free tool for businesses - Generate professional QR codes</p>
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowTemplates(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Templates
            </Button>
            <Button variant="outline" onClick={() => setShowCustomization(true)}>
              <Palette className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Type Selection */}
          <div className="space-y-4">
            <label className="text-lg font-semibold">Choose QR Code Type:</label>
            <div className="flex gap-4">
              <Button
                variant={qrType === "feedback" ? "default" : "outline"}
                onClick={() => setQrType("feedback")}
                className="flex-1 py-4"
              >
                <Star className="mr-2 h-5 w-5" />
                Feedback/Reviews
              </Button>
              <Button
                variant={qrType === "website" ? "default" : "outline"}
                onClick={() => setQrType("website")}
                className="flex-1 py-4"
              >
                <Globe className="mr-2 h-5 w-5" />
                Business Website
              </Button>
            </div>
          </div>

          <Input
            type="text"
            placeholder="Enter Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full text-lg"
            required
          />

          <Input
            type="text"
            placeholder={
              qrType === "feedback" ? "Enter Google Review URL or Feedback Link" : "Enter Business Website URL"
            }
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full text-lg"
            required
          />

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="text-lg font-semibold">Upload Logo/Image (Optional):</label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Choose Image
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploadedImage && (
                <Button variant="outline" size="sm" onClick={removeImage} className="text-red-600 hover:text-red-700">
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
            {uploadedImage && (
              <div className="flex justify-center">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded logo"
                  className="max-w-32 max-h-32 object-contain border rounded-lg"
                />
              </div>
            )}
          </div>

          <Button onClick={generateQRCode} className="w-full text-lg py-6" disabled={!businessName || !url}>
            Generate QR Code
          </Button>

          {qrCode && (
            <div className="mt-8 space-y-6">
              <div
                ref={qrCodeRef}
                className={`flex flex-col items-center justify-between ${getPaddingClass()} ${getShadowClass()} rounded-lg overflow-hidden`}
                style={{
                  aspectRatio: "1 / 1.414",
                  width: "100%",
                  maxWidth: "800px",
                  margin: "0 auto",
                  position: "relative",
                  backgroundColor: customization.backgroundColor,
                  borderRadius: `${customization.cornerRadius}px`,
                  fontFamily: customization.headerFont,
                  border: customization.showBorder ? `2px ${customization.borderStyle}` : "none",
                  borderColor: customization.primaryColor,
                }}
              >
                {/* Content */}
                <div className="z-10 text-center mb-8">
                  {uploadedImage && customization.logoPosition === "top" && (
                    <div className="mb-4">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Business logo"
                        className={`${getLogoSizeClass()} object-contain mx-auto`}
                      />
                    </div>
                  )}
                  <h2
                    className={`${getHeaderSizeClass()} font-bold mb-2`}
                    style={{ color: customization.primaryColor }}
                  >
                    {getHeaderText()}
                  </h2>
                  <p className="text-xl" style={{ color: customization.secondaryColor }}>
                    {getSubHeaderText()}
                  </p>
                </div>

                <div className="z-10 bg-white p-6 rounded-lg shadow-md">
                  <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-full max-w-sm mx-auto" />
                </div>

                <div className="z-10 text-center mt-8">
                  {uploadedImage && customization.logoPosition === "bottom" && (
                    <div className="mb-4">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Business logo"
                        className={`${getLogoSizeClass()} object-contain mx-auto`}
                      />
                    </div>
                  )}
                  <h3 className="text-3xl font-semibold" style={{ color: customization.primaryColor }}>
                    {businessName}
                  </h3>
                  {customization.showWebsite && (
                    <p className="text-xl mt-2" style={{ color: customization.secondaryColor }}>
                      {url}
                    </p>
                  )}
                  <p className="text-lg mt-4" style={{ color: customization.secondaryColor }}>
                    {getFooterText()}
                  </p>
                </div>
              </div>
              <Button onClick={downloadQRCodePage} className="w-full text-lg py-6">
                <Download className="mr-4 h-6 w-6" /> Download QR Code Page
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customization Panel */}
      <CustomizationPanel
        customization={customization}
        onCustomizationChange={setCustomization}
        isVisible={showCustomization}
        onToggle={() => setShowCustomization(!showCustomization)}
      />

      {/* Template Selector */}
      <TemplateSelector
        onSelectTemplate={applyTemplate}
        isVisible={showTemplates}
        onClose={() => setShowTemplates(false)}
      />

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
    </>
  )
}
