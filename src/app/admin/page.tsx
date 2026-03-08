import Link from 'next/link';
import { getAllTenants } from '@/lib/tenant';
import { PROFESSION_LABELS, PLAN_LABELS } from '@/types/tenant';
import { StatCard } from '@/components/dashboard/stat-card';

export default function AdminDashboard() {
  const tenants = getAllTenants();
  const totalVisitors = tenants.reduce((sum, t) => sum + t.stats.totalVisitors, 0);
  const totalConsultations = tenants.reduce((sum, t) => sum + t.stats.totalConsultations, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">관리자 대시보드</h1>
      <p className="mt-1 text-sm text-slate-500">ProSite 전체 현황을 확인합니다.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatCard title="전체 테넌트" value={tenants.length} />
        <StatCard title="총 방문자" value={totalVisitors.toLocaleString()} change="+12% vs 지난달" changeType="positive" />
        <StatCard title="총 상담 건수" value={totalConsultations} change="+8% vs 지난달" changeType="positive" />
        <StatCard title="활성 플랜" value={tenants.length} />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">최근 테넌트</h2>
          <Link href="/admin/tenants" className="text-sm text-blue-600 hover:text-blue-700">
            전체 보기
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">사무소명</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">직종</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">플랜</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">방문자</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">생성일</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/admin/tenants/${tenant.id}`} className="font-medium text-slate-900 hover:text-blue-600">
                      {tenant.businessName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{PROFESSION_LABELS[tenant.profession]}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {PLAN_LABELS[tenant.plan]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{tenant.stats.monthlyVisitors}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {new Date(tenant.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
