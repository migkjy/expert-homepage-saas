import tenantsData from './data/tenants.json';
import type { Tenant } from '@/types/tenant';

const tenants: Tenant[] = tenantsData as Tenant[];

export function getAllTenants(): Tenant[] {
  return tenants;
}

export function getTenantBySlug(slug: string): Tenant | undefined {
  return tenants.find((t) => t.slug === slug);
}

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id);
}

export function getTenantsByProfession(profession: string): Tenant[] {
  return tenants.filter((t) => t.profession === profession);
}
