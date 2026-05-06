#!/usr/bin/env bash
# verify-live.sh — Live-site verification suite for originalinsurance.net
#
# Usage: bash scripts/verify-live.sh
# Exit code 0 = all pass, 1 = at least one failure.

set -uo pipefail

PROD="https://originalinsurance.net"
FAILURES=0

ok()   { echo "  ✓ $*"; }
fail() { echo "  ✗ $*" >&2; FAILURES=$((FAILURES + 1)); }

echo ""
echo "--- Live verification: $PROD ---"
echo ""

# ── Canonical URLs return 200 ─────────────────────────────────────────────────
echo "Canonical URLs (expected 200):"
for url in / /about /services /locations /contact /faq \
           /insurance/downey /insurance/bellflower /insurance/cerritos \
           /insurance/commerce /insurance/lakewood /insurance/lynwood \
           /insurance/montebello /insurance/norwalk /insurance/paramount \
           /insurance/pico-rivera /insurance/south-gate /insurance/whittier \
           /auto-insurance-downey-ca /sr22-insurance-downey \
           /no-license-auto-insurance-downey /commercial-auto-insurance-downey; do
  code=$(curl -so /dev/null -w "%{http_code}" "${PROD}${url}")
  if [[ "$code" == "200" ]]; then
    ok "$code  $url"
  else
    fail "$code  $url  (expected 200)"
  fi
done

echo ""

# ── Trailing-slash variants redirect 308 ─────────────────────────────────────
echo "Trailing-slash redirects (expected 308):"
for url in /about/ /services/ /locations/ /contact/ /faq/ \
           /insurance/downey/ /insurance/bellflower/ /insurance/cerritos/; do
  code=$(curl -so /dev/null -w "%{http_code}" "${PROD}${url}")
  if [[ "$code" == "308" ]]; then
    ok "$code  $url"
  else
    fail "$code  $url  (expected 308)"
  fi
done

echo ""

# ── index.html redirects ─────────────────────────────────────────────────────
echo "index.html redirect (expected 308):"
code=$(curl -so /dev/null -w "%{http_code}" "${PROD}/index.html")
if [[ "$code" == "308" ]]; then
  ok "$code  /index.html"
else
  fail "$code  /index.html  (expected 308)"
fi

echo ""

# ── Query-param URLs return 200 (robots disallows crawl, but URL works) ───────
echo "Query-param URL (expected 200 — robots.txt handles crawl prevention):"
code=$(curl -so /dev/null -w "%{http_code}" "${PROD}/faq?q=test")
if [[ "$code" == "200" ]]; then
  ok "$code  /faq?q=test"
else
  fail "$code  /faq?q=test  (expected 200, no redirect loop)"
fi

echo ""

# ── robots.txt has Disallow ───────────────────────────────────────────────────
echo "robots.txt:"
if curl -s "${PROD}/robots.txt" | grep -q "Disallow: /\*?q="; then
  ok "Disallow: /*?q= present"
else
  fail "Disallow: /*?q= MISSING from robots.txt"
fi

echo ""

# ── Sitemap accessible ────────────────────────────────────────────────────────
echo "Sitemap:"
sitemap=$(curl -s "${PROD}/sitemap.xml")
if echo "$sitemap" | grep -q "<urlset"; then
  ok "sitemap.xml is accessible and looks like XML"
else
  fail "sitemap.xml missing or malformed"
fi
city_count=$(echo "$sitemap" | grep -c "/insurance/" || true)
if [[ "$city_count" -eq 12 ]]; then
  ok "12 city pages in sitemap"
else
  fail "Expected 12 city pages in sitemap, found: $city_count"
fi

echo ""

# ── Schema audit on key live pages ───────────────────────────────────────────
echo "Schema audit:"
about_ia=$(curl -s "${PROD}/about" | grep -c "InsuranceAgency" || true)
if [[ "$about_ia" -eq 0 ]]; then
  ok "About: InsuranceAgency absent (correct)"
else
  fail "About: InsuranceAgency present (should be absent)"
fi

services_ia=$(curl -s "${PROD}/services" | grep -c "InsuranceAgency" || true)
if [[ "$services_ia" -eq 0 ]]; then
  ok "Services: InsuranceAgency absent (correct)"
else
  fail "Services: InsuranceAgency present (should be absent)"
fi

home_ia=$(curl -s "${PROD}/" | grep -c "InsuranceAgency" || true)
if [[ "$home_ia" -ge 1 ]]; then
  ok "Homepage: InsuranceAgency present (correct)"
else
  fail "Homepage: InsuranceAgency missing"
fi

# Check InsuranceAgency url on homepage (must be homepage, not sub-page)
home_url=$(curl -s "${PROD}/" | grep -oE '"url":"https://originalinsurance\.net[^"]*"' | head -1 || true)
if echo "$home_url" | grep -qE '"url":"https://originalinsurance\.net/"'; then
  ok "Homepage InsuranceAgency url is homepage ✓"
else
  fail "Homepage InsuranceAgency url is wrong: $home_url"
fi

echo ""

# ── Homepage has all 12 city links ───────────────────────────────────────────
echo "Homepage city links (expected: OK for all 12):"
for city in downey bellflower cerritos commerce lakewood lynwood \
            montebello norwalk paramount pico-rivera south-gate whittier; do
  if curl -s "${PROD}/" | grep -q "/insurance/${city}"; then
    ok "$city"
  else
    fail "$city  (link MISSING from homepage)"
  fi
done

echo ""

# ── No search_term_string on any page ────────────────────────────────────────
echo "No {search_term_string} pollution (expected 0 hits on each page):"
any_hits=0
for url in / /faq /about /services; do
  hits=$(curl -s "${PROD}${url}" | grep -c "search_term_string" || true)
  if [[ "$hits" -eq 0 ]]; then
    ok "0 hits on $url"
  else
    fail "$hits hit(s) on $url — SearchAction schema pollution"
    any_hits=$((any_hits + 1))
  fi
done

echo ""

# ── About page has substantial content ───────────────────────────────────────
echo "About page word count:"
about_words=$(curl -s "${PROD}/about" | sed 's/<[^>]*>/ /g' | wc -w)
if [[ "$about_words" -gt 800 ]]; then
  ok "~${about_words} words (stripped markup, target > 800)"
else
  fail "~${about_words} words — below target of 800 (may still not index)"
fi

echo ""

# ── Sitemap lastmod is recent ─────────────────────────────────────────────────
echo "Sitemap lastmod:"
lastmods=$(curl -s "${PROD}/sitemap.xml" | grep -oE '<lastmod>[0-9-]+</lastmod>' | sort -u)
echo "  Found dates: $lastmods"
if echo "$lastmods" | grep -qE "202[56]-"; then
  ok "lastmod dates look recent"
else
  fail "lastmod dates look stale — update sitemap.xml"
fi

echo ""
echo "─────────────────────────────────────────────────"
if [[ $FAILURES -eq 0 ]]; then
  echo "  ✅ All live checks passed."
  echo ""
  exit 0
else
  echo "  ❌ $FAILURES check(s) failed."
  echo ""
  exit 1
fi
