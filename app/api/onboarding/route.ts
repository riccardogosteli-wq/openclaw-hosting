import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const NOTIFY_EMAIL = 'riccardogosteli@gmail.com' // personal fallback until support@ is verified
const FROM_EMAIL = 'support@openclaw-consulting.ch'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, telegramToken, telegramUserId, aiProvider, aiKey, language, notes, plan } = body

    if (!name || !email || !telegramToken || !aiKey) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 })
    }

    // 1. Notify Ricci with all customer details
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `🆕 Neuer OpenClaw Hosting Kunde: ${name} (${plan?.toUpperCase()})`,
        html: `
          <h2>Neuer Hosting-Kunde</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;width:160px;">Name</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${name}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">E-Mail</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${email}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Unternehmen</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${company || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Plan</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${plan?.toUpperCase()}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Sprache</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${language}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">KI-Anbieter</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${aiProvider}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">API-Schlüssel</td><td style="padding:8px;border-bottom:1px solid #e4ede9;font-family:monospace;">${aiKey}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Telegram Token</td><td style="padding:8px;border-bottom:1px solid #e4ede9;font-family:monospace;">${telegramToken}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Telegram User ID</td><td style="padding:8px;border-bottom:1px solid #e4ede9;font-family:monospace;">${telegramUserId || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Anmerkungen</td><td style="padding:8px;">${notes || '—'}</td></tr>
          </table>
          <p style="margin-top:20px;font-size:13px;color:#4B5563;">
            ➡️ Jetzt Provisioning-Script ausführen:<br/>
            <code>./provision-openclaw.sh --name "${name}" --email "${email}" --telegram-token "${telegramToken}" --telegram-user-id "${telegramUserId}" --ai-key "${aiKey}" --ai-provider "${aiProvider}" --language "${language}" --plan "${plan}"</code>
          </p>
        `,
      }),
    })

    // 2. Confirmation email to customer
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'OpenClaw Hosting — Wir richten Ihren Assistenten ein',
        html: `
          <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
            <h2 style="font-size:22px;margin-bottom:8px;">Hallo ${name.split(' ')[0]} 👋</h2>
            <p style="color:#4B5563;line-height:1.7;">Vielen Dank — wir haben Ihr Onboarding-Formular erhalten!</p>
            <div style="background:#E6F7F2;border:1px solid #b2dfd4;border-radius:10px;padding:16px 20px;margin:20px 0;font-size:14px;color:#1E3329;line-height:1.7;">
              <strong>Was als nächstes passiert:</strong><br/>
              ✓ Wir richten Ihren privaten Server in der Schweiz ein<br/>
              ✓ Ihr persönlicher OpenClaw-Assistent wird konfiguriert<br/>
              ✓ Sie erhalten eine E-Mail mit Ihrem Telegram-Bot-Link<br/>
              <br/>
              <strong>Zeitrahmen:</strong> In der Regel innerhalb weniger Stunden.
            </div>
            <p style="color:#4B5563;line-height:1.7;">
              Bei Fragen: einfach auf diese E-Mail antworten oder schreiben Sie uns an<br/>
              <a href="mailto:support@openclaw-consulting.ch" style="color:#12A878;">support@openclaw-consulting.ch</a>
            </p>
            <p style="color:#4B5563;line-height:1.7;">Freundliche Grüsse,<br/>Riccardo Gosteli<br/>OpenClaw Hosting</p>
            <hr style="border:none;border-top:1px solid #E4EDE9;margin:24px 0;"/>
            <p style="font-size:12px;color:#9ca3af;">
              Alexandra Gosteli Digital Solutions · Truttikon, Schweiz<br/>
              <a href="https://hosting.openclaw-consulting.ch/datenschutz" style="color:#9ca3af;">Datenschutz</a> ·
              <a href="https://hosting.openclaw-consulting.ch/impressum" style="color:#9ca3af;">Impressum</a>
            </p>
          </div>
        `,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Onboarding error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
