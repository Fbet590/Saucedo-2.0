import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const response = await fetch(
      'https://services.leadconnectorhq.com/hooks/NnkTF5Tofs6PsscmI4EX/webhook-trigger/d9829cd2-ea23-4f4c-8438-06d7e15ebb2e',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      console.error('Webhook error:', response.status, await response.text())
      return NextResponse.json(
        { error: 'Failed to submit to webhook' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
