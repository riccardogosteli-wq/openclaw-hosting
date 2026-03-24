'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '1.1rem', margin: '2rem 0 0.5rem' }}>{children}</h2>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--slate)', marginBottom: '1.5rem' }}>{children}</p>
)

export default function Datenschutz() {
  const [lang, setLang] = useState<'de'|'en'>('de')
  useEffect(() => { setLang((localStorage.getItem('lang') as 'de'|'en') || 'de') }, [])
  const de = lang === 'de'

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: 'var(--ink)', lineHeight: 1.7 }}>
        <Link href="/" style={{ color: 'var(--green)', fontSize: '0.9rem', textDecoration: 'none' }}>{de ? '← Zurück' : '← Back'}</Link>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', margin: '1.5rem 0 2rem' }}>
          {de ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </h1>

        <P>{de
          ? 'Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie darüber, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.'
          : 'Protecting your personal data is important to us. This Privacy Policy explains what data we collect, how we use it, and what rights you have.'
        }</P>

        <H2>{de ? '1. Verantwortliche Stelle' : '1. Data Controller'}</H2>
        <P>
          Alexandra Gosteli Digital Solutions<br />
          8467 Truttikon, {de ? 'Schweiz' : 'Switzerland'}<br />
          {de ? 'E-Mail' : 'Email'}: <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
        </P>

        <H2>{de ? '2. Erhobene Daten und Verwendungszweck' : '2. Data Collected and Purpose'}</H2>
        <P>{de ? 'Wir erheben folgende Daten:' : 'We collect the following data:'}</P>
        <ul style={{ color: 'var(--slate)', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          {de ? <>
            <li style={{ marginBottom: '0.5rem' }}><strong>Kontaktdaten</strong> (Name, E-Mail): zur Kommunikation und Vertragsabwicklung</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Onboarding-Daten</strong> (Bot-Token, KI-API-Schlüssel): ausschliesslich zur Einrichtung Ihres Servers. Nicht bei uns gespeichert nach der Einrichtung.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Zahlungsdaten</strong>: werden über Payrexx verarbeitet. Wir erhalten keine Kreditkartendaten.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Server-Logs</strong>: IP-Adresse, Zeitstempel, aufgerufene Seiten (30 Tage gespeichert)</li>
          </> : <>
            <li style={{ marginBottom: '0.5rem' }}><strong>Contact data</strong> (name, email): for communication and contract processing</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Onboarding data</strong> (bot token, AI API key): solely for setting up your server. Not stored with us after setup.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Payment data</strong>: processed by Payrexx. We do not receive card data.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Server logs</strong>: IP address, timestamps, pages visited (stored 30 days)</li>
          </>}
        </ul>

        <H2>{de ? '3. API-Schlüssel und Tokens' : '3. API Keys and Tokens'}</H2>
        <P>{de
          ? 'Ihr KI-API-Schlüssel und Ihr Bot-Token werden ausschliesslich zur Einrichtung Ihres Servers verwendet und dort gespeichert. Wir haben nach der Einrichtung keinen aktiven Zugriff auf diese Daten. Ihre Chat-Verläufe sind technisch nicht für uns einsehbar.'
          : 'Your AI API key and bot token are used solely to set up your server and are stored there. We have no active access to this data after setup. Your chat history is technically not accessible to us.'
        }</P>

        <H2>{de ? '4. Serverstandort und Datenhaltung' : '4. Server Location and Data Storage'}</H2>
        <P>{de
          ? 'Ihre OpenClaw-Instanz läuft auf einem Server in der Schweiz. Die Verarbeitung personenbezogener Daten erfolgt im Einklang mit dem Schweizer DSG/nDSG sowie der EU-DSGVO.'
          : 'Your OpenClaw instance runs on a server in Switzerland. Personal data is processed in accordance with the Swiss DSG/nDSG and the EU GDPR.'
        }</P>

        <H2>{de ? '5. Weitergabe an Dritte' : '5. Third-Party Disclosure'}</H2>
        <P>{de ? 'Wir geben Ihre Daten nicht an Dritte weiter, ausser:' : 'We do not share your data with third parties, except:'}</P>
        <ul style={{ color: 'var(--slate)', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Payrexx AG</strong> ({de ? 'Schweiz' : 'Switzerland'}): {de ? 'Zahlungsabwicklung' : 'Payment processing'}</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Infomaniak Network SA</strong> ({de ? 'Schweiz' : 'Switzerland'}): {de ? 'Server-Hosting' : 'Server hosting'}</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Resend Inc.</strong>: {de ? 'E-Mail-Versand' : 'Email delivery'}</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Vercel Inc.</strong>: {de ? 'Website-Hosting' : 'Website hosting'}</li>
        </ul>

        <H2>{de ? '6. Ihre Rechte' : '6. Your Rights'}</H2>
        <P>{de ? 'Sie haben das Recht auf:' : 'You have the right to:'}</P>
        <ul style={{ color: 'var(--slate)', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          {de ? <>
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Widerspruch gegen die Verarbeitung</li>
            <li>Datenportabilität</li>
          </> : <>
            <li>Access to your stored data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Objection to processing</li>
            <li>Data portability</li>
          </>}
        </ul>
        <P>{de ? 'Für Anfragen: ' : 'For requests: '}<a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a></P>

        <H2>{de ? '7. Cookies und Tracking' : '7. Cookies and Tracking'}</H2>
        <P>{de
          ? 'Diese Website verwendet keine Marketing-Cookies. Es werden ausschliesslich technisch notwendige Funktionen eingesetzt. Wir verwenden Google Tag Manager zur Analyse der Website-Nutzung in anonymisierter Form.'
          : 'This website does not use marketing cookies. Only technically necessary functions are used. We use Google Tag Manager to analyze website usage in anonymized form.'
        }</P>

        <H2>{de ? '8. Änderungen' : '8. Changes'}</H2>
        <P>{de
          ? 'Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die aktuelle Version ist stets auf dieser Seite abrufbar.'
          : 'We reserve the right to update this Privacy Policy as needed. The current version is always available on this page.'
        }</P>

        <p style={{ color: 'var(--slate)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          {de ? 'Stand: März 2026' : 'Last updated: March 2026'}
        </p>
      </div>
    </main>
  )
}
