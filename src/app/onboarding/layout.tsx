import Link from 'next/link';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-slate-900">
            ProSite
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            홈으로 돌아가기
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
