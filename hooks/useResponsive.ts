"use client"

import { useState, useEffect } from "react"

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  })

  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight

      setWindowSize({ width, height })

      if (width < 768) {
        setDevice("mobile")
      } else if (width < 1024) {
        setDevice("tablet")
      } else {
        setDevice("desktop")
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    windowSize,
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  }
}
