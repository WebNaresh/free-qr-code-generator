interface BusinessData {
  businessName: string
  url: string
  qrType: "feedback" | "website"
  timestamp: string
  userAgent: string
  hasLogo: boolean
}

export async function trackQRGeneration(data: Omit<BusinessData, "timestamp" | "userAgent">) {
  try {
    const trackingData: BusinessData = {
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }

    // Store in localStorage for now (you can replace with API call)
    const existingData = localStorage.getItem("qr_analytics")
    const analytics = existingData ? JSON.parse(existingData) : []
    analytics.push(trackingData)
    localStorage.setItem("qr_analytics", JSON.stringify(analytics))

    // Optional: Send to your analytics endpoint
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(trackingData)
    // })

    console.log("QR Generation tracked:", trackingData)
  } catch (error) {
    console.error("Analytics tracking failed:", error)
  }
}

export function getAnalytics() {
  try {
    const data = localStorage.getItem("qr_analytics")
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Failed to retrieve analytics:", error)
    return []
  }
}
