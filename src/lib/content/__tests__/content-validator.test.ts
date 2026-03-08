import { describe, it, expect } from 'vitest';
import { validateContent } from '../content-validator';

describe('validateContent', () => {
  it('passes valid lawyer content', () => {
    const result = validateContent(
      'lawyer',
      '이혼 소송에서 알아야 할 3가지 핵심 사항을 정리했습니다.',
    );
    expect(result.isValid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it('detects prohibited lawyer expressions - win rate', () => {
    const result = validateContent(
      'lawyer',
      '저희 로펌은 승소율 95%를 자랑합니다.',
    );
    expect(result.isValid).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('승소율');
  });

  it('detects prohibited lawyer expressions - superlative', () => {
    const result = validateContent(
      'lawyer',
      '대한민국 최고의 변호사가 도와드립니다.',
    );
    expect(result.isValid).toBe(false);
  });

  it('detects prohibited tax accountant expressions', () => {
    const result = validateContent(
      'tax_accountant',
      '세금 안 내는 방법을 알려드립니다.',
    );
    expect(result.isValid).toBe(false);
  });

  it('detects prohibited patent attorney expressions', () => {
    const result = validateContent(
      'patent_attorney',
      '100% 등록 보장합니다.',
    );
    expect(result.isValid).toBe(false);
  });

  it('auto-fixes prohibited expressions by removing them', () => {
    const result = validateContent(
      'lawyer',
      '저희는 승소율 95%를 자랑하는 로펌입니다. 상담 문의 주세요.',
    );
    expect(result.autoFixed).not.toContain('승소율 95%');
    expect(result.autoFixed).toContain('상담 문의 주세요');
  });

  it('adds disclaimer for lawyer content', () => {
    const result = validateContent(
      'lawyer',
      '이혼 소송 절차를 안내합니다.',
    );
    expect(result.autoFixed).toContain('법적 조언을 대체하지 않습니다');
  });

  it('adds disclaimer for tax accountant content', () => {
    const result = validateContent(
      'tax_accountant',
      '종합소득세 신고 방법입니다.',
    );
    expect(result.autoFixed).toContain('세무 상담을 대체하지 않습니다');
  });
});
