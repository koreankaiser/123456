# 🚀 북버디 Supabase 연결 가이드

## 📋 완료된 작업

1. ✅ Supabase 클라이언트 설정 (`lib/supabase.ts`)
2. ✅ 인증 훅 생성 (`hooks/useAuth.ts`)
3. ✅ 구글 로그인 연동
4. ✅ 로그인/로그아웃 버튼

---

## 🔑 환경 변수 설정

### 1. `.env` 파일 생성

프로젝트 루트에 `.env` 파일을 만들고 다음 내용 입력:

```env
VITE_SUPABASE_URL=복사한_Supabase_URL
VITE_SUPABASE_ANON_KEY=복사한_anon_key
VITE_GEMINI_API_KEY=기존_Gemini_API_키
```

### 2. Vercel 환경 변수 설정

Vercel 대시보드에서:
1. 프로젝트 → Settings → Environment Variables
2. 위 3개 변수 추가

---

## 🔐 Supabase Authentication 설정

### 1. Supabase 대시보드 접속

https://supabase.com → bookbuddy 프로젝트

### 2. Authentication → Providers

1. **Google** 클릭
2. **Enable** 켜기
3. Redirect URLs 추가:
   - `http://localhost:5173` (로컬 테스트용)
   - `https://your-vercel-domain.vercel.app` (배포용)

### 3. Google OAuth 설정 (나중에)

Google Cloud Console에서:
1. OAuth 2.0 클라이언트 ID 생성
2. Client ID & Secret을 Supabase에 입력

---

## 🧪 테스트 방법

### 로컬 테스트:

```bash
npm install
npm run dev
```

1. 브라우저에서 `http://localhost:5173` 접속
2. 우측 상단 **LOGIN** 버튼 클릭
3. 구글 로그인 팝업 확인

### 배포 후 테스트:

1. GitHub에 push
2. Vercel 자동 배포 대기
3. 배포된 사이트에서 로그인 테스트

---

## 📁 추가된 파일

```
123456/
├── lib/
│   └── supabase.ts         # Supabase 클라이언트
├── hooks/
│   └── useAuth.ts          # 인증 훅
├── .env.example            # 환경 변수 예시
└── package.json            # @supabase/supabase-js 추가
```

---

## ⚠️ 중요 사항

1. `.env` 파일은 **절대 GitHub에 올리지 마세요!**
2. `.gitignore`에 `.env` 추가 확인
3. Vercel 환경 변수는 별도로 설정 필요

---

## 🎯 다음 단계

1. ✅ 환경 변수 설정
2. ✅ Google Provider 활성화
3. ✅ 로그인 테스트
4. 📝 프로필 자동 생성 (다음 작업)
5. 📝 책 등록 기능 (다음 작업)
