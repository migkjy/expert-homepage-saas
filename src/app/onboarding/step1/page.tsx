'use client';

import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/onboarding/step-indicator';

const professions = [
  {
    id: 'lawyer',
    icon: '⚖️',
    title: '변호사',
    description: '법률사무소 전용 홈페이지. 전문분야, 성공사례, 상담 예약.',
  },
  {
    id: 'tax_accountant',
    icon: '📊',
    title: '세무사',
    description: '세무사무소 전용 홈페이지. 서비스 안내, 비용 테이블, 세무 칼럼.',
  },
  {
    id: 'patent_attorney',
    icon: '💡',
    title: '변리사',
    description: '특허사무소 전용 홈페이지. 출원 프로세스, 등록 사례.',
  },
];

export default function OnboardingStep1() {
  const router = useRouter();

  function selectProfession(professionId: string) {
    sessionStorage.setItem('onboarding_profession', professionId);
    router.push('/onboarding/step2');
  }

  return (
    <div>
      <StepIndicator currentStep={1} />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">직종을 선택하세요</h1>
          <p className="mt-2 text-slate-600">
            직종에 맞는 최적의 홈페이지 템플릿을 제공해 드립니다.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {professions.map((prof) => (
            <button
              key={prof.id}
              onClick={() => selectProfession(prof.id)}
              className="group rounded-2xl border-2 border-slate-200 bg-white p-8 text-left transition-all hover:border-blue-500 hover:shadow-lg"
            >
              <span className="text-5xl">{prof.icon}</span>
              <h2 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-600">
                {prof.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{prof.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
