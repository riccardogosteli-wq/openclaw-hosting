import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – OpenClaw Hosting',
  description: 'Nehmen Sie Kontakt auf — wir antworten auf Deutsch innerhalb von 24 Stunden. Fragen zum Produkt, zur Einrichtung oder zum richtigen Plan.',
  alternates: { canonical: 'https://hosting.openclaw-consulting.ch/contact' },
  openGraph: {
    title: 'Kontakt – OpenClaw Hosting',
    description: 'Nehmen Sie Kontakt auf — wir antworten auf Deutsch innerhalb von 24 Stunden. Fragen zum Produkt, zur Einrichtung oder zum richtigen Plan.',
    url: 'https://hosting.openclaw-consulting.ch/contact',
    siteName: 'OpenClaw Hosting',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
