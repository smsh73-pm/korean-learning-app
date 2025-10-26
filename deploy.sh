#!/bin/bash

# Korean Language Learning App - 배포 스크립트

echo "🚀 Korean Language Learning App 배포 시작..."

# 1. 빌드 테스트
echo "📦 빌드 테스트 중..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 빌드 성공!"
else
    echo "❌ 빌드 실패!"
    exit 1
fi

# 2. 배포 옵션 선택
echo ""
echo "배포 옵션을 선택하세요:"
echo "1) Vercel (추천)"
echo "2) Railway"
echo "3) Azure"
echo "4) Netlify"
echo "5) Docker"

read -p "선택 (1-5): " choice

case $choice in
    1)
        echo "🚀 Vercel 배포 시작..."
        echo "1. GitHub에 코드를 푸시하세요"
        echo "2. vercel.com에서 GitHub 연결"
        echo "3. 환경 변수 설정:"
        echo "   - NEXTAUTH_SECRET"
        echo "   - NEXTAUTH_URL"
        echo "   - DATABASE_URL"
        ;;
    2)
        echo "🚀 Railway 배포 시작..."
        echo "1. railway.app에서 GitHub 연결"
        echo "2. PostgreSQL 데이터베이스 추가"
        echo "3. 환경 변수 자동 설정됨"
        ;;
    3)
        echo "🚀 Azure 배포 시작..."
        echo "Azure CLI가 설치되어 있는지 확인하세요"
        echo "배포 명령어:"
        echo "az webapp deployment source config-zip --resource-group korean-learning-rg --name korean-learning-app --src korean-learning-app.zip"
        ;;
    4)
        echo "🚀 Netlify 배포 시작..."
        echo "1. netlify.com에서 GitHub 연결"
        echo "2. 빌드 명령어: npm run build"
        echo "3. 배포 디렉토리: .next"
        ;;
    5)
        echo "🐳 Docker 배포 시작..."
        docker build -t korean-learning-app .
        docker run -p 3000:3000 korean-learning-app
        ;;
    *)
        echo "❌ 잘못된 선택입니다."
        exit 1
        ;;
esac

echo ""
echo "🎉 배포 설정 완료!"
echo "📋 다음 단계:"
echo "1. 환경 변수 설정"
echo "2. 데이터베이스 연결"
echo "3. 도메인 설정 (선택사항)"
echo "4. SSL 인증서 확인"
