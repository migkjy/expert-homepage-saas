import type { Tenant } from '@/types/tenant';
import { PROFESSION_LABELS } from '@/types/tenant';

export function TenantFooter({ tenant }: { tenant: Tenant }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700">{tenant.businessName}</p>
          <p>{PROFESSION_LABELS[tenant.profession]} {tenant.ownerName}</p>
          <p>{tenant.address}</p>
          <p>
            <a href={`tel:${tenant.phone}`} className="hover:text-slate-700">
              {tenant.phone}
            </a>
            {' | '}
            <a href={`mailto:${tenant.email}`} className="hover:text-slate-700">
              {tenant.email}
            </a>
          </p>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {tenant.businessName}. Powered by ProSite.
          </p>
        </div>
      </div>
    </footer>
  );
}
