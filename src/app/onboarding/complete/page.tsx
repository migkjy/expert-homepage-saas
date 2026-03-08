'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/demo/demo-banner';
import { isDemoMode } from '@/lib/demo';

interface Result {
  slug: string;
  businessName: string;
}

export default function OnboardingComplete() {
  const [result, setResult] = useState<Result | null>(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    setDemo(isDemoMode());
    const saved = sessionStorage.getItem('onboarding_result');
    if (saved) {
      setResult(JSON.parse(saved));
      sessionStorage.removeItem('onboarding_result');
    }
  }, []);

  const siteUrl = result
    ? `${result.slug}.prosite.kr`
    : 'your-site.prosite.kr';

  return (
    <div>
      {demo && <DemoBanner />}
      <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          사이트가 생성되었습니다!
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {result?.businessName || '사무소'} 홈페이지가 준비되었습니다.
        </p>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">사이트 주소</p>
          <p className="mt-1 text-lg font-semibold text-blue-600">{siteUrl}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {result && (
            <Link href={demo ? `/sites/demo-lawyer` : `/sites/${result.slug}?tenant=${result.slug}`}>
              <Button fullWidth size="lg">
                내 사이트 보기
              </Button>
            </Link>
          )}
          <Link href={demo ? '/demo/dashboard' : '/dashboard'}>
            <Button variant="outline" fullWidth size="lg">
              대시보드로 이동
            </Button>
          </Link>
          {demo && (
            <Link href="/onboarding/step1">
              <Button variant="ghost" fullWidth size="lg">
                실제 서비스로 전환하기
              </Button>
            </Link>
          )}
        </div>

        <p className="mt-6 text-sm text-slate-400">
          {demo
            ? '데모 모드입니다. 실제 서비스에서는 14일 무료 체험을 제공합니다.'
            : '14일 무료 체험이 시작되었습니다. 자유롭게 사이트를 꾸며보세요!'}
        </p>
      </div>
    </div>
    </div>
  );
}
