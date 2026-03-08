'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'ProSite가 무엇인가요?',
    a: 'ProSite는 변호사, 세무사, 변리사 등 전문직을 위한 AI 마케팅 플랫폼입니다. AI가 전문 홈페이지를 자동 생성하고, 블로그 콘텐츠, SEO, 상담 예약까지 올인원으로 관리해 드립니다.',
  },
  {
    q: '홈페이지 제작에 얼마나 걸리나요?',
    a: '기본 정보만 입력하면 5분 이내에 전문 홈페이지가 생성됩니다. 이후 대시보드에서 브랜딩, 콘텐츠 등을 자유롭게 수정할 수 있습니다.',
  },
  {
    q: 'AI가 작성하는 콘텐츠의 품질은 어떤가요?',
    a: '전문직 도메인에 특화된 AI 모델이 법률, 세무, 특허 분야의 정확한 콘텐츠를 생성합니다. 발행 전 검토/수정이 가능하며, AI가 작성한 글도 전문가가 감수한 것처럼 자연스럽습니다.',
  },
  {
    q: '기존 홈페이지가 있어도 사용할 수 있나요?',
    a: '네, 프리미엄 플랜 이상에서는 기존 도메인을 연결할 수 있습니다. 기존 홈페이지와 병행 운영하거나 완전히 전환하실 수 있습니다.',
  },
  {
    q: '무료 체험 기간에 결제가 되나요?',
    a: '아닙니다. 14일 무료 체험 기간에는 신용카드 등록 없이 모든 기능을 사용하실 수 있습니다. 체험 후 유료 전환을 원하실 때만 결제 정보를 입력하시면 됩니다.',
  },
  {
    q: '해지는 어떻게 하나요?',
    a: '대시보드에서 언제든 플랜을 해지하실 수 있습니다. 해지 수수료는 없으며, 결제 주기 종료일까지 서비스를 이용하실 수 있습니다.',
  },
  {
    q: '여러 사무소를 동시에 관리할 수 있나요?',
    a: '에이전시 플랜(149,000원/월)에서는 최대 5개 사무소의 홈페이지를 하나의 계정으로 관리할 수 있습니다. 화이트라벨도 지원합니다.',
  },
  {
    q: '어떤 전문직이 이용할 수 있나요?',
    a: '현재 변호사, 세무사, 변리사 3개 직종에 최적화된 템플릿을 제공하고 있습니다. 향후 법무사, 노무사, 관세사 등으로 확장할 계획입니다.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            자주 묻는 질문
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ProSite에 대해 궁금한 점을 확인해 보세요.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-slate-900">{faq.q}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="border-t border-slate-100 px-6 py-4">
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
