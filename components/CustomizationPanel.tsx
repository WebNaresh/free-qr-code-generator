"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Layout, Settings, Sparkles, RotateCcw } from "lucide-react"
import { type QRCustomization, defaultCustomization, colorPresets, layoutTemplates } from "@/lib/customization"

interface CustomizationPanelProps {
  customization: QRCustomization
  onCustomizationChange: (customization: QRCustomization) => void
  isVisible: boolean
  onToggle: () => void
}

export default function CustomizationPanel({
  customization,
  onCustomizationChange,
  isVisible,
  onToggle,
}: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState("colors")

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

  if (!isVisible) {
    return (
      <Button variant="outline" onClick={onToggle} className="fixed top-4 right-4 z-50 shadow-lg">
        <Settings className="h-4 w-4 mr-2" />
        Customize
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Customize Your QR Code</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button variant="outline" onClick={onToggle}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center gap-1">
                <Type className="h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-1">
                <Layout className="h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Color Presets</Label>
                  <Button variant="outline" size="sm" onClick={generateRandomColors}>
                    <Sparkles className="h-4 w-4 mr-1" />
                    Random
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(colorPresets).map(([name, preset]) => (
                    <Button
                      key={name}
                      variant="outline"
                      className="h-12 p-2"
                      onClick={() => applyColorPreset(name as keyof typeof colorPresets)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                        <span className="capitalize text-xs">{name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={customization.primaryColor}
                    onChange={(e) => updateCustomization({ primaryColor: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={customization.secondaryColor}
                    onChange={(e) => updateCustomization({ secondaryColor: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={customization.backgroundColor}
                    onChange={(e) => updateCustomization({ backgroundColor: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="qrCodeColor">QR Code Color</Label>
                  <Input
                    id="qrCodeColor"
                    type="color"
                    value={customization.qrCodeColor}
                    onChange={(e) => updateCustomization({ qrCodeColor: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              <div>
                <Label htmlFor="headerFont">Header Font</Label>
                <Select
                  value={customization.headerFont}
                  onValueChange={(value) => updateCustomization({ headerFont: value })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="headerSize">Header Size</Label>
                <Select
                  value={customization.headerSize}
                  onValueChange={(value: any) => updateCustomization({ headerSize: value })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="customHeader">Custom Header Text</Label>
                <Input
                  id="customHeader"
                  placeholder="Leave empty for default"
                  value={customization.customHeader}
                  onChange={(e) => updateCustomization({ customHeader: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="customSubheader">Custom Subheader Text</Label>
                <Input
                  id="customSubheader"
                  placeholder="Leave empty for default"
                  value={customization.customSubheader}
                  onChange={(e) => updateCustomization({ customSubheader: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="customFooter">Custom Footer Text</Label>
                <Input
                  id="customFooter"
                  placeholder="Leave empty for default"
                  value={customization.customFooter}
                  onChange={(e) => updateCustomization({ customFooter: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <div>
                <Label className="text-lg font-semibold">Layout Templates</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.keys(layoutTemplates).map((template) => (
                    <Button
                      key={template}
                      variant={customization.layout === template ? "default" : "outline"}
                      onClick={() => applyLayoutTemplate(template as keyof typeof layoutTemplates)}
                      className="capitalize"
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="logoPosition">Logo Position</Label>
                <Select
                  value={customization.logoPosition}
                  onValueChange={(value: any) => updateCustomization({ logoPosition: value })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="logoSize">Logo Size</Label>
                <Select
                  value={customization.logoSize}
                  onValueChange={(value: any) => updateCustomization({ logoSize: value })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="showWebsite">Show Website URL</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showBorder"
                  checked={customization.showBorder}
                  onCheckedChange={(checked) => updateCustomization({ showBorder: checked })}
                />
                <Label htmlFor="showBorder">Show Border</Label>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div>
                <Label htmlFor="cornerRadius">Corner Radius: {customization.cornerRadius}px</Label>
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

              <div>
                <Label htmlFor="padding">Padding</Label>
                <Select
                  value={customization.padding}
                  onValueChange={(value: any) => updateCustomization({ padding: value })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="shadowIntensity">Shadow Intensity</Label>
                <Select
                  value={customization.shadowIntensity}
                  onValueChange={(value: any) => updateCustomization({ shadowIntensity: value })}
                >
                  <SelectTrigger>
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
                <Label htmlFor="borderStyle">Border Style</Label>
                <Select
                  value={customization.borderStyle}
                  onValueChange={(value: any) => updateCustomization({ borderStyle: value })}
                >
                  <SelectTrigger>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
