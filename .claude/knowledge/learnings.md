# Learnings — Expert Homepage SaaS

## Multi-tenant
- Local dev uses `?tenant=slug` query param (no local DNS setup needed)
- Subdomain extraction in middleware must handle port numbers
- Reserved subdomains (`app`, `www`) need explicit routing before tenant catch-all

## Next.js 16
- App Router with React 19
- Tailwind CSS 4 uses `@tailwindcss/postcss` plugin
- ESLint 9 flat config (`eslint.config.mjs`)

## Testing
- Vitest + jsdom for component testing
- React Testing Library for UI interaction tests
- `vitest.setup.ts` for global test setup

## Content System
- Claude SDK for structured blog generation with validation
- Naver keyword research API for Korean SEO
- MDX format for tenant blog posts, convertible to Naver blog HTML
