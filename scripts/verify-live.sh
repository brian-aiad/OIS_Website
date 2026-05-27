#!/usr/bin/env bash
# Live-site verification suite for originalinsurance.net.
#
# Usage: bash scripts/verify-live.sh

set -uo pipefail

PROD="https://originalinsurance.net"
FAILURES=0

ok() { echo "  OK  $*"; }
fail() { echo "  FAIL  $*" >&2; FAILURES=$((FAILURES + 1)); }

echo ""
echo "--- Live verification: $PROD ---"
echo ""

canonical_urls=(
  / /about /services /locations /contact /faq
  /insurance/downey /insurance/bellflower /insurance/cerritos
  /insurance/commerce /insurance/lakewood /insurance/lynwood
  /insurance/montebello /insurance/norwalk /insurance/paramount
  /insurance/pico-rivera /insurance/south-gate /insurance/whittier
  /auto-insurance-downey-ca /sr22-insurance-downey
  /no-license-auto-insurance-downey /commercial-auto-insurance-downey
)

echo "Canonical URLs (expected 200):"
for url in "${canonical_urls[@]}"; do
  code=$(curl -so /dev/null -w "%{http_code}" "${PROD}${url}")
  if [[ "$code" == "200" ]]; then
    ok "$code  $url"
  else
    fail "$code  $url  (expected 200)"
  fi
done

echo ""
echo "Trailing-slash URLs (expected 308 to clean canonical paths):"
for url in /about/ /services/ /locations/ /contact/ /faq/ \
           /insurance/downey/ /insurance/bellflower/ /insurance/cerritos/; do
  code=$(curl -so /dev/null -w "%{http_code}" "${PROD}${url}")
  if [[ "$code" == "308" ]]; then
    ok "$code  $url"
  else
    fail "$code  $url  (expected 308 redirect to clean canonical path)"
  fi
done

echo ""
echo "index.html redirect (expected 308):"
code=$(curl -so /dev/null -w "%{http_code}" "${PROD}/index.html")
if [[ "$code" == "308" ]]; then
  ok "$code  /index.html"
else
  fail "$code  /index.html  (expected 308)"
fi

echo ""
echo "Query-param URL (expected 308 after stripping ?q=):"
code=$(curl -so /dev/null -w "%{http_code}" "${PROD}/faq?q=test")
if [[ "$code" == "308" ]]; then
  ok "$code  /faq?q=test"
else
  fail "$code  /faq?q=test  (expected 308 redirect with q removed)"
fi

echo ""
echo "robots.txt:"
if curl -s "${PROD}/robots.txt" | grep -q "Disallow: /\*?q="; then
  ok "Disallow: /*?q= present"
else
  fail "Disallow: /*?q= missing from robots.txt"
fi

echo ""
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
echo "Schema audit:"
about_ia=$(curl -s "${PROD}/about" | grep -c "InsuranceAgency" || true)
if [[ "$about_ia" -eq 0 ]]; then
  ok "About: InsuranceAgency absent"
else
  fail "About: InsuranceAgency present (should be absent)"
fi

services_ia=$(curl -s "${PROD}/services" | grep -c "InsuranceAgency" || true)
if [[ "$services_ia" -eq 0 ]]; then
  ok "Services: InsuranceAgency absent"
else
  fail "Services: InsuranceAgency present (should be absent)"
fi

home_ia=$(curl -s "${PROD}/" | grep -c "InsuranceAgency" || true)
if [[ "$home_ia" -ge 1 ]]; then
  ok "Homepage: InsuranceAgency present"
else
  fail "Homepage: InsuranceAgency missing"
fi

home_url=$(curl -s "${PROD}/" | grep -oE '"url":"https://originalinsurance\.net[^"]*"' | head -1 || true)
if echo "$home_url" | grep -qE '"url":"https://originalinsurance\.net/"'; then
  ok "Homepage InsuranceAgency url is homepage"
else
  fail "Homepage InsuranceAgency url is wrong: $home_url"
fi

echo ""
echo "Homepage city links (expected all 12):"
for city in downey bellflower cerritos commerce lakewood lynwood \
            montebello norwalk paramount pico-rivera south-gate whittier; do
  if curl -s "${PROD}/" | grep -q "/insurance/${city}"; then
    ok "$city"
  else
    fail "$city link missing from homepage"
  fi
done

echo ""
echo "No search_term_string pollution:"
for url in / /faq /about /services; do
  hits=$(curl -s "${PROD}${url}" | grep -c "search_term_string" || true)
  if [[ "$hits" -eq 0 ]]; then
    ok "0 hits on $url"
  else
    fail "$hits hit(s) on $url"
  fi
done

echo ""
echo "About page word count:"
about_words=$(curl -s "${PROD}/about" | sed 's/<[^>]*>/ /g' | wc -w)
if [[ "$about_words" -gt 800 ]]; then
  ok "~${about_words} words"
else
  fail "~${about_words} words, below target of 800"
fi

echo ""
echo "Sitemap lastmod:"
lastmods=$(curl -s "${PROD}/sitemap.xml" | grep -oE '<lastmod>[0-9-]+</lastmod>' | sort -u)
echo "  Found dates: $lastmods"
if echo "$lastmods" | grep -qE "202[56]-"; then
  ok "lastmod dates look recent"
else
  fail "lastmod dates look stale"
fi

echo ""
if [[ $FAILURES -eq 0 ]]; then
  echo "All live checks passed."
  exit 0
fi

echo "$FAILURES check(s) failed."
exit 1
