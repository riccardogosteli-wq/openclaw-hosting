import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'

// Generate a short-lived signed payment token so onboarding can verify the user actually paid
export function generatePaymentToken(plan: string, billing: string): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET || process.env.PAYREXX_WEBHOOK_SECRET || ''
  if (!secret) return ''
  const ts = Math.floor(Date.now() / 1000)
  const payload = `${plan}:${billing}:${ts}`
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex').slice(0, 16)
  return Buffer.from(`${payload}:${sig}`).toString('base64url')
}

export function verifyPaymentToken(token: string): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET || process.env.PAYREXX_WEBHOOK_SECRET || ''
  if (!secret || !token) return false
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const parts = decoded.split(':')
    if (parts.length !== 4) return false
    const [plan, billing, tsStr, sig] = parts
    const ts = parseInt(tsStr)
    const age = Math.floor(Date.now() / 1000) - ts
    if (age > 86400) return false
    const payload = `${plan}:${billing}:${tsStr}`
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex').slice(0, 16)
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(ip: string, maxPerMinute = 5): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  entry.count++
  return entry.count <= maxPerMinute
}
function getClientIp(req: NextRequest): string {
  return req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0'
}

const BASE_URL = 'https://hosting.openclaw-consulting.ch'

// Stripe Price IDs (live)
const PRICE_IDS: Record<string, { monthly: string; annual: string; name: string }> = {
  starter:  { monthly: 'price_1TEQoqDGUBi3vyUQIb4iafh2', annual: 'price_1TEQisDGUBi3vyUQe1nuBBCU', name: 'OpenClaw Starter' },
  pro:      { monthly: 'price_1TEQorDGUBi3vyUQNpBU3DqI', annual: 'price_1TEQiuDGUBi3vyUQ7ZPwLghS', name: 'OpenClaw Pro' },
  business: { monthly: 'price_1TEQosDGUBi3vyUQHNTrqctJ', annual: 'price_1TEQivDGUBi3vyUQdaUPSqTB', name: 'OpenClaw Business' },
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests — please wait a moment' }, { status: 429 })
  }

  try {
    const { plan, billing, lang } = await req.json()
    const safeLang = (['de', 'en'] as string[]).includes(lang) ? (lang as string) : 'de'

    if (!PRICE_IDS[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const planInfo = PRICE_IDS[plan]
    const isAnnual = billing === 'annual'
    const priceId = isAnnual ? planInfo.annual : planInfo.monthly

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: ['card'],
      success_url: `${BASE_URL}/success?plan=${plan}&billing=${billing || 'monthly'}&lang=${safeLang}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      metadata: {
        plan,
        billing: billing || 'monthly',
        site: 'openclaw-hosting',
      },
      subscription_data: {
        metadata: {
          plan,
          billing: billing || 'monthly',
          site: 'openclaw-hosting',
        },
      },
    })

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
