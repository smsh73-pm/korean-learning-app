import { NextRequest, NextResponse } from 'next/server'
import { CurriculumService } from '@/lib/curriculum-service'

export async function POST(request: NextRequest) {
  try {
    const { userLevel, goal, preferences } = await request.json()

    if (!userLevel || !goal) {
      return NextResponse.json(
        { error: 'Missing required parameters: userLevel and goal' },
        { status: 400 }
      )
    }

    const curriculum = CurriculumService.generateCurriculum(
      userLevel,
      goal,
      preferences || {
        studyTimePerDay: 30,
        focusAreas: [],
        learningStyle: 'mixed',
      }
    )

    return NextResponse.json({ curriculum })
  } catch (error) {
    console.error('Curriculum generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate curriculum' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const learningGoals = CurriculumService.getLearningGoals()
    return NextResponse.json({ learningGoals })
  } catch (error) {
    console.error('Learning goals fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch learning goals' },
      { status: 500 }
    )
  }
}
