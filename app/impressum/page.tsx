'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Impressum() {
  const [lang, setLang] = useState<'de'|'en'>('de')
  useEffect(() => {
    setLang((localStorage.getItem('lang') as 'de'|'en') || 'de')
  }, [])

  const de = {
    back: '← Zurück',
    title: 'Impressum',
    providerLabel: 'Anbieter',
    provider: <>Alexandra Gosteli Digital Solutions<br />8467 Truttikon<br />Schweiz<br />E-Mail: <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a></>,
    hostingLabel: 'Hosting',
    hosting: <>Diese Website wird über Vercel Inc., San Francisco, USA, bereitgestellt.<br />Die OpenClaw-Kundenserver laufen bei einem Schweizer Hosting-Anbieter (Rechenzentrum Schweiz).</>,
    disclaimerLabel: 'Haftungsausschluss',
    disclaimer: 'Alle Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter sind wir für eigene Inhalte verantwortlich. Für externe Links übernehmen wir keine Haftung.',
    copyrightLabel: 'Urheberrecht',
    copyright: 'Die auf dieser Website veröffentlichten Inhalte unterliegen dem Schweizer Urheberrecht. Jede nicht ausdrücklich genehmigte Verwendung ist untersagt.',
    updated: 'Stand: März 2026',
  }

  const en = {
    back: '← Back',
    title: 'Legal Notice',
    providerLabel: 'Provider',
    provider: <>Alexandra Gosteli Digital Solutions<br />8467 Truttikon<br />Switzerland<br />Email: <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a></>,
    hostingLabel: 'Hosting',
    hosting: <>This website is hosted by Vercel Inc., San Francisco, USA.<br />OpenClaw customer servers run with a Swiss hosting provider (data center in Switzerland).</>,
    disclaimerLabel: 'Disclaimer',
    disclaimer: 'All content on this website has been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content. We accept no liability for external links.',
    copyrightLabel: 'Copyright',
    copyright: 'The content published on this website is subject to Swiss copyright law. Any use not expressly permitted is prohibited.',
    updated: 'Last updated: March 2026',
  }

  const t = lang === 'en' ? en : de

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: 'var(--ink)' }}>
        <Link href="/" style={{ color: 'var(--green)', fontSize: '0.9rem', textDecoration: 'none' }}>{t.back}</Link>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', margin: '1.5rem 0 2rem' }}>{t.title}</h1>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>{t.providerLabel}</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{t.provider}</p>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>{t.hostingLabel}</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{t.hosting}</p>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>{t.disclaimerLabel}</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{t.disclaimer}</p>

        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>{t.copyrightLabel}</h2>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{t.copyright}</p>

        <p style={{ color: 'var(--slate)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          {t.updated}
        </p>
      </div>
    </main>
  )
}
