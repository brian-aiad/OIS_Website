# Original Insurance Website - Codex Instructions

Codex and Claude share this repo. Read `docs/AI_WORKFLOW.md` before changing code, SEO routing, deployment scripts, or generated assets.

Critical rules:

- App directory: `original-insurance/`
- Repo-root scripts: `scripts/deploy.sh`, `scripts/verify-live.sh`
- Dev server: `cd original-insurance && npm run dev` on port `3002`
- Local validation: `npm run lint`, `npm run seo-lint`, `npm run build`, `npm run validate:schema`
- Deploy only through `bash scripts/deploy.sh` from the repo root. Do not rely on GitHub/Vercel push deploys for this site.
- Canonical paths do not use trailing slashes. Explicit trailing-slash redirects in `original-insurance/vercel.json` are intentional.
- `?q=` URLs are stripped by `original-insurance/middleware.js` with a `308` redirect and also disallowed in `robots.txt`.
- Do not delete `.vercel/project.json`; it links the repo to the correct Vercel project.

Current source-of-truth docs:

- `docs/AI_WORKFLOW.md`
- `docs/handoffs/HANDOFF_CLAUDE_2026-05-26.md`
- `docs/seo/SEO_CONVENTIONS.md`
- `.claude/skills/original-insurance-seo/SKILL.md`
