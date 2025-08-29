"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Star, Sparkles, RefreshCw, ExternalLink, ThumbsUp } from "lucide-react"
import { toast } from "sonner"

interface ReviewHelperProps {
  businessName: string
  reviewUrl: string
  onClose?: () => void
}

export default function ReviewHelper({ businessName, reviewUrl, onClose }: ReviewHelperProps) {
  const [selectedRating, setSelectedRating] = useState<number>(5)
  const [businessType, setBusinessType] = useState<string>('')
  const [experienceType, setExperienceType] = useState<string>('')
  const [generatedReview, setGeneratedReview] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [isFallback, setIsFallback] = useState(false)

  const businessTypes = [
    'Restaurant', 'Retail Store', 'Service Provider', 'Healthcare', 'Beauty/Salon',
    'Auto Service', 'Real Estate', 'Hotel/Accommodation', 'Fitness/Gym', 'Education',
    'Entertainment', 'Professional Services', 'Other'
  ]

  const experienceTypes = [
    'First-time visit', 'Regular customer', 'Special occasion', 'Quick service',
    'Detailed consultation', 'Online service', 'Emergency service', 'Event/catering'
  ]

  const generateReview = async () => {
    if (!businessType || !experienceType) {
      toast.error('Please select business type and experience type')
      return
    }

    setIsGenerating(true)
    toast.info('🤖 AI is generating your review...')

    try {
      const response = await fetch('/api/generate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName,
          businessType,
          experienceType,
          rating: selectedRating
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error('Empty response from server')
      }

      const result = JSON.parse(text)

      if (result.success) {
        setGeneratedReview(result.review)
        setIsFallback(result.fallback || false)
        setShowReview(true)
        
        if (result.fallback) {
          toast.success('📝 Review template generated (AI offline)')
        } else {
          toast.success('✨ AI-powered review generated!')
        }
      } else {
        toast.error('Failed to generate review. Please try again.')
      }
    } catch (error) {
      console.error('Error generating review:', error)
      toast.error('Failed to generate review. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyReview = async () => {
    try {
      await navigator.clipboard.writeText(generatedReview)
      toast.success('Review copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
      toast.error('Failed to copy review')
    }
  }

  const openReviewPage = () => {
    window.open(reviewUrl, '_blank')
    if (onClose) onClose()
  }

  if (showReview) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Your AI-Generated Review
            {isFallback && <Badge variant="outline" className="text-xs">Template</Badge>}
          </CardTitle>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= selectedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{selectedRating}/5 stars</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Generated Review for {businessName}:</h3>
            <Textarea
              value={generatedReview}
              onChange={(e) => setGeneratedReview(e.target.value)}
              className="min-h-32 resize-none"
              placeholder="Your review will appear here..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Feel free to edit this review to match your personal experience!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={copyReview}
              variant="outline"
              className="flex-1"
              disabled={!generatedReview}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Review
            </Button>
            
            <Button
              onClick={openReviewPage}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Leave Review
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowReview(false)}
              variant="ghost"
              className="flex-1"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Review
            </Button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <ThumbsUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">How to use this review:</h4>
                <ol className="list-decimal list-inside text-sm text-blue-800 mt-1 space-y-1">
                  <li>Copy the review text above</li>
                  <li>Click "Leave Review" to open Google</li>
                  <li>Paste and customize the review</li>
                  <li>Select your star rating</li>
                  <li>Submit your review</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Review Helper for {businessName}
        </CardTitle>
        <p className="text-gray-600">
          Let AI help you write a thoughtful review! Select your experience details below.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rating Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">How would you rate your experience?</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= selectedRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {selectedRating}/5 stars
            </span>
          </div>
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium mb-3">What type of business is this?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {businessTypes.map((type) => (
              <Button
                key={type}
                variant={businessType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setBusinessType(type)}
                className="text-xs"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Experience Type */}
        <div>
          <label className="block text-sm font-medium mb-3">What type of experience was this?</label>
          <div className="grid grid-cols-2 gap-2">
            {experienceTypes.map((type) => (
              <Button
                key={type}
                variant={experienceType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setExperienceType(type)}
                className="text-xs"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateReview}
          disabled={isGenerating || !businessType || !experienceType}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating Review...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Review
            </>
          )}
        </Button>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• AI will generate a personalized review based on your selections</li>
            <li>• You can edit the review to match your exact experience</li>
            <li>• Copy and paste it when leaving your actual review</li>
            <li>• This helps you write a thoughtful, helpful review quickly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
