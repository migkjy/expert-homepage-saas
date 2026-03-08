'use client';

import Link from 'next/link';
import { clearDemoSession } from '@/lib/demo';
import { useRouter } from 'next/navigation';

export function DemoBanner() {
  const router = useRouter();

  function handleExit() {
    clearDemoSession();
    router.push('/');
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-amber-500 px-4 py-2 text-sm font-medium text-amber-950">
      <div className="flex items-center gap-2">
        <span className="rounded bg-amber-600 px-2 py-0.5 text-xs font-bold text-white">
          DEMO
        </span>
        <span>데모 모드로 체험 중입니다. 데이터는 저장되지 않습니다.</span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/onboarding/step1"
          className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          실제 서비스 시작하기
        </Link>
        <button
          onClick={handleExit}
          className="text-xs text-amber-800 underline hover:text-amber-950"
        >
          데모 종료
        </button>
      </div>
    </div>
  );
}
