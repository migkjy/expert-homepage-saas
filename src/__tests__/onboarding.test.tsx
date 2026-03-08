import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

import OnboardingStep1 from '@/app/onboarding/step1/page';
import OnboardingStep2 from '@/app/onboarding/step2/page';
import OnboardingStep3 from '@/app/onboarding/step3/page';

describe('Onboarding Steps', () => {
  describe('Step 1 - Profession Selection', () => {
    it('renders step heading', () => {
      render(<OnboardingStep1 />);
      expect(screen.getByText('직종을 선택하세요')).toBeInTheDocument();
    });

    it('renders all profession options', () => {
      render(<OnboardingStep1 />);
      expect(screen.getByText('변호사')).toBeInTheDocument();
      expect(screen.getByText('세무사')).toBeInTheDocument();
      expect(screen.getByText('변리사')).toBeInTheDocument();
    });
  });

  describe('Step 2 - Business Info', () => {
    it('renders step heading', () => {
      render(<OnboardingStep2 />);
      expect(screen.getByText('사무소 정보를 입력하세요')).toBeInTheDocument();
    });

    it('renders required form fields', () => {
      render(<OnboardingStep2 />);
      expect(screen.getByPlaceholderText(/김변호사/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/김민수/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('서울 강남구')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/02-555/)).toBeInTheDocument();
    });
  });

  describe('Step 3 - Branding', () => {
    it('renders step heading', () => {
      render(<OnboardingStep3 />);
      expect(screen.getByText('브랜딩을 설정하세요')).toBeInTheDocument();
    });

    it('renders color presets', () => {
      render(<OnboardingStep3 />);
      expect(screen.getByText('네이비 블루')).toBeInTheDocument();
      expect(screen.getByText('딥 틸')).toBeInTheDocument();
    });

    it('renders tagline input', () => {
      render(<OnboardingStep3 />);
      expect(screen.getByPlaceholderText(/당신의 권리/)).toBeInTheDocument();
    });
  });
});
