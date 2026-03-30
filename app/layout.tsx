import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenClaw Hosting – Ihr persönlicher KI-Assistent, jederzeit verfügbar',
  description: 'Ihr persönlicher KI-Assistent auf eigenem Schweizer Server. Kein Technikwissen nötig. In ~30 Minuten live. Ab CHF 15/Monat.',
  alternates: {
    canonical: 'https://hosting.openclaw-consulting.ch',
  },
  openGraph: {
    title: 'OpenClaw Hosting – Ihr KI-Assistent in der Schweiz',
    description: 'Ihr persönlicher KI-Assistent auf eigenem Schweizer Server. Kein Technikwissen nötig. In ~30 Minuten live. Ab CHF 15/Monat.',
    url: 'https://hosting.openclaw-consulting.ch',
    siteName: 'OpenClaw Hosting',
    locale: 'de_CH',
    type: 'website',
    images: [{ url: 'https://hosting.openclaw-consulting.ch/og-image.svg', width: 1200, height: 630, alt: 'OpenClaw Hosting – Ihr KI-Assistent in der Schweiz' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://hosting.openclaw-consulting.ch/og-image.svg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JZE8M6C9YG" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JZE8M6C9YG');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
