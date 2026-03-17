'use client'
import { useState } from 'react'
import Link from 'next/link'

const de = {
  back: '← Zurück zur Startseite',
  label: 'Vergleich',
  h1: 'Selbst installieren oder bei uns hosten?',
  sub: 'Wir vergleichen ehrlich — inklusive der Option, es selbst zu tun.',

  col1: 'Eigenes Gerät',
  col1sub: 'Mac Mini / Raspberry Pi / Windows',
  col2: 'Eigener VPS',
  col2sub: 'Hetzner, Infomaniak, etc.',
  col3: '⭐ OpenClaw Hosting',
  col3sub: 'Von uns – fertig eingerichtet',
  recommended: '★ Empfohlen',

  rows: [
    { label: 'Setup-Zeit',                    v1: '30–120 Min',          v2: '2–4 Stunden',             v3: '~30 Minuten' },
    { label: 'Technisches Wissen nötig',      v1: 'Mittel',              v2: 'Hoch (Linux)',             v3: 'Keines' },
    { label: 'Läuft 24/7',                    v1: '❌ Nur wenn Gerät an', v2: '✅ Ja',                   v3: '✅ Ja' },
    { label: 'Automatische Updates',          v1: '❌ Manuell',           v2: '❌ Manuell',               v3: '✅ Automatisch' },
    { label: 'Tägliche Backups',              v1: '❌ Nein',              v2: '❌ Nicht inklusive',       v3: '✅ Täglich automatisch' },
    { label: 'Dashboard & Übersicht',         v1: '❌',                   v2: '❌',                       v3: '✅ Persönliches Dashboard' },
    { label: 'Vorkonfigurierte Integrationen',v1: '❌ Selbst einrichten', v2: '❌ Selbst einrichten',     v3: '✅ Gmail, Kalender, Sprache, Web' },
    { label: 'Support bei Problemen',         v1: '❌ Community only',    v2: '❌ Community only',        v3: '✅ E-Mail Support' },
    { label: 'Kosten',                        v1: 'Stromkosten',          v2: 'CHF 5–15/Mt.',            v3: 'CHF 19–59/Mt.' },
    { label: 'Schweizer Server',              v1: '❌ / ✅ Je nach Gerät', v2: '✅ Je nach Anbieter',     v3: '✅ Infomaniak, Genf' },
  ],

  meanTitle: 'Was «fertig eingerichtet» wirklich bedeutet',
  meanSub: 'Wenn wir sagen «fertig eingerichtet», meinen wir genau das. Kein leeres Terminal, kein «jetzt bauen Sie weiter». Ihr Bot startet und ist sofort nutzbar.',
  meanItems: [
    { icon: '📧', text: 'Gmail & Google Kalender (über Maton.ai — kostenlos verbindbar)' },
    { icon: '🎙️', text: 'Sprachnotizen via Whisper (lokal, kein Cloud-Dienst)' },
    { icon: '🌐', text: 'Web-Suche via Brave (live Suchergebnisse direkt im Chat)' },
    { icon: '💾', text: 'Tägliches automatisches Backup Ihrer Konfiguration' },
  ],

  faqTitle: 'Häufige Fragen zum Vergleich',
  faqs: [
    {
      q: 'Ist das wirklich ein eigener Server?',
      a: 'Ja. Kein Shared Hosting, keine geteilten Ressourcen. Sie bekommen einen dedizierten VPS bei Infomaniak in Genf — nur für Sie. Ihre Daten liegen auf Ihrer eigenen Instanz.',
    },
    {
      q: 'Kann ich jederzeit kündigen?',
      a: 'Jederzeit, ohne Mindestlaufzeit. Bei Kündigung erstellen wir automatisch ein letztes Backup Ihrer Daten, bevor der Server gelöscht wird.',
    },
    {
      q: 'Ich bin technisch versiert — soll ich selbst hosten?',
      a: 'Durchaus eine Option! Für Self-Hosting empfehlen wir die offizielle OpenClaw-Dokumentation (docs.openclaw.ai). Unser Angebot richtet sich an alle, die sich auf die KI konzentrieren möchten — nicht auf Infrastruktur.',
    },
  ],

  cta: 'Jetzt Plan wählen →',
}

const en: typeof de = {
  back: '← Back to homepage',
  label: 'Compare',
  h1: 'Self-host or let us handle it?',
  sub: 'An honest comparison — including the DIY option.',

  col1: 'Own device',
  col1sub: 'Mac Mini / Raspberry Pi / Windows',
  col2: 'Own VPS',
  col2sub: 'Hetzner, Infomaniak, etc.',
  col3: '⭐ OpenClaw Hosting',
  col3sub: 'Set up and ready to use',
  recommended: '★ Recommended',

  rows: [
    { label: 'Setup time',                    v1: '30–120 min',           v2: '2–4 hours',               v3: '~30 minutes' },
    { label: 'Technical knowledge',           v1: 'Moderate',             v2: 'High (Linux)',             v3: 'None' },
    { label: 'Runs 24/7',                     v1: '❌ Only when on',       v2: '✅ Yes',                   v3: '✅ Yes' },
    { label: 'Automatic updates',             v1: '❌ Manual',             v2: '❌ Manual',                 v3: '✅ Automatic' },
    { label: 'Daily backups',                 v1: '❌ No',                 v2: '❌ Not included',          v3: '✅ Automatic daily' },
    { label: 'Dashboard & overview',          v1: '❌',                   v2: '❌',                       v3: '✅ Personal dashboard' },
    { label: 'Pre-configured integrations',   v1: '❌ DIY',               v2: '❌ DIY',                   v3: '✅ Gmail, calendar, voice, web' },
    { label: 'Support',                       v1: '❌ Community only',    v2: '❌ Community only',        v3: '✅ Email support' },
    { label: 'Cost',                          v1: 'Electricity only',     v2: 'CHF 5–15/mo',             v3: 'CHF 19–59/mo' },
    { label: 'Swiss servers',                 v1: '❌ / ✅ Depends',       v2: '✅ Depends on provider',  v3: '✅ Infomaniak, Geneva' },
  ],

  meanTitle: 'What "pre-configured" really means',
  meanSub: 'When we say "ready to use", we mean exactly that. No empty terminal, no "now figure out the rest". Your bot starts and is immediately usable.',
  meanItems: [
    { icon: '📧', text: 'Gmail & Google Calendar (via Maton.ai — free to connect)' },
    { icon: '🎙️', text: 'Voice notes via Whisper (local, no third-party cloud)' },
    { icon: '🌐', text: 'Web search via Brave (live results directly in chat)' },
    { icon: '💾', text: 'Daily automatic backup of your configuration' },
  ],

  faqTitle: 'Frequently asked questions',
  faqs: [
    {
      q: 'Is this really my own server?',
      a: 'Yes. No shared hosting, no shared resources. A dedicated VPS at Infomaniak in Geneva — just for you. Your data lives on your own instance.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Anytime, no minimum term. On cancellation we automatically create a final backup of your data before the server is deleted.',
    },
    {
      q: 'I\'m technical — should I self-host?',
      a: 'Totally valid! We recommend the official OpenClaw documentation (docs.openclaw.ai) as a starting point. Our service is for people who want to focus on using AI — not on managing infrastructure.',
    },
  ],

  cta: 'Choose a plan →',
}

export default function VergleichPage() {
  const [lang, setLang] = useState<'de' | 'en'>('de')
  const t = lang === 'de' ? de : en
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const isGood = (val: string) => val.startsWith('✅')
  const isBad  = (val: string) => val.startsWith('❌')

  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0F1714' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E4EDE9', padding: '0.9rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: '#0F1714', textDecoration: 'none' }}>
            OpenClaw<span style={{ color: '#12A878' }}>Hosting</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/#how" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>{lang === 'de' ? 'So funktioniert\'s' : 'How it works'}</Link>
            <Link href="/#pricing" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>{lang === 'de' ? 'Preise' : 'Pricing'}</Link>
            <Link href="/skills" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Skills</Link>
            <Link href="/#faq" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>FAQ</Link>
            <button onClick={() => setLang(l => l === 'de' ? 'en' : 'de')}
              style={{ background: 'transparent', border: '1px solid #E4EDE9', color: '#4B5563', padding: '0.28rem 0.65rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <Link href="/#pricing" style={{ background: '#12A878', color: '#fff', padding: '0.45rem 1.1rem', borderRadius: 8, fontWeight: 600, fontSize: '0.86rem', textDecoration: 'none' }}>
              {lang === 'de' ? 'Jetzt starten' : 'Get started'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: '#F7FAF9', padding: '4.5rem 1.5rem 3.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link href="/" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1.75rem' }}>{t.back}</Link>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#12A878', marginBottom: '0.75rem' }}>{t.label}</div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', lineHeight: 1.15, marginBottom: '1rem', color: '#0F1714' }}>
            {t.h1}
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 580 }}>{t.sub}</p>
        </div>
      </section>

      {/* Compare table */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid #E4EDE9' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem 1.25rem', background: '#F7FAF9', borderBottom: '1px solid #E4EDE9', textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, color: '#4B5563', width: '26%' }}></th>
                  {/* Col 1 */}
                  <th style={{ padding: '1rem 1.25rem', background: '#F7FAF9', borderBottom: '1px solid #E4EDE9', textAlign: 'center', width: '24%' }}>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#0F1714' }}>{t.col1}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.2rem' }}>{t.col1sub}</div>
                  </th>
                  {/* Col 2 */}
                  <th style={{ padding: '1rem 1.25rem', background: '#F7FAF9', borderBottom: '1px solid #E4EDE9', textAlign: 'center', width: '24%' }}>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#0F1714' }}>{t.col2}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.2rem' }}>{t.col2sub}</div>
                  </th>
                  {/* Col 3 — highlighted */}
                  <th style={{ padding: '1rem 1.25rem', background: '#E6F7F2', borderBottom: '2px solid #12A878', textAlign: 'center', width: '26%' }}>
                    <div style={{ display: 'inline-block', background: '#12A878', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 99, marginBottom: '0.4rem', letterSpacing: '0.04em' }}>{t.recommended}</div>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#0F1714' }}>{t.col3}</div>
                    <div style={{ fontSize: '0.75rem', color: '#0E8F67', marginTop: '0.2rem', fontWeight: 500 }}>{t.col3sub}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < t.rows.length - 1 ? '1px solid #E4EDE9' : 'none' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.88rem', fontWeight: 600, color: '#0F1714', background: i % 2 === 0 ? '#fff' : '#FAFCFB' }}>{row.label}</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center', fontSize: '0.85rem', color: isBad(row.v1) ? '#EF4444' : isGood(row.v1) ? '#16A34A' : '#4B5563', background: i % 2 === 0 ? '#fff' : '#FAFCFB' }}>{row.v1}</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center', fontSize: '0.85rem', color: isBad(row.v2) ? '#EF4444' : isGood(row.v2) ? '#16A34A' : '#4B5563', background: i % 2 === 0 ? '#fff' : '#FAFCFB' }}>{row.v2}</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: isBad(row.v3) ? '#EF4444' : isGood(row.v3) ? '#0E8F67' : '#0F1714', background: i % 2 === 0 ? '#E6F7F2' : '#DCF3EC' }}>{row.v3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What "pre-configured" means */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9', background: '#F7FAF9' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.4rem, 4vw, 2rem)', marginBottom: '1rem', color: '#0F1714' }}>{t.meanTitle}</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1rem' }}>{t.meanSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {t.meanItems.map((item, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #E4EDE9', borderRadius: 12, padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.9rem', color: '#0F1714', lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.4rem, 4vw, 2rem)', marginBottom: '2rem', color: '#0F1714' }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {t.faqs.map((faq, i) => (
              <div key={i} style={{ border: '1px solid #E4EDE9', borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s', ...(openFaq === i ? { borderColor: '#12A878' } : {}) }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '1rem 1.25rem', background: openFaq === i ? '#F7FAF9' : '#fff', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F1714', lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: '#12A878', fontSize: '1.25rem', fontWeight: 300, flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.25rem 1.1rem', background: '#F7FAF9' }}>
                    <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center', background: '#12A878' }}>
        <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#fff', marginBottom: '0.75rem' }}>
          {lang === 'de' ? 'Bereit, loszulegen?' : 'Ready to get started?'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '1rem' }}>
          {lang === 'de' ? 'In ~30 Minuten live. Kein Technikwissen nötig.' : 'Live in ~30 minutes. No technical skills needed.'}
        </p>
        <Link href="/#pricing" style={{ display: 'inline-block', background: '#fff', color: '#12A878', padding: '0.9rem 2.5rem', borderRadius: 10, fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
          {t.cta}
        </Link>
      </section>

    </main>
  )
}
