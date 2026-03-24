import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const email = session.customer_details?.email || ''
    const name = session.customer_details?.name || ''
    const stripeCustomerId = typeof session.customer === 'string' ? session.customer : ''
    const plan = session.metadata?.plan || ''
    const billing = session.metadata?.billing || 'monthly'
    return NextResponse.json({ email, name, stripeCustomerId, plan, billing })
  } catch {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
}
