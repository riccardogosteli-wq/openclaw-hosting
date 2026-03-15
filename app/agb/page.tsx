import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen – OpenClaw Hosting',
  robots: { index: true, follow: true },
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F1714', marginBottom: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #E4EDE9' }}>{title}</h2>
    {children}
  </div>
)

const p = (text: string) => (
  <p style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '0.85rem', fontSize: '0.93rem' }}>{text}</p>
)

const ul = (items: string[]) => (
  <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.85rem' }}>
    {items.map((item, i) => (
      <li key={i} style={{ color: '#4B5563', lineHeight: 1.75, fontSize: '0.93rem', marginBottom: '0.3rem' }}>{item}</li>
    ))}
  </ul>
)

export default function AgbPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
        <Link href="/" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none' }}>← Zurück</Link>

        <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', margin: '1.5rem 0 0.5rem', color: '#0F1714' }}>
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '2rem' }}>Stand: März 2026</p>

        <Section title="1. Geltungsbereich und Vertragsparteien">
          {p('Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen')}
          {p('OpenClaw Hosting (Anbieter im Rahmen von openclaw-consulting.ch)\nAlexandra Gosteli Digital Solutions, Truttikon, Schweiz\nE-Mail: support@openclaw-consulting.ch')}
          {p('und Kunden, die den Dienst OpenClaw Hosting nutzen (nachfolgend „Kunde"). Abweichende Bedingungen des Kunden werden nicht anerkannt, sofern nicht ausdrücklich schriftlich vereinbart.')}
        </Section>

        <Section title="2. Leistungsbeschreibung">
          {p('OpenClaw Hosting stellt dem Kunden einen verwalteten, privaten Cloud-Server in der Schweiz zur Verfügung, auf dem die Open-Source-Software OpenClaw vorinstalliert und betriebsbereit eingerichtet wird. Die Leistung umfasst:')}
          {ul([
            'Bereitstellung und Verwaltung eines dedizierten virtuellen Servers (Infomaniak, Genf, Schweiz)',
            'Vorinstallation und Konfiguration der OpenClaw-Software',
            'Automatische Updates und Sicherheits-Patches der verwalteten Umgebung',
            'Tägliche automatische Backups der Instanzdaten',
            'Technischer Support per E-Mail',
            'Persönliches Dashboard (Pro- und Business-Plan)',
          ])}
          {p('Der Anbieter übernimmt keine Verantwortung für Inhalte, Konfigurationen oder Drittanbieter-Integrationen, die der Kunde auf seiner Instanz betreibt. OpenClaw ist Open-Source-Software und unterliegt eigenen Lizenzbestimmungen.')}
        </Section>

        <Section title="3. Vertragsschluss und Onboarding">
          {p('Der Vertrag kommt zustande mit erfolgreicher Zahlung durch den Kunden und schriftlicher Bestätigung durch den Anbieter per E-Mail. Nach Zahlung füllt der Kunde das Onboarding-Formular aus. Der Anbieter richtet die Instanz innerhalb von 24 Stunden ein.')}
          {p('Der Kunde ist verantwortlich für die Bereitstellung korrekter Onboarding-Daten (Telegram-Bot-Token, API-Schlüssel, Telegram-Benutzer-ID).')}
        </Section>

        <Section title="4. Preise und Abrechnung">
          {p('Die aktuellen Preise sind auf der Website hosting.openclaw-consulting.ch einsehbar. Alle Preise sind in CHF angegeben und verstehen sich inklusive Mehrwertsteuer (falls anwendbar).')}
          <p style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '0.85rem', fontSize: '0.93rem' }}><strong>Monatliches Abo:</strong> Abrechnung monatlich im Voraus. Das Abo verlängert sich automatisch, sofern es nicht rechtzeitig gekündigt wird.</p>
          <p style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '0.85rem', fontSize: '0.93rem' }}><strong>Jahresabo:</strong> Abrechnung des Jahresbetrags im Voraus. Das Abo verlängert sich automatisch um ein weiteres Jahr, sofern es nicht rechtzeitig gekündigt wird. Der Jahresdiscount ist für die Dauer des bezahlten Zeitraums garantiert.</p>
          {p('Zahlungen werden via Payrexx (TWINT, Visa, Mastercard) verarbeitet. Der Anbieter speichert keine Zahlungsdaten des Kunden.')}
        </Section>

        <Section title="5. Kündigung und Rückerstattung">
          <p style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '0.85rem', fontSize: '0.93rem' }}><strong>Monatliches Abo:</strong> Der Kunde kann jederzeit per E-Mail an support@openclaw-consulting.ch kündigen. Die Instanz bleibt bis zum Ende der bezahlten Periode aktiv. Es werden keine anteiligen Rückerstattungen für den laufenden Monat gewährt, sofern nicht gesetzlich vorgeschrieben.</p>
          <p style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '0.85rem', fontSize: '0.93rem' }}><strong>Jahresabo:</strong> Das Jahresabo kann jederzeit per E-Mail gekündigt werden. Die Instanz bleibt bis zum Ende der bezahlten Jahresperiode aktiv. Es werden keine Rückerstattungen für die verbleibende Laufzeit gewährt. Der Jahresdiscount ist für den bezahlten Zeitraum garantiert.</p>
          {p('Der Anbieter kann das Vertragsverhältnis bei schwerwiegenden Verstössen gegen diese AGB mit sofortiger Wirkung kündigen.')}
        </Section>

        <Section title="6. Datenlöschung nach Kündigung">
          {p('Nach Kündigung und Ablauf der bezahlten Periode wird die Serverinstanz deaktiviert und die Daten werden innerhalb von 48 Stunden gelöscht. Der Kunde ist selbst verantwortlich für die Sicherung seiner Daten vor Kündigung. Eine Wiederherstellung nach Löschung ist nicht möglich.')}
        </Section>

        <Section title="7. Nutzungsbedingungen (Acceptable Use)">
          {p('Der Kunde verpflichtet sich, den Dienst ausschliesslich für rechtmässige Zwecke zu nutzen. Verboten ist insbesondere:')}
          {ul([
            'Verstoss gegen anwendbares Schweizer Recht oder internationale Gesetze',
            'Versenden von unerwünschten Massen-E-Mails (Spam) oder Phishing-Aktivitäten',
            'Kryptowährungs-Mining oder andere ressourcenintensive Aktivitäten',
            'Verteilung von Malware, Viren oder schädlichem Code',
            'Nutzung für Denial-of-Service-Angriffe',
            'Weiterverkauf oder Weitervermietung des Dienstes ohne ausdrückliche schriftliche Genehmigung',
            'Speicherung oder Verarbeitung illegal erworbener oder strafbarer Inhalte',
          ])}
          {p('Bei Verstössen behält sich der Anbieter vor, die Instanz umgehend zu sperren und den Vertrag fristlos zu kündigen.')}
        </Section>

        <Section title="8. Ressourcenlimits">
          {p('Jeder Tarif beinhaltet die auf der Website angegebenen Ressourcen (vCPU, RAM, Speicher). Bei dauerhafter Überschreitung der Ressourcenlimits kann der Anbieter den Kunden zur Umstiegsmöglichkeit in einen höheren Tarif auffordern oder die Instanz vorübergehend drosseln.')}
        </Section>

        <Section title="9. Verfügbarkeit und Wartung">
          {p('Der Anbieter bemüht sich um eine hohe Verfügbarkeit und strebt eine Betriebszeit von 99 % an. Eine Garantie für ununterbrochene Verfügbarkeit wird nicht übernommen. Geplante Wartungsfenster werden nach Möglichkeit im Voraus angekündigt.')}
          {p('Für Ausfälle beim Infrastrukturanbieter (Infomaniak) übernimmt der Anbieter keine Haftung.')}
        </Section>

        <Section title="10. Datenschutz">
          {p('Die Verarbeitung personenbezogener Daten erfolgt gemäss unserer Datenschutzerklärung unter hosting.openclaw-consulting.ch/datenschutz sowie in Übereinstimmung mit dem Schweizer Datenschutzgesetz (DSG/nDSG) und der DSGVO.')}
          {p('API-Schlüssel und Telegram-Tokens des Kunden werden nicht beim Anbieter gespeichert, sondern ausschliesslich auf dem privaten Server des Kunden.')}
        </Section>

        <Section title="11. Geistiges Eigentum">
          {p('Die Plattform, Marke und propriäre Werkzeuge des Anbieters sind urheberrechtlich geschützt. OpenClaw und andere eingesetzte Open-Source-Komponenten unterliegen ihren jeweiligen Open-Source-Lizenzen, die durch diese AGB nicht eingeschränkt werden.')}
          {p('Der Kunde behält sämtliche Rechte an den Daten und Konfigurationen, die er auf seiner Instanz erstellt oder speichert.')}
        </Section>

        <Section title="12. Haftungsbeschränkung">
          {p('Der Anbieter haftet nur für Schäden, die durch grobe Fahrlässigkeit oder Vorsatz verursacht wurden. Für leichte Fahrlässigkeit sowie für indirekte Schäden, entgangenen Gewinn oder Datenverlust wird keine Haftung übernommen, sofern dies gesetzlich zulässig ist.')}
          {p('Die Gesamthaftung des Anbieters ist auf den vom Kunden in den letzten 12 Monaten bezahlten Betrag begrenzt.')}
        </Section>

        <Section title="13. Schlussbestimmungen">
          {p('Es gilt Schweizer Recht (Obligationenrecht, OR). Gerichtsstand ist Zürich, Schweiz.')}
          {p('Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.')}
          {p('Der Anbieter behält sich vor, diese AGB jederzeit anzupassen. Kunden werden über wesentliche Änderungen per E-Mail informiert. Die jeweils aktuelle Version ist auf dieser Seite abrufbar.')}
        </Section>

        <Section title="14. Kontakt">
          {p('Bei Fragen zu diesen AGB wenden Sie sich an:')}
          <p style={{ color: '#4B5563', lineHeight: 1.75, fontSize: '0.93rem' }}>
            OpenClaw Hosting (openclaw-consulting.ch)<br />
            E-Mail: <a href="mailto:support@openclaw-consulting.ch" style={{ color: '#12A878' }}>support@openclaw-consulting.ch</a>
          </p>
        </Section>

        <p style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '3rem', borderTop: '1px solid #E4EDE9', paddingTop: '1rem' }}>
          Stand: März 2026 · Schweizer Recht · Gerichtsstand Zürich
        </p>
      </div>
    </main>
  )
}
