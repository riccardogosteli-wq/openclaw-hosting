'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

function SuccessContent() {
  const params = useSearchParams()
  const plan = params.get('plan') || 'starter'

  return (
    <main style={{ background: 'var(--light)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '520px', width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(15,23,20,0.07)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Zahlung erfolgreich!</h1>
        <p style={{ color: 'var(--slate)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Willkommen bei OpenClaw Hosting. Der nächste Schritt: das Onboarding-Formular ausfüllen — das dauert nur ca. 5 Minuten.
        </p>
        <div style={{ background: 'var(--green3)', border: '1px solid #b2dfd4', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.75rem', textAlign: 'left', fontSize: '0.88rem', color: 'var(--ink2)', lineHeight: 1.6 }}>
          <strong>Was jetzt passiert:</strong><br />
          1. Sie füllen das Formular aus (5 Min.)<br />
          2. Wir richten Ihren Server ein (bis 24h)<br />
          3. Sie erhalten eine E-Mail mit Ihrem persönlichen Assistenten
        </div>
        <Link href={`/onboarding?plan=${plan}`} style={{ display: 'block', background: 'var(--green)', color: '#fff', padding: '0.85rem', borderRadius: '9px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', marginBottom: '1rem' }}>
          Onboarding-Formular ausfüllen →
        </Link>
        <p style={{ fontSize: '0.82rem', color: 'var(--slate)' }}>
          Fragen? <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
        </p>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}
