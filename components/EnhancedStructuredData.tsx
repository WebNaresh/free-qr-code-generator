import Script from 'next/script'

interface FAQStructuredDataProps {
  faqs?: Array<{
    question: string
    answer: string
  }>
}

export default function EnhancedStructuredData({ faqs }: FAQStructuredDataProps = {}) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Free QR Code Generator",
    "alternateName": "QR Code Builder",
    "url": "https://www.freeqrcodegenerator.shop",
    "description": "Generate QR codes instantly with our free QR code generator. Create QR codes for websites, business, Google reviews & more.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.freeqrcodegenerator.shop/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "WebApplication",
      "name": "QR Code Generator Tool",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser"
    }
  }

  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Generate a QR Code for Free",
    "description": "Step-by-step guide to create QR codes using our free QR code generator",
    "image": "https://www.freeqrcodegenerator.shop/opengraph-image.png",
    "totalTime": "PT2M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Website URL or Text Content"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Free QR Code Generator"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Content",
        "text": "Type or paste the URL, text, or information you want to encode in the QR code",
        "image": "https://www.freeqrcodegenerator.shop/opengraph-image.png"
      },
      {
        "@type": "HowToStep",
        "name": "Customize Design",
        "text": "Optional: Upload a logo, choose colors, and adjust the QR code size",
        "image": "https://www.freeqrcodegenerator.shop/opengraph-image.png"
      },
      {
        "@type": "HowToStep",
        "name": "Generate QR Code",
        "text": "Click the generate button to create your custom QR code",
        "image": "https://www.freeqrcodegenerator.shop/opengraph-image.png"
      },
      {
        "@type": "HowToStep",
        "name": "Download",
        "text": "Download your QR code in high resolution PNG format for free",
        "image": "https://www.freeqrcodegenerator.shop/opengraph-image.png"
      }
    ]
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.freeqrcodegenerator.shop"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "QR Code Generator",
        "item": "https://www.freeqrcodegenerator.shop/tools"
      }
    ]
  }

  const faqStructuredData = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null

  const defaultFAQs = [
    {
      question: "Is the QR code generator really free?",
      answer: "Yes! Our QR code generator is completely free with no hidden costs, registration requirements, or limitations on usage."
    },
    {
      question: "What types of QR codes can I create?",
      answer: "You can create QR codes for websites, business information, Google reviews, contact details, WiFi passwords, text, and more."
    },
    {
      question: "Can I customize my QR code with a logo?",
      answer: "Yes! You can upload your business logo and our generator will automatically detect colors and create a branded QR code."
    },
    {
      question: "Do QR codes expire?",
      answer: "No, the QR codes we generate do not expire. They will work indefinitely as long as the content they point to remains accessible."
    },
    {
      question: "What format are the downloaded QR codes?",
      answer: "QR codes are downloaded as high-resolution PNG images that work perfectly for both digital and print use."
    }
  ]

  const finalFAQData = faqStructuredData || {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": defaultFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData)
        }}
      />
      <Script
        id="howto-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToStructuredData)
        }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalFAQData)
        }}
      />
    </>
  )
}
