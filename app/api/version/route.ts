import { NextResponse } from 'next/server'

// UPDATE THIS to push a new version to all customers
// Set breaking: true to show a warning before the update button
export const LATEST = {
  version: '2026.3.23-2',
  stable: true,
  testedAt: '2026-03-24',
  notes: 'Stable release. Fix: ClawHub-Installationen, Web-Suche verbessert.',
  breaking: false,
  minDowntime: '~30 Sekunden (Neustart)',
}

export async function GET() {
  return NextResponse.json(LATEST, {
    headers: { 'Cache-Control': 'no-store' }
  })
}
