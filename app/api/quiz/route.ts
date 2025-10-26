import { NextRequest, NextResponse } from 'next/server'
import { OpenAIService } from '@/lib/ai-services'

export async function POST(request: NextRequest) {
  try {
    const { topic, level, count } = await request.json()

    if (!topic || !level) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const questions = await OpenAIService.generateQuizQuestions(
      topic,
      level,
      count || 5
    )

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Quiz API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz questions' },
      { status: 500 }
    )
  }
}
