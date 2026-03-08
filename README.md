# Expert Homepage SaaS (ProSite)

전문직(변호사, 세무사, 변리사) AI 홈페이지 + 마케팅 SaaS MVP.
멀티테넌트 서브도메인 구조(`{slug}.prosite.kr`)로 각 전문가에게 독립 홈페이지를 제공합니다.

## 주요 기능

- **4단계 온보딩**: 직종 선택 → 기본 정보 → 브랜딩 설정 → 확인/완료
- **멀티테넌트 사이트**: 서브도메인 기반 독립 홈페이지 (middleware.ts 라우팅)
- **대시보드**: 방문자 통계, 상담 예약 관리, 블로그 관리, 설정
- **AI 콘텐츠 생성**: Anthropic Claude API 기반 블로그 자동 생성 + 유효성 검증
- **관리자 패널**: 테넌트 목록 조회 및 상세 관리 (`app.prosite.kr`)
- **데모 모드**: 회원가입 없이 전체 플로우 체험 (30분 세션, 데이터 미저장)
- **직종별 템플릿**: 변호사/세무사/변리사 각각 최적화된 홈페이지 디자인
- **네이버 블로그 연동**: MDX → 네이버 블로그 HTML 변환 스크립트

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS 4 |
| AI | Anthropic Claude SDK (`@anthropic-ai/sdk`) |
| 데이터 | JSON 파일 기반 (MVP) |
| 테스트 | Vitest + React Testing Library + jsdom |
| 린트 | ESLint 9 + eslint-config-next |
| 배포 | Vercel (Git 자동 배포) |

## 로컬 개발

```bash
git clone https://github.com/migkjy/expert-homepage-saas.git
cd expert-homepage-saas
npm install
cp .env.example .env.local
# .env.local에 필요한 값 입력
npm run dev
```

http://localhost:3000 에서 랜딩 페이지 확인.

### 로컬 멀티테넌트 테스트

로컬에서는 서브도메인 대신 쿼리 파라미터로 테넌트를 지정합니다:

```
http://localhost:3000?tenant=kim-law      # 변호사 사이트
http://localhost:3000?tenant=park-tax     # 세무사 사이트
http://localhost:3000?tenant=lee-patent   # 변리사 사이트
```

## 환경변수

| 변수 | 용도 | 필수 |
|------|------|------|
| `ANTHROPIC_API_KEY` | Claude AI 콘텐츠 생성 API 키 | 선택 (AI 생성 기능 사용 시 필수) |
| `NEXT_PUBLIC_ROOT_DOMAIN` | 멀티테넌트 루트 도메인 (기본값: `prosite.kr`) | 선택 |
| `NAVER_CLIENT_ID` | 네이버 검색 API 클라이언트 ID (키워드 리서치용) | 선택 |
| `NAVER_CLIENT_SECRET` | 네이버 검색 API 시크릿 | 선택 |

## 배포

Vercel에 GitHub 레포가 연결되어 있으며, `main` 브랜치 push 시 자동 배포됩니다.

```bash
# 배포 전 빌드 확인
npm run build
```

## 프로젝트 구조

```
expert-homepage-saas/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # 랜딩 페이지 (prosite.kr)
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   ├── sitemap.ts                # 동적 사이트맵
│   │   ├── robots.ts                 # robots.txt
│   │   ├── not-found.tsx             # 404 페이지
│   │   ├── demo/                     # 데모 모드
│   │   │   ├── page.tsx              #   데모 시작 페이지
│   │   │   └── dashboard/page.tsx    #   데모 대시보드
│   │   ├── onboarding/               # 온보딩 플로우
│   │   │   ├── step1/ ~ step4/       #   4단계 온보딩
│   │   │   └── complete/             #   완료 페이지
│   │   ├── dashboard/                # 테넌트 관리 대시보드
│   │   │   ├── blog/                 #   블로그 관리
│   │   │   ├── consultations/        #   상담 예약 관리
│   │   │   ├── stats/                #   방문자 통계
│   │   │   └── settings/             #   사이트 설정
│   │   ├── admin/                    # 관리자 패널 (app.prosite.kr)
│   │   │   └── tenants/              #   테넌트 목록/상세
│   │   ├── sites/[slug]/             # 테넌트 홈페이지 (서브도메인 라우팅)
│   │   └── api/tenants/              # 테넌트 REST API
│   ├── components/
│   │   ├── landing/                  # 랜딩 페이지 컴포넌트
│   │   ├── dashboard/                # 대시보드 UI
│   │   ├── onboarding/               # 온보딩 UI
│   │   ├── tenant/                   # 테넌트 사이트 공통 (헤더, 푸터, 상담폼, JSON-LD)
│   │   ├── templates/                # 직종별 홈페이지 템플릿
│   │   ├── demo/                     # 데모 배너
│   │   └── ui/                       # 공용 UI (Button 등)
│   ├── lib/
│   │   ├── data/tenants.json         # 테넌트 샘플 데이터
│   │   ├── demo.ts                   # 데모 세션 유틸
│   │   ├── constants.ts              # 공통 상수
│   │   └── content/                  # AI 콘텐츠 시스템
│   │       ├── ai-generator.ts       #   Claude 기반 콘텐츠 생성
│   │       ├── content-validator.ts   #   콘텐츠 유효성 검증
│   │       ├── keyword-research.ts   #   네이버 키워드 리서치
│   │       ├── prompt-templates.ts   #   프롬프트 템플릿
│   │       └── types.ts              #   콘텐츠 타입 정의
│   ├── types/tenant.ts               # 테넌트 타입 정의
│   ├── middleware.ts                 # 서브도메인 → 내부 경로 리라이트
│   └── __tests__/                    # 테스트 파일
├── content/                          # 테넌트별 블로그 콘텐츠 (MDX)
│   ├── kim-lawyer/
│   ├── park-tax/
│   └── lee-patent/
├── scripts/
│   ├── content-scheduler.ts          # AI 블로그 일괄 생성 스크립트
│   └── naver-blog-sync.ts            # MDX → 네이버 블로그 HTML 변환
├── docs/plans/                       # 기획 문서
├── vitest.config.ts                  # Vitest 설정
└── package.json
```

## 데모 모드

데모 모드는 회원가입 없이 전체 서비스를 체험할 수 있는 기능입니다.

**플로우**: `/demo` → 온보딩 4단계 → 대시보드 → 사이트 미리보기

- 브라우저 sessionStorage 기반 (30분 세션)
- 데이터 저장 없음, 브라우저 종료 시 초기화
- AI 콘텐츠 생성은 샘플 데이터로 대체

## 스크립트

```bash
# AI 블로그 콘텐츠 생성 (ANTHROPIC_API_KEY 필요)
npx tsx scripts/content-scheduler.ts
npx tsx scripts/content-scheduler.ts --tenant=kim-lawyer --count=3

# MDX → 네이버 블로그 HTML 변환
npx tsx scripts/naver-blog-sync.ts content/kim-lawyer/post.mdx
npx tsx scripts/naver-blog-sync.ts content/kim-lawyer/post.mdx --output=output.html
```

## 테스트

```bash
npm test              # 전체 테스트 실행
npm run test:watch    # 워치 모드
```

테스트 환경: Vitest + jsdom + React Testing Library

## 라이선스

Private
