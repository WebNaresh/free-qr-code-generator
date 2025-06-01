"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import QRCode from "qrcode"
import html2canvas from "html2canvas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Star, Globe, Upload, X, Smartphone, Tablet, Monitor } from "lucide-react"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [qrType, setQrType] = useState<"feedback" | "website">("feedback")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const generateQRCode = async () => {
    try {
      const qrSize = isMobile ? 600 : isTablet ? 800 : 1000
      const response = await QRCode.toDataURL(url, {
        errorCorrectionLevel: "H",
        type: "image/png",
        quality: 1,
        margin: 1,
        width: qrSize,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      })
      setQrCode(response)
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
      const scale = isMobile ? 1.5 : isTablet ? 2 : 2.5
      const canvas = await html2canvas(qrCodeRef.current, { scale })
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
    return qrType === "feedback" ? "Give your feedback" : "Visit our website"
  }

  const getSubHeaderText = () => {
    return qrType === "feedback" ? "We value your opinion!" : "Discover more about us"
  }

  const getFooterText = () => {
    return qrType === "feedback" ? "Scan to share your thoughts" : "Scan to visit our website"
  }

  const getGradientColors = () => {
    return qrType === "feedback"
      ? "bg-gradient-to-br from-orange-50 to-red-100"
      : "bg-gradient-to-br from-blue-50 to-indigo-100"
  }

  const getBorderColors = () => {
    return qrType === "feedback"
      ? { outer: "border-orange-200", inner: "border-orange-300" }
      : { outer: "border-indigo-200", inner: "border-indigo-300" }
  }

  const getCornerColors = () => {
    return qrType === "feedback"
      ? { topLeft: "bg-orange-200", bottomRight: "bg-red-200" }
      : { topLeft: "bg-indigo-200", bottomRight: "bg-blue-200" }
  }

  const getTextColors = () => {
    return qrType === "feedback"
      ? { primary: "text-orange-800", secondary: "text-orange-600", tertiary: "text-orange-500" }
      : { primary: "text-indigo-800", secondary: "text-indigo-600", tertiary: "text-indigo-500" }
  }

  // Responsive classes
  const getResponsiveClasses = () => {
    return {
      card: isMobile ? "mx-2" : "mx-auto max-w-4xl",
      title: isMobile ? "text-xl sm:text-2xl" : "text-2xl lg:text-3xl",
      subtitle: isMobile ? "text-sm" : "text-base",
      input: isMobile ? "text-base py-3" : "text-lg py-4",
      button: isMobile ? "py-3 text-base" : "py-4 text-lg",
      qrContainer: isMobile ? "p-4 sm:p-6" : isTablet ? "p-8" : "p-12",
      qrTitle: isMobile ? "text-lg sm:text-xl" : isTablet ? "text-2xl" : "text-4xl",
      qrSubtitle: isMobile ? "text-sm" : isTablet ? "text-base" : "text-xl",
      qrBusinessName: isMobile ? "text-xl" : isTablet ? "text-2xl" : "text-3xl",
      qrUrl: isMobile ? "text-xs" : isTablet ? "text-sm" : "text-xl",
      qrFooter: isMobile ? "text-xs" : isTablet ? "text-sm" : "text-lg",
      logoSize: isMobile ? "w-12 h-12" : isTablet ? "w-16 h-16" : "w-20 h-20",
      qrCodeSize: isMobile ? "max-w-48" : isTablet ? "max-w-64" : "max-w-sm",
      spacing: isMobile ? "space-y-4" : "space-y-6",
      gap: isMobile ? "gap-2" : "gap-4",
    }
  }

  const borderColors = getBorderColors()
  const cornerColors = getCornerColors()
  const textColors = getTextColors()
  const responsive = getResponsiveClasses()

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-6 lg:mb-8">
        <h1
          className={`font-bold ${responsive.title} bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2`}
        >
          QR Code Generator
        </h1>
        <p className={`${responsive.subtitle} text-gray-600 max-w-2xl mx-auto px-4`}>
          Create professional QR codes for your business - Free, fast, and customizable
        </p>

        {/* Device indicators */}
        <div className="flex justify-center items-center gap-2 mt-4 text-gray-400">
          <Smartphone className={`h-4 w-4 ${isMobile ? "text-blue-500" : ""}`} />
          <Tablet className={`h-4 w-4 ${isTablet ? "text-blue-500" : ""}`} />
          <Monitor className={`h-4 w-4 ${!isMobile && !isTablet ? "text-blue-500" : ""}`} />
        </div>
      </div>

      <Card className={`${responsive.card} shadow-xl border-0 bg-white/80 backdrop-blur-sm`}>
        <CardHeader className="pb-4">
          <CardTitle className="sr-only">QR Code Configuration</CardTitle>
        </CardHeader>
        <CardContent className={responsive.spacing}>
          {/* QR Type Selection */}
          <div className={responsive.spacing}>
            <label className={`${isMobile ? "text-base" : "text-lg"} font-semibold block mb-3`}>
              Choose QR Code Type:
            </label>
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} ${responsive.gap}`}>
              <Button
                variant={qrType === "feedback" ? "default" : "outline"}
                onClick={() => setQrType("feedback")}
                className={`flex-1 ${responsive.button} ${isMobile ? "justify-start" : "justify-center"}`}
              >
                <Star className="mr-2 h-5 w-5" />
                <span className={isMobile ? "text-left" : "text-center"}>Feedback/Reviews</span>
              </Button>
              <Button
                variant={qrType === "website" ? "default" : "outline"}
                onClick={() => setQrType("website")}
                className={`flex-1 ${responsive.button} ${isMobile ? "justify-start" : "justify-center"}`}
              >
                <Globe className="mr-2 h-5 w-5" />
                <span className={isMobile ? "text-left" : "text-center"}>Business Website</span>
              </Button>
            </div>
          </div>

          <Input
            type="text"
            placeholder="Enter Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className={`w-full ${responsive.input} border-2 focus:border-blue-500 transition-colors`}
            required
          />

          <Input
            type="text"
            placeholder={
              qrType === "feedback"
                ? isMobile
                  ? "Google Review URL"
                  : "Enter Google Review URL or Feedback Link"
                : isMobile
                  ? "Business Website URL"
                  : "Enter Business Website URL"
            }
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full ${responsive.input} border-2 focus:border-blue-500 transition-colors`}
            required
          />

          {/* Image Upload Section */}
          <div className={responsive.spacing}>
            <label className={`${isMobile ? "text-base" : "text-lg"} font-semibold block mb-3`}>
              Upload Logo/Image (Optional):
            </label>
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center ${responsive.gap}`}>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className={`${isMobile ? "w-full" : ""} flex items-center gap-2 border-2 hover:border-blue-500 transition-colors`}
              >
                <Upload className="h-4 w-4" />
                Choose Image
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploadedImage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className={`${isMobile ? "w-full" : ""} text-red-600 hover:text-red-700 border-red-200 hover:border-red-300`}
                >
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
            {uploadedImage && (
              <div className="flex justify-center mt-4">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded logo"
                  className={`${isMobile ? "max-w-24 max-h-24" : "max-w-32 max-h-32"} object-contain border-2 rounded-lg shadow-sm`}
                />
              </div>
            )}
          </div>

          <Button
            onClick={generateQRCode}
            className={`w-full ${responsive.button} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200`}
            disabled={!businessName || !url}
          >
            Generate QR Code
          </Button>

          {qrCode && (
            <div className={`mt-6 ${responsive.spacing}`}>
              <div
                ref={qrCodeRef}
                className={`flex flex-col items-center justify-between ${responsive.qrContainer} ${getGradientColors()} rounded-xl shadow-2xl overflow-hidden relative`}
                style={{
                  aspectRatio: isMobile ? "1 / 1.2" : "1 / 1.414",
                  width: "100%",
                  maxWidth: isMobile ? "100%" : isTablet ? "600px" : "800px",
                  margin: "0 auto",
                }}
              >
                {/* Decorative elements - responsive */}
                <div
                  className={`absolute top-0 left-0 w-full h-full border-[${isMobile ? "8px" : "16px"}] ${borderColors.outer} rounded-xl pointer-events-none`}
                />
                <div
                  className={`absolute ${isMobile ? "top-2 left-2 right-2 bottom-2" : "top-4 left-4 right-4 bottom-4"} border-[2px] ${borderColors.inner} rounded-xl pointer-events-none`}
                />
                <div
                  className={`absolute top-0 left-0 ${isMobile ? "w-16 h-16" : "w-32 h-32"} ${cornerColors.topLeft} rounded-br-full opacity-50`}
                />
                <div
                  className={`absolute bottom-0 right-0 ${isMobile ? "w-16 h-16" : "w-32 h-32"} ${cornerColors.bottomRight} rounded-tl-full opacity-50`}
                />

                {/* Content */}
                <div className={`z-10 text-center ${isMobile ? "mb-4" : "mb-8"}`}>
                  {uploadedImage && (
                    <div className={isMobile ? "mb-2" : "mb-4"}>
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Business logo"
                        className={`${responsive.logoSize} object-contain mx-auto rounded-lg shadow-sm`}
                      />
                    </div>
                  )}
                  <h2
                    className={`${responsive.qrTitle} font-bold ${textColors.primary} ${isMobile ? "mb-1" : "mb-2"} leading-tight`}
                  >
                    {getHeaderText()}
                  </h2>
                  <p className={`${responsive.qrSubtitle} ${textColors.secondary} leading-relaxed`}>
                    {getSubHeaderText()}
                  </p>
                </div>

                <div
                  className={`z-10 bg-white ${isMobile ? "p-3" : "p-6"} rounded-xl shadow-lg border border-gray-100`}
                >
                  <img
                    src={qrCode || "/placeholder.svg"}
                    alt="QR Code"
                    className={`${responsive.qrCodeSize} mx-auto rounded-lg`}
                  />
                </div>

                <div className={`z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
                  <h3
                    className={`${responsive.qrBusinessName} font-semibold ${textColors.primary} ${isMobile ? "mb-1" : "mb-2"}`}
                  >
                    {businessName}
                  </h3>
                  <p
                    className={`${responsive.qrUrl} ${textColors.secondary} ${isMobile ? "mb-2" : "mt-2"} break-all px-2`}
                  >
                    {url}
                  </p>
                  <p
                    className={`${responsive.qrFooter} ${textColors.tertiary} ${isMobile ? "mt-2" : "mt-4"} opacity-90`}
                  >
                    {getFooterText()}
                  </p>
                </div>
              </div>

              <Button
                onClick={downloadQRCodePage}
                className={`w-full ${responsive.button} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 mt-6`}
              >
                <Download className="mr-3 h-5 w-5" />
                Download QR Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="text-center mt-8 px-4">
        <p className={`${responsive.subtitle} text-gray-500`}>
          Free QR Code Generator • No signup required • Professional quality
        </p>
      </footer>
    </div>
  )
}
