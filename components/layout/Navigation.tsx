'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { 
  Home, 
  BookOpen, 
  Target, 
  Compass, 
  User,
  Globe
} from 'lucide-react'

const navigationItems = [
  {
    name: 'nav.home',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'nav.learn',
    href: '/learn',
    icon: BookOpen,
  },
  {
    name: 'nav.practice',
    href: '/practice',
    icon: Target,
  },
  {
    name: 'nav.explore',
    href: '/explore',
    icon: Compass,
  },
  {
    name: 'nav.profile',
    href: '/profile',
    icon: User,
  },
]

export function Navigation() {
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ms', name: 'Bahasa', flag: '🇲🇾' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ] as const

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Language Selector */}
        <div className="flex items-center space-x-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className={cn(
                'p-2 rounded-lg text-sm transition-colors',
                language === lang.code
                  ? 'bg-primary-coral text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <span className="text-lg">{lang.flag}</span>
            </button>
          ))}
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center p-2 rounded-lg transition-colors min-w-0',
                  isActive
                    ? 'text-primary-coral bg-primary-coral/10'
                    : 'text-gray-600 hover:text-primary-coral hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium truncate">
                  {t(item.name)}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
