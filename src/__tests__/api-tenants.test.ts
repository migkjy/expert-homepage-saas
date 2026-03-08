import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/tenants/route';
import { NextRequest } from 'next/server';

describe('API /api/tenants', () => {
  describe('POST', () => {
    it('returns 400 for invalid JSON body', async () => {
      const req = new NextRequest('http://localhost/api/tenants', {
        method: 'POST',
        body: 'not json',
        headers: { 'Content-Type': 'text/plain' },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBeTruthy();
    });

    it('returns 400 for missing required fields', async () => {
      const req = new NextRequest('http://localhost/api/tenants', {
        method: 'POST',
        body: JSON.stringify({ businessName: 'test' }),
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('필수');
    });

    it('returns 201 for valid tenant creation', async () => {
      const req = new NextRequest('http://localhost/api/tenants', {
        method: 'POST',
        body: JSON.stringify({
          profession: 'lawyer',
          businessName: '테스트 법률사무소',
          ownerName: '홍길동',
          region: '서울 강남구',
          phone: '02-123-4567',
          email: 'test@example.com',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await POST(req);
      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.slug).toBeTruthy();
      expect(data.businessName).toBe('테스트 법률사무소');
    });
  });
});
