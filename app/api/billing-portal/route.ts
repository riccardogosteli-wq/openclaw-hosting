import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const BASE_URL = 'https://hosting.openclaw-consulting.ch'
const HOSTING_SITE = 'openclaw-hosting'
const HOSTING_PLANS = new Set(['starter', 'pro', 'business'])

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

function getPortalSecret() {
  return process.env.BILLING_PORTAL_SECRET || process.env.PROVISION_SECRET || ''
}

function isAuthorized(req: NextRequest) {
  const secret = getPortalSecret()
  if (!secret) return false

  const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim()
  const headerSecret = req.headers.get('x-billing-portal-secret') || req.headers.get('x-provision-secret')

  return bearer === secret || headerSecret === secret
}

function normalizeReturnUrl(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) return BASE_URL

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return BASE_URL
    return url.toString()
  } catch {
    return BASE_URL
  }
}

function hasHostingMetadata(subscription: Stripe.Subscription) {
  return subscription.metadata?.site === HOSTING_SITE && HOSTING_PLANS.has(subscription.metadata?.plan || '')
}

async function findHostingSubscription(stripe: Stripe, customerId?: string, email?: string) {
  const customerIds = new Set<string>()

  if (customerId) customerIds.add(customerId)

  if (email) {
    const customers = await stripe.customers.search({
      query: `email:"${email.replace(/"/g, '\\"')}"`,
      limit: 10,
    })
    for (const customer of customers.data) {
      if (!customer.deleted) customerIds.add(customer.id)
    }
  }

  const matches: Stripe.Subscription[] = []

  for (const id of customerIds) {
    const subscriptions = await stripe.subscriptions.list({
      customer: id,
      status: 'all',
      limit: 20,
    })

    matches.push(
      ...subscriptions.data.filter((subscription) =>
        ['active', 'trialing', 'past_due', 'unpaid'].includes(subscription.status) &&
        hasHostingMetadata(subscription)
      )
    )
  }

  return matches
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const customerId = typeof body.customerId === 'string' ? body.customerId.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!customerId && !email) {
      return NextResponse.json({ error: 'Missing customerId or email' }, { status: 400 })
    }

    const stripe = getStripe()
    const subscriptions = await findHostingSubscription(stripe, customerId, email)

    if (subscriptions.length === 0) {
      return NextResponse.json({ error: 'No active OpenClaw Hosting subscription found' }, { status: 404 })
    }

    const activeSubscriptions = subscriptions.filter((subscription) => !subscription.cancel_at_period_end)
    const selected = activeSubscriptions[0] || subscriptions[0]
    const uniqueCustomerIds = new Set(subscriptions.map((subscription) => subscription.customer as string))

    if (subscriptions.length > 1 || uniqueCustomerIds.size > 1) {
      return NextResponse.json({
        error: 'Multiple OpenClaw Hosting subscriptions found; use the exact customerId',
        subscriptionIds: subscriptions.map((subscription) => subscription.id),
      }, { status: 409 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: selected.customer as string,
      return_url: normalizeReturnUrl(body.returnUrl),
    })

    return NextResponse.json({
      url: session.url,
      customerId: selected.customer,
      subscriptionId: selected.id,
      status: selected.status,
      cancelAtPeriodEnd: selected.cancel_at_period_end,
    })
  } catch (err) {
    console.error('Billing portal error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
