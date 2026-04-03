import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Agent für KMU — 5 Praxis-Beispiele | OpenClaw Hosting',
  description: 'Wie Schweizer KMU mit einem persönlichen AI-Agenten 1-2 Stunden täglich sparen: E-Mail-Triage, Terminplanung, Dokument-Erstellung, Social Media Monitoring und persönlicher Assistent.',
  alternates: {
    canonical: 'https://hosting.openclaw-consulting.ch/anwendungsfaelle',
  },
  openGraph: {
    title: 'AI Agent für KMU — 5 Praxis-Beispiele | OpenClaw Hosting',
    description: 'Wie Schweizer KMU mit einem persönlichen AI-Agenten täglich Zeit sparen.',
    url: 'https://hosting.openclaw-consulting.ch/anwendungsfaelle',
    siteName: 'OpenClaw Hosting',
    locale: 'de_CH',
    type: 'article',
  },
}

const useCases = [
  {
    number: '01',
    icon: '📧',
    title: 'Automatische E-Mail-Triage',
    problem: 'Das Problem: Der Arbeitsmorgen beginnt mit 40 neuen E-Mails. Newsletter, interne Updates, Kundenanfragen, Spam — alles gemischt. Bis man das Wichtige gefunden und priorisiert hat, vergehen 45–90 Minuten.',
    solution: 'Die Lösung: Der AI-Agent liest jede eingehende E-Mail, kategorisiert sie (dringend / kann warten / Newsletter / Spam), erstellt für wichtige Mails einen Entwurf und liefert jeden Morgen um 8:00 Uhr ein kompaktes Briefing direkt in Telegram.',
    benefit: 'Das Ergebnis: Statt 90 Minuten im Postfach zu verbringen, brauchen Sie noch 10 Minuten, um die vorgeschlagenen Antworten zu überprüfen und abzuschicken. 1–2 Stunden täglich zurückgewonnen — ohne eine einzige wichtige Mail zu verpassen.',
    example: '"Welche E-Mails brauchen heute meine Antwort?" → Assistent listet 3 priorisierte Mails mit vorgeschlagenen Antwort-Entwürfen.',
  },
  {
    number: '02',
    icon: '📅',
    title: 'Terminplanung & Kalender-Management',
    problem: 'Das Problem: «Haben Sie nächste Woche Zeit?» — «Dienstag passt mir, Mittwoch auch, ausser nachmittags...» — «Mittwochmorgen wäre bei mir...» — dieses E-Mail-Ping-Pong für einen einzigen Termin kostet leicht 20 Minuten und mehrere Tage.',
    solution: 'Die Lösung: Der Assistent prüft Ihren Kalender in Echtzeit, erkennt freie Zeitfenster, schlägt drei konkrete Optionen vor und kann bei Bedarf eine Kalendereinladung direkt verschicken. Er kennt Ihre Präferenzen — z.B. keine Meetings vor 9:00 oder nach 17:00.',
    benefit: 'Das Ergebnis: Terminkoordination dauert noch 30 Sekunden. Kein Hin-und-Her mehr. Der Assistent erledigt die gesamte Koordination und sendet automatisch Erinnerungen 30 Minuten vor jedem Meeting.',
    example: '"Buche ein 30-Minuten-Meeting mit Stefan nächste Woche, möglichst vormittags." → Assistent prüft beide Kalender, schlägt drei Slots vor.',
  },
  {
    number: '03',
    icon: '📄',
    title: 'Dokument-Erstellung',
    problem: 'Das Problem: Jedes neue Angebot, jeder neue Vertrag — wieder bei null anfangen, Formatierung, Nummerierung, Paragraphen. OR-konforme Verträge, korrekte Rechnungen mit MWST-Angaben, Berichte im Corporate Design. Was einmal konfiguriert sein sollte, frisst wöchentlich Stunden.',
    solution: 'Die Lösung: Der AI-Agent arbeitet mit Ihren Vorlagen. Sie geben die Eckdaten per Textnachricht durch — Kunde, Leistung, Betrag, Datum — und erhalten innerhalb von Sekunden ein fertig ausgefülltes Dokument, das allen gesetzlichen Anforderungen entspricht.',
    benefit: 'Das Ergebnis: Ein Angebot in 2 Minuten statt 20 Minuten. Kein Formatierungsfehler, keine fehlende Pflichtangabe. Swiss OR-konform, MWST-korrekt, mit Ihrer Signatur. Einfach ausdrucken oder direkt als PDF versenden.',
    example: '"Erstelle ein Angebot für Kunde Müller AG, Webdesign-Projekt, CHF 4\'500, gültig 30 Tage." → Fertig ausgefülltes PDF in 15 Sekunden.',
  },
  {
    number: '04',
    icon: '📊',
    title: 'Social Media Monitoring',
    problem: 'Das Problem: Wer erwähnt Ihr Unternehmen? Was macht der Mitbewerb? Welche Branchentrends werden gerade diskutiert? Manuell mehrere Plattformen täglich zu monitoren ist unrealistisch — und bezahlte Tools kosten CHF 200–500 pro Monat.',
    solution: 'Die Lösung: Der Assistent überwacht täglich Ihre definierten Suchbegriffe, Marken und Mitbewerber quer durch das Web. Jeden Morgen erhalten Sie ein kompaktes Briefing: neue Erwähnungen, relevante Branchennews, Trends aus Ihrem Markt — alles in Telegram.',
    benefit: 'Das Ergebnis: Sie sind immer informiert, ohne aktiv suchen zu müssen. Reagieren Sie auf Erwähnungen schnell. Entdecken Sie Chancen früher als die Konkurrenz. Alles inklusive — kein separates Tool, kein separates Abo.',
    example: '"Was wurde diese Woche über [Ihre Branche] und [Mitbewerber XY] geschrieben?" → Tagesbriefing mit den wichtigsten Erwähnungen und Links.',
  },
  {
    number: '05',
    icon: '🧠',
    title: 'Persönlicher Assistent',
    problem: 'Das Problem: Kleine Anfragen, die zusammen viel Zeit fressen — einen Flug recherchieren, eine Adresse heraussuchen, eine Zusammenfassung eines langen Dokuments lesen, eine Übersetzung machen, eine Erinnerung setzen. Jede für sich klein, zusammen täglich 30–60 Minuten.',
    solution: 'Die Lösung: Genau wie ein Chief of Staff erledigt der Assistent all diese Aufgaben per Sprachnachricht oder Text — rund um die Uhr, in Sekunden. Er liest PDFs, fasst YouTube-Videos zusammen, übersetzt Texte, setzt Erinnerungen, antwortet auf Sprachnachrichten.',
    benefit: 'Das Ergebnis: Ein persönlicher Assistent, der immer verfügbar ist — ohne Personalkosten, ohne Urlaubsvertretung. Diktieren Sie Aufgaben unterwegs, erhalten Sie strukturierte Antworten auf Ihrem Smartphone. Das Gefühl, einen erfahrenen Assistenten zu haben, der nie schläft.',
    example: '"[Sprachnachricht] Fasse mir diesen Vertrag auf 5 Punkte zusammen und übersetze ihn auf Englisch." → Antwort in unter 30 Sekunden.',
  },
]

const faqItems = [
  {
    q: 'Was genau macht ein AI-Agent für mein Unternehmen?',
    a: 'Ein AI-Agent wie OpenClaw verbindet sich mit Ihren bestehenden Tools — E-Mail, Kalender, Dokumente — und erledigt wiederkehrende Aufgaben automatisch oder auf Anfrage. Anders als ein Chatbot arbeitet er proaktiv: er sendet morgens ein Briefing, überwacht Ihren Posteingang und erinnert Sie an Termine, ohne dass Sie ihn jedes Mal fragen müssen.',
  },
  {
    q: 'Brauche ich technisches Wissen, um einen AI-Agenten einzurichten?',
    a: 'Nein. Mit OpenClaw Hosting richten wir alles für Sie ein — in etwa 30 Minuten. Sie füllen ein Formular aus, teilen uns Ihren Messenger-Zugang (Telegram oder Discord) und Ihren API-Schlüssel mit, und wir erledigen den Rest. Kein Terminal, kein SSH, keine Konfigurationsdateien.',
  },
  {
    q: 'Wie sicher sind meine Geschäftsdaten?',
    a: 'Sehr sicher. Ihr AI-Agent läuft auf einem privaten, isolierten Server in der Schweiz — ausschliesslich für Sie. Ihre Daten verlassen nie diesen Server, werden nicht für KI-Training verwendet und sind DSGVO- sowie nDSG-konform gespeichert. Sie haben die vollständige Kontrolle.',
  },
  {
    q: 'Was kostet ein AI-Agent pro Monat wirklich?',
    a: 'OpenClaw Hosting kostet ab CHF 15/Monat für den Server-Betrieb in der Schweiz. Dazu kommt Ihr eigener API-Schlüssel bei Anthropic, OpenAI oder Google — typisch CHF 5–20/Monat je nach Nutzungsintensität. Gesamtkosten: CHF 20–79/Monat. Im Vergleich zu 1–2 Stunden Zeitersparnis täglich ist das ein ausserordentlich gutes Preis-Leistungs-Verhältnis.',
  },
]

export default function AnwendungsfaellePage() {
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
            <a href="/anwendungsfaelle" style={{ color: 'var(--green)', fontWeight: 700 }}>Anwendungsfälle</a>
            <a href="/faq">FAQ</a>
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
            mainEntity: faqItems.map((item) => ({
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

      {/* JSON-LD: Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'AI Agent für KMU — 5 Praxis-Beispiele',
            description: 'Wie Schweizer KMU mit einem persönlichen AI-Agenten täglich Zeit sparen: 5 konkrete Anwendungsfälle mit Problem, Lösung und messbarem Nutzen.',
            url: 'https://hosting.openclaw-consulting.ch/anwendungsfaelle',
            publisher: {
              '@type': 'Organization',
              name: 'OpenClaw Consulting',
              url: 'https://openclaw-consulting.ch',
            },
            inLanguage: 'de-CH',
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
          <div className="section-label">Anwendungsfälle</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, color: 'var(--ink)', marginBottom: '1.25rem' }}>
            AI Agent für KMU —<br />
            <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>5 Praxis-Beispiele</em>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--slate)', maxWidth: '640px', lineHeight: 1.7, marginBottom: '2rem' }}>
            Ein persönlicher AI-Assistent ist kein Science-Fiction mehr. Schweizer KMU, Selbstständige und Freelancer sparen heute 1–2 Stunden täglich — mit konkreten Aufgaben, nicht mit Hype. Hier sind fünf reale Beispiele.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="/#pricing" className="btn-primary">Jetzt starten — ab CHF 15/Mt.</a>
            <a href="/faq" className="btn-ghost">Häufige Fragen</a>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {useCases.map((uc, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  boxShadow: '0 2px 12px rgba(15,23,20,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '2rem',
                    lineHeight: 1,
                    background: 'var(--light)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    flexShrink: 0,
                  }}>
                    {uc.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Beispiel {uc.number}
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', fontWeight: 800, color: 'var(--ink)', marginTop: '0.25rem', lineHeight: 1.2 }}>
                      {uc.title}
                    </h2>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem 1.1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#dc2626', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      🔴 Das Problem
                    </div>
                    <p style={{ color: 'var(--slate)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>{uc.problem}</p>
                  </div>
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem 1.1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#2563eb', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      🔵 Die Lösung
                    </div>
                    <p style={{ color: 'var(--slate)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>{uc.solution}</p>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem 1.1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#16a34a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      🟢 Das Ergebnis
                    </div>
                    <p style={{ color: 'var(--slate)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>{uc.benefit}</p>
                  </div>
                </div>

                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '0.85rem 1.1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  color: 'var(--slate)',
                }}>
                  💬 <em>{uc.example}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 0', background: 'var(--light)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">Häufige Fragen</div>
          <h2 className="section-h2">Was KMU über AI-Agenten wissen wollen</h2>
          <div className="faq-grid" style={{ marginTop: '2rem' }}>
            {faqItems.map((item, i) => (
              <div key={i} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
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
            Oder direkt per E-Mail: support@openclaw-consulting.ch
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
