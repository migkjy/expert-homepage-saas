import { getTenantBySlug } from '@/lib/tenant';
import { StatCard } from '@/components/dashboard/stat-card';

export default function StatsPage() {
  const tenant = getTenantBySlug('kim-law');

  if (!tenant) {
    return <p>통계 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">통계</h1>
      <p className="mt-1 text-sm text-slate-500">사이트 방문 및 상담 전환 현황을 확인합니다.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatCard title="총 방문자" value={tenant.stats.totalVisitors.toLocaleString()} change="+12% vs 지난달" changeType="positive" />
        <StatCard title="이번 달 방문자" value={tenant.stats.monthlyVisitors} change="+15% vs 지난달" changeType="positive" />
        <StatCard title="총 상담 건수" value={tenant.stats.totalConsultations} />
        <StatCard title="전환율" value={`${((tenant.stats.totalConsultations / tenant.stats.totalVisitors) * 100).toFixed(1)}%`} />
      </div>

      {/* Charts Placeholder */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">월별 방문자 추이</h2>
          <div className="mt-4 flex h-48 items-end justify-between gap-2">
            {[120, 180, 220, 280, 310, 380, 456].map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-blue-500"
                  style={{ height: `${(value / 456) * 100}%` }}
                />
                <span className="text-xs text-slate-400">
                  {['9월', '10월', '11월', '12월', '1월', '2월', '3월'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">상담 분야별 비중</h2>
          <div className="mt-4 space-y-3">
            {[
              { field: '이혼/가사', pct: 45 },
              { field: '상속/유언', pct: 25 },
              { field: '부동산', pct: 18 },
              { field: '민사소송', pct: 12 },
            ].map((item) => (
              <div key={item.field}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">{item.field}</span>
                  <span className="text-slate-500">{item.pct}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
