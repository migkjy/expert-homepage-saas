'use client';

import { useRouter } from 'next/navigation';
import { startDemoSession } from '@/lib/demo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const demoFeatures = [
  {
    title: '4단계 온보딩 체험',
    description: '직종 선택부터 브랜딩 설정까지, 실제 온보딩 플로우를 그대로 체험합니다.',
  },
  {
    title: '대시보드 미리보기',
    description: '방문자 통계, 상담 예약, 블로그 관리 등 관리 기능을 샘플 데이터로 확인합니다.',
  },
  {
    title: '완성된 사이트 확인',
    description: '변호사 사무소 예시로 실제 홈페이지가 어떻게 보이는지 미리 봅니다.',
  },
];

export default function DemoPage() {
  const router = useRouter();

  function handleStartDemo() {
    startDemoSession();
    router.push('/onboarding/step1');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-slate-900">
            ProSite
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            홈으로 돌아가기
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            무료 체험
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            ProSite 데모 체험
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            회원가입 없이 전문직 AI 홈페이지의 모든 기능을 직접 체험해 보세요.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {demoFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg font-bold text-blue-600">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" onClick={handleStartDemo}>
            데모 시작하기
          </Button>
          <p className="mt-3 text-sm text-slate-400">
            30분 체험 | 데이터 저장 없음 | 신용카드 불필요
          </p>
        </div>

        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">데모에서 체험할 수 있는 것</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-500">&#10003;</span>
              온보딩 플로우 (직종 선택 → 정보 입력 → 브랜딩 → 확인)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-500">&#10003;</span>
              대시보드 (방문자 통계, 상담 예약 관리, 블로그 관리)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-500">&#10003;</span>
              완성된 홈페이지 템플릿 미리보기
            </li>
          </ul>
          <h2 className="mt-6 text-lg font-semibold text-slate-900">데모에서 제한되는 것</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-slate-400">&#10005;</span>
              AI 콘텐츠 자동 생성 (샘플 데이터로 대체)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-slate-400">&#10005;</span>
              실제 데이터 저장 (브라우저 종료 시 초기화)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-slate-400">&#10005;</span>
              커스텀 도메인 연결
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
