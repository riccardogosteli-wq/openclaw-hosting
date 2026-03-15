import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenClaw Hosting – Ihr KI-Assistent, 24/7 in der Schweiz | Your AI Agent, Always On',
  description: 'Managed OpenClaw hosting for Swiss businesses. No setup, no servers, no technical skills needed. Your personal AI assistant on Telegram & WhatsApp in minutes.',
  openGraph: {
    title: 'OpenClaw Hosting – Managed AI Agent Hosting in Switzerland',
    description: 'Your own AI assistant running 24/7. Hosted in Switzerland. Setup in minutes, not hours.',
    url: 'https://hosting.openclaw-consulting.ch',
    siteName: 'OpenClaw Hosting',
    locale: 'de_CH',
    type: 'website',
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
