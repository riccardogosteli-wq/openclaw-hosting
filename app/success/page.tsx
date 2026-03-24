'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

const t = {
  de: {
    title: 'Zahlung erfolgreich!',
    welcome: 'Willkommen bei OpenClaw Hosting.',
    sub: 'Der nächste Schritt: das Onboarding-Formular ausfüllen — dauert nur ca. 5 Minuten.',
    step1: '1. Sie füllen das Formular aus (5 Min.)',
    step2: '2. Ihr Server wird vollautomatisch eingerichtet (~30 Min.)',
    step3: '3. Sie erhalten eine E-Mail sobald alles läuft',
    whatsNext: 'Was jetzt passiert:',
    cta: 'Onboarding-Formular ausfüllen →',
    support: 'Fragen?',
  },
  en: {
    title: 'Payment successful!',
    welcome: 'Welcome to OpenClaw Hosting.',
    sub: 'Next step: fill in the onboarding form — takes about 5 minutes.',
    step1: '1. Fill in the form (5 min)',
    step2: '2. Your server is set up fully automatically (~30 min)',
    step3: '3. You\'ll receive an email once everything is ready',
    whatsNext: 'What happens next:',
    cta: 'Fill in onboarding form →',
    support: 'Questions?',
  },
}

function SuccessContent() {
  const params = useSearchParams()
  const plan = params.get('plan') || 'starter'
  const billing = params.get('billing') || 'monthly'
  const pt = params.get('pt') || ''
  const lang = (['de','en'].includes(params.get('lang') || '')) ? params.get('lang') as 'de'|'en' : 'de'
  const tx = t[lang]
  const planNames: Record<string, string> = { starter: 'Starter', pro: 'Pro', business: 'Business' }
  const planPrices: Record<string, Record<string, string>> = {
    starter: { monthly: 'CHF 19/Mt.', annual: 'CHF 180/Jahr' },
    pro:     { monthly: 'CHF 34/Mt.', annual: 'CHF 320/Jahr' },
    business:{ monthly: 'CHF 59/Mt.', annual: 'CHF 560/Jahr' },
  }

  return (
    <main style={{ background: 'var(--light)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '520px', width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(15,23,20,0.07)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{tx.title}</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', borderRadius: '99px', padding: '0.3rem 0.9rem', marginBottom: '1rem' }}>
          <span style={{ fontWeight: 700, color: '#14532d', fontSize: '0.9rem' }}>{planNames[plan] || 'Starter'} Plan</span>
          <span style={{ color: '#16a34a', fontSize: '0.82rem' }}>· {planPrices[plan]?.[billing] || 'CHF 19/Mt.'}</span>
        </div>
        <p style={{ color: 'var(--slate)', marginBottom: '2rem', lineHeight: 1.7 }}>
          {tx.welcome} {tx.sub}
        </p>
        <div style={{ background: 'var(--green3)', border: '1px solid #b2dfd4', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.75rem', textAlign: 'left', fontSize: '0.88rem', color: 'var(--ink2)', lineHeight: 1.6 }}>
          <strong>{tx.whatsNext}</strong><br />
          {tx.step1}<br />
          {tx.step2}<br />
          {tx.step3}
        </div>
        <Link href={`/onboarding?plan=${plan}&lang=${lang}${params.get('pt') ? '&pt=' + params.get('pt') : ''}${params.get('session_id') ? '&session_id=' + params.get('session_id') : ''}`} style={{ display: 'block', background: 'var(--green)', color: '#fff', padding: '0.85rem', borderRadius: '9px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', marginBottom: '1rem' }}>
          {tx.cta}
        </Link>
        <p style={{ fontSize: '0.82rem', color: 'var(--slate)' }}>
          {tx.support} <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
        </p>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}
