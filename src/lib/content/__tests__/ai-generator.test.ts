import { describe, it, expect } from 'vitest';
import { generateContent, parseLLMResponse } from '../ai-generator';
import type { ContentRequest } from '../types';

const mockRequest: ContentRequest = {
  profession: 'lawyer',
  specialty: '이혼',
  region: '서울',
  topic: '2026년 이혼 소송 절차',
  tone: 'professional',
  tenantSlug: 'kim-lawyer',
};

describe('parseLLMResponse', () => {
  it('parses structured LLM response into GeneratedContent', () => {
    const raw = `## 제목
2026년 이혼 소송 절차 완전 가이드

## 본문
이혼 소송은 크게 협의이혼과 재판이혼으로 나뉩니다.

### 협의이혼
양 당사자가 합의하는 경우입니다.

### 재판이혼
법원에 소를 제기하는 경우입니다.

## SEO 제목
2026년 이혼 소송 절차 — 협의이혼 vs 재판이혼 가이드

## SEO 설명
이혼을 고려 중이신가요? 2026년 기준 협의이혼과 재판이혼 절차를 단계별로 안내합니다.

## 태그
이혼, 소송, 협의이혼, 재판이혼, 가사소송

## 카테고리
가족법`;

    const result = parseLLMResponse(raw);
    expect(result.title).toBe('2026년 이혼 소송 절차 완전 가이드');
    expect(result.body).toContain('협의이혼');
    expect(result.seoTitle).toContain('이혼 소송');
    expect(result.seoDescription.length).toBeLessThanOrEqual(200);
    expect(result.tags).toContain('이혼');
    expect(result.category).toBe('가족법');
  });
});

describe('generateContent (mock mode)', () => {
  it('returns generated content in mock mode', async () => {
    const result = await generateContent(mockRequest);
    expect(result.title).toBeTruthy();
    expect(result.body).toBeTruthy();
    expect(result.seoTitle).toBeTruthy();
    expect(result.tags.length).toBeGreaterThan(0);
    expect(result.category).toBeTruthy();
  });
});
