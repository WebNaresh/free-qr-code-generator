export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

export const getResponsiveClasses = (base: string, variants: Record<string, string>) => {
  return (
    Object.entries(variants)
      .map(([breakpoint, value]) => `${breakpoint}:${value}`)
      .join(" ") + ` ${base}`
  )
}

export const deviceDetection = {
  isMobile: () => typeof window !== "undefined" && window.innerWidth < 768,
  isTablet: () => typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024,
  isDesktop: () => typeof window !== "undefined" && window.innerWidth >= 1024,
}
