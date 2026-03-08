import Link from 'next/link';
import { getAllTenants } from '@/lib/tenant';
import { PROFESSION_LABELS, PLAN_LABELS } from '@/types/tenant';

export default function AdminTenantsPage() {
  const tenants = getAllTenants();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">테넌트 관리</h1>
      <p className="mt-1 text-sm text-slate-500">등록된 모든 테넌트를 관리합니다.</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">사무소명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">대표</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">직종</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">지역</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">플랜</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">상담</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">생성일</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/tenants/${tenant.id}`} className="font-medium text-blue-600 hover:text-blue-700">
                    {tenant.businessName}
                  </Link>
                  <p className="text-xs text-slate-400">{tenant.slug}.prosite.kr</p>
                </td>
                <td className="px-4 py-3 text-sm text-slate-900">{tenant.ownerName}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{PROFESSION_LABELS[tenant.profession]}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{tenant.region}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {PLAN_LABELS[tenant.plan]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{tenant.stats.totalConsultations}</td>
                <td className="px-4 py-3 text-sm text-slate-400">
                  {new Date(tenant.createdAt).toLocaleDateString('ko-KR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
