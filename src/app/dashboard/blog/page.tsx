import { getTenantBySlug } from '@/lib/tenant';
import { Button } from '@/components/ui/button';

export default function BlogManagementPage() {
  const tenant = getTenantBySlug('kim-law');
  const posts = tenant?.blogPosts || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">블로그 관리</h1>
          <p className="mt-1 text-sm text-slate-500">AI가 생성한 글을 검토하고 발행합니다.</p>
        </div>
        <Button>AI 글 생성하기</Button>
      </div>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900">{post.title}</h3>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs text-blue-600">AI 생성</span>
              </div>
              <p className="mt-1 text-sm text-slate-500 line-clamp-1">{post.excerpt}</p>
              <p className="mt-2 text-xs text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <div className="ml-4 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  post.published
                    ? 'bg-green-50 text-green-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {post.published ? '발행됨' : '미발행'}
              </span>
              <Button variant="ghost" size="sm">편집</Button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mt-8 rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
          <p className="text-slate-500">아직 작성된 글이 없습니다.</p>
          <p className="mt-1 text-sm text-slate-400">AI 글 생성 버튼을 눌러 첫 글을 만들어 보세요.</p>
        </div>
      )}
    </div>
  );
}
