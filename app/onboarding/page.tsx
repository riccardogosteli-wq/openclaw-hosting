'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const AI_PROVIDERS = {
  de: [
    { value: 'google', label: 'Google (Gemini Flash) – kostenlos starten', link: 'https://aistudio.google.com/app/apikey' },
    { value: 'anthropic', label: 'Anthropic (Claude) – günstig & leistungsstark', link: 'https://console.anthropic.com/settings/keys' },
    { value: 'openai', label: 'OpenAI (GPT-4)', link: 'https://platform.openai.com/api-keys' },
  ],
  en: [
    { value: 'google', label: 'Google (Gemini Flash) – free to start', link: 'https://aistudio.google.com/app/apikey' },
    { value: 'anthropic', label: 'Anthropic (Claude) – affordable & powerful', link: 'https://console.anthropic.com/settings/keys' },
    { value: 'openai', label: 'OpenAI (GPT-4)', link: 'https://platform.openai.com/api-keys' },
  ]
}

const TX = {
  de: {
    badge: 'OpenClaw Onboarding',
    step1title: 'Schritt 1: Ihre Angaben',
    step1sub: 'Damit wir wissen, wem wir den Server einrichten dürfen.',
    nameLabel: 'Vorname & Nachname *', namePlaceholder: 'Max Muster',
    emailLabel: 'E-Mail-Adresse *', emailPlaceholder: 'max@firma.ch',
    companyLabel: 'Unternehmen (optional)', companyPlaceholder: 'Muster GmbH',
    langLabel: 'Bevorzugte Sprache des Assistenten',
    next: 'Weiter →', back: '← Zurück',
    step2title: 'Schritt 2: Kanal verbinden',
    step2sub: 'Über welche App möchten Sie mit Ihrem Assistenten chatten?',
    guideLabel: 'Anleitung öffnen →',
    tokenLabel: (ch: string) => ch === 'telegram' ? 'Telegram-Bot-Token *' : 'Discord-Bot-Token *',
    tokenHint: 'Ihr Token wird nur auf Ihrem eigenen Server gespeichert — wir sehen ihn nie.',
    userIdLabel: (ch: string) => ch === 'telegram' ? 'Ihre Telegram-Benutzer-ID *' : 'Ihre Discord-User-ID *',
    step3title: 'Schritt 3: KI-Anbieter',
    step3sub: 'Das «Gehirn» Ihres Assistenten. Sie bezahlen Ihren Anbieter direkt.',
    guideApiLabel: 'Wo finde ich meinen API-Schlüssel? →',
    providerLabel: 'KI-Anbieter wählen',
    providerHint: 'Noch keinen Schlüssel? Erstellen Sie einen kostenlos bei',
    keyLabel: 'API-Schlüssel *',
    keyHint: 'Ihr Schlüssel wird nur auf Ihrem eigenen Server gespeichert — wir sehen ihn nie.',
    notesLabel: 'Anmerkungen (optional)',
    notesPlaceholder: 'Besondere Wünsche, z.B. welche Tools Sie nutzen möchten...',
    submit: 'Abschicken & fertig ✓', submitting: 'Wird gesendet...',
    doneTitle: 'Formular erhalten!',
    doneSub: 'Ihr Server wird jetzt vollautomatisch eingerichtet — in der Regel sind Sie innerhalb von 30 Minuten startbereit. Sie erhalten eine E-Mail sobald alles läuft.',
    doneSupport: 'Fragen?',
    errorMsg: 'Fehler beim Absenden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.',
    channelRec: 'Empfohlen',
    channels: [
      { value: 'telegram', label: 'Telegram', emoji: '✈️', rec: true, desc: 'Am einfachsten einzurichten — Bot in 2 Min. erstellt', guideLink: '/guide' },
      { value: 'discord', label: 'Discord', emoji: '🎮', rec: false, desc: 'Perfekt für Teams und Communities', guideLink: '/guide#discord' },
    ],
  },
  en: {
    badge: 'OpenClaw Onboarding',
    step1title: 'Step 1: Your details',
    step1sub: 'So we know who to set up the server for.',
    nameLabel: 'First & last name *', namePlaceholder: 'Jane Smith',
    emailLabel: 'Email address *', emailPlaceholder: 'jane@company.com',
    companyLabel: 'Company (optional)', companyPlaceholder: 'Acme Ltd',
    langLabel: 'Preferred language of your assistant',
    next: 'Next →', back: '← Back',
    step2title: 'Step 2: Connect your channel',
    step2sub: 'Which app do you want to use to chat with your assistant?',
    guideLabel: 'Open guide →',
    tokenLabel: (ch: string) => ch === 'telegram' ? 'Telegram bot token *' : 'Discord bot token *',
    tokenHint: 'Your token is stored only on your own server — we never see it.',
    userIdLabel: (ch: string) => ch === 'telegram' ? 'Your Telegram user ID *' : 'Your Discord user ID *',
    step3title: 'Step 3: AI provider',
    step3sub: 'The "brain" of your assistant. You pay your provider directly.',
    guideApiLabel: 'Where do I find my API key? →',
    providerLabel: 'Choose AI provider',
    providerHint: 'No key yet? Create one for free at',
    keyLabel: 'API key *',
    keyHint: 'Your key is stored only on your own server — we never see it.',
    notesLabel: 'Notes (optional)',
    notesPlaceholder: 'Special requests, e.g. which tools you\'d like to use...',
    submit: 'Submit & finish ✓', submitting: 'Sending...',
    doneTitle: 'Form received!',
    doneSub: 'Your server is now being set up automatically — you\'ll usually be up and running within 30 minutes. You\'ll receive an email when everything is ready.',
    doneSupport: 'Questions?',
    errorMsg: 'Error submitting. Please try again or contact us directly.',
    channelRec: 'Recommended',
    channels: [
      { value: 'telegram', label: 'Telegram', emoji: '✈️', rec: true, desc: 'Easiest to set up — bot created in 2 min', guideLink: '/guide?lang=en' },
      { value: 'discord', label: 'Discord', emoji: '🎮', rec: false, desc: 'Perfect for teams and communities', guideLink: '/guide?lang=en#discord' },
    ],
  },
}

// CHANNELS now in TX[lang].channels

const CHANNEL_FIELDS: Record<string, {
  showToken: boolean; tokenLabel?: string; tokenPlaceholder?: string; tokenHint?: string;
  userIdLabel: string; userIdPlaceholder: string; userIdHint: React.ReactNode;
  extraFields?: { key: string; label: string; placeholder: string; hint: React.ReactNode }[]
}> = {
  telegram: {
    showToken: true,
    tokenLabel: 'Telegram-Bot-Token *',
    tokenPlaceholder: '123456789:AAFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    tokenHint: '🔒 Ihr Token wird nur auf Ihrem eigenen Server gespeichert — wir sehen ihn nie.',
    userIdLabel: 'Ihre Telegram-Benutzer-ID *',
    userIdPlaceholder: '123456789',
    userIdHint: <>Ihr Assistent antwortet <strong>nur auf Ihre Nachrichten</strong>. ID finden: Schreiben Sie in Telegram an <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" style={{color:'var(--green)'}}>@userinfobot</a> — er antwortet sofort.</>,
  },
  discord: {
    showToken: true,
    tokenLabel: 'Discord-Bot-Token *',
    tokenPlaceholder: 'MTIzNDU2Nzg5...',
    tokenHint: '🔒 Ihr Token wird nur auf Ihrem eigenen Server gespeichert — wir sehen ihn nie.',
    userIdLabel: 'Ihre Discord-User-ID *',
    userIdPlaceholder: '123456789012345678',
    userIdHint: <>Ihre User-ID finden Sie unter <strong>Einstellungen → Erweitert → Entwicklermodus</strong> (aktivieren), dann Rechtsklick auf Ihren Namen → "ID kopieren".</>,
    extraFields: [{
      key: 'serverId',
      label: 'Discord-Server-ID *',
      placeholder: '123456789012345678',
      hint: <>Rechtsklick auf Ihren Server → "Server-ID kopieren" (Entwicklermodus muss aktiv sein).</>,
    }],
  },
}

const STORAGE_KEY = 'openclaw_onboarding_form'

function OnboardingForm() {
  const params = useSearchParams()
  const plan = params.get('plan') || 'starter'
  const pt = params.get('pt') || ''
  const langParam = params.get('lang') || 'de'
  const lang = (['de','en'].includes(langParam) ? langParam : 'de') as 'de'|'en'
  const tx = TX[lang]
  const providers = AI_PROVIDERS[lang]

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [emailFromStripe, setEmailFromStripe] = useState('')

  // Auto-fetch email from Stripe session if session_id is in URL
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    if (!sessionId) return
    fetch(`/api/session-email?session_id=${encodeURIComponent(sessionId)}`)
      .then(r => r.json())
      .then(d => {
        if (d.email) {
          setEmailFromStripe(d.email)
          setForm(f => ({ ...f, email: d.email, name: f.name || d.name || '' }))
        }
      })
      .catch(() => {})
  }, [])

  const [form, setForm] = useState({
    name: '', email: '', company: '',
    channel: 'telegram',
    token: '', userId: '', serverId: '',
    aiProvider: 'google', aiKey: '',
    language: lang === 'en' ? 'en' : 'de',
    notes: '',
  })

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setForm(f => ({ ...f, ...parsed }))
      }
    } catch {}
  }, [])

  // Save to localStorage on every change
  const set = (k: string, v: string) => {
    setForm(f => {
      const next = { ...f, [k]: v }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          channel: form.channel,
          channelToken: form.token,
          channelUserId: form.userId,
          channelServerId: form.serverId,
          aiProvider: form.aiProvider,
          aiKey: form.aiKey,
          language: form.language,
          notes: form.notes,
          plan,
          paymentToken: pt,
        }),
      })
      // Clear saved form on success
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
      setDone(true)
    } catch {
      setSubmitError(tx.errorMsg)
    }
    setLoading(false)
  }

  const selectedProvider = providers.find(p => p.value === form.aiProvider)
  const selectedChannel = tx.channels.find((c: {value:string}) => c.value === form.channel)!
  const channelFields = CHANNEL_FIELDS[form.channel]

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
      <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>{tx.doneTitle}</h2>
      <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {tx.doneSub}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--slate)' }}>
        {tx.doneSupport} <a href="mailto:support@openclaw-consulting.ch" style={{ color: 'var(--green)' }}>support@openclaw-consulting.ch</a>
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

      {/* ── STEP 1: Personal details ── */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{tx.step1title}</h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>{tx.step1sub}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={labelStyle}>{tx.nameLabel}</label>
              <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} {...{placeholder: tx.namePlaceholder}} />
            </div>
            <div>
              {!emailFromStripe && <>
                <label style={labelStyle}>{tx.emailLabel}</label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} {...{placeholder: tx.emailPlaceholder}} />
              </>}
              {emailFromStripe && (
                <p style={{ fontSize: '0.85rem', color: 'var(--slate)', margin: '0.25rem 0 0.75rem' }}>
                  📧 {emailFromStripe}
                </p>
              )}
            </div>
            <div>
              <label style={labelStyle}>{tx.companyLabel}</label>
              <input style={inputStyle} value={form.company} onChange={e => set('company', e.target.value)} {...{placeholder: tx.companyPlaceholder}} />
            </div>
            <div>
              <label style={labelStyle}>{tx.langLabel}</label>
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
            {tx.next}
          </button>
        </div>
      )}

      {/* ── STEP 2: Channel + connection ── */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{tx.step2title}</h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{tx.step2sub}</p>

          {/* Channel selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
            {tx.channels.map((ch: {value:string;label:string;emoji:string;rec:boolean;desc:string;guideLink:string}) => (
              <div
                key={ch.value}
                onClick={() => set('channel', ch.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.9rem',
                  padding: '0.85rem 1rem', border: `1.5px solid ${form.channel === ch.value ? 'var(--green)' : 'var(--border)'}`,
                  borderRadius: '10px', cursor: 'pointer',
                  background: form.channel === ch.value ? 'var(--green3)' : 'var(--white)',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{ch.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.93rem', color: 'var(--ink)' }}>{ch.label}</span>
                    {ch.rec && <span style={{ background: 'var(--green)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '99px', letterSpacing: '0.04em' }}>{tx.channelRec}</span>}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate)', marginTop: '0.1rem' }}>{ch.desc}</div>
                </div>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${form.channel === ch.value ? 'var(--green)' : 'var(--border)'}`, background: form.channel === ch.value ? 'var(--green)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {form.channel === ch.value && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                </div>
              </div>
            ))}
          </div>

          {/* Guide link — opens in new tab, form state preserved */}
          <a href={selectedChannel.guideLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--green3)', border: '1px solid #b2dfd4', color: 'var(--green2)', padding: '0.45rem 0.9rem', borderRadius: '7px', fontSize: '0.84rem', fontWeight: 600, textDecoration: 'none', marginBottom: '1.25rem' }}>
            📖 {tx.guideLabel}
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            
            {channelFields.showToken && (
              <div>
                <label style={labelStyle}>{channelFields.tokenLabel}</label>
                <input style={inputStyle} value={form.token} onChange={e => set('token', e.target.value)} placeholder={channelFields.tokenPlaceholder} />
                <p style={hintStyle}>{channelFields.tokenHint}</p>
              </div>
            )}

            <div>
              <label style={labelStyle}>{channelFields.userIdLabel}</label>
              <input
                style={inputStyle}
                value={form.userId}
                onChange={e => set('userId', form.channel === 'telegram' ? e.target.value.replace(/\D/g,'') : e.target.value)}
                placeholder={channelFields.userIdPlaceholder}
                inputMode={form.channel === 'telegram' ? 'numeric' : 'text'}
              />
              <p style={hintStyle}>{channelFields.userIdHint}</p>
            </div>

            {/* Extra fields (e.g. Discord Server ID) */}
            {channelFields.extraFields?.map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  style={inputStyle}
                  value={f.key === 'serverId' ? form.serverId : ''}
                  onChange={e => set(f.key, e.target.value.replace(/\D/g,''))}
                  placeholder={f.placeholder}
                  inputMode="numeric"
                />
                <p style={hintStyle}>{f.hint}</p>
              </div>
            ))}
          </div>

          {(() => {
            const needsToken = channelFields.showToken ? !!form.token : true
            const needsServerId = channelFields.extraFields?.some(f => f.key === 'serverId') ? !!form.serverId : true
            const canProceed = needsToken && !!form.userId && needsServerId
            return (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '9px', fontWeight: 600, fontSize: '0.93rem', cursor: 'pointer', color: 'var(--slate)' }}>{tx.back}</button>
            <button
              onClick={() => setStep(3)}
              disabled={!canProceed}
              style={{ flex: 2, padding: '0.8rem', background: canProceed ? 'var(--green)' : 'var(--border)', color: canProceed ? '#fff' : 'var(--slate)', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '0.97rem', cursor: canProceed ? 'pointer' : 'not-allowed' }}
            >
              {tx.next}
            </button>
          </div>
            )
          })()}
        </div>
      )}

      {/* ── STEP 3: AI provider ── */}
      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{tx.step3title}</h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{tx.step3sub}</p>
          <a href="/guide#api" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--green3)', border: '1px solid #b2dfd4', color: 'var(--green2)', padding: '0.45rem 0.9rem', borderRadius: '7px', fontSize: '0.84rem', fontWeight: 600, textDecoration: 'none', marginBottom: '1.25rem' }}>
            📖 {tx.guideApiLabel}
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>{tx.providerLabel}</label>
              <select style={inputStyle} value={form.aiProvider} onChange={e => set('aiProvider', e.target.value)}>
                {providers.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
              <p style={hintStyle}>{tx.providerHint} <a href={selectedProvider?.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>{lang==='en'?'your chosen provider →':'Ihrem gewählten Anbieter →'}</a></p>
            </div>

            <div>
              <label style={labelStyle}>{tx.keyLabel}</label>
              <input style={inputStyle} type="password" value={form.aiKey} onChange={e => set('aiKey', e.target.value)}
                placeholder={form.aiProvider === 'google' ? 'AIzaSy...' : form.aiProvider === 'openai' ? 'sk-proj-...' : 'sk-ant-...'} />
              <p style={hintStyle}>{tx.keyHint}</p>
            </div>

            <div>
              <label style={labelStyle}>{tx.notesLabel}</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.notes} onChange={e => set('notes', e.target.value)} {...{placeholder: tx.notesPlaceholder}} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '9px', fontWeight: 600, fontSize: '0.93rem', cursor: 'pointer', color: 'var(--slate)' }}>{tx.back}</button>
            <button
              onClick={() => { setSubmitError(''); handleSubmit() }}
              disabled={!form.aiKey || loading}
              style={{ flex: 2, padding: '0.8rem', background: form.aiKey && !loading ? 'var(--green)' : 'var(--border)', color: form.aiKey && !loading ? '#fff' : 'var(--slate)', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '0.97rem', cursor: form.aiKey && !loading ? 'pointer' : 'not-allowed' }}
            >
              {loading ? tx.submitting : tx.submit}
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
