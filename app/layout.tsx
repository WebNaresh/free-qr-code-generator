import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import StructuredData from "@/components/StructuredData";
import EnhancedStructuredData from "@/components/EnhancedStructuredData";
import { Toaster } from "@/components/ui/sonner";

import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title:
    "Free QR Code Generator | QR Code Builder & Creator | Generate QR Codes Online",
  description:
    "Generate QR codes instantly with our free QR code generator. Create QR codes for websites, business, Google reviews & more. QR code builder with scanner support. No signup required - 100% free QR generator.",
  keywords: [
    // High-volume primary keywords (673K searches)
    "code qr generator",
    "generator qr code", 
    "qr code builder",
    "qr code generator",
    "qr qr code generator",
    "scan code generator",
    "qr-code generator",
    
    // Medium-volume keywords (246K searches)
    "qr code code",
    "qr codes",
    "qrcode",
    
    // Scanner related keywords (201K-165K searches)
    "code qr scanner",
    "q r code scanner",
    "qr code and scanner",
    "qr code scan",
    "qr code scannen",
    "qr code scanner",
    "qr code scanning",
    
    // Free QR code keywords (90.5K searches)
    "create a qr code for free",
    "code qr generator free", 
    "create a qr code free",
    "qr code generator free",
    "free qr code generator",
    "qr code free generator",
    "free qr generator",
    "qr generator free",
    
    // Additional targeted keywords
    "QR code creator",
    "business QR code",
    "Google review QR code",
    "website QR code",
    "free QR code",
    "custom QR code",
    "QR code maker",
    "QR code design",
    "qr code free",
    "qr code generator google",
    "qr code online generator",
    "online qr generator",
    "qr code online",
    "canva qr code generator",
    "canva qr code",
    "the qr code generator",
    "adobe",
    "adobe qr code",
    "qr code generator adobe",
    "qr code generator pdf",
    "barcode generator",
    "qr code link generator",
    "barcode",
    "qr barcode generator",
    "qr scanner",
    "create qr code",
    "qr code generator online free",
    "adobe qr code",
    "qr code generator adobe",
    "qr code generator pdf",
    "barcode generator",
    "qr code link generator",
    "barcode",
    "qr barcode generator",
    "qr scanner",
    "create qr code",
    "qr code generator online free",
    "qr code scanner",
    "qr code generator whatsapp",
    "bulk qr code generator 128",
    "upi qr code generator",
    "uniqode",
    "qr code generator free",
    "qr code generator 128",
    "bulk qr code generator",
    "batch qr code generator",
    "canva qr code generator",
    "qrfy",
    "canva qr code",
    "bulk barcode generator",
  ],
  authors: [{ name: "QR Code Generator Team" }],
  creator: "QR Code Generator",
  publisher: "QR Code Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.freeqrcodegenerator.shop"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Free QR Code Generator | QR Code Builder & Creator | Generate QR Codes Online",
    description:
      "Generate QR codes instantly with our free QR code generator. Create QR codes for websites, business, Google reviews & more. QR code builder with scanner support. No signup required.",
    url: "https://www.freeqrcodegenerator.shop",
    siteName: "Free QR Code Generator",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Free QR Code Generator - QR Code Builder for Business Reviews and Websites",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free QR Code Generator | QR Code Builder & Creator | Generate QR Codes Online",
    description:
      "Generate QR codes instantly with our free QR code generator. Create QR codes for websites, business, Google reviews & more. QR code builder with scanner support.",
    images: ["/opengraph-image.png"],
    creator: "@qrcodegenerator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification=your-actual-verification-code-here",
    other: {
      'msvalidate.01': 'your-bing-verification-code-here',
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon1.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-icon.png",
      },
    ],
  },
  manifest: "/manifest.json",
  generator: "v0.dev",
};

const ADSENSE_ALLOWED_PATHS = [
  "/",
  "/about",
  "/faq",
  "/blog",
  "/privacy-policy",
  "/terms",
  "/contact",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const showAds = ADSENSE_ALLOWED_PATHS.includes(pathname);

  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QR Generator" />
        <meta name="application-name" content="QR Generator" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Performance and Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        <meta name="google-site-verification" content="rK-V-bkRiNac_snXDliif7WyssvpyOy_tNNoG3yElGk" />
        <meta name="google-adsense-account" content="ca-pub-4895071519734738" />

        {/* Google Analytics */}
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

       
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4895071519734738"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
       

        <StructuredData />
        <EnhancedStructuredData />
      </head>
      <body suppressHydrationWarning>
     
          <div className="min-h-screen flex flex-col">
            <Analytics />
            <Navbar />

            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
