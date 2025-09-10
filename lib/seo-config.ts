// SEO Configuration and Guidelines for QR Code Generator

export const SEO_CONFIG = {
  // Primary domain
  baseUrl: 'https://www.freeqrcodegenerator.shop',
  
  // Core keywords to target (high volume)
  primaryKeywords: [
    'qr code generator',
    'free qr code generator', 
    'qr code builder',
    'code qr generator',
    'generator qr code',
    'qr code creator',
    'create qr code free',
    'qr generator free'
  ],

  // Long-tail keywords for content
  longTailKeywords: [
    'how to create qr code for business',
    'generate qr code for google reviews',
    'free qr code generator with logo',
    'restaurant qr code menu generator',
    'custom qr code maker online',
    'qr code generator for website',
    'business qr code creator'
  ],

  // Page-specific SEO configurations
  pages: {
    home: {
      title: 'Free QR Code Generator | QR Code Builder & Creator | Generate QR Codes Online',
      description: 'Generate QR codes instantly with our free QR code generator. Create QR codes for websites, business, Google reviews & more. QR code builder with scanner support. No signup required.',
      keywords: 'qr code generator, free qr code generator, qr code builder, create qr code',
      priority: 1.0,
      changefreq: 'daily'
    },
    tools: {
      title: 'QR Code Tools | Free QR Generator & Builder Tools',
      description: 'Comprehensive QR code tools for businesses. Generate QR codes for websites, reviews, contacts, WiFi, and more. Free QR code builder with customization options.',
      keywords: 'qr code tools, qr code builder, business qr codes, qr generator tools',
      priority: 0.9,
      changefreq: 'daily'
    },
    restaurant: {
      title: 'Restaurant QR Codes | Menu QR Code Generator | Free QR Builder',
      description: 'Create QR codes for restaurants, menus, and dining experiences. Generate QR codes for Google reviews, digital menus, and contactless ordering.',
      keywords: 'restaurant qr code, menu qr code, restaurant qr generator, dining qr codes',
      priority: 0.9,
      changefreq: 'weekly'
    },
    blog: {
      title: 'QR Code Blog | Tips, Guides & Best Practices',
      description: 'Learn how to use QR codes effectively for your business. Tips, guides, and best practices for QR code marketing and implementation.',
      keywords: 'qr code tips, qr code marketing, qr code guide, how to use qr codes',
      priority: 0.85,
      changefreq: 'weekly'
    }
  },

  // Structured data templates
  structuredDataTypes: [
    'WebApplication',
    'HowTo',
    'FAQPage',
    'BreadcrumbList',
    'Organization',
    'LocalBusiness'
  ],

  // Social media optimization
  socialMedia: {
    twitterHandle: '@qrcodegenerator',
    facebookPage: 'https://facebook.com/freeqrcodegenerator',
    linkedinPage: 'https://linkedin.com/company/qr-code-generator'
  },

  // Technical SEO checklist
  technicalSEO: {
    // Already implemented
    sitemap: true,
    robotsTxt: true,
    structuredData: true,
    mobileOptimized: true,
    httpsEnabled: true,
    pageSpeedOptimized: true,
    
    // Need to implement
    searchConsoleVerified: false, // Update when verified
    bingWebmasterVerified: false,
    analyticsSetup: true,
    
    // Security headers
    securityHeaders: {
      hsts: true,
      csp: true,
      xFrameOptions: true,
      xContentTypeOptions: true,
      referrerPolicy: true
    }
  },

  // Local SEO (if applicable)
  localSEO: {
    businessType: 'SoftwareApplication',
    serviceArea: 'Worldwide',
    languages: ['en-US', 'en-GB', 'en-CA', 'en-AU']
  },

  // Content strategy
  contentStrategy: {
    blogTopics: [
      'How to Create QR Codes for Business',
      'QR Code Marketing Best Practices',
      'Restaurant QR Code Implementation',
      'QR Codes for Google Reviews',
      'Custom QR Code Design Tips',
      'QR Code Security and Privacy',
      'Industry-Specific QR Code Uses'
    ],
    
    landingPages: [
      '/qr-code-types/website-qr-code',
      '/qr-code-types/business-qr-code', 
      '/qr-code-types/review-qr-code',
      '/qr-code-types/google-review-qr-code',
      '/industries/restaurants',
      '/industries/retail',
      '/industries/healthcare'
    ]
  },

  // Monitoring and analytics
  monitoring: {
    googleSearchConsole: {
      propertyUrl: 'https://www.freeqrcodegenerator.shop',
      sitemapUrl: 'https://www.freeqrcodegenerator.shop/sitemap.xml'
    },
    googleAnalytics: {
      trackingId: 'G-E6JPKTRP50',
      goals: [
        'QR Code Generated',
        'QR Code Downloaded', 
        'Feedback Submitted',
        'Page Views > 3 minutes'
      ]
    },
    keyMetrics: [
      'Organic traffic growth',
      'Keyword rankings',
      'Core Web Vitals',
      'Click-through rates',
      'Conversion rates',
      'Page load speed'
    ]
  }
}

// SEO Action Items Checklist
export const SEO_CHECKLIST = {
  immediate: [
    '✅ Add Google Search Console verification code',
    '✅ Submit sitemap to Google Search Console',
    '✅ Submit sitemap to Bing Webmaster Tools',
    '✅ Test structured data with Google Rich Results Test',
    '✅ Verify all pages return 200 status codes',
    '✅ Check mobile-friendliness with Google Mobile-Friendly Test'
  ],
  
  shortTerm: [
    '📝 Create industry-specific landing pages',
    '📝 Add more detailed FAQs',
    '📝 Implement user reviews and testimonials',
    '📝 Add internal linking strategy',
    '📝 Create QR code use case content',
    '📝 Optimize images with alt text'
  ],
  
  longTerm: [
    '📈 Build high-quality backlinks',
    '📈 Create comprehensive blog content',
    '📈 Implement local SEO if targeting local markets',
    '📈 A/B test page titles and meta descriptions',
    '📈 Monitor and improve Core Web Vitals',
    '📈 Implement schema markup for reviews'
  ]
}

export default SEO_CONFIG
