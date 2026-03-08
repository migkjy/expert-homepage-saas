import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTenantById, getAllTenants } from '@/lib/tenant';
import { PROFESSION_LABELS, PLAN_LABELS } from '@/types/tenant';
import { StatCard } from '@/components/dashboard/stat-card';

export async function generateStaticParams() {
  return getAllTenants().map((t) => ({ id: t.id }));
}

export default async function AdminTenantDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tenant = getTenantById(id);

  if (!tenant) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/tenants" className="hover:text-blue-600">테넌트 관리</Link>
        <span>/</span>
        <span className="text-slate-900">{tenant.businessName}</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold text-slate-900">{tenant.businessName}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {tenant.slug}.prosite.kr | {PROFESSION_LABELS[tenant.profession]} | {PLAN_LABELS[tenant.plan]} 플랜
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="총 방문자" value={tenant.stats.totalVisitors.toLocaleString()} />
        <StatCard title="이번 달 방문자" value={tenant.stats.monthlyVisitors} />
        <StatCard title="상담 건수" value={tenant.stats.totalConsultations} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Tenant Info */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">사무소 정보</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex"><dt className="w-24 font-medium text-slate-500">대표</dt><dd>{tenant.ownerName}</dd></div>
            <div className="flex"><dt className="w-24 font-medium text-slate-500">전화</dt><dd>{tenant.phone}</dd></div>
            <div className="flex"><dt className="w-24 font-medium text-slate-500">이메일</dt><dd>{tenant.email}</dd></div>
            <div className="flex"><dt className="w-24 font-medium text-slate-500">주소</dt><dd>{tenant.address}</dd></div>
            <div className="flex"><dt className="w-24 font-medium text-slate-500">지역</dt><dd>{tenant.region}</dd></div>
            <div className="flex"><dt className="w-24 font-medium text-slate-500">전문분야</dt><dd>{tenant.specialties.join(', ')}</dd></div>
            <div className="flex"><dt className="w-24 font-medium text-slate-500">생성일</dt><dd>{new Date(tenant.createdAt).toLocaleDateString('ko-KR')}</dd></div>
          </dl>
        </div>

        {/* Branding */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">브랜딩</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500">대표 색상</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-8 w-8 rounded" style={{ backgroundColor: tenant.branding.primaryColor }} />
                <span className="text-sm text-slate-600">{tenant.branding.primaryColor}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">태그라인</p>
              <p className="mt-1 text-sm text-slate-900">{tenant.branding.tagline}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">소개</p>
              <p className="mt-1 text-sm text-slate-600">{tenant.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">블로그 글 ({tenant.blogPosts.length})</h2>
        <div className="mt-4 space-y-3">
          {tenant.blogPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
              <div>
                <p className="font-medium text-slate-900">{post.title}</p>
                <p className="text-xs text-slate-400">{new Date(post.publishedAt).toLocaleDateString('ko-KR')}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${post.published ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {post.published ? '발행' : '미발행'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
