import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Häufige Fragen (FAQ) | OpenClaw Hosting',
  description: 'Alle Antworten zu OpenClaw Hosting: Kosten, Datenschutz, AI-Modelle, Sicherheit, Setup und Kündigung. Persönlicher AI-Assistent auf Schweizer Server ab CHF 15/Mt.',
  alternates: {
    canonical: 'https://hosting.openclaw-consulting.ch/faq',
  },
  openGraph: {
    title: 'Häufige Fragen (FAQ) | OpenClaw Hosting',
    description: 'Alle Antworten zu OpenClaw Hosting: Kosten, Datenschutz, AI-Modelle, Sicherheit und Kündigung.',
    url: 'https://hosting.openclaw-consulting.ch/faq',
    siteName: 'OpenClaw Hosting',
    locale: 'de_CH',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Was ist OpenClaw?',
    a: 'OpenClaw ist eine quelloffene KI-Plattform, die auf Ihrem eigenen Server läuft und sich mit Telegram und Discord verbindet. Sie erhalten einen persönlichen AI-Assistenten, der E-Mails verwaltet, Termine plant, Dokumente erstellt und Sie täglich proaktiv brieft — ganz ohne App-Installation. OpenClaw Hosting bedeutet: Wir betreiben Ihren eigenen, privaten OpenClaw-Server in der Schweiz, damit Sie es nicht selbst tun müssen.',
  },
  {
    q: 'Was kostet OpenClaw Hosting?',
    a: 'Es gibt drei Pläne: Starter (CHF 19/Mt. oder CHF 15/Mt. bei Jahresabo), Pro (CHF 34/Mt. oder CHF 27/Mt. jährlich) und Business (CHF 59/Mt. oder CHF 47/Mt. jährlich). Dazu kommt Ihr eigener API-Schlüssel direkt beim KI-Anbieter — typisch CHF 5–20/Mt. je nach Nutzung. Gesamtkosten: CHF 20–79/Mt. Alle Pläne sind monatlich kündbar.',
  },
  {
    q: 'Wo werden meine Daten gespeichert?',
    a: 'Ausschliesslich auf Ihrem eigenen, privaten Server in der Schweiz — gehostet bei Infomaniak in Genf. Ihre Daten verlassen diesen Server nie. Keine Weitergabe an Dritte, keine Verarbeitung ausserhalb der Schweiz. Der Betrieb ist DSGVO- und nDSG-konform.',
  },
  {
    q: 'Brauche ich technische Kenntnisse?',
    a: 'Überhaupt keine. Sie füllen nach der Bezahlung ein kurzes Onboarding-Formular aus (ca. 5–10 Minuten). Wir richten dann Ihren privaten Server vollautomatisch ein. Kein Terminal, kein SSH, keine Konfigurationsdateien. In etwa 30 Minuten ist Ihr Assistent live.',
  },
  {
    q: 'Welche AI-Modelle werden unterstützt?',
    a: 'Sie können zwischen Claude (Anthropic), GPT-4o / GPT-4 (OpenAI) und Gemini (Google) wählen — und jederzeit wechseln. Lokal laufende Modelle (z.B. via Ollama) sind ebenfalls möglich. Für den Einstieg empfehlen wir Claude Haiku (~CHF 5/Mt.), für anspruchsvollere Aufgaben Claude Sonnet (~CHF 15–20/Mt.).',
  },
  {
    q: 'Kann ich OpenClaw auch selbst hosten?',
    a: 'Ja — OpenClaw ist vollständig Open Source und kostenlos auf GitHub verfügbar. Wenn Sie Linux, SSH und Node.js beherrschen, können Sie OpenClaw auf jedem VPS installieren. OpenClaw Hosting richtet sich an alle, die sich auf die KI konzentrieren möchten — nicht auf Infrastruktur.',
  },
  {
    q: 'Was ist im Setup-Service enthalten?',
    a: 'Wir richten Ihren privaten VPS bei Infomaniak ein, installieren und konfigurieren OpenClaw, verbinden Telegram oder Discord, aktivieren automatische Updates und tägliche Backups. Auf Wunsch (Business-Plan, jährliche Zahlung) führen wir einen 30-minütigen Onboarding-Call auf Deutsch durch und richten Custom Skills und Automationen ein.',
  },
  {
    q: 'Wie sicher ist OpenClaw?',
    a: 'Sehr sicher. Ihre API-Schlüssel und Bot-Token werden einmalig beim Onboarding übertragen und direkt auf Ihrem privaten Server abgelegt — wir haben danach keinen Zugriff. Alle Gespräche mit Ihrem Assistenten laufen direkt zwischen Telegram/Discord und Ihrem Server ab. Optional können Ende-zu-Ende-verschlüsselte Kanäle eingesetzt werden. Wir analysieren keine Nutzungsdaten und trainieren keine Modelle mit Ihren Daten.',
  },
  {
    q: 'Kann ich mehrere Geräte verbinden?',
    a: 'Ja. OpenClaw verbindet sich über Telegram oder Discord — Sie können also von Ihrem Smartphone, Tablet, Laptop oder Desktop gleichzeitig mit Ihrem Assistenten kommunizieren. Zusätzlich gibt es die OpenClaw Mobile App für iOS und Android sowie ein Web-Dashboard für die Verwaltung.',
  },
  {
    q: 'Wie kann ich kündigen?',
    a: 'Jederzeit — ohne Mindestlaufzeit. Die aktuelle Aboperiode läuft bis zum Ende aus, danach wird nichts mehr belastet. Keine versteckten Gebühren, kein Vendor Lock-in. Bei Kündigung erhalten Sie auf Wunsch ein letztes Backup Ihrer Konfiguration.',
  },
  {
    q: 'Was passiert, wenn OpenClaw Updates veröffentlicht?',
    a: 'Wir prüfen neue Versionen intern, bevor wir sie ausrollen. Updates werden automatisch auf Ihren Server gespielt — ohne Unterbruch, ohne Aktion Ihrerseits. Sie profitieren immer von den neuesten Funktionen und Sicherheits-Patches.',
  },
  {
    q: 'Gibt es Support auf Deutsch?',
    a: 'Ja, auf Deutsch und Englisch. Sie erreichen uns per E-Mail an support@openclaw-consulting.ch und erhalten eine persönliche Antwort — kein Bot, kein Ticket-Labyrinth. Auf dem Business-Plan ist Prioritäts-Support mit Antwort innerhalb von 24 Stunden inklusive.',
  },
]

export default function FaqPage() {
  return (
    <>
      {/* NAV */}
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="/" className="nav-brand">OpenClaw<span>Hosting</span></a>
          <div className="nav-links">
            <a href="/#how">So funktioniert&apos;s</a>
            <a href="/#pricing">Preise</a>
            <a href="/vergleich">Vergleich</a>
            <a href="/skills">Skills</a>
            <a href="/anwendungsfaelle">Anwendungsfälle</a>
            <a href="/faq" style={{ color: 'var(--green)', fontWeight: 700 }}>FAQ</a>
            <a href="/contact">Kontakt</a>
            <a href="/ueber-uns">Über uns</a>
            <a href="/#pricing" className="nav-cta">Jetzt starten</a>
          </div>
        </div>
      </nav>

      {/* JSON-LD: FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />

      {/* HERO */}
      <section style={{ padding: '5rem 0 3rem', background: 'var(--light)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ marginBottom: '1rem' }}>
            <a href="/" style={{ color: 'var(--green)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              ← Zurück zur Startseite
            </a>
          </div>
          <div className="section-label">FAQ</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Häufige Fragen zu<br />
            <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>OpenClaw Hosting</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--slate)', maxWidth: '580px', lineHeight: 1.7 }}>
            Alles, was Sie wissen müssen — zu Kosten, Datenschutz, Sicherheit, Setup und Kündigung. Direkt, ehrlich, ohne Marketing-Geschwurbel.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {faqs.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid var(--border)',
                  padding: '2rem 0',
                }}
              >
                <h2 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}>
                  <span style={{
                    color: 'var(--green)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    flexShrink: 0,
                    marginTop: '0.05rem',
                  }}>Q{String(i + 1).padStart(2, '0')}</span>
                  {item.q}
                </h2>
                <p style={{
                  color: 'var(--slate)',
                  lineHeight: 1.75,
                  fontSize: '0.95rem',
                  paddingLeft: '2.25rem',
                  margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Still got questions */}
          <div style={{
            maxWidth: '760px',
            margin: '3rem auto 0',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '2rem',
            textAlign: 'center',
          }}>
            <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
              Noch eine Frage?
            </p>
            <p style={{ color: 'var(--slate)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
              Wir antworten persönlich — auf Deutsch oder Englisch.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary">Frage stellen</a>
              <a href="mailto:support@openclaw-consulting.ch" className="btn-ghost">support@openclaw-consulting.ch</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Bereit für Ihren <em>persönlichen AI-Assistenten?</em></h2>
          <p>Kein Technikwissen nötig. Vollautomatisches Setup — Ihr Assistent ist in ~30 Minuten live.</p>
          <a href="/#pricing" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.95rem 2.5rem' }}>
            Jetzt starten
          </a>
          <p style={{ marginTop: '1rem', fontSize: '0.83rem', color: 'var(--dim)' }}>
            Ab CHF 15/Mt. · Jederzeit kündbar · 🇨🇭 Schweizer Server
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>
            © 2026 <a href="https://openclaw-consulting.ch">openclaw-consulting.ch</a> ·{' '}
            <a href="/datenschutz">Datenschutz</a> ·{' '}
            <a href="/impressum">Impressum</a> ·{' '}
            <a href="/agb">AGB</a> ·{' '}
            <a href="/ueber-uns">Über uns</a>
          </p>
        </div>
      </footer>
    </>
  )
}
