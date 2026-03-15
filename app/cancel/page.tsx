import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zahlung abgebrochen – OpenClaw Hosting',
  robots: { index: false, follow: false },
}

export default function CancelPage() {
  return (
    <main style={{ background: 'var(--light)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '480px', width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(15,23,20,0.07)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>↩️</div>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Zahlung abgebrochen</h1>
        <p style={{ color: 'var(--slate)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Kein Problem — Ihre Zahlung wurde nicht abgeschlossen und es wurde nichts belastet.
        </p>
        <Link href="/#pricing" style={{ display: 'inline-block', background: 'var(--green)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '9px', fontWeight: 700, textDecoration: 'none', marginBottom: '1rem' }}>
          Zur Preisübersicht →
        </Link>
        <p style={{ fontSize: '0.85rem', color: 'var(--slate)' }}>
          Fragen? <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
        </p>
      </div>
    </main>
  )
}
