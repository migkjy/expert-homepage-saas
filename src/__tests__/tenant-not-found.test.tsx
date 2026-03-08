import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TenantNotFound from '@/app/sites/[slug]/not-found';

describe('Tenant Not Found (404)', () => {
  it('renders 404 text', () => {
    render(<TenantNotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<TenantNotFound />);
    expect(screen.getByText('사이트를 찾을 수 없습니다')).toBeInTheDocument();
  });

  it('renders link to home', () => {
    render(<TenantNotFound />);
    expect(screen.getByText('ProSite 홈으로')).toBeInTheDocument();
  });
});
