# Korean Language Learning App - Deployment Guide

## 🚀 클라우드 배포 옵션

### 1. Vercel (가장 추천) - 무료 플랜 제공
- **장점**: Next.js 최적화, 자동 배포, 무료 도메인
- **단점**: 서버리스 함수 제한
- **비용**: 무료 (개인 프로젝트)

**배포 방법:**
1. GitHub에 코드 푸시
2. vercel.com에서 GitHub 연결
3. 자동 배포 완료

### 2. Azure App Service
- **장점**: Microsoft 생태계, 확장성
- **단점**: 설정 복잡, 비용 발생
- **비용**: 월 $10-50

### 3. Netlify
- **장점**: 간단한 설정, 무료 플랜
- **단점**: Next.js 최적화 부족
- **비용**: 무료 (제한적)

### 4. Railway
- **장점**: 간단한 배포, 데이터베이스 포함
- **단점**: 상대적으로 새로운 서비스
- **비용**: 월 $5-20

## 📋 배포 전 준비사항

### 환경 변수 설정
```env
# Production Environment Variables
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.com"
DATABASE_URL="your-production-database-url"

# AI API Keys (Optional)
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"
GOOGLE_AI_API_KEY="your-google-key"
```

### 데이터베이스 설정
- **Vercel**: Vercel Postgres (무료 플랜)
- **Azure**: Azure Database for PostgreSQL
- **Railway**: 내장 PostgreSQL

## 🔧 배포 설정 파일들

### vercel.json (Vercel용)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### Dockerfile (컨테이너 배포용)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🌐 도메인 및 SSL
- **Vercel**: 자동 SSL, 커스텀 도메인 지원
- **Azure**: Azure DNS, SSL 인증서
- **Netlify**: 자동 SSL, 커스텀 도메인

## 📊 모니터링 및 분석
- **Vercel Analytics**: 내장 분석 도구
- **Azure Application Insights**: 상세 모니터링
- **Google Analytics**: 웹 분석

## 💰 비용 비교 (월 기준)
- **Vercel**: 무료 (개인) / $20+ (팀)
- **Azure**: $10-50 (기본 플랜)
- **Netlify**: 무료 (제한적) / $19+ (프로)
- **Railway**: $5-20 (사용량 기반)

## 🎯 추천 배포 순서
1. **Vercel** (가장 쉬움)
2. **Railway** (데이터베이스 포함)
3. **Azure** (엔터프라이즈급)
4. **Netlify** (정적 사이트에 적합)
