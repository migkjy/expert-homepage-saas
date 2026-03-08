# Demo Account System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enable CEO/prospects to experience the full onboarding flow and dashboard without creating real accounts or hitting APIs.

**Architecture:** localStorage-based demo session with `isDemo` flag. Demo mode reuses existing onboarding steps but skips API calls (step4 uses localStorage instead of POST /api/tenants). Demo dashboard loads hardcoded sample data. Demo banner component shown across all demo pages.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, localStorage

---

### Task 1: Demo Data & Utility Module

**Files:**
- Create: `src/lib/demo.ts`

**Step 1: Create demo utility with sample data and helpers**

```typescript
// Demo session utilities - localStorage only, no DB
import type { Tenant } from '@/types/tenant';

const DEMO_KEY = 'isDemo';
const DEMO_DATA_KEY = 'demoData';

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEMO_KEY) === 'true';
}

export function startDemoSession(): void {
  localStorage.setItem(DEMO_KEY, 'true');
  // Pre-fill onboarding data for demo
  localStorage.setItem('onboarding_profession', 'lawyer');
}

export function clearDemoSession(): void {
  localStorage.removeItem(DEMO_KEY);
  localStorage.removeItem(DEMO_DATA_KEY);
  localStorage.removeItem('onboarding_profession');
  localStorage.removeItem('onboarding_info');
  localStorage.removeItem('onboarding_branding');
  localStorage.removeItem('onboarding_result');
}

export const DEMO_TENANT: Tenant = {
  id: 'demo-tenant',
  slug: 'demo-lawyer',
  businessName: '김변호사 법률사무소',
  ownerName: '김민수',
  profession: 'lawyer',
  specialties: ['이혼/가사', '상속/유언', '부동산', '민사소송'],
  region: '서울 강남구',
  phone: '02-555-1234',
  email: 'demo@prosite.kr',
  address: '서울특별시 강남구 테헤란로 123, 법조빌딩 5층',
  description: '20년 경력의 가사·상속 전문 변호사.',
  templateId: 'lawyer',
  plan: 'pro',
  createdAt: '2026-01-15T09:00:00Z',
  branding: { primaryColor: '#1B365D', tagline: '당신의 권리, 끝까지 지켜드립니다' },
  blogPosts: [
    { id: 'demo-post-1', title: '협의이혼 절차와 주의사항 총정리', slug: 'divorce-guide', excerpt: '협의이혼 절차를 한눈에 정리합니다.', content: '...', publishedAt: '2026-03-01T10:00:00Z', published: true },
    { id: 'demo-post-2', title: '상속분쟁, 소송 전 알아야 할 5가지', slug: 'inheritance-tips', excerpt: '상속 문제 해결 팁.', content: '...', publishedAt: '2026-02-20T10:00:00Z', published: true },
    { id: 'demo-post-3', title: '부동산 매매 계약서 체크리스트', slug: 'real-estate-checklist', excerpt: '매매 계약 필수 확인 항목.', content: '...', publishedAt: '2026-02-10T10:00:00Z', published: true },
  ],
  consultations: [
    { id: 'demo-consult-1', name: '이**', phone: '010-****-5678', field: '이혼/가사', message: '협의이혼 재산분할 상담 요청', createdAt: '2026-03-05T14:30:00Z', status: 'contacted' },
    { id: 'demo-consult-2', name: '박**', phone: '010-****-9012', field: '상속/유언', message: '유언장 작성 관련 상담', createdAt: '2026-03-06T09:00:00Z', status: 'pending' },
  ],
  stats: { totalVisitors: 2340, monthlyVisitors: 456, totalConsultations: 23 },
};
```

**Step 2: Commit**
```bash
git add src/lib/demo.ts
git commit -m "feat(demo): add demo utility module with sample data"
```

---

### Task 2: Demo Banner Component

**Files:**
- Create: `src/components/demo/demo-banner.tsx`

**Step 1: Create banner component**

Sticky top banner showing "데모 모드" with link to start real service.

**Step 2: Commit**

---

### Task 3: /demo Landing Page

**Files:**
- Create: `src/app/demo/page.tsx`

**Step 1: Create demo entry page**

Explains what demo covers, has "데모 시작" button that calls startDemoSession() and redirects to /onboarding/step1.

**Step 2: Commit**

---

### Task 4: Modify Onboarding Step4 for Demo Mode

**Files:**
- Modify: `src/app/onboarding/step4/page.tsx`

**Step 1: Add demo mode branch**

In demo mode, skip API call, save to localStorage directly, redirect to /onboarding/complete with demo flag.

**Step 2: Commit**

---

### Task 5: Demo-aware Onboarding Complete

**Files:**
- Modify: `src/app/onboarding/complete/page.tsx`

In demo mode, show "실제 서비스로 전환하기" CTA and link to /dashboard?demo=true.

---

### Task 6: Demo Dashboard

**Files:**
- Create: `src/app/demo/dashboard/page.tsx`
- Or modify: `src/app/dashboard/page.tsx` to handle demo mode

Dashboard with DEMO_TENANT data pre-filled. Demo banner on top.

---

### Task 7: Demo Site Preview

**Files:**
- Modify: `src/app/sites/[slug]/page.tsx` to handle demo-lawyer slug

---

### Task 8: Landing Page CTA

**Files:**
- Modify: `src/components/landing/hero-section.tsx`

Add "데모 체험하기" button linking to /demo.

---

### Task 9: Build Verification & Final Commit

Run `npm run build`, fix any errors, final commit + push.
