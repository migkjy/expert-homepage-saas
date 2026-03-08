import { AdminSidebar } from '@/components/dashboard/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
