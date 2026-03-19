import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/onboarding/', '/cancel/', '/success/'],
    },
    sitemap: 'https://hosting.openclaw-consulting.ch/sitemap.xml',
  }
}
