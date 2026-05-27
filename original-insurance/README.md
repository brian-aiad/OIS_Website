# Original Insurance App

Vite app for `https://originalinsurance.net`.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
npm run deploy:check
```

The dev server uses port `3002`.

## Structure

```text
src/
  components/
  data/
  design-system/
  lib/
  pages/
public/
  images/
scripts/
  prerender.mjs
  seo-lint.mjs
  validate-schema.mjs
```

Deployment is managed from the repo root with `bash scripts/deploy.sh`.
