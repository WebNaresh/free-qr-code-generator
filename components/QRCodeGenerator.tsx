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
  const [logoColors, setLogoColors] = useState<{
    primary: string
    secondary: string
    light: string
    dark: string
  } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

  // Create canvas element for color extraction
  useEffect(() => {
    if (!canvasRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = 50
      canvas.height = 50
      canvas.style.display = "none"
      document.body.appendChild(canvas)
      canvasRef.current = canvas
    }

    return () => {
      if (canvasRef.current) {
        document.body.removeChild(canvasRef.current)
      }
    }
  }, [])

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  // Helper function to convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
  }

  // Helper function to calculate color brightness
  const getBrightness = (r: number, g: number, b: number) => {
    return (r * 299 + g * 587 + b * 114) / 1000
  }

  // Extract colors from uploaded image
  const extractColorsFromImage = (imageUrl: string) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d", { willReadFrequently: true })
      if (!ctx || !canvas) return

      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Color counting
      const colorMap: Record<string, { count: number; r: number; g: number; b: number }> = {}

      // Process pixels
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]

        // Skip transparent pixels
        if (a < 128) continue

        // Skip very light or very dark colors
        const brightness = getBrightness(r, g, b)
        if (brightness > 240 || brightness < 15) continue

        // Create color key
        const hex = rgbToHex(r, g, b)

        // Count color occurrences
        if (colorMap[hex]) {
          colorMap[hex].count++
        } else {
          colorMap[hex] = { count: 1, r, g, b }
        }
      }

      // Sort colors by frequency
      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1].count - a[1].count)
        .map(([hex, data]) => ({
          hex,
          count: data.count,
          r: data.r,
          g: data.g,
          b: data.b,
          brightness: getBrightness(data.r, data.g, data.b),
        }))

      // Filter out colors that are too similar
      const distinctColors = sortedColors.reduce(
        (acc, color) => {
          // Check if this color is distinct enough from already selected colors
          const isDifferentEnough = acc.every((selectedColor) => {
            const dr = Math.abs(selectedColor.r - color.r)
            const dg = Math.abs(selectedColor.g - color.g)
            const db = Math.abs(selectedColor.b - color.b)
            const colorDistance = Math.sqrt(dr * dr + dg * dg + db * db)
            return colorDistance > 50 // Threshold for considering colors different
          })

          if (isDifferentEnough && acc.length < 5) {
            acc.push(color)
          }
          return acc
        },
        [] as typeof sortedColors,
      )

      // Get primary color (most frequent)
      const primaryColor = distinctColors[0]?.hex || "#FF0000"

      // Find a good secondary color (different enough from primary)
      const secondaryColor =
        distinctColors.find((c) => {
          const primaryRgb = hexToRgb(primaryColor)
          if (!primaryRgb) return false

          const dr = Math.abs(primaryRgb.r - c.r)
          const dg = Math.abs(primaryRgb.g - c.g)
          const db = Math.abs(primaryRgb.b - c.b)
          const colorDistance = Math.sqrt(dr * dr + dg * dg + db * db)

          return colorDistance > 100
        })?.hex || "#0000FF"

      // Create light and dark variants
      const primaryRgb = hexToRgb(primaryColor)
      let lightColor = "#FFFFFF"
      let darkColor = "#000000"

      if (primaryRgb) {
        // Create light variant (for backgrounds)
        const lightR = Math.min(255, primaryRgb.r + 150)
        const lightG = Math.min(255, primaryRgb.g + 150)
        const lightB = Math.min(255, primaryRgb.b + 150)
        lightColor = rgbToHex(lightR, lightG, lightB)

        // Create dark variant (for text)
        const darkR = Math.max(0, primaryRgb.r - 100)
        const darkG = Math.max(0, primaryRgb.g - 100)
        const darkB = Math.max(0, primaryRgb.b - 100)
        darkColor = rgbToHex(darkR, darkG, darkB)
      }

      // Set the extracted colors
      setLogoColors({
        primary: primaryColor,
        secondary: secondaryColor,
        light: lightColor,
        dark: darkColor,
      })

      console.log("Extracted colors:", {
        primary: primaryColor,
        secondary: secondaryColor,
        light: lightColor,
        dark: darkColor,
      })
    }

    img.src = imageUrl
  }

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
        const imageUrl = e.target?.result as string
        setUploadedImage(imageUrl)
        extractColorsFromImage(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setLogoColors(null)
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
    if (logoColors) {
      return `bg-gradient-to-br from-[${logoColors.light}] to-[${logoColors.light}]`
    }

    return qrType === "feedback"
      ? "bg-gradient-to-br from-orange-50 to-red-100"
      : "bg-gradient-to-br from-blue-50 to-indigo-100"
  }

  const getBorderColors = () => {
    if (logoColors) {
      return {
        outer: `border-[${logoColors.primary}]/30`,
        inner: `border-[${logoColors.primary}]/40`,
      }
    }

    return qrType === "feedback"
      ? { outer: "border-orange-200", inner: "border-orange-300" }
      : { outer: "border-indigo-200", inner: "border-indigo-300" }
  }

  const getCornerColors = () => {
    if (logoColors) {
      return {
        topLeft: `bg-[${logoColors.primary}]/30`,
        bottomRight: `bg-[${logoColors.secondary}]/30`,
      }
    }

    return qrType === "feedback"
      ? { topLeft: "bg-orange-200", bottomRight: "bg-red-200" }
      : { topLeft: "bg-indigo-200", bottomRight: "bg-blue-200" }
  }

  const getTextColors = () => {
    if (logoColors) {
      return {
        primary: `text-[${logoColors.dark}]`,
        secondary: `text-[${logoColors.primary}]`,
        tertiary: `text-[${logoColors.secondary}]`,
      }
    }

    return qrType === "feedback"
      ? { primary: "text-orange-800", secondary: "text-orange-600", tertiary: "text-orange-500" }
      : { primary: "text-indigo-800", secondary: "text-indigo-600", tertiary: "text-indigo-500" }
  }

  // Enhanced responsive classes with larger font sizes
  const getResponsiveClasses = () => {
    return {
      card: isMobile ? "mx-2" : "mx-auto max-w-4xl",
      // Main title - significantly larger
      title: isMobile ? "text-3xl sm:text-4xl" : "text-4xl lg:text-5xl xl:text-6xl",
      // Subtitle - increased for better readability
      subtitle: isMobile ? "text-base sm:text-lg" : "text-lg lg:text-xl",
      // Form inputs - larger for better usability
      input: isMobile ? "text-lg py-4" : "text-xl py-5",
      // Buttons - more prominent
      button: isMobile ? "py-4 text-lg" : "py-5 text-xl",
      // QR container padding
      qrContainer: isMobile ? "p-6 sm:p-8" : isTablet ? "p-10" : "p-14",
      // QR page titles - much larger for impact
      qrTitle: isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-4xl" : "text-5xl xl:text-6xl",
      // QR page subtitles - increased
      qrSubtitle: isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl",
      // Business name - prominent
      qrBusinessName: isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl xl:text-5xl",
      // URL text - readable
      qrUrl: isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg xl:text-xl",
      // Footer text - clear
      qrFooter: isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg",
      // Logo sizes - proportionally larger
      logoSize: isMobile ? "w-16 h-16" : isTablet ? "w-20 h-20" : "w-24 h-24",
      // QR code sizes
      qrCodeSize: isMobile ? "max-w-56" : isTablet ? "max-w-72" : "max-w-80",
      // Spacing
      spacing: isMobile ? "space-y-6" : "space-y-8",
      gap: isMobile ? "gap-3" : "gap-5",
      // Labels - more prominent
      label: isMobile ? "text-lg" : "text-xl",
      // Color preview labels
      colorLabel: isMobile ? "text-sm" : "text-base",
      // Footer text
      footerText: isMobile ? "text-base" : "text-lg",
    }
  }

  const borderColors = getBorderColors()
  const cornerColors = getCornerColors()
  const textColors = getTextColors()
  const responsive = getResponsiveClasses()

  // Generate inline styles for elements that need direct color application
  const getQrCodeStyles = () => {
    if (!logoColors) return {}

    return {
      background: `linear-gradient(135deg, ${logoColors.light}E6, ${logoColors.light}CC)`,
      borderColor: `${logoColors.primary}40`,
    }
  }

  const getCornerStyles = () => {
    if (!logoColors) return {}

    return {
      topLeft: {
        backgroundColor: `${logoColors.primary}40`,
        background: `radial-gradient(circle, ${logoColors.primary}40, ${logoColors.primary}20)`,
      },
      bottomRight: {
        backgroundColor: `${logoColors.secondary}40`,
        background: `radial-gradient(circle, ${logoColors.secondary}40, ${logoColors.secondary}20)`,
      },
    }
  }

  const getTextStyles = () => {
    if (!logoColors) return {}

    return {
      primary: {
        color: logoColors.dark || logoColors.primary,
        textShadow: `0 1px 2px ${logoColors.primary}20`,
      },
      secondary: {
        color: logoColors.primary,
        opacity: 0.9,
      },
      tertiary: {
        color: logoColors.secondary || logoColors.primary,
        opacity: 0.8,
      },
    }
  }

  const qrCodeStyles = getQrCodeStyles()
  const cornerStyles = getCornerStyles()
  const textStyles = getTextStyles()

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
      
   
      </div>

      <Card className={`${responsive.card} shadow-xl border-0 bg-white/80 backdrop-blur-sm`}>
        <CardHeader className="pb-6">
          <CardTitle className="sr-only">QR Code Configuration</CardTitle>
        </CardHeader>
        <CardContent className={responsive.spacing}>
          {/* QR Type Selection */}
          <div className={responsive.spacing}>
            <label className={`${responsive.label} font-semibold block mb-4`}>Choose QR Code Type:</label>
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} ${responsive.gap}`}>
              <Button
                variant={qrType === "feedback" ? "default" : "outline"}
                onClick={() => setQrType("feedback")}
                className={`flex-1 ${responsive.button} ${isMobile ? "justify-start" : "justify-center"} font-semibold`}
                style={
                  qrType === "feedback" && logoColors
                    ? { backgroundColor: logoColors.primary, borderColor: logoColors.primary }
                    : {}
                }
              >
                <Star className="mr-3 h-6 w-6" />
                <span className={isMobile ? "text-left" : "text-center"}>Feedback/Reviews</span>
              </Button>
              <Button
                variant={qrType === "website" ? "default" : "outline"}
                onClick={() => setQrType("website")}
                className={`flex-1 ${responsive.button} ${isMobile ? "justify-start" : "justify-center"} font-semibold`}
                style={
                  qrType === "website" && logoColors
                    ? { backgroundColor: logoColors.primary, borderColor: logoColors.primary }
                    : {}
                }
              >
                <Globe className="mr-3 h-6 w-6" />
                <span className={isMobile ? "text-left" : "text-center"}>Business Website</span>
              </Button>
            </div>
          </div>

          <div>
            <label className={`${responsive.label} font-semibold block mb-3`}>Business Name:</label>
            <Input
              type="text"
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={`w-full ${responsive.input} border-2 focus:border-blue-500 transition-colors font-medium`}
              style={
                logoColors
                  ? { borderColor: `${logoColors.primary}40`, boxShadow: `0 0 0 1px ${logoColors.primary}00` }
                  : {}
              }
              required
            />
          </div>

          <div>
            <label className={`${responsive.label} font-semibold block mb-3`}>
              {qrType === "feedback" ? "Review/Feedback URL:" : "Website URL:"}
            </label>
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
              className={`w-full ${responsive.input} border-2 focus:border-blue-500 transition-colors font-medium`}
              style={
                logoColors
                  ? { borderColor: `${logoColors.primary}40`, boxShadow: `0 0 0 1px ${logoColors.primary}00` }
                  : {}
              }
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className={responsive.spacing}>
            <label className={`${responsive.label} font-semibold block mb-4`}>Upload Logo/Image (Optional):</label>
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center ${responsive.gap}`}>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className={`${isMobile ? "w-full" : ""} flex items-center gap-3 border-2 hover:border-blue-500 transition-colors ${responsive.button} font-semibold`}
                style={logoColors ? { borderColor: logoColors.primary, color: logoColors.primary } : {}}
              >
                <Upload className="h-5 w-5" />
                Choose Image
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploadedImage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className={`${isMobile ? "w-full" : ""} text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 ${responsive.button} font-semibold`}
                >
                  <X className="h-5 w-5" />
                  Remove Image
                </Button>
              )}
            </div>
            {uploadedImage && (
              <div className="flex justify-center mt-6">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded logo"
                  className={`${isMobile ? "max-w-32 max-h-32" : "max-w-40 max-h-40"} object-contain border-2 rounded-lg shadow-sm`}
                  style={logoColors ? { borderColor: `${logoColors.primary}40` } : {}}
                />
              </div>
            )}
          </div>

          {uploadedImage && logoColors && (
            <div className="flex justify-center items-center gap-6 mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full border border-gray-200 shadow-sm mb-2"
                  style={{ backgroundColor: logoColors.primary }}
                />
                <span className={`${responsive.colorLabel} font-medium`}>Primary</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full border border-gray-200 shadow-sm mb-2"
                  style={{ backgroundColor: logoColors.secondary }}
                />
                <span className={`${responsive.colorLabel} font-medium`}>Secondary</span>
              </div>
            </div>
          )}

          <Button
            onClick={generateQRCode}
            className={`w-full ${responsive.button} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-bold`}
            style={
              logoColors
                ? { background: `linear-gradient(to right, ${logoColors.primary}, ${logoColors.secondary})` }
                : {}
            }
            disabled={!businessName || !url}
          >
            Generate QR Code
          </Button>

          {qrCode && (
            <div className={`mt-8 ${responsive.spacing}`}>
              <div
                ref={qrCodeRef}
                className={`flex flex-col items-center justify-between ${responsive.qrContainer} rounded-xl shadow-2xl overflow-hidden relative`}
                style={{
                  border: logoColors ? `4px solid ${logoColors.primary}` : '4px solid #e5e7eb',
                  background: qrType === "feedback"
                    ? "linear-gradient(135deg, #fff7ed 0%, #ffe4e6 100%)"
                    : "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
                  aspectRatio: isMobile ? "1 / 1.2" : "1 / 1.414",
                  width: "100%",
                  maxWidth: isMobile ? "100%" : isTablet ? "600px" : "800px",
                  margin: "0 auto",
                }}
              >
                {/* Decorative elements - responsive */}
                <div
                  className={`absolute top-0 left-0 w-full h-full border-[${isMobile ? "8px" : "16px"}] rounded-xl pointer-events-none`}
                  style={
                    logoColors
                      ? {
                          borderColor: `${logoColors.primary}50`,
                          borderWidth: isMobile ? "8px" : "16px",
                        }
                      : {}
                  }
                />
                <div
                  className={`absolute ${isMobile ? "top-2 left-2 right-2 bottom-2" : "top-4 left-4 right-4 bottom-4"} border-[2px] rounded-xl pointer-events-none`}
                  style={
                    logoColors
                      ? {
                          borderColor: `${logoColors.primary}70`,
                          borderWidth: "2px",
                        }
                      : {}
                  }
                />
                <div
                  className={`absolute top-0 left-0 ${isMobile ? "w-16 h-16" : "w-32 h-32"} rounded-br-full opacity-50`}
                  style={cornerStyles.topLeft}
                />
                <div
                  className={`absolute bottom-0 right-0 ${isMobile ? "w-16 h-16" : "w-32 h-32"} rounded-tl-full opacity-50`}
                  style={cornerStyles.bottomRight}
                />

                {/* Content */}
                <div className={`z-10 text-center ${isMobile ? "mb-6" : "mb-10"}`}>
                  {uploadedImage && (
                    <div className={isMobile ? "mb-4" : "mb-6"}>
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Business logo"
                        className={`${responsive.logoSize} object-contain mx-auto rounded-lg shadow-sm`}
                      />
                    </div>
                  )}
                  <h2
                    className={`${responsive.qrTitle} font-bold ${isMobile ? "mb-2" : "mb-4"} leading-tight`}
                    style={textStyles.primary}
                  >
                    {getHeaderText()}
                  </h2>
                  <p className={`${responsive.qrSubtitle} leading-relaxed font-medium`} style={textStyles.secondary}>
                    {getSubHeaderText()}
                  </p>
                </div>

                <div
                  className={`z-10 bg-white ${isMobile ? "p-4" : "p-8"} rounded-xl shadow-lg border border-gray-100`}
                >
                  <img
                    src={qrCode || "/placeholder.svg"}
                    alt="QR Code"
                    className={`${responsive.qrCodeSize} mx-auto rounded-lg`}
                  />
                </div>

                <div className={`z-10 text-center ${isMobile ? "mt-6" : "mt-10"}`}>
                  <h3
                    className={`${responsive.qrBusinessName} font-bold ${isMobile ? "mb-2" : "mb-4"}`}
                    style={textStyles.primary}
                  >
                    {businessName}
                  </h3>
                  <p
                    className={`${responsive.qrUrl} ${isMobile ? "mb-3" : "mt-3"} break-all px-4 font-medium`}
                    style={textStyles.secondary}
                  >
                    {url}
                  </p>
                  <p
                    className={`${responsive.qrFooter} ${isMobile ? "mt-3" : "mt-6"} opacity-90 font-medium`}
                    style={textStyles.tertiary}
                  >
                    {getFooterText()}
                  </p>
                </div>
              </div>

              <Button
                onClick={downloadQRCodePage}
                className={`w-full ${responsive.button} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 mt-8 font-bold`}
                style={
                  logoColors
                    ? { background: `linear-gradient(to right, ${logoColors.secondary}, ${logoColors.primary})` }
                    : {}
                }
              >
                <Download className="mr-4 h-6 w-6" />
                Download QR Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="text-center mt-12 px-4">
        <p className={`${responsive.footerText} text-gray-500 font-medium`}>
          Free QR Code Generator • No signup required • Professional quality
        </p>
      </footer>
    </div>
  )
}
