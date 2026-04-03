import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hosting.openclaw-consulting.ch'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/vergleich`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/skills`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/anwendungsfaelle`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/ueber-uns`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/agb`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
