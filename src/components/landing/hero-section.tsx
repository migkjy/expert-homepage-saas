import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium tracking-wider text-blue-300 uppercase">
            전문직 AI 마케팅 플랫폼
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            월 2만9천원에
            <br />
            <span className="text-blue-300">AI 마케터</span>를 고용하세요
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            변호사, 세무사, 변리사를 위한 AI 자동화 홈페이지.
            <br className="hidden sm:block" />
            전문 콘텐츠 생성부터 SEO, 상담 예약까지 올인원.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/onboarding/step1">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white">
                무료로 시작하기
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                데모 체험하기
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            신용카드 없이 14일 무료 체험
          </p>
        </div>
      </div>
    </section>
  );
}
