import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // First create/get the counter
    const createRes = await fetch(
      'https://api.countapi.xyz/create?namespace=wubennao.com&key=visits&value=0&enableReset=1',
      { cache: 'no-store' }
    )
    if (!createRes.ok) throw new Error('Create failed')
    await createRes.json()

    // Then hit to increment
    const hitRes = await fetch(
      'https://api.countapi.xyz/hit/wubennao.com/visits',
      { cache: 'no-store' }
    )
    if (!hitRes.ok) throw new Error('Hit failed')
    const data = await hitRes.json()

    return NextResponse.json({ count: data.value })
  } catch (error) {
    console.error('Visits API error:', error)
    return NextResponse.json({ count: null, error: 'Failed to fetch' }, { status: 500 })
  }
}
