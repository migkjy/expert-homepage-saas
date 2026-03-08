import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-slate-200">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-slate-600">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
