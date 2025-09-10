import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.freeqrcodegenerator.shop'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '*.json',
          '/tmp/',
          '/.*',  // Hidden files
        ],
        crawlDelay: 1,  // Be respectful to server
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 0,  // Google can crawl faster
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-0.xml`,  // next-sitemap generated
    ],
    host: baseUrl,
  }
}
