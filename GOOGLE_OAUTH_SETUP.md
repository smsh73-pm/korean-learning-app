# Google OAuth 설정 가이드

## 📋 Google OAuth 설정 절차

### 1. Google Cloud Console에서 프로젝트 생성

1. **Google Cloud Console** 접속
   - https://console.cloud.google.com/

2. **새 프로젝트 생성**
   - 프로젝트 이름: `Korean Learning App`
   - Create 클릭

### 2. OAuth 2.0 클라이언트 ID 생성

1. **API 및 서비스 > 사용자 인증 정보** 이동
2. **+ 사용자 인증 정보 만들기** > **OAuth 클라이언트 ID**
3. **애플리케이션 유형** 선택:
   - **웹 애플리케이션** 선택
4. **승인된 JavaScript 원본** 추가:
   ```
   http://localhost:3000
   https://your-app.vercel.app
   ```
5. **승인된 리디렉션 URI** 추가:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-app.vercel.app/api/auth/callback/google
   ```
6. **만들기** 클릭

### 3. 환경 변수 설정

생성된 **클라이언트 ID**와 **클라이언트 보안 비밀**을 복사합니다.

#### 로컬 개발 (.env.local)
```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

#### Vercel 배포
1. Vercel 대시보드에서 프로젝트 선택
2. **Settings > Environment Variables** 이동
3. 다음 변수 추가:
   - `GOOGLE_CLIENT_ID`: 클라이언트 ID
   - `GOOGLE_CLIENT_SECRET`: 클라이언트 보안 비밀

### 4. 재배포

환경 변수를 추가한 후 Vercel에서 재배포:
```bash
npx vercel --prod
```

또는 Vercel 대시보드에서 **Redeploy** 클릭

## 🔧 문제 해결

### "redirect_uri_mismatch" 오류
- Vercel 배포 URL을 Google Console의 **승인된 리디렉션 URI**에 추가했는지 확인

### 로그인 후 오류
- `NEXTAUTH_SECRET`이 설정되어 있는지 확인
- `NEXTAUTH_URL`이 프로덕션 URL과 일치하는지 확인

### 테스트
1. 배포된 앱에 접속
2. "Continue with Google" 버튼 클릭
3. Google 계정 선택
4. 권한 승인
5. 대시보드로 리디렉션 확인

## 📝 추가 리소스

- [NextAuth.js Google Provider 문서](https://next-auth.js.org/providers/google)
- [Google OAuth 2.0 가이드](https://developers.google.com/identity/protocols/oauth2)

