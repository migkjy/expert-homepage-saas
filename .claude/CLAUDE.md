# Expert Homepage SaaS (ProSite) — PL Session Rules

## Project
전문직(변호사/세무사/변리사) AI 홈페이지+마케팅 SaaS MVP
- Domain: prosite.kr | Subdomain: {slug}.prosite.kr
- Tech: Next.js 16, App Router, TypeScript, Tailwind CSS 4, Vitest
- Data: JSON file-based (MVP phase)
- AI: Anthropic Claude SDK for content generation

## Commands
```bash
npm run dev          # localhost:3000
npm run build        # production build
npm test             # vitest run
npm run test:watch   # vitest watch
npm run lint         # eslint
```

## Branch Strategy
- main single branch (MVP)
- Git push to main triggers Vercel auto-deploy

## Dev Rules
- Mobile-first responsive design
- Korean UI, English conventional commits
- Build must pass before commit
- TDD: write tests first, then implement
- ralph-loop skill required for all development

## Session Protocol
- Reply to Jarvis: `scripts/project-reply.sh "메시지" "expert-homepage-saas"`
- Knowledge files: `.claude/knowledge/` (read on session start)
- Context < 15%: memory backup + compact immediately

## Multi-tenant Routing
- Middleware: `src/middleware.ts`
- Local dev: `?tenant=slug` query param
- Production: subdomain extraction from hostname
- `app.prosite.kr` → admin panel

## Key Paths
- Tenant data: `src/lib/data/tenants.json`
- Templates: `src/components/templates/`
- AI content: `src/lib/content/`
- Blog content: `content/{tenant-slug}/`
- Onboarding: `src/app/onboarding/step1~4/`

## Constraints
- See `.claude/knowledge/constraints.md`
- See `.claude/knowledge/api-keys.md` (gitignored, secrets)

## Staging/Production
- main push → Vercel auto-deploy
- No `vercel deploy` / `vercel --prod` CLI usage
