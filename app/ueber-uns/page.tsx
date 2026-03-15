import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns – OpenClaw Hosting',
  description: 'Wir glauben, dass KI für alle zugänglich sein sollte — ohne technisches Vorwissen, ohne Datenschutzrisiken, einfach.',
}

export default function UeberUnsPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0F1714' }}>
      {/* Hero */}
      <section style={{ background: '#F7FAF9', padding: '5rem 1.5rem 4rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Zurück</Link>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#12A878', marginBottom: '0.75rem' }}>Über uns</div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2.5rem', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            KI, die für Sie arbeitet.<br />
            <span style={{ color: '#12A878' }}>Nicht gegen Sie.</span>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '580px' }}>
            Wir haben OpenClaw Hosting aufgebaut, weil wir glauben: KI-Assistenten sollten den Menschen wirklich nützen — nicht ihre Daten sammeln, sie nicht an grosse Plattformen binden und kein Informatik-Studium zur Einrichtung erfordern.
          </p>
        </div>
      </section>

      {/* Was ist OpenClaw Hosting */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '1rem' }}>Was ist OpenClaw Hosting?</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.8, marginBottom: '1rem' }}>
            OpenClaw Hosting ist verwaltetes Cloud-Hosting für OpenClaw — die meistgenutzte Open-Source-KI-Assistenten-Plattform mit über 200'000 GitHub-Stars.
          </p>
          <p style={{ color: '#4B5563', lineHeight: 1.8, marginBottom: '1rem' }}>
            Wir kümmern uns um Server, Updates, Sicherheit und Backups. Sie erhalten einen privaten, rund um die Uhr verfügbaren KI-Assistenten auf einem Server in der Schweiz — ohne ein Terminal zu berühren, ohne Technikwissen.
          </p>
          <p style={{ color: '#4B5563', lineHeight: 1.8 }}>
            Denken Sie an uns als den Einfach-Knopf für selbst-gehostete KI — aber mit Schweizer Datenschutz.
          </p>
        </div>
      </section>

      {/* Unsere Werte */}
      <section style={{ padding: '4rem 1.5rem', background: '#F7FAF9', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.75rem', marginBottom: '2rem' }}>Unsere Werte</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              { icon: '🔓', title: 'Open Source', text: 'Wir betreiben Open-Source-Software. Keine Black Boxes, keine versteckten Mechanismen. Sie sehen genau, was auf Ihrem Server läuft.' },
              { icon: '🇨🇭', title: 'Schweizer Datenschutz', text: 'Ihre Instanz läuft auf einem Server in Genf. Schweizer Recht (nDSG), DSGVO-konform. Keine Daten in amerikanischen oder chinesischen Rechenzentren.' },
              { icon: '🔒', title: 'Ihre Daten bleiben Ihre', text: 'Wir lesen Ihre Gespräche nicht. Wir trainieren keine Modelle mit Ihren Daten. Ihr API-Schlüssel verlässt nie Ihren Server.' },
              { icon: '⚡', title: 'Einfachheit hat Priorität', text: 'KI soll Ihre Fähigkeiten verstärken, nicht neue erfordern. Kein DevOps, kein Terminal, kein Setup-Stress.' },
            ].map(v => (
              <div key={v.title} style={{ background: '#fff', border: '1px solid #E4EDE9', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{v.title}</h3>
                <p style={{ color: '#4B5563', fontSize: '0.88rem', lineHeight: 1.65 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unabhängigkeit */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid #E4EDE9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '12px', padding: '1.75rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>Ein Hinweis zur Unabhängigkeit</h3>
            <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.7 }}>
              OpenClaw Hosting ist ein unabhängiger Dienst. Wir sind nicht offiziell mit dem OpenClaw-Projekt oder seinen Maintainern verbunden. Wir sind schlicht überzeugte Nutzer von Open-Source-KI — und wollen sie für alle zugänglich machen, ohne den technischen Aufwand.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', marginBottom: '1rem' }}>
            Bereit loszulegen?
          </h2>
          <p style={{ color: '#4B5563', marginBottom: '2rem', lineHeight: 1.7 }}>
            Schliessen Sie sich unseren ersten Kunden an und erleben Sie, wie einfach ein eigener KI-Assistent sein kann.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#pricing" style={{ background: '#12A878', color: '#fff', padding: '0.85rem 2rem', borderRadius: '9px', fontWeight: 700, textDecoration: 'none', fontSize: '0.97rem' }}>Pläne ansehen →</Link>
            <Link href="/contact" style={{ background: 'transparent', color: '#12A878', padding: '0.85rem 2rem', borderRadius: '9px', fontWeight: 600, textDecoration: 'none', fontSize: '0.97rem', border: '1.5px solid #E4EDE9' }}>Kontakt</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
