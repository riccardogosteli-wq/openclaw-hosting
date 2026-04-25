import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Payrexx webhook is disabled. OpenClaw Hosting uses Stripe.' },
    { status: 410 },
  )
}
