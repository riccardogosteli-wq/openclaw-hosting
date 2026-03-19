import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selbst hosten oder OpenClaw Hosting? – Vergleich',
  description: 'Ehrlicher Vergleich: OpenClaw selbst installieren vs. bei uns hosten. Zeit, Technik, Datenschutz und Kosten im direkten Vergleich.',
  alternates: { canonical: 'https://hosting.openclaw-consulting.ch/vergleich' },
}

export default function VergleichLayout({ children }: { children: React.ReactNode }) {
  return children
}
