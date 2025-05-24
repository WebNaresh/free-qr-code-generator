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
import ResponsiveCustomizationPanel from "./ResponsiveCustomizationPanel"
import ResponsiveTemplateSelector from "./ResponsiveTemplateSelector"
import { type QRCustomization, defaultCustomization } from "@/lib/customization"
import { useResponsive } from "@/hooks/useResponsive"

export default function ResponsiveQRCodeGenerator() {
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
  const { isMobile, isTablet, windowSize } = useResponsive()

  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(url, {
        errorCorrectionLevel: "H",
        type: "image/png",
        quality: 1,
        margin: 1,
        width: isMobile ? 800 : 1000,
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
        scale: isMobile ? 1.5 : 2,
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

  const getResponsiveHeaderSize = () => {
    const baseSizes = {
      small: isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl",
      medium: isMobile ? "text-xl" : isTablet ? "text-2xl" : "text-3xl",
      large: isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl",
      xl: isMobile ? "text-3xl" : isTablet ? "text-4xl" : "text-5xl",
    }
    return baseSizes[customization.headerSize]
  }

  const getResponsivePadding = () => {
    const paddings = {
      tight: isMobile ? "p-4" : isTablet ? "p-6" : "p-6",
      normal: isMobile ? "p-6" : isTablet ? "p-8" : "p-12",
      spacious: isMobile ? "p-8" : isTablet ? "p-12" : "p-16",
    }
    return paddings[customization.padding]
  }

  const getShadowClass = () => {
    const shadows = {
      none: "",
      light: "shadow-sm",
      medium: isMobile ? "shadow-md" : "shadow-lg",
      heavy: isMobile ? "shadow-lg" : "shadow-2xl",
    }
    return shadows[customization.shadowIntensity]
  }

  const getResponsiveLogoSize = () => {
    const sizes = {
      small: isMobile ? "w-8 h-8" : isTablet ? "w-10 h-10" : "w-12 h-12",
      medium: isMobile ? "w-12 h-12" : isTablet ? "w-16 h-16" : "w-20 h-20",
      large: isMobile ? "w-20 h-20" : isTablet ? "w-24 h-24" : "w-32 h-32",
    }
    return sizes[customization.logoSize]
  }

  const applyTemplate = (templateCustomization: Partial<QRCustomization>) => {
    setCustomization({ ...customization, ...templateCustomization })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className={`container mx-auto ${isMobile ? "px-4 py-6" : isTablet ? "px-6 py-8" : "px-8 py-12"}`}>
        <Card className={`w-full mx-auto ${isMobile ? "max-w-sm" : isTablet ? "max-w-2xl" : "max-w-3xl"}`}>
          <CardHeader className={isMobile ? "p-4 pb-2" : isTablet ? "p-6" : ""}>
            <CardTitle className={`font-bold text-center ${isMobile ? "text-xl" : isTablet ? "text-2xl" : "text-3xl"}`}>
              QR Code Generator
            </CardTitle>
            <p className={`text-center text-gray-600 ${isMobile ? "text-sm" : ""}`}>
              Free tool for businesses - Generate professional QR codes
            </p>
            <div className={`flex justify-center gap-2 mt-4 ${isMobile ? "flex-col" : ""}`}>
              <Button
                variant="outline"
                onClick={() => setShowTemplates(true)}
                className={isMobile ? "w-full h-10" : ""}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Templates
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCustomization(true)}
                className={isMobile ? "w-full h-10" : ""}
              >
                <Palette className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </CardHeader>

          <CardContent className={`space-y-4 ${isMobile ? "p-4 pt-2" : isTablet ? "p-6 pt-2" : "space-y-6"}`}>
            {/* QR Type Selection */}
            <div className="space-y-3">
              <label className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Choose QR Code Type:</label>
              <div className={`flex gap-2 ${isMobile ? "flex-col" : "gap-4"}`}>
                <Button
                  variant={qrType === "feedback" ? "default" : "outline"}
                  onClick={() => setQrType("feedback")}
                  className={`flex-1 ${isMobile ? "h-12 justify-start" : "py-4"}`}
                >
                  <Star className="mr-2 h-5 w-5" />
                  Feedback/Reviews
                </Button>
                <Button
                  variant={qrType === "website" ? "default" : "outline"}
                  onClick={() => setQrType("website")}
                  className={`flex-1 ${isMobile ? "h-12 justify-start" : "py-4"}`}
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
              className={`w-full ${isMobile ? "h-12 text-base" : "text-lg"}`}
              required
            />

            <Input
              type="text"
              placeholder={
                qrType === "feedback" ? "Enter Google Review URL or Feedback Link" : "Enter Business Website URL"
              }
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full ${isMobile ? "h-12 text-base" : "text-lg"}`}
              required
            />

            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>
                Upload Logo/Image (Optional):
              </label>
              <div className={`flex items-center gap-3 ${isMobile ? "flex-col" : ""}`}>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center gap-2 ${isMobile ? "w-full h-10" : ""}`}
                >
                  <Upload className="h-4 w-4" />
                  Choose Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {uploadedImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeImage}
                    className={`text-red-600 hover:text-red-700 ${isMobile ? "w-full h-10" : ""}`}
                  >
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
                    className={`object-contain border rounded-lg ${isMobile ? "max-w-24 max-h-24" : "max-w-32 max-h-32"}`}
                  />
                </div>
              )}
            </div>

            <Button
              onClick={generateQRCode}
              className={`w-full ${isMobile ? "h-12 text-base" : "text-lg py-6"}`}
              disabled={!businessName || !url}
            >
              Generate QR Code
            </Button>

            {qrCode && (
              <div className={`mt-6 space-y-4 ${!isMobile ? "space-y-6" : ""}`}>
                <div
                  ref={qrCodeRef}
                  className={`flex flex-col items-center justify-between ${getResponsivePadding()} ${getShadowClass()} rounded-lg overflow-hidden`}
                  style={{
                    aspectRatio: isMobile ? "1 / 1.2" : "1 / 1.414",
                    width: "100%",
                    maxWidth: isMobile ? "100%" : isTablet ? "600px" : "800px",
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
                  <div className={`z-10 text-center ${isMobile ? "mb-4" : "mb-8"}`}>
                    {uploadedImage && customization.logoPosition === "top" && (
                      <div className={isMobile ? "mb-2" : "mb-4"}>
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Business logo"
                          className={`${getResponsiveLogoSize()} object-contain mx-auto`}
                        />
                      </div>
                    )}
                    <h2
                      className={`${getResponsiveHeaderSize()} font-bold ${isMobile ? "mb-1" : "mb-2"}`}
                      style={{ color: customization.primaryColor }}
                    >
                      {getHeaderText()}
                    </h2>
                    <p className={isMobile ? "text-base" : "text-xl"} style={{ color: customization.secondaryColor }}>
                      {getSubHeaderText()}
                    </p>
                  </div>

                  <div className={`z-10 bg-white ${isMobile ? "p-3" : "p-6"} rounded-lg shadow-md`}>
                    <img
                      src={qrCode || "/placeholder.svg"}
                      alt="QR Code"
                      className={`mx-auto ${isMobile ? "w-full max-w-48" : "w-full max-w-sm"}`}
                    />
                  </div>

                  <div className={`z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
                    {uploadedImage && customization.logoPosition === "bottom" && (
                      <div className={isMobile ? "mb-2" : "mb-4"}>
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Business logo"
                          className={`${getResponsiveLogoSize()} object-contain mx-auto`}
                        />
                      </div>
                    )}
                    <h3
                      className={`font-semibold ${isMobile ? "text-xl" : "text-3xl"}`}
                      style={{ color: customization.primaryColor }}
                    >
                      {businessName}
                    </h3>
                    {customization.showWebsite && (
                      <p
                        className={`${isMobile ? "text-sm mt-1" : "text-xl mt-2"}`}
                        style={{ color: customization.secondaryColor }}
                      >
                        {url}
                      </p>
                    )}
                    <p
                      className={`${isMobile ? "text-sm mt-2" : "text-lg mt-4"}`}
                      style={{ color: customization.secondaryColor }}
                    >
                      {getFooterText()}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={downloadQRCodePage}
                  className={`w-full ${isMobile ? "h-12 text-base" : "text-lg py-6"}`}
                >
                  <Download className="mr-4 h-6 w-6" /> Download QR Code Page
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Responsive Panels */}
      <ResponsiveCustomizationPanel
        customization={customization}
        onCustomizationChange={setCustomization}
        isVisible={showCustomization}
        onToggle={() => setShowCustomization(!showCustomization)}
      />

      <ResponsiveTemplateSelector
        onSelectTemplate={applyTemplate}
        isVisible={showTemplates}
        onClose={() => setShowTemplates(false)}
      />

      <AnalyticsDashboard />
    </div>
  )
}
