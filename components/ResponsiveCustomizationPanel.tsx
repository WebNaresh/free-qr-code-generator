"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Layout, Settings, Sparkles, RotateCcw } from "lucide-react"
import { type QRCustomization, defaultCustomization, colorPresets, layoutTemplates } from "@/lib/customization"
import { useResponsive } from "@/hooks/useResponsive"

interface ResponsiveCustomizationPanelProps {
  customization: QRCustomization
  onCustomizationChange: (customization: QRCustomization) => void
  isVisible: boolean
  onToggle: () => void
}

export default function ResponsiveCustomizationPanel({
  customization,
  onCustomizationChange,
  isVisible,
  onToggle,
}: ResponsiveCustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState("colors")
  const { isMobile, isTablet } = useResponsive()

  const updateCustomization = (updates: Partial<QRCustomization>) => {
    onCustomizationChange({ ...customization, ...updates })
  }

  const applyColorPreset = (presetName: keyof typeof colorPresets) => {
    const preset = colorPresets[presetName]
    updateCustomization({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      backgroundColor: preset.bg,
    })
  }

  const applyLayoutTemplate = (templateName: keyof typeof layoutTemplates) => {
    const template = layoutTemplates[templateName]
    updateCustomization({
      layout: templateName,
      ...template,
    })
  }

  const resetToDefaults = () => {
    onCustomizationChange(defaultCustomization)
  }

  const generateRandomColors = () => {
    const hue = Math.floor(Math.random() * 360)
    const primary = `hsl(${hue}, 70%, 50%)`
    const secondary = `hsl(${(hue + 30) % 360}, 70%, 60%)`
    const background = `hsl(${hue}, 30%, 95%)`

    updateCustomization({
      primaryColor: primary,
      secondaryColor: secondary,
      backgroundColor: background,
    })
  }

  const CustomizationContent = () => (
    <div className="space-y-4 sm:space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? "grid-cols-2" : "grid-cols-4"} ${isMobile ? "h-auto" : ""}`}>
          <TabsTrigger value="colors" className={`flex items-center gap-1 ${isMobile ? "flex-col py-3" : ""}`}>
            <Palette className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className={`flex items-center gap-1 ${isMobile ? "flex-col py-3" : ""}`}>
            <Type className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Text</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className={`flex items-center gap-1 ${isMobile ? "flex-col py-3" : ""}`}>
            <Layout className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Layout</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className={`flex items-center gap-1 ${isMobile ? "flex-col py-3" : ""}`}>
            <Settings className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4 sm:space-y-6 mt-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Color Presets</Label>
              <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={generateRandomColors}>
                <Sparkles className="h-4 w-4 mr-1" />
                {!isMobile && "Random"}
              </Button>
            </div>
            <div className={`grid gap-2 ${isMobile ? "grid-cols-2" : isTablet ? "grid-cols-3" : "grid-cols-3"}`}>
              {Object.entries(colorPresets).map(([name, preset]) => (
                <Button
                  key={name}
                  variant="outline"
                  className={`${isMobile ? "h-10 p-2" : "h-12 p-2"}`}
                  onClick={() => applyColorPreset(name as keyof typeof colorPresets)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                    <span className={`capitalize ${isMobile ? "text-xs" : "text-xs"}`}>{name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
            <div>
              <Label htmlFor="primaryColor" className={isMobile ? "text-sm" : ""}>
                Primary Color
              </Label>
              <Input
                id="primaryColor"
                type="color"
                value={customization.primaryColor}
                onChange={(e) => updateCustomization({ primaryColor: e.target.value })}
                className={isMobile ? "h-10" : "h-12"}
              />
            </div>
            <div>
              <Label htmlFor="secondaryColor" className={isMobile ? "text-sm" : ""}>
                Secondary Color
              </Label>
              <Input
                id="secondaryColor"
                type="color"
                value={customization.secondaryColor}
                onChange={(e) => updateCustomization({ secondaryColor: e.target.value })}
                className={isMobile ? "h-10" : "h-12"}
              />
            </div>
            <div>
              <Label htmlFor="backgroundColor" className={isMobile ? "text-sm" : ""}>
                Background Color
              </Label>
              <Input
                id="backgroundColor"
                type="color"
                value={customization.backgroundColor}
                onChange={(e) => updateCustomization({ backgroundColor: e.target.value })}
                className={isMobile ? "h-10" : "h-12"}
              />
            </div>
            <div>
              <Label htmlFor="qrCodeColor" className={isMobile ? "text-sm" : ""}>
                QR Code Color
              </Label>
              <Input
                id="qrCodeColor"
                type="color"
                value={customization.qrCodeColor}
                onChange={(e) => updateCustomization({ qrCodeColor: e.target.value })}
                className={isMobile ? "h-10" : "h-12"}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4 sm:space-y-6 mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="headerFont" className={isMobile ? "text-sm" : ""}>
                Header Font
              </Label>
              <Select
                value={customization.headerFont}
                onValueChange={(value) => updateCustomization({ headerFont: value })}
              >
                <SelectTrigger className={isMobile ? "h-10" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter (Modern)</SelectItem>
                  <SelectItem value="Georgia">Georgia (Classic)</SelectItem>
                  <SelectItem value="Arial">Arial (Clean)</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman (Traditional)</SelectItem>
                  <SelectItem value="Helvetica">Helvetica (Professional)</SelectItem>
                  <SelectItem value="Roboto">Roboto (Friendly)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="headerSize" className={isMobile ? "text-sm" : ""}>
                Header Size
              </Label>
              <Select
                value={customization.headerSize}
                onValueChange={(value: any) => updateCustomization({ headerSize: value })}
              >
                <SelectTrigger className={isMobile ? "h-10" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="customHeader" className={isMobile ? "text-sm" : ""}>
                Custom Header Text
              </Label>
              <Input
                id="customHeader"
                placeholder="Leave empty for default"
                value={customization.customHeader}
                onChange={(e) => updateCustomization({ customHeader: e.target.value })}
                className={isMobile ? "h-10" : ""}
              />
            </div>

            <div>
              <Label htmlFor="customSubheader" className={isMobile ? "text-sm" : ""}>
                Custom Subheader Text
              </Label>
              <Input
                id="customSubheader"
                placeholder="Leave empty for default"
                value={customization.customSubheader}
                onChange={(e) => updateCustomization({ customSubheader: e.target.value })}
                className={isMobile ? "h-10" : ""}
              />
            </div>

            <div>
              <Label htmlFor="customFooter" className={isMobile ? "text-sm" : ""}>
                Custom Footer Text
              </Label>
              <Input
                id="customFooter"
                placeholder="Leave empty for default"
                value={customization.customFooter}
                onChange={(e) => updateCustomization({ customFooter: e.target.value })}
                className={isMobile ? "h-10" : ""}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 sm:space-y-6 mt-4">
          <div>
            <Label className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Layout Templates</Label>
            <div className={`grid gap-2 mt-2 ${isMobile ? "grid-cols-2" : "grid-cols-2"}`}>
              {Object.keys(layoutTemplates).map((template) => (
                <Button
                  key={template}
                  variant={customization.layout === template ? "default" : "outline"}
                  onClick={() => applyLayoutTemplate(template as keyof typeof layoutTemplates)}
                  className={`capitalize ${isMobile ? "h-10 text-sm" : ""}`}
                >
                  {template}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="logoPosition" className={isMobile ? "text-sm" : ""}>
                Logo Position
              </Label>
              <Select
                value={customization.logoPosition}
                onValueChange={(value: any) => updateCustomization({ logoPosition: value })}
              >
                <SelectTrigger className={isMobile ? "h-10" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="logoSize" className={isMobile ? "text-sm" : ""}>
                Logo Size
              </Label>
              <Select
                value={customization.logoSize}
                onValueChange={(value: any) => updateCustomization({ logoSize: value })}
              >
                <SelectTrigger className={isMobile ? "h-10" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showWebsite"
                checked={customization.showWebsite}
                onCheckedChange={(checked) => updateCustomization({ showWebsite: checked })}
              />
              <Label htmlFor="showWebsite" className={isMobile ? "text-sm" : ""}>
                Show Website URL
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showBorder"
                checked={customization.showBorder}
                onCheckedChange={(checked) => updateCustomization({ showBorder: checked })}
              />
              <Label htmlFor="showBorder" className={isMobile ? "text-sm" : ""}>
                Show Border
              </Label>
            </div>

            {/* Google Review Options - Only show for feedback QR codes */}
            <div className="space-y-4 pt-4 border-t">
              <Label className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Google Review Options</Label>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showGoogleIcons"
                  checked={customization.showGoogleIcons}
                  onCheckedChange={(checked) => updateCustomization({ showGoogleIcons: checked })}
                />
                <Label htmlFor="showGoogleIcons" className={isMobile ? "text-sm" : ""}>
                  Show Google Logo
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showStars"
                  checked={customization.showStars}
                  onCheckedChange={(checked) => updateCustomization({ showStars: checked })}
                />
                <Label htmlFor="showStars" className={isMobile ? "text-sm" : ""}>
                  Show Star Rating
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 sm:space-y-6 mt-4">
          <div>
            <Label htmlFor="cornerRadius" className={isMobile ? "text-sm" : ""}>
              Corner Radius: {customization.cornerRadius}px
            </Label>
            <Slider
              id="cornerRadius"
              min={0}
              max={32}
              step={2}
              value={[customization.cornerRadius]}
              onValueChange={([value]) => updateCustomization({ cornerRadius: value })}
              className="mt-2"
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="padding" className={isMobile ? "text-sm" : ""}>
                Padding
              </Label>
              <Select
                value={customization.padding}
                onValueChange={(value: any) => updateCustomization({ padding: value })}
              >
                <SelectTrigger className={isMobile ? "h-10" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tight">Tight</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="shadowIntensity" className={isMobile ? "text-sm" : ""}>
                Shadow Intensity
              </Label>
              <Select
                value={customization.shadowIntensity}
                onValueChange={(value: any) => updateCustomization({ shadowIntensity: value })}
              >
                <SelectTrigger className={isMobile ? "h-10" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="borderStyle" className={isMobile ? "text-sm" : ""}>
                Border Style
              </Label>
              <Select
                value={customization.borderStyle}
                onValueChange={(value: any) => updateCustomization({ borderStyle: value })}
              >
                <SelectTrigger className={isMobile ? "h-10" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  if (!isVisible) {
    return (
      <Button variant="outline" onClick={() => onToggle()}>
        Customize QR Code
      </Button>
    )
  }

  // Tablet/Desktop: Use Modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-auto ${isTablet ? "max-w-lg" : "max-w-2xl"}`}
      >
        <div className="flex flex-row items-center justify-between p-4 border-b">
          <h2 className={`font-bold ${isTablet ? "text-xl" : "text-2xl"}`}>Customize Your QR Code</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button variant="outline" onClick={onToggle}>
              Close
            </Button>
          </div>
        </div>
        <div className="p-4">
          <CustomizationContent />
        </div>
      </div>
    </div>
  )
}
