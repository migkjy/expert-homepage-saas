import type { Tenant } from '@/types/tenant';
import { ConsultationForm } from '@/components/tenant/consultation-form';

const defaultServices = [
  { name: '기장대리', icon: '📒', desc: '매출/매입 장부 기장부터 신고까지 원스톱' },
  { name: '세무조정', icon: '📊', desc: '법인세/소득세 세무조정 및 신고 대리' },
  { name: '양도소득세', icon: '🏠', desc: '부동산 양도소득세 절세 전략 수립' },
  { name: '상속증여세', icon: '💰', desc: '상속·증여 재산 평가 및 절세 플랜' },
  { name: '법인설립', icon: '🏛️', desc: '법인 설립부터 초기 세무 설정까지' },
  { name: '부가가치세', icon: '🧾', desc: '부가세 신고 및 환급 최적화' },
];

const pricingTable = [
  { service: '개인사업자 기장', price: '월 11만원~', note: '연매출 규모별 차등' },
  { service: '법인 기장', price: '월 22만원~', note: '거래량·업종별 차등' },
  { service: '세무조정', price: '55만원~', note: '연 1회' },
  { service: '양도세 신고', price: '33만원~', note: '건당' },
  { service: '법인설립', price: '55만원~', note: '설립 대행 포함' },
];

export function TaxAccountantTemplate({ tenant }: { tenant: Tenant }) {
  const services = tenant.specialties.map((s) => {
    const found = defaultServices.find((d) => d.name === s);
    return found || { name: s, icon: '📊', desc: `${s} 전문 세무 서비스` };
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
              {tenant.region} | 세무사
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              세금 고민,
              <br />
              전문가에게 맡기세요
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
                무료 세무 상담
              </a>
              <a
                href={`tel:${tenant.phone}`}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                {tenant.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="specialties" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">서비스 안내</h2>
          <p className="mt-2 text-center text-slate-600">사업자에게 꼭 필요한 세무 서비스를 제공합니다</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.name} className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">비용 안내</h2>
          <p className="mt-2 text-center text-slate-600">투명한 요금 체계로 합리적인 서비스를 제공합니다</p>
          <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">서비스</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">기본 요금</th>
                  <th className="hidden px-6 py-3 text-left text-sm font-semibold text-slate-900 sm:table-cell">비고</th>
                </tr>
              </thead>
              <tbody>
                {pricingTable.map((row, i) => (
                  <tr key={row.service} className={i < pricingTable.length - 1 ? 'border-b border-slate-100' : ''}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.service}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-teal-700">{row.price}</td>
                    <td className="hidden px-6 py-4 text-sm text-slate-500 sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            * 상세 요금은 사업 규모와 업종에 따라 달라질 수 있습니다. 정확한 견적은 상담을 통해 안내드립니다.
          </p>
        </div>
      </section>

      {/* Blog */}
      {publishedPosts.length > 0 && (
        <section id="blog" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold text-slate-900">세무 칼럼</h2>
            <p className="mt-2 text-center text-slate-600">세금에 대한 유용한 정보를 제공합니다</p>
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

      {/* Testimonials */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">고객 후기</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <blockquote className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-slate-600">&ldquo;처음 창업할 때 아무것도 몰랐는데, 박세무사님 덕분에 세금 걱정 없이 사업에 집중할 수 있었습니다.&rdquo;</p>
              <footer className="mt-4 text-sm font-medium text-slate-900">- 김** (온라인 쇼핑몰 대표)</footer>
            </blockquote>
            <blockquote className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-slate-600">&ldquo;양도소득세 절세 상담을 받고 수천만원을 아꼈습니다. 전문가에게 맡기길 정말 잘했습니다.&rdquo;</p>
              <footer className="mt-4 text-sm font-medium text-slate-900">- 이** (부동산 투자자)</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section id="consultation" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">무료 세무 상담</h2>
          <p className="mt-2 text-center text-slate-600">
            {tenant.ownerName} 세무사가 직접 상담해 드립니다.
          </p>
          <div className="mt-8 rounded-xl bg-slate-50 p-8 shadow-sm">
            <ConsultationForm tenant={tenant} />
          </div>
        </div>
      </section>
    </>
  );
}
