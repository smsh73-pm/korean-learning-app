import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      koreanLevel?: number
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    koreanLevel?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    koreanLevel?: number
  }
}

export interface KoreanLevel {
  level: number
  name: string
  description: string
  vocabulary: number
  grammar: string[]
  skills: string[]
}

export interface LearningGoal {
  id: string
  name: string
  description: string
  targetLevel: number
  estimatedDuration: string
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'fill-in-blank' | 'audio' | 'speaking'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation?: string
  audioUrl?: string
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  audioUrl?: string
}

export interface KContentItem {
  id: string
  title: string
  type: 'kpop' | 'kdrama' | 'cuisine' | 'variety' | 'travel'
  youtubeId?: string
  description?: string
  level: number
  vocabulary?: string[]
  culturalNotes?: string[]
}

export interface ProgressData {
  skill: 'reading' | 'writing' | 'listening' | 'speaking' | 'culture'
  level: number
  score: number
  completedAt: Date
}

export interface Achievement {
  id: string
  type: 'streak' | 'level' | 'quiz' | 'conversation' | 'special'
  title: string
  description: string
  icon: string
  earnedAt: Date
}

export interface Curriculum {
  id: string
  userId: string
  title: string
  description: string
  level: number
  goal: 'topik' | 'university' | 'career' | 'marriage' | 'general'
  estimatedDuration: number // in days
  lessons: CurriculumLesson[]
  progress: number // percentage
  createdAt: Date
  updatedAt: Date
}

export interface CurriculumLesson {
  id: string
  title: string
  description: string
  type: 'vocabulary' | 'grammar' | 'conversation' | 'reading' | 'writing' | 'listening' | 'culture'
  difficulty: number // 1-5
  estimatedTime: number // in minutes
  prerequisites: string[] // lesson IDs
  objectives: string[]
  content: LessonContent
  isCompleted: boolean
  order: number
}

export interface LessonContent {
  vocabulary?: string[]
  grammar?: string[]
  exercises?: Exercise[]
  culturalNotes?: string[]
  audioFiles?: string[]
  readingText?: string
  conversationScripts?: ConversationScript[]
}

export interface Exercise {
  id: string
  type: 'multiple-choice' | 'fill-in-blank' | 'matching' | 'speaking' | 'listening'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation?: string
  audioUrl?: string
}

export interface ConversationScript {
  id: string
  title: string
  participants: string[]
  lines: ConversationLine[]
}

export interface ConversationLine {
  speaker: string
  text: string
  translation?: string
  audioUrl?: string
}

export interface LearningGoal {
  id: string
  name: string
  description: string
  targetLevel: number
  estimatedDuration: string
  requirements: string[]
  benefits: string[]
}
