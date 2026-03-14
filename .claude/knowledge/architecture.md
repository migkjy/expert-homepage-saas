# Architecture — Expert Homepage SaaS (ProSite)

## Overview
Multi-tenant SaaS for Korean professionals (lawyers, tax accountants, patent attorneys).
Each tenant gets a subdomain-based independent homepage at `{slug}.prosite.kr`.

## Request Flow
```
Browser → Vercel Edge → middleware.ts → App Router
  ├── prosite.kr          → /page.tsx (landing)
  ├── app.prosite.kr      → /admin/* (admin panel)
  ├── {slug}.prosite.kr   → /sites/[slug]/* (tenant site)
  └── localhost?tenant=x  → /sites/[slug]/* (local dev)
```

## App Structure
```
src/app/
├── page.tsx              # Landing page (prosite.kr root)
├── demo/                 # Demo mode (no signup, 30min session)
├── onboarding/step1~4/   # 4-step onboarding wizard
├── dashboard/            # Tenant dashboard (stats, blog, consultations, settings)
├── admin/tenants/        # Admin panel (app.prosite.kr)
├── sites/[slug]/         # Tenant homepage (subdomain-routed)
└── api/tenants/          # REST API for tenant CRUD
```

## Data Layer (MVP)
- `src/lib/data/tenants.json` — tenant registry (JSON file, no DB yet)
- `content/{tenant-slug}/` — MDX blog posts per tenant
- `src/lib/demo.ts` — demo session via sessionStorage (30min TTL)

## AI Content System
- `src/lib/content/ai-generator.ts` — Claude SDK content generation
- `src/lib/content/content-validator.ts` — validation rules
- `src/lib/content/keyword-research.ts` — Naver keyword API
- `src/lib/content/prompt-templates.ts` — prompt engineering
- `scripts/content-scheduler.ts` — batch blog generation CLI
- `scripts/naver-blog-sync.ts` — MDX to Naver blog HTML converter

## Component Hierarchy
- `src/components/landing/` — landing page sections
- `src/components/onboarding/` — onboarding wizard UI
- `src/components/dashboard/` — dashboard widgets
- `src/components/tenant/` — shared tenant site components (header, footer, consult form, JSON-LD)
- `src/components/templates/` — profession-specific homepage templates
- `src/components/demo/` — demo mode banner
- `src/components/ui/` — shared primitives (Button, etc.)

## Testing
- Vitest + jsdom + React Testing Library
- Config: `vitest.config.ts`, setup: `vitest.setup.ts`
- Tests: `src/__tests__/`
