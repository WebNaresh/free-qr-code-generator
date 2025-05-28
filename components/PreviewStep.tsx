"use client"

import type React from "react"
import { ArrowLeft, Palette, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PreviewStepProps {
  data: any
  onBack: () => void
  isMobile: boolean
  setShowCustomization: (show: boolean) => void
}

const PreviewStep: React.FC<PreviewStepProps> = ({ data, onBack, isMobile, setShowCustomization }) => {
  return (
    <div>
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-40 shadow-sm">
        <div className={`container mx-auto ${isMobile ? "px-4 py-3" : "px-6 py-4"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {!isMobile && "Back"}
              </Button>
              <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-2">
                  2
                </span>
                Preview & Customize
              </Badge>
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

      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Preview</CardTitle>
                <CardDescription>This is how your QR code will look like.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <img src="/placeholder-qr.png" alt="QR Code" className="w-64 h-64" />
                </div>
              </CardContent>
            </Card>
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
                    <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                    <p className="text-lg font-semibold">{data.businessName}</p>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      {data.qrType === "feedback" ? "Review URL" : "Website URL"}
                    </label>
                    <p className="text-sm text-blue-600 break-all">{data.url}</p>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">QR Code Type</label>
                    <Badge variant="secondary" className="mt-1">
                      {data.qrType === "feedback" ? "Feedback & Reviews" : "Business Website"}
                    </Badge>
                  </div>
                  {data.uploadedImage && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Logo</label>
                        <img
                          src={data.uploadedImage || "/placeholder.svg"}
                          alt="Business logo"
                          className="w-16 h-16 object-contain border rounded-lg mt-2"
                        />
                      </div>
                    </>
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
    </div>
  )
}

export default PreviewStep
