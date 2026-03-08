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
