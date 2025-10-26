# Korean Language Learning App

## 🎯 프로젝트 개요
말레이시아 사용자를 위한 종합적인 한국어 학습 모바일 웹 애플리케이션

## ✨ 주요 기능
- **다국어 지원**: 영어, 말레이어, 한국어 인터페이스
- **AI 기반 학습**: 맞춤형 커리큘럼 생성 및 대화 연습
- **음성인식**: Web Speech API를 활용한 발음 연습
- **K-콘텐츠 통합**: K-Pop, K-Drama, 한국 요리 등 문화 콘텐츠 학습
- **진도 추적**: 학습 성과 및 성취 시스템
- **PWA 지원**: 모바일 앱과 같은 경험

## 🛠️ 기술 스택
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: SQLite (개발) / PostgreSQL (프로덕션)
- **AI Integration**: OpenAI GPT-4, Anthropic Claude, Google Gemini
- **Deployment**: Vercel, Railway, Azure

## 🚀 빠른 시작

### 로컬 개발
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 확인
open http://localhost:3000
```

### 환경 변수 설정
```env
# .env.local 파일 생성
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"

# AI API Keys (선택사항)
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"
GOOGLE_AI_API_KEY="your-google-key"
```

## 📱 주요 페이지
- `/` - 웰컴 화면 및 인증
- `/dashboard` - 개인화된 학습 대시보드
- `/level-test` - 한국어 실력 평가
- `/curriculum` - 맞춤형 커리큘럼 생성
- `/learn` - 구조화된 학습 과정
- `/practice` - AI 대화 파트너와 연습
- `/explore` - K-콘텐츠 탐험
- `/profile` - 사용자 설정 및 진도

## 🌐 배포 옵션

### Vercel (추천)
1. GitHub에 코드 푸시
2. vercel.com에서 GitHub 연결
3. 환경 변수 설정
4. 자동 배포 완료

### Railway
1. railway.app에서 GitHub 연결
2. PostgreSQL 데이터베이스 추가
3. 환경 변수 자동 설정

### Azure
1. Azure CLI 설치 및 로그인
2. App Service 및 PostgreSQL 생성
3. 환경 변수 설정
4. ZIP 배포

## 📊 프로젝트 구조
```
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   ├── dashboard/         # 대시보드
│   ├── learn/            # 학습 페이지
│   ├── practice/         # 연습 페이지
│   ├── explore/          # K-콘텐츠 탐험
│   ├── profile/          # 프로필
│   ├── curriculum/       # 커리큘럼 생성
│   └── level-test/       # 레벨 테스트
├── components/            # 재사용 가능한 컴포넌트
│   ├── auth/             # 인증 관련
│   ├── layout/           # 레이아웃
│   ├── providers/        # Context providers
│   └── ui/               # 기본 UI 컴포넌트
├── lib/                  # 유틸리티 및 서비스
│   ├── ai-services.ts    # AI 통합 서비스
│   ├── curriculum-service.ts # 커리큘럼 생성
│   └── utils.ts          # 헬퍼 함수
├── types/                # TypeScript 타입 정의
└── prisma/               # 데이터베이스 스키마
```

## 🎯 학습 목표
- **TOPIK 시험 준비**: 공식 인증을 위한 체계적 학습
- **대학 입학 준비**: 학술 한국어 실력 향상
- **비즈니스 한국어**: 직장에서 사용하는 실무 한국어
- **가족과의 소통**: 한국인 가족과의 원활한 소통
- **종합 한국어**: 전반적인 실력 향상과 문화 이해

## 🤝 기여하기
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스
이 프로젝트는 교육 목적으로 제작되었습니다.

## 📞 지원
문제가 있으시면 이슈를 생성해주세요.