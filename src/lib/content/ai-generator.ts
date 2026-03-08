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
    tags: trim('태그')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
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
  request: ContentRequest,
): Promise<GeneratedContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log('[mock mode] ANTHROPIC_API_KEY not set, using mock content');
    return getMockContent(request);
  }

  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey });

  const prompt = buildPrompt(request);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => ('text' in block ? block.text : ''))
    .join('\n');

  return parseLLMResponse(text);
}
