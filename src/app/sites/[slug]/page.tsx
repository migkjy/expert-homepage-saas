import { notFound } from 'next/navigation';
import { getTenantBySlug, getAllTenants } from '@/lib/tenant';
import { DEMO_TENANT } from '@/lib/demo';
import { LawyerTemplate } from '@/components/templates/lawyer-template';
import { TaxAccountantTemplate } from '@/components/templates/tax-accountant-template';
import { PatentAttorneyTemplate } from '@/components/templates/patent-attorney-template';
import type { Tenant } from '@/types/tenant';

export async function generateStaticParams() {
  return getAllTenants().map((t) => ({ slug: t.slug }));
}

function getTemplate(tenant: Tenant) {
  switch (tenant.profession) {
    case 'lawyer':
      return <LawyerTemplate tenant={tenant} />;
    case 'tax_accountant':
      return <TaxAccountantTemplate tenant={tenant} />;
    case 'patent_attorney':
      return <PatentAttorneyTemplate tenant={tenant} />;
    default:
      return <LawyerTemplate tenant={tenant} />;
  }
}

export default async function TenantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Demo tenant: use hardcoded data
  if (slug === 'demo-lawyer') {
    return <main>{getTemplate(DEMO_TENANT)}</main>;
  }

  const tenant = getTenantBySlug(slug);

  if (!tenant) {
    notFound();
  }

  return <main>{getTemplate(tenant)}</main>;
}
