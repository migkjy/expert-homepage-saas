import Link from 'next/link';

export default function TenantNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-300">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-slate-900">
          사이트를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-slate-600">
          요청하신 사무소 사이트가 존재하지 않거나 비활성화되었습니다.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          ProSite 홈으로
        </Link>
      </div>
    </div>
  );
}
