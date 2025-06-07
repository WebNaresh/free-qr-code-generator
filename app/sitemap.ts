import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.freeqrcodegenerator.shop'

    // Define your static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
        '/pricing',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Add dynamic routes for QR code templates
    const templateRoutes = [
        '/templates/business',
        '/templates/social',
        '/templates/website',
        '/templates/contact',
        '/templates/email',
        '/templates/phone',
        '/templates/text',
        '/templates/url',
        '/templates/wifi',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...templateRoutes]
}
