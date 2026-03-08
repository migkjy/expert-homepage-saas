'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { StepIndicator } from '@/components/onboarding/step-indicator';
import { Button } from '@/components/ui/button';

const colorPresets = [
  { name: '네이비 블루', value: '#1B365D' },
  { name: '딥 틸', value: '#0D4F4F' },
  { name: '차콜', value: '#2D3748' },
  { name: '다크 그린', value: '#1A4731' },
  { name: '버건디', value: '#722F37' },
  { name: '로열 블루', value: '#1E40AF' },
];

export default function OnboardingStep3() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('#1B365D');
  const [tagline, setTagline] = useState('');

  function handleNext() {
    sessionStorage.setItem(
      'onboarding_branding',
      JSON.stringify({ primaryColor: selectedColor, tagline })
    );
    router.push('/onboarding/step4');
  }

  return (
    <div>
      <StepIndicator currentStep={3} />
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">브랜딩을 설정하세요</h1>
          <p className="mt-2 text-slate-600">사무소의 개성을 담은 색상과 태그라인을 선택합니다.</p>
        </div>

        <div className="mt-10 space-y-8">
          {/* Color Selection */}
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">대표 색상</label>
            <div className="flex flex-wrap gap-3">
              {colorPresets.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-all ${
                    selectedColor === color.value
                      ? 'border-blue-500 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className="h-10 w-10 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-slate-600">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">미리보기</label>
            <div
              className="rounded-xl p-8 text-white"
              style={{ backgroundColor: selectedColor }}
            >
              <p className="text-sm text-white/70">사무소 홈페이지 히어로 영역</p>
              <h2 className="mt-2 text-2xl font-bold">사무소 이름</h2>
              <p className="mt-2 text-white/90">
                {tagline || '태그라인이 여기에 표시됩니다'}
              </p>
              <div className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                무료 상담 예약
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">태그라인</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="예: 당신의 권리, 끝까지 지켜드립니다"
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/onboarding/step2')}>
              이전
            </Button>
            <Button fullWidth onClick={handleNext}>
              다음 단계
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
