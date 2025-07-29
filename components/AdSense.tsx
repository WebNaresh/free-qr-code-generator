'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'banner' | 'leaderboard'
  fullWidthResponsive?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  className = ''
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  const getAdStyle = () => {
    switch (adFormat) {
      case 'banner':
        return { display: 'block', width: '728px', height: '90px' }
      case 'rectangle':
        return { display: 'block', width: '300px', height: '250px' }
      case 'leaderboard':
        return { display: 'block', width: '728px', height: '90px' }
      default:
        return { display: 'block' }
    }
  }

  return (
    <div className={`text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-4895071519734738"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}

// Predefined ad components for common placements
export function TopBannerAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <AdSense
        adSlot="9876543210"
        adFormat="banner"
        className="mb-8"
      />
    </div>
  )
}

export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <AdSense
        adSlot="8765432109"
        adFormat="rectangle"
        className="mb-6"
      />
    </div>
  )
}

export function ContentAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <AdSense
        adSlot="7654321098"
        adFormat="rectangle"
        className="my-8"
      />
    </div>
  )
}

export function BottomBannerAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <AdSense
        adSlot="6543210987"
        adFormat="leaderboard"
        className="mt-8"
      />
    </div>
  )
}

// Responsive ad component that adapts to screen size
export function ResponsiveAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <AdSense
        adSlot="5432109876"
        adFormat="auto"
        fullWidthResponsive={true}
        className="my-6"
      />
    </div>
  )
}

// In-article ad component
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container my-8 ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <AdSense
        adSlot="4321098765"
        adFormat="auto"
        fullWidthResponsive={true}
      />
    </div>
  )
}
