export interface QRCustomization {
  // Colors
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  qrCodeColor: string
  qrCodeBackground: string

  // Typography
  headerFont: string
  bodyFont: string
  headerSize: "small" | "medium" | "large" | "xl"

  // Layout
  layout: "classic" | "modern" | "minimal" | "corporate"
  logoPosition: "top" | "bottom" | "left" | "right" | "center"
  logoSize: "small" | "medium" | "large"

  // Content
  customHeader: string
  customSubheader: string
  customFooter: string
  showWebsite: boolean
  showBorder: boolean
  borderStyle: "solid" | "dashed" | "dotted" | "double"
  showGoogleIcons: boolean
  showStars: boolean

  // Advanced
  cornerRadius: number
  padding: "tight" | "normal" | "spacious"
  shadowIntensity: "none" | "light" | "medium" | "heavy"
}

export const defaultCustomization: QRCustomization = {
  primaryColor: "#4f46e5",
  secondaryColor: "#6366f1",
  backgroundColor: "#ffffff",
  qrCodeColor: "#000000",
  qrCodeBackground: "#ffffff",
  headerFont: "Inter",
  bodyFont: "Inter",
  headerSize: "medium",
  layout: "minimal", // Changed to minimal by default
  logoPosition: "top",
  logoSize: "medium",
  customHeader: "",
  customSubheader: "",
  customFooter: "",
  showWebsite: true,
  showBorder: false, // Changed to false for minimal look
  borderStyle: "solid",
  showGoogleIcons: true, // New option for Google icons
  showStars: true, // New option for star ratings
  cornerRadius: 8, // Reduced for minimal look
  padding: "normal",
  shadowIntensity: "light", // Reduced for minimal look
}

export const colorPresets = {
  professional: { primary: "#1e40af", secondary: "#3b82f6", bg: "#f8fafc" },
  warm: { primary: "#dc2626", secondary: "#ef4444", bg: "#fef2f2" },
  nature: { primary: "#059669", secondary: "#10b981", bg: "#f0fdf4" },
  sunset: { primary: "#ea580c", secondary: "#f97316", bg: "#fff7ed" },
  purple: { primary: "#7c3aed", secondary: "#8b5cf6", bg: "#faf5ff" },
  dark: { primary: "#374151", secondary: "#6b7280", bg: "#f9fafb" },
  google: { primary: "#4285f4", secondary: "#34a853", bg: "#f8f9fa" }, // Added Google colors
}

export const layoutTemplates = {
  classic: {
    padding: "normal" as const,
    borderStyle: "solid" as const,
    cornerRadius: 8,
    shadowIntensity: "light" as const,
    showBorder: true,
  },
  modern: {
    padding: "spacious" as const,
    borderStyle: "solid" as const,
    cornerRadius: 16,
    shadowIntensity: "medium" as const,
    showBorder: true,
  },
  minimal: {
    padding: "tight" as const,
    borderStyle: "solid" as const,
    cornerRadius: 4,
    shadowIntensity: "none" as const,
    showBorder: false,
  },
  corporate: {
    padding: "normal" as const,
    borderStyle: "double" as const,
    cornerRadius: 0,
    shadowIntensity: "heavy" as const,
    showBorder: true,
  },
}
