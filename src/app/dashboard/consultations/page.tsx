import { getTenantBySlug } from '@/lib/tenant';

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: '대기중', color: 'bg-yellow-50 text-yellow-700' },
  contacted: { label: '연락완료', color: 'bg-blue-50 text-blue-700' },
  completed: { label: '완료', color: 'bg-green-50 text-green-700' },
};

export default function ConsultationsPage() {
  const tenant = getTenantBySlug('kim-law');
  const consultations = tenant?.consultations || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">상담 예약 관리</h1>
      <p className="mt-1 text-sm text-slate-500">접수된 상담 예약을 확인하고 관리합니다.</p>

      <div className="mt-8">
        {consultations.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
            <p className="text-slate-500">아직 접수된 상담 예약이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">이름</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">연락처</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">분야</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">내용</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">접수일</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((c) => {
                  const status = statusLabels[c.status] || statusLabels.pending;
                  return (
                    <tr key={c.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{c.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{c.phone}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{c.field}</td>
                      <td className="max-w-xs px-4 py-3 text-sm text-slate-600 truncate">{c.message}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString('ko-KR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
