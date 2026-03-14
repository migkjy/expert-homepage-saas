# Constraints — Expert Homepage SaaS

## Development
- Mobile-first responsive (Korean professionals use mobile heavily)
- Korean UI text, English code/commits
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`
- Build must pass (`npm run build`) before every commit
- TDD mandatory: tests first → implementation → green
- ralph-loop skill required for all PL development

## Data
- MVP uses JSON files, no database yet
- `src/lib/data/tenants.json` is the single source of truth for tenants
- Demo mode uses sessionStorage only (no server persistence)

## Deployment
- Vercel auto-deploy on main push (Git integration)
- `vercel deploy` / `vercel --prod` CLI absolutely forbidden
- No new Vercel projects without CEO approval

## Content
- AI content generation requires ANTHROPIC_API_KEY
- Naver keyword research requires NAVER_CLIENT_ID/SECRET
- No bulk content pre-generation (CEO rule)
- Content changes go through CEO review

## Security
- API keys in `.env.local` only (gitignored)
- `.claude/knowledge/api-keys.md` is gitignored (secrets)
- No secrets in commits

## Multi-tenant
- Tenant slugs must be URL-safe (lowercase, hyphens)
- Reserved subdomains: `www`, `app`, `api`
- Root domain: `prosite.kr`

## Plan-First Development (Mandatory)
1. Write plan in `docs/plans/` before any coding
2. Get VP approval before execution
3. Execute with TDD + ralph-loop
4. No code without an approved plan
