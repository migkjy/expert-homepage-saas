# Expert Homepage SaaS - AI Content Engine Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an AI content auto-generation + blog publishing system for Korean professionals (lawyers, tax accountants, patent attorneys).

**Architecture:** Modular TypeScript modules under `src/lib/content/` for content generation, validation, publishing, and keyword research. CLI scripts under `scripts/` for batch operations. MDX output to `content/{tenantSlug}/blog/`. Claude API for generation with mock fallback.

**Tech Stack:** TypeScript, Claude API (@anthropic-ai/sdk), MDX, gray-matter (frontmatter), Node.js fs/path

---

### Task 1: Content Types & Constants

**Files:**
- Create: `src/lib/content/types.ts`

**Step 1: Create shared types**

```typescript
// src/lib/content/types.ts

export type Profession = 'lawyer' | 'tax_accountant' | 'patent_attorney';

export type ContentTone = 'professional' | 'friendly' | 'educational';

export interface ContentRequest {
  profession: Profession;
  specialty: string;
  region: string;
  topic: string;
  tone: ContentTone;
  tenantSlug: string;
}

export interface GeneratedContent {
  title: string;
  body: string; // MDX format
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  category: string;
}

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  autoFixed: string;
}

export interface BlogPost {
  slug: string;
  filePath: string;
  frontmatter: BlogFrontmatter;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  seoTitle: string;
  seoDescription: string;
  status: 'draft' | 'scheduled' | 'published';
}

export interface KeywordResult {
  keyword: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  profession: Profession;
}

export const PROFESSION_LABELS: Record<Profession, string> = {
  lawyer: '변호사',
  tax_accountant: '세무사',
  patent_attorney: '변리사',
};

export const PROHIBITED_EXPRESSIONS: Record<Profession, RegExp[]> = {
  lawyer: [
    /승소율\s*\d+%/g,
    /최고의?\s*(변호사|로펌|법률)/g,
    /1등\s*(변호사|로펌)/g,
    /무조건\s*(승소|이김)/g,
    /100%\s*(승소|성공|해결)/g,
    /업계\s*최초/g,
    /대한민국\s*(최고|1위|넘버원)/g,
  ],
  tax_accountant: [
    /탈세\s*(방법|노하우|팁)/g,
    /세금\s*(안\s*내는|회피)\s*(방법|노하우)/g,
    /무조건\s*(환급|절세)/g,
    /100%\s*(환급|절세|성공)/g,
  ],
  patent_attorney: [
    /100%\s*(등록|승인|성공)/g,
    /무조건\s*(등록|특허)/g,
    /최고의?\s*(변리사|특허)/g,
    /허위\s*(성공|등록)\s*사례/g,
  ],
};
```

**Step 2: Commit**

```bash
git add src/lib/content/types.ts
git commit -m "feat(expert-saas): add content engine types and constants"
```

---

### Task 2: Content Validator

**Files:**
- Create: `src/lib/content/content-validator.ts`
- Create: `src/lib/content/__tests__/content-validator.test.ts`

**Step 1: Write failing tests**

```typescript
// src/lib/content/__tests__/content-validator.test.ts
import { describe, it, expect } from 'vitest';
import { validateContent } from '../content-validator';
import type { Profession } from '../types';

describe('validateContent', () => {
  it('passes valid lawyer content', () => {
    const result = validateContent(
      'lawyer',
      '이혼 소송에서 알아야 할 3가지 핵심 사항을 정리했습니다.'
    );
    expect(result.isValid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it('detects prohibited lawyer expressions - win rate', () => {
    const result = validateContent(
      'lawyer',
      '저희 로펌은 승소율 95%를 자랑합니다.'
    );
    expect(result.isValid).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('승소율');
  });

  it('detects prohibited lawyer expressions - superlative', () => {
    const result = validateContent(
      'lawyer',
      '대한민국 최고의 변호사가 도와드립니다.'
    );
    expect(result.isValid).toBe(false);
  });

  it('detects prohibited tax accountant expressions', () => {
    const result = validateContent(
      'tax_accountant',
      '세금 안 내는 방법을 알려드립니다.'
    );
    expect(result.isValid).toBe(false);
  });

  it('detects prohibited patent attorney expressions', () => {
    const result = validateContent(
      'patent_attorney',
      '100% 등록 보장합니다.'
    );
    expect(result.isValid).toBe(false);
  });

  it('auto-fixes prohibited expressions by removing them', () => {
    const result = validateContent(
      'lawyer',
      '저희는 승소율 95%를 자랑하는 로펌입니다. 상담 문의 주세요.'
    );
    expect(result.autoFixed).not.toContain('승소율 95%');
    expect(result.autoFixed).toContain('상담 문의 주세요');
  });

  it('adds disclaimer for lawyer content', () => {
    const result = validateContent(
      'lawyer',
      '이혼 소송 절차를 안내합니다.'
    );
    expect(result.autoFixed).toContain('법적 조언을 대체하지 않습니다');
  });

  it('adds disclaimer for tax accountant content', () => {
    const result = validateContent(
      'tax_accountant',
      '종합소득세 신고 방법입니다.'
    );
    expect(result.autoFixed).toContain('세무 상담을 대체하지 않습니다');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd projects/expert-homepage-saas && npx vitest run src/lib/content/__tests__/content-validator.test.ts`
Expected: FAIL - module not found

**Step 3: Implement content-validator.ts**

```typescript
// src/lib/content/content-validator.ts
import { PROHIBITED_EXPRESSIONS, type Profession, type ValidationResult } from './types';

const DISCLAIMERS: Record<Profession, string> = {
  lawyer: '\n\n---\n*본 글은 일반적인 법률 정보를 제공하며, 구체적인 법적 조언을 대체하지 않습니다. 개별 사안은 반드시 변호사와 상담하시기 바랍니다.*',
  tax_accountant: '\n\n---\n*본 글은 일반적인 세무 정보를 제공하며, 구체적인 세무 상담을 대체하지 않습니다. 개별 사안은 반드시 세무사와 상담하시기 바랍니다.*',
  patent_attorney: '\n\n---\n*본 글은 일반적인 지식재산권 정보를 제공하며, 구체적인 법적 자문을 대체하지 않습니다. 개별 사안은 반드시 변리사와 상담하시기 바랍니다.*',
};

export function validateContent(
  profession: Profession,
  content: string
): ValidationResult {
  const warnings: string[] = [];
  let autoFixed = content;

  const patterns = PROHIBITED_EXPRESSIONS[profession] ?? [];
  for (const pattern of patterns) {
    // Reset lastIndex for global regex
    pattern.lastIndex = 0;
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        warnings.push(`광고 규제 위반 표현 감지: "${match}"`);
      }
      autoFixed = autoFixed.replace(pattern, '').replace(/\s{2,}/g, ' ').trim();
    }
  }

  // Add disclaimer
  autoFixed = autoFixed + DISCLAIMERS[profession];

  return {
    isValid: warnings.length === 0,
    warnings,
    autoFixed,
  };
}
```

**Step 4: Run tests to verify pass**

Run: `cd projects/expert-homepage-saas && npx vitest run src/lib/content/__tests__/content-validator.test.ts`
Expected: ALL PASS

**Step 5: Commit**

```bash
git add src/lib/content/content-validator.ts src/lib/content/__tests__/content-validator.test.ts
git commit -m "feat(expert-saas): add content validator with ad-regulation checks"
```

---

### Task 3: AI Content Generator

**Files:**
- Create: `src/lib/content/ai-generator.ts`
- Create: `src/lib/content/prompt-templates.ts`
- Create: `src/lib/content/__tests__/ai-generator.test.ts`

**Step 1: Create prompt templates**

```typescript
// src/lib/content/prompt-templates.ts
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
  const professionPrompt = PROFESSION_PROMPTS[request.profession]
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
```

**Step 2: Write failing tests for AI generator**

```typescript
// src/lib/content/__tests__/ai-generator.test.ts
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
```

**Step 3: Implement ai-generator.ts**

```typescript
// src/lib/content/ai-generator.ts
import { buildPrompt } from './prompt-templates';
import type { ContentRequest, GeneratedContent } from './types';

export function parseLLMResponse(raw: string): GeneratedContent {
  const sections: Record<string, string> = {};
  let currentKey = '';

  for (const line of raw.split('\n')) {
    const headerMatch = line.match(/^##\s+(.+)/);
    if (headerMatch) {
      currentKey = headerMatch[1].trim();
      sections[currentKey] = '';
    } else if (currentKey) {
      sections[currentKey] += line + '\n';
    }
  }

  const trim = (key: string) => (sections[key] ?? '').trim();

  return {
    title: trim('제목'),
    body: trim('본문'),
    seoTitle: trim('SEO 제목'),
    seoDescription: trim('SEO 설명'),
    tags: trim('태그').split(',').map(t => t.trim()).filter(Boolean),
    category: trim('카테고리'),
  };
}

function getMockContent(request: ContentRequest): GeneratedContent {
  const mockData: Record<string, GeneratedContent> = {
    lawyer: {
      title: `${request.topic} — ${request.specialty} 전문 변호사 가이드`,
      body: `${request.topic}에 대해 알아보겠습니다.\n\n### 주요 절차\n\n1단계부터 차근차근 설명드리겠습니다.\n\n${request.specialty} 분야에서 가장 많이 문의하시는 내용을 정리했습니다.\n\n### 비용 및 기간\n\n일반적인 소요 기간과 비용에 대해 안내드립니다.\n\n### 주의사항\n\n반드시 전문 변호사와 상담 후 진행하시기 바랍니다.`,
      seoTitle: `${request.topic} — ${request.region} ${request.specialty} 전문 변호사`,
      seoDescription: `${request.topic}의 절차, 비용, 주의사항을 ${request.specialty} 전문 변호사가 알기 쉽게 설명합니다.`,
      tags: [request.specialty, '법률상담', request.region, '변호사'],
      category: request.specialty,
    },
    tax_accountant: {
      title: `${request.topic} — ${request.specialty} 세무사 가이드`,
      body: `${request.topic}에 대해 실용적인 세무 가이드를 제공합니다.\n\n### 신고 절차\n\n단계별로 알아보겠습니다.\n\n### 절세 팁\n\n합법적인 절세 방법을 소개합니다.\n\n### 주의사항\n\n개별 사안은 세무사와 상담하시기 바랍니다.`,
      seoTitle: `${request.topic} — ${request.region} ${request.specialty} 세무사 가이드`,
      seoDescription: `${request.topic}의 핵심 포인트를 ${request.specialty} 전문 세무사가 정리했습니다.`,
      tags: [request.specialty, '세무상담', request.region, '세무사'],
      category: request.specialty,
    },
    patent_attorney: {
      title: `${request.topic} — ${request.specialty} 변리사 가이드`,
      body: `${request.topic}에 대해 전문적으로 안내합니다.\n\n### 출원 절차\n\n단계별 절차를 설명합니다.\n\n### 비용 안내\n\n대략적인 비용 범위를 안내합니다.\n\n### 주의사항\n\n변리사와 상담 후 진행하시기 바랍니다.`,
      seoTitle: `${request.topic} — ${request.region} ${request.specialty} 변리사`,
      seoDescription: `${request.topic}의 절차와 비용을 ${request.specialty} 전문 변리사가 설명합니다.`,
      tags: [request.specialty, '지식재산권', request.region, '변리사'],
      category: request.specialty,
    },
  };

  return mockData[request.profession] ?? mockData.lawyer;
}

export async function generateContent(
  request: ContentRequest
): Promise<GeneratedContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log('[mock mode] ANTHROPIC_API_KEY not set, using mock content');
    return getMockContent(request);
  }

  // Dynamic import to avoid errors when sdk not installed
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey });

  const prompt = buildPrompt(request);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block): block is { type: 'text'; text: string } => block.type === 'text')
    .map(block => block.text)
    .join('\n');

  return parseLLMResponse(text);
}
```

**Step 4: Run tests**

Run: `cd projects/expert-homepage-saas && npx vitest run src/lib/content/__tests__/ai-generator.test.ts`
Expected: ALL PASS

**Step 5: Commit**

```bash
git add src/lib/content/ai-generator.ts src/lib/content/prompt-templates.ts src/lib/content/__tests__/ai-generator.test.ts
git commit -m "feat(expert-saas): add AI content generator with mock fallback"
```

---

### Task 4: Blog Publisher

**Files:**
- Create: `src/lib/content/blog-publisher.ts`
- Create: `src/lib/content/__tests__/blog-publisher.test.ts`

**Step 1: Write failing tests**

```typescript
// src/lib/content/__tests__/blog-publisher.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createBlogPost, generateSlug, buildFrontmatter } from '../blog-publisher';
import * as fs from 'fs';
import * as path from 'path';

const TEST_CONTENT_DIR = path.join(process.cwd(), 'content', '__test-tenant__', 'blog');

describe('generateSlug', () => {
  it('converts Korean title to date-based slug', () => {
    const slug = generateSlug('이혼 소송 절차 완전 가이드');
    expect(slug).toMatch(/^[a-z0-9-]+$/);
    expect(slug.length).toBeGreaterThan(0);
  });
});

describe('buildFrontmatter', () => {
  it('creates valid frontmatter string', () => {
    const fm = buildFrontmatter({
      title: '테스트 제목',
      date: '2026-03-08',
      category: '가족법',
      tags: ['이혼', '소송'],
      author: '김변호사',
      seoTitle: 'SEO 제목',
      seoDescription: 'SEO 설명',
      status: 'draft',
    });
    expect(fm).toContain('title: "테스트 제목"');
    expect(fm).toContain('category: "가족법"');
    expect(fm).toContain('status: "draft"');
  });
});

describe('createBlogPost', () => {
  beforeEach(() => {
    fs.mkdirSync(TEST_CONTENT_DIR, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(path.join(process.cwd(), 'content', '__test-tenant__'), { recursive: true, force: true });
  });

  it('creates MDX file with frontmatter and content', () => {
    const post = createBlogPost({
      tenantSlug: '__test-tenant__',
      title: '테스트 포스트',
      body: '본문 내용입니다.',
      seoTitle: 'SEO 테스트',
      seoDescription: 'SEO 설명',
      tags: ['테스트'],
      category: '테스트',
      author: '테스트 작성자',
      contentDir: path.join(process.cwd(), 'content'),
    });

    expect(post.status).toBe('draft');
    expect(fs.existsSync(post.filePath)).toBe(true);

    const content = fs.readFileSync(post.filePath, 'utf-8');
    expect(content).toContain('title: "테스트 포스트"');
    expect(content).toContain('본문 내용입니다.');
  });
});
```

**Step 2: Implement blog-publisher.ts**

```typescript
// src/lib/content/blog-publisher.ts
import * as fs from 'fs';
import * as path from 'path';
import type { BlogFrontmatter, BlogPost } from './types';

export function generateSlug(title: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const sanitized = title
    .toLowerCase()
    .replace(/[가-힣]+/g, (match) => {
      // Simple romanization: use hash of Korean text
      let hash = 0;
      for (let i = 0; i < match.length; i++) {
        hash = ((hash << 5) - hash) + match.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash).toString(36);
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return `${date}-${sanitized}`.slice(0, 80);
}

export function buildFrontmatter(fm: BlogFrontmatter): string {
  const lines = [
    '---',
    `title: "${fm.title}"`,
    `date: "${fm.date}"`,
    `category: "${fm.category}"`,
    `tags: [${fm.tags.map(t => `"${t}"`).join(', ')}]`,
    `author: "${fm.author}"`,
    `seoTitle: "${fm.seoTitle}"`,
    `seoDescription: "${fm.seoDescription}"`,
    `status: "${fm.status}"`,
    '---',
  ];
  return lines.join('\n');
}

interface CreateBlogPostOptions {
  tenantSlug: string;
  title: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  category: string;
  author: string;
  contentDir: string;
  status?: 'draft' | 'scheduled' | 'published';
}

export function createBlogPost(options: CreateBlogPostOptions): BlogPost {
  const slug = generateSlug(options.title);
  const date = new Date().toISOString().slice(0, 10);
  const status = options.status ?? 'draft';

  const frontmatter: BlogFrontmatter = {
    title: options.title,
    date,
    category: options.category,
    tags: options.tags,
    author: options.author,
    seoTitle: options.seoTitle,
    seoDescription: options.seoDescription,
    status,
  };

  const mdxContent = `${buildFrontmatter(frontmatter)}\n\n${options.body}\n`;

  const dir = path.join(options.contentDir, options.tenantSlug, 'blog');
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent, 'utf-8');

  return {
    slug,
    filePath,
    frontmatter,
    content: options.body,
    status,
  };
}
```

**Step 3: Run tests**

Run: `cd projects/expert-homepage-saas && npx vitest run src/lib/content/__tests__/blog-publisher.test.ts`
Expected: ALL PASS

**Step 4: Commit**

```bash
git add src/lib/content/blog-publisher.ts src/lib/content/__tests__/blog-publisher.test.ts
git commit -m "feat(expert-saas): add blog publisher with MDX generation"
```

---

### Task 5: Keyword Research Module

**Files:**
- Create: `src/lib/content/keyword-research.ts`
- Create: `src/lib/content/__tests__/keyword-research.test.ts`

**Step 1: Write failing tests**

```typescript
// src/lib/content/__tests__/keyword-research.test.ts
import { describe, it, expect } from 'vitest';
import { getKeywords } from '../keyword-research';

describe('getKeywords', () => {
  it('returns lawyer keywords in mock mode', async () => {
    const results = await getKeywords('lawyer');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].profession).toBe('lawyer');
    expect(results[0].keyword).toBeTruthy();
    expect(results[0].searchVolume).toBeGreaterThan(0);
  });

  it('returns tax_accountant keywords', async () => {
    const results = await getKeywords('tax_accountant');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].profession).toBe('tax_accountant');
  });

  it('returns patent_attorney keywords', async () => {
    const results = await getKeywords('patent_attorney');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].profession).toBe('patent_attorney');
  });
});
```

**Step 2: Implement keyword-research.ts**

```typescript
// src/lib/content/keyword-research.ts
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
  profession: Profession
): Promise<KeywordResult[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.log('[mock mode] Naver API keys not set, using mock keywords');
    return MOCK_KEYWORDS[profession] ?? [];
  }

  // Naver DataLab Search API
  const keywords = MOCK_KEYWORDS[profession].map(k => k.keyword);

  try {
    const response = await fetch('https://openapi.naver.com/v1/datalab/search', {
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
        keywordGroups: keywords.slice(0, 5).map(k => ({
          groupName: k,
          keywords: [k],
        })),
      }),
    });

    if (!response.ok) {
      console.warn(`Naver API error: ${response.status}, falling back to mock`);
      return MOCK_KEYWORDS[profession];
    }

    const data = await response.json() as {
      results: Array<{ title: string; data: Array<{ ratio: number }> }>;
    };

    return data.results.map((r) => {
      const avgRatio = r.data.reduce((sum, d) => sum + d.ratio, 0) / r.data.length;
      return {
        keyword: r.title,
        searchVolume: Math.round(avgRatio * 100),
        competition: avgRatio > 70 ? 'high' as const : avgRatio > 30 ? 'medium' as const : 'low' as const,
        profession,
      };
    });
  } catch (error) {
    console.warn('Naver API call failed, using mock data:', error);
    return MOCK_KEYWORDS[profession];
  }
}
```

**Step 3: Run tests**

Run: `cd projects/expert-homepage-saas && npx vitest run src/lib/content/__tests__/keyword-research.test.ts`
Expected: ALL PASS

**Step 4: Commit**

```bash
git add src/lib/content/keyword-research.ts src/lib/content/__tests__/keyword-research.test.ts
git commit -m "feat(expert-saas): add keyword research module with Naver API + mock"
```

---

### Task 6: Content Scheduler Script

**Files:**
- Create: `scripts/content-scheduler.ts`

**Step 1: Implement scheduler**

```typescript
// scripts/content-scheduler.ts
import * as path from 'path';
import * as fs from 'fs';
import { generateContent } from '../src/lib/content/ai-generator';
import { validateContent } from '../src/lib/content/content-validator';
import { createBlogPost } from '../src/lib/content/blog-publisher';
import { getKeywords } from '../src/lib/content/keyword-research';
import type { ContentRequest, Profession } from '../src/lib/content/types';

interface TenantConfig {
  slug: string;
  profession: Profession;
  specialty: string;
  region: string;
  author: string;
  tone: 'professional' | 'friendly' | 'educational';
}

const SAMPLE_TENANTS: TenantConfig[] = [
  { slug: 'kim-lawyer', profession: 'lawyer', specialty: '이혼/가사', region: '서울 강남', author: '김변호사', tone: 'professional' },
  { slug: 'park-tax', profession: 'tax_accountant', specialty: '종합소득세', region: '서울 서초', author: '박세무사', tone: 'friendly' },
  { slug: 'lee-patent', profession: 'patent_attorney', specialty: '특허/상표', region: '서울 역삼', author: '이변리사', tone: 'educational' },
];

async function run() {
  const args = process.argv.slice(2);
  const tenantArg = args.find(a => a.startsWith('--tenant='))?.split('=')[1];
  const countArg = parseInt(args.find(a => a.startsWith('--count='))?.split('=')[1] ?? '1', 10);

  const tenants = tenantArg
    ? SAMPLE_TENANTS.filter(t => t.slug === tenantArg)
    : SAMPLE_TENANTS;

  if (tenants.length === 0) {
    console.error(`Tenant "${tenantArg}" not found.`);
    process.exit(1);
  }

  const projectRoot = path.resolve(__dirname, '..');
  const contentDir = path.join(projectRoot, 'content');
  const logDir = path.join(projectRoot, 'data', 'content-logs');
  fs.mkdirSync(logDir, { recursive: true });

  const logs: string[] = [];

  for (const tenant of tenants) {
    console.log(`\n=== ${tenant.author} (${tenant.slug}) ===`);

    // 1. Keyword research
    const keywords = await getKeywords(tenant.profession);
    const topKeywords = keywords.slice(0, countArg);

    for (const kw of topKeywords) {
      console.log(`  Generating: "${kw.keyword}"`);

      const request: ContentRequest = {
        profession: tenant.profession,
        specialty: tenant.specialty,
        region: tenant.region,
        topic: kw.keyword,
        tone: tenant.tone,
        tenantSlug: tenant.slug,
      };

      // 2. Generate content
      const generated = await generateContent(request);

      // 3. Validate
      const validation = validateContent(tenant.profession, generated.body);
      if (!validation.isValid) {
        console.log(`    Warnings: ${validation.warnings.join(', ')}`);
        console.log('    Auto-fixing...');
      }

      // 4. Publish as draft
      const post = createBlogPost({
        tenantSlug: tenant.slug,
        title: generated.title,
        body: validation.autoFixed,
        seoTitle: generated.seoTitle,
        seoDescription: generated.seoDescription,
        tags: generated.tags,
        category: generated.category,
        author: tenant.author,
        contentDir,
      });

      console.log(`    Created: ${post.filePath}`);
      logs.push(`[${new Date().toISOString()}] ${tenant.slug} — "${generated.title}" → ${post.filePath}`);
    }
  }

  // Save log
  const logFile = path.join(logDir, `${new Date().toISOString().slice(0, 10)}.log`);
  fs.appendFileSync(logFile, logs.join('\n') + '\n', 'utf-8');
  console.log(`\nLog saved: ${logFile}`);
}

run().catch(console.error);
```

**Step 2: Commit**

```bash
git add scripts/content-scheduler.ts
git commit -m "feat(expert-saas): add content scheduler CLI script"
```

---

### Task 7: Naver Blog Sync Script

**Files:**
- Create: `scripts/naver-blog-sync.ts`

**Step 1: Implement sync script**

```typescript
// scripts/naver-blog-sync.ts
import * as fs from 'fs';
import * as path from 'path';

function mdxToNaverHtml(mdxContent: string): string {
  // Remove frontmatter
  const bodyMatch = mdxContent.match(/^---[\s\S]*?---\n\n([\s\S]*)$/);
  const body = bodyMatch?.[1] ?? mdxContent;

  let html = body
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    // Italic
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p>')
    // Single newlines
    .replace(/\n/g, '<br/>');

  // Wrap li items in ul
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  // Clean up consecutive ul tags
  html = html.replace(/<\/ul><br\/><ul>/g, '');

  return `<p>${html}</p>`;
}

function extractFrontmatter(mdx: string): Record<string, string> {
  const match = mdx.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const fm: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*"?(.+?)"?$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return fm;
}

function extractTags(mdx: string): string[] {
  const match = mdx.match(/tags:\s*\[(.+?)\]/);
  if (!match) return [];
  return match[1].split(',').map(t => t.trim().replace(/"/g, ''));
}

async function run() {
  const args = process.argv.slice(2);
  const filePath = args[0];

  if (!filePath) {
    console.log('Usage: npx tsx scripts/naver-blog-sync.ts <path-to-mdx>');
    console.log('  Options: --output=<file>  Save to file instead of stdout');
    process.exit(1);
  }

  const outputArg = args.find(a => a.startsWith('--output='))?.split('=')[1];
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const mdxContent = fs.readFileSync(absolutePath, 'utf-8');
  const frontmatter = extractFrontmatter(mdxContent);
  const tags = extractTags(mdxContent);
  const html = mdxToNaverHtml(mdxContent);

  const output = `
=== 네이버 블로그 포맷 ===

[제목]
${frontmatter.title ?? '(제목 없음)'}

[태그]
${tags.join(', ')}

[HTML 본문]
${html}

=== 끝 ===
`.trim();

  if (outputArg) {
    fs.writeFileSync(outputArg, output, 'utf-8');
    console.log(`Saved to: ${outputArg}`);
  } else {
    console.log(output);
  }
}

run().catch(console.error);
```

**Step 2: Commit**

```bash
git add scripts/naver-blog-sync.ts
git commit -m "feat(expert-saas): add Naver blog sync script (format converter)"
```

---

### Task 8: Sample MDX Content (6 articles)

**Files:**
- Create: `content/kim-lawyer/blog/2026-03-08-divorce-litigation-guide.mdx`
- Create: `content/kim-lawyer/blog/2026-03-08-inheritance-renunciation.mdx`
- Create: `content/park-tax/blog/2026-03-08-freelancer-income-tax.mdx`
- Create: `content/park-tax/blog/2026-03-08-capital-gains-tax-exemption.mdx`
- Create: `content/lee-patent/blog/2026-03-08-startup-patent-guide.mdx`
- Create: `content/lee-patent/blog/2026-03-08-trademark-vs-tradename.mdx`

Each file: ~1500-2500 chars with proper frontmatter.

**Step 1: Create all 6 files** (see exact content in implementation)

**Step 2: Commit**

```bash
git add content/
git commit -m "feat(expert-saas): add 6 sample blog posts (2 per profession)"
```

---

### Task 9: Environment Template & Dependencies

**Files:**
- Create: `scripts/.env.example`
- Create: `DEPENDENCIES.md`

**Step 1: Create .env.example**

```
ANTHROPIC_API_KEY=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
```

**Step 2: Create DEPENDENCIES.md**

```markdown
# Required Dependencies

These packages are needed for the content engine. Add to package.json:

## Runtime
- `@anthropic-ai/sdk` - Claude API for content generation

## Dev
- `vitest` - Testing framework
- `tsx` - TypeScript execution for scripts
- `typescript` - TypeScript compiler
```

**Step 3: Commit**

```bash
git add scripts/.env.example DEPENDENCIES.md
git commit -m "feat(expert-saas): add env template and dependency list"
```

---

## Execution Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Types & Constants | 1 |
| 2 | Content Validator + Tests | 2 |
| 3 | AI Generator + Prompt Templates + Tests | 3 |
| 4 | Blog Publisher + Tests | 2 |
| 5 | Keyword Research + Tests | 2 |
| 6 | Content Scheduler CLI | 1 |
| 7 | Naver Blog Sync | 1 |
| 8 | Sample Content (6 MDX) | 6 |
| 9 | Env Template + Deps | 2 |

**Total: 20 files, 9 commits**
