const templates = [
  {
    profession: '변호사',
    description: '신뢰감 있는 법률사무소 전용 디자인. 전문분야, 성공사례, 상담 예약.',
    color: 'from-blue-900 to-blue-700',
    features: ['전문분야 카드', '성공사례', '블로그/칼럼', '상담 예약 폼', '오시는 길'],
    image: '/templates/lawyer-preview.png',
  },
  {
    profession: '세무사',
    description: '깔끔한 세무사무소 디자인. 서비스 안내, 비용 테이블, 세무 칼럼.',
    color: 'from-teal-800 to-teal-600',
    features: ['서비스 목록', '기장료 안내', '세무 칼럼', '고객 후기', '상담 예약 폼'],
    image: '/templates/tax-preview.png',
  },
  {
    profession: '변리사',
    description: '기술적이고 모던한 특허사무소 디자인. 출원 프로세스, 등록 사례.',
    color: 'from-slate-800 to-slate-600',
    features: ['서비스 안내', '출원 프로세스', '등록 사례', '블로그', '상담 예약 폼'],
    image: '/templates/patent-preview.png',
  },
];

export function TemplatePreview() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            직종별 맞춤 템플릿
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            전문직 특성에 최적화된 3종의 홈페이지 템플릿을 제공합니다.
            5분이면 나만의 전문 홈페이지를 만들 수 있습니다.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.profession}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`bg-gradient-to-br ${template.color} p-8 text-center text-white`}>
                <div className="mx-auto flex h-48 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{template.profession}</p>
                    <p className="mt-1 text-sm text-white/80">전용 템플릿</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{template.profession} 템플릿</h3>
                <p className="mt-2 text-sm text-slate-600">{template.description}</p>
                <ul className="mt-4 space-y-2">
                  {template.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <svg className="h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
