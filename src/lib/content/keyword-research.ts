import type { KeywordResult, Profession } from './types';

const MOCK_KEYWORDS: Record<Profession, KeywordResult[]> = {
  lawyer: [
    { keyword: '이혼 소송 절차', searchVolume: 12000, competition: 'high', profession: 'lawyer' },
    { keyword: '상속 포기 방법', searchVolume: 8500, competition: 'medium', profession: 'lawyer' },
    { keyword: '형사 합의금', searchVolume: 6200, competition: 'high', profession: 'lawyer' },
    { keyword: '부동산 분쟁', searchVolume: 5400, competition: 'medium', profession: 'lawyer' },
    { keyword: '임대차 보증금 반환', searchVolume: 4800, competition: 'low', profession: 'lawyer' },
    { keyword: '교통사고 합의', searchVolume: 7100, competition: 'high', profession: 'lawyer' },
    { keyword: '근로계약 해지', searchVolume: 3200, competition: 'low', profession: 'lawyer' },
    { keyword: '명예훼손 소송', searchVolume: 4100, competition: 'medium', profession: 'lawyer' },
  ],
  tax_accountant: [
    { keyword: '종합소득세 신고', searchVolume: 15000, competition: 'high', profession: 'tax_accountant' },
    { keyword: '부가세 환급', searchVolume: 9800, competition: 'medium', profession: 'tax_accountant' },
    { keyword: '양도소득세 계산', searchVolume: 11000, competition: 'high', profession: 'tax_accountant' },
    { keyword: '법인세 절세', searchVolume: 6500, competition: 'medium', profession: 'tax_accountant' },
    { keyword: '프리랜서 경비처리', searchVolume: 7200, competition: 'low', profession: 'tax_accountant' },
    { keyword: '증여세 면제한도', searchVolume: 8900, competition: 'medium', profession: 'tax_accountant' },
    { keyword: '사업자등록 방법', searchVolume: 5600, competition: 'low', profession: 'tax_accountant' },
    { keyword: '4대보험 계산', searchVolume: 4300, competition: 'low', profession: 'tax_accountant' },
  ],
  patent_attorney: [
    { keyword: '특허 출원 비용', searchVolume: 5200, competition: 'medium', profession: 'patent_attorney' },
    { keyword: '상표 등록 절차', searchVolume: 6800, competition: 'medium', profession: 'patent_attorney' },
    { keyword: '디자인 등록', searchVolume: 3100, competition: 'low', profession: 'patent_attorney' },
    { keyword: 'PCT 출원', searchVolume: 2400, competition: 'low', profession: 'patent_attorney' },
    { keyword: '특허 침해 대응', searchVolume: 1800, competition: 'high', profession: 'patent_attorney' },
    { keyword: '실용신안 등록', searchVolume: 2100, competition: 'low', profession: 'patent_attorney' },
    { keyword: '상표권 분쟁', searchVolume: 1500, competition: 'medium', profession: 'patent_attorney' },
    { keyword: '영업비밀 보호', searchVolume: 1900, competition: 'low', profession: 'patent_attorney' },
  ],
};

export async function getKeywords(
  profession: Profession,
): Promise<KeywordResult[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.log('[mock mode] Naver API keys not set, using mock keywords');
    return MOCK_KEYWORDS[profession] ?? [];
  }

  const keywords = MOCK_KEYWORDS[profession].map((k) => k.keyword);

  try {
    const response = await fetch(
      'https://openapi.naver.com/v1/datalab/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
        body: JSON.stringify({
          startDate: '2025-03-01',
          endDate: '2026-03-01',
          timeUnit: 'month',
          keywordGroups: keywords.slice(0, 5).map((k) => ({
            groupName: k,
            keywords: [k],
          })),
        }),
      },
    );

    if (!response.ok) {
      console.warn(
        `Naver API error: ${response.status}, falling back to mock`,
      );
      return MOCK_KEYWORDS[profession];
    }

    const data = (await response.json()) as {
      results: Array<{ title: string; data: Array<{ ratio: number }> }>;
    };

    return data.results.map((r) => {
      const avgRatio =
        r.data.reduce((sum, d) => sum + d.ratio, 0) / r.data.length;
      return {
        keyword: r.title,
        searchVolume: Math.round(avgRatio * 100),
        competition:
          avgRatio > 70
            ? ('high' as const)
            : avgRatio > 30
              ? ('medium' as const)
              : ('low' as const),
        profession,
      };
    });
  } catch (error) {
    console.warn('Naver API call failed, using mock data:', error);
    return MOCK_KEYWORDS[profession];
  }
}
