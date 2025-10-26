import { NextRequest, NextResponse } from 'next/server'
import { AIOrchestrator } from '@/lib/ai-services'

export async function POST(request: NextRequest) {
  try {
    const { userLevel, skill, topic } = await request.json()

    if (!userLevel || !skill || !topic) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const lesson = await AIOrchestrator.generatePersonalizedLesson(
      userLevel,
      skill,
      topic
    )

    return NextResponse.json({ lesson })
  } catch (error) {
    console.error('Lesson API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate lesson' },
      { status: 500 }
    )
  }
}
