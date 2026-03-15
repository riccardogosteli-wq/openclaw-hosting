import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_jSGcCv3C_NHdjr17ryPUYFtUx3S3qKQEZ'
const FROM_EMAIL = 'support@openclaw-consulting.ch'
const NOTIFY_EMAIL = 'riccardogosteli@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    // Forward to Ricci
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: `📩 Kontaktanfrage: ${subject}`,
        html: `<p><strong>Von:</strong> ${name} (${email})<br/><strong>Betreff:</strong> ${subject}</p><p style="margin-top:12px">${message.replace(/\n/g,'<br/>')}</p>`,
      }),
    })

    // Auto-reply to sender
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Ihre Anfrage bei OpenClaw Hosting',
        html: `<div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
          <h2>Vielen Dank, ${name.split(' ')[0]}!</h2>
          <p style="color:#4B5563;line-height:1.7">Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden.</p>
          <p style="color:#4B5563;line-height:1.7">Freundliche Grüsse,<br/>OpenClaw Hosting</p>
          <p style="font-size:12px;color:#9ca3af;margin-top:20px">support@openclaw-consulting.ch</p>
        </div>`,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
