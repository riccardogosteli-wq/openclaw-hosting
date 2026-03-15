import { NextRequest, NextResponse } from 'next/server'

const PAYREXX_INSTANCE = process.env.PAYREXX_INSTANCE || 'cleverli'
const PAYREXX_API_KEY = process.env.PAYREXX_API_KEY || '7aMLk1381W7xpAEVRHNuBKSiBTJb47'
const BASE_URL = 'https://hosting.openclaw-consulting.ch'

const PLANS: Record<string, { monthly: number; annual: number; name: string }> = {
  starter:  { monthly: 1900,  annual: 18000, name: 'OpenClaw Starter' },
  pro:      { monthly: 3400,  annual: 32000, name: 'OpenClaw Pro' },
  business: { monthly: 5900,  annual: 56000, name: 'OpenClaw Business' },
}

export async function POST(req: NextRequest) {
  try {
    const { plan, billing } = await req.json()

    if (!PLANS[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const planInfo = PLANS[plan]
    const isAnnual = billing === 'annual'
    const amount = isAnnual ? planInfo.annual : planInfo.monthly
    const interval = isAnnual ? 'P1Y' : 'P1M'
    const referenceId = `${plan}-${billing || 'monthly'}`

    // Build Payrexx Gateway payload
    const params = new URLSearchParams()
    params.append('amount', String(amount))
    params.append('currency', 'CHF')
    params.append('sku', referenceId)
    params.append('referenceId', referenceId)
    params.append('vatRate', '0')
    params.append('successRedirectUrl', `${BASE_URL}/success?plan=${plan}&billing=${billing || 'monthly'}`)
    params.append('failedRedirectUrl', `${BASE_URL}/cancel`)
    params.append('cancelRedirectUrl', `${BASE_URL}/cancel`)

    // Subscription parameters
    params.append('subscriptionState', '1')
    params.append('subscriptionInterval', interval)
    params.append('subscriptionPeriod', interval)
    params.append('subscriptionCancellationInterval', 'P1M')

    // Product description
    params.append('basket[0][name]', planInfo.name)
    params.append('basket[0][description]', isAnnual
      ? `${planInfo.name} — Jahresabo`
      : `${planInfo.name} — Monatsabo`)
    params.append('basket[0][quantity]', '1')
    params.append('basket[0][amount]', String(amount))
    params.append('basket[0][vatRate]', '0')

    // Sign with API key
    const crypto = await import('crypto')
    const apiSignature = crypto.createHmac('sha256', PAYREXX_API_KEY).update(params.toString()).digest('base64')
    params.append('ApiSignature', apiSignature)

    const response = await fetch(
      `https://api.payrexx.com/v1/Gateway/?instance=${PAYREXX_INSTANCE}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }
    )

    const data = await response.json()

    if (data.status !== 'success' || !data.data?.[0]?.link) {
      console.error('Payrexx error:', JSON.stringify(data))
      return NextResponse.json({ error: 'Fehler beim Erstellen der Zahlung' }, { status: 500 })
    }

    return NextResponse.json({ checkoutUrl: data.data[0].link })

  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
