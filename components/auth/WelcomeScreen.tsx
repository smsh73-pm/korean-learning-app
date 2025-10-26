'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Globe, BookOpen, Users, Zap } from 'lucide-react'

export function WelcomeScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match')
          return
        }
        await signIn('credentials', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      }
    } catch (error) {
      console.error('Authentication error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Learn in English, Bahasa Malaysia, or Korean',
    },
    {
      icon: BookOpen,
      title: 'AI-Powered Learning',
      description: 'Personalized curriculum with advanced AI',
    },
    {
      icon: Users,
      title: 'Cultural Integration',
      description: 'Connect Korean culture with Malaysian context',
    },
    {
      icon: Zap,
      title: 'Voice Interface',
      description: 'Practice speaking with voice recognition',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-coral to-primary-sage">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('welcome.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t('welcome.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Why Choose Korean Learning Hub?
            </h2>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Auth Form */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {isLogin ? 'Welcome Back!' : 'Join Korean Learning Hub'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                )}
                
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                
                <Input
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                
                {!isLogin && (
                  <Input
                    label="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary-coral hover:underline"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : 'Already have an account? Login'
                  }
                </button>
              </div>

              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => alert('Google login is temporarily disabled. Please use email/password login.')}
                  className="w-full"
                  disabled
                >
                  Continue with Google (Coming Soon)
                </Button>
              </div>

              {/* Test Account Information */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">테스트 계정 정보</h3>
                <div className="text-xs text-blue-700 space-y-1">
                  <div><strong>관리자:</strong> admin@korean-learning.com / admin123</div>
                  <div><strong>초급자:</strong> beginner@test.com / test123</div>
                  <div><strong>중급자:</strong> intermediate@test.com / test123</div>
                  <div><strong>고급자:</strong> advanced@test.com / test123</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
