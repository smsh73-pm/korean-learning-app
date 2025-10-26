'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock,
  Star,
  Clock,
  Target
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  description: string
  level: number
  skill: 'reading' | 'writing' | 'listening' | 'speaking' | 'culture'
  duration: string
  isCompleted: boolean
  isLocked: boolean
  order: number
}

const sampleLessons: Lesson[] = [
  {
    id: '1',
    title: 'Hangeul Basics',
    description: 'Learn the Korean alphabet and basic pronunciation',
    level: 1,
    skill: 'reading',
    duration: '15 min',
    isCompleted: true,
    isLocked: false,
    order: 1,
  },
  {
    id: '2',
    title: 'Greetings and Introductions',
    description: 'Essential Korean greetings and self-introduction phrases',
    level: 1,
    skill: 'speaking',
    duration: '20 min',
    isCompleted: false,
    isLocked: false,
    order: 2,
  },
  {
    id: '3',
    title: 'Numbers and Counting',
    description: 'Korean number system and counting methods',
    level: 1,
    skill: 'reading',
    duration: '18 min',
    isCompleted: false,
    isLocked: false,
    order: 3,
  },
  {
    id: '4',
    title: 'Family Members',
    description: 'Vocabulary for family relationships and titles',
    level: 1,
    skill: 'vocabulary',
    duration: '22 min',
    isCompleted: false,
    isLocked: true,
    order: 4,
  },
  {
    id: '5',
    title: 'Basic Grammar Patterns',
    description: 'Introduction to Korean sentence structure',
    level: 2,
    skill: 'grammar',
    duration: '25 min',
    isCompleted: false,
    isLocked: true,
    order: 5,
  },
]

export default function LearnPage() {
  const { t } = useLanguage()
  const [selectedSkill, setSelectedSkill] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<number>(1)

  const skills = [
    { id: 'all', name: 'All Skills', icon: BookOpen },
    { id: 'reading', name: 'Reading', icon: BookOpen },
    { id: 'writing', name: 'Writing', icon: BookOpen },
    { id: 'listening', name: 'Listening', icon: Play },
    { id: 'speaking', name: 'Speaking', icon: Play },
    { id: 'culture', name: 'Culture', icon: Star },
  ]

  const filteredLessons = sampleLessons.filter(lesson => {
    const skillMatch = selectedSkill === 'all' || lesson.skill === selectedSkill
    const levelMatch = lesson.level === selectedLevel
    return skillMatch && levelMatch
  })

  const getSkillColor = (skill: string) => {
    const colors = {
      reading: 'bg-blue-100 text-blue-800',
      writing: 'bg-green-100 text-green-800',
      listening: 'bg-purple-100 text-purple-800',
      speaking: 'bg-orange-100 text-orange-800',
      culture: 'bg-pink-100 text-pink-800',
      vocabulary: 'bg-yellow-100 text-yellow-800',
      grammar: 'bg-red-100 text-red-800',
    }
    return colors[skill as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-primary-gray p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learn Korean
          </h1>
          <p className="text-gray-600">
            Master Korean step by step with structured lessons
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="gradient-bg text-white">
          <CardHeader>
            <CardTitle className="text-white">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-white/80">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Level 1</div>
                <div className="text-sm text-white/80">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15min</div>
                <div className="text-sm text-white/80">Study Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Filter by Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill) => {
                const Icon = skill.icon
                return (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill.id)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                      selectedSkill === skill.id
                        ? 'border-primary-coral bg-primary-coral/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Level Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Select Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedLevel === level
                      ? 'border-primary-coral bg-primary-coral text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Level {level}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Lessons</h2>
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className={lesson.isLocked ? 'opacity-60' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(lesson.skill)}`}>
                        {lesson.skill}
                      </span>
                      {lesson.isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {lesson.isLocked && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{lesson.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>Level {lesson.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button
                      variant={lesson.isCompleted ? "outline" : "primary"}
                      disabled={lesson.isLocked}
                      className="min-w-[100px]"
                    >
                      {lesson.isCompleted ? 'Review' : lesson.isLocked ? 'Locked' : 'Start'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Study Tips */}
        <Card className="bg-primary-sage/10 border-primary-sage/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-primary-sage mt-0.5" />
              <div>
                <h4 className="font-semibold text-primary-sage">Study Tip</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Complete lessons in order to unlock advanced content. Each lesson builds upon the previous one.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
