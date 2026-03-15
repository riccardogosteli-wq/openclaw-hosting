'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const AI_PROVIDERS = [
  { value: 'anthropic', label: 'Anthropic (Claude) – empfohlen', link: 'https://console.anthropic.com/settings/keys' },
  { value: 'openai', label: 'OpenAI (GPT-4)', link: 'https://platform.openai.com/api-keys' },
  { value: 'google', label: 'Google (Gemini)', link: 'https://aistudio.google.com/app/apikey' },
]

function OnboardingForm() {
  const params = useSearchParams()
  const plan = params.get('plan') || 'starter'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', company: '',
    telegramToken: '', telegramUserId: '',
    aiProvider: 'anthropic', aiKey: '',
    language: 'de',
    notes: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan }),
      })
      setDone(true)
    } catch {
      alert('Fehler beim Absenden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.')
    }
    setLoading(false)
  }

  const selectedProvider = AI_PROVIDERS.find(p => p.value === form.aiProvider)

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.7rem 0.9rem', border: '1px solid var(--border)',
    borderRadius: '8px', fontSize: '0.93rem', color: 'var(--ink)',
    background: 'var(--white)', outline: 'none', fontFamily: 'Inter, sans-serif',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.85rem', fontWeight: 600,
    color: 'var(--ink)', marginBottom: '0.4rem',
  }
  const hintStyle: React.CSSProperties = {
    fontSize: '0.78rem', color: 'var(--slate)', marginTop: '0.3rem', lineHeight: 1.5,
  }

  if (done) return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
      <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>Formular erhalten!</h2>
      <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Wir richten Ihren persönlichen OpenClaw-Assistenten ein und melden uns innerhalb von 24 Stunden per E-Mail.
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--slate)' }}>
        Fragen? <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
      </p>
    </div>
  )

  return (
    <>
      {/* Progress */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[1,2,3].map(s => (
          <div key={s} style={{
            flex: 1, height: '4px', borderRadius: '99px',
            background: s <= step ? 'var(--green)' : 'var(--border)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>Schritt 1: Ihre Angaben</h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>Damit wir wissen, wem wir den Server einrichten dürfen.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={labelStyle}>Vorname & Nachname *</label>
              <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Max Muster" />
            </div>
            <div>
              <label style={labelStyle}>E-Mail-Adresse *</label>
              <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="max@firma.ch" />
            </div>
            <div>
              <label style={labelStyle}>Unternehmen (optional)</label>
              <input style={inputStyle} value={form.company} onChange={e => set('company', e.target.value)} placeholder="Muster GmbH" />
            </div>
            <div>
              <label style={labelStyle}>Bevorzugte Sprache des Assistenten</label>
              <select style={inputStyle} value={form.language} onChange={e => set('language', e.target.value)}>
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.name || !form.email}
            style={{ marginTop: '1.75rem', width: '100%', padding: '0.8rem', background: form.name && form.email ? 'var(--green)' : 'var(--border)', color: form.name && form.email ? '#fff' : 'var(--slate)', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '0.97rem', cursor: form.name && form.email ? 'pointer' : 'not-allowed' }}
          >
            Weiter →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>Schritt 2: Telegram verbinden</h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>So erhält Ihr Assistent eine eigene Nummer auf Telegram.</p>
          <a href="/guide" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--green3)', border: '1px solid #b2dfd4', color: 'var(--green2)', padding: '0.45rem 0.9rem', borderRadius: '7px', fontSize: '0.84rem', fontWeight: 600, textDecoration: 'none', marginBottom: '1.25rem' }}>
            📖 Schritt-für-Schritt Anleitung mit Bildern öffnen →
          </a>

          <div style={{ background: 'var(--green3)', border: '1px solid #b2dfd4', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--ink2)', lineHeight: 1.7 }}>
            <strong>So erstellen Sie einen Telegram-Bot (2 Min.):</strong><br />
            1. Öffnen Sie Telegram und suchen Sie nach <strong>@BotFather</strong><br />
            2. Senden Sie <code>/newbot</code> und folgen Sie den Anweisungen<br />
            3. Kopieren Sie den Token (sieht aus wie: <code>123456789:AAF...</code>)
          </div>

          <div>
            <label style={labelStyle}>Telegram-Bot-Token *</label>
            <input style={inputStyle} value={form.telegramToken} onChange={e => set('telegramToken', e.target.value)} placeholder="123456789:AAFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
            <p style={hintStyle}>🔒 <strong>Sicherheitshinweis:</strong> Ihr Telegram-Token wird verschlüsselt übertragen und ausschliesslich auf Ihrem eigenen Server in der Schweiz gespeichert. Wir speichern ihn nicht auf unseren Systemen und haben nach der Einrichtung keinen Zugriff darauf.</p>
          </div>

          <div style={{ marginTop: '1.1rem' }}>
            <label style={labelStyle}>Ihre Telegram-Benutzer-ID *</label>
            <input style={inputStyle} value={form.telegramUserId} onChange={e => set('telegramUserId', e.target.value.replace(/\D/g,''))} placeholder="123456789" inputMode="numeric" />
            <p style={hintStyle}>
              Ihr Assistent antwortet <strong>nur auf Ihre Nachrichten</strong> — das verhindert Missbrauch durch andere.<br />
              Ihre ID in 10 Sekunden: Schreiben Sie in Telegram an <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" style={{color:'var(--green)'}}>@userinfobot</a> — er antwortet sofort mit Ihrer numerischen ID.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '9px', fontWeight: 600, fontSize: '0.93rem', cursor: 'pointer', color: 'var(--slate)' }}>← Zurück</button>
            <button
              onClick={() => setStep(3)}
              disabled={!form.telegramToken || !form.telegramUserId}
              style={{ flex: 2, padding: '0.8rem', background: form.telegramToken && form.telegramUserId ? 'var(--green)' : 'var(--border)', color: form.telegramToken && form.telegramUserId ? '#fff' : 'var(--slate)', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '0.97rem', cursor: form.telegramToken && form.telegramUserId ? 'pointer' : 'not-allowed' }}
            >
              Weiter →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>Schritt 3: KI-Anbieter</h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>Das «Gehirn» Ihres Assistenten. Sie bezahlen Ihren Anbieter direkt.</p>
          <a href="/guide#api" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--green3)', border: '1px solid #b2dfd4', color: 'var(--green2)', padding: '0.45rem 0.9rem', borderRadius: '7px', fontSize: '0.84rem', fontWeight: 600, textDecoration: 'none', marginBottom: '1.25rem' }}>
            📖 Wo finde ich meinen API-Schlüssel? →
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>KI-Anbieter wählen</label>
              <select style={inputStyle} value={form.aiProvider} onChange={e => set('aiProvider', e.target.value)}>
                {AI_PROVIDERS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
              <p style={hintStyle}>Noch keinen Schlüssel? Erstellen Sie einen kostenlos bei <a href={selectedProvider?.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>Ihrem gewählten Anbieter →</a></p>
            </div>

            <div>
              <label style={labelStyle}>API-Schlüssel *</label>
              <input style={inputStyle} type="password" value={form.aiKey} onChange={e => set('aiKey', e.target.value)} placeholder="sk-ant-..." />
              <p style={hintStyle}>🔒 <strong>Sicherheitshinweis:</strong> Ihr API-Schlüssel wird verschlüsselt übertragen und ausschliesslich auf Ihrem eigenen, privaten Server gespeichert. Er verlässt Ihren Server nie — wir speichern, sehen oder verarbeiten ihn nicht auf unserer Seite.</p>
            </div>

            <div>
              <label style={labelStyle}>Anmerkungen (optional)</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Besondere Wünsche, z.B. welche Tools Sie nutzen möchten..." />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '9px', fontWeight: 600, fontSize: '0.93rem', cursor: 'pointer', color: 'var(--slate)' }}>← Zurück</button>
            <button
              onClick={handleSubmit}
              disabled={!form.aiKey || loading}
              style={{ flex: 2, padding: '0.8rem', background: form.aiKey && !loading ? 'var(--green)' : 'var(--border)', color: form.aiKey && !loading ? '#fff' : 'var(--slate)', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '0.97rem', cursor: form.aiKey && !loading ? 'pointer' : 'not-allowed' }}
            >
              {loading ? 'Wird gesendet...' : 'Abschicken & fertig ✓'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function OnboardingPage() {
  return (
    <main style={{ background: 'var(--light)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '540px', width: '100%', boxShadow: '0 4px 24px rgba(15,23,20,0.07)' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ background: 'var(--green3)', color: 'var(--green2)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700 }}>OpenClaw Onboarding</span>
        </div>
        <Suspense>
          <OnboardingForm />
        </Suspense>
      </div>
    </main>
  )
}
