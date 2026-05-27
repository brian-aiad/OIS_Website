# Original Insurance Website

React 19 + Vite 7 website for Original Insurance Services in Downey, California.

## Repo Layout

```text
ois_website/
  AGENTS.md                         Codex instructions
  CLAUDE.md                         Claude instructions
  docs/                             handoffs, SEO notes, audits, brand sources
  original-insurance/               Vite app
  scripts/                          repo-root deploy and live verification scripts
```

## Common Commands

Run app commands from `original-insurance/`:

```bash
npm run dev
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
npm run deploy:check
```

Run deployment and live verification from the repo root:

```bash
bash scripts/deploy.sh
bash scripts/verify-live.sh
```

The dev server is pinned to `http://localhost:3002` with `strictPort: true`.

## Notes For AI Agents

Claude and Codex share the same operating rules in `docs/AI_WORKFLOW.md`. Keep that file, `AGENTS.md`, `CLAUDE.md`, and `.claude/skills/original-insurance-seo/SKILL.md` aligned when SEO or deployment behavior changes.
