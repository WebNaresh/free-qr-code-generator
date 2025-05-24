"use client"

import type React from "react"
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Globe, Upload, X, ArrowRight, Sparkles } from "lucide-react"
import { useResponsive } from "@/hooks/useResponsive"
import type { StepData } from "@/lib/steps"

interface InputStepProps {
  data: StepData
  onDataChange: (data: StepData) => void
  onNext: () => void
  onShowTemplates: () => void
}

export default function InputStep({ data, onDataChange, onNext, onShowTemplates }: InputStepProps) {
  const { isMobile, isTablet } = useResponsive()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onDataChange({ ...data, uploadedImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    onDataChange({ ...data, uploadedImage: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isValid = data.businessName.trim() && data.url.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className={`w-full mx-auto ${isMobile ? "max-w-sm" : isTablet ? "max-w-lg" : "max-w-xl"}`}>
        <CardHeader className={isMobile ? "p-4 pb-2" : "p-6"}>
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                1
              </span>
              Business Information
            </div>
          </div>
          <CardTitle className={`font-bold text-center ${isMobile ? "text-xl" : "text-2xl"}`}>
            Create Your QR Code
          </CardTitle>
          <p className={`text-center text-gray-600 ${isMobile ? "text-sm" : ""}`}>
            Enter your business details to get started
          </p>
        </CardHeader>

        <CardContent className={`space-y-6 ${isMobile ? "p-4 pt-2" : "p-6 pt-2"}`}>
          {/* QR Type Selection */}
          <div className="space-y-4">
            <label className={`font-semibold block ${isMobile ? "text-base" : "text-lg"}`}>
              What type of QR code do you need?
            </label>
            <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
              <Button
                variant={data.qrType === "feedback" ? "default" : "outline"}
                onClick={() => onDataChange({ ...data, qrType: "feedback" })}
                className={`${isMobile ? "h-16 justify-start text-left p-4" : "h-20 p-4"}`}
              >
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Feedback & Reviews</div>
                    <div className={`text-xs opacity-75 ${isMobile ? "hidden" : ""}`}>
                      Google Reviews, feedback forms
                    </div>
                  </div>
                </div>
              </Button>
              <Button
                variant={data.qrType === "website" ? "default" : "outline"}
                onClick={() => onDataChange({ ...data, qrType: "website" })}
                className={`${isMobile ? "h-16 justify-start text-left p-4" : "h-20 p-4"}`}
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Business Website</div>
                    <div className={`text-xs opacity-75 ${isMobile ? "hidden" : ""}`}>
                      Company website, landing pages
                    </div>
                  </div>
                </div>
              </Button>
            </div>
            {data.qrType === "feedback" && (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  💡 Tip: Use Google colors in customization for authentic review experience
                </p>
              </div>
            )}
          </div>

          {/* Business Name */}
          <div className="space-y-2">
            <label htmlFor="businessName" className={`font-medium block ${isMobile ? "text-sm" : ""}`}>
              Business Name *
            </label>
            <Input
              id="businessName"
              type="text"
              placeholder="Enter your business name"
              value={data.businessName}
              onChange={(e) => onDataChange({ ...data, businessName: e.target.value })}
              className={`w-full ${isMobile ? "h-12" : "h-14 text-lg"}`}
              required
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <label htmlFor="url" className={`font-medium block ${isMobile ? "text-sm" : ""}`}>
              {data.qrType === "feedback" ? "Review/Feedback URL *" : "Website URL *"}
            </label>
            <Input
              id="url"
              type="url"
              placeholder={
                data.qrType === "feedback" ? "https://g.page/r/your-business/review" : "https://www.yourbusiness.com"
              }
              value={data.url}
              onChange={(e) => onDataChange({ ...data, url: e.target.value })}
              className={`w-full ${isMobile ? "h-12" : "h-14 text-lg"}`}
              required
            />
            <p className="text-xs text-gray-500">
              {data.qrType === "feedback"
                ? "Paste your Google Review link or feedback form URL"
                : "Enter your complete website URL including https://"}
            </p>
          </div>

          {/* Logo Upload */}
          <div className="space-y-3">
            <label className={`font-medium block ${isMobile ? "text-sm" : ""}`}>Business Logo (Optional)</label>
            <div className={`flex items-center gap-3 ${isMobile ? "flex-col" : ""}`}>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center gap-2 ${isMobile ? "w-full h-12" : "h-12"}`}
              >
                <Upload className="h-4 w-4" />
                {data.uploadedImage ? "Change Logo" : "Upload Logo"}
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {data.uploadedImage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className={`text-red-600 hover:text-red-700 ${isMobile ? "w-full h-10" : ""}`}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
            {data.uploadedImage && (
              <div className="flex justify-center">
                <img
                  src={data.uploadedImage || "/placeholder.svg"}
                  alt="Business logo preview"
                  className={`object-contain border rounded-lg ${isMobile ? "max-w-20 max-h-20" : "max-w-24 max-h-24"}`}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button onClick={onNext} disabled={!isValid} className={`w-full ${isMobile ? "h-12" : "h-14 text-lg"}`}>
              <ArrowRight className="h-5 w-5 mr-2" />
              Continue to Preview & Customize
            </Button>

            <Button variant="outline" onClick={onShowTemplates} className={`w-full ${isMobile ? "h-10" : "h-12"}`}>
              <Sparkles className="h-4 w-4 mr-2" />
              Browse Templates
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              Need help? Check our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                quick start guide
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
