import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

// AI Service Types
export interface AIResponse {
  content: string
  model: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// OpenAI GPT-4 Service
export class OpenAIService {
  static async generateResponse(
    messages: ConversationMessage[],
    systemPrompt?: string
  ): Promise<AIResponse> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
          ...messages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      })

      return {
        content: response.choices[0]?.message?.content || '',
        model: 'gpt-4',
        usage: response.usage,
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate response')
    }
  }

  static async generateQuizQuestions(
    topic: string,
    level: number,
    count: number = 5
  ): Promise<any[]> {
    const systemPrompt = `You are a Korean language teacher creating quiz questions for Malaysian learners.
    Create ${count} quiz questions about "${topic}" for level ${level} Korean learners.
    Each question should have:
    - question: The question text
    - options: Array of 4 options
    - correctAnswer: Index of correct answer (0-3)
    - explanation: Brief explanation of the answer
    - type: "multiple-choice" or "fill-in-blank"
    
    Return as JSON array.`

    const response = await this.generateResponse([
      { role: 'user', content: `Create quiz questions for topic: ${topic}, level: ${level}` }
    ], systemPrompt)

    try {
      return JSON.parse(response.content)
    } catch (error) {
      console.error('Failed to parse quiz questions:', error)
      return []
    }
  }
}

// Anthropic Claude Service
export class ClaudeService {
  static async generateResponse(
    messages: ConversationMessage[],
    systemPrompt?: string
  ): Promise<AIResponse> {
    try {
      const response = await anthropic.completions.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens_to_sample: 1000,
        prompt: `${systemPrompt || 'You are a helpful Korean language learning assistant.'}\n\n${messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`,
      })

      return {
        content: response.completion,
        model: 'claude-3-sonnet',
      }
    } catch (error) {
      console.error('Claude API error:', error)
      throw new Error('Failed to generate response')
    }
  }

  static async analyzeKoreanText(
    text: string,
    level: number
  ): Promise<{
    vocabulary: string[]
    grammar: string[]
    culturalNotes: string[]
    difficulty: number
  }> {
    const systemPrompt = `You are a Korean language expert analyzing text for Malaysian learners.
    Analyze the Korean text and provide:
    1. Key vocabulary words with meanings
    2. Grammar patterns used
    3. Cultural context and notes
    4. Difficulty level (1-6)
    
    Return as JSON object.`

    const response = await this.generateResponse([
      { role: 'user', content: `Analyze this Korean text for level ${level} learners:\n\n${text}` }
    ], systemPrompt)

    try {
      return JSON.parse(response.content)
    } catch (error) {
      console.error('Failed to parse text analysis:', error)
      return {
        vocabulary: [],
        grammar: [],
        culturalNotes: [],
        difficulty: level,
      }
    }
  }
}

// Google Gemini Service
export class GeminiService {
  static async generateResponse(
    prompt: string,
    systemPrompt?: string
  ): Promise<AIResponse> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      
      const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt
      const result = await model.generateContent(fullPrompt)
      const response = await result.response
      const text = response.text()

      return {
        content: text,
        model: 'gemini-pro',
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate response')
    }
  }

  static async analyzeKContent(
    content: string,
    contentType: 'kpop' | 'kdrama' | 'cuisine' | 'variety' | 'travel'
  ): Promise<{
    vocabulary: string[]
    culturalInsights: string[]
    learningPoints: string[]
  }> {
    const systemPrompt = `You are a Korean culture expert analyzing ${contentType} content for language learners.
    Extract:
    1. Key Korean vocabulary with English meanings
    2. Cultural insights and context
    3. Learning points for Malaysian students
    
    Return as JSON object.`

    const response = await this.generateResponse(
      `Analyze this ${contentType} content:\n\n${content}`,
      systemPrompt
    )

    try {
      return JSON.parse(response.content)
    } catch (error) {
      console.error('Failed to parse content analysis:', error)
      return {
        vocabulary: [],
        culturalInsights: [],
        learningPoints: [],
      }
    }
  }
}

// AI Orchestration Service
export class AIOrchestrator {
  static async getConversationPartner(
    partnerType: 'friend' | 'teacher' | 'colleague' | 'family' | 'service',
    userLevel: number,
    topic: string
  ): Promise<string> {
    const systemPrompts = {
      friend: `You are a casual Korean friend (친구) who speaks informally and uses current slang. 
      You're encouraging and relaxed. User is level ${userLevel}. Topic: ${topic}`,
      teacher: `You are a respectful Korean teacher (선생님) who speaks formally and educates patiently.
      You explain grammar and culture clearly. User is level ${userLevel}. Topic: ${topic}`,
      colleague: `You are a professional Korean colleague (직장 동료) who speaks business Korean.
      You're collaborative and goal-oriented. User is level ${userLevel}. Topic: ${topic}`,
      family: `You are a warm Korean family member (가족) who speaks intimately and emotionally.
      You're caring and supportive. User is level ${userLevel}. Topic: ${topic}`,
      service: `You are a polite Korean service worker (서비스 직원) who helps customers professionally.
      You're helpful and transaction-focused. User is level ${userLevel}. Topic: ${topic}`,
    }

    try {
      const response = await OpenAIService.generateResponse([
        { role: 'user', content: `Start a conversation about ${topic}` }
      ], systemPrompts[partnerType])

      return response.content
    } catch (error) {
      console.error('Failed to get conversation partner response:', error)
      return '안녕하세요! 오늘 어떤 주제로 대화해볼까요?'
    }
  }

  static async generatePersonalizedLesson(
    userLevel: number,
    skill: 'reading' | 'writing' | 'listening' | 'speaking' | 'culture',
    topic: string
  ): Promise<{
    title: string
    content: string
    exercises: any[]
    vocabulary: string[]
  }> {
    const systemPrompt = `Create a personalized Korean lesson for level ${userLevel} learners focusing on ${skill}.
    Topic: ${topic}
    
    Include:
    1. Lesson title
    2. Structured content with examples
    3. Interactive exercises
    4. Key vocabulary with meanings
    
    Return as JSON object.`

    try {
      const response = await ClaudeService.generateResponse([
        { role: 'user', content: `Create a lesson about ${topic} for ${skill} practice` }
      ], systemPrompt)

      return JSON.parse(response.content)
    } catch (error) {
      console.error('Failed to generate lesson:', error)
      return {
        title: 'Korean Lesson',
        content: 'Lesson content will be available soon.',
        exercises: [],
        vocabulary: [],
      }
    }
  }
}
