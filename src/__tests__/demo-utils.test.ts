import { describe, it, expect, beforeEach } from 'vitest';
import { isDemoMode, startDemoSession, clearDemoSession, DEMO_TENANT } from '@/lib/demo';

describe('demo utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('isDemoMode', () => {
    it('returns false when not in demo mode', () => {
      expect(isDemoMode()).toBe(false);
    });

    it('returns true after starting demo session', () => {
      startDemoSession();
      expect(isDemoMode()).toBe(true);
    });
  });

  describe('startDemoSession', () => {
    it('sets isDemo flag in localStorage', () => {
      startDemoSession();
      expect(localStorage.getItem('isDemo')).toBe('true');
    });
  });

  describe('clearDemoSession', () => {
    it('removes all onboarding keys from localStorage', () => {
      localStorage.setItem('isDemo', 'true');
      localStorage.setItem('onboarding_profession', 'lawyer');
      localStorage.setItem('onboarding_info', '{}');
      localStorage.setItem('onboarding_branding', '{}');
      localStorage.setItem('onboarding_result', '{}');

      clearDemoSession();

      expect(localStorage.getItem('isDemo')).toBeNull();
      expect(localStorage.getItem('onboarding_profession')).toBeNull();
      expect(localStorage.getItem('onboarding_info')).toBeNull();
      expect(localStorage.getItem('onboarding_branding')).toBeNull();
      expect(localStorage.getItem('onboarding_result')).toBeNull();
    });
  });

  describe('DEMO_TENANT', () => {
    it('has required fields', () => {
      expect(DEMO_TENANT.id).toBe('demo-tenant');
      expect(DEMO_TENANT.slug).toBe('demo-lawyer');
      expect(DEMO_TENANT.profession).toBe('lawyer');
      expect(DEMO_TENANT.businessName).toBeTruthy();
      expect(DEMO_TENANT.blogPosts.length).toBeGreaterThan(0);
      expect(DEMO_TENANT.consultations.length).toBeGreaterThan(0);
    });
  });
});
