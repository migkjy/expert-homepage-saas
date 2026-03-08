import { NextRequest, NextResponse } from 'next/server';
import { getAllTenants } from '@/lib/tenant';
import type { Tenant } from '@/types/tenant';

function generateSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30)
    || `site-${Date.now()}`;
}

export async function GET() {
  const tenants = getAllTenants();
  return NextResponse.json(tenants);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    profession,
    businessName,
    ownerName,
    specialties = [],
    region,
    phone,
    email,
    address = '',
    description = '',
    primaryColor = '#1B365D',
    tagline = '',
  } = body;

  if (!profession || !businessName || !ownerName || !region || !phone || !email) {
    return NextResponse.json(
      { error: '필수 항목을 모두 입력해 주세요.' },
      { status: 400 }
    );
  }

  const slug = generateSlug(businessName);

  // In MVP, we just return the created tenant data
  // In production, this would save to a database
  const newTenant: Tenant = {
    id: `tenant-${Date.now()}`,
    slug,
    businessName,
    ownerName,
    profession,
    specialties,
    region,
    phone,
    email,
    address,
    description,
    templateId: profession,
    plan: 'pro',
    createdAt: new Date().toISOString(),
    branding: {
      primaryColor,
      tagline,
    },
    blogPosts: [],
    consultations: [],
    stats: {
      totalVisitors: 0,
      monthlyVisitors: 0,
      totalConsultations: 0,
    },
  };

  return NextResponse.json(newTenant, { status: 201 });
}
