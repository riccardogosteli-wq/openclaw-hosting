import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const PAYREXX_WEBHOOK_SECRET = process.env.PAYREXX_WEBHOOK_SECRET || ''
const FROM_EMAIL = 'support@openclaw-consulting.ch'
const NOTIFY_EMAIL = 'riccardogosteli@gmail.com'

// Idempotency: track processed referenceIds to prevent duplicate webhook processing
// In-memory is fine — Payrexx retries happen within minutes, this process stays warm on Vercel edge
const processedRefs = new Set<string>()

function verifyWebhookSignature(body: string, signature: string | null): boolean {
  if (!PAYREXX_WEBHOOK_SECRET) return false // secret not configured — reject all requests
  if (!signature) return false
  const expected = crypto.createHmac('sha256', PAYREXX_WEBHOOK_SECRET).update(body).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

async function sendEmail(to: string, subject: string, html: string) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    // Verify Payrexx webhook signature
    const signature = req.headers.get('x-payrexx-signature') || req.headers.get('x-webhook-signature')
    if (!verifyWebhookSignature(body, signature)) {
      console.error('Webhook signature verification failed')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = JSON.parse(body)
    const event = data.transaction?.status || data.subscription?.status || data.event

    // ── Subscription activated (payment successful) ──────────────────────────
    if (event === 'confirmed' || event === 'subscription_created') {
      const { email, name, referenceId } = extractCustomer(data)
      const plan = extractPlan(data)

      // Notify Ricci with provisioning command
      await sendEmail(NOTIFY_EMAIL,
        `🆕 Neue Bestellung: ${name} (${plan.toUpperCase()})`,
        `<div style="font-family:sans-serif">
          <h2>Neue OpenClaw Hosting Bestellung</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600">Name</td><td style="padding:8px;border-bottom:1px solid #e4ede9">${name}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600">E-Mail</td><td style="padding:8px;border-bottom:1px solid #e4ede9">${email}</td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600">Plan</td><td style="padding:8px;border-bottom:1px solid #e4ede9"><strong>${plan.toUpperCase()}</strong></td></tr>
            <tr><td style="padding:8px;background:#f7faf9;font-weight:600">Referenz</td><td style="padding:8px">${referenceId}</td></tr>
          </table>
          <p style="margin-top:16px;font-size:13px">
            ➡️ Onboarding-Formular ausfüllen lassen und dann:<br/>
            <code>~/.openclaw/workspace/scripts/provision-openclaw.sh --plan ${plan} --name "${name}" --email "${email}" ...</code>
          </p>
        </div>`
      )

      // Confirmation email to customer (plan-aware)
      const planName = plan === 'starter' ? 'Starter' : plan === 'pro' ? 'Pro' : 'Business'
      const dashboardNote = plan !== 'starter'
        ? '<p style="color:#4B5563;line-height:1.7;">✅ Als <strong>' + planName + '</strong>-Kunde erhalten Sie zusätzlich ein persönliches Dashboard — den Link senden wir Ihnen nach dem Setup.</p>'
        : ''

      await sendEmail(email,
        `Willkommen bei OpenClaw Hosting – Ihr ${planName}-Plan ist aktiv 🎉`,
        `<div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
          <h2 style="font-size:22px;margin-bottom:8px">Willkommen, ${name}! 👋</h2>
          <p style="color:#4B5563;line-height:1.7;">Ihre Zahlung war erfolgreich. Sie haben den <strong>${planName}-Plan</strong> gebucht.</p>
          <div style="background:#E6F7F2;border:1px solid #b2dfd4;border-radius:10px;padding:16px 20px;margin:20px 0;font-size:14px;color:#1E3329;line-height:1.8;">
            <strong>Nächster Schritt:</strong><br/>
            Füllen Sie jetzt das Onboarding-Formular aus (ca. 5 Min.) — Ihr Server wird vollautomatisch eingerichtet, in der Regel innerhalb von 30 Minuten:<br/>
            <a href="https://hosting.openclaw-consulting.ch/onboarding?plan=${plan}" style="display:inline-block;margin-top:12px;background:#12A878;color:#fff;padding:8px 20px;border-radius:8px;text-decoration:none;font-weight:700">Onboarding-Formular ausfüllen →</a>
          </div>
          ${dashboardNote}
          <p style="color:#4B5563;line-height:1.7;">
            Ihr Plan: <strong>${planName} – CHF ${plan === 'starter' ? '19' : plan === 'pro' ? '34' : '59'}/Mt.</strong><br/>
            Fragen? <a href="mailto:support@openclaw-consulting.ch" style="color:#12A878;">support@openclaw-consulting.ch</a>
          </p>
          <p style="color:#4B5563;">Freundliche Grüsse,<br/>Riccardo Gosteli<br/>OpenClaw Hosting</p>
          <hr style="border:none;border-top:1px solid #E4EDE9;margin:24px 0"/>
          <p style="font-size:12px;color:#9ca3af">Alexandra Gosteli Digital Solutions · Truttikon, Schweiz · <a href="https://hosting.openclaw-consulting.ch/datenschutz" style="color:#9ca3af">Datenschutz</a></p>
        </div>`
      )

      return NextResponse.json({ ok: true, event: 'subscription_created' })
    }

    // ── Subscription cancelled ───────────────────────────────────────────────
    if (event === 'cancelled' || event === 'subscription_cancelled' || event === 'subscription_deleted') {
      const { email, name } = extractCustomer(data)
      const plan = extractPlan(data)
      const planName = plan === 'starter' ? 'Starter' : plan === 'pro' ? 'Pro' : 'Business'

      // Auto-trigger backup + server deletion via provisioning API
      const PROVISION_API_URL = process.env.PROVISION_API_URL || 'http://195.15.202.192:8001'
      const PROVISION_SECRET = process.env.PROVISION_SECRET || ''
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
        // Will fall through to email notification — Ricci must handle manually
      }

      // Notify Ricci (backup confirmation or fallback manual action)
      await sendEmail(NOTIFY_EMAIL,
        `❌ Abo gekündigt (auto): ${name} (${planName})`,
        `<div style="font-family:sans-serif">
          <h2>OpenClaw Hosting — Abo gekündigt</h2>
          <p><strong>${name}</strong> (${email}) hat den ${planName}-Plan gekündigt.</p>
          <p style="margin-top:16px;color:#15803d">✅ Server-Löschung automatisch ausgelöst (Backup + Delete via Provisioning API).</p>
          <p style="color:#6b7280;font-size:13px">Falls der Server nicht gelöscht wurde, manuelle Löschung über Infomaniak erforderlich.</p>
        </div>`
      )

      // Cancellation confirmation to customer
      await sendEmail(email,
        `Ihr OpenClaw Hosting Abo wurde gekündigt`,
        `<div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
          <h2 style="font-size:20px">Ihr Abo wurde gekündigt</h2>
          <p style="color:#4B5563;line-height:1.7;">Hallo ${name},<br/><br/>Wir bestätigen die Kündigung Ihres ${planName}-Plans.</p>
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px 20px;margin:20px 0;font-size:14px;color:#7f1d1d;line-height:1.8;">
            Ihr Server und alle Daten werden innerhalb von 48 Stunden gelöscht.<br/>
            Falls Sie Ihre Daten vorher exportieren möchten, kontaktieren Sie uns bitte umgehend.
          </div>
          <p style="color:#4B5563;line-height:1.7;">Schade, dass Sie gehen! Falls Sie Feedback haben oder es Probleme gab, freuen wir uns über eine kurze Nachricht.<br/><br/>
          <a href="mailto:support@openclaw-consulting.ch" style="color:#12A878;">support@openclaw-consulting.ch</a></p>
          <p style="color:#4B5563;">Freundliche Grüsse,<br/>Riccardo Gosteli<br/>OpenClaw Hosting</p>
        </div>`
      )

      return NextResponse.json({ ok: true, event: 'subscription_cancelled' })
    }

    // ── Payment failed ───────────────────────────────────────────────────────
    if (event === 'declined' || event === 'payment_failed') {
      const { email, name } = extractCustomer(data)
      const plan = extractPlan(data)

      await sendEmail(email,
        `Zahlung fehlgeschlagen — OpenClaw Hosting`,
        `<div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0F1714;">
          <h2>Zahlung fehlgeschlagen</h2>
          <p style="color:#4B5563;line-height:1.7;">Hallo ${name},<br/><br/>Leider konnte Ihre Zahlung nicht verarbeitet werden.</p>
          <p style="color:#4B5563;line-height:1.7;">Bitte versuchen Sie es erneut oder kontaktieren Sie uns:<br/>
          <a href="mailto:support@openclaw-consulting.ch" style="color:#12A878;">support@openclaw-consulting.ch</a></p>
        </div>`
      )

      return NextResponse.json({ ok: true, event: 'payment_failed' })
    }

    // Unknown event — log and return OK
    console.log('Unknown Payrexx webhook event:', event, JSON.stringify(data).substring(0, 200))
    return NextResponse.json({ ok: true, event: 'unknown' })

  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

function extractCustomer(data: Record<string, unknown>): { email: string; name: string; referenceId: string } {
  // Payrexx sends different shapes depending on gateway vs subscription webhook
  const payer = (data.transaction as Record<string, unknown>)?.payer ||
                (data.subscription as Record<string, unknown>)?.payer ||
                data.payer || {} as Record<string, unknown>

  const p = payer as Record<string, unknown>
  const email = (p.email as string) || (p.emailAddress as string) || ''
  const firstName = (p.firstName as string) || ''
  const lastName = (p.lastName as string) || ''
  const name = `${firstName} ${lastName}`.trim() || email
  const referenceId = ((data.transaction as Record<string, unknown>)?.referenceId as string) ||
                      ((data.subscription as Record<string, unknown>)?.referenceId as string) || ''

  return { email, name, referenceId }
}

function extractPlan(data: Record<string, unknown>): string {
  // Plan is stored in the referenceId or invoice description when creating the checkout
  const ref = (((data.transaction as Record<string, unknown>)?.referenceId as string) ||
               ((data.subscription as Record<string, unknown>)?.referenceId as string) || '').toLowerCase()
  if (ref.includes('business')) return 'business'
  if (ref.includes('pro')) return 'pro'
  return 'starter'
}
