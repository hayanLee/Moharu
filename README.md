# 모하루 (Moharu)

_**"하루가 모여서 습관이 된다"**_

**모하루**는 사용자의 작은 노력이 모여 의미 있는 **습관**이 되도록 돕는 **웹 애플리케이션**입니다.  
꾸준한 챌린지를 기록하고, 나만의 테마로 **UI를 커스터마이징**하며, **루틴을 완성**해보세요! 💪

## 🚀 기능 시나리오

1. **로그인 / 회원가입**

   - 이메일 로그인
   - 카카오 로그인 지원

2. **챌린지 관리**

   - 챌린지 등록 (이름, 기간, 카테고리)
   - 챌린지 조회
     - progress를 통해 오늘 달성률 제공
   - 챌린지 수정 및 삭제
   - 스티커 등록
     - (예정) 등록한 스티커 수정 기능

3. **완료된 챌린지 모아보기**

   - 챌린지 완료 여부에 따라 필터링
   - (예정) 마이페이지에서 카테고리별 통계 제공

4. **마이페이지 설정**
   - 프로필 이미지 / 닉네임 변경
   - 테마 설정 (다크 모드, 메인 컬러)
   - (예정) 푸시 알림 설정

<br/>

## 🎥 시연 영상

| 기능                           | 시연(PWA)                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| **챌린지 조회 및 스티커 등록** | <img src="https://github.com/user-attachments/assets/5154947f-5903-4004-8f0e-fb9c924d93be" width="360" /> |
| **챌린지 수정 및 삭제**        | <img src="https://github.com/user-attachments/assets/e0f42315-9578-4a0d-a5cc-30570ee7693c" width="360" /> |
| **프로필 및 테마 설정**        | <img src="https://github.com/user-attachments/assets/132eb45a-d4df-41a1-bc76-906dd35f1a74" width="360" /> |
| **완료된 챌린지 조회**         | <img src="https://github.com/user-attachments/assets/02b9cf8b-763c-400b-951f-09ea5206ec7b" width="360" /> |

<br/>

## 🛠️ 기술 스택

| 분야             | 기술                               |
| ---------------- | ---------------------------------- |
| **프론트엔드**   | React, TypeScript                  |
| **스타일링**     | Tailwind CSS, Shadcn UI, ProCreate |
| **상태 관리**    | Tanstack Query, React Hook Form    |
| **서버 통신**    | Server Actions                     |
| **데이터베이스** | Supabase                           |

<br/>

## 🧩 트러블슈팅

### 1️⃣ 정적 이미지 로딩 최적화 트러블슈팅

### **문제 상황**

- 변경되지 않는 스티커 이미지를 사용자별로 요청해야 했음
- `next/image`의 `loader`를 통해 매번 동적으로 이미지를 불러오면서  
  → **깜빡임(flickering) 현상** 발생  
  → 무료 플랜에서는 loader의 `width`, `quality` 등 **이미지 최적화 옵션 미지원**

> ⇒ 결국 **원본 이미지를 매번 요청**, UX에 부정적 영향

### **해결 과정**

1. **public 폴더 + 서버 fs 접근 시도 (❌ 실패)**

   - 이미지들을 `public/stickers/` 경로에 넣고, 서버에서 `fs` 모듈로 접근해 서빙하려 했지만, **서버리스 환경(Vercel)에선 `public` 폴더를 서버에서 접근 불가**

2. **Supabase Storage + getPublicUrl 활용 (✅ 성공)**

   - Supabase Storage에 스티커 이미지를 업로드하고, 서버에서 `getPublicUrl()`을 통해 이미지 URL을 받아 클라이언트에 전달
   - 클라이언트에서는 해당 URL을 **캐싱하여 재사용**, 깜빡임 현상 해결
   - 매 요청마다 서버 통신을 하지 않아도 되도록 개선

3. **StickerGrid 컴포넌트에는 클라이언트 정적 경로 방식 사용 (혼합 전략)**
   - 이미지 변형이 필요 없는 스티커 목록 컴포넌트의 경우  
     → 클라이언트에서 `/stickers/{fileName}` 경로로 **정적 이미지 요청**
   - 서버에서는 이미지의 **파일 이름만 내려주고**, 클라이언트가 이를 조합하여 정적 경로로 요청

### **결과**

- **클라이언트 단에서 캐싱된 URL을 직접 활용해 깜빡임 현상 제거**, UX 개선
- **서버 접근 제약 및 Vercel 환경/무료 플랜 제약**을 고려한 유연한 절충안 도출
- 기능 성격에 따라  
  → **정적 경로 + 동적 URL 캐싱을 병행 적용**, 성능과 유지보수성을 모두 고려한 구조 구축

---

### 2️⃣ 데이터 패치 및 캐싱 전략 트러블슈팅

### **문제 상황**

1. **클라이언트 컴포넌트의 캐싱 한계**

   - 클라이언트 캐싱 도입 시, 조회가 필요한 페이지가 많기 때문에 **클라이언트 컴포넌트에서 호출되는, 모든 하위 컴포넌트도 강제로 클라이언트 컴포넌트로 처리되는 문제**
   - 서버 컴포넌트에서 제공하는 **정적 캐싱 전략(예: `revalidate`)을 활용할 수 없는 구조적 제약 발생**

2. **서버 액션(fetch)의 동적 요청 문제**

   - `server action`을 통해 `fetch` 사용 시, 항상 **동적 요청**으로 처리되어 **서버 캐싱(revalidate)이 불가능**하여 **매번 서버에 인증된 요청을 보내야 하는 비효율 발생**

3. **Supabase 세션 쿠키 미전달 문제 (🐛 supabase 버그)**
   - 인증 기반 요청 시, Route Handler 또는 서버 액션에서 **쿠키가 누락되어 Supabase 세션이 정상적으로 전달되지 않는 이슈 발생** => Next.js 캐싱 전략 사용 불가해짐

> 🤔 **데이터 조회**에는 캐싱으로 인해 서버 액션이 적합하지 않고, **변경 작업**은 적합한 모순된 상황

### **해결 과정**

1. **클라이언트 캐싱(Tanstack Query)으로 구조 변경**

   - 해당 서비스는 유저 챌린지, 스티커 등 **개인화 중심의 기능 구성**
   - 인증 상태를 **클라이언트에서 확실히 관리 가능**하므로, 클라이언트에서 **직접 서버 액션 호출 + 캐싱 적용**
   - `tanstack query` 기반으로 다음과 같이 구현:
     - 서버 액션은 **api 통신 데이터 변형 및 인증 로직 전담**
     - 클라이언트는 `useQuery`, `invalidateQuery` 등으로 **캐싱 + 갱신 처리**

2. **서버 액션과 클라이언트 역할 분리**
   - 서버 액션은 데이터를 직접 패치하고 가공하는 역할만 수행
   - 클라이언트는 UI와 캐싱을 책임

### **결과**

- **쿠키 미전달 문제를 피하면서 안정적인 인증 기반 데이터 패치 구현**
- **클라이언트 중심으로 캐싱을 적용하여 UX와 성능 모두 확보**
- 개인화 앱 구조에 맞는 **서버-클라이언트 혼합 전략 수립**
- 추후 쿠키 전달 문제 해결 시 **서버 캐싱 전략으로 유연하게 확장 가능한 구조**

<br/>

## **🚩 향후 계획**

- Supabase의 **세션 쿠키 전달 문제 해결 시, Next.js의 `revalidate` 및 `cache` 전략을 활용해 **서버 캐싱 구조 전환 계획**
  → `Route Handler`를 통해 서버에서 직접 데이터 요청 가능하면, 현재의 **클라이언트 중심 구조를 서버 중심 구조로 유연하게 전환\*\* 가능
- 추가 기능 구현 및 성능 개선
