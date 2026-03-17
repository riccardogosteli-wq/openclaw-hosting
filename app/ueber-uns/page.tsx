'use client'
import Link from 'next/link'
import { useState } from 'react'

const de = {
  back: '← Zurück zur Startseite',
  label: 'Über uns',
  h1a: 'Wir machen selbst-gehostete KI',
  h1b: 'zugänglich für alle.',
  intro: 'OpenClaw Hosting entstand aus einer einfachen Beobachtung: Die beste Open-Source-KI-Plattform der Welt scheitert für viele Menschen an einem einzigen Schritt — dem Setup. Wir lösen genau dieses Problem.',
  s1h: 'Woher wir kommen',
  s1p1: 'Wir sind selbst täglich OpenClaw-Nutzer. Wir nutzen es für E-Mail-Management, Kalender-Automatisierungen, Recherchen und Dutzende anderer Aufgaben — und kennen deshalb genau, was es kann. Und wie viel Zeit es einspart.',
  s1p2: 'Was uns störte: Jedes Mal wenn wir Freunden oder Kollegen von OpenClaw erzählten, kam derselbe Moment — der Blick, der sagte: «Klingt gut, aber das ist nichts für mich. Ich bin kein Techniker.» Dabei brauchten sie eigentlich genau das.',
  s1p3: 'Also haben wir den technischen Teil übernommen. Sie chatten einfach los.',
  s2h: 'Was uns antreibt',
  values: [
    { icon: '🇨🇭', title: 'Datenschutz ist kein Feature — es ist Pflicht', text: 'Ihr Server steht in der Schweiz, Ihre Daten bleiben dort. Wir legen das technisch so an, dass wir schlicht keinen Zugriff auf Ihre Gespräche haben. Nicht weil wir müssen — weil wir es richtig machen wollen.' },
    { icon: '🔓', title: 'Keine geschlossenen Ökosysteme', text: 'OpenClaw ist Open Source. Das bedeutet: Sie sind nicht von uns abhängig. Wenn Sie den Dienst beenden, gehören Ihre Daten und Ihr Server Ihnen. Kein Vendor-Lock-in, kein Datenverlust.' },
    { icon: '🤝', title: 'Einfachheit hat einen echten Wert', text: 'Wir glauben, dass die Zeit, die Sie für ein Setup aufwenden, besser irgendwo anders investiert ist. Deswegen übernehmen wir das — damit Sie vom ersten Tag an produktiv sind.' },
    { icon: '💬', title: 'Support auf Augenhöhe', text: 'Kein Ticket-System, kein Bot-Chat. Wir schreiben zurück — auf Deutsch, innerhalb von 24 Stunden. Wenn etwas nicht funktioniert, kümmern wir uns darum.' },
  ],
  s3h: 'Damit das klar ist',
  s3p: 'Wir sind ein unabhängiger Hosting-Anbieter. Wir sind nicht das OpenClaw-Projekt, nicht seine Entwickler und auch nicht mit ihnen verbunden. Wir betreiben lediglich Instanzen dieser Open-Source-Software — professionell, auf sicherer Infrastruktur, ohne dass Sie sich um die Technik kümmern müssen.',
  s3note: 'Das OpenClaw-Projekt ist unter github.com/openclaw verfügbar und kann kostenlos selbst betrieben werden. Wir übernehmen den Hosting-Teil — damit Sie das nicht müssen.',
  ctaH: 'Neugierig geworden?',
  ctaP: 'Schauen Sie sich unsere Pläne an oder schreiben Sie uns direkt — wir beantworten jede Frage persönlich.',
  ctaBtn: 'Pläne ansehen →',
  ctaContact: 'Kontakt',
}

const en = {
  back: '← Back to homepage',
  label: 'About us',
  h1a: 'We make self-hosted AI',
  h1b: 'accessible to everyone.',
  intro: 'OpenClaw Hosting was born from a simple observation: the world\'s best open-source AI platform fails most people at one single step — the setup. We solve exactly that problem.',
  s1h: 'Where we come from',
  s1p1: 'We use OpenClaw ourselves every day. We use it for email management, calendar automation, research and dozens of other tasks — so we know exactly what it can do. And how much time it saves.',
  s1p2: 'What bothered us: every time we told friends or colleagues about OpenClaw, the same moment came — the look that said: "Sounds good, but that\'s not for me. I\'m not technical." Yet they needed exactly that.',
  s1p3: 'So we took care of the technical part. You just start chatting.',
  s2h: 'What drives us',
  values: [
    { icon: '🇨🇭', title: 'Privacy is not a feature — it\'s a requirement', text: 'Your server is in Switzerland, your data stays there. We set things up technically so that we simply have no access to your conversations. Not because we have to — because we want to do it right.' },
    { icon: '🔓', title: 'No closed ecosystems', text: 'OpenClaw is open source. That means: you\'re not dependent on us. If you end the service, your data and server belong to you. No vendor lock-in, no data loss.' },
    { icon: '🤝', title: 'Simplicity has real value', text: 'We believe the time you spend on setup is better invested elsewhere. That\'s why we take care of it — so you\'re productive from day one.' },
    { icon: '💬', title: 'Support at eye level', text: 'No ticket system, no bot chat. We write back — in English or German, within 24 hours. If something doesn\'t work, we take care of it.' },
  ],
  s3h: 'Just to be clear',
  s3p: 'We are an independent hosting provider. We are not the OpenClaw project, not its developers, and not affiliated with them. We simply run instances of this open-source software — professionally, on secure infrastructure, without you having to worry about the technical side.',
  s3note: 'The OpenClaw project is available at github.com/openclaw and can be self-hosted for free. We take care of the hosting part — so you don\'t have to.',
  ctaH: 'Curious?',
  ctaP: 'Check out our plans or write to us directly — we answer every question personally.',
  ctaBtn: 'View plans →',
  ctaContact: 'Contact',
}

export default function UeberUnsPage() {
  const [lang, setLang] = useState<'de'|'en'>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('lang') as 'de'|'en') || 'de'
    return 'de'
  })
  const t = lang === 'de' ? de : en

  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0F1714' }}>

      {/* Nav */}
      <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,0.96)', backdropFilter:'blur(12px)', borderBottom:'1px solid #E4EDE9', padding:'0.9rem 0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Link href="/" style={{ fontFamily:'Bricolage Grotesque, sans-serif', fontWeight:800, fontSize:'1.05rem', color:'#0F1714', textDecoration:'none' }}>
            OpenClaw<span style={{ color:'#12A878' }}>Hosting</span>
          </Link>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <Link href="/#how" style={{ color:'#4B5563', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>{lang==='de' ? 'So funktioniert\'s' : 'How it works'}</Link>
            <Link href="/#pricing" style={{ color:'#4B5563', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>{lang==='de' ? 'Preise' : 'Pricing'}</Link>
            <Link href="/vergleich" style={{ color:'#4B5563', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>{lang==='de' ? 'Vergleich' : 'Compare'}</Link>
            <Link href="/skills" style={{ color:'#4B5563', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>Skills</Link>
            <Link href="/#faq" style={{ color:'#4B5563', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>FAQ</Link>
            <Link href="/contact" style={{ color:'#4B5563', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>{lang==='de' ? 'Kontakt' : 'Contact'}</Link>
            <Link href="/ueber-uns" style={{ color:'#4B5563', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>{lang==='de' ? 'Über uns' : 'About'}</Link>
            <button onClick={() => setLang(l => { const n = l==='de'?'en':'de'; localStorage.setItem('lang', n); return n })} style={{ background:'transparent', border:'1px solid #E4EDE9', color:'#4B5563', padding:'0.28rem 0.65rem', borderRadius:6, fontSize:'0.8rem', fontWeight:600, cursor:'pointer' }}>
              {lang==='de' ? 'EN' : 'DE'}
            </button>
            <Link href="/#pricing" style={{ background:'#12A878', color:'#fff', padding:'0.45rem 1.1rem', borderRadius:8, fontWeight:600, fontSize:'0.86rem', textDecoration:'none' }}>
              {lang==='de' ? 'Jetzt starten' : 'Get started'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: '#F7FAF9', padding: '5rem 1.5rem 4rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>{t.back}</Link>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#12A878', marginBottom: '0.75rem' }}>{t.label}</div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.9rem, 5vw, 2.5rem)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            {t.h1a}<br /><span style={{ color: '#12A878' }}>{t.h1b}</span>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '580px' }}>{t.intro}</p>
        </div>
      </section>

      {/* Where we come from */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '1.25rem', color: '#0F1714' }}>{t.s1h}</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.85, marginBottom: '1.1rem' }}>{t.s1p1}</p>
          <p style={{ color: '#4B5563', lineHeight: 1.85, marginBottom: '1.1rem' }}>{t.s1p2}</p>
          <p style={{ color: '#4B5563', lineHeight: 1.85 }}>{t.s1p3}</p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '4rem 1.5rem', background: '#F7FAF9', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '2rem', color: '#0F1714' }}>{t.s2h}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {t.values.map(v => (
              <div key={v.title} style={{ background: '#fff', border: '1px solid #E4EDE9', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.65rem' }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.97rem', marginBottom: '0.5rem', color: '#0F1714' }}>{v.title}</h3>
                <p style={{ color: '#4B5563', fontSize: '0.87rem', lineHeight: 1.7 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '1.25rem', color: '#0F1714' }}>{t.s3h}</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.85, marginBottom: '1.5rem' }}>{t.s3p}</p>
          <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderLeft: '3px solid #12A878', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.7 }}>
            <strong style={{ color: '#0F1714' }}>OpenClaw</strong> {t.s3note.replace('Das OpenClaw-Projekt ist unter ', '').replace('The OpenClaw project is available at ', '')} <a href="https://github.com/openclaw/openclaw" style={{ color: '#12A878' }} target="_blank" rel="noopener noreferrer">github.com/openclaw</a>.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2rem)', marginBottom: '1rem', color: '#0F1714' }}>{t.ctaH}</h2>
          <p style={{ color: '#4B5563', marginBottom: '2rem', lineHeight: 1.75 }}>{t.ctaP}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#pricing" style={{ background: '#12A878', color: '#fff', padding: '0.85rem 2rem', borderRadius: '9px', fontWeight: 700, textDecoration: 'none', fontSize: '0.97rem' }}>{t.ctaBtn}</Link>
            <Link href="/contact" style={{ background: 'transparent', color: '#12A878', padding: '0.85rem 2rem', borderRadius: '9px', fontWeight: 600, textDecoration: 'none', fontSize: '0.97rem', border: '1.5px solid #E4EDE9' }}>{t.ctaContact}</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
