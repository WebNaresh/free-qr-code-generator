'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Settings, Shield, Eye, Target } from 'lucide-react'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  advertising: boolean
  functional: boolean
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    advertising: false,
    functional: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      loadScripts(savedPreferences)
    }
  }, [])

  const loadScripts = (prefs: CookiePreferences) => {
    // Load Google Analytics if analytics cookies are accepted
    if (prefs.analytics && !window.gtag) {
      const script = document.createElement('script')
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-E6JPKTRP50'
      script.async = true
      document.head.appendChild(script)

      const inlineScript = document.createElement('script')
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-E6JPKTRP50');
      `
      document.head.appendChild(inlineScript)
    }

    // Load AdSense if advertising cookies are accepted
    if (prefs.advertising && !document.querySelector('[src*="adsbygoogle"]')) {
      const script = document.createElement('script')
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4895071519734738'
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }
  }

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      advertising: true,
      functional: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    loadScripts(allAccepted)
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    loadScripts(preferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      advertising: false,
      functional: false,
    }
    setPreferences(essentialOnly)
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly))
    setShowBanner(false)
    setShowSettings(false)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  if (!showBanner && !showSettings) return null

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">We use cookies</h3>
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                  You can customize your preferences by clicking "Cookie Settings".
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="text-xs"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Cookie Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={rejectAll}
                  className="text-xs"
                >
                  Reject All
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="text-xs bg-blue-600 hover:bg-blue-700"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cookie Preferences</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-gray-600">
                We use cookies to improve your experience on our website. You can choose which 
                categories of cookies you allow. Essential cookies are required for the website to function.
              </p>

              {/* Essential Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium">Essential Cookies</h4>
                  </div>
                  <div className="text-sm text-green-600 font-medium">Always Active</div>
                </div>
                <p className="text-sm text-gray-600">
                  These cookies are necessary for the website to function and cannot be switched off. 
                  They are usually only set in response to actions made by you.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">Analytics Cookies</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously. We use Google Analytics for this purpose.
                </p>
              </div>

              {/* Advertising Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium">Advertising Cookies</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={(e) => updatePreference('advertising', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  These cookies are used to deliver advertisements that are relevant to you and your interests. 
                  They may be set by our advertising partners through our site.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-orange-600" />
                    <h4 className="font-medium">Functional Cookies</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => updatePreference('functional', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  These cookies enable enhanced functionality and personalization, such as remembering 
                  your preferences and settings.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="flex-1"
                >
                  Reject All
                </Button>
                <Button
                  variant="outline"
                  onClick={acceptSelected}
                  className="flex-1"
                >
                  Save Preferences
                </Button>
                <Button
                  onClick={acceptAll}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Accept All
                </Button>
              </div>

              <div className="text-xs text-gray-500 pt-2">
                You can change your cookie preferences at any time by visiting our{' '}
                <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a> page.
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

// Cookie Settings Button Component (for footer or settings page)
export function CookieSettingsButton() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSettings(true)}
        className="text-gray-600 hover:text-gray-900"
      >
        <Settings className="w-4 h-4 mr-1" />
        Cookie Settings
      </Button>
      
      {showSettings && (
        <div className="fixed inset-0 z-50">
          <CookieConsent />
        </div>
      )}
    </>
  )
}
