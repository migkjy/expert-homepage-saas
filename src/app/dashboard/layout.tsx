import { TenantSidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden md:block">
        <TenantSidebar />
      </div>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
