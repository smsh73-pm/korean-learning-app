'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { 
  User, 
  Settings, 
  Trophy, 
  Target,
  Calendar,
  Clock,
  BookOpen,
  Star,
  Globe,
  LogOut
} from 'lucide-react'

export default function ProfilePage() {
  const { data: session } = useSession()
  const { language, setLanguage } = useLanguage()

  const stats = [
    {
      title: 'Total Study Time',
      value: '15h 30m',
      icon: Clock,
      color: 'text-primary-coral',
    },
    {
      title: 'Lessons Completed',
      value: '24',
      icon: BookOpen,
      color: 'text-primary-sage',
    },
    {
      title: 'Current Streak',
      value: '7 days',
      icon: Calendar,
      color: 'text-korean-hanbok',
    },
    {
      title: 'Achievements',
      value: '12',
      icon: Trophy,
      color: 'text-korean-yellow',
    },
  ]

  const achievements = [
    {
      title: 'Hangeul Master',
      description: 'Completed Hangeul alphabet learning',
      icon: '🎯',
      earnedAt: '2 days ago',
      rarity: 'common',
    },
    {
      title: 'Week Warrior',
      description: '7-day study streak',
      icon: '🔥',
      earnedAt: '1 day ago',
      rarity: 'rare',
    },
    {
      title: 'Quiz Champion',
      description: 'Scored 100% on 5 quizzes',
      icon: '⭐',
      earnedAt: '3 hours ago',
      rarity: 'epic',
    },
    {
      title: 'Cultural Explorer',
      description: 'Completed 10 K-content videos',
      icon: '🌟',
      earnedAt: '1 week ago',
      rarity: 'legendary',
    },
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ]

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-100 text-gray-800',
      rare: 'bg-blue-100 text-blue-800',
      epic: 'bg-purple-100 text-purple-800',
      legendary: 'bg-yellow-100 text-yellow-800',
    }
    return colors[rarity as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-primary-gray p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="gradient-bg text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{session?.user?.name || 'Learner'}</h1>
                <p className="text-white/80">{session?.user?.email}</p>
                <div className="mt-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    Level {session?.user?.koreanLevel || 1} Korean Learner
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-primary-coral" />
              <span>Language Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Interface Language
                </label>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        language === lang.code
                          ? 'border-primary-coral bg-primary-coral text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary-sage" />
              <span>Learning Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">TOPIK Level 3</h4>
                  <p className="text-sm text-gray-600">Target: 6 months</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Progress</div>
                  <div className="text-lg font-semibold">45%</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-sage h-2 rounded-full w-2/5"></div>
              </div>
              <Button variant="outline" className="w-full">
                Update Goals
              </Button>
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
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">{achievement.earnedAt}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <span>Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Learning Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
