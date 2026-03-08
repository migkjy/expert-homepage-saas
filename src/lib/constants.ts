export const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'prosite.kr';
export const APP_SUBDOMAIN = 'app';
export const WWW_SUBDOMAIN = 'www';

export const PRICING = [
  {
    id: 'starter',
    name: '스타터',
    price: 9900,
    priceLabel: '9,900',
    description: '시작하는 전문가를 위한 기본 플랜',
    features: [
      '홈페이지 1개',
      '블로그 글 주 2회 AI 생성',
      '기본 SEO 최적화',
      '모바일 반응형',
      '상담 예약 폼',
    ],
    cta: '시작하기',
    popular: false,
  },
  {
    id: 'pro',
    name: '프로',
    price: 29000,
    priceLabel: '29,000',
    description: '성장하는 사무소를 위한 추천 플랜',
    features: [
      '홈페이지 1개',
      '블로그 글 주 5회 AI 생성',
      'SNS 크로스포스팅',
      '키워드 분석 리포트',
      '고급 SEO 최적화',
      '상담 예약 관리',
      '방문자 통계',
    ],
    cta: '가장 인기 있는 플랜',
    popular: true,
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: 59000,
    priceLabel: '59,000',
    description: '브랜딩을 중시하는 전문가를 위한 플랜',
    features: [
      '프로 플랜 전체 기능',
      '커스텀 도메인 연결',
      '뉴스레터 자동 발송',
      '상담 예약 자동 알림',
      '경쟁사 분석 리포트',
      '우선 기술 지원',
    ],
    cta: '시작하기',
    popular: false,
  },
  {
    id: 'agency',
    name: '에이전시',
    price: 149000,
    priceLabel: '149,000',
    description: '여러 사무소를 관리하는 에이전시용',
    features: [
      '프리미엄 플랜 전체 기능',
      '사무소 5개까지 관리',
      '화이트라벨 브랜딩',
      '전용 계정 관리자',
      'API 접근 권한',
      '맞춤 보고서',
    ],
    cta: '문의하기',
    popular: false,
  },
] as const;
