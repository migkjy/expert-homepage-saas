'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { StepIndicator } from '@/components/onboarding/step-indicator';
import { Button } from '@/components/ui/button';
import { PROFESSION_LABELS } from '@/types/tenant';
import type { Profession } from '@/types/tenant';

interface OnboardingData {
  profession: Profession;
  businessName: string;
  ownerName: string;
  specialties: string[];
  region: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  primaryColor: string;
  tagline: string;
}

export default function OnboardingStep4() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const profession = (sessionStorage.getItem('onboarding_profession') || 'lawyer') as Profession;
    const info = JSON.parse(sessionStorage.getItem('onboarding_info') || '{}');
    const branding = JSON.parse(sessionStorage.getItem('onboarding_branding') || '{}');
    setData({ profession, ...info, ...branding });
  }, []);

  async function handleConfirm() {
    if (!data) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        sessionStorage.setItem('onboarding_result', JSON.stringify(result));
        sessionStorage.removeItem('onboarding_profession');
        sessionStorage.removeItem('onboarding_info');
        sessionStorage.removeItem('onboarding_branding');
        router.push('/onboarding/complete');
      }
    } catch {
      setIsSubmitting(false);
    }
  }

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">데이터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator currentStep={4} />
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">입력 정보를 확인하세요</h1>
          <p className="mt-2 text-slate-600">모든 정보가 맞는지 확인 후 사이트를 생성합니다.</p>
        </div>

        <div className="mt-10 space-y-6">
          {/* Preview Card */}
          <div
            className="rounded-xl p-8 text-white"
            style={{ backgroundColor: data.primaryColor || '#1B365D' }}
          >
            <p className="text-sm text-white/70">
              {data.region} | {PROFESSION_LABELS[data.profession]}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{data.businessName || '사무소명'}</h2>
            <p className="mt-1 text-lg text-white/90">{data.ownerName} {PROFESSION_LABELS[data.profession]}</p>
            <p className="mt-2 text-white/80">{data.tagline || ''}</p>
          </div>

          {/* Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">사무소 정보</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex">
                <dt className="w-24 shrink-0 font-medium text-slate-500">직종</dt>
                <dd className="text-slate-900">{PROFESSION_LABELS[data.profession]}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 shrink-0 font-medium text-slate-500">사무소명</dt>
                <dd className="text-slate-900">{data.businessName}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 shrink-0 font-medium text-slate-500">대표</dt>
                <dd className="text-slate-900">{data.ownerName}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 shrink-0 font-medium text-slate-500">전문분야</dt>
                <dd className="text-slate-900">{data.specialties?.join(', ') || '-'}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 shrink-0 font-medium text-slate-500">지역</dt>
                <dd className="text-slate-900">{data.region}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 shrink-0 font-medium text-slate-500">연락처</dt>
                <dd className="text-slate-900">{data.phone}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 shrink-0 font-medium text-slate-500">이메일</dt>
                <dd className="text-slate-900">{data.email}</dd>
              </div>
              {data.address && (
                <div className="flex">
                  <dt className="w-24 shrink-0 font-medium text-slate-500">주소</dt>
                  <dd className="text-slate-900">{data.address}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/onboarding/step3')}>
              이전
            </Button>
            <Button fullWidth onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? '사이트 생성 중...' : '사이트 생성하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
