import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum – OpenClaw Hosting',
  robots: { index: false, follow: false },
}

export default function Impressum() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: 'var(--ink)' }}>
        <Link href="/" style={{ color: 'var(--green)', fontSize: '0.9rem', textDecoration: 'none' }}>← Zurück</Link>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', margin: '1.5rem 0 2rem' }}>Impressum</h1>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Anbieter</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Alexandra Gosteli Digital Solutions<br />
          Truttikon, Schweiz<br />
          E-Mail: <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
        </p>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Verantwortlich für den Inhalt</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Riccardo Gosteli<br />
          Truttikon, Schweiz
        </p>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Hosting</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Diese Website wird über Vercel Inc., San Francisco, USA, bereitgestellt.<br />
          Die OpenClaw-Kundenserver laufen bei einem Schweizer Hosting-Anbieter (Rechenzentrum Schweiz).
        </p>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Haftungsausschluss</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Alle Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter sind wir für eigene Inhalte verantwortlich. Für externe Links übernehmen wir keine Haftung.
        </p>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Urheberrecht</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Die auf dieser Website veröffentlichten Inhalte unterliegen dem Schweizer Urheberrecht. Jede nicht ausdrücklich genehmigte Verwendung ist untersagt.
        </p>

        <p style={{ color: 'var(--slate)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          Stand: März 2026
        </p>
      </div>
    </main>
  )
}
