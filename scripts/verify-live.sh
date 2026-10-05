#!/usr/bin/env bash
# Live SEO/routing verification suite for originalinsurance.net.
# Usage: bash scripts/verify-live.sh

set -uo pipefail

PROD="https://originalinsurance.net"
FAILURES=0

ok() { echo "  OK  $*"; }
fail() { echo "  FAIL  $*" >&2; FAILURES=$((FAILURES + 1)); }

status_code() {
  curl -sS -o /dev/null -w "%{http_code}" --max-redirs 0 "$1" || true
}

redirect_location() {
  curl -sS -I --max-redirs 0 "$1" \
    | tr -d '\r' \
    | awk 'BEGIN { IGNORECASE=1 } /^location:/ { sub(/^[^:]+:[[:space:]]*/, ""); print; exit }'
}

echo ""
echo "--- Live verification: $PROD ---"
echo ""

echo "Sitemap discovery:"
sitemap="$(curl -fsS "$PROD/sitemap.xml" || true)"
if [[ "$sitemap" == *"<urlset"* ]]; then
  ok "sitemap.xml is accessible and looks like XML"
else
  fail "sitemap.xml is unavailable or malformed"
fi

mapfile -t canonical_urls < <(
  printf '%s' "$sitemap" \
    | grep -oE '<loc>[^<]+</loc>' \
    | sed -E 's#</?loc>##g'
)

if [[ ${#canonical_urls[@]} -eq 25 ]]; then
  ok "25 canonical URLs found"
else
  fail "Expected 25 canonical URLs, found ${#canonical_urls[@]}"
fi

city_count=$(printf '%s\n' "${canonical_urls[@]}" | grep -c '^https://originalinsurance\.net/insurance/' || true)
if [[ "$city_count" -eq 12 ]]; then
  ok "12 city pages found"
else
  fail "Expected 12 city pages, found $city_count"
fi

echo ""
echo "Canonical sitemap URLs (expected 200, prerendered HTML, self-canonical):"
for url in "${canonical_urls[@]}"; do
  path="${url#"$PROD"}"
  [[ -n "$path" ]] || path="/"

  if [[ "$url" != "$PROD"* || "$url" == *"?"* || "$url" == *"#"* ]]; then
    fail "$url is not a clean same-origin sitemap URL"
    continue
  fi
  if [[ "$path" != "/" && "$path" == */ ]]; then
    fail "$url has a non-canonical trailing slash"
    continue
  fi

  code="$(status_code "$url")"
  html="$(curl -fsS "$url" || true)"
  canonical_tag="$(
    printf '%s' "$html" \
      | grep -oEi "<link[^>]+rel=[\"']canonical[\"'][^>]*>|<link[^>]+href=[\"'][^\"']+[\"'][^>]+rel=[\"']canonical[\"'][^>]*>" \
      | head -1 || true
  )"
  canonical_count="$(
    printf '%s' "$html" \
      | grep -oEi "<link[^>]+rel=[\"']canonical[\"'][^>]*>|<link[^>]+href=[\"'][^\"']+[\"'][^>]+rel=[\"']canonical[\"'][^>]*>" \
      | wc -l
  )"

  if [[ "$code" != "200" ]]; then
    fail "$code  $path (expected 200)"
  elif [[ "$canonical_count" -ne 1 ]]; then
    fail "$path has $canonical_count canonical tags (expected 1)"
  elif [[ "$canonical_tag" != *"href=\"$url\""* && "$canonical_tag" != *"href='$url'"* ]]; then
    fail "$path canonical is wrong (expected $url)"
  elif [[ "$html" != *'<meta name="generator" content="Astro'* || "$html" != *'<main id="main-content"'* || "$html" != *"<h1"* ]]; then
    fail "$path is not serving the prerendered page output"
  elif printf '%s' "$html" | grep -Eqi "<meta[^>]+name=[\"']robots[\"'][^>]+content=[\"'][^\"']*noindex"; then
    fail "$path unexpectedly contains a noindex robots directive"
  else
    ok "$code  $path"
  fi
done

echo ""
echo "Trailing-slash variants (expected one 308 to clean canonical path):"
for url in "${canonical_urls[@]}"; do
  path="${url#"$PROD"}"
  [[ "$path" == "/" ]] && continue

  slash_path="$path/"
  code="$(status_code "$PROD$slash_path")"
  location="$(redirect_location "$PROD$slash_path")"
  if [[ "$code" == "308" && "$location" == "$path" ]]; then
    ok "$code  $slash_path -> $location"
  else
    fail "$code  $slash_path -> ${location:-<missing>} (expected 308 -> $path)"
  fi
done

echo ""
echo "Legacy and junk URLs:"
code="$(status_code "$PROD/index.html")"
location="$(redirect_location "$PROD/index.html")"
if [[ "$code" == "308" && "$location" == "/" ]]; then
  ok "$code  /index.html -> /"
else
  fail "$code  /index.html -> ${location:-<missing>} (expected 308 -> /)"
fi

code="$(status_code "$PROD/SITEMAP.XML")"
location="$(redirect_location "$PROD/SITEMAP.XML")"
if [[ "$code" == "308" && "$location" == "/sitemap.xml" ]]; then
  ok "$code  /SITEMAP.XML -> /sitemap.xml"
else
  fail "$code  /SITEMAP.XML -> ${location:-<missing>} (expected 308 -> /sitemap.xml)"
fi

gone_headers="$(curl -sS -I --max-redirs 0 "$PROD/cdn-cgi/l/email-protection" | tr -d '\r')"
gone_code="$(printf '%s\n' "$gone_headers" | awk '/^HTTP\// { print $2; exit }')"
if [[ "$gone_code" == "410" ]] && printf '%s\n' "$gone_headers" | grep -Eqi '^x-robots-tag:[[:space:]]*noindex, nofollow'; then
  ok "410  /cdn-cgi/l/email-protection with noindex, nofollow"
else
  fail "/cdn-cgi/l/email-protection must return 410 with X-Robots-Tag: noindex, nofollow"
fi

unknown_code="$(status_code "$PROD/missing-seo-test-url")"
if [[ "$unknown_code" == "404" ]]; then
  ok "404  /missing-seo-test-url"
else
  fail "$unknown_code  /missing-seo-test-url (expected a real 404)"
fi

echo ""
echo "Search query cleanup (expected final 200 at /faq with q removed):"
for path in '/faq?q=%7Bsearch_term_string%7D' '/faq/?q=%7Bsearch_term_string%7D'; do
  expected_first_location="/faq"
  expected_redirects=1
  if [[ "$path" == /faq/* ]]; then
    # Vercel canonicalizes the trailing slash first while preserving the query;
    # middleware then removes q on the second permanent redirect.
    expected_first_location="/faq?q=%7Bsearch_term_string%7D"
    expected_redirects=2
  fi
  first_code="$(status_code "$PROD$path")"
  first_location="$(redirect_location "$PROD$path")"
  result="$(curl -sS -L -o /dev/null -w '%{http_code}|%{url_effective}|%{num_redirects}' --max-redirs 5 "$PROD$path" || true)"
  IFS='|' read -r final_code final_url redirect_count <<< "$result"
  if [[ "$first_code" == "308" && "$first_location" == "$expected_first_location" && "$final_code" == "200" && "$final_url" == "$PROD/faq" && "$redirect_count" -eq "$expected_redirects" ]]; then
    ok "$path -> /faq ($redirect_count redirect(s))"
  else
    fail "$path first hop ${first_code:-<missing>} -> ${first_location:-<missing>}; final ${final_code:-<missing>} at ${final_url:-<missing>}"
  fi
done

echo ""
echo "robots.txt:"
robots="$(curl -fsS "$PROD/robots.txt" || true)"
if printf '%s\n' "$robots" | grep -Fq 'Disallow: /*?q='; then
  ok "Disallow: /*?q= present"
else
  fail "Disallow: /*?q= missing from robots.txt"
fi
if printf '%s\n' "$robots" | grep -Fq 'Sitemap: https://originalinsurance.net/sitemap.xml'; then
  ok "Canonical sitemap declaration present"
else
  fail "Canonical sitemap declaration missing from robots.txt"
fi

echo ""
echo "Security contact publication:"
security_txt="$(curl -fsS "$PROD/.well-known/security.txt" || true)"
security_code="$(status_code "$PROD/.well-known/security.txt")"
security_type="$(curl -sS -I --max-redirs 0 "$PROD/.well-known/security.txt" | tr -d '\r' | awk 'BEGIN { IGNORECASE=1 } /^content-type:/ { sub(/^[^:]+:[[:space:]]*/, ""); print; exit }')"
root_security_code="$(status_code "$PROD/security.txt")"
root_security_location="$(redirect_location "$PROD/security.txt")"
if [[ "$security_code" == "200" && "$security_type" == "text/plain; charset=utf-8" ]]; then ok "RFC security.txt returns 200 text/plain"; else fail "security.txt returned ${security_code:-<missing>} ${security_type:-<missing>}"; fi
if [[ "$security_txt" == *'Contact: mailto:originalinsurance@gmail.com'* && "$security_txt" == *'Canonical: https://originalinsurance.net/.well-known/security.txt'* && "$security_txt" == *'Expires:'* ]]; then ok "security.txt required fields present"; else fail "security.txt required fields missing"; fi
if [[ "$root_security_code" == "308" && "$root_security_location" == "/.well-known/security.txt" ]]; then ok "/security.txt redirects to RFC location"; else fail "/security.txt did not permanently redirect to RFC location"; fi

echo ""
echo "Schema audit:"
home_html="$(curl -sS "$PROD/")"
about_ia=$(curl -sS "$PROD/about" | grep -c "InsuranceAgency" || true)
services_ia=$(curl -sS "$PROD/services" | grep -c "InsuranceAgency" || true)
home_ia=$(printf '%s' "$home_html" | grep -c "InsuranceAgency" || true)
home_website=$(printf '%s' "$home_html" | grep -c '"@type":"WebSite"' || true)
home_search_action=$(printf '%s' "$home_html" | grep -c 'SearchAction\|search_term_string' || true)
if [[ "$about_ia" -eq 0 ]]; then ok "About: InsuranceAgency absent"; else fail "About: InsuranceAgency should be absent"; fi
if [[ "$services_ia" -eq 0 ]]; then ok "Services: InsuranceAgency absent"; else fail "Services: InsuranceAgency should be absent"; fi
if [[ "$home_ia" -ge 1 ]]; then ok "Homepage: InsuranceAgency present"; else fail "Homepage: InsuranceAgency missing"; fi
if [[ "$home_website" -ge 1 ]]; then ok "Homepage: WebSite identity present"; else fail "Homepage: WebSite identity missing"; fi
if [[ "$home_search_action" -eq 0 ]]; then ok "Homepage: no query-based SearchAction"; else fail "Homepage: SearchAction/query placeholder must be absent"; fi

echo ""
echo "Homepage preferred image:"
preferred_image="$PROD/images/ois-california-coverage-illustration-v2-2026.jpg"
preferred_headers="$(curl -sS -I --max-redirs 0 "$preferred_image" | tr -d '\r')"
preferred_code="$(printf '%s\n' "$preferred_headers" | awk '/^HTTP\// { print $2; exit }')"
preferred_type="$(printf '%s\n' "$preferred_headers" | awk 'BEGIN { IGNORECASE=1 } /^content-type:/ { sub(/^[^:]+:[[:space:]]*/, ""); print; exit }')"
if [[ "$preferred_code" == "200" && "$preferred_type" == "image/jpeg" ]]; then
  ok "Preferred image returns 200 image/jpeg"
else
  fail "Preferred image returned ${preferred_code:-<missing>} ${preferred_type:-<missing>}"
fi
if [[ "$home_html" == *"<meta property=\"og:image\" content=\"$preferred_image\""* ]]; then ok "Homepage og:image matches"; else fail "Homepage og:image is missing or incorrect"; fi
if [[ "$home_html" == *'"primaryImageOfPage"'* && "$home_html" == *"$preferred_image"* ]]; then ok "Homepage primaryImageOfPage matches"; else fail "Homepage primaryImageOfPage is missing or incorrect"; fi
if [[ "$home_html" == *'california-coverage-editorial-v2.'* ]]; then ok "Preferred image is visibly embedded"; else fail "Preferred image is not visibly embedded"; fi
if [[ "$sitemap" == *'<image:loc>https://originalinsurance.net/images/ois-california-coverage-illustration-v2-2026.jpg</image:loc>'* ]]; then ok "Preferred image is in sitemap"; else fail "Preferred image is missing from sitemap"; fi

echo ""
echo "Homepage city links (expected all 12):"
for city in downey bellflower cerritos commerce lakewood lynwood \
            montebello norwalk paramount pico-rivera south-gate whittier; do
  if [[ "$home_html" == *"/insurance/$city"* ]]; then
    ok "$city"
  else
    fail "$city link missing from homepage"
  fi
done

echo ""
echo "No search_term_string pollution in indexable source:"
for path in / /faq /about /services; do
  hits=$(curl -sS "$PROD$path" | grep -c "search_term_string" || true)
  if [[ "$hits" -eq 0 ]]; then ok "0 hits on $path"; else fail "$hits hit(s) on $path"; fi
done

echo ""
echo "Sitemap lastmod:"
lastmods=$(printf '%s' "$sitemap" | grep -oE '<lastmod>[0-9-]+</lastmod>' | sort -u)
echo "  Found dates: $lastmods"
if printf '%s' "$lastmods" | grep -qE '202[56]-'; then
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
