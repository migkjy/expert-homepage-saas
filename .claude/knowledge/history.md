# History — Expert Homepage SaaS

## 2026-03-14 — Initial .claude/ setup
- Created `.claude/CLAUDE.md` with PL session rules
- Created `knowledge/architecture.md`, `constraints.md`, `api-keys.md`, `history.md`, `learnings.md`
- Project state: MVP with 4-step onboarding, multi-tenant routing, demo mode, AI content generation, admin panel
- Tech: Next.js 16, TypeScript, Tailwind CSS 4, Vitest
- Data: JSON file-based (no DB yet)
- Deployment: Vercel auto-deploy on main push

## Project Timeline
- Initial scaffold: Next.js 16 + App Router
- Onboarding wizard: 4-step flow (profession → info → branding → confirm)
- Multi-tenant: middleware.ts subdomain routing
- Demo mode: sessionStorage-based 30min trial
- AI content: Claude SDK integration for blog generation
- Admin panel: tenant list/detail at app.prosite.kr
- Naver blog sync: MDX → HTML converter script
