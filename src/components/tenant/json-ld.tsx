import type { Tenant } from '@/types/tenant';
import { PROFESSION_LABELS } from '@/types/tenant';

const professionSchemaType: Record<string, string> = {
  lawyer: 'LegalService',
  tax_accountant: 'AccountingService',
  patent_attorney: 'ProfessionalService',
};

export function TenantJsonLd({ tenant }: { tenant: Tenant }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', professionSchemaType[tenant.profession] || 'ProfessionalService'],
    name: tenant.businessName,
    description: tenant.description,
    telephone: tenant.phone,
    email: tenant.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: tenant.address,
      addressLocality: tenant.region,
      addressCountry: 'KR',
    },
    areaServed: tenant.region,
    priceRange: '$$',
    knowsAbout: tenant.specialties,
    employee: {
      '@type': 'Person',
      name: tenant.ownerName,
      jobTitle: PROFESSION_LABELS[tenant.profession],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
