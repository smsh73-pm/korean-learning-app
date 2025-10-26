import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import { Providers } from './providers'
import { Navigation } from '@/components/layout/Navigation'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: 'Korean Learning Hub - Learn Korean for Malaysians',
  description: 'Comprehensive Korean language learning platform designed specifically for Malaysian users with AI-powered features and cultural content integration.',
  keywords: ['Korean language', 'Korean learning', 'Malaysia', 'TOPIK', 'K-Pop', 'K-Drama', 'Korean culture'],
  authors: [{ name: 'Korean Learning Hub Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FF6B6B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansKR.variable}`}>
      <body className="font-sans bg-primary-gray min-h-screen">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 pb-20">
              {children}
            </main>
            <Navigation />
          </div>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
