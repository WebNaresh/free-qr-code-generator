import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.freeqrcodegenerator.shop/#webapp",
        "name": "Free QR Code Generator & Builder",
        "alternateName": "QR Code Generator",
        "description": "Generate QR codes instantly with our free QR code generator. Create QR codes for websites, business, Google reviews & more. QR code builder with scanner support. No signup required - 100% free QR generator.",
        "url": "https://www.freeqrcodegenerator.shop",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "2.0",
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01"
        },
        "featureList": [
          "Free QR Code Generator",
          "QR Code Builder with Customization",
          "QR Code Scanner Compatible",
          "Generate QR Codes for Business",
          "Create QR Codes for Websites", 
          "Google Review QR Codes",
          "Custom Logo QR Codes",
          "High-Resolution QR Code Downloads",
          "Mobile QR Code Generator",
          "Bulk QR Code Creation",
          "No Registration Required",
          "100% Free QR Generator",
          "AI-Powered Review Helper",
          "Restaurant QR Codes",
          "Contact QR Codes",
          "WiFi QR Codes",
          "Social Media QR Codes"
        ],
        "keywords": [
          "code qr generator",
          "generator qr code", 
          "qr code builder",
          "qr code generator",
          "free qr code generator",
          "qr code scanner",
          "create qr code free",
          "qr generator free",
          "business qr code",
          "restaurant qr code",
          "google review qr code"
        ],
        "screenshot": "https://www.freeqrcodegenerator.shop/opengraph-image.png",
        "author": {
          "@type": "Organization",
          "@id": "https://www.freeqrcodegenerator.shop/#organization"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "156",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Sarah Johnson"
            },
            "reviewBody": "Best free QR code generator I've found! Easy to use and works perfectly for my restaurant's Google review campaigns."
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.freeqrcodegenerator.shop/#organization",
        "name": "Free QR Code Generator",
        "url": "https://www.freeqrcodegenerator.shop",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.freeqrcodegenerator.shop/opengraph-image.png",
          "width": 1200,
          "height": 630
        },
        "sameAs": [
          "https://www.freeqrcodegenerator.shop"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.freeqrcodegenerator.shop/#website",
        "url": "https://www.freeqrcodegenerator.shop",
        "name": "Free QR Code Generator",
        "description": "Create professional QR codes for your business, Google reviews, websites, and more. Free, customizable, and easy to use QR code generator with advanced features.",
        "publisher": {
          "@id": "https://www.freeqrcodegenerator.shop/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.freeqrcodegenerator.shop/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "QR Code Generator Tool",
        "description": "Free online tool to generate QR codes for business reviews, websites, and marketing campaigns",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web Browser",
        "url": "https://www.freeqrcodegenerator.shop",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Service",
        "name": "Business Review QR Code Generation",
        "description": "Generate QR codes that direct customers to your Google Business reviews page to help collect more positive reviews",
        "provider": {
          "@id": "https://www.freeqrcodegenerator.shop/#organization"
        },
        "areaServed": "Worldwide",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://www.freeqrcodegenerator.shop",
          "serviceType": "Online Service"
        },
        "category": "Business Tools",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Small Business Owners, Restaurants, Retail Stores"
        }
      },
      {
        "@type": "HowTo",
        "name": "How to Create a QR Code for Google Reviews",
        "description": "Step-by-step guide to create QR codes for collecting Google Business reviews",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter Business Information",
            "text": "Enter your business name and Google review URL"
          },
          {
            "@type": "HowToStep", 
            "name": "Customize Design",
            "text": "Upload your logo and customize colors to match your brand"
          },
          {
            "@type": "HowToStep",
            "name": "Generate QR Code",
            "text": "Click generate to create your custom QR code"
          },
          {
            "@type": "HowToStep",
            "name": "Download and Use",
            "text": "Download the high-resolution QR code and display it in your business"
          }
        ],
        "totalTime": "PT5M",
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Free QR Code Generator"
          }
        ]
      }
    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
