/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.freeqrcodegenerator.shop',
  generateRobotsTxt: false, // We already have a custom robots.ts
  generateIndexSitemap: false, // For smaller sites, single sitemap is fine
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  
  // Transform function to customize URLs
  transform: async (config, path) => {
    // Set custom priorities and change frequencies
    const customConfig = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }

    // Homepage gets highest priority
    if (path === '/') {
      customConfig.priority = 1.0
      customConfig.changefreq = 'daily'
    }
    
    // Main tool pages get high priority
    else if (['/tools', '/restaurant-qr-codes'].includes(path)) {
      customConfig.priority = 0.9
      customConfig.changefreq = 'daily'
    }
    
    // Content pages get medium-high priority
    else if (['/about', '/blog', '/faq', '/resources'].includes(path)) {
      customConfig.priority = 0.8
      customConfig.changefreq = 'weekly'
    }
    
    // Legal pages get lower priority
    else if (['/privacy-policy', '/terms', '/contact'].includes(path)) {
      customConfig.priority = 0.6
      customConfig.changefreq = 'monthly'
    }

    return customConfig
  },

  // Additional paths to include
  additionalPaths: async (config) => {
    const result = []
    
    // Add image files to sitemap for better SEO
    const imageUrls = [
      '/opengraph-image.png',
      '/web-app-manifest-192x192.png',
      '/web-app-manifest-512x512.png',
    ]
    
    imageUrls.forEach(imageUrl => {
      result.push({
        loc: imageUrl,
        changefreq: 'monthly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      })
    })

    return result
  },

  // Exclude certain paths
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/tmp/*',
    '/_next/*',
    '/404',
    '/500',
    '*.json',
  ],

  // Robot.txt rules (even though we're not generating it, this documents our intent)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/', '/tmp/', '*.json'],
      },
    ],
  },
}
