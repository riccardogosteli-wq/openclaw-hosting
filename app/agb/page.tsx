'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F1714', marginBottom: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #E4EDE9' }}>{title}</h2>
    {children}
  </div>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '0.85rem', fontSize: '0.93rem' }}>{children}</p>
)
const UL = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.85rem' }}>
    {items.map((item, i) => (
      <li key={i} style={{ color: '#4B5563', lineHeight: 1.75, fontSize: '0.93rem', marginBottom: '0.3rem' }}>{item}</li>
    ))}
  </ul>
)

export default function AgbPage() {
  const [lang, setLang] = useState<'de'|'en'>('de')
  useEffect(() => { setLang((localStorage.getItem('lang') as 'de'|'en') || 'de') }, [])

  const de = lang === 'de'

  return (
    <main style={{ background: '#fff', minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
        <Link href="/" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none' }}>{de ? '← Zurück' : '← Back'}</Link>

        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', margin: '1.5rem 0 0.5rem', color: '#0F1714' }}>
          {de ? 'Allgemeine Geschäftsbedingungen (AGB)' : 'Terms and Conditions'}
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '2rem' }}>{de ? 'Stand: März 2026' : 'Last updated: March 2026'}</p>

        <Section title={de ? '1. Geltungsbereich und Vertragsparteien' : '1. Scope and Parties'}>
          <P>{de ? 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen' : 'These Terms and Conditions apply to all contracts between'}</P>
          <P>OpenClaw Hosting (openclaw-consulting.ch)<br />Alexandra Gosteli Digital Solutions, Truttikon, {de ? 'Schweiz' : 'Switzerland'}<br />E-Mail: support@openclaw-consulting.ch</P>
          <P>{de ? 'und Kunden, die den Dienst OpenClaw Hosting nutzen (nachfolgend „Kunde"). Abweichende Bedingungen des Kunden werden nicht anerkannt, sofern nicht ausdrücklich schriftlich vereinbart.' : 'and customers using the OpenClaw Hosting service (hereinafter "Customer"). Deviating conditions of the Customer are not recognized unless expressly agreed in writing.'}</P>
        </Section>

        <Section title={de ? '2. Leistungsbeschreibung' : '2. Services'}>
          <P>{de ? 'OpenClaw Hosting stellt dem Kunden einen verwalteten, privaten Cloud-Server in der Schweiz zur Verfügung, auf dem die Open-Source-Software OpenClaw vorinstalliert und betriebsbereit eingerichtet wird. Die Leistung umfasst:' : 'OpenClaw Hosting provides the Customer with a managed, private cloud server in Switzerland with the open-source software OpenClaw pre-installed and configured. The service includes:'}</P>
          <UL items={de ? [
            'Bereitstellung und Verwaltung eines dedizierten virtuellen Servers (Infomaniak, Genf, Schweiz)',
            'Vorinstallation und Konfiguration der OpenClaw-Software',
            'Automatische Updates und Sicherheits-Patches der verwalteten Umgebung',
            'Tägliche automatische Backups der Instanzdaten',
            'Technischer Support per E-Mail',
            'Persönliches Dashboard (Pro- und Business-Plan)',
          ] : [
            'Provision and management of a dedicated virtual server (Infomaniak, Geneva, Switzerland)',
            'Pre-installation and configuration of OpenClaw software',
            'Automatic updates and security patches of the managed environment',
            'Daily automatic backups of instance data',
            'Technical support by email',
            'Personal dashboard (Pro and Business plans)',
          ]} />
          <P>{de ? 'Der Anbieter übernimmt keine Verantwortung für Inhalte, Konfigurationen oder Drittanbieter-Integrationen, die der Kunde auf seiner Instanz betreibt.' : 'The provider accepts no responsibility for content, configurations, or third-party integrations operated by the Customer on their instance.'}</P>
        </Section>

        <Section title={de ? '3. Vertragsschluss und Onboarding' : '3. Contract Formation and Onboarding'}>
          <P>{de ? 'Der Vertrag kommt zustande mit erfolgreicher Zahlung durch den Kunden und schriftlicher Bestätigung durch den Anbieter per E-Mail. Nach Zahlung füllt der Kunde das Onboarding-Formular aus. Der Anbieter richtet die Instanz in der Regel innerhalb weniger Stunden ein.' : 'The contract is concluded upon successful payment by the Customer and written confirmation by email from the provider. After payment, the Customer completes the onboarding form. The provider sets up the instance typically within a few hours.'}</P>
          <P>{de ? 'Der Kunde ist verantwortlich für die Bereitstellung korrekter Onboarding-Daten.' : 'The Customer is responsible for providing accurate onboarding data.'}</P>
        </Section>

        <Section title={de ? '4. Preise und Abrechnung' : '4. Pricing and Billing'}>
          <P>{de ? 'Alle Preise in CHF inkl. MwSt. (falls anwendbar):' : 'All prices in CHF incl. VAT (if applicable):'}</P>
          <UL items={[
            `Starter: CHF 19/${de?'Monat':'month'} · CHF 180/${de?'Jahr':'year'}`,
            `Pro: CHF 34/${de?'Monat':'month'} · CHF 320/${de?'Jahr':'year'}`,
            `Business: CHF 59/${de?'Monat':'month'} · CHF 560/${de?'Jahr':'year'}`,
          ]} />
          <P>{de ? 'Monatliches Abo: Abrechnung monatlich im Voraus, automatische Verlängerung. Jahresabo: Abrechnung im Voraus, automatische Verlängerung um ein weiteres Jahr.' : 'Monthly subscription: billed monthly in advance, auto-renews. Annual subscription: billed upfront, auto-renews for another year.'}</P>
          <P>{de ? 'Zahlungen werden via Payrexx (TWINT, Visa, Mastercard) verarbeitet.' : 'Payments are processed via Payrexx (TWINT, Visa, Mastercard).'}</P>
        </Section>

        <Section title={de ? '5. Kündigung und Rückerstattung' : '5. Cancellation and Refunds'}>
          <P>{de ? 'Kündigung jederzeit per E-Mail an support@openclaw-consulting.ch. Die Instanz bleibt bis zum Ende der bezahlten Periode aktiv. Keine Rückerstattungen für laufende Perioden.' : 'Cancellation at any time by email to support@openclaw-consulting.ch. The instance remains active until the end of the paid period. No refunds for current periods.'}</P>
          <P>{de ? 'Der Anbieter kann das Vertragsverhältnis bei schwerwiegenden Verstössen gegen diese AGB mit sofortiger Wirkung kündigen.' : 'The provider may terminate the contract with immediate effect in case of serious violations of these Terms.'}</P>
        </Section>

        <Section title={de ? '6. Datenlöschung nach Kündigung' : '6. Data Deletion after Cancellation'}>
          <P>{de ? 'Nach Kündigung und Ablauf der bezahlten Periode wird die Serverinstanz deaktiviert und die Daten werden innerhalb von 48 Stunden gelöscht. Der Kunde ist selbst verantwortlich für die Sicherung seiner Daten vor Kündigung.' : 'After cancellation and expiry of the paid period, the server instance is deactivated and data is deleted within 48 hours. The Customer is responsible for backing up their data before cancellation.'}</P>
        </Section>

        <Section title={de ? '7. Nutzungsbedingungen' : '7. Acceptable Use'}>
          <P>{de ? 'Der Kunde verpflichtet sich, den Dienst ausschliesslich für rechtmässige Zwecke zu nutzen. Verboten ist insbesondere:' : 'The Customer agrees to use the service only for lawful purposes. Prohibited uses include:'}</P>
          <UL items={de ? [
            'Verstoss gegen anwendbares Schweizer Recht oder internationale Gesetze',
            'Versenden von unerwünschten Massen-E-Mails (Spam) oder Phishing-Aktivitäten',
            'Kryptowährungs-Mining oder andere ressourcenintensive Aktivitäten',
            'Verteilung von Malware, Viren oder schädlichem Code',
            'Nutzung für Denial-of-Service-Angriffe',
            'Weiterverkauf oder Weitervermietung des Dienstes ohne ausdrückliche schriftliche Genehmigung',
          ] : [
            'Violation of applicable Swiss law or international laws',
            'Sending unsolicited bulk emails (spam) or phishing activities',
            'Cryptocurrency mining or other resource-intensive activities',
            'Distribution of malware, viruses, or harmful code',
            'Use for denial-of-service attacks',
            'Resale or subletting of the service without express written permission',
          ]} />
        </Section>

        <Section title={de ? '8. SSH-Serverzugang' : '8. SSH Server Access'}>
          <P>{de ? 'Jeder Kunde erhält nach Einrichtung einen persönlichen SSH-Schlüssel per E-Mail. Der Anbieter behält sich jederzeit einen administrativen SSH-Zugang für Wartungsarbeiten vor.' : 'Each Customer receives a personal SSH key by email after setup. The provider retains administrative SSH access at all times for maintenance purposes.'}</P>
        </Section>

        <Section title={de ? '9. Verfügbarkeit' : '9. Availability'}>
          <P>{de ? 'Der Anbieter strebt eine Betriebszeit von 99 % an, ohne Garantie für ununterbrochene Verfügbarkeit. Für Ausfälle beim Infrastrukturanbieter (Infomaniak) übernimmt der Anbieter keine Haftung.' : 'The provider aims for 99% uptime without guaranteeing uninterrupted availability. The provider accepts no liability for outages at the infrastructure provider (Infomaniak).'}</P>
        </Section>

        <Section title={de ? '10. Datenschutz' : '10. Privacy'}>
          <P>{de ? 'Die Verarbeitung personenbezogener Daten erfolgt gemäss unserer Datenschutzerklärung sowie dem Schweizer DSG/nDSG und der DSGVO. API-Schlüssel und Tokens des Kunden werden ausschliesslich auf dem privaten Server des Kunden gespeichert.' : 'Personal data is processed in accordance with our Privacy Policy and Swiss DSG/nDSG and GDPR. API keys and tokens are stored exclusively on the Customer\'s private server.'}</P>
        </Section>

        <Section title={de ? '11. Haftungsbeschränkung' : '11. Limitation of Liability'}>
          <P>{de ? 'Der Anbieter haftet nur für grobe Fahrlässigkeit oder Vorsatz. Die Gesamthaftung ist auf den vom Kunden in den letzten 12 Monaten bezahlten Betrag begrenzt.' : 'The provider is only liable for gross negligence or wilful misconduct. Total liability is limited to the amount paid by the Customer in the last 12 months.'}</P>
        </Section>

        <Section title={de ? '12. Schlussbestimmungen' : '12. Final Provisions'}>
          <P>{de ? 'Es gilt Schweizer Recht. Gerichtsstand ist Zürich, Schweiz. Der Anbieter behält sich vor, diese AGB jederzeit anzupassen. Kunden werden über wesentliche Änderungen per E-Mail informiert.' : 'Swiss law applies. Place of jurisdiction is Zurich, Switzerland. The provider reserves the right to amend these Terms at any time. Customers will be notified of material changes by email.'}</P>
        </Section>

        <Section title={de ? '13. Kontakt' : '13. Contact'}>
          <P>{de ? 'Bei Fragen:' : 'For questions:'}</P>
          <P>OpenClaw Hosting · <a href="mailto:support@openclaw-consulting.ch" style={{ color: '#12A878' }}>support@openclaw-consulting.ch</a></P>
        </Section>

        <p style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '3rem', borderTop: '1px solid #E4EDE9', paddingTop: '1rem' }}>
          {de ? 'Stand: März 2026 · Schweizer Recht · Gerichtsstand Zürich' : 'March 2026 · Swiss Law · Jurisdiction: Zurich'}
        </p>
      </div>
    </main>
  )
}
