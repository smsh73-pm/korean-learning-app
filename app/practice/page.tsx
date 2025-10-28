'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useVoice } from '@/components/providers/VoiceProvider'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  Users, 
  GraduationCap,
  Briefcase,
  Heart,
  ShoppingBag,
  Volume2,
  VolumeX
} from 'lucide-react'

interface ConversationPartner {
  id: string
  name: string
  type: 'friend' | 'teacher' | 'colleague' | 'family' | 'service'
  description: string
  icon: any
  personality: string
  topics: string[]
}

const conversationPartners: ConversationPartner[] = [
  {
    id: 'friend',
    name: '친구 (Chingu)',
    type: 'friend',
    description: 'Casual friend for everyday conversations',
    icon: Users,
    personality: 'Relaxed and encouraging',
    topics: ['Hobbies', 'K-Pop', 'Daily life', 'Travel'],
  },
  {
    id: 'teacher',
    name: '선생님 (Seonsaengnim)',
    type: 'teacher',
    description: 'Respectful teacher for formal learning',
    icon: GraduationCap,
    personality: 'Patient and educational',
    topics: ['Grammar', 'Culture', 'Academic discussions'],
  },
  {
    id: 'colleague',
    name: '직장 동료 (Jikjang Dongnyo)',
    type: 'colleague',
    description: 'Professional colleague for business Korean',
    icon: Briefcase,
    personality: 'Business-appropriate and collaborative',
    topics: ['Work projects', 'Meetings', 'Professional networking'],
  },
  {
    id: 'family',
    name: '가족 구성원 (Gajok Gusungwon)',
    type: 'family',
    description: 'Family member for intimate conversations',
    icon: Heart,
    personality: 'Warm and emotionally expressive',
    topics: ['Family events', 'Personal sharing', 'Household'],
  },
  {
    id: 'service',
    name: '서비스 직원 (Service Jikwon)',
    type: 'service',
    description: 'Service professional for practical interactions',
    icon: ShoppingBag,
    personality: 'Polite and helpful',
    topics: ['Shopping', 'Dining', 'Transportation', 'Services'],
  },
]

export default function PracticePage() {
  const { t } = useLanguage()
  const { isListening, isSupported, startListening, stopListening, resetTranscript, transcript, error } = useVoice()
  const [selectedPartner, setSelectedPartner] = useState<ConversationPartner | null>(null)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, timestamp: Date }>>([])
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleStartConversation = (partner: ConversationPartner) => {
    setSelectedPartner(partner)
    setMessages([{
      role: 'assistant',
      content: `안녕하세요! 저는 ${partner.name}입니다. ${partner.description} 오늘 어떤 주제로 대화해볼까요?`,
      timestamp: new Date()
    }])
  }

  const handleVoiceInput = async () => {
    if (isListening) {
      stopListening()
      if (transcript.trim()) {
        const userTranscript = transcript
        setMessages(prev => [...prev, {
          role: 'user',
          content: userTranscript,
          timestamp: new Date()
        }])
        resetTranscript()
        
        // Simulate AI response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '안녕하세요! Let me help you with that. Can you tell me more?',
            timestamp: new Date()
          }])
        }, 1000)
      }
    } else {
      await startListening()
    }
  }

  const handleTextInput = (message: string) => {
    if (message.trim()) {
      setMessages(prev => [...prev, {
        role: 'user',
        content: message,
        timestamp: new Date()
      }])
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'I understand! Let\'s practice that together.',
          timestamp: new Date()
        }])
      }, 1000)
    }
  }

  const getPartnerColor = (type: string) => {
    const colors = {
      friend: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      colleague: 'bg-purple-100 text-purple-800',
      family: 'bg-pink-100 text-pink-800',
      service: 'bg-orange-100 text-orange-800',
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (selectedPartner) {
    return (
      <div className="min-h-screen bg-primary-gray p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getPartnerColor(selectedPartner.type)}`}>
                <selectedPartner.icon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{selectedPartner.name}</h1>
                <p className="text-sm text-gray-600">{selectedPartner.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedPartner(null)}
            >
              Back to Partners
            </Button>
          </div>

          {/* Chat Messages */}
          <Card className="h-96 overflow-hidden">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary-coral text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voice Input */}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleVoiceInput}
                  disabled={!isSupported}
                  className={`flex-1 ${
                    isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-coral hover:bg-primary-coral/90'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Start Voice Input
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsSpeaking(!isSpeaking)}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-2">
                  {error}
                </div>
              )}

              {transcript && (
                <div className="text-sm text-gray-600 mt-2">
                  You said: "{transcript}"
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedPartner.topics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTextInput(`Let's talk about ${topic}`)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
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
            Practice Speaking
          </h1>
          <p className="text-gray-600">
            Choose an AI conversation partner and practice Korean speaking
          </p>
        </div>

        {/* Voice Support Status */}
        <Card className={isSupported ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Mic className={`w-5 h-5 ${isSupported ? 'text-green-600' : 'text-red-600'}`} />
              <div>
                <h4 className={`font-semibold ${isSupported ? 'text-green-800' : 'text-red-800'}`}>
                  Voice Recognition
                </h4>
                <p className={`text-sm ${isSupported ? 'text-green-600' : 'text-red-600'}`}>
                  {isSupported 
                    ? 'Voice input is supported in your browser' 
                    : 'Voice input is not supported. Please use text input instead.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversation Partners */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Choose Your Conversation Partner</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {conversationPartners.map((partner) => {
              const Icon = partner.icon
              return (
                <Card key={partner.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getPartnerColor(partner.type)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{partner.name}</h3>
                        <p className="text-gray-600 mb-2">{partner.description}</p>
                        <p className="text-sm text-gray-500 mb-3">
                          Personality: {partner.personality}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {partner.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                        <Button
                          onClick={() => handleStartConversation(partner)}
                          className="w-full"
                        >
                          Start Conversation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Practice Tips */}
        <Card className="bg-primary-sage/10 border-primary-sage/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-primary-sage mt-0.5" />
              <div>
                <h4 className="font-semibold text-primary-sage">Practice Tips</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• Speak clearly and at a natural pace</li>
                  <li>• Don't worry about making mistakes - it's part of learning</li>
                  <li>• Try to use new vocabulary you've learned</li>
                  <li>• Ask questions when you don't understand something</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
