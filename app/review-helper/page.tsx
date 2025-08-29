"use client"

import { Suspense, useEffect, useState } from 'react'
import ReviewHelper from '@/components/ReviewHelper'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Star } from 'lucide-react'

function ReviewPageContent() {
  const [businessName, setBusinessName] = useState('')
  const [reviewUrl, setReviewUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Extract parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    setBusinessName(urlParams.get('business') || 'this business')
    setReviewUrl(urlParams.get('url') || 'https://google.com')
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <LoadingFallback />
  }

  return <ReviewHelper businessName={businessName} reviewUrl={reviewUrl} />
}

function LoadingFallback() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Loading review helper...</p>
      </CardContent>
    </Card>
  )
}

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">Review Helper</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for visiting! Our AI assistant will help you write a thoughtful review 
            that's helpful to other customers.
          </p>
        </div>

        {/* Review Helper Component */}
        <ReviewPageContent />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by AI • Reviews help businesses improve their service</p>
        </div>
      </div>
    </div>
  )
}
