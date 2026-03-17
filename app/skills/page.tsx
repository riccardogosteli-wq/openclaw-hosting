'use client'
import { useState } from 'react'
import Link from 'next/link'

const de = {
  back: '← Zurück zur Startseite',
  label: 'Skills',
  h1: 'Was Ihr Assistent von Anfang an kann',
  sub: 'Alles Wichtige ist bereits installiert. Kein Setup. Kein Terminal. Direkt loslegen.',

  sec1title: 'Sofort verfügbar — auf jedem Plan',
  sec1sub: 'Diese Funktionen sind auf jedem Plan vorinstalliert und funktionieren ab dem ersten Chat.',

  preinstalled: [
    {
      icon: '🌐',
      title: 'Web-Suche',
      desc: 'Sucht live im Internet — keine veralteten Antworten, keine Halluzinationen über aktuelle Ereignisse.',
      ex: '"Was sind die neuesten Nachrichten aus Bern?"',
    },
    {
      icon: '🎙️',
      title: 'Sprachnotizen',
      desc: 'Sprachnachricht senden, Text zurückbekommen. Unterwegs diktieren — kein Tippen nötig.',
      ex: '[🎙️] "Notiz: Zahnarzt morgen 14 Uhr"',
    },
    {
      icon: '📺',
      title: 'Web & YouTube zusammenfassen',
      desc: 'Videos, Webseiten und PDFs auf das Wesentliche reduziert — in Sekunden.',
      ex: '"Fasse dieses Video zusammen: youtube.com/..."',
    },
    {
      icon: '🌤️',
      title: 'Wetter',
      desc: 'Aktuelles Wetter und Vorhersagen für jeden Ort weltweit — ohne App, direkt im Chat.',
      ex: '"Wie wird das Wetter am Wochenende in Zürich?"',
    },
    {
      icon: '💾',
      title: 'Tägliches Backup',
      desc: 'Ihre Konfiguration und Daten werden jeden Tag automatisch gesichert — ohne Ihr Zutun.',
      ex: '(Automatisch — kein Befehl nötig)',
      auto: true,
    },
    {
      icon: '⚡',
      title: '24/7 verfügbar',
      desc: 'Ihr Assistent läuft rund um die Uhr auf Ihrem eigenen Server in der Schweiz — auch wenn Ihr Gerät aus ist.',
      ex: '(Automatisch)',
      auto: true,
    },
  ],

  sec2title: 'Per Einrichtung aktivierbar',
  sec2sub: 'Diese Integrationen benötigen eine kurze Einrichtung — Schritt-für-Schritt-Anleitungen direkt im Dashboard (Pro & Business).',

  setupRequired: [
    {
      icon: '📧',
      title: 'Gmail & Google Kalender',
      desc: 'E-Mails lesen und beantworten, Termine prüfen und planen. Über Maton.ai — kostenlos verbindbar.',
      ex: '"Was steht heute in meinem Kalender?"',
    },
    {
      icon: '📊',
      title: 'Google Sheets',
      desc: 'Daten aus Sheets lesen und automatisch eintragen — ideal für Trainingslogs, Budgets, Protokolle.',
      ex: '"Trag mein Training ein: 45 Min Laufen"',
    },
    {
      icon: '🔔',
      title: 'Reminders & Automatisierungen',
      desc: 'Tägliche Briefings, automatische Erinnerungen und wiederkehrende Aufgaben per Cron.',
      ex: '"Erinnere mich jeden Morgen um 7:30 Uhr"',
    },
    {
      icon: '🔌',
      title: 'Eigene Integrationen',
      desc: 'Eigene Idee? Integrationen lassen sich über den Bot selbst einrichten oder per Support anfragen.',
      ex: '"Was kann ich noch anschliessen?"',
    },
  ],

  clawhub: 'Neue Skills erscheinen laufend auf',
  clawhubLink: 'ClawHub →',
  clawhubSub: '— der Community-Plattform für OpenClaw-Skills.',
  cta: 'Jetzt starten →',
}

const en: typeof de = {
  back: '← Back to homepage',
  label: 'Skills',
  h1: 'What your assistant can do from day one',
  sub: 'Everything important is pre-installed. No setup. No terminal. Start immediately.',

  sec1title: 'Available out of the box — every plan',
  sec1sub: 'These features are pre-installed on every plan and work from your very first chat.',

  preinstalled: [
    {
      icon: '🌐',
      title: 'Web search',
      desc: 'Live internet search — no outdated answers, no hallucinations about current events.',
      ex: '"What\'s the latest news from Zurich?"',
    },
    {
      icon: '🎙️',
      title: 'Voice notes',
      desc: 'Send a voice message, get text back. Dictate on the go — no typing needed.',
      ex: '[🎙️] "Note: dentist tomorrow at 2pm"',
    },
    {
      icon: '📺',
      title: 'Summarize web & YouTube',
      desc: 'Videos, web pages, and PDFs distilled to the essentials — in seconds.',
      ex: '"Summarize this video: youtube.com/..."',
    },
    {
      icon: '🌤️',
      title: 'Weather',
      desc: 'Current weather and forecasts for any location worldwide — right in your chat.',
      ex: '"How\'s the weather this weekend in Bern?"',
    },
    {
      icon: '💾',
      title: 'Daily backup',
      desc: 'Your configuration and data are backed up automatically every day — no action needed.',
      ex: '(Automatic — no command needed)',
      auto: true,
    },
    {
      icon: '⚡',
      title: '24/7 available',
      desc: 'Your assistant runs around the clock on your own Swiss server — even when your device is off.',
      ex: '(Automatic)',
      auto: true,
    },
  ],

  sec2title: 'Activate with a quick setup',
  sec2sub: 'These integrations need a quick setup — step-by-step guides are built right into your dashboard (Pro & Business).',

  setupRequired: [
    {
      icon: '📧',
      title: 'Gmail & Google Calendar',
      desc: 'Read and reply to emails, check and plan appointments. Via Maton.ai — free to connect.',
      ex: '"What\'s on my calendar today?"',
    },
    {
      icon: '📊',
      title: 'Google Sheets',
      desc: 'Read and automatically write data to Sheets — ideal for training logs, budgets, notes.',
      ex: '"Log my workout: 45 min running"',
    },
    {
      icon: '🔔',
      title: 'Reminders & automation',
      desc: 'Daily briefings, automatic reminders, and recurring tasks via cron.',
      ex: '"Remind me every morning at 7:30am"',
    },
    {
      icon: '🔌',
      title: 'Custom integrations',
      desc: 'Got your own idea? Set up integrations directly via the bot or ask support.',
      ex: '"What else can I connect?"',
    },
  ],

  clawhub: 'New skills added regularly on',
  clawhubLink: 'ClawHub →',
  clawhubSub: '— the community platform for OpenClaw skills.',
  cta: 'Get started →',
}

export default function SkillsPage() {
  const [lang, setLang] = useState<'de' | 'en'>('de')
  const t = lang === 'de' ? de : en

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
            <Link href="/vergleich" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>{lang === 'de' ? 'Vergleich' : 'Compare'}</Link>
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
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', lineHeight: 1.15, marginBottom: '1rem', color: '#0F1714' }}>{t.h1}</h1>
          <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 580 }}>{t.sub}</p>
        </div>
      </section>

      {/* Pre-installed cards */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)', marginBottom: '0.6rem', color: '#0F1714' }}>{t.sec1title}</h2>
          <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.25rem', maxWidth: 620 }}>{t.sec1sub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
            {t.preinstalled.map((skill, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #E4EDE9', borderRadius: 14, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
                <div style={{ fontSize: '2rem', lineHeight: 1 }}>{skill.icon}</div>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#0F1714' }}>{skill.title}</div>
                <div style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.65, flex: 1 }}>{skill.desc}</div>
                <div style={{ marginTop: '0.5rem', background: skill.auto ? '#F7FAF9' : '#0F1714', color: skill.auto ? '#9CA3AF' : '#E6F7F2', padding: '0.4rem 0.75rem', borderRadius: 7, fontSize: '0.78rem', fontFamily: 'monospace', fontStyle: skill.auto ? 'italic' : 'normal' }}>
                  {skill.ex}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup-required list */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9', background: '#F7FAF9' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)', marginBottom: '0.6rem', color: '#0F1714' }}>{t.sec2title}</h2>
          <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.25rem', maxWidth: 620 }}>{t.sec2sub}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {t.setupRequired.map((skill, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #E4EDE9', borderRadius: 12, padding: '1.1rem 1.4rem', display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '0.1rem' }}>{skill.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F1714', marginBottom: '0.25rem' }}>{skill.title}</div>
                  <div style={{ fontSize: '0.865rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '0.5rem' }}>{skill.desc}</div>
                  <div style={{ background: '#0F1714', color: '#E6F7F2', padding: '0.3rem 0.65rem', borderRadius: 6, fontSize: '0.76rem', fontFamily: 'monospace', display: 'inline-block' }}>{skill.ex}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ClawHub note */}
          <div style={{ marginTop: '2.5rem', padding: '1.1rem 1.4rem', background: '#E6F7F2', border: '1px solid #b2dfd4', borderRadius: 12, fontSize: '0.88rem', color: '#0E8F67', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span>🔗</span>
            <span>{t.clawhub} <a href="https://clawhub.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0E8F67', fontWeight: 700 }}>{t.clawhubLink}</a> {t.clawhubSub}</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center', background: '#12A878' }}>
        <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#fff', marginBottom: '0.75rem' }}>
          {lang === 'de' ? 'Alle Skills. Sofort einsatzbereit.' : 'All skills. Ready to use immediately.'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '1rem' }}>
          {lang === 'de' ? 'Ihr Assistent ist in ~30 Minuten live.' : 'Your assistant is live in ~30 minutes.'}
        </p>
        <Link href="/#pricing" style={{ display: 'inline-block', background: '#fff', color: '#12A878', padding: '0.9rem 2.5rem', borderRadius: 10, fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
          {t.cta}
        </Link>
      </section>

    </main>
  )
}
