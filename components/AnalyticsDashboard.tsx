"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAnalytics } from "@/lib/analytics"
import { BarChart3, Download, Users, Globe, Star } from "lucide-react"

interface AnalyticsData {
  businessName: string
  url: string
  qrType: "feedback" | "website"
  timestamp: string
  userAgent: string
  hasLogo: boolean
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const data = getAnalytics()
    setAnalytics(data)
  }, [])

  const exportData = () => {
    const csvContent = [
      ["Business Name", "URL", "QR Type", "Has Logo", "Timestamp", "User Agent"],
      ...analytics.map((item) => [
        item.businessName,
        item.url,
        item.qrType,
        item.hasLogo ? "Yes" : "No",
        item.timestamp,
        item.userAgent,
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `qr_analytics_${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const stats = {
    total: analytics.length,
    feedback: analytics.filter((item) => item.qrType === "feedback").length,
    website: analytics.filter((item) => item.qrType === "website").length,
    withLogo: analytics.filter((item) => item.hasLogo).length,
  }

  if (!isVisible) {
    return (
      <Button variant="outline" onClick={() => setIsVisible(true)} className="fixed bottom-4 right-4 z-50">
        <BarChart3 className="h-4 w-4 mr-2" />
        Analytics
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">QR Code Analytics Dashboard</CardTitle>
          <Button variant="outline" onClick={() => setIsVisible(false)}>
            Close
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-gray-600">Total QR Codes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{stats.feedback}</div>
                <div className="text-sm text-gray-600">Feedback QRs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{stats.website}</div>
                <div className="text-sm text-gray-600">Website QRs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{stats.withLogo}</div>
                <div className="text-sm text-gray-600">With Logo</div>
              </CardContent>
            </Card>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <Button onClick={exportData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent QR Code Generations</h3>
            <div className="space-y-2 max-h-60 overflow-auto">
              {analytics
                .slice(-10)
                .reverse()
                .map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{item.businessName}</div>
                        <div className="text-sm text-gray-600">{item.url}</div>
                        <div className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.qrType === "feedback" ? (
                          <Star className="h-4 w-4 text-orange-600" />
                        ) : (
                          <Globe className="h-4 w-4 text-green-600" />
                        )}
                        {item.hasLogo && (
                          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Logo</div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
