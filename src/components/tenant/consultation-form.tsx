'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Tenant } from '@/types/tenant';

export function ConsultationForm({ tenant }: { tenant: Tenant }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-green-800">상담 예약이 접수되었습니다</h3>
        <p className="mt-2 text-sm text-green-600">
          빠른 시일 내에 연락드리겠습니다. 감사합니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="홍길동"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
            연락처
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="010-0000-0000"
          />
        </div>
      </div>
      <div>
        <label htmlFor="field" className="mb-1 block text-sm font-medium text-slate-700">
          상담 분야
        </label>
        <select
          id="field"
          name="field"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">선택하세요</option>
          {tenant.specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
          상담 내용
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="상담받고 싶은 내용을 간략히 적어주세요."
        />
      </div>
      <Button type="submit" fullWidth>
        무료 상담 예약하기
      </Button>
      <p className="text-center text-xs text-slate-400">
        상담 예약 시 개인정보처리방침에 동의하게 됩니다.
      </p>
    </form>
  );
}
