'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { StepIndicator } from '@/components/onboarding/step-indicator';
import { Button } from '@/components/ui/button';
import type { Profession } from '@/types/tenant';

const specialtyOptions: Record<Profession, string[]> = {
  lawyer: ['이혼/가사', '상속/유언', '형사', '민사소송', '부동산', '기업자문', '노동/산재', '의료사고'],
  tax_accountant: ['기장대리', '세무조정', '양도소득세', '상속증여세', '법인설립', '부가가치세', '종합소득세', '세무조사 대응'],
  patent_attorney: ['특허출원', '상표등록', '디자인등록', '기술이전', '특허분쟁', 'IT/소프트웨어 특허', '바이오 특허', '해외출원'],
};

export default function OnboardingStep2() {
  const router = useRouter();
  const [profession, setProfession] = useState<Profession>('lawyer');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('onboarding_profession') as Profession;
    if (saved) setProfession(saved);
  }, []);

  function toggleSpecialty(s: string) {
    setSelectedSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedSpecialties.length === 0) {
      alert('전문 분야를 최소 1개 이상 선택해 주세요.');
      return;
    }
    const formData = new FormData(e.currentTarget);
    const data = {
      businessName: formData.get('businessName') as string,
      ownerName: formData.get('ownerName') as string,
      specialties: selectedSpecialties,
      region: formData.get('region') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      description: formData.get('description') as string,
    };
    sessionStorage.setItem('onboarding_info', JSON.stringify(data));
    router.push('/onboarding/step3');
  }

  return (
    <div>
      <StepIndicator currentStep={2} />
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">사무소 정보를 입력하세요</h1>
          <p className="mt-2 text-slate-600">홈페이지에 표시될 기본 정보를 입력합니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">사무소명 *</label>
              <input name="businessName" required className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="김변호사 법률사무소" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">대표 이름 *</label>
              <input name="ownerName" required className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="김민수" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">전문 분야 (복수 선택 가능) *</label>
            <div className="flex flex-wrap gap-2">
              {specialtyOptions[profession].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSpecialty(s)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    selectedSpecialties.includes(s)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-300 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">지역 *</label>
              <input name="region" required className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="서울 강남구" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">전화번호 *</label>
              <input name="phone" required className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="02-555-1234" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">이메일 *</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="contact@example.com" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">주소</label>
            <input name="address" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="서울특별시 강남구 테헤란로 123, 법조빌딩 5층" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">사무소 소개</label>
            <textarea name="description" rows={3} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="사무소에 대한 간단한 소개를 작성해 주세요." />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/onboarding/step1')}>
              이전
            </Button>
            <Button type="submit" fullWidth>
              다음 단계
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
