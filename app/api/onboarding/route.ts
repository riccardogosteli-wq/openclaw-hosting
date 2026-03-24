import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentToken } from '../checkout/route'

// Simple in-memory rate limiter (resets on cold start — good enough for Next.js edge/serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(ip: string, maxPerMinute = 10): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  entry.count++
  if (entry.count > maxPerMinute) return false
  return true
}
function getClientIp(req: NextRequest): string {
  return req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0'
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const NOTIFY_EMAIL = 'riccardogosteli@gmail.com'
const FROM_EMAIL = 'support@openclaw-consulting.ch'
const PROVISION_API_URL = process.env.PROVISION_API_URL || ''
const PROVISION_SECRET = process.env.PROVISION_SECRET || ''

const CHANNEL_LABELS: Record<string, string> = {
  telegram: 'Telegram',
    discord: 'Discord',
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!checkRateLimit(ip, 3)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }
  try {
    const body = await req.json()
    const {
      name, email, company,
      channel,
      channelToken, channelUserId,
      // legacy field names (Telegram signups before this fix)
      telegramToken, telegramUserId,
      aiProvider, aiKey, language, notes, plan, paymentToken, stripeCustomerId,
    } = body

    // Normalise — support both old (telegram-only) and new (generic) field names
    const safeChannel = ['telegram', 'discord'].includes(channel) ? channel : 'telegram'
    const token = (channelToken || telegramToken || '').trim()
    const userId = (channelUserId || telegramUserId || '').trim()

    // Verify payment token (HMAC signed by checkout, 24h expiry)
    const secret = process.env.PAYREXX_WEBHOOK_SECRET || ''
    if (secret && paymentToken) {
      if (!verifyPaymentToken(paymentToken)) {
        return NextResponse.json({ error: 'Ungültiges oder abgelaufenes Zahlungstoken. Bitte starten Sie den Kaufprozess erneut.' }, { status: 403 })
      }
    }

    // WhatsApp uses QR-based auth — no token required; Telegram/Discord require a bot token
    const tokenRequired = true
    if (!name || !email || (tokenRequired && !token) || !aiKey) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 })
    }

    // Basic input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    if (name.length > 100) return NextResponse.json({ error: 'Name zu lang' }, { status: 400 })
    if (token.length > 300) return NextResponse.json({ error: 'Token ungültig' }, { status: 400 })
    if (aiKey.length > 500) return NextResponse.json({ error: 'API-Key ungültig' }, { status: 400 })
    // Telegram user ID must be numeric; WhatsApp is a phone number; Discord is also numeric
    if (safeChannel === 'telegram' && userId && !/^\d+$/.test(userId)) {
      return NextResponse.json({ error: 'Telegram-ID muss numerisch sein' }, { status: 400 })
    }
    if (safeChannel === 'discord' && userId && !/^\d+$/.test(userId)) {
      return NextResponse.json({ error: 'Discord-ID muss numerisch sein' }, { status: 400 })
    }

    const allowedPlans = ['starter', 'pro', 'business']
    const safePlan = allowedPlans.includes(plan) ? plan : 'starter'
    const allowedProviders = ['anthropic', 'openai', 'google']
    const safeProvider = allowedProviders.includes(aiProvider) ? aiProvider : 'anthropic'
    const allowedLanguages = ['de', 'en']
    const safeLanguage = allowedLanguages.includes(language) ? language : 'de'
    const channelLabel = CHANNEL_LABELS[safeChannel] || safeChannel

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
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Kanal</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${channelLabel}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Sprache</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${language}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">KI-Anbieter</td><td style="padding:8px;border-bottom:1px solid #e4ede9;">${aiProvider}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">API-Schlüssel</td><td style="padding:8px;border-bottom:1px solid #e4ede9;color:#9ca3af;font-style:italic;">✅ Direkt an Server übertragen (nicht gespeichert)</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Bot Token</td><td style="padding:8px;border-bottom:1px solid #e4ede9;color:#9ca3af;font-style:italic;">✅ Direkt an Server übertragen (nicht gespeichert)</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">User ID / Nummer</td><td style="padding:8px;border-bottom:1px solid #e4ede9;font-family:monospace;">${userId || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600;">Anmerkungen</td><td style="padding:8px;">${notes || '—'}</td></tr>
          </table>
          <p style="margin-top:20px;font-size:13px;color:#4B5563;">
            ✅ Provisioning wurde automatisch gestartet.
          </p>
        `,
      }),
    })

    // 2. Trigger automatic provisioning
    if (PROVISION_API_URL && PROVISION_SECRET) {
      try {
        const provRes = await fetch(`${PROVISION_API_URL}/run`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-provision-secret': PROVISION_SECRET,
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            channel: safeChannel,
            channel_token: token,
            channel_user_id: userId,
            ai_key: aiKey.trim(),
            ai_provider: safeProvider,
            language: safeLanguage,
            plan: safePlan,
            stripe_customer_id: (stripeCustomerId || '').trim(),
            stripe_email: email.trim(),
          }),
        })
        const provData = await provRes.json()
        console.log('Provisioning triggered:', provData)
      } catch (err) {
        console.error('Provisioning trigger failed:', err)
      }
    }

    // 3. Confirmation email to customer
    const channelInstructions: Record<string, string> = {
      telegram: '✓ Sie erhalten eine E-Mail mit Ihrem Telegram-Bot-Link',
      discord: '✓ Sie erhalten eine E-Mail mit Ihrem Discord-Bot-Link und Einladungs-URL',
    }
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'OpenClaw Hosting — Wir richten Ihren Assistenten ein',
        html: `
          <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
            <h2 style="font-size:22px;margin-bottom:8px;">Hallo ${name} 👋</h2>
            <p style="color:#4B5563;line-height:1.7;">Vielen Dank — wir haben Ihr Onboarding-Formular erhalten!</p>
            <div style="background:#E6F7F2;border:1px solid #b2dfd4;border-radius:10px;padding:16px 20px;margin:20px 0;font-size:14px;color:#1E3329;line-height:1.7;">
              <strong>Was als nächstes passiert:</strong><br/>
              ✓ Wir richten Ihren privaten Server in der Schweiz ein<br/>
              ✓ Ihr persönlicher OpenClaw-Assistent wird konfiguriert (${channelLabel})<br/>
              ${channelInstructions[safeChannel] || ''}<br/>
              <br/>
              <strong>Zeitrahmen:</strong> Vollautomatisch — in der Regel innerhalb von 30 Minuten.
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
