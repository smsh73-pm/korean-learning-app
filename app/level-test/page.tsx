'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Brain, Target, Clock, CheckCircle } from 'lucide-react'

interface Question {
  id: string
  type: 'multiple-choice' | 'fill-in-blank' | 'audio' | 'speaking'
  question: string
  options?: string[]
  correctAnswer: string | number
  level: number
  skill: 'reading' | 'writing' | 'listening' | 'speaking' | 'grammar' | 'vocabulary' | 'culture'
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What does "안녕하세요" mean?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
    correctAnswer: 0,
    level: 1,
    skill: 'reading',
  },
  {
    id: '2',
    type: 'fill-in-blank',
    question: 'Complete: 저는 ___ 입니다. (I am a student)',
    options: ['학생', '선생님', '의사', '엔지니어'],
    correctAnswer: 0,
    level: 1,
    skill: 'writing',
  },
  {
    id: '3',
    type: 'multiple-choice',
    question: 'Which particle is used for the subject in "저는 학생입니다"?',
    options: ['은', '는', '을', '를'],
    correctAnswer: 1,
    level: 2,
    skill: 'grammar',
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: 'What is the polite form of "가다" (to go)?',
    options: ['가요', '가세요', '가십니다', '가시다'],
    correctAnswer: 0,
    level: 2,
    skill: 'grammar',
  },
  {
    id: '5',
    type: 'fill-in-blank',
    question: 'Complete: 오늘 날씨가 ___ 좋습니다. (Today the weather is very good)',
    options: ['매우', '조금', '너무', '정말'],
    correctAnswer: 0,
    level: 3,
    skill: 'vocabulary',
  },
]

export default function LevelTestPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<{ level: number; score: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const currentQ = sampleQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Calculate score and determine level
    let correctAnswers = 0
    sampleQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctAnswers++
      }
    })
    
    const score = (correctAnswers / sampleQuestions.length) * 100
    let level = 1
    
    if (score >= 80) level = 3
    else if (score >= 60) level = 2
    else level = 1
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setResult({ level, score })
    setIsCompleted(true)
    setIsLoading(false)
  }

  const handleStartLearning = () => {
    router.push('/dashboard')
  }

  if (isCompleted && result) {
    return (
      <div className="min-h-screen bg-primary-gray p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary-coral rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Level Test Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary-coral">
                  Level {result.level}
                </div>
                <div className="text-lg text-gray-600">
                  Your Korean proficiency level
                </div>
                <div className="text-2xl font-semibold">
                  {result.score.toFixed(0)}% Score
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Your Learning Path:</h3>
                <p className="text-gray-600">
                  {result.level === 1 && "Start with Hangeul basics and essential vocabulary"}
                  {result.level === 2 && "Focus on grammar patterns and conversation skills"}
                  {result.level === 3 && "Advanced grammar and cultural understanding"}
                </p>
              </div>

              <Button onClick={handleStartLearning} className="w-full" size="lg">
                Start Learning Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-gray flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-lg text-gray-600">Analyzing your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-gray p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary-coral" />
              <span>Korean Level Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>~15 minutes</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-coral h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQ.type === 'multiple-choice' && (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      answers[currentQ.id] === index
                        ? 'border-primary-coral bg-primary-coral/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === 'fill-in-blank' && (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      answers[currentQ.id] === index
                        ? 'border-primary-coral bg-primary-coral/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={answers[currentQ.id] === undefined}
              >
                {currentQuestion === sampleQuestions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-primary-sage/10 border-primary-sage/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-primary-sage mt-0.5" />
              <div>
                <h4 className="font-semibold text-primary-sage">Assessment Tips</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Answer honestly based on your current knowledge. This helps us create the perfect learning path for you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
