'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', subject:'Frage zu OpenClaw Hosting', message:'' })
  const set = (k: string, v: string) => setForm(f => ({...f, [k]:v}))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch {
      // Fallback to mailto
      window.location.href = `mailto:support@openclaw-consulting.ch?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'0.7rem 0.9rem', border:'1px solid var(--border)',
    borderRadius:'8px', fontSize:'0.93rem', color:'var(--ink)',
    background:'var(--white)', outline:'none', fontFamily:'Inter,sans-serif',
  }
  const labelStyle: React.CSSProperties = {
    display:'block', fontSize:'0.85rem', fontWeight:600, color:'var(--ink)', marginBottom:'0.35rem',
  }

  return (
    <main style={{background:'var(--light)', minHeight:'100vh', padding:'3rem 1.5rem'}}>
      <div style={{maxWidth:'1000px', margin:'0 auto'}}>
        <Link href="/" style={{color:'var(--green)', fontSize:'0.88rem', textDecoration:'none'}}>← Zurück</Link>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'4rem', alignItems:'start', marginTop:'2rem'}}>
          {/* Left: Info */}
          <div>
            <div style={{fontSize:'0.74rem', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--green)', marginBottom:'0.5rem'}}>Kontakt</div>
            <h1 style={{fontFamily:'Bricolage Grotesque, sans-serif', fontSize:'2.2rem', marginBottom:'1rem', color:'var(--ink)'}}>Wir helfen Ihnen gerne</h1>
            <p style={{color:'var(--slate)', lineHeight:1.7, marginBottom:'2rem'}}>
              Fragen zum Produkt, zur Einrichtung oder zum richtigen Plan? Schreiben Sie uns — wir antworten innerhalb von 24 Stunden.
            </p>

            <div style={{display:'flex', flexDirection:'column', gap:'1.25rem'}}>
              <div style={{display:'flex', gap:'0.85rem', alignItems:'flex-start'}}>
                <div style={{width:40, height:40, borderRadius:10, background:'var(--green3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0}}>📧</div>
                <div>
                  <div style={{fontWeight:700, fontSize:'0.92rem', color:'var(--ink)', marginBottom:'0.15rem'}}>E-Mail</div>
                  <a href="mailto:support@openclaw-consulting.ch" style={{color:'var(--green)', fontSize:'0.88rem'}}>support@openclaw-consulting.ch</a>
                  <div style={{fontSize:'0.78rem', color:'var(--slate)', marginTop:'0.1rem'}}>Antwort innerhalb von 24 Stunden</div>
                </div>
              </div>

              <div style={{display:'flex', gap:'0.85rem', alignItems:'flex-start'}}>
                <div style={{width:40, height:40, borderRadius:10, background:'var(--green3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0}}>🌐</div>
                <div>
                  <div style={{fontWeight:700, fontSize:'0.92rem', color:'var(--ink)', marginBottom:'0.15rem'}}>Website</div>
                  <a href="https://openclaw-consulting.ch" style={{color:'var(--green)', fontSize:'0.88rem'}}>openclaw-consulting.ch</a>
                </div>
              </div>


            </div>

            <div style={{marginTop:'2rem', padding:'1.25rem', background:'var(--white)', border:'1px solid var(--border)', borderRadius:'12px'}}>
              <div style={{fontWeight:700, fontSize:'0.88rem', color:'var(--ink)', marginBottom:'0.75rem'}}>Häufige Fragen</div>
              {[
                ['Wie schnell ist das Setup?', 'Innerhalb von 24 Stunden nach dem Onboarding-Formular.'],
                ['Kann ich vor dem Kauf testen?', 'Schreiben Sie uns — wir können eine kurze Demo einrichten.'],
                ['Gibt es einen Onboarding-Call?', 'Im Pro-Plan inklusive. Im Business-Plan immer dabei.'],
              ].map(([q,a]) => (
                <div key={q} style={{marginBottom:'0.85rem'}}>
                  <div style={{fontSize:'0.85rem', fontWeight:600, color:'var(--ink)', marginBottom:'0.15rem'}}>{q}</div>
                  <div style={{fontSize:'0.83rem', color:'var(--slate)'}}>{a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{background:'var(--white)', border:'1px solid var(--border)', borderRadius:'16px', padding:'2rem', boxShadow:'0 4px 24px rgba(15,23,20,0.06)'}}>
            {sent ? (
              <div style={{textAlign:'center', padding:'2rem 0'}}>
                <div style={{fontSize:'3rem', marginBottom:'1rem'}}>✅</div>
                <h2 style={{fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'1.5rem', color:'var(--ink)', marginBottom:'0.5rem'}}>Nachricht gesendet!</h2>
                <p style={{color:'var(--slate)', lineHeight:1.7}}>Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                <Link href="/" style={{display:'inline-block', marginTop:'1.5rem', color:'var(--green)', fontWeight:600}}>← Zur Startseite</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'1.1rem'}}>
                <h2 style={{fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'1.4rem', color:'var(--ink)', marginBottom:'0.25rem'}}>Nachricht senden</h2>
                <p style={{color:'var(--slate)', fontSize:'0.88rem', marginBottom:'0.5rem'}}>Wir antworten innerhalb von 24 Stunden auf Deutsch oder Englisch.</p>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.85rem'}}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Max Muster" required />
                  </div>
                  <div>
                    <label style={labelStyle}>E-Mail *</label>
                    <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="max@firma.ch" required />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Betreff</label>
                  <select style={inputStyle} value={form.subject} onChange={e => set('subject', e.target.value)}>
                    <option>Frage zu OpenClaw Hosting</option>
                    <option>Welcher Plan passt zu mir?</option>
                    <option>Technische Unterstützung</option>
                    <option>Preise & Abonnement</option>
                    <option>Demo anfragen</option>
                    <option>Anderes</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Ihre Nachricht *</label>
                  <textarea
                    style={{...inputStyle, resize:'vertical', minHeight:'140px'}}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Was möchten Sie wissen? Wie können wir helfen?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{background:'var(--green)', color:'#fff', border:'none', padding:'0.85rem', borderRadius:'9px', fontWeight:700, fontSize:'0.97rem', cursor: loading?'not-allowed':'pointer', opacity: loading?0.7:1}}
                >
                  {loading ? 'Wird gesendet...' : 'Nachricht senden →'}
                </button>
                <p style={{fontSize:'0.78rem', color:'var(--slate)', textAlign:'center'}}>
                  Oder direkt per E-Mail: <a href="mailto:support@openclaw-consulting.ch" style={{color:'var(--green)'}}>support@openclaw-consulting.ch</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
