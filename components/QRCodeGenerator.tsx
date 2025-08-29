"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import QRCode from "qrcode"
import * as htmlToImage from "html-to-image"
import html2canvas from "html2canvas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Star, Globe, Upload, X, Smartphone, Tablet, Monitor, Sparkles } from "lucide-react"
import { toast } from "sonner"

// Google Icon Component
const GoogleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

// Star Rating Component
const StarRating = ({ rating = 5, className = "" }: { rating?: number; className?: string }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ))}
  </div>
)

export default function QRCodeGenerator() {
  // Development defaults for faster testing 
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  const [url, setUrl] = useState(isDevelopment ? "https://g.page/r/CZ101Y9nOTs-EBM/review" : "")
  const [businessName, setBusinessName] = useState(isDevelopment ? "Navibyte Innovations" : "")
  const [contactNumber, setContactNumber] = useState(isDevelopment ? "9022738129" : "")
  const [qrCode, setQrCode] = useState("")
  const [qrType, setQrType] = useState<"feedback" | "website">("feedback")
  const [useAiHelper, setUseAiHelper] = useState(true) // New state for AI review helper
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
    border?: string
  } | null>(null)
  const [detectedColors, setDetectedColors] = useState<Array<{
    hex: string
    count: number
    r: number
    g: number
    b: number
    brightness: number
  }>>([])
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0)
  const [selectedTextColorIndex, setSelectedTextColorIndex] = useState<number>(0)
  const [selectedBorderColorIndex, setSelectedBorderColorIndex] = useState<number>(0)
  const [logoSize, setLogoSize] = useState<'small' | 'medium' | 'large' | 'extra-large' | 'jumbo'>('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
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

      // Find the darkest color from extracted colors
      const darkestColor = distinctColors.reduce((darkest, current) => {
        return current.brightness < darkest.brightness ? current : darkest
      }, distinctColors[0])?.hex || "#000000"

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
      let darkColor = darkestColor // Use the darkest extracted color

      if (primaryRgb) {
        // Create light variant (for backgrounds)
        const lightR = Math.min(255, primaryRgb.r + 150)
        const lightG = Math.min(255, primaryRgb.g + 150)
        const lightB = Math.min(255, primaryRgb.b + 150)
        lightColor = rgbToHex(lightR, lightG, lightB)
      }

      // Store all detected colors for user selection
      setDetectedColors(distinctColors)
      setSelectedColorIndex(0) // Default to first (most frequent) color
      setSelectedTextColorIndex(0) // Default to darkest color for text
      setSelectedBorderColorIndex(0) // Default to first color for border

      // Set the extracted colors
      setLogoColors({
        primary: primaryColor,
        secondary: secondaryColor,
        light: lightColor,
        dark: darkColor,
        border: primaryColor, // Default border color
      })

      console.log("Extracted colors:", {
        primary: primaryColor,
        secondary: secondaryColor,
        light: lightColor,
        dark: darkColor,
        darkest: darkestColor,
        allColors: distinctColors,
      })
    }

    img.src = imageUrl
  }



  // Individual color selection functions
  const applySelectedColor = (colorIndex: number) => {
    setSelectedColorIndex(colorIndex)
    // Update colors immediately with new selection
    if (detectedColors[colorIndex]) {
      const newPrimaryColor = detectedColors[colorIndex].hex
      const currentTextColor = detectedColors[selectedTextColorIndex]?.hex || detectedColors[0]?.hex
      const currentBorderColor = detectedColors[selectedBorderColorIndex]?.hex || detectedColors[0]?.hex

      updateColorsWithSelection(newPrimaryColor, currentTextColor, currentBorderColor)
    }
  }

  const applySelectedTextColor = (colorIndex: number) => {
    setSelectedTextColorIndex(colorIndex)
    // Update colors immediately with new selection
    if (detectedColors[colorIndex]) {
      const currentPrimaryColor = detectedColors[selectedColorIndex]?.hex || detectedColors[0]?.hex
      const newTextColor = detectedColors[colorIndex].hex
      const currentBorderColor = detectedColors[selectedBorderColorIndex]?.hex || detectedColors[0]?.hex

      updateColorsWithSelection(currentPrimaryColor, newTextColor, currentBorderColor)
    }
  }

  const applySelectedBorderColor = (colorIndex: number) => {
    setSelectedBorderColorIndex(colorIndex)
    // Update colors immediately with new selection
    if (detectedColors[colorIndex]) {
      const currentPrimaryColor = detectedColors[selectedColorIndex]?.hex || detectedColors[0]?.hex
      const currentTextColor = detectedColors[selectedTextColorIndex]?.hex || detectedColors[0]?.hex
      const newBorderColor = detectedColors[colorIndex].hex

      updateColorsWithSelection(currentPrimaryColor, currentTextColor, newBorderColor)
    }
  }

  // Helper function to update colors with specific selections
  const updateColorsWithSelection = (primaryColor: string, textColor: string, borderColor: string) => {
    // Create light variant from primary color
    const primaryRgb = hexToRgb(primaryColor)
    let lightColor = "#FFFFFF"

    if (primaryRgb) {
      const lightR = Math.min(255, primaryRgb.r + 150)
      const lightG = Math.min(255, primaryRgb.g + 150)
      const lightB = Math.min(255, primaryRgb.b + 150)
      lightColor = rgbToHex(lightR, lightG, lightB)
    }

    // Find a good secondary color
    const secondaryColor = detectedColors.find((c) => {
      if (c.hex === primaryColor) return false
      const primaryRgb = hexToRgb(primaryColor)
      if (!primaryRgb) return false

      const dr = Math.abs(primaryRgb.r - c.r)
      const dg = Math.abs(primaryRgb.g - c.g)
      const db = Math.abs(primaryRgb.b - c.b)
      const colorDistance = Math.sqrt(dr * dr + dg * dg + db * db)

      return colorDistance > 100
    })?.hex || detectedColors[1]?.hex || primaryColor

    // Update logo colors with selected colors
    setLogoColors({
      primary: primaryColor,
      secondary: secondaryColor,
      light: lightColor,
      dark: textColor,
      border: borderColor,
    })
  }

  // Function to silently track QR code generation
  const trackQRGeneration = async () => {
    try {
      await fetch('/api/track-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: businessName.trim(),
          url: url.trim(),
          contactNumber: contactNumber.trim(),
          qrType,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          ip: 'client-side', // Will be replaced with actual IP on server
        }),
      })
    } catch (error) {
      // Silently fail - don't show error to user
      console.log('Tracking failed:', error)
    }
  }

  const generateQRCode = async () => {
    if (!businessName.trim() || !url.trim()) {
      toast.warning("Please fill in both business name and URL to generate your QR code")
      return
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      toast.error("Please enter a valid URL (e.g., https://www.example.com)")
      return
    }

    setIsGenerating(true)
    toast.info("Creating your custom QR code...")

    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500))

      // Determine the final URL for the QR code
      let finalUrl = url
      
      // If it's a feedback QR and AI helper is enabled, create review helper URL
      if (qrType === "feedback" && useAiHelper) {
        const currentDomain = window.location.origin
        const encodedBusinessName = encodeURIComponent(businessName.trim())
        const encodedUrl = encodeURIComponent(url.trim())
        finalUrl = `${currentDomain}/review-helper?business=${encodedBusinessName}&url=${encodedUrl}`
        
        toast.info("🤖 AI-assisted review QR code created!")
      }

      const qrSize = isMobile ? 600 : isTablet ? 800 : 1000
      const response = await QRCode.toDataURL(finalUrl, {
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

      // Silently track the QR code generation
      trackQRGeneration()

      if (qrType === "feedback" && useAiHelper) {
        toast.success("Your AI-powered review QR code is ready! When scanned, it will help customers write better reviews.")
      } else {
        toast.success("Your QR code is ready for download!")
      }
    } catch (error) {
      console.error("Error generating QR code:", error)
      toast.error("There was an error generating your QR code. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPG, PNG, SVG, or WebP)")
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error("Please upload an image smaller than 5MB")
      return
    }

    toast.info("Processing image and analyzing colors...")

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setUploadedImage(imageUrl)
      extractColorsFromImage(imageUrl)
      toast.success("Image uploaded and colors extracted successfully!")
    }
    reader.onerror = () => {
      toast.error("There was an error reading your image file")
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setUploadedImage(null)
    setLogoColors(null)
    setDetectedColors([])
    setSelectedColorIndex(0)
    setSelectedTextColorIndex(0)
    setSelectedBorderColorIndex(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const downloadQRCodePage = async () => {
    if (!qrCodeRef.current || !qrCode) {
      toast.error("QR code not found. Please generate a QR code first.")
      return
    }

    setIsDownloading(true)
    toast.info("Creating high-resolution image...")

    try {
      // Create a completely new container with proper dimensions and overflow handling
      const downloadContainer = document.createElement('div')
      downloadContainer.style.position = 'absolute'
      downloadContainer.style.left = '-10000px'
      downloadContainer.style.top = '-10000px'
      downloadContainer.style.width = '1000px' // Increased base width
      downloadContainer.style.height = '1200px' // Increased base height
      downloadContainer.style.backgroundColor = '#ffffff'
      downloadContainer.style.padding = '60px' // Balanced padding
      downloadContainer.style.margin = '0'
      downloadContainer.style.border = 'none'
      downloadContainer.style.outline = 'none'
      downloadContainer.style.boxSizing = 'border-box' // Better for alignment
      downloadContainer.style.overflow = 'visible'
      downloadContainer.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      downloadContainer.style.display = 'flex'
      downloadContainer.style.flexDirection = 'column'
      downloadContainer.style.alignItems = 'center'
      downloadContainer.style.justifyContent = 'flex-start'
      downloadContainer.style.transform = 'none'

      // Get current colors with fallbacks
      const primaryColor = logoColors?.dark || '#1f2937'
      const secondaryColor = logoColors?.primary || '#6b7280'
      const accentColor = logoColors?.secondary || '#3b82f6'

      // Create inner content container
      const innerContainer = document.createElement('div')
      innerContainer.style.width = '100%'
      innerContainer.style.maxWidth = '880px'
      innerContainer.style.height = 'auto'
      innerContainer.style.display = 'flex'
      innerContainer.style.flexDirection = 'column'
      innerContainer.style.alignItems = 'center'
      innerContainer.style.justifyContent = 'flex-start'
      innerContainer.style.gap = '40px'
      innerContainer.style.padding = '0'
      innerContainer.style.boxSizing = 'border-box'

      // Header section
      const headerSection = document.createElement('div')
      headerSection.style.textAlign = 'center'
      headerSection.style.width = '100%'
      headerSection.style.display = 'flex'
      headerSection.style.flexDirection = 'column'
      headerSection.style.alignItems = 'center'
      headerSection.style.gap = '20px'

      // Logo if exists
      if (uploadedImage) {
        const logoImg = document.createElement('img')
        logoImg.src = uploadedImage
        logoImg.style.width = '100px'
        logoImg.style.height = '100px'
        logoImg.style.objectFit = 'contain'
        logoImg.style.borderRadius = '12px'
        logoImg.style.marginBottom = '24px'
        logoImg.style.display = 'block'
        logoImg.style.margin = '0 auto 24px auto'
        headerSection.appendChild(logoImg)
      }

      // Google icon and stars for feedback
      if (qrType === 'feedback') {
        const reviewHeader = document.createElement('div')
        reviewHeader.style.display = 'flex'
        reviewHeader.style.alignItems = 'center'
        reviewHeader.style.justifyContent = 'center'
        reviewHeader.style.gap = '16px'
        reviewHeader.style.marginBottom = '20px'
        
        reviewHeader.innerHTML = `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="color: ${primaryColor};">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div style="display: flex; gap: 3px;">
            ${Array(5).fill(0).map(() => `<svg width="24" height="24" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`).join('')}
          </div>
        `
        headerSection.appendChild(reviewHeader)
      }

      // Title
      const title = document.createElement('h2')
      title.textContent = getHeaderText()
      title.style.fontSize = '32px'
      title.style.fontWeight = 'bold'
      title.style.color = primaryColor
      title.style.margin = '0 0 16px 0'
      title.style.lineHeight = '1.2'
      title.style.textAlign = 'center'
      headerSection.appendChild(title)

      // Subtitle
      const subtitle = document.createElement('p')
      subtitle.textContent = getSubHeaderText()
      subtitle.style.fontSize = '20px'
      subtitle.style.color = secondaryColor
      subtitle.style.margin = '0'
      subtitle.style.lineHeight = '1.4'
      subtitle.style.textAlign = 'center'
      headerSection.appendChild(subtitle)

      // QR Code section
      const qrSection = document.createElement('div')
      qrSection.style.display = 'flex'
      qrSection.style.justifyContent = 'center'
      qrSection.style.alignItems = 'center'
      qrSection.style.width = '100%'
      qrSection.style.maxWidth = '400px'

      // QR container with proper border and styling
      const qrContainer = document.createElement('div')
      qrContainer.style.padding = '30px'
      qrContainer.style.backgroundColor = '#ffffff'
      qrContainer.style.borderRadius = '20px'
      qrContainer.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)'
      qrContainer.style.border = '3px solid #e5e7eb'
      qrContainer.style.display = 'flex'
      qrContainer.style.justifyContent = 'center'
      qrContainer.style.alignItems = 'center'

      const qrImg = document.createElement('img')
      qrImg.src = qrCode
      qrImg.style.width = '300px'
      qrImg.style.height = '300px'
      qrImg.style.display = 'block'
      qrImg.style.imageRendering = 'pixelated'
      qrImg.style.border = '2px solid #f3f4f6'
      qrImg.style.borderRadius = '8px'
      
      qrContainer.appendChild(qrImg)
      qrSection.appendChild(qrContainer)

      // Footer section
      const footerSection = document.createElement('div')
      footerSection.style.textAlign = 'center'
      footerSection.style.width = '100%'
      footerSection.style.display = 'flex'
      footerSection.style.flexDirection = 'column'
      footerSection.style.alignItems = 'center'
      footerSection.style.gap = '15px'

      // Business name
      const businessNameEl = document.createElement('h3')
      businessNameEl.textContent = businessName.trim()
      businessNameEl.style.fontSize = '28px'
      businessNameEl.style.fontWeight = 'bold'
      businessNameEl.style.color = primaryColor
      businessNameEl.style.margin = '0 0 12px 0'
      footerSection.appendChild(businessNameEl)

      // URL
      const urlEl = document.createElement('p')
      urlEl.textContent = url
      urlEl.style.fontSize = '18px'
      urlEl.style.color = secondaryColor
      urlEl.style.margin = '0 0 16px 0'
      urlEl.style.wordBreak = 'break-all'
      footerSection.appendChild(urlEl)

      // Contact number if provided
      if (contactNumber.trim()) {
        const contactEl = document.createElement('p')
        contactEl.textContent = `📞 ${contactNumber.trim()}`
        contactEl.style.fontSize = '18px'
        contactEl.style.color = secondaryColor
        contactEl.style.margin = '0 0 16px 0'
        contactEl.style.fontWeight = '500'
        footerSection.appendChild(contactEl)
      }

      // Google Reviews indicator for feedback
      if (qrType === 'feedback') {
        const reviewFooter = document.createElement('div')
        reviewFooter.style.display = 'flex'
        reviewFooter.style.alignItems = 'center'
        reviewFooter.style.justifyContent = 'center'
        reviewFooter.style.gap = '12px'
        reviewFooter.style.marginBottom = '12px'
        
        reviewFooter.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285F4">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span style="font-size: 16px; color: ${secondaryColor}; font-weight: 500;">Google Reviews</span>
          <div style="display: flex; gap: 2px;">
            ${Array(5).fill(0).map(() => `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`).join('')}
          </div>
        `
        footerSection.appendChild(reviewFooter)
      }

      // Final instruction
      const instruction = document.createElement('p')
      instruction.textContent = getFooterText()
      instruction.style.fontSize = '16px'
      instruction.style.color = secondaryColor
      instruction.style.margin = '0'
      instruction.style.fontWeight = '500'
      footerSection.appendChild(instruction)

      // Assemble everything
      innerContainer.appendChild(headerSection)
      innerContainer.appendChild(qrSection)
      innerContainer.appendChild(footerSection)
      downloadContainer.appendChild(innerContainer)

      // Add to DOM temporarily
      document.body.appendChild(downloadContainer)

      // Wait for all images to load
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Try html2canvas first (usually better with borders)
      try {
        const canvas = await html2canvas(downloadContainer, {
          width: 1000,
          height: 1200,
          scale: 3, // Higher scale for better quality
          backgroundColor: '#ffffff',
          useCORS: true,
          allowTaint: true,
          imageTimeout: 15000,
          removeContainer: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 1000,
          windowHeight: 1200,
          logging: false
        })

        const dataUrl = canvas.toDataURL('image/png', 1.0)
        
        // Clean up
        document.body.removeChild(downloadContainer)

        // Download
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = `${businessName.replace(/\s+/g, "_")}_${qrType}_qrcode.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success("Perfect QR code downloaded successfully!")
        return

      } catch (html2canvasError) {
        console.log("html2canvas failed, trying htmlToImage:", html2canvasError)
        
        // Fallback to htmlToImage with better options
        const dataUrl = await htmlToImage.toPng(downloadContainer, {
          quality: 1,
          backgroundColor: '#ffffff',
          width: 1000,
          height: 1200,
          pixelRatio: 3, // Higher pixel ratio for better quality
          canvasWidth: 3000,
          canvasHeight: 3600,
          style: {
            transform: 'none',
            width: '1000px',
            height: '1200px',
            boxSizing: 'border-box'
          }
        })

        // Clean up
        document.body.removeChild(downloadContainer)

        // Download
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = `${businessName.replace(/\s+/g, "_")}_${qrType}_qrcode.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success("QR code downloaded successfully!")
      }
    } catch (error) {
      console.error("Error downloading QR code:", error)
      toast.error("There was an error downloading your QR code. Trying simple version...")

      // Fallback: download just the QR code
      try {
        const link = document.createElement("a")
        link.href = qrCode
        link.download = `${businessName.replace(/\s+/g, "_")}_${qrType}_qrcode_simple.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("Simple QR code downloaded successfully")
      } catch (fallbackError) {
        console.error("Fallback download failed:", fallbackError)
        toast.error("Download failed. Please try right-clicking the QR code and saving it manually.")
      }
    } finally {
      setIsDownloading(false)
    }
  }

  // Simple QR code download function
  const downloadSimpleQR = () => {
    if (!qrCode) {
      toast.error("Please generate a QR code first")
      return
    }

    try {
      const link = document.createElement("a")
      link.href = qrCode
      link.download = `${businessName.replace(/\s+/g, "_")}_${qrType}_qrcode.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success("QR code downloaded successfully")
    } catch (error) {
      console.error("Simple download failed:", error)
      toast.error("Download failed. Please try right-clicking the QR code and saving it manually.")
    }
  }

  const getHeaderText = () => {
    if (qrType === "feedback") {
      if (useAiHelper) {
        return "Give your honest feedback"
      }
      return "Rate & Review Us"
    }
    return "Visit our website"
  }

  const getSubHeaderText = () => {
    if (qrType === "feedback") {
      if (useAiHelper) {
        return "Your review helps others find us"
      }
      return "Share your experience on Google"
    }
    return "Discover more about us"
  }

  const getFooterText = () => {
    if (qrType === "feedback") {
      if (useAiHelper) {
        return "Scan to write a thoughtful review"
      }
      return "Scan to leave a Google review"
    }
    return "Scan to visit our website"
  }

  const getGradientColors = () => {
    // Always use neutral background regardless of logo colors
    return qrType === "feedback"
      ? "bg-gradient-to-br from-orange-50 to-red-100"
      : "bg-gradient-to-br from-blue-50 to-indigo-100"
  }

  const getBorderColors = () => {
    if (logoColors) {
      const borderColor = logoColors.border || logoColors.dark
      return {
        outer: `border-[${borderColor}]/30`, // Use selected border color
        inner: `border-[${borderColor}]/40`, // Use selected border color
      }
    }

    return qrType === "feedback"
      ? { outer: "border-orange-200", inner: "border-orange-300" }
      : { outer: "border-indigo-200", inner: "border-indigo-300" }
  }

  const getCornerColors = () => {
    if (logoColors) {
      return {
        topLeft: `bg-[${logoColors.dark}]/20`, // Use darkest color with lower opacity
        bottomRight: `bg-[${logoColors.dark}]/20`, // Use darkest color with lower opacity
      }
    }

    return qrType === "feedback"
      ? { topLeft: "bg-orange-200", bottomRight: "bg-red-200" }
      : { topLeft: "bg-indigo-200", bottomRight: "bg-blue-200" }
  }

  const getTextColors = () => {
    if (logoColors) {
      return {
        primary: `text-[${logoColors.dark}]`, // Use darkest color for primary text
        secondary: `text-[${logoColors.dark}]/80`, // Use darkest color with opacity for secondary text
        tertiary: `text-[${logoColors.dark}]/60`, // Use darkest color with opacity for tertiary text
      }
    }

    return qrType === "feedback"
      ? { primary: "text-orange-800", secondary: "text-orange-600", tertiary: "text-orange-500" }
      : { primary: "text-indigo-800", secondary: "text-indigo-600", tertiary: "text-indigo-500" }
  }

  // Function to get logo size classes based on selection and device
  const getLogoSizeClasses = () => {
    const sizeMap = {
      small: {
        mobile: "w-12 h-12",
        tablet: "w-14 h-14",
        desktop: "w-16 h-16"
      },
      medium: {
        mobile: "w-16 h-16",
        tablet: "w-20 h-20",
        desktop: "w-24 h-24"
      },
      large: {
        mobile: "w-20 h-20",
        tablet: "w-24 h-24",
        desktop: "w-28 h-28"
      },
      "extra-large": {
        mobile: "w-24 h-24",
        tablet: "w-28 h-28",
        desktop: "w-32 h-32"
      },
      jumbo: {
        mobile: "w-28 h-28",
        tablet: "w-32 h-32",
        desktop: "w-36 h-36"
      }
    }

    if (isMobile) return sizeMap[logoSize].mobile
    if (isTablet) return sizeMap[logoSize].tablet
    return sizeMap[logoSize].desktop
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
      // Logo sizes - proportionally larger and dynamic
      logoSize: getLogoSizeClasses(),
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
      // Remove background color application - only apply border colors using darkest color
      borderColor: `${logoColors.dark}40`,
    }
  }

  const getCornerStyles = () => {
    if (!logoColors) return {}

    return {
      topLeft: {
        backgroundColor: `${logoColors.dark}10`, // Use darkest color with very subtle opacity
        background: `radial-gradient(circle, ${logoColors.dark}10, ${logoColors.dark}05)`,
      },
      bottomRight: {
        backgroundColor: `${logoColors.dark}10`, // Use darkest color with very subtle opacity
        background: `radial-gradient(circle, ${logoColors.dark}10, ${logoColors.dark}05)`,
      },
    }
  }

  const getTextStyles = () => {
    if (!logoColors) return {}

    return {
      primary: {
        color: logoColors.dark, // Use darkest color for primary text
        textShadow: `0 1px 2px ${logoColors.dark}20`,
      },
      secondary: {
        color: logoColors.dark, // Use darkest color for secondary text
        opacity: 0.8,
      },
      tertiary: {
        color: logoColors.dark, // Use darkest color for tertiary text
        opacity: 0.6,
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

            {/* AI Review Helper Option - Only show for feedback QRs */}
            {qrType === "feedback" && (
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="ai-helper"
                    checked={useAiHelper}
                    onCheckedChange={(checked) => setUseAiHelper(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="ai-helper" className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      Enable AI Review Assistant
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-semibold">NEW</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      When enabled, customers will first see an AI assistant that helps them write thoughtful reviews before redirecting to your actual review page. This increases review quality and completion rates!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Development Mode Indicator */}
            {isDevelopment && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-yellow-800">Development Mode</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">TEST DATA</span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Using Navibyte Innovations test data for faster development. This will be empty in production.
                </p>
              </div>
            )}
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
                    ? "Google Reviews URL"
                    : "Enter your Google Reviews URL"
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

          <div>
            <label className={`${responsive.label} font-semibold block mb-3`}>
              Contact Number: <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <Input
              type="tel"
              placeholder={isMobile ? "Phone number" : "Enter contact number (e.g., +1 234 567 8900)"}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className={`w-full ${responsive.input} border-2 focus:border-blue-500 transition-colors font-medium`}
              style={
                logoColors
                  ? { borderColor: `${logoColors.primary}40`, boxShadow: `0 0 0 1px ${logoColors.primary}00` }
                  : {}
              }
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

          {uploadedImage && detectedColors.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              {/* Primary Color Selection */}
              <div className="mb-6">
                <label className={`${responsive.colorLabel} font-semibold block mb-3 text-center`}>
                  Choose Primary Color:
                </label>
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  {detectedColors.slice(0, 6).map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <button
                        onClick={() => applySelectedColor(index)}
                        className={`w-12 h-12 rounded-full border-2 shadow-sm mb-2 transition-all duration-200 hover:scale-110 ${
                          selectedColorIndex === index
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={`Primary Color ${index + 1}: ${color.hex}`}
                      />
                      <span className={`${responsive.colorLabel} text-xs font-medium ${
                        selectedColorIndex === index ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {index === 0 ? 'Most Used' : `Option ${index + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Color Selection */}
              <div className="mb-6">
                <label className={`${responsive.colorLabel} font-semibold block mb-3 text-center`}>
                  Choose Text Color:
                </label>
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  {detectedColors.slice(0, 6).map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <button
                        onClick={() => applySelectedTextColor(index)}
                        className={`w-10 h-10 rounded-full border-2 shadow-sm mb-2 transition-all duration-200 hover:scale-110 ${
                          selectedTextColorIndex === index
                            ? 'border-green-500 ring-2 ring-green-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={`Text Color ${index + 1}: ${color.hex}`}
                      />
                      <span className={`${responsive.colorLabel} text-xs font-medium ${
                        selectedTextColorIndex === index ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        Text
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Color Selection */}
              <div className="mb-4">
                <label className={`${responsive.colorLabel} font-semibold block mb-3 text-center`}>
                  Choose Border Color:
                </label>
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  {detectedColors.slice(0, 6).map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <button
                        onClick={() => applySelectedBorderColor(index)}
                        className={`w-10 h-10 rounded-full border-2 shadow-sm mb-2 transition-all duration-200 hover:scale-110 ${
                          selectedBorderColorIndex === index
                            ? 'border-purple-500 ring-2 ring-purple-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={`Border Color ${index + 1}: ${color.hex}`}
                      />
                      <span className={`${responsive.colorLabel} text-xs font-medium ${
                        selectedBorderColorIndex === index ? 'text-purple-600' : 'text-gray-600'
                      }`}>
                        Border
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Summary */}
              {logoColors && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-center items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: logoColors.primary }}
                      />
                      <span>Primary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: logoColors.dark }}
                      />
                      <span>Text</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: logoColors.border || logoColors.dark }}
                      />
                      <span>Border</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Logo Size Selection */}
          {uploadedImage && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <label className={`${responsive.colorLabel} font-semibold block mb-3 text-center`}>
                Choose Logo Size:
              </label>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                {(['small', 'medium', 'large', 'extra-large', 'jumbo'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setLogoSize(size)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      logoSize === size
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-center bg-gray-100 rounded-full">
                      <img
                        src={uploadedImage}
                        alt="Logo preview"
                        className={`object-contain rounded-full ${
                          size === 'small' ? 'w-6 h-6' :
                          size === 'medium' ? 'w-8 h-8' :
                          size === 'large' ? 'w-10 h-10' :
                          size === 'extra-large' ? 'w-12 h-12' : 'w-14 h-14'
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      logoSize === size ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {size === 'extra-large' ? 'XL' : size === 'jumbo' ? 'Jumbo' : size.charAt(0).toUpperCase() + size.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs text-gray-500">
                  Preview shows relative sizes. Actual size adapts to your device.
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={generateQRCode}
            className={`w-full ${responsive.button} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-bold`}
            style={
              logoColors
                ? { background: `linear-gradient(to right, ${logoColors.dark}, ${logoColors.dark}CC)` } // Use darkest color
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
                  border: logoColors ? `4px solid ${logoColors.dark}` : '4px solid #e5e7eb', // Use darkest color for main border
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)", // Always use neutral white/light gray background
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
                          borderColor: `${logoColors.dark}30`, // Use darkest color with opacity
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
                          borderColor: `${logoColors.dark}50`, // Use darkest color with opacity
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

                  {/* Google Icon and Stars for Feedback */}
                  {qrType === "feedback" && (
                    <div className={`flex items-center justify-center gap-3 ${isMobile ? "mb-3" : "mb-4"}`}>
                      <GoogleIcon className={isMobile ? "w-8 h-8" : "w-10 h-10"} />
                      <StarRating rating={5} className="scale-110" />
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
                    className={`${responsive.qrUrl} ${isMobile ? "mb-2" : "mt-3"} break-all px-4 font-medium`}
                    style={textStyles.secondary}
                  >
                    {url}
                  </p>
                  {contactNumber.trim() && (
                    <p
                      className={`${responsive.qrUrl} ${isMobile ? "mb-3" : "mt-2"} px-4 font-medium flex items-center justify-center gap-2`}
                      style={textStyles.secondary}
                    >
                      <span>📞</span>
                      <span>{contactNumber}</span>
                    </p>
                  )}

                  {/* Additional Google Reviews indicator for feedback */}
                  {qrType === "feedback" && (
                    <div className={`flex items-center justify-center gap-2 ${isMobile ? "mt-2 mb-2" : "mt-3 mb-3"}`}>
                      <GoogleIcon className="w-4 h-4" />
                      <span className={`text-sm font-medium`} style={textStyles.tertiary}>
                        Google Reviews
                      </span>
                      <StarRating rating={5} className="scale-75" />
                    </div>
                  )}

                  <p
                    className={`${responsive.qrFooter} ${isMobile ? "mt-3" : "mt-6"} opacity-90 font-medium`}
                    style={textStyles.tertiary}
                  >
                    {getFooterText()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <Button
                  onClick={downloadQRCodePage}
                  disabled={isDownloading}
                  className={`w-full ${responsive.button} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 font-bold`}
                  style={
                    logoColors
                      ? { background: `linear-gradient(to right, ${logoColors.dark}, ${logoColors.dark}AA)` } // Use darkest color
                      : {}
                  }
                >
                  <Download className="mr-4 h-6 w-6" />
                  {isDownloading ? "Creating Image..." : "Download Full QR Code"}
                </Button>

                <Button
                  onClick={downloadSimpleQR}
                  variant="outline"
                  className={`w-full ${responsive.button} border-2 hover:bg-gray-50 transition-all duration-200`}
                  style={
                    logoColors
                      ? { borderColor: logoColors.dark, color: logoColors.dark }
                      : {}
                  }
                >
                  <Download className="mr-4 h-5 w-5" />
                  Download Simple QR Code
                </Button>
              </div>
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
