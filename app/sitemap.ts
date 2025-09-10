import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.freeqrcodegenerator.shop'
  const currentDate = new Date().toISOString()

  // Define static pages with their priorities and update frequencies
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // High priority tool pages
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/restaurant-qr-codes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    // Content pages
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industry-links`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/review-helper`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Legal and support pages
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Add QR code type specific pages for better SEO
  const qrCodeTypes = [
    'website-qr-code',
    'business-qr-code',
    'review-qr-code',
    'google-review-qr-code',
    'contact-qr-code',
    'wifi-qr-code',
    'menu-qr-code',
    'event-qr-code',
    'social-media-qr-code',
    'vcard-qr-code'
  ]

  const qrCodePages = qrCodeTypes.map(type => ({
    url: `${baseUrl}/qr-code-types/${type}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Add industry-specific pages
  const industries = [
    'restaurants',
    'retail',
    'healthcare',
    'education',
    'hospitality',
    'real-estate',
    'automotive',
    'beauty-salon',
    'fitness',
    'events'
  ]

  const industryPages = industries.map(industry => ({
    url: `${baseUrl}/industries/${industry}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }))

  return [...staticPages, ...qrCodePages, ...industryPages]
}
