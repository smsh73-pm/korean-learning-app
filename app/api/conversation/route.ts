import { NextRequest, NextResponse } from 'next/server'
import { AIOrchestrator } from '@/lib/ai-services'

export async function POST(request: NextRequest) {
  try {
    const { partnerType, userLevel, topic } = await request.json()

    if (!partnerType || !userLevel || !topic) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const response = await AIOrchestrator.getConversationPartner(
      partnerType,
      userLevel,
      topic
    )

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Conversation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate conversation' },
      { status: 500 }
    )
  }
}
