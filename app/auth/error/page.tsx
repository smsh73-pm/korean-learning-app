'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

const errorMessages = {
  Configuration: '서버 설정에 문제가 있습니다.',
  AccessDenied: '접근이 거부되었습니다.',
  Verification: '인증 토큰이 만료되었거나 유효하지 않습니다.',
  Default: '알 수 없는 오류가 발생했습니다.',
}

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as keyof typeof errorMessages

  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="min-h-screen bg-primary-gray flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">인증 오류</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-gray-600">
                {errorMessage}
              </p>
              {error && (
                <p className="text-sm text-gray-500">
                  오류 코드: {error}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  홈으로 돌아가기
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              <p>문제가 계속되면 다음을 시도해보세요:</p>
              <ul className="mt-2 space-y-1 text-left">
                <li>• 브라우저 캐시 삭제</li>
                <li>• 다른 브라우저 사용</li>
                <li>• 잠시 후 다시 시도</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-coral mx-auto"></div>
          <p className="mt-2 text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
