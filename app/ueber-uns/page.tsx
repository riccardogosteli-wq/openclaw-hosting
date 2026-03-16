import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns – OpenClaw Hosting',
  description: 'Wir sind ein kleines Team aus der Schweiz, das glaubt: ein eigener KI-Assistent sollte für jeden zugänglich sein — nicht nur für Entwickler.',
}

export default function UeberUnsPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0F1714' }}>

      {/* Hero */}
      <section style={{ background: '#F7FAF9', padding: '5rem 1.5rem 4rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Zurück zur Startseite</Link>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#12A878', marginBottom: '0.75rem' }}>Über uns</div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.9rem, 5vw, 2.5rem)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Wir machen selbst-gehostete KI<br />
            <span style={{ color: '#12A878' }}>zugänglich für alle.</span>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '580px' }}>
            OpenClaw Hosting entstand aus einer einfachen Beobachtung: Die beste Open-Source-KI-Plattform der Welt scheitert für viele Menschen an einem einzigen Schritt — dem Setup. Wir lösen genau dieses Problem.
          </p>
        </div>
      </section>

      {/* Die Idee dahinter */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '1.25rem', color: '#0F1714' }}>
            Woher wir kommen
          </h2>
          <p style={{ color: '#4B5563', lineHeight: 1.85, marginBottom: '1.1rem' }}>
            Wir sind selbst täglich OpenClaw-Nutzer. Wir nutzen es für E-Mail-Management, Kalender-Automatisierungen, Recherchen und Dutzende anderer Aufgaben — und kennen deshalb genau, was es kann. Und wie viel Zeit es einspart.
          </p>
          <p style={{ color: '#4B5563', lineHeight: 1.85, marginBottom: '1.1rem' }}>
            Was uns störte: Jedes Mal wenn wir Freunden oder Kollegen von OpenClaw erzählten, kam derselbe Moment — der Blick, der sagte: «Klingt gut, aber das ist nichts für mich. Ich bin kein Techniker.» Dabei brauchten sie eigentlich genau das.
          </p>
          <p style={{ color: '#4B5563', lineHeight: 1.85 }}>
            Also haben wir den technischen Teil übernommen. Sie chatten einfach los.
          </p>
        </div>
      </section>

      {/* Was wir glauben */}
      <section style={{ padding: '4rem 1.5rem', background: '#F7FAF9', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '2rem', color: '#0F1714' }}>
            Was uns antreibt
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              {
                icon: '🇨🇭',
                title: 'Datenschutz ist kein Feature — es ist Pflicht',
                text: 'Ihr Server steht in der Schweiz, Ihre Daten bleiben dort. Wir legen das technisch so an, dass wir schlicht keinen Zugriff auf Ihre Gespräche haben. Nicht weil wir müssen — weil wir es richtig machen wollen.',
              },
              {
                icon: '🔓',
                title: 'Keine geschlossenen Ökosysteme',
                text: 'OpenClaw ist Open Source. Das bedeutet: Sie sind nicht von uns abhängig. Wenn Sie den Dienst beenden, gehören Ihre Daten und Ihr Server Ihnen. Kein Vendor-Lock-in, kein Datenverlust.',
              },
              {
                icon: '🤝',
                title: 'Einfachheit hat einen echten Wert',
                text: 'Wir glauben, dass die Zeit, die Sie für ein Setup aufwenden, besser irgendwo anders investiert ist. Deswegen übernehmen wir das — damit Sie vom ersten Tag an produktiv sind.',
              },
              {
                icon: '💬',
                title: 'Support auf Augenhöhe',
                text: 'Kein Ticket-System, kein Bot-Chat. Wir schreiben zurück — auf Deutsch, innerhalb von 24 Stunden. Wenn etwas nicht funktioniert, kümmern wir uns darum.',
              },
            ].map(v => (
              <div key={v.title} style={{ background: '#fff', border: '1px solid #E4EDE9', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.65rem' }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.97rem', marginBottom: '0.5rem', color: '#0F1714' }}>{v.title}</h3>
                <p style={{ color: '#4B5563', fontSize: '0.87rem', lineHeight: 1.7 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparenz-Hinweis */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '1.25rem', color: '#0F1714' }}>
            Damit das klar ist
          </h2>
          <p style={{ color: '#4B5563', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            Wir sind ein unabhängiger Hosting-Anbieter. Wir sind nicht das OpenClaw-Projekt, nicht seine Entwickler und auch nicht mit ihnen verbunden. Wir betreiben lediglich Instanzen dieser Open-Source-Software — professionell, auf sicherer Infrastruktur, ohne dass Sie sich um die Technik kümmern müssen.
          </p>
          <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderLeft: '3px solid #12A878', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.7 }}>
            <strong style={{ color: '#0F1714' }}>Das OpenClaw-Projekt</strong> ist unter <a href="https://github.com/openclaw/openclaw" style={{ color: '#12A878' }} target="_blank" rel="noopener noreferrer">github.com/openclaw</a> verfügbar und kann kostenlos selbst betrieben werden. Wir übernehmen den Hosting-Teil — damit Sie das nicht müssen.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2rem)', marginBottom: '1rem', color: '#0F1714' }}>
            Neugierig geworden?
          </h2>
          <p style={{ color: '#4B5563', marginBottom: '2rem', lineHeight: 1.75 }}>
            Schauen Sie sich unsere Pläne an oder schreiben Sie uns direkt — wir beantworten jede Frage persönlich.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#pricing" style={{ background: '#12A878', color: '#fff', padding: '0.85rem 2rem', borderRadius: '9px', fontWeight: 700, textDecoration: 'none', fontSize: '0.97rem' }}>
              Pläne ansehen →
            </Link>
            <Link href="/contact" style={{ background: 'transparent', color: '#12A878', padding: '0.85rem 2rem', borderRadius: '9px', fontWeight: 600, textDecoration: 'none', fontSize: '0.97rem', border: '1.5px solid #E4EDE9' }}>
              Kontakt
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
