import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Setup-Anleitung – OpenClaw Hosting',
  description: 'Schritt-für-Schritt Anleitung: Telegram-Bot erstellen, API-Schlüssel und Ihre Telegram-ID finden.',
}

const step = (n: string, title: string, children: React.ReactNode) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#12A878', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{n}</div>
      <h2 style={{ fontSize: '1.15rem', color: '#0F1714', fontFamily: 'Bricolage Grotesque, sans-serif' }}>{title}</h2>
    </div>
    {children}
  </div>
)

const img = (src: string, alt: string, caption?: string) => (
  <div style={{ margin: '1rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E4EDE9' }}>
    <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
    {caption && <p style={{ background: '#F7FAF9', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#4B5563', margin: 0 }}>{caption}</p>}
  </div>
)

const note = (text: string) => (
  <div style={{ background: '#E6F7F2', border: '1px solid #b2dfd4', borderLeft: '3px solid #12A878', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#1E3329', margin: '0.75rem 0', lineHeight: 1.6 }}>
    {text}
  </div>
)

const code = (text: string) => (
  <code style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '5px', padding: '0.15rem 0.4rem', fontSize: '0.88rem', fontFamily: 'monospace', color: '#0E8F67' }}>{text}</code>
)

export default function GuidePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0F1714' }}>
        <Link href="/onboarding" style={{ color: '#12A878', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
          ← Zurück zum Formular
        </Link>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ background: '#E6F7F2', border: '1px solid #b2dfd4', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.78rem', fontWeight: 700, color: '#0E8F67', display: 'inline-block', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Setup-Anleitung</div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '2rem', marginBottom: '0.75rem' }}>In 3 Schritten bereit</h1>
          <p style={{ color: '#4B5563', lineHeight: 1.7 }}>Diese Anleitung zeigt Ihnen genau, wie Sie Ihren Telegram-Bot erstellen, Ihren API-Schlüssel finden und Ihre Telegram-ID herausfinden. Dauert insgesamt ca. 8 Minuten.</p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

        {/* STEP 1: Telegram Bot */}
        {step('1', 'Telegram-Bot erstellen (mit @BotFather)', <>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Ihr persönlicher Assistent braucht einen Telegram-Kanal — das ist Ihr Bot. Erstellen Sie ihn kostenlos in 2 Minuten mit @BotFather.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>1a</div>
              <div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>Öffnen Sie Telegram auf Ihrem Smartphone oder Computer</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>1b</div>
              <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>Suchen Sie nach <strong>@BotFather</strong> oder klicken Sie auf diesen Link:</p>
                <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0088cc', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                  🔗 @BotFather in Telegram öffnen
                </a>
              </div>
            </div>
          </div>

          {img('/guide/botfather.jpg', 'BotFather in Telegram', '👆 So sieht @BotFather aus — klicken Sie auf "START BOT" / "Start"')}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>1c</div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>Senden Sie die Nachricht: <code style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '4px', padding: '0.1rem 0.4rem', fontFamily: 'monospace', color: '#0E8F67' }}>/newbot</code></p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>1d</div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>Geben Sie einen <strong>Namen</strong> für Ihren Bot ein (z.B. <em>Mein Assistent</em>)</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>1e</div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>Geben Sie einen <strong>Benutzernamen</strong> ein — muss auf <em>_bot</em> enden (z.B. <em>mein_assistent_bot</em>)</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>1f</div>
              <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>BotFather sendet Ihnen jetzt den <strong>Token</strong> — eine lange Zeichenkette wie:</p>
                <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '6px', padding: '0.5rem 0.75rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#1E3329' }}>
                  1234567890:AAHzC80jPxU_tr5qQv_Y5ed...
                </div>
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#4B5563' }}>Kopieren Sie diesen Token — das ist Ihr <strong>Telegram-Bot-Token</strong> fürs Formular.</p>
              </div>
            </div>
          </div>

          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#92400e', marginTop: '1rem', lineHeight: 1.6 }}>
            ⚠️ <strong>Wichtig:</strong> Teilen Sie diesen Token mit niemandem ausser OpenClaw Hosting. Er gibt Zugang zu Ihrem Bot.
          </div>
        </>)}

        <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

        {/* STEP 2: Telegram User ID */}
        {step('2', 'Ihre Telegram-Benutzer-ID finden', <>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Damit Ihr Assistent <em>nur auf Sie</em> reagiert (und nicht auf andere), brauchen wir Ihre persönliche Telegram-ID. Das dauert 10 Sekunden.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>2a</div>
              <div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#0F1714' }}>Suchen Sie in Telegram nach <strong>@userinfobot</strong> oder klicken Sie hier:</p>
                <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0088cc', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                  🔗 @userinfobot öffnen
                </a>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>2b</div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714' }}>Schreiben Sie dem Bot irgendeine Nachricht (z.B. <em>Hallo</em>)</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>2c</div>
              <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>Der Bot antwortet sofort mit Ihrer ID, z.B.:</p>
                <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '6px', padding: '0.6rem 0.75rem', fontSize: '0.88rem', color: '#1E3329', lineHeight: 1.6 }}>
                  👤 <strong>Your info:</strong><br />
                  Id: <strong style={{ color: '#12A878' }}>341827520</strong> ← <em style={{ color: '#4B5563' }}>das ist Ihre ID</em><br />
                  First: Max<br />
                  Last: Muster
                </div>
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#4B5563' }}>Kopieren Sie die <strong>Zahl hinter "Id:"</strong> — das ist Ihre Telegram-Benutzer-ID.</p>
              </div>
            </div>
          </div>
        </>)}

        <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

        {/* STEP 3: API Key */}
        {step('3', 'KI-API-Schlüssel erstellen', <>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Ihr Assistent braucht Zugang zu einem KI-Modell. Wir empfehlen <strong>Claude von Anthropic</strong> — günstig, schnell und sehr leistungsfähig.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            {[
              { name: 'Anthropic (Claude)', rec: true, link: 'https://console.anthropic.com/settings/keys', desc: 'Empfohlen · ab ~CHF 1/Mo', color: '#b87333' },
              { name: 'OpenAI (GPT-4)', rec: false, link: 'https://platform.openai.com/api-keys', desc: 'Beliebt · ab ~CHF 3/Mo', color: '#10a37f' },
            ].map(p => (
              <div key={p.name} style={{ border: `1.5px solid ${p.rec ? '#12A878' : '#E4EDE9'}`, borderRadius: '10px', padding: '1rem', position: 'relative', background: p.rec ? '#fafffe' : '#fff' }}>
                {p.rec && <div style={{ position: 'absolute', top: '-10px', left: '12px', background: '#12A878', color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.5rem', borderRadius: '99px', letterSpacing: '0.05em' }}>EMPFOHLEN</div>}
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, fontSize: '0.9rem', color: '#0F1714' }}>{p.name}</p>
                <p style={{ margin: '0 0 0.6rem', fontSize: '0.8rem', color: '#4B5563' }}>{p.desc}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: p.rec ? '#12A878' : '#F7FAF9', color: p.rec ? '#fff' : '#0F1714', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', border: p.rec ? 'none' : '1px solid #E4EDE9' }}>
                  API-Key erstellen →
                </a>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { n: '3a', text: 'Klicken Sie oben auf "API-Key erstellen" beim gewünschten Anbieter' },
              { n: '3b', text: 'Erstellen Sie ein kostenloses Konto (E-Mail + Passwort) — dauert 2 Minuten' },
              { n: '3c', text: 'Hinterlegen Sie eine Zahlungsmethode — Anthropic verlangt dies für neue Konten. Die ersten ~CHF 5 sind oft gratis.' },
              { n: '3d', text: <>Klicken Sie auf <strong>"Create Key"</strong> / <strong>"API-Schlüssel erstellen"</strong></> },
            ].map(s => (
              <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
                <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#0F1714', lineHeight: 1.6 }}>{s.text}</p>
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ background: '#E6F7F2', color: '#0E8F67', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>3e</div>
              <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.92rem', color: '#0F1714' }}>Kopieren Sie den Schlüssel — er sieht aus wie:</p>
                <div style={{ background: '#F7FAF9', border: '1px solid #E4EDE9', borderRadius: '6px', padding: '0.5rem 0.75rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#1E3329' }}>
                  sk-ant-oat01-xxxxxxxxxxxxxxxxxxxx...
                </div>
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#9ca3af' }}>⚠️ Zeigen Sie diesen Schlüssel niemandem. Er gibt Zugang zu Ihrem KI-Konto.</p>
              </div>
            </div>
          </div>
        </>)}

        <hr style={{ border: 'none', borderTop: '1px solid #E4EDE9', margin: '2rem 0' }} />

        <div style={{ background: '#E6F7F2', border: '1px solid #b2dfd4', borderRadius: '12px', padding: '1.25rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F1714', marginBottom: '0.5rem' }}>✅ Alles bereit?</p>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Kehren Sie zum Formular zurück und fügen Sie Token, User-ID und API-Schlüssel ein.</p>
          <Link href="/onboarding" style={{ display: 'inline-block', background: '#12A878', color: '#fff', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            Zurück zum Formular →
          </Link>
        </div>
      </div>
    </main>
  )
}
