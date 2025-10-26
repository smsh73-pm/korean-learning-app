'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CurriculumService } from '@/lib/curriculum-service'
import { LearningGoal } from '@/types'
import { 
  Target, 
  Clock, 
  BookOpen, 
  Users, 
  GraduationCap,
  Briefcase,
  Heart,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const learningGoals = CurriculumService.getLearningGoals()

const goalIcons = {
  topik: GraduationCap,
  university: BookOpen,
  career: Briefcase,
  marriage: Heart,
  general: Star,
}

export default function CurriculumPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState<string>('')
  const [studyTime, setStudyTime] = useState<number>(30)
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  const [learningStyle, setLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic' | 'mixed'>('mixed')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCurriculum, setGeneratedCurriculum] = useState<any>(null)

  const focusAreaOptions = [
    '문법', '어휘', '발음', '듣기', '읽기', '쓰기', '말하기', '문화'
  ]

  const handleFocusAreaToggle = (area: string) => {
    setFocusAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    )
  }

  const handleGenerateCurriculum = async () => {
    if (!selectedGoal || !session?.user?.koreanLevel) return

    setIsGenerating(true)
    
    // Simulate AI generation time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const curriculum = CurriculumService.generateCurriculum(
      session.user.koreanLevel,
      selectedGoal as any,
      {
        studyTimePerDay: studyTime,
        focusAreas,
        learningStyle,
      }
    )
    
    setGeneratedCurriculum(curriculum)
    setIsGenerating(false)
  }

  if (generatedCurriculum) {
    return (
      <div className="min-h-screen bg-primary-gray p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Success Header */}
          <Card className="gradient-bg text-white">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">맞춤형 커리큘럼 생성 완료!</h1>
              <p className="text-white/80">{generatedCurriculum.title}</p>
            </CardContent>
          </Card>

          {/* Curriculum Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary-coral" />
                <span>학습 계획 개요</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-8 h-8 text-primary-sage mx-auto mb-2" />
                  <div className="text-lg font-semibold">{generatedCurriculum.estimatedDuration}일</div>
                  <div className="text-sm text-gray-600">예상 학습 기간</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-korean-hanbok mx-auto mb-2" />
                  <div className="text-lg font-semibold">{generatedCurriculum.lessons.length}개</div>
                  <div className="text-sm text-gray-600">총 레슨 수</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-korean-yellow mx-auto mb-2" />
                  <div className="text-lg font-semibold">Level {generatedCurriculum.level}</div>
                  <div className="text-sm text-gray-600">현재 레벨</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons List */}
          <Card>
            <CardHeader>
              <CardTitle>학습 계획</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedCurriculum.lessons.map((lesson: any, index: number) => (
                  <div key={lesson.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-primary-coral text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.estimatedTime}분</span>
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          {lesson.type}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          난이도 {lesson.difficulty}/5
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      시작하기
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button 
              onClick={() => setGeneratedCurriculum(null)}
              variant="outline"
              className="flex-1"
            >
              다시 생성하기
            </Button>
            <Button 
              onClick={() => router.push('/learn')}
              className="flex-1"
            >
              학습 시작하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-gray p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            맞춤형 커리큘럼 생성
          </h1>
          <p className="text-gray-600">
            당신의 목표와 학습 스타일에 맞는 개인화된 한국어 학습 계획을 만들어드립니다
          </p>
        </div>

        {/* Learning Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary-coral" />
              <span>학습 목표 선택</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {learningGoals.map((goal) => {
                const Icon = goalIcons[goal.id as keyof typeof goalIcons]
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedGoal === goal.id
                        ? 'border-primary-coral bg-primary-coral/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-6 h-6 mt-1 ${
                        selectedGoal === goal.id ? 'text-primary-coral' : 'text-gray-600'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{goal.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                        <div className="text-xs text-gray-500">
                          <div>목표 레벨: {goal.targetLevel}</div>
                          <div>예상 기간: {goal.estimatedDuration}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Study Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-sage" />
              <span>학습 환경 설정</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Daily Study Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                하루 학습 시간 (분)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={studyTime}
                  onChange={(e) => setStudyTime(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-primary-coral min-w-[60px]">
                  {studyTime}분
                </span>
              </div>
            </div>

            {/* Focus Areas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                집중하고 싶은 영역 (복수 선택 가능)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {focusAreaOptions.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleFocusAreaToggle(area)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      focusAreas.includes(area)
                        ? 'bg-primary-coral text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                학습 스타일
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: 'visual', name: '시각적', desc: '이미지와 텍스트' },
                  { id: 'auditory', name: '청각적', desc: '소리와 음성' },
                  { id: 'kinesthetic', name: '체험적', desc: '활동과 실습' },
                  { id: 'mixed', name: '혼합형', desc: '다양한 방법' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setLearningStyle(style.id as any)}
                    className={`p-3 rounded-lg text-sm transition-all ${
                      learningStyle === style.id
                        ? 'bg-primary-sage text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-medium">{style.name}</div>
                    <div className="text-xs opacity-80">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center">
          <Button
            onClick={handleGenerateCurriculum}
            disabled={!selectedGoal || isGenerating}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                커리큘럼 생성 중...
              </>
            ) : (
              <>
                <Target className="w-5 h-5 mr-2" />
                맞춤형 커리큘럼 생성하기
              </>
            )}
          </Button>
        </div>

        {/* Current Level Info */}
        {session?.user?.koreanLevel && (
          <Card className="bg-primary-sage/10 border-primary-sage/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-primary-sage" />
                <div>
                  <h4 className="font-semibold text-primary-sage">현재 레벨 정보</h4>
                  <p className="text-sm text-gray-600">
                    현재 한국어 레벨: <span className="font-semibold">Level {session.user.koreanLevel}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
