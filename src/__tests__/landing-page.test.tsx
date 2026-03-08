import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/landing/hero-section';
import { PricingSection } from '@/components/landing/pricing-section';

describe('Landing Page', () => {
  describe('HeroSection', () => {
    it('renders headline text', () => {
      render(<HeroSection />);
      expect(screen.getByText(/AI 마케터/)).toBeInTheDocument();
    });

    it('renders CTA buttons', () => {
      render(<HeroSection />);
      expect(screen.getByText('무료로 시작하기')).toBeInTheDocument();
      expect(screen.getByText('데모 체험하기')).toBeInTheDocument();
    });
  });

  describe('PricingSection', () => {
    it('renders pricing heading', () => {
      render(<PricingSection />);
      expect(screen.getByText('합리적인 요금제')).toBeInTheDocument();
    });

    it('renders all plan names', () => {
      render(<PricingSection />);
      expect(screen.getByText('스타터')).toBeInTheDocument();
      expect(screen.getByText('프로')).toBeInTheDocument();
      expect(screen.getByText('프리미엄')).toBeInTheDocument();
      expect(screen.getByText('에이전시')).toBeInTheDocument();
    });

    it('renders popular badge', () => {
      render(<PricingSection />);
      expect(screen.getByText('가장 인기')).toBeInTheDocument();
    });
  });
});
