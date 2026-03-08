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
  usePathname: () => '/demo',
}));

import DemoPage from '@/app/demo/page';

describe('Demo Page', () => {
  it('renders demo heading', () => {
    render(<DemoPage />);
    expect(screen.getByText('ProSite 데모 체험')).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<DemoPage />);
    expect(screen.getByText('데모 시작하기')).toBeInTheDocument();
  });

  it('renders demo features', () => {
    render(<DemoPage />);
    expect(screen.getByText('4단계 온보딩 체험')).toBeInTheDocument();
    expect(screen.getByText('대시보드 미리보기')).toBeInTheDocument();
    expect(screen.getByText('완성된 사이트 확인')).toBeInTheDocument();
  });
});
