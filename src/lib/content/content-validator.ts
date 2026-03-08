import { PROHIBITED_EXPRESSIONS, type Profession, type ValidationResult } from './types';

const DISCLAIMERS: Record<Profession, string> = {
  lawyer:
    '\n\n---\n*본 글은 일반적인 법률 정보를 제공하며, 구체적인 법적 조언을 대체하지 않습니다. 개별 사안은 반드시 변호사와 상담하시기 바랍니다.*',
  tax_accountant:
    '\n\n---\n*본 글은 일반적인 세무 정보를 제공하며, 구체적인 세무 상담을 대체하지 않습니다. 개별 사안은 반드시 세무사와 상담하시기 바랍니다.*',
  patent_attorney:
    '\n\n---\n*본 글은 일반적인 지식재산권 정보를 제공하며, 구체적인 법적 자문을 대체하지 않습니다. 개별 사안은 반드시 변리사와 상담하시기 바랍니다.*',
};

export function validateContent(
  profession: Profession,
  content: string,
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
      autoFixed = autoFixed
        .replace(pattern, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
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
