'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ms' | 'ko'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'welcome.title': 'Welcome to Korean Learning Hub',
    'welcome.subtitle': 'Master Korean with AI-powered learning designed for Malaysians',
    'welcome.getStarted': 'Get Started',
    'welcome.login': 'Login',
    'nav.home': 'Home',
    'nav.learn': 'Learn',
    'nav.practice': 'Practice',
    'nav.explore': 'K-Explore',
    'nav.profile': 'Profile',
  },
  ms: {
    'welcome.title': 'Selamat Datang ke Korean Learning Hub',
    'welcome.subtitle': 'Kuasai Bahasa Korea dengan pembelajaran berasaskan AI untuk rakyat Malaysia',
    'welcome.getStarted': 'Mula Sekarang',
    'welcome.login': 'Log Masuk',
    'nav.home': 'Utama',
    'nav.learn': 'Belajar',
    'nav.practice': 'Latihan',
    'nav.explore': 'K-Jelajah',
    'nav.profile': 'Profil',
  },
  ko: {
    'welcome.title': '한국어 학습 허브에 오신 것을 환영합니다',
    'welcome.subtitle': '말레이시아인을 위해 설계된 AI 기반 학습으로 한국어를 마스터하세요',
    'welcome.getStarted': '시작하기',
    'welcome.login': '로그인',
    'nav.home': '홈',
    'nav.learn': '학습',
    'nav.practice': '연습',
    'nav.explore': 'K-탐험',
    'nav.profile': '프로필',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['en', 'ms', 'ko'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
