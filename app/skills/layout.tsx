import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Was kann Ihr KI-Assistent? – OpenClaw Hosting',
  description: 'Alle Funktionen Ihres persönlichen KI-Assistenten: E-Mail, Kalender, Voice-Chat, Automatisierungen, Web-Suche und mehr — ab dem ersten Tag.',
  alternates: { canonical: 'https://hosting.openclaw-consulting.ch/skills' },
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children
}
