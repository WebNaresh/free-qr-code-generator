import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: 'Free QR Code Generator | Create Custom QR Codes for Business, Reviews & Websites',
  description: 'Create professional QR codes for your business, Google reviews, websites, and more. Free, customizable, and easy to use QR code generator with advanced features. No signup required.',
  keywords: [
    'QR code generator', 'QR code creator', 'business QR code', 'Google review QR code', 'website QR code', 'free QR code', 'custom QR code', 'QR code maker', 'QR code scanner', 'QR code design',
    'qr code free', 'free qr code generator', 'qr code free generator', 'free qr generator', 'qr generator free', 'qr code generator google', 'qr code online generator', 'online qr generator', 'qr code online', 'canva qr code generator', 'canva qr code', 'the qr code generator', 'adobe', 'adobe qr code', 'qr code generator adobe', 'qr code generator pdf', 'barcode generator', 'qr code link generator', 'barcode', 'qr barcode generator', 'qr scanner', 'create qr code', 'qr code generator online free', 'qr code scanner', 'qr code generator whatsapp',
    'bulk qr code generator 128', 'upi qr code generator', 'uniqode', 'qr code generator free', 'qr code generator 128', 'bulk qr code generator', 'batch qr code generator', 'canva qr code generator', 'qrfy', 'canva qr code', 'bulk barcode generator'
  ],
  authors: [{ name: 'QR Code Generator Team' }],
  creator: 'QR Code Generator',
  publisher: 'QR Code Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.freeqrcodegenerator.shop'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free QR Code Generator | Create Custom QR Codes for Business, Reviews & Websites',
    description: 'Create professional QR codes for your business, Google reviews, websites, and more. Free, customizable, and easy to use QR code generator with advanced features.',
    url: 'https://www.freeqrcodegenerator.shop',
    siteName: 'QR Code Generator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator - Create Custom QR Codes',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator | Create Custom QR Codes for Business, Reviews & Websites',
    description: 'Create professional QR codes for your business, Google reviews, websites, and more. Free, customizable, and easy to use QR code generator with advanced features.',
    images: ['/twitter-image.jpg'],
    creator: '@qrcodegenerator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
    generator: 'v0.dev'
}

const ADSENSE_ALLOWED_PATHS = [
  '/',
  '/about',
  '/faq',
  '/blog',
  '/privacy-policy',
  '/terms',
  '/contact',
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const showAds = ADSENSE_ALLOWED_PATHS.includes(pathname)

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4895071519734738"></meta>
        <meta name="google-site-verification" content="rK-V-bkRiNac_snXDliif7WyssvpyOy_tNNoG3yElGk" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E6JPKTRP50"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E6JPKTRP50');
          `}
        </Script>
        {showAds && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4895071519734738"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Analytics/>
          <Navbar />

          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
