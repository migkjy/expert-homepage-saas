import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900">ProSite</h3>
            <p className="mt-2 text-sm text-slate-600">
              전문직을 위한 AI 마케팅 플랫폼.
              <br />
              변호사, 세무사, 변리사의 온라인 마케팅을 자동화합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">서비스</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="#pricing" className="hover:text-blue-600">요금제</Link></li>
              <li><Link href="/onboarding/step1" className="hover:text-blue-600">시작하기</Link></li>
              <li><Link href="#" className="hover:text-blue-600">템플릿 미리보기</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">법적 고지</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/terms" className="hover:text-blue-600">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">개인정보처리방침</Link></li>
              <li><Link href="#" className="hover:text-blue-600">환불 정책</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>&copy; 2026 ProSite. All rights reserved.</p>
          <p className="mt-1">뉴비즈소프트 | 사업자등록번호: 000-00-00000</p>
        </div>
      </div>
    </footer>
  );
}
