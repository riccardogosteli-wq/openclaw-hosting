import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenClaw Hosting – Ihr KI-Assistent, 24/7 in der Schweiz | Your AI Agent, Always On',
  description: 'Ihr persönlicher KI-Assistent auf eigenem Schweizer Server. Kein Technikwissen nötig. In ~30 Minuten live. Ab CHF 19/Monat.',
  alternates: {
    canonical: 'https://hosting.openclaw-consulting.ch',
  },
  openGraph: {
    title: 'OpenClaw Hosting – Ihr KI-Assistent in der Schweiz',
    description: 'Ihr persönlicher KI-Assistent auf eigenem Schweizer Server. Kein Technikwissen nötig. In ~30 Minuten live. Ab CHF 19/Monat.',
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
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
