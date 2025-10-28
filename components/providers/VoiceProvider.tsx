'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface VoiceContextType {
  isListening: boolean
  isSupported: boolean
  startListening: () => Promise<void>
  stopListening: () => void
  resetTranscript: () => void
  transcript: string
  error: string | null
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [recognition, setRecognition] = useState<any>(null)
  const [isSupported, setIsSupported] = useState(false)

  // Check browser support on mount
  useEffect(() => {
    const checkSupport = () => {
      if (typeof window !== 'undefined') {
        const hasSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
        setIsSupported(hasSupport)
        if (!hasSupport) {
          setError('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome이나 Edge를 사용해주세요.')
        }
      }
    }
    checkSupport()
  }, [])

  const startListening = useCallback(async () => {
    if (!isSupported) {
      setError('이 브라우저는 음성 인식을 지원하지 않습니다.')
      return
    }

    try {
      setError(null)
      
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'ko-KR'
      
      recognitionInstance.onstart = () => {
        setIsListening(true)
        setError(null)
        console.log('음성 인식이 시작되었습니다.')
      }
      
      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }
        
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript)
        }
      }
      
      recognitionInstance.onerror = (event: any) => {
        console.error('음성 인식 오류:', event.error)
        
        const errorMessages: Record<string, string> = {
          'no-speech': '음성이 감지되지 않았습니다. 다시 시도해주세요.',
          'aborted': '음성 인식이 중단되었습니다.',
          'audio-capture': '마이크를 찾을 수 없습니다. 마이크 권한을 확인해주세요.',
          'network': '네트워크 오류가 발생했습니다.',
          'not-allowed': '마이크 사용 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.',
          'service-not-allowed': '음성 인식 서비스를 사용할 수 없습니다.'
        }
        
        setError(errorMessages[event.error] || `음성 인식 오류: ${event.error}`)
        setIsListening(false)
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
        console.log('음성 인식이 종료되었습니다.')
      }
      
      setRecognition(recognitionInstance)
      recognitionInstance.start()
    } catch (err) {
      console.error('음성 인식 시작 실패:', err)
      setError('음성 인식 시작에 실패했습니다.')
    }
  }, [isSupported])

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop()
      setRecognition(null)
    }
  }, [recognition])

  const resetTranscript = useCallback(() => {
    setTranscript('')
  }, [])

  return (
    <VoiceContext.Provider value={{
      isListening,
      isSupported,
      startListening,
      stopListening,
      resetTranscript,
      transcript,
      error,
    }}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider')
  }
  return context
}
