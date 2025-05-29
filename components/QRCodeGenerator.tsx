"use client"

import type React from "react"

import { useState, useRef } from "react"
import QRCode from "qrcode"
import html2canvas from "html2canvas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Star, Globe, Upload, X } from "lucide-react"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [qrType, setQrType] = useState<"feedback" | "website">("feedback")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
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

  const borderColors = getBorderColors()
  const cornerColors = getCornerColors()
  const textColors = getTextColors()

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">QR Code Generator</CardTitle>
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
        />

        <Input
          type="text"
          placeholder={
            qrType === "feedback" ? "Enter Google Review URL or Feedback Link" : "Enter Business Website URL"
          }
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full text-lg"
        />

        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="text-lg font-semibold">Upload Logo/Image (Optional):</label>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
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

        <Button onClick={generateQRCode} className="w-full text-lg py-6">
          Generate QR Code
        </Button>

        {qrCode && (
          <div className="mt-8 space-y-6">
            <div
              ref={qrCodeRef}
              className={`flex flex-col items-center justify-between p-12 ${getGradientColors()} rounded-lg shadow-lg overflow-hidden`}
              style={{
                aspectRatio: "1 / 1.414",
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              {/* Decorative elements */}
              <div
                className={`absolute top-0 left-0 w-full h-full border-[16px] ${borderColors.outer} rounded-lg pointer-events-none`}
              />
              <div
                className={`absolute top-4 left-4 right-4 bottom-4 border-[2px] ${borderColors.inner} rounded-lg pointer-events-none`}
              />
              <div className={`absolute top-0 left-0 w-32 h-32 ${cornerColors.topLeft} rounded-br-full opacity-50`} />
              <div
                className={`absolute bottom-0 right-0 w-32 h-32 ${cornerColors.bottomRight} rounded-tl-full opacity-50`}
              />

              {/* Content */}
              <div className="z-10 text-center mb-8">
                {uploadedImage && (
                  <div className="mb-4">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Business logo"
                      className="w-20 h-20 object-contain mx-auto"
                    />
                  </div>
                )}
                <h2 className={`text-4xl font-bold ${textColors.primary} mb-2`}>{getHeaderText()}</h2>
                <p className={`text-xl ${textColors.secondary}`}>{getSubHeaderText()}</p>
              </div>

              <div className="z-10 bg-white p-6 rounded-lg shadow-md">
                <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-full max-w-sm mx-auto" />
              </div>

              <div className="z-10 text-center mt-8">
                <h3 className={`text-3xl font-semibold ${textColors.primary}`}>{businessName}</h3>
                <p className={`text-xl ${textColors.secondary} mt-2`}>{url}</p>
                <p className={`text-lg ${textColors.tertiary} mt-4`}>{getFooterText()}</p>
              </div>
            </div>
            <Button onClick={downloadQRCodePage} className="w-full text-lg py-6">
              <Download className="mr-4 h-6 w-6" /> Download QR Code Page
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
