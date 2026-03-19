import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zahlung erfolgreich – OpenClaw Hosting',
  description: 'Ihre Zahlung war erfolgreich. Ihr persönlicher KI-Assistent wird jetzt eingerichtet.',
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
