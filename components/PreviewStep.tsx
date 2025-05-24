"use client"

import React from "react"

import { useState, useRef } from "react"
import QRCode from "qrcode"
import html2canvas from "html2canvas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ArrowLeft, Settings, Palette, Eye } from "lucide-react"
import { useResponsive } from "@/hooks/useResponsive"
import ResponsiveCustomizationPanel from "./ResponsiveCustomizationPanel"
import { type QRCustomization, defaultCustomization } from "@/lib/customization"
import type { StepData } from "@/lib/steps"
import { trackQRGeneration } from "@/lib/analytics"
import { GoogleReviewElements, GoogleReviewBadge } from "./GoogleReviewElements"

interface PreviewStepProps {
  data: StepData
  onBack: () => void
}

export default function PreviewStep({ data, onBack }: PreviewStepProps) {
  const [qrCode, setQrCode] = useState("")
  const [customization, setCustomization] = useState<QRCustomization>(defaultCustomization)
  const [showCustomization, setShowCustomization] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const { isMobile, isTablet } = useResponsive()
  const qrCodeRef = useRef<HTMLDivElement>(null)

  const generateQRCode = async () => {
    setIsGenerating(true)
    try {
      const response = await QRCode.toDataURL(data.url, {
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
        businessName: data.businessName,
        url: data.url,
        qrType: data.qrType,
        hasLogo: !!data.uploadedImage,
      })
    } catch (error) {
      console.error("Error generating QR code:", error)
    } finally {
      setIsGenerating(false)
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
      link.download = `${data.businessName.replace(/\s+/g, "_")}_${data.qrType}_qrcode.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getHeaderText = () => {
    if (customization.customHeader) return customization.customHeader
    return data.qrType === "feedback" ? "Give your feedback" : "Visit our website"
  }

  const getSubHeaderText = () => {
    if (customization.customSubheader) return customization.customSubheader
    return data.qrType === "feedback" ? "We value your opinion!" : "Discover more about us"
  }

  const getFooterText = () => {
    if (customization.customFooter) return customization.customFooter
    return data.qrType === "feedback" ? "Scan to share your thoughts" : "Scan to visit our website"
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

  // Auto-generate QR code when component mounts or customization changes
  React.useEffect(() => {
    generateQRCode()
  }, [customization.qrCodeColor, customization.qrCodeBackground])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className={`container mx-auto ${isMobile ? "px-4 py-3" : "px-6 py-4"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {!isMobile && "Back"}
              </Button>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                  2
                </span>
                Preview & Customize
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomization(true)}
                className={isMobile ? "px-2" : ""}
              >
                <Palette className="h-4 w-4" />
                {!isMobile && <span className="ml-1">Customize</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`container mx-auto ${isMobile ? "px-4 py-6" : "px-6 py-8"}`}>
        <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : isTablet ? "grid-cols-1" : "grid-cols-2"}`}>
          {/* Preview Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader className={isMobile ? "p-4" : "p-6"}>
                <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-lg" : "text-xl"}`}>
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className={isMobile ? "p-4 pt-0" : "p-6 pt-0"}>
                {qrCode ? (
                  <div
                    ref={qrCodeRef}
                    className={`flex flex-col items-center justify-between ${getResponsivePadding()} ${getShadowClass()} rounded-lg overflow-hidden mx-auto`}
                    style={{
                      aspectRatio: isMobile ? "1 / 1.2" : "1 / 1.414",
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "400px",
                      backgroundColor: customization.backgroundColor,
                      borderRadius: `${customization.cornerRadius}px`,
                      fontFamily: customization.headerFont,
                      border: customization.showBorder ? `2px ${customization.borderStyle}` : "none",
                      borderColor: customization.primaryColor,
                    }}
                  >
                    {/* Content */}
                    <div className={`z-10 text-center ${isMobile ? "mb-4" : "mb-6"}`}>
                      {data.uploadedImage && customization.logoPosition === "top" && (
                        <div className={isMobile ? "mb-2" : "mb-3"}>
                          <img
                            src={data.uploadedImage || "/placeholder.svg"}
                            alt="Business logo"
                            className={`${getResponsiveLogoSize()} object-contain mx-auto`}
                          />
                        </div>
                      )}
                      {/* Google Review Elements for Feedback QR Codes */}
                      {data.qrType === "feedback" && (customization.showGoogleIcons || customization.showStars) && (
                        <GoogleReviewElements
                          showIcons={customization.showGoogleIcons}
                          showStars={customization.showStars}
                          primaryColor={customization.primaryColor}
                          secondaryColor={customization.secondaryColor}
                          isMobile={isMobile}
                        />
                      )}
                      <h2
                        className={`${getResponsiveHeaderSize()} font-bold ${isMobile ? "mb-1" : "mb-2"}`}
                        style={{ color: customization.primaryColor }}
                      >
                        {getHeaderText()}
                      </h2>
                      <p className={isMobile ? "text-sm" : "text-base"} style={{ color: customization.secondaryColor }}>
                        {getSubHeaderText()}
                      </p>
                    </div>

                    <div className={`z-10 bg-white ${isMobile ? "p-3" : "p-4"} rounded-lg shadow-md`}>
                      <img
                        src={qrCode || "/placeholder.svg"}
                        alt="QR Code"
                        className={`mx-auto ${isMobile ? "w-32 h-32" : "w-40 h-40"}`}
                      />
                    </div>

                    <div className={`z-10 text-center ${isMobile ? "mt-4" : "mt-6"}`}>
                      {data.uploadedImage && customization.logoPosition === "bottom" && (
                        <div className={isMobile ? "mb-2" : "mb-3"}>
                          <img
                            src={data.uploadedImage || "/placeholder.svg"}
                            alt="Business logo"
                            className={`${getResponsiveLogoSize()} object-contain mx-auto`}
                          />
                        </div>
                      )}
                      <h3
                        className={`font-semibold ${isMobile ? "text-lg" : "text-xl"}`}
                        style={{ color: customization.primaryColor }}
                      >
                        {data.businessName}
                      </h3>
                      {customization.showWebsite && (
                        <p
                          className={`${isMobile ? "text-xs mt-1" : "text-sm mt-1"}`}
                          style={{ color: customization.secondaryColor }}
                        >
                          {data.url}
                        </p>
                      )}
                      {/* Google Review Badge for Feedback QR Codes */}
                      {data.qrType === "feedback" && customization.showGoogleIcons && (
                        <div className={isMobile ? "mt-2" : "mt-3"}>
                          <GoogleReviewBadge isMobile={isMobile} />
                        </div>
                      )}
                      <p
                        className={`${isMobile ? "text-xs mt-2" : "text-sm mt-3"}`}
                        style={{ color: customization.secondaryColor }}
                      >
                        {getFooterText()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-gray-600">Generating QR Code...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Download Button */}
            {qrCode && (
              <Button onClick={downloadQRCodePage} className={`w-full ${isMobile ? "h-12" : "h-14 text-lg"}`}>
                <Download className="mr-3 h-5 w-5" />
                Download QR Code
              </Button>
            )}
          </div>

          {/* Business Info Panel - Desktop Only */}
          {!isMobile && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Business Name</label>
                    <p className="text-lg font-semibold">{data.businessName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {data.qrType === "feedback" ? "Review URL" : "Website URL"}
                    </label>
                    <p className="text-sm text-blue-600 break-all">{data.url}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">QR Code Type</label>
                    <p className="text-lg capitalize">
                      {data.qrType === "feedback" ? "Feedback & Reviews" : "Business Website"}
                    </p>
                  </div>
                  {data.uploadedImage && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Logo</label>
                      <img
                        src={data.uploadedImage || "/placeholder.svg"}
                        alt="Business logo"
                        className="w-16 h-16 object-contain border rounded-lg mt-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" onClick={() => setShowCustomization(true)} className="w-full justify-start">
                    <Palette className="h-4 w-4 mr-2" />
                    Customize Design
                  </Button>
                  <Button variant="outline" onClick={onBack} className="w-full justify-start">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Edit Information
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Customization Panel */}
      <ResponsiveCustomizationPanel
        customization={customization}
        onCustomizationChange={setCustomization}
        isVisible={showCustomization}
        onToggle={() => setShowCustomization(!showCustomization)}
      />
    </div>
  )
}
