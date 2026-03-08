'use client';

import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">사이트 설정</h1>
      <p className="mt-1 text-sm text-slate-500">홈페이지에 표시되는 정보를 수정합니다.</p>

      <form className="mt-8 max-w-2xl space-y-8">
        {/* Profile */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">기본 정보</h2>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">사무소명</label>
                <input defaultValue="김변호사 법률사무소" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">대표 이름</label>
                <input defaultValue="김민수" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">전화번호</label>
              <input defaultValue="02-555-1234" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">소개</label>
              <textarea rows={3} defaultValue="20년 경력의 가사·상속 전문 변호사. 의뢰인의 권리를 끝까지 지켜드립니다." className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">브랜딩</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">태그라인</label>
              <input defaultValue="당신의 권리, 끝까지 지켜드립니다" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">대표 색상</label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#1B365D" className="h-10 w-10 cursor-pointer rounded border border-slate-300" />
                <span className="text-sm text-slate-500">#1B365D</span>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">로고</label>
              <div className="rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
                <p className="text-sm text-slate-500">로고 이미지를 드래그하거나 클릭하여 업로드</p>
                <p className="mt-1 text-xs text-slate-400">PNG, JPG (최대 2MB)</p>
              </div>
            </div>
          </div>
        </div>

        <Button type="button">변경사항 저장</Button>
      </form>
    </div>
  );
}
