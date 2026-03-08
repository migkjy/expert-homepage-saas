import type { Tenant } from '@/types/tenant';
import { ConsultationForm } from '@/components/tenant/consultation-form';

const defaultSpecialties = [
  { name: '이혼/가사', icon: '👨‍👩‍👧', desc: '이혼, 양육권, 재산분할 등 가사 분쟁 전문' },
  { name: '상속/유언', icon: '📜', desc: '상속분쟁, 유언장 작성, 유류분 청구' },
  { name: '형사', icon: '⚖️', desc: '형사 변호, 수사 대응, 보석 신청' },
  { name: '민사소송', icon: '📋', desc: '손해배상, 채권추심, 계약분쟁' },
  { name: '부동산', icon: '🏢', desc: '매매, 임대차, 재개발 분쟁' },
  { name: '기업자문', icon: '🏛️', desc: '법인설립, 계약검토, 노동법' },
];

export function LawyerTemplate({ tenant }: { tenant: Tenant }) {
  const specialties = tenant.specialties.map((s) => {
    const found = defaultSpecialties.find((d) => d.name === s);
    return found || { name: s, icon: '⚖️', desc: `${s} 분야 전문 법률 서비스` };
  });

  const publishedPosts = tenant.blogPosts.filter((p) => p.published);

  return (
    <>
      {/* Hero */}
      <section
        id="about"
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: tenant.branding.primaryColor }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/70">
              {tenant.region} | 변호사
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {tenant.ownerName} 변호사
            </h1>
            <p className="mt-4 text-xl text-white/90">
              {tenant.branding.tagline}
            </p>
            <p className="mt-4 text-white/70">{tenant.description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#consultation"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100"
              >
                무료 상담 예약
              </a>
              <a
                href={`tel:${tenant.phone}`}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                {tenant.phone}
              </a>
            </div>
          </div>
          <div className="mt-8 flex gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">{tenant.stats.totalConsultations}+</p>
              <p className="text-sm text-white/70">상담 건수</p>
            </div>
            <div>
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm text-white/70">경력 연수</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{tenant.specialties.length}</p>
              <p className="text-sm text-white/70">전문 분야</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">전문 분야</h2>
          <p className="mt-2 text-center text-slate-600">풍부한 경험과 전문성으로 최선의 결과를 만들어 드립니다</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((s) => (
              <div key={s.name} className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">주요 성공 사례</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-blue-600">이혼/가사</p>
              <h3 className="mt-2 text-lg font-semibold">재산분할 15억 확보</h3>
              <p className="mt-2 text-sm text-slate-600">
                복잡한 재산구조에서 의뢰인의 기여도를 입증하여 공정한 분할 달성
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-blue-600">상속</p>
              <h3 className="mt-2 text-lg font-semibold">유류분 반환 청구 승소</h3>
              <p className="mt-2 text-sm text-slate-600">
                부당한 유언에 대해 유류분 권리를 성공적으로 행사
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-blue-600">부동산</p>
              <h3 className="mt-2 text-lg font-semibold">임대차 분쟁 완전 해결</h3>
              <p className="mt-2 text-sm text-slate-600">
                상가 임대차 분쟁에서 보증금 전액 및 손해배상 확보
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {publishedPosts.length > 0 && (
        <section id="blog" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold text-slate-900">법률 칼럼</h2>
            <p className="mt-2 text-center text-slate-600">생활 속 법률 지식을 쉽게 알려드립니다</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {publishedPosts.slice(0, 3).map((post) => (
                <article key={post.id} className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <p className="text-xs text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consultation */}
      <section id="consultation" className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">무료 상담 예약</h2>
          <p className="mt-2 text-center text-slate-600">
            {tenant.ownerName} 변호사가 직접 상담해 드립니다. 비밀이 보장됩니다.
          </p>
          <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
            <ConsultationForm tenant={tenant} />
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">오시는 길</h2>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="h-64 w-full max-w-4xl rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
              지도 영역 (추후 카카오맵/네이버맵 연동)
            </div>
            <p className="text-slate-600">{tenant.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
