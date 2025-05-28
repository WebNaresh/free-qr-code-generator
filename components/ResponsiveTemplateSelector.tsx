"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
import type { QRCustomization } from "@/lib/customization"
import { useResponsive } from "@/hooks/useResponsive"

interface Template {
  id: string
  name: string
  description: string
  category: string
  customization: Partial<QRCustomization>
  preview: string
}

const templates: Template[] = [
  {
    id: "restaurant",
    name: "Restaurant Reviews",
    description: "Perfect for collecting customer feedback",
    category: "Food & Beverage",
    customization: {
      primaryColor: "#dc2626",
      secondaryColor: "#ef4444",
      backgroundColor: "#fef2f2",
      customHeader: "How was your meal?",
      customSubheader: "Your feedback helps us improve",
      layout: "warm" as any,
    },
    preview: "🍽️",
  },
  {
    id: "retail",
    name: "Retail Store",
    description: "Great for product reviews and website visits",
    category: "Retail",
    customization: {
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      backgroundColor: "#f0fdf4",
      customHeader: "Shop with us online",
      customSubheader: "Discover our latest collection",
      layout: "modern",
    },
    preview: "🛍️",
  },
  {
    id: "professional",
    name: "Professional Services",
    description: "Clean design for consultants and agencies",
    category: "Professional",
    customization: {
      primaryColor: "#1e40af",
      secondaryColor: "#3b82f6",
      backgroundColor: "#f1f5f9",
      customHeader: "Connect with us",
      customSubheader: "Professional services you can trust",
      layout: "corporate",
    },
    preview: "💼",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Trusted design for medical practices",
    category: "Healthcare",
    customization: {
      primaryColor: "#0891b2",
      secondaryColor: "#06b6d4",
      backgroundColor: "#f0f9ff",
      customHeader: "Rate your experience",
      customSubheader: "Help us provide better care",
      layout: "minimal",
    },
    preview: "🏥",
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    description: "Elegant design for salons and spas",
    category: "Beauty",
    customization: {
      primaryColor: "#7c3aed",
      secondaryColor: "#8b5cf6",
      backgroundColor: "#faf5ff",
      customHeader: "Share your experience",
      customSubheader: "Help others discover us",
      layout: "modern",
    },
    preview: "💅",
  },
  {
    id: "fitness",
    name: "Fitness & Gym",
    description: "Energetic design for fitness centers",
    category: "Fitness",
    customization: {
      primaryColor: "#ea580c",
      secondaryColor: "#f97316",
      backgroundColor: "#fff7ed",
      customHeader: "Rate your workout",
      customSubheader: "Help us improve your experience",
      layout: "modern",
    },
    preview: "💪",
  },
  {
    id: "google-review",
    name: "Google Reviews",
    description: "Optimized for Google review collection",
    category: "Reviews",
    customization: {
      primaryColor: "#4285f4",
      secondaryColor: "#34a853",
      backgroundColor: "#f8f9fa",
      customHeader: "Rate your experience",
      customSubheader: "Help others discover us on Google",
      layout: "minimal",
      showGoogleIcons: true,
      showStars: true,
      showBorder: false,
      cornerRadius: 8,
      shadowIntensity: "light",
    },
    preview: "⭐",
  },
]

interface ResponsiveTemplateSelectorProps {
  onSelectTemplate: (customization: Partial<QRCustomization>) => void
  isVisible: boolean
  onClose: () => void
}

export default function ResponsiveTemplateSelector({
  onSelectTemplate,
  isVisible,
  onClose,
}: ResponsiveTemplateSelectorProps) {
  const { isMobile, isTablet } = useResponsive()

  if (!isVisible) return null

  const TemplateContent = () => (
    <ScrollArea className="h-full">
      <div className={`grid gap-3 p-1 ${isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"}`}>
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-primary/50"
          >
            <CardContent className={`${isMobile ? "p-3" : "p-4"}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`${isMobile ? "text-2xl" : "text-3xl"}`}>{template.preview}</div>
                <Badge variant="secondary" className={isMobile ? "text-xs px-2 py-1" : ""}>
                  {template.category}
                </Badge>
              </div>
              <h3 className={`font-semibold mb-2 ${isMobile ? "text-base" : "text-lg"}`}>{template.name}</h3>
              <p className={`text-muted-foreground mb-4 ${isMobile ? "text-sm" : "text-sm"}`}>{template.description}</p>
              <Button
                onClick={() => {
                  onSelectTemplate(template.customization)
                  onClose()
                }}
                className={`w-full ${isMobile ? "h-9 text-sm" : ""}`}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )

  // Mobile: Full screen overlay
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-auto">
        <div className="p-4 border-b bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Choose Template</h2>
              <p className="text-sm text-muted-foreground">Pick a design for your industry</p>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <TemplateContent />
        </div>
      </div>
    )
  }

  // Tablet/Desktop: Modal
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-h-[90vh] overflow-hidden ${isTablet ? "max-w-2xl" : "max-w-4xl"}`}>
        <CardContent className={isTablet ? "p-4" : "p-6"}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className={`font-bold ${isTablet ? "text-xl" : "text-2xl"}`}>Choose a Template</h2>
              <p className="text-muted-foreground">Start with a pre-designed template for your industry</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
          <Separator className="mb-6" />
          <div className="h-96">
            <TemplateContent />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
