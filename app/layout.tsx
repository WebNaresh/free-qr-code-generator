import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Free QR Code Generator | Create Custom QR Codes for Business, Reviews & Websites',
  description: 'Create professional QR codes for your business, Google reviews, websites, and more. Free, customizable, and easy to use QR code generator with advanced features. No signup required.',
  keywords: 'QR code generator, QR code creator, business QR code, Google review QR code, website QR code, free QR code, custom QR code, QR code maker, QR code scanner, QR code design',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>{children}</body>
    </html>
  )
}
