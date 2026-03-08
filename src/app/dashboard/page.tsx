import Link from 'next/link';
import { getTenantBySlug } from '@/lib/tenant';
import { StatCard } from '@/components/dashboard/stat-card';

export default function DashboardHome() {
  // MVP: use first tenant as demo
  const tenant = getTenantBySlug('kim-law');

  if (!tenant) {
    return <p>테넌트 정보를 불러올 수 없습니다.</p>;
  }

  const publishedPosts = tenant.blogPosts.filter((p) => p.published).length;
  const pendingConsultations = tenant.consultations.filter((c) => c.status === 'pending').length;

  return (
    <div>
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
            <Link href="/dashboard/settings" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
              <p className="font-medium text-slate-900">사이트 설정</p>
              <p className="mt-1 text-xs text-slate-500">프로필, 브랜딩 수정</p>
            </Link>
            <Link href="/dashboard/blog" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
              <p className="font-medium text-slate-900">블로그 관리</p>
              <p className="mt-1 text-xs text-slate-500">글 발행, AI 생성</p>
            </Link>
            <Link href="/dashboard/consultations" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
              <p className="font-medium text-slate-900">상담 예약</p>
              <p className="mt-1 text-xs text-slate-500">예약 관리, 응답</p>
            </Link>
            <Link href="/dashboard/stats" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
              <p className="font-medium text-slate-900">통계</p>
              <p className="mt-1 text-xs text-slate-500">방문자, 전환율</p>
            </Link>
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">최근 상담 예약</h2>
          {tenant.consultations.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">아직 상담 예약이 없습니다.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {tenant.consultations.slice(0, 5).map((c) => (
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
          )}
        </div>
      </div>
    </div>
  );
}
