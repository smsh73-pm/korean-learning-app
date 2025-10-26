'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { 
  BookOpen, 
  Target, 
  Compass, 
  Trophy, 
  Calendar,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (status === 'unauthenticated') {
    return null
  }

  const stats = [
    {
      title: 'Current Level',
      value: session?.user?.koreanLevel ? `Level ${session.user.koreanLevel}` : 'Not Set',
      icon: TrendingUp,
      color: 'text-primary-coral',
    },
    {
      title: 'Study Streak',
      value: '7 days',
      icon: Calendar,
      color: 'text-primary-sage',
    },
    {
      title: 'Total Study Time',
      value: '2h 30m',
      icon: Clock,
      color: 'text-korean-hanbok',
    },
    {
      title: 'Achievements',
      value: '12',
      icon: Trophy,
      color: 'text-korean-yellow',
    },
  ]

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your current lesson',
      icon: BookOpen,
      href: '/learn',
      color: 'bg-primary-coral',
    },
    {
      title: 'Create Curriculum',
      description: 'Generate personalized learning plan',
      icon: Target,
      href: '/curriculum',
      color: 'bg-korean-hanbok',
    },
    {
      title: 'Practice Speaking',
      description: 'Chat with AI partners',
      icon: Target,
      href: '/practice',
      color: 'bg-primary-sage',
    },
    {
      title: 'Explore K-Content',
      description: 'Learn through Korean media',
      icon: Compass,
      href: '/explore',
      color: 'bg-korean-purple',
    },
  ]

  const recentAchievements = [
    {
      title: 'Hangeul Master',
      description: 'Completed Hangeul alphabet',
      icon: '🎯',
      earnedAt: '2 days ago',
    },
    {
      title: 'Week Warrior',
      description: '7-day study streak',
      icon: '🔥',
      earnedAt: '1 day ago',
    },
    {
      title: 'Quiz Champion',
      description: 'Scored 100% on grammar quiz',
      icon: '⭐',
      earnedAt: '3 hours ago',
    },
  ]

  return (
    <div className="min-h-screen bg-primary-gray p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            안녕하세요, {session?.user?.name || 'Learner'}님!
          </h1>
          <p className="text-gray-600">
            Ready to continue your Korean learning journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-lg font-semibold">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center space-y-3"
                    asChild
                  >
                    <a href={action.href}>
                      <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </a>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-korean-yellow" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">{achievement.earnedAt}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Mission */}
        <Card className="gradient-bg text-white">
          <CardHeader>
            <CardTitle className="text-white">Today's Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Complete 3 Vocabulary Cards</h3>
                  <p className="text-white/80">Learn new Korean words</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">2/3</div>
                  <div className="text-sm text-white/80">completed</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-2/3"></div>
              </div>
              <Button variant="secondary" className="w-full">
                Continue Mission
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
