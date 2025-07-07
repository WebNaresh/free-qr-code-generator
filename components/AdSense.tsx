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
    <AdSense 
      adSlot="1234567890" 
      adFormat="banner" 
      className={`mb-8 ${className}`}
    />
  )
}

export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <AdSense 
      adSlot="2345678901" 
      adFormat="rectangle" 
      className={`mb-6 ${className}`}
    />
  )
}

export function ContentAd({ className = '' }: { className?: string }) {
  return (
    <AdSense 
      adSlot="3456789012" 
      adFormat="rectangle" 
      className={`my-8 ${className}`}
    />
  )
}

export function BottomBannerAd({ className = '' }: { className?: string }) {
  return (
    <AdSense 
      adSlot="4567890123" 
      adFormat="leaderboard" 
      className={`mt-8 ${className}`}
    />
  )
}
