#!/usr/bin/env bash
# install-hooks.sh — Install git pre-commit SEO lint hook
#
# Usage: bash scripts/install-hooks.sh
#
# ASK BRIAN BEFORE RUNNING — this will block commits if seo-lint finds issues.
# Only install if you're OK with the lint gate. You can always bypass with:
#   git commit --no-verify  (for emergency commits)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOK="$REPO_ROOT/.git/hooks/pre-commit"

cat > "$HOOK" << 'HOOK_SCRIPT'
#!/usr/bin/env bash
# pre-commit hook: run SEO lint before every commit
# Bypass with: git commit --no-verify

APP_DIR="$(git rev-parse --show-toplevel)/original-insurance"

if [[ ! -f "$APP_DIR/scripts/seo-lint.mjs" ]]; then
  exit 0  # no lint script, skip
fi

echo ""
echo "  → Running SEO lint (pre-commit)..."
cd "$APP_DIR" && node scripts/seo-lint.mjs
EXIT=$?

if [[ $EXIT -eq 1 ]]; then
  echo ""
  echo "  ✗ SEO lint failed. Fix issues before committing."
  echo "  ✗ To bypass (emergency only): git commit --no-verify"
  echo ""
  exit 1
fi

exit 0
HOOK_SCRIPT

chmod +x "$HOOK"
echo "  ✓ Pre-commit hook installed at $HOOK"
echo "  To uninstall: rm $HOOK"
