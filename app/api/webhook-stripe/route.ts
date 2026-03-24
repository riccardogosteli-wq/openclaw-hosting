import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FROM_EMAIL = 'support@openclaw-consulting.ch'
const NOTIFY_EMAIL = 'riccardogosteli@gmail.com'
const PROVISION_API_URL = process.env.PROVISION_API_URL || 'http://195.15.202.192:8001'
const PROVISION_SECRET = process.env.PROVISION_SECRET || ''

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

async function sendEmail(to: string, subject: string, html: string) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    })
  } catch (e) {
    console.error('Email send error:', e)
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret || !sig) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // ── Subscription activated ──────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    if (session.mode !== 'subscription') return NextResponse.json({ ok: true })

    const plan = session.metadata?.plan || 'starter'
    const billing = session.metadata?.billing || 'monthly'
    const email = session.customer_details?.email || ''
    const name = session.customer_details?.name || email

    const planName = plan === 'starter' ? 'Starter' : plan === 'pro' ? 'Pro' : 'Business'
    const planPrice = plan === 'starter' ? (billing === 'annual' ? 'CHF 180/Jahr' : 'CHF 19/Mt.') :
                      plan === 'pro' ? (billing === 'annual' ? 'CHF 320/Jahr' : 'CHF 34/Mt.') :
                      billing === 'annual' ? 'CHF 560/Jahr' : 'CHF 59/Mt.'

    // Notify Ricci
    await sendEmail(NOTIFY_EMAIL,
      `🆕 Neue Bestellung: ${name} (${planName.toUpperCase()})`,
      `<div style="font-family:sans-serif">
        <h2>Neue OpenClaw Hosting Bestellung</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:8px;background:#f7faf9;font-weight:600">Name</td><td style="padding:8px;border-bottom:1px solid #e4ede9">${name}</td></tr>
          <tr><td style="padding:8px;background:#f7faf9;font-weight:600">E-Mail</td><td style="padding:8px;border-bottom:1px solid #e4ede9">${email}</td></tr>
          <tr><td style="padding:8px;background:#f7faf9;font-weight:600">Plan</td><td style="padding:8px;border-bottom:1px solid #e4ede9"><strong>${planName} (${billing})</strong></td></tr>
          <tr><td style="padding:8px;background:#f7faf9;font-weight:600">Preis</td><td style="padding:8px">${planPrice}</td></tr>
        </table>
        <p style="margin-top:16px;font-size:13px">Stripe Session: ${session.id}</p>
      </div>`
    )

    // Welcome email to customer
    const dashboardNote = plan !== 'starter'
      ? `<p style="color:#4B5563;line-height:1.7;">✅ Als <strong>${planName}</strong>-Kunde erhalten Sie zusätzlich ein persönliches Dashboard — den Link senden wir Ihnen nach dem Setup.</p>`
      : ''

    await sendEmail(email,
      `Willkommen bei OpenClaw Hosting – Ihr ${planName}-Plan ist aktiv 🎉`,
      `<div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
        <h2 style="font-size:22px;margin-bottom:8px">Willkommen, ${name.split(' ')[0]}! 👋</h2>
        <p style="color:#4B5563;line-height:1.7;">Ihre Zahlung war erfolgreich. Sie haben den <strong>${planName}-Plan</strong> gebucht (${planPrice}).</p>
        <div style="background:#E6F7F2;border:1px solid #b2dfd4;border-radius:10px;padding:16px 20px;margin:20px 0;font-size:14px;color:#1E3329;line-height:1.8;">
          <strong>Nächster Schritt:</strong><br/>
          Füllen Sie jetzt das Onboarding-Formular aus (ca. 5 Min.) — Ihr Server wird vollautomatisch eingerichtet, in der Regel innerhalb von 30 Minuten:<br/>
          <a href="https://hosting.openclaw-consulting.ch/onboarding?plan=${plan}" style="display:inline-block;margin-top:12px;background:#12A878;color:#fff;padding:8px 20px;border-radius:8px;text-decoration:none;font-weight:700">Onboarding-Formular ausfüllen →</a>
        </div>
        ${dashboardNote}
        <p style="color:#4B5563;line-height:1.7;">Fragen? <a href="mailto:support@openclaw-consulting.ch" style="color:#12A878;">support@openclaw-consulting.ch</a></p>
        <p style="color:#4B5563;">Freundliche Grüsse,<br/>OpenClaw Hosting</p>
        <hr style="border:none;border-top:1px solid #E4EDE9;margin:24px 0"/>
        <p style="font-size:12px;color:#9ca3af">Alexandra Gosteli Digital Solutions · Truttikon, Schweiz · <a href="https://hosting.openclaw-consulting.ch/datenschutz" style="color:#9ca3af">Datenschutz</a></p>
      </div>`
    )
  }

  // ── Subscription cancelled ───────────────────────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const plan = subscription.metadata?.plan || 'unknown'
    const planName = plan === 'starter' ? 'Starter' : plan === 'pro' ? 'Pro' : 'Business'

    // Try to get customer email
    let email = ''
    let name = ''
    try {
      const stripe = getStripe()
      const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer
      email = customer.email || ''
      name = customer.name || email
    } catch (e) {
      console.error('Could not retrieve customer:', e)
    }

    // Trigger auto-cancel via provisioning API
    if (email) {
      try {
        const cancelResp = await fetch(`${PROVISION_API_URL}/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-provision-secret': PROVISION_SECRET },
          body: JSON.stringify({ email }),
        })
        const cancelData = await cancelResp.json().catch(() => ({}))
        console.log('Auto-cancel triggered:', email, cancelData)
      } catch (e) {
        console.error('Auto-cancel API call failed:', e)
      }
    }

    // Notify Ricci
    await sendEmail(NOTIFY_EMAIL,
      `❌ Abo gekündigt: ${name} (${planName})`,
      `<div style="font-family:sans-serif">
        <h2>OpenClaw Hosting — Abo gekündigt</h2>
        <p><strong>${name}</strong> (${email}) hat den ${planName}-Plan gekündigt.</p>
        <p style="margin-top:16px;color:#15803d">✅ Server-Löschung automatisch ausgelöst.</p>
        <p style="color:#6b7280;font-size:13px">Falls der Server nicht gelöscht wurde, manuelle Löschung über Infomaniak erforderlich.</p>
      </div>`
    )

    // Cancellation confirmation to customer
    if (email) {
      const endDate = new Date(subscription.current_period_end * 1000).toLocaleDateString('de-CH', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
      await sendEmail(email,
        `Ihr OpenClaw ${planName}-Abo wurde gekündigt`,
        `<div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
          <h2 style="font-size:22px;margin-bottom:8px">Kündigung bestätigt</h2>
          <p style="color:#4B5563;line-height:1.7;">Hallo ${name.split(' ')[0]},</p>
          <p style="color:#4B5563;line-height:1.7;">Ihre Kündigung für den <strong>${planName}-Plan</strong> wurde erfolgreich verarbeitet.</p>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:16px 20px;margin:20px 0;font-size:14px;color:#7F1D1D;line-height:1.8;">
            <strong>Ihr Zugang bleibt aktiv bis:</strong><br/>
            📅 ${endDate}<br/><br/>
            Danach wird Ihr Server automatisch gelöscht und alle Daten werden unwiderruflich entfernt.
          </div>
          <p style="color:#4B5563;line-height:1.7;">Möchten Sie Ihren Assistenten trotzdem weiter nutzen? Sie können Ihr Abo jederzeit reaktivieren:</p>
          <a href="https://hosting.openclaw-consulting.ch" style="display:inline-block;margin:8px 0 20px;background:#12A878;color:#fff;padding:8px 20px;border-radius:8px;text-decoration:none;font-weight:700">Abo reaktivieren →</a>
          <p style="color:#4B5563;line-height:1.7;">Fragen? <a href="mailto:support@openclaw-consulting.ch" style="color:#12A878;">support@openclaw-consulting.ch</a></p>
          <p style="color:#4B5563;">Freundliche Grüsse,<br/>OpenClaw Hosting</p>
          <hr style="border:none;border-top:1px solid #E4EDE9;margin:24px 0"/>
          <p style="font-size:12px;color:#9ca3af">Alexandra Gosteli Digital Solutions · Truttikon, Schweiz · <a href="https://hosting.openclaw-consulting.ch/datenschutz" style="color:#9ca3af">Datenschutz</a></p>
        </div>`
      )
    }
  }

  return NextResponse.json({ ok: true })
}
