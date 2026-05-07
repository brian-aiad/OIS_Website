#!/usr/bin/env bash
# deploy.sh — Full deploy pipeline for originalinsurance.net
#
# Usage:
#   bash scripts/deploy.sh            # deploy to production
#   bash scripts/deploy.sh --dry-run  # print what would happen, touch nothing
#
# Must be run from repo root (ois_website/).
# Requires: node, npm, vercel CLI authenticated.

set -euo pipefail

DRY_RUN=false
for arg in "$@"; do
  [[ "$arg" == "--dry-run" ]] && DRY_RUN=true
done

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$REPO_ROOT/original-insurance"
STATIC_OUT="$REPO_ROOT/.vercel/output/static"
PRERENDER_SNAPSHOT=""
cleanup() {
  [[ -n "$PRERENDER_SNAPSHOT" && -d "$PRERENDER_SNAPSHOT" ]] && rm -rf "$PRERENDER_SNAPSHOT"
}
trap cleanup EXIT

log()  { echo "  $*"; }
ok()   { echo "  ✓ $*"; }
fail() { echo "  ✗ $*" >&2; exit 1; }
dryrun() { echo "  [dry-run] would: $*"; }

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  originalinsurance.net deploy pipeline"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Step 0: Require clean working tree ──────────────────────────────────────
log "Checking working tree is clean..."
if [[ -n "$(git -C "$REPO_ROOT" status --porcelain)" ]]; then
  fail "Working tree has uncommitted changes. Commit or stash before deploying."
fi
ok "Working tree is clean"

# ── Step 1: SEO lint ────────────────────────────────────────────────────────
log "Running SEO lint..."
if $DRY_RUN; then
  dryrun "cd $APP_DIR && node scripts/seo-lint.mjs"
else
  cd "$APP_DIR"
  node scripts/seo-lint.mjs || fail "SEO lint failed — fix issues before deploying"
  ok "SEO lint passed"
fi

# ── Step 2: npm build (TypeScript + Vite + Playwright prerender) ─────────────
log "Building with prerender (this takes ~60s)..."
if $DRY_RUN; then
  dryrun "cd $APP_DIR && npm run build"
else
  cd "$APP_DIR"
  npm run build || fail "npm run build failed"
  PRERENDER_SNAPSHOT="$(mktemp -d)"
  cp -R "$APP_DIR/dist/." "$PRERENDER_SNAPSHOT/"
  ok "Build complete — 22 pages prerendered in dist/"
fi

# ── Step 3: Schema validation ────────────────────────────────────────────────
log "Validating schema on prerendered HTML..."
if $DRY_RUN; then
  dryrun "cd $APP_DIR && node scripts/validate-schema.mjs"
else
  cd "$APP_DIR"
  node scripts/validate-schema.mjs || fail "Schema validation failed — fix before deploying"
  ok "Schema validation passed"
fi

# ── Step 4: vercel build (creates .vercel/output structure) ──────────────────
log "Running vercel build --target production (skips prerender, creates routing)..."
if $DRY_RUN; then
  dryrun "cd $REPO_ROOT && vercel build --target production --yes"
else
  cd "$REPO_ROOT"
  vercel build --target production --yes >/dev/null || fail "vercel build failed"
  ok "Vercel output structure created"
fi

# ── Step 5: Copy prerendered HTML into Vercel output ─────────────────────────
log "Copying prerendered pages into .vercel/output/static/..."
COPIED=0
if $DRY_RUN; then
  find "$APP_DIR/dist" -mindepth 2 -name "index.html" | while read -r f; do
    reldir="${f#$APP_DIR/dist/}"
    reldir="${reldir%/index.html}"
    dryrun "mkdir -p $STATIC_OUT/$reldir && cp $f $STATIC_OUT/$reldir/index.html"
  done
else
  [[ -n "$PRERENDER_SNAPSHOT" && -d "$PRERENDER_SNAPSHOT" ]] || fail "Prerender snapshot missing"
  # Copy prerendered subdirectory pages (about/, faq/, insurance/*, etc.)
  # Note: use snapshot prefix in path stripping since Vercel build can rewrite app dist.
  while IFS= read -r -d '' f; do
    reldir="${f#$PRERENDER_SNAPSHOT/}"
    reldir="${reldir%/index.html}"
    mkdir -p "$STATIC_OUT/$reldir"
    cp "$f" "$STATIC_OUT/$reldir/index.html"
    COPIED=$((COPIED + 1))
  done < <(find "$PRERENDER_SNAPSHOT" -mindepth 2 -name "index.html" -print0)
  cp "$PRERENDER_SNAPSHOT/index.html" "$STATIC_OUT/index.html"
  # Also copy sitemap and robots (may have been updated by build)
  cp "$PRERENDER_SNAPSHOT/sitemap.xml" "$STATIC_OUT/sitemap.xml"
  cp "$PRERENDER_SNAPSHOT/robots.txt"  "$STATIC_OUT/robots.txt"
  ok "Copied $COPIED prerendered pages + root + sitemap + robots.txt"
fi

# ── Step 6: Deploy to production ─────────────────────────────────────────────
log "Deploying to production..."
if $DRY_RUN; then
  dryrun "cd $REPO_ROOT && vercel deploy --prebuilt --prod"
  echo ""
  echo "  Dry-run complete. No changes made."
  echo ""
  exit 0
fi

cd "$REPO_ROOT"
DEPLOY_OUTPUT=$(vercel deploy --prebuilt --prod 2>&1)
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oE 'https://ois-website-[^[:space:]]+\.vercel\.app' | head -1)
echo "$DEPLOY_OUTPUT" | grep -E "Production:|Inspect:|Ready"
ok "Deployed: $DEPLOY_URL"

# ── Step 7: Wait for CDN and verify ──────────────────────────────────────────
log "Waiting for CDN propagation..."
PROD="https://originalinsurance.net"
MAX_WAIT=120
ELAPSED=0
while [[ $ELAPSED -lt $MAX_WAIT ]]; do
  AGE=$(curl -sI "$PROD/" | grep -oE 'Age: [0-9]+' | grep -oE '[0-9]+' || echo "999")
  if [[ "${AGE:-999}" -lt 30 ]]; then
    ok "CDN updated (Age: ${AGE}s)"
    break
  fi
  sleep 8
  ELAPSED=$((ELAPSED + 8))
done
if [[ $ELAPSED -ge $MAX_WAIT ]]; then
  log "Warning: CDN did not show low Age within ${MAX_WAIT}s — verifying anyway"
fi

log "Running verification checks..."
bash "$REPO_ROOT/scripts/verify-live.sh" || fail "Live verification failed — deployment may have issues"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Deploy complete: $PROD"
echo "     Deployment URL: $DEPLOY_URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
