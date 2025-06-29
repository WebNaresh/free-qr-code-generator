'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LogoColors {
  primary: string
  secondary: string
  light: string
  dark: string
}

interface ColorContextType {
  logoColors: LogoColors | null
  setLogoColors: (colors: LogoColors | null) => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export function ColorProvider({ children }: { children: ReactNode }) {
  const [logoColors, setLogoColors] = useState<LogoColors | null>(null)

  return (
    <ColorContext.Provider value={{ logoColors, setLogoColors }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColors() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider')
  }
  return context
} 