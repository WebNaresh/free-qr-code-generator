"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { QRCustomization } from "@/lib/customization"

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
]

interface TemplateSelectorProps {
  onSelectTemplate: (customization: Partial<QRCustomization>) => void
  isVisible: boolean
  onClose: () => void
}

export default function TemplateSelector({ onSelectTemplate, isVisible, onClose }: TemplateSelectorProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Choose a Template</h2>
              <p className="text-gray-600">Start with a pre-designed template for your industry</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{template.preview}</div>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <Button
                    onClick={() => {
                      onSelectTemplate(template.customization)
                      onClose()
                    }}
                    className="w-full"
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
