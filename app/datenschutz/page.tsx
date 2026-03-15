import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – OpenClaw Hosting',
  robots: { index: false, follow: false },
}

export default function Datenschutz() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: 'var(--ink)', lineHeight: 1.7 }}>
        <Link href="/" style={{ color: 'var(--green)', fontSize: '0.9rem', textDecoration: 'none' }}>← Zurück</Link>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', margin: '1.5rem 0 2rem' }}>Datenschutzerklärung</h1>

        <p style={{ color: 'var(--slate)', marginBottom: '2rem' }}>
          Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie darüber, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.
        </p>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>1. Verantwortliche Stelle</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
          Alexandra Gosteli Digital Solutions<br />
          Truttikon, Schweiz<br />
          E-Mail: <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
        </p>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>2. Erhobene Daten und Verwendungszweck</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1rem' }}>Wir erheben folgende Daten:</p>
        <ul style={{ color: 'var(--slate)', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Kontaktdaten</strong> (Name, E-Mail): zur Kommunikation und Vertragsabwicklung</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Onboarding-Daten</strong> (Telegram-Bot-Token, KI-API-Schlüssel): ausschliesslich zur Einrichtung Ihres persönlichen Servers. Diese Daten werden nach der Einrichtung nicht bei uns gespeichert.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Zahlungsdaten</strong>: werden über Payrexx verarbeitet. Wir erhalten keine Kreditkartendaten.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Server-Logs</strong>: IP-Adresse, Zeitstempel, aufgerufene Seiten (technisch notwendig, 30 Tage gespeichert)</li>
        </ul>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>3. API-Schlüssel und Telegram-Token</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
          Ihr KI-API-Schlüssel (Anthropic, OpenAI, Google) und Ihr Telegram-Bot-Token werden ausschliesslich zur Einrichtung Ihres Servers verwendet und dort gespeichert. Wir haben nach der Einrichtung keinen aktiven Zugriff auf diese Daten. Ihre Chat-Verläufe sind technisch nicht für uns einsehbar.
        </p>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>4. Serverstandort und Datenhaltung</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
          Ihre OpenClaw-Instanz läuft auf einem Server in der Schweiz. Die Verarbeitung personenbezogener Daten erfolgt im Einklang mit dem Schweizer Datenschutzgesetz (DSG/nDSG) sowie der EU-Datenschutz-Grundverordnung (DSGVO).
        </p>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>5. Weitergabe an Dritte</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1rem' }}>Wir geben Ihre Daten nicht an Dritte weiter, ausser:</p>
        <ul style={{ color: 'var(--slate)', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Payrexx AG</strong> (Schweiz): Zahlungsabwicklung</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Infomaniak Network SA</strong> (Schweiz): Server-Hosting</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Resend Inc.</strong>: E-Mail-Versand (Bestätigungen)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Vercel Inc.</strong>: Website-Hosting (diese Website)</li>
        </ul>
        <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
          Mit allen Dienstleistern bestehen Auftragsverarbeitungsverträge oder gleichwertige Schutzvereinbarungen.
        </p>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>6. Ihre Rechte</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1rem' }}>Sie haben das Recht auf:</p>
        <ul style={{ color: 'var(--slate)', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li>Auskunft über Ihre gespeicherten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten (sofern keine gesetzliche Aufbewahrungspflicht besteht)</li>
          <li>Widerspruch gegen die Verarbeitung</li>
          <li>Datenportabilität</li>
        </ul>
        <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
          Für Anfragen wenden Sie sich an: <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
        </p>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>7. Cookies und Tracking</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
          Diese Website verwendet keine Marketing-Cookies. Es werden ausschliesslich technisch notwendige Funktionen eingesetzt. Wir verwenden Google Tag Manager zur Analyse der Website-Nutzung in anonymisierter Form.
        </p>

        <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>8. Änderungen</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>
          Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die aktuelle Version ist stets auf dieser Seite abrufbar.
        </p>

        <p style={{ color: 'var(--slate)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          Stand: März 2026
        </p>
      </div>
    </main>
  )
}
