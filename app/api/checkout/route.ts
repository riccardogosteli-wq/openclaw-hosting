import { NextRequest, NextResponse } from 'next/server'

const PAYREXX_INSTANCE = process.env.PAYREXX_INSTANCE || ''
const PAYREXX_API_KEY = process.env.PAYREXX_API_KEY || ''
const BASE_URL = 'https://hosting.openclaw-consulting.ch'

const PLANS: Record<string, { monthly: number; annual: number; name: string }> = {
  starter:  { monthly: 1900,  annual: 18000, name: 'OpenClaw Starter' },
  pro:      { monthly: 3400,  annual: 32000, name: 'OpenClaw Pro' },
  business: { monthly: 5900,  annual: 56000, name: 'OpenClaw Business' },
}

export async function POST(req: NextRequest) {
  try {
    const { plan, billing, lang } = await req.json()
    const safeLang = ['de','en','fr'].includes(lang) ? lang : 'de'

    if (!PLANS[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    if (!PAYREXX_INSTANCE || !PAYREXX_API_KEY) {
      console.error('Payrexx not configured')
      return NextResponse.json({ error: 'Zahlungsanbieter nicht konfiguriert' }, { status: 500 })
    }

    const planInfo = PLANS[plan]
    const isAnnual = billing === 'annual'
    const amount = isAnnual ? planInfo.annual : planInfo.monthly
    const interval = isAnnual ? 'P1Y' : 'P1M'
    const referenceId = `${plan}-${billing || 'monthly'}`


    const response = await fetch(
      `https://api.payrexx.com/v1/Gateway/?instance=${PAYREXX_INSTANCE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': PAYREXX_API_KEY,
        },
        body: JSON.stringify({
          amount,
          currency: 'CHF',
          title: planInfo.name,
          description: isAnnual ? `${planInfo.name} — Jahresabo` : `${planInfo.name} — Monatsabo`,
          successRedirectUrl: `${BASE_URL}/success?plan=${plan}&billing=${billing || 'monthly'}&lang=${safeLang}`,
          failedRedirectUrl: `${BASE_URL}/cancel`,
          cancelRedirectUrl: `${BASE_URL}/cancel`,
          referenceId,
          sku: referenceId,
          subscriptionState: 1,
          subscriptionInterval: interval,
          subscriptionPeriod: interval,
          subscriptionCancellationInterval: 'P1M',
        }),
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
