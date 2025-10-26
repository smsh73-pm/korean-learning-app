'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { 
  Music, 
  Film, 
  ChefHat, 
  Tv, 
  MapPin,
  Play,
  BookOpen,
  Star,
  Clock,
  Users
} from 'lucide-react'

interface KContentItem {
  id: string
  title: string
  type: 'kpop' | 'kdrama' | 'cuisine' | 'variety' | 'travel'
  description: string
  youtubeId?: string
  level: number
  duration: string
  vocabulary: string[]
  culturalNotes: string[]
  thumbnail: string
  isCompleted: boolean
}

const sampleKContent: KContentItem[] = [
  {
    id: '1',
    title: 'BTS - Dynamite',
    type: 'kpop',
    description: 'Learn Korean through BTS hit song Dynamite',
    youtubeId: 'gdZLi9oWNZg',
    level: 2,
    duration: '5 min',
    vocabulary: ['빛', '밤', '춤', '음악', '행복'],
    culturalNotes: ['K-Pop global influence', 'Korean music industry'],
    thumbnail: '/thumbnails/dynamite.jpg',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Squid Game - Episode 1',
    type: 'kdrama',
    description: 'Analyze dialogue from the popular Netflix series',
    youtubeId: 'oqxAJKy0ii4',
    level: 3,
    duration: '15 min',
    vocabulary: ['게임', '생존', '돈', '빚', '선택'],
    culturalNotes: ['Korean social commentary', 'Economic struggles'],
    thumbnail: '/thumbnails/squid-game.jpg',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Korean BBQ Cooking',
    type: 'cuisine',
    description: 'Learn cooking vocabulary through Korean BBQ preparation',
    youtubeId: 'example-id',
    level: 2,
    duration: '12 min',
    vocabulary: ['고기', '불', '구이', '양념', '상추'],
    culturalNotes: ['Korean dining culture', 'Family meals'],
    thumbnail: '/thumbnails/korean-bbq.jpg',
    isCompleted: true,
  },
  {
    id: '4',
    title: 'Running Man - Episode',
    type: 'variety',
    description: 'Practice casual conversation through variety show',
    youtubeId: 'example-id',
    level: 3,
    duration: '20 min',
    vocabulary: ['놀이', '팀', '승리', '웃음', '친구'],
    culturalNotes: ['Korean humor', 'Celebrity culture'],
    thumbnail: '/thumbnails/running-man.jpg',
    isCompleted: false,
  },
  {
    id: '5',
    title: 'Seoul Travel Guide',
    type: 'travel',
    description: 'Essential Korean phrases for traveling in Seoul',
    youtubeId: 'example-id',
    level: 2,
    duration: '18 min',
    vocabulary: ['여행', '지하철', '호텔', '음식점', '관광지'],
    culturalNotes: ['Korean tourism', 'Public transportation'],
    thumbnail: '/thumbnails/seoul-travel.jpg',
    isCompleted: false,
  },
]

export default function ExplorePage() {
  const { t } = useLanguage()
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<number>(2)
  const [selectedContent, setSelectedContent] = useState<KContentItem | null>(null)

  const contentTypes = [
    { id: 'all', name: 'All Content', icon: Star },
    { id: 'kpop', name: 'K-Pop', icon: Music },
    { id: 'kdrama', name: 'K-Drama', icon: Film },
    { id: 'cuisine', name: 'Korean Cuisine', icon: ChefHat },
    { id: 'variety', name: 'Variety Shows', icon: Tv },
    { id: 'travel', name: 'Travel & Culture', icon: MapPin },
  ]

  const filteredContent = sampleKContent.filter(content => {
    const typeMatch = selectedType === 'all' || content.type === selectedType
    const levelMatch = content.level === selectedLevel
    return typeMatch && levelMatch
  })

  const getTypeColor = (type: string) => {
    const colors = {
      kpop: 'bg-pink-100 text-pink-800',
      kdrama: 'bg-purple-100 text-purple-800',
      cuisine: 'bg-orange-100 text-orange-800',
      variety: 'bg-blue-100 text-blue-800',
      travel: 'bg-green-100 text-green-800',
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      kpop: Music,
      kdrama: Film,
      cuisine: ChefHat,
      variety: Tv,
      travel: MapPin,
    }
    return icons[type as keyof typeof icons] || Star
  }

  if (selectedContent) {
    const TypeIcon = getTypeIcon(selectedContent.type)
    
    return (
      <div className="min-h-screen bg-primary-gray p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getTypeColor(selectedContent.type)}`}>
                <TypeIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{selectedContent.title}</h1>
                <p className="text-sm text-gray-600">{selectedContent.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedContent(null)}
            >
              Back to Content
            </Button>
          </div>

          {/* Video Player */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                {selectedContent.youtubeId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedContent.youtubeId}`}
                    title={selectedContent.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video Preview</p>
                    <p className="text-sm opacity-75">Click to play</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Learning Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Vocabulary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary-coral" />
                  <span>Key Vocabulary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedContent.vocabulary.map((word, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium korean-text">{word}</span>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cultural Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-korean-yellow" />
                  <span>Cultural Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedContent.culturalNotes.map((note, index) => (
                    <div key={index} className="p-3 bg-korean-yellow/10 rounded-lg">
                      <p className="text-sm text-gray-700">{note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <BookOpen className="w-6 h-6" />
                  <span>Vocabulary Quiz</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Users className="w-6 h-6" />
                  <span>Discussion</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Star className="w-6 h-6" />
                  <span>Cultural Quiz</span>
                </Button>
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
            K-Explore
          </h1>
          <p className="text-gray-600">
            Learn Korean through authentic Korean content and culture
          </p>
        </div>

        {/* Content Type Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Explore by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {contentTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                      selectedType === type.id
                        ? 'border-primary-coral bg-primary-coral/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Level Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Select Difficulty Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedLevel === level
                      ? 'border-primary-coral bg-primary-coral text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Level {level}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Korean Content</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredContent.map((content) => {
              const TypeIcon = getTypeIcon(content.type)
              return (
                <Card key={content.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <TypeIcon className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Video Preview</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{content.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
                          {content.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{content.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{content.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>Level {content.level}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedContent(content)}
                        className="w-full"
                        variant={content.isCompleted ? "outline" : "primary"}
                      >
                        {content.isCompleted ? 'Review' : 'Start Learning'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Learning Tips */}
        <Card className="bg-korean-purple/10 border-korean-purple/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-korean-purple mt-0.5" />
              <div>
                <h4 className="font-semibold text-korean-purple">Learning Tips</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• Watch with Korean subtitles first, then English</li>
                  <li>• Repeat phrases out loud to practice pronunciation</li>
                  <li>• Take notes on new vocabulary and cultural insights</li>
                  <li>• Discuss content with other learners for deeper understanding</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
