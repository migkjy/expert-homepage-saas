export type Profession = 'lawyer' | 'tax_accountant' | 'patent_attorney';
export type Plan = 'starter' | 'pro' | 'premium' | 'agency';

export interface TenantBranding {
  primaryColor: string;
  logo?: string;
  tagline: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  published: boolean;
}

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  field: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'completed';
}

export interface Tenant {
  id: string;
  slug: string;
  businessName: string;
  ownerName: string;
  profession: Profession;
  specialties: string[];
  region: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  templateId: string;
  plan: Plan;
  createdAt: string;
  customDomain?: string;
  branding: TenantBranding;
  blogPosts: BlogPost[];
  consultations: Consultation[];
  stats: {
    totalVisitors: number;
    monthlyVisitors: number;
    totalConsultations: number;
  };
}

export const PROFESSION_LABELS: Record<Profession, string> = {
  lawyer: '변호사',
  tax_accountant: '세무사',
  patent_attorney: '변리사',
};

export const PLAN_LABELS: Record<Plan, string> = {
  starter: '스타터',
  pro: '프로',
  premium: '프리미엄',
  agency: '에이전시',
};

export const PROFESSION_ICONS: Record<Profession, string> = {
  lawyer: '⚖️',
  tax_accountant: '📊',
  patent_attorney: '💡',
};
