import type { Tenant } from '@/types/tenant';

const DEMO_KEY = 'isDemo';

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEMO_KEY) === 'true';
}

export function startDemoSession(): void {
  localStorage.setItem(DEMO_KEY, 'true');
}

export function clearDemoSession(): void {
  localStorage.removeItem(DEMO_KEY);
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
  description: '20년 경력의 가사·상속 전문 변호사. 의뢰인의 권리를 끝까지 지켜드립니다.',
  templateId: 'lawyer',
  plan: 'pro',
  createdAt: '2026-01-15T09:00:00Z',
  branding: {
    primaryColor: '#1B365D',
    tagline: '당신의 권리, 끝까지 지켜드립니다',
  },
  blogPosts: [
    {
      id: 'demo-post-1',
      title: '협의이혼 절차와 주의사항 총정리',
      slug: 'divorce-guide',
      excerpt: '협의이혼을 고려하고 계신가요? 절차, 필요 서류, 숙려기간까지 한눈에 정리해 드립니다.',
      content: '협의이혼은 부부 양측이 이혼에 합의한 경우 진행하는 절차입니다...',
      publishedAt: '2026-03-01T10:00:00Z',
      published: true,
    },
    {
      id: 'demo-post-2',
      title: '상속분쟁, 소송 전 알아야 할 5가지',
      slug: 'inheritance-tips',
      excerpt: '상속 문제로 가족 간 갈등이 생겼을 때, 소송 전 반드시 확인해야 할 사항들.',
      content: '상속분쟁은 가족 관계를 시험하는 어려운 과정입니다...',
      publishedAt: '2026-02-20T10:00:00Z',
      published: true,
    },
    {
      id: 'demo-post-3',
      title: '부동산 매매 계약서 작성 시 체크리스트',
      slug: 'real-estate-checklist',
      excerpt: '부동산 매매 계약 전 반드시 확인해야 할 항목들을 정리했습니다.',
      content: '부동산 거래는 큰 금액이 오가는 만큼 계약서 작성에 신중해야 합니다...',
      publishedAt: '2026-02-10T10:00:00Z',
      published: true,
    },
  ],
  consultations: [
    {
      id: 'demo-consult-1',
      name: '이**',
      phone: '010-****-5678',
      field: '이혼/가사',
      message: '협의이혼 진행 중인데 재산분할 관련 상담 받고 싶습니다.',
      createdAt: '2026-03-05T14:30:00Z',
      status: 'contacted',
    },
    {
      id: 'demo-consult-2',
      name: '박**',
      phone: '010-****-9012',
      field: '상속/유언',
      message: '유언장 작성 관련 상담 요청드립니다.',
      createdAt: '2026-03-06T09:00:00Z',
      status: 'pending',
    },
  ],
  stats: {
    totalVisitors: 2340,
    monthlyVisitors: 456,
    totalConsultations: 23,
  },
};
