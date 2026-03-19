import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns – OpenClaw Hosting',
  description: 'Wer steckt hinter OpenClaw Hosting? Unser Ansatz, unsere Werte und warum wir selbst-gehostete KI für alle zugänglich machen.',
  alternates: { canonical: 'https://hosting.openclaw-consulting.ch/ueber-uns' },
}

export default function UeberUnsLayout({ children }: { children: React.ReactNode }) {
  return children
}
