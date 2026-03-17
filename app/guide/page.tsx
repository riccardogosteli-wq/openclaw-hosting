'use client'
import Link from 'next/link'
import { useState } from 'react'

const substep = (n: string, children: React.ReactNode) => (
  <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
    <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>{n}</div>
    <div style={{ paddingTop: '2px' }}>{children}</div>
  </div>
)

const step = (n: string, title: string, children: React.ReactNode) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#12A878', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{n}</div>
      <h2 style={{ fontSize: '1.15rem', color: '#0F1714', fontFamily: 'Bricolage Grotesque, sans-serif' }}>{title}</h2>
    </div>
    {children}
  </div>
)

const note = (text: React.ReactNode) => (
  <div style={{ background: '#E6F7F2', border: '1px solid #b2dfd4', borderLeft: '3px solid #12A878', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#1E3329', margin: '0.75rem 0', lineHeight: 1.6 }}>
    {text}
  </div>
)

const warn = (text: React.ReactNode) => (
  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#92400e', margin: '0.75rem 0', lineHeight: 1.6 }}>
    {text}
  </div>
)

const token = (text: string) => (
  <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '6px', padding: '0.5rem 0.75rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#1E3329', margin: '0.4rem 0' }}>
    {text}
  </div>
)

export default function GuidePage() {
  const [lang, setLang] = useState<'de'|'en'>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('lang') as 'de'|'en') || 'de'
    return 'de'
  })
  const [channel, setChannel] = useState<'telegram'|'whatsapp'|'discord'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'whatsapp' || hash === 'discord' || hash === 'telegram') return hash
    }
    return 'telegram'
  })

  const de = lang === 'de'

  return (
    <main style={{ background: '#fff', minHeight: '100vh', padding: '0' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E4EDE9', padding: '0.9rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: '#0F1714', textDecoration: 'none' }}>
            OpenClaw<span style={{ color: '#12A878' }}>Hosting</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/#pricing" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>{de ? 'Preise' : 'Pricing'}</Link>
            <Link href="/skills" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Skills</Link>
            <button onClick={() => setLang(l => { const n = l === 'de' ? 'en' : 'de'; localStorage.setItem('lang', n); return n })}
              style={{ background: 'transparent', border: '1px solid #E4EDE9', color: '#4B5563', padding: '0.28rem 0.65rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
              {de ? 'EN' : 'DE'}
            </button>
            <Link href="/onboarding" style={{ background: '#12A878', color: '#fff', padding: '0.45rem 1.1rem', borderRadius: 8, fontWeight: 600, fontSize: '0.86rem', textDecoration: 'none' }}>
              {de ? 'Jetzt starten' : 'Get started'}
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem 5rem', fontFamily: 'Inter, sans-serif', color: '#0F1714' }}>

        <Link href="/onboarding" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
          ← {de ? 'Zurück zum Formular' : 'Back to form'}
        </Link>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ background: '#E6F7F2', border: '1px solid #b2dfd4', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: '#0E8F67', display: 'inline-block', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {de ? 'Setup-Anleitung' : 'Setup Guide'}
          </div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', marginBottom: '0.75rem' }}>
            {de ? 'In wenigen Schritten bereit' : 'Ready in a few steps'}
          </h1>
          <p style={{ color: '#4B5563', lineHeight: 1.7 }}>
            {de
              ? 'Wählen Sie Ihren Kanal und folgen Sie der Schritt-für-Schritt-Anleitung. Dauert insgesamt 5–10 Minuten.'
              : 'Choose your channel and follow the step-by-step guide. Takes 5–10 minutes in total.'}
          </p>
        </div>

        {/* Channel selector */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {([
            { id: 'telegram', emoji: '✈️', label: 'Telegram', badge: de ? 'Empfohlen' : 'Recommended' },
            { id: 'whatsapp', emoji: '💬', label: 'WhatsApp', badge: '' },
            { id: 'discord', emoji: '🎮', label: 'Discord', badge: '' },
          ] as const).map(ch => (
            <button key={ch.id} onClick={() => setChannel(ch.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.1rem', borderRadius: '10px', cursor: 'pointer',
                border: channel === ch.id ? '2px solid #12A878' : '2px solid #E4EDE9',
                background: channel === ch.id ? '#E6F7F2' : '#fff',
                fontWeight: 600, fontSize: '0.9rem', color: channel === ch.id ? '#0E8F67' : '#4B5563',
                transition: 'all 0.15s',
              }}>
              <span>{ch.emoji}</span>
              <span>{ch.label}</span>
              {ch.badge && <span style={{ background: '#12A878', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '99px', letterSpacing: '0.04em' }}>{ch.badge}</span>}
            </button>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '0 0 2.5rem 0' }} />

        {/* ============ TELEGRAM ============ */}
        {channel === 'telegram' && <>
          <div id="telegram" style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#4B5563', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {de
                ? 'Für Telegram brauchen Sie einen Bot-Token und Ihre persönliche Telegram-ID. Beides bekommen Sie kostenlos in ca. 5 Minuten.'
                : 'For Telegram you need a bot token and your personal Telegram ID. Both are free and take about 5 minutes to get.'}
            </p>
          </div>

          {step('1', de ? 'Telegram-Bot erstellen (mit @BotFather)' : 'Create a Telegram bot (with @BotFather)', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de
                ? 'Ihr Assistent braucht einen eigenen Telegram-Bot. Erstellen Sie ihn kostenlos in 2 Minuten mit @BotFather.'
                : 'Your assistant needs its own Telegram bot. Create one for free in 2 minutes with @BotFather.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('1a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Öffnen Sie Telegram auf Ihrem Smartphone oder Computer' : 'Open Telegram on your phone or computer'}</p>)}
              {substep('1b', <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Suchen Sie nach @BotFather oder klicken Sie hier:' : 'Search for @BotFather or click here:'}</p>
                <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0088cc', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                  🔗 {de ? '@BotFather in Telegram öffnen' : 'Open @BotFather in Telegram'}
                </a>
              </div>)}
              {substep('1c', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Senden Sie: <code style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '4px', padding: '0.1rem 0.4rem', fontFamily: 'monospace', color: '#0E8F67' }}>/newbot</code></> : <>Send the message: <code style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '4px', padding: '0.1rem 0.4rem', fontFamily: 'monospace', color: '#0E8F67' }}>/newbot</code></>}</p>)}
              {substep('1d', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Geben Sie einen <strong>Namen</strong> ein (z.B. <em>Mein Assistent</em>)</> : <>Enter a <strong>name</strong> (e.g. <em>My Assistant</em>)</>}</p>)}
              {substep('1e', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Geben Sie einen <strong>Benutzernamen</strong> ein — muss auf <em>_bot</em> enden (z.B. <em>mein_assistent_bot</em>)</> : <>Enter a <strong>username</strong> — must end in <em>_bot</em> (e.g. <em>my_assistant_bot</em>)</>}</p>)}
              {substep('1f', <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>BotFather sendet Ihnen den <strong>Token</strong>:</> : <>BotFather will send you the <strong>token</strong>:</>}</p>
                {token('1234567890:AAHzC80jPxU_tr5qQv_Y5ed...')}
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#4B5563' }}>{de ? 'Kopieren Sie diesen Token — das ist Ihr Telegram-Bot-Token.' : 'Copy this token — this is your Telegram bot token.'}</p>
              </div>)}
            </div>
            {warn(<>{de ? <><strong>⚠️ Wichtig:</strong> Teilen Sie diesen Token mit niemandem ausser OpenClaw Hosting.</> : <><strong>⚠️ Important:</strong> Never share this token with anyone except OpenClaw Hosting.</>}</>)}
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('2', de ? 'Ihre Telegram-Benutzer-ID finden' : 'Find your Telegram user ID', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de ? 'Damit Ihr Assistent nur auf Sie reagiert, brauchen wir Ihre persönliche Telegram-ID. Dauert 10 Sekunden.' : 'So your assistant only responds to you, we need your personal Telegram ID. Takes 10 seconds.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('2a', <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Suchen Sie nach @userinfobot oder klicken Sie hier:' : 'Search for @userinfobot or click here:'}</p>
                <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0088cc', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                  🔗 {de ? '@userinfobot öffnen' : 'Open @userinfobot'}
                </a>
              </div>)}
              {substep('2b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Schreiben Sie dem Bot irgendeine Nachricht (z.B. <em>Hallo</em>)</> : <>Send the bot any message (e.g. <em>Hello</em>)</>}</p>)}
              {substep('2c', <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Der Bot antwortet sofort mit Ihrer ID:' : 'The bot replies instantly with your ID:'}</p>
                <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '6px', padding: '0.6rem 0.75rem', fontSize: '0.88rem', color: '#1E3329', lineHeight: 1.6 }}>
                  👤 <strong>Your info:</strong><br />
                  Id: <strong style={{ color: '#12A878' }}>341827520</strong> ← <em style={{ color: '#4B5563' }}>{de ? 'das ist Ihre ID' : 'this is your ID'}</em><br />
                  First: Max<br />Last: Muster
                </div>
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#4B5563' }}>{de ? 'Kopieren Sie die Zahl hinter "Id:" — das ist Ihre Telegram-Benutzer-ID.' : 'Copy the number after "Id:" — that is your Telegram user ID.'}</p>
              </div>)}
            </div>
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />
        </>}

        {/* ============ WHATSAPP ============ */}
        {channel === 'whatsapp' && <>
          <div id="whatsapp" style={{ marginBottom: '2rem' }}>
            {note(<>{de
              ? <><strong>💡 Keine Business API nötig.</strong> OpenClaw nutzt WhatsApp Web — Sie scannen einfach einen QR-Code mit Ihrer bestehenden WhatsApp, genau wie bei WhatsApp Web auf dem Computer.</>
              : <><strong>💡 No Business API needed.</strong> OpenClaw uses WhatsApp Web — you simply scan a QR code with your existing WhatsApp, just like WhatsApp Web on your computer.</>
            }</>)}
            <p style={{ color: '#4B5563', lineHeight: 1.7 }}>
              {de
                ? 'Für WhatsApp brauchen Sie nur Ihre Handynummer und WhatsApp bereits installiert. Wir empfehlen eine separate Nummer für den Assistenten — aber Ihre persönliche Nummer funktioniert ebenfalls.'
                : 'For WhatsApp you only need your phone number and WhatsApp already installed. We recommend a separate number for the assistant — but your personal number works too.'}
            </p>
          </div>

          {step('1', de ? 'WhatsApp-Nummer bereithalten' : 'Have your WhatsApp number ready', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de
                ? 'Sie brauchen keine neue App oder API. Ihr Assistent verbindet sich mit Ihrer bestehenden WhatsApp-Nummer via QR-Code-Scan.'
                : 'You don\'t need a new app or API. Your assistant connects to your existing WhatsApp number via QR code scan.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('1a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Stellen Sie sicher, dass WhatsApp auf Ihrem Smartphone <strong>installiert und aktiv</strong> ist</> : <>Make sure WhatsApp is <strong>installed and active</strong> on your smartphone</>}</p>)}
              {substep('1b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Notieren Sie Ihre Handynummer im internationalen Format: <strong>+41791234567</strong></> : <>Note your phone number in international format: <strong>+41791234567</strong></>}</p>)}
              {substep('1c', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Das ist alles, was Sie für Schritt 1 brauchen — keine Tokens, keine API-Schlüssel' : 'That\'s all you need for step 1 — no tokens, no API keys'}</p>)}
            </div>
            {note(<>{de
              ? <>💡 <strong>Tipp:</strong> Für den Assistenten empfehlen wir eine separate WhatsApp-Nummer (z.B. eine günstige SIM-Karte). So bleibt Ihr persönliches WhatsApp unberührt. Ihre persönliche Nummer funktioniert aber genauso.</>
              : <>💡 <strong>Tip:</strong> We recommend a separate WhatsApp number for the assistant (e.g. a cheap SIM card). This keeps your personal WhatsApp untouched. Your personal number works just as well though.</>
            }</>)}
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('2', de ? 'QR-Code scannen (nach dem Onboarding)' : 'Scan QR code (after onboarding)', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de
                ? 'Nach dem Absenden des Onboarding-Formulars richtet unser System Ihren Server ein. Sobald er läuft, erhalten Sie einen QR-Code — den scannen Sie einmal mit WhatsApp.'
                : 'After submitting the onboarding form, our system sets up your server. Once it\'s running, you\'ll receive a QR code — scan it once with WhatsApp.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('2a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Wir senden Ihnen eine E-Mail mit einem Link zu Ihrem persönlichen Dashboard' : 'We\'ll send you an email with a link to your personal dashboard'}</p>)}
              {substep('2b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Im Dashboard navigieren Sie zu <strong>Einstellungen → WhatsApp verbinden</strong></> : <>In the dashboard navigate to <strong>Settings → Connect WhatsApp</strong></>}</p>)}
              {substep('2c', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Ein QR-Code erscheint — wie beim normalen WhatsApp Web' : 'A QR code appears — just like regular WhatsApp Web'}</p>)}
              {substep('2d', <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Öffnen Sie auf Ihrem Smartphone: <strong>WhatsApp → Verknüpfte Geräte → Gerät hinzufügen</strong></> : <>On your smartphone: <strong>WhatsApp → Linked Devices → Link a Device</strong></>}</p>
                <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.7 }}>
                  {de ? <>iPhone: <strong>WhatsApp öffnen → ⋯ (oben rechts) → Verknüpfte Geräte</strong><br />Android: <strong>WhatsApp öffnen → ⋮ (oben rechts) → Verknüpfte Geräte</strong></> : <>iPhone: <strong>Open WhatsApp → ⋯ (top right) → Linked Devices</strong><br />Android: <strong>Open WhatsApp → ⋮ (top right) → Linked Devices</strong></>}
                </div>
              </div>)}
              {substep('2e', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Scannen Sie den QR-Code im Dashboard — <strong>fertig!</strong> Die Verbindung ist sofort aktiv.</> : <>Scan the QR code in the dashboard — <strong>done!</strong> The connection is immediately active.</>}</p>)}
            </div>
            {warn(<>{de
              ? <><strong>⚠️ Hinweis:</strong> Der QR-Code ist 60 Sekunden gültig. Falls er abläuft, erscheint automatisch ein neuer. Halten Sie Ihr Smartphone bereit, bevor Sie den Dashboard-Link öffnen.</>
              : <><strong>⚠️ Note:</strong> The QR code is valid for 60 seconds. If it expires, a new one appears automatically. Have your smartphone ready before opening the dashboard link.</>
            }</>)}
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('3', de ? 'Ersten Chat starten' : 'Start your first chat', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de ? 'Nach dem QR-Scan ist Ihr Assistent direkt erreichbar.' : 'After the QR scan, your assistant is immediately reachable.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('3a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Öffnen Sie WhatsApp auf Ihrem Smartphone' : 'Open WhatsApp on your smartphone'}</p>)}
              {substep('3b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Schreiben Sie an die verknüpfte Nummer: <strong>&quot;Hallo&quot;</strong></> : <>Message the linked number: <strong>&quot;Hello&quot;</strong></>}</p>)}
              {substep('3c', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Ihr Assistent antwortet sofort — die Verbindung ist aktiv.' : 'Your assistant replies instantly — the connection is active.'}</p>)}
            </div>
            {note(<>{de ? '💡 Ihr Assistent läuft auf Ihrem eigenen Server — er ist 24/7 erreichbar, auch wenn Ihr Smartphone aus ist.' : '💡 Your assistant runs on your own server — it\'s reachable 24/7, even when your smartphone is off.'}</>)}
          </>)}
        </>}

        {/* ============ DISCORD ============ */}
        {channel === 'discord' && <>
          <div id="discord" style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#4B5563', lineHeight: 1.7 }}>
              {de
                ? 'Für Discord erstellen Sie eine eigene Bot-Applikation im Discord Developer Portal und verbinden sie mit Ihrem Server. Dauert ca. 10 Minuten.'
                : 'For Discord you create a bot application in the Discord Developer Portal and connect it to your server. Takes about 10 minutes.'}
            </p>
          </div>

          {step('1', de ? 'Discord-Bot-Applikation erstellen' : 'Create a Discord bot application', <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('1a', <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Öffnen Sie das Discord Developer Portal:' : 'Open the Discord Developer Portal:'}</p>
                <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#5865F2', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                  🔗 {de ? 'Developer Portal öffnen' : 'Open Developer Portal'}
                </a>
              </div>)}
              {substep('1b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Klicken Sie auf <strong>New Application</strong> → geben Sie einen Namen ein (z.B. <em>Mein Assistent</em>)</> : <>Click <strong>New Application</strong> → enter a name (e.g. <em>My Assistant</em>)</>}</p>)}
              {substep('1c', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Klicken Sie in der linken Seitenleiste auf <strong>Bot</strong></> : <>Click <strong>Bot</strong> in the left sidebar</>}</p>)}
              {substep('1d', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Geben Sie dem Bot einen <strong>Benutzernamen</strong> (z.B. derselbe Name wie die Applikation)</> : <>Give the bot a <strong>username</strong> (e.g. same name as the application)</>}</p>)}
            </div>
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('2', de ? 'Privilegierte Intents aktivieren' : 'Enable privileged intents', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de
                ? 'Damit der Bot Nachrichten lesen kann, müssen drei Intents auf der Bot-Seite aktiviert werden.'
                : 'For the bot to read messages, three intents need to be enabled on the Bot page.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('2a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Scrollen Sie auf der Bot-Seite hinunter zu <strong>Privileged Gateway Intents</strong></> : <>Scroll down on the Bot page to <strong>Privileged Gateway Intents</strong></>}</p>)}
              {substep('2b', <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Aktivieren Sie diese drei Einstellungen:' : 'Enable these three settings:'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {[
                    ['Message Content Intent', de ? '(erforderlich)' : '(required)'],
                    ['Server Members Intent', de ? '(empfohlen)' : '(recommended)'],
                    ['Presence Intent', de ? '(optional)' : '(optional)'],
                  ].map(([name, note]) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                      <span style={{ color: '#12A878', fontWeight: 700 }}>✓</span>
                      <strong style={{ color: '#0F1714' }}>{name}</strong>
                      <span style={{ color: '#4B5563' }}>{note}</span>
                    </div>
                  ))}
                </div>
              </div>)}
              {substep('2c', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Klicken Sie auf <strong>Save Changes</strong></> : <>Click <strong>Save Changes</strong></>}</p>)}
            </div>
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('3', de ? 'Bot-Token kopieren' : 'Copy bot token', <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('3a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Scrollen Sie auf der Bot-Seite nach oben und klicken Sie auf <strong>Reset Token</strong></> : <>Scroll back up on the Bot page and click <strong>Reset Token</strong></>}</p>)}
              {substep('3b', <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Discord zeigt Ihnen den Token — er sieht so aus:' : 'Discord shows you the token — it looks like this:'}</p>
                {token('MTE2NjE0NzUwMz.Gij25x.1-oQ0OPQ5BfbpwzO...')}
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#4B5563' }}>{de ? <>Kopieren und speichern Sie ihn sicher — <strong>er wird nur einmal angezeigt</strong>.</> : <>Copy and save it securely — <strong>it\'s only shown once</strong>.</>}</p>
              </div>)}
            </div>
            {warn(<>{de ? <><strong>⚠️ Wichtig:</strong> Der Token ist wie ein Passwort. Teilen Sie ihn nur mit OpenClaw Hosting. Klicken Sie auf &quot;Reset Token&quot; falls er versehentlich geteilt wurde.</> : <><strong>⚠️ Important:</strong> The token is like a password. Only share it with OpenClaw Hosting. Click &quot;Reset Token&quot; if it was accidentally shared.</>}</>)}
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('4', de ? 'Bot zum Server einladen' : 'Invite bot to your server', <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('4a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Klicken Sie in der linken Seitenleiste auf <strong>OAuth2</strong></> : <>Click <strong>OAuth2</strong> in the left sidebar</>}</p>)}
              {substep('4b', <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Scrollen Sie zu <strong>OAuth2 URL Generator</strong> und aktivieren Sie:</>: <>Scroll to <strong>OAuth2 URL Generator</strong> and enable:</>}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {['bot', 'applications.commands'].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                      <span style={{ color: '#12A878', fontWeight: 700 }}>✓</span><strong style={{ color: '#0F1714' }}>{s}</strong>
                    </div>
                  ))}
                </div>
              </div>)}
              {substep('4c', <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Im Abschnitt <strong>Bot Permissions</strong> aktivieren Sie:</> : <>In the <strong>Bot Permissions</strong> section enable:</>}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {[
                    ['View Channels', true],
                    ['Send Messages', true],
                    ['Read Message History', true],
                    ['Embed Links', true],
                    ['Attach Files', true],
                  ].map(([s, req]) => (
                    <div key={s as string} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                      <span style={{ color: '#12A878', fontWeight: 700 }}>✓</span>
                      <span style={{ color: '#0F1714' }}>{s as string}</span>
                    </div>
                  ))}
                </div>
              </div>)}
              {substep('4d', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Kopieren Sie die generierte URL am Ende der Seite, öffnen Sie sie im Browser, wählen Sie Ihren Server und klicken Sie <strong>Weiter</strong></> : <>Copy the generated URL at the bottom, open it in your browser, select your server and click <strong>Continue</strong></>}</p>)}
            </div>
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('5', de ? 'Server-ID und User-ID ermitteln' : 'Get your Server ID and User ID', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de ? 'Dafür müssen Sie den Entwicklermodus in Discord aktivieren.' : 'For this you need to enable Developer Mode in Discord.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('5a', <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Entwicklermodus aktivieren: <strong>Benutzereinstellungen (⚙️) → Erweitert → Entwicklermodus einschalten</strong></> : <>Enable Developer Mode: <strong>User Settings (⚙️) → Advanced → toggle on Developer Mode</strong></>}</p>
              </div>)}
              {substep('5b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Rechtsklick auf Ihr <strong>Server-Symbol</strong> in der Seitenleiste → <strong>Server-ID kopieren</strong></> : <>Right-click your <strong>server icon</strong> in the sidebar → <strong>Copy Server ID</strong></>}</p>)}
              {substep('5c', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Rechtsklick auf Ihren <strong>eigenen Avatar</strong> → <strong>Benutzer-ID kopieren</strong></> : <>Right-click your <strong>own avatar</strong> → <strong>Copy User ID</strong></>}</p>)}
              {substep('5d', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Notieren Sie beide IDs — zusammen mit dem Bot-Token aus Schritt 3 tragen Sie diese ins Onboarding-Formular ein</> : <>Note both IDs — together with the bot token from step 3, enter them in the onboarding form</>}</p>)}
            </div>
            {note(<>{de ? <>💡 IDs sind reine Zahlen, z.B.: Server-ID <strong>1472165773966311588</strong>, User-ID <strong>669929711681536010</strong></> : <>💡 IDs are pure numbers, e.g.: Server ID <strong>1472165773966311588</strong>, User ID <strong>669929711681536010</strong></>}</>)}
          </>)}

          <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

          {step('6', de ? 'DMs vom Server erlauben' : 'Allow DMs from server members', <>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {de ? 'Damit der Bot Ihnen eine Pairing-DM schicken kann, muss Discord DMs von Server-Mitgliedern erlauben.' : 'For the bot to send you a pairing DM, Discord needs to allow DMs from server members.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {substep('6a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <>Rechtsklick auf das <strong>Server-Symbol</strong> → <strong>Datenschutzeinstellungen</strong></> : <>Right-click the <strong>server icon</strong> → <strong>Privacy Settings</strong></>}</p>)}
              {substep('6b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? <><strong>Direktnachrichten</strong> aktivieren</> : <>Toggle on <strong>Direct Messages</strong></>}</p>)}
            </div>
          </>)}
        </>}

        {/* ============ SHARED: API KEY ============ */}
        <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '0 0 2.5rem 0' }} />

        {step(channel === 'telegram' ? '3' : channel === 'whatsapp' ? '4' : '7', de ? 'KI-API-Schlüssel erstellen' : 'Create AI API key', <>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            {de
              ? 'Ihr Assistent braucht Zugang zu einem KI-Modell. Zum Einstieg empfehlen wir Google Gemini Flash — kostenlos, ohne Kreditkarte, in 30 Sekunden eingerichtet.'
              : 'Your assistant needs access to an AI model. To start we recommend Google Gemini Flash — free, no credit card, set up in 30 seconds.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            {[
              { name: de ? 'Google (Gemini Flash)' : 'Google (Gemini Flash)', rec: true, badge: de ? 'GRATIS' : 'FREE', link: 'https://aistudio.google.com/app/apikey', desc: de ? 'Kostenlos · keine Kreditkarte' : 'Free · no credit card', keyFmt: 'AIzaSy...' },
              { name: 'Anthropic (Claude)', rec: false, badge: '', link: 'https://console.anthropic.com/settings/keys', desc: de ? 'Ab ~CHF 2/Mo' : 'From ~CHF 2/mo', keyFmt: 'sk-ant-...' },
              { name: 'OpenAI (GPT-4)', rec: false, badge: '', link: 'https://platform.openai.com/api-keys', desc: de ? 'Ab ~CHF 3/Mo' : 'From ~CHF 3/mo', keyFmt: 'sk-proj-...' },
            ].map(p => (
              <div key={p.name} style={{ border: `1.5px solid ${p.rec ? '#12A878' : '#E4EDE9'}`, borderRadius: '10px', padding: '1rem', position: 'relative', background: p.rec ? '#fafffe' : '#fff' }}>
                {p.rec && <div style={{ position: 'absolute', top: '-10px', left: '12px', background: '#12A878', color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.5rem', borderRadius: '99px', letterSpacing: '0.05em' }}>{p.badge}</div>}
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, fontSize: '0.88rem', color: '#0F1714' }}>{p.name}</p>
                <p style={{ margin: '0 0 0.6rem', fontSize: '0.78rem', color: '#4B5563' }}>{p.desc}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: p.rec ? '#12A878' : '#F7FAF9', color: p.rec ? '#fff' : '#0F1714', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', border: p.rec ? 'none' : '1px solid #E4EDE9' }}>
                  {de ? 'API-Key erstellen →' : 'Create API key →'}
                </a>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {substep(channel === 'telegram' ? '3a' : channel === 'whatsapp' ? '4a' : '7a', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Klicken Sie oben auf "API-Key erstellen" beim gewünschten Anbieter' : 'Click "Create API key" above for your preferred provider'}</p>)}
            {substep(channel === 'telegram' ? '3b' : channel === 'whatsapp' ? '4b' : '7b', <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Melden Sie sich an oder erstellen Sie ein Konto (bei Anthropic/OpenAI ca. 2 Minuten)' : 'Sign in or create an account (for Anthropic/OpenAI about 2 minutes)'}</p>)}
            {substep(channel === 'telegram' ? '3c' : channel === 'whatsapp' ? '4c' : '7c', <div>
              <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>{de ? 'Kopieren Sie den Schlüssel:' : 'Copy the key:'}</p>
              <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '6px', padding: '0.5rem 0.75rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#1E3329', lineHeight: 1.8 }}>
                <span style={{ color: '#4B5563', fontSize: '0.78rem' }}>Google:</span> AIzaSyXXXXXXXXXXXXXXXXXXXXXX<br />
                <span style={{ color: '#4B5563', fontSize: '0.78rem' }}>Anthropic:</span> sk-ant-oat01-XXXXXXXXX...<br />
                <span style={{ color: '#4B5563', fontSize: '0.78rem' }}>OpenAI:</span> sk-proj-XXXXXXXXXXXXXXXXX...
              </div>
            </div>)}
          </div>
        </>)}

        <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

        {/* Back to form CTA */}
        <div style={{ background: '#E6F7F2', border: '1px solid #b2dfd4', borderRadius: '12px', padding: '1.25rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F1714', marginBottom: '0.5rem' }}>
            {de ? '✅ Alles bereit?' : '✅ All ready?'}
          </p>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            {de ? 'Kehren Sie zum Formular zurück und tragen Sie Ihre Daten ein.' : 'Go back to the form and enter your details.'}
          </p>
          <Link href="/onboarding" style={{ display: 'inline-block', background: '#12A878', color: '#fff', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            {de ? 'Zurück zum Formular →' : 'Back to form →'}
          </Link>
        </div>

      </div>
    </main>
  )
}
