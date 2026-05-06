import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Send to LeadConnector webhook
    const leadConnectorPromise = fetch(
      'https://services.leadconnectorhq.com/hooks/NnkTF5Tofs6PsscmI4EX/webhook-trigger/7Vlp4TuiHZ2eDAWkY2m5',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    // Send to Zapier webhook (if configured)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL
    const zapierPromise = zapierWebhookUrl
      ? fetch(zapierWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      : Promise.resolve(null)

    // Wait for both webhooks to complete
    const [leadConnectorResponse, zapierResponse] = await Promise.all([
      leadConnectorPromise,
      zapierPromise,
    ])

    // Check LeadConnector response
    if (!leadConnectorResponse.ok) {
      console.error('LeadConnector webhook error:', leadConnectorResponse.status, await leadConnectorResponse.text())
    }

    // Check Zapier response (if it was sent)
    if (zapierResponse && !zapierResponse.ok) {
      console.error('Zapier webhook error:', zapierResponse.status, await zapierResponse.text())
    }

    // Return success if LeadConnector succeeded (primary webhook)
    if (!leadConnectorResponse.ok) {
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
