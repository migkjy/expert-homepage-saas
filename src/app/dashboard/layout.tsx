import { TenantSidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <TenantSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
