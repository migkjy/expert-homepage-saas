import type { Tenant } from '@/types/tenant';
import { ConsultationForm } from '@/components/tenant/consultation-form';

const defaultServices = [
  { name: '특허출원', icon: '📋', desc: '발명의 권리를 보호하는 특허 출원 전문' },
  { name: '상표등록', icon: '🏷️', desc: '브랜드 보호를 위한 상표 출원 및 등록' },
  { name: '디자인등록', icon: '🎨', desc: '제품 디자인의 독점적 권리 확보' },
  { name: '기술이전', icon: '🔄', desc: '특허 라이선싱 및 기술이전 계약' },
  { name: '특허분쟁', icon: '⚔️', desc: '특허 침해 대응 및 무효 심판' },
  { name: 'IT/소프트웨어 특허', icon: '💻', desc: 'AI, 블록체인 등 IT 특허 전문' },
];

const processSteps = [
  { step: 1, title: '사전 상담', desc: '발명 내용 검토 및 특허 가능성 분석' },
  { step: 2, title: '선행기술 조사', desc: '기존 특허 조사로 등록 가능성 확인' },
  { step: 3, title: '명세서 작성', desc: '특허 청구범위 및 명세서 작성' },
  { step: 4, title: '출원', desc: '특허청 출원 및 방식 심사' },
  { step: 5, title: '심사 대응', desc: '심사관 의견서에 대한 보정/답변' },
  { step: 6, title: '등록', desc: '등록 결정 및 특허권 확보' },
];

export function PatentAttorneyTemplate({ tenant }: { tenant: Tenant }) {
  const services = tenant.specialties.map((s) => {
    const found = defaultServices.find((d) => d.name === s);
    return found || { name: s, icon: '💡', desc: `${s} 전문 지재권 서비스` };
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
              {tenant.region} | 변리사
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              특허 출원,
              <br />
              AI로 더 빠르고 정확하게
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
                무료 특허 상담
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
          <p className="mt-2 text-center text-slate-600">기술을 가치 있는 지적재산으로 바꿔드립니다</p>
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

      {/* Process */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">특허 출원 프로세스</h2>
          <p className="mt-2 text-center text-slate-600">체계적인 절차로 확실한 특허 등록을 도와드립니다</p>
          <div className="mt-12 space-y-0">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative flex gap-6">
                {/* Vertical line */}
                {i < processSteps.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-0.5 bg-slate-200" />
                )}
                {/* Step number */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                  {step.step}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Cases */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">대표 등록 사례</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="text-sm font-medium text-indigo-600">IT/소프트웨어</p>
              <h3 className="mt-2 text-lg font-semibold">AI 추천 알고리즘 특허</h3>
              <p className="mt-2 text-sm text-slate-600">
                딥러닝 기반 개인화 추천 시스템의 핵심 알고리즘 특허 등록
              </p>
              <p className="mt-3 text-xs text-slate-400">등록번호: 10-2025-XXXXXXX</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="text-sm font-medium text-indigo-600">상표</p>
              <h3 className="mt-2 text-lg font-semibold">스타트업 브랜드 상표 등록</h3>
              <p className="mt-2 text-sm text-slate-600">
                IT 서비스 스타트업의 문자+도형 결합상표 등록
              </p>
              <p className="mt-3 text-xs text-slate-400">등록번호: 40-2025-XXXXXXX</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="text-sm font-medium text-indigo-600">디자인</p>
              <h3 className="mt-2 text-lg font-semibold">IoT 디바이스 디자인 등록</h3>
              <p className="mt-2 text-sm text-slate-600">
                스마트홈 IoT 디바이스의 외관 디자인 권리 확보
              </p>
              <p className="mt-3 text-xs text-slate-400">등록번호: 30-2025-XXXXXXX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {publishedPosts.length > 0 && (
        <section id="blog" className="bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold text-slate-900">지재권 칼럼</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {publishedPosts.slice(0, 3).map((post) => (
                <article key={post.id} className="rounded-xl bg-white border border-slate-200 p-6 hover:shadow-md transition-shadow">
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
      <section id="consultation" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900">무료 특허 상담</h2>
          <p className="mt-2 text-center text-slate-600">
            {tenant.ownerName} 변리사가 직접 상담해 드립니다.
          </p>
          <div className="mt-8 rounded-xl bg-slate-50 p-8 shadow-sm">
            <ConsultationForm tenant={tenant} />
          </div>
        </div>
      </section>
    </>
  );
}
