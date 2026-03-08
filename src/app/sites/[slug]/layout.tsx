import { notFound } from 'next/navigation';
import { getTenantBySlug, getAllTenants } from '@/lib/tenant';
import { DEMO_TENANT } from '@/lib/demo';
import { PROFESSION_LABELS } from '@/types/tenant';
import { TenantHeader } from '@/components/tenant/header';
import { TenantFooter } from '@/components/tenant/footer';
import { TenantJsonLd } from '@/components/tenant/json-ld';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return getAllTenants().map((t) => ({ slug: t.slug }));
}

function resolveTenant(slug: string) {
  if (slug === 'demo-lawyer') return DEMO_TENANT;
  return getTenantBySlug(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tenant = resolveTenant(slug);
  if (!tenant) return {};

  const professionLabel = PROFESSION_LABELS[tenant.profession];
  return {
    title: `${tenant.businessName} | ${tenant.ownerName} ${professionLabel}`,
    description: tenant.description,
    openGraph: {
      title: `${tenant.businessName} | ${tenant.ownerName} ${professionLabel}`,
      description: tenant.description,
      type: 'website',
    },
  };
}

export default async function TenantLayout({ params, children }: Props) {
  const { slug } = await params;
  const tenant = resolveTenant(slug);

  if (!tenant) {
    notFound();
  }

  return (
    <>
      <TenantJsonLd tenant={tenant} />
      <TenantHeader tenant={tenant} />
      {children}
      <TenantFooter tenant={tenant} />
    </>
  );
}
