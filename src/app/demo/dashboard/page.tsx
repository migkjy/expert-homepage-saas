'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isDemoMode, DEMO_TENANT } from '@/lib/demo';
import { DemoBanner } from '@/components/demo/demo-banner';
import { StatCard } from '@/components/dashboard/stat-card';

export default function DemoDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isDemoMode()) {
      router.push('/demo');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  const tenant = DEMO_TENANT;
  const publishedPosts = tenant.blogPosts.filter((p) => p.published).length;
  const pendingConsultations = tenant.consultations.filter((c) => c.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <DemoBanner />

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
          <div className="border-b border-slate-200 px-4 py-4">
            <span className="text-lg font-bold text-slate-900">
              ProSite <span className="text-xs font-normal text-slate-400">Demo</span>
            </span>
          </div>
          <nav className="space-y-1 p-4">
            <span className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
              대시보드
            </span>
            <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600">
              사이트 설정
            </span>
            <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600">
              블로그 관리
            </span>
            <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600">
              상담 예약
            </span>
            <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600">
              통계
            </span>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900">대시보드</h1>
          <p className="mt-1 text-sm text-slate-500">{tenant.businessName} 관리 현황</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <StatCard
              title="이번 달 방문자"
              value={tenant.stats.monthlyVisitors}
              change="+15% vs 지난달"
              changeType="positive"
            />
            <StatCard title="총 상담 건수" value={tenant.stats.totalConsultations} />
            <StatCard title="발행된 글" value={publishedPosts} />
            <StatCard
              title="대기 중 상담"
              value={pendingConsultations}
              change={pendingConsultations > 0 ? '확인 필요' : '없음'}
              changeType={pendingConsultations > 0 ? 'negative' : 'neutral'}
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Quick Links */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">빠른 메뉴</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">사이트 설정</p>
                  <p className="mt-1 text-xs text-slate-500">프로필, 브랜딩 수정</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">블로그 관리</p>
                  <p className="mt-1 text-xs text-slate-500">글 발행, AI 생성</p>
                </div>
                <Link href="/sites/demo-lawyer" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                  <p className="font-medium text-slate-900">내 사이트 보기</p>
                  <p className="mt-1 text-xs text-slate-500">완성된 홈페이지 확인</p>
                </Link>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">통계</p>
                  <p className="mt-1 text-xs text-slate-500">방문자, 전환율</p>
                </div>
              </div>
            </div>

            {/* Recent Consultations */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">최근 상담 예약</h2>
              <div className="mt-4 space-y-3">
                {tenant.consultations.map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{c.name} - {c.field}</p>
                      <p className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString('ko-KR')}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      c.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                      c.status === 'contacted' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {c.status === 'pending' ? '대기중' : c.status === 'contacted' ? '연락완료' : '완료'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA to real service */}
          <div className="mt-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-6 text-center">
            <h2 className="text-lg font-semibold text-slate-900">마음에 드셨나요?</h2>
            <p className="mt-1 text-sm text-slate-600">
              실제 서비스에서는 AI 콘텐츠 생성, 커스텀 도메인, 실시간 통계까지 모두 제공됩니다.
            </p>
            <Link
              href="/onboarding/step1"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              실제 서비스 시작하기
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
