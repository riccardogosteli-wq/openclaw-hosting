import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selbst hosten oder OpenClaw Hosting? – Vergleich',
  description: 'Ehrlicher Vergleich: OpenClaw selbst installieren vs. bei uns hosten. Zeit, Technik, Datenschutz und Kosten im direkten Vergleich.',
  alternates: { canonical: 'https://hosting.openclaw-consulting.ch/vergleich' },
  openGraph: {
    title: 'Selbst hosten oder OpenClaw Hosting? – Vergleich',
    description: 'Ehrlicher Vergleich: OpenClaw selbst installieren vs. bei uns hosten. Zeit, Technik, Datenschutz und Kosten im direkten Vergleich.',
    url: 'https://hosting.openclaw-consulting.ch/vergleich',
    siteName: 'OpenClaw Hosting',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function VergleichLayout({ children }: { children: React.ReactNode }) {
  return children
}
