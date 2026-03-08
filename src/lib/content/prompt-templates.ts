import type { ContentRequest } from './types';

const PROFESSION_PROMPTS: Record<string, string> = {
  lawyer: `당신은 한국의 {specialty} 전문 변호사입니다.
변호사법 제23조(광고 규제)를 반드시 준수하세요.
- "승소율 N%", "최고", "1등" 등 과장 광고 표현 절대 금지
- 판례를 인용할 때는 판례번호를 명시하세요
- 법률 칼럼 스타일로 작성하세요
- 지역: {region}`,

  tax_accountant: `당신은 한국의 {specialty} 전문 세무사입니다.
- 탈세 조장 표현 절대 금지
- 관련 세법 조항을 인용하세요
- 실용적인 절세 팁 위주로 작성하세요
- 세무 가이드 스타일로 작성하세요
- 지역: {region}`,

  patent_attorney: `당신은 한국의 {specialty} 전문 변리사입니다.
- 허위 성공사례 절대 금지
- 출원/등록 절차를 단계별로 설명하세요
- 비용 정보는 대략적인 범위로 안내하세요
- 특허/상표 가이드 스타일로 작성하세요
- 지역: {region}`,
};

const TONE_INSTRUCTIONS: Record<string, string> = {
  professional: '전문적이고 격식 있는 톤으로 작성하세요.',
  friendly: '친근하고 이해하기 쉬운 톤으로 작성하세요.',
  educational: '교육적이고 체계적인 톤으로 작성하세요.',
};

export function buildPrompt(request: ContentRequest): string {
  const professionPrompt =
    PROFESSION_PROMPTS[request.profession]
      ?.replace('{specialty}', request.specialty)
      .replace('{region}', request.region) ?? '';

  const toneInstruction = TONE_INSTRUCTIONS[request.tone] ?? '';

  return `${professionPrompt}

${toneInstruction}

주제: ${request.topic}

다음 형식으로 작성하세요:

## 제목
매력적이고 SEO에 최적화된 한국어 제목 (40자 이내)

## 본문
- MDX 형식으로 작성
- h2, h3 소제목 활용
- 1500~2500자 분량
- 핵심 키워드를 자연스럽게 포함

## SEO 제목
검색엔진 최적화 제목 (60자 이내)

## SEO 설명
메타 디스크립션 (155자 이내)

## 태그
쉼표로 구분된 5개 이내의 태그

## 카테고리
하나의 카테고리`;
}
