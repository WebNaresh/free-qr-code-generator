"use client"

import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GoogleReviewElementsProps {
  showIcons: boolean
  showStars: boolean
  primaryColor: string
  secondaryColor: string
  isMobile?: boolean
}

export function GoogleReviewElements({
  showIcons,
  showStars,
  primaryColor,
  secondaryColor,
  isMobile,
}: GoogleReviewElementsProps) {
  if (!showIcons && !showStars) return null

  return (
    <div className={`flex flex-col items-center gap-2 ${isMobile ? "mb-2" : "mb-3"}`}>
      {/* Google Logo */}
      {showIcons && (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-blue-500 font-bold text-lg">G</span>
            <span className="text-red-500 font-bold text-lg">o</span>
            <span className="text-yellow-500 font-bold text-lg">o</span>
            <span className="text-blue-500 font-bold text-lg">g</span>
            <span className="text-green-500 font-bold text-lg">l</span>
            <span className="text-red-500 font-bold text-lg">e</span>
          </div>
          <Badge variant="secondary" className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
            Reviews
          </Badge>
        </div>
      )}

      {/* Star Rating */}
      {showStars && (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} fill-yellow-400 text-yellow-400`} />
          ))}
          <Badge variant="outline" className={`ml-2 font-medium ${isMobile ? "text-sm" : "text-base"}`}>
            5.0
          </Badge>
        </div>
      )}
    </div>
  )
}

export function GoogleReviewBadge({ isMobile }: { isMobile?: boolean }) {
  return (
    <Badge
      variant="secondary"
      className={`inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm border ${isMobile ? "text-xs" : "text-sm"}`}
    >
      <div className="flex items-center">
        <span className="text-blue-500 font-bold">G</span>
        <span className="text-red-500 font-bold">o</span>
        <span className="text-yellow-500 font-bold">o</span>
        <span className="text-blue-500 font-bold">g</span>
        <span className="text-green-500 font-bold">l</span>
        <span className="text-red-500 font-bold">e</span>
      </div>
      <span className="text-gray-700 font-medium">Review</span>
    </Badge>
  )
}
