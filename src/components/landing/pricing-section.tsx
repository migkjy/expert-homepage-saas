import Link from 'next/link';
import { PRICING } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            합리적인 요금제
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            사무소 규모와 필요에 맞는 플랜을 선택하세요.
            모든 플랜에 14일 무료 체험이 포함됩니다.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 p-6 transition-shadow hover:shadow-lg ${
                plan.popular
                  ? 'border-blue-500 shadow-lg'
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold text-white">
                    가장 인기
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {plan.priceLabel}
                  </span>
                  <span className="text-sm text-slate-500">원/월</span>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/onboarding/step1">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
