'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { VoiceProvider } from '@/components/providers/VoiceProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <LanguageProvider>
          <VoiceProvider>
            {children}
          </VoiceProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
