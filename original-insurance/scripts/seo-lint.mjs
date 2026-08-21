/**
 * seo-lint.mjs — Static SEO analysis of source files.
 *
 * Catches common SEO bugs before they reach production:
 *   1. Trailing-slash internal links (to="/something/")
 *   2. LocalBusinessSchema on pages that should not have it
 *   3. InsuranceAgency url pointing to non-homepage on non-city pages
 *   4. Sitemap and homepage ServiceAreas city list mismatch
 *   5. Redirect rules in vercel.json that could preserve query-string and loop
 *   6. Any canonical URL with a trailing slash
 *   7. SearchAction/query-placeholder regressions and unsupported marketing claims
 *   8. Homepage preferred-image discovery signals
 *   9. RFC 9116 security.txt publication
 *
 * Usage:  node scripts/seo-lint.mjs
 * Or:     npm run seo-lint
 * Exit:   0 = pass, 1 = failures, 2 = warnings only
 */

import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { resolve, join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = resolve(__dirname, "..");
const SRC_DIR = join(APP_DIR, "src");
const PUBLIC_DIR = join(APP_DIR, "public");

let failures = 0;
let warnings = 0;

const fail = (msg) => { console.error(`  ✗ FAIL  ${msg}`); failures++; };
const warn = (msg) => { console.warn(`  ⚠ WARN  ${msg}`); warnings++; };
const ok   = (msg) => { console.log(`  ✓ ok    ${msg}`); };

// Pages that must NOT mount LocalBusinessSchema.
const NO_LOCAL_BUSINESS = new Set([
  "Faq.tsx", "About.tsx", "Contact.tsx", "Services.tsx",
  "Privacy.tsx", "Accessibility.tsx",
]);

// Pages that ARE allowed to mount LocalBusinessSchema.
// City pages and money pages are allowed. Homepage uses LocalBusinessSchema too.
// This list is the deny-list for wrong pages; everything else is allowed.

const HOMEPAGE = "https://originalinsurance.net/";

// Expected city slugs — must match sitemap AND homepage ServiceAreas.
const EXPECTED_CITIES = [
  "downey", "norwalk", "bellflower", "lynwood", "cerritos",
  "whittier", "lakewood", "paramount", "south-gate",
  "pico-rivera", "montebello", "commerce",
];

/**
 * Recursively collect all .tsx/.ts/.jsx files under a directory.
 */
function collectFiles(dir, exts = [".tsx", ".ts", ".jsx"]) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else if (exts.some(e => full.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

console.log("\n--- SEO lint (source analysis) ---\n");

const srcFiles = collectFiles(SRC_DIR);

// ── Check 1: Trailing-slash internal links ────────────────────────────────────
console.log("1. Trailing-slash internal links:");
let trailingSlashFound = false;
for (const f of srcFiles) {
  const content = readFileSync(f, "utf-8");
  const rel = relative(APP_DIR, f);
  // Match to="/something/" (not just to="/")
  const matches = [...content.matchAll(/\bto=["'](\/.+\/)["']/g)];
  for (const m of matches) {
    if (m[1] !== "/") {
      fail(`${rel}: trailing-slash link: to="${m[1]}"`);
      trailingSlashFound = true;
    }
  }
  // Match href="/something/" (hardcoded anchor)
  const hrefMatches = [...content.matchAll(/href=["'](\/.+\/)["']/g)];
  for (const m of hrefMatches) {
    if (m[1] !== "/" && !m[1].startsWith("//")) {
      fail(`${rel}: trailing-slash href: href="${m[1]}"`);
      trailingSlashFound = true;
    }
  }
}
if (!trailingSlashFound) ok("No trailing-slash internal links found");

// ── Check 2: LocalBusinessSchema on wrong pages ──────────────────────────────
console.log("\n2. LocalBusinessSchema on pages that should not have it:");
let wrongSchemaFound = false;
for (const f of srcFiles) {
  const filename = f.split(/[/\\]/).pop();
  if (!NO_LOCAL_BUSINESS.has(filename)) continue;
  const content = readFileSync(f, "utf-8");
  if (content.includes("LocalBusinessSchema")) {
    fail(`${relative(APP_DIR, f)}: has LocalBusinessSchema — forbidden on this page (see SKILL.md)`);
    wrongSchemaFound = true;
  }
}
if (!wrongSchemaFound) ok("LocalBusinessSchema not present on forbidden pages");

// ── Check 3: InsuranceAgency url on non-city/non-homepage pages ──────────────
console.log("\n3. InsuranceAgency url field (must be homepage on non-city pages):");
let badUrlFound = false;
const CITY_PAGE_PATTERN = /\/insurance\/[a-z-]+/;
for (const f of srcFiles) {
  const content = readFileSync(f, "utf-8");
  const rel = relative(APP_DIR, f);
  // Find LocalBusinessSchema with a url prop that isn't the homepage
  const localBusinessUrls = [...content.matchAll(/LocalBusinessSchema\s+url=["']([^"']+)["']/g)];
  for (const m of localBusinessUrls) {
    const url = m[1];
    if (url === HOMEPAGE || url === HOMEPAGE.slice(0, -1)) continue; // homepage OK
    if (CITY_PAGE_PATTERN.test(url)) continue; // city page URL OK
    fail(`${rel}: LocalBusinessSchema url="${url}" — should be homepage or city page URL`);
    badUrlFound = true;
  }
}
if (!badUrlFound) ok("All LocalBusinessSchema url fields are correct");

// ── Check 4: Sitemap vs homepage city list ───────────────────────────────────
console.log("\n4. Sitemap city list vs homepage ServiceAreas:");
const sitemapContent = readFileSync(join(PUBLIC_DIR, "sitemap.xml"), "utf-8");
const sitemapCities = [...sitemapContent.matchAll(/\/insurance\/([a-z-]+)/g)].map(m => m[1]);

const homeContent = readFileSync(join(SRC_DIR, "pages", "Home.tsx"), "utf-8");
const homeCities = [...homeContent.matchAll(/slug:\s*["']([a-z-]+)["']/g)].map(m => m[1])
  .filter(s => EXPECTED_CITIES.includes(s));

const sitemapSet = new Set(sitemapCities);
const homeSet = new Set(homeCities);

let cityMismatch = false;
for (const city of EXPECTED_CITIES) {
  if (!sitemapSet.has(city)) {
    fail(`City "${city}" missing from sitemap.xml`);
    cityMismatch = true;
  }
  if (!homeSet.has(city)) {
    warn(`City "${city}" missing from homepage ServiceAreas (slug list)`);
    cityMismatch = true;
  }
}
for (const city of sitemapCities) {
  if (!EXPECTED_CITIES.includes(city)) {
    warn(`Sitemap has unexpected city slug: "${city}"`);
    cityMismatch = true;
  }
}
if (!cityMismatch) ok(`All ${EXPECTED_CITIES.length} cities in sitemap and homepage`);

// ── Check 5: vercel.json redirect loop potential + trailingSlash ─────────────
console.log("\n5. vercel.json redirect rules (loop check + trailingSlash):");
const vercelJson = JSON.parse(readFileSync(join(APP_DIR, "vercel.json"), "utf-8"));

// This app prerenders routes as /route/index.html. Vercel's global
// trailingSlash:false can redirect /route/ -> /route while also making /route
// miss the prerendered directory file. Use explicit redirects for sitemap routes.
if (vercelJson.trailingSlash === false) {
  fail('vercel.json must not set "trailingSlash": false because this prerendered directory build returns 404 for clean canonical paths on Vercel.');
} else {
  ok('No global "trailingSlash": false setting is present');
}

if (vercelJson.cleanUrls === true) {
  fail('vercel.json must not set "cleanUrls": true for this prerendered directory build.');
} else {
  ok('No global "cleanUrls": true setting is present');
}

if (vercelJson.routes) {
  fail('vercel.json must not use legacy "routes" with redirects/rewrites/headers/cleanUrls/trailingSlash.');
} else {
  ok('No legacy "routes" block is present');
}

if (vercelJson.ignoreCommand !== "exit 0") {
  fail('vercel.json must set "ignoreCommand" to "exit 0" so automatic Git builds cannot replace prerendered production output.');
} else {
  ok('Automatic Vercel Git builds are disabled; production requires the prebuilt deploy pipeline');
}

const uppercaseSitemapRedirect = vercelJson.redirects?.some(rule =>
  rule.source === "/SITEMAP.XML" &&
  rule.destination === "/sitemap.xml" &&
  rule.permanent === true
);
if (!uppercaseSitemapRedirect) {
  fail('vercel.json must redirect "/SITEMAP.XML" to "/sitemap.xml" for the uppercase sitemap submitted in GSC.');
} else {
  ok('Uppercase sitemap URL redirects to the canonical lowercase sitemap');
}

const expectedRedirectPaths = [...sitemapContent.matchAll(/<loc>https:\/\/originalinsurance\.net(\/[^<]*)<\/loc>/g)]
  .map(match => match[1])
  .filter(path => path !== "/");

let missingSlashRedirect = false;
for (const path of expectedRedirectPaths) {
  const hasRedirect = vercelJson.redirects?.some(rule =>
    rule.source === `${path}/` &&
    rule.destination === path &&
    rule.permanent === true
  );
  if (!hasRedirect) {
    fail(`vercel.json missing canonical slash redirect: "${path}/" -> "${path}"`);
    missingSlashRedirect = true;
  }
}
if (!missingSlashRedirect) ok(`All ${expectedRedirectPaths.length} sitemap routes redirect trailing-slash variants to clean canonicals`);

const emailProtectionRewrite = vercelJson.rewrites?.some(rule =>
  rule.source === "/cdn-cgi/l/email-protection" &&
  rule.destination === "/api/gone"
);
if (!emailProtectionRewrite || !existsSync(join(APP_DIR, "api", "gone.js"))) {
  fail('vercel.json must route "/cdn-cgi/l/email-protection" to api/gone.js so the junk URL returns 410.');
} else {
  ok('Cloudflare email-protection junk URL is routed to a 410 response');
}

const static404Path = join(PUBLIC_DIR, "404.html");
if (!existsSync(static404Path)) {
  fail('public/404.html is required so unknown URLs return a real noindex 404 page on Vercel.');
} else {
  const static404 = readFileSync(static404Path, "utf-8");
  if (!static404.includes('name="robots"') || !static404.includes("noindex")) {
    fail('public/404.html must include a noindex robots meta tag.');
  } else {
    ok('Static 404.html exists and is noindex');
  }
}

const indexCatchAllRewrite = vercelJson.rewrites?.some(rule =>
  rule.source === "/(.*)" &&
  rule.destination === "/index.html"
);
if (indexCatchAllRewrite) {
  fail('vercel.json must not rewrite "/(.*)" to "/index.html"; it bypasses prerendered route HTML and makes unknown URLs return soft-404 200 responses.');
} else {
  ok('No catch-all index.html rewrite is present');
}

const middlewarePath = join(APP_DIR, "middleware.js");
if (!existsSync(middlewarePath)) {
  fail('middleware.js is required to strip "?q=" query URLs before the React app renders.');
} else {
  const middlewareContent = readFileSync(middlewarePath, "utf-8");
  if (
    !middlewareContent.includes('searchParams.has("q")') ||
    !middlewareContent.includes('searchParams.delete("q")') ||
    !middlewareContent.includes("Response.redirect")
  ) {
    fail('middleware.js must redirect URLs with a "q" search parameter after deleting that parameter.');
  } else {
    ok('Middleware strips "?q=" query URLs before the app renders');
  }
}

let loopFound = false;
if (vercelJson.redirects) {
  for (const rule of vercelJson.redirects) {
    const src = rule.source || "";
    const dst = rule.destination || "";
    // A redirect loops if destination matches source (including with query params preserved).
    // Vercel preserves query strings unless destination explicitly omits them.
    // Flag if source and destination are the same path (ignoring query string).
    const srcPath = src.split("?")[0];
    const dstPath = dst.split("?")[0];
    if (srcPath === dstPath) {
      fail(`vercel.json redirect loop: "${src}" -> "${dst}" — source and destination are the same path. Vercel will preserve query strings, creating an infinite loop.`);
      loopFound = true;
    }
    // Also flag if source has a `has` query matcher pointing to itself
    if (rule.has) {
      for (const h of rule.has) {
        if (h.type === "query" && srcPath === dstPath) {
          fail(`vercel.json redirect with query has-matcher loops: "${src}" (has ?${h.key}=) -> "${dst}"`);
          loopFound = true;
        }
      }
    }
  }
}
if (!loopFound) ok("No redirect loops detected in vercel.json");

// ── Check 6a: Lazy-loaded prerendered routes (causes CLS on hydrateRoot) ────────
// All routes listed in prerender.mjs ROUTES must NOT be wrapped in lazy() in App.tsx.
// lazy() + Suspense causes hydrateRoot to de-opt to the LoadingFallback fallback,
// replacing the prerendered DOM and causing a CLS spike Google detects.
console.log("\n6a. Lazy-loaded prerendered routes (must be eager):");
const appTsxPath = join(SRC_DIR, "..", "src", "App.tsx");
const prerenderMjsPath = join(APP_DIR, "scripts", "prerender.mjs");
let lazyPrerenderFound = false;
try {
  const appContent = readFileSync(appTsxPath, "utf-8");
  const prerenderContent = readFileSync(prerenderMjsPath, "utf-8");

  // Extract prerendered routes (non-dynamic ones) from prerender.mjs
  const prerenderRoutes = [...prerenderContent.matchAll(/["'](\/.+?)["']/g)]
    .map(m => m[1])
    .filter(r => r.startsWith("/") && !r.includes("{") && r !== "/");

  // Find all lazy() imports in App.tsx
  const lazyImports = [...appContent.matchAll(/const\s+(\w+)\s*=\s*lazy\s*\(/g)].map(m => m[1]);

  // Map component names to route patterns in App.tsx
  // If a lazy component is used in a Route for a prerendered path, flag it.
  for (const comp of lazyImports) {
    // Find the Route that uses this component
    const routeMatch = appContent.match(new RegExp(`path=["']([^"']+)["'][^>]*element=\\{<${comp}\\s*/?>\\}`));
    if (!routeMatch) continue;
    const routePath = routeMatch[1];
    // Check if this route path matches any prerendered route (exact or prefix for parameterized)
    const isPrerendered = prerenderRoutes.some(pr => pr === routePath || pr.startsWith(routePath.replace(/:.*/, "")));
    if (isPrerendered) {
      fail(`App.tsx: ${comp} is lazy()-loaded but its route "${routePath}" is prerendered — use an eager import to prevent hydrateRoot CLS`);
      lazyPrerenderFound = true;
    }
  }
} catch {
  warn("Could not read App.tsx or prerender.mjs for lazy-prerender check");
}
if (!lazyPrerenderFound) ok("No lazy-loaded prerendered routes found");

// ── Check 6: Trailing-slash canonical URLs ───────────────────────────────────
console.log("\n6. Trailing-slash in canonical URL declarations:");
let canonicalSlashFound = false;
for (const f of srcFiles) {
  const content = readFileSync(f, "utf-8");
  const rel = relative(APP_DIR, f);
  // Find canonical: "https://originalinsurance.net/..." with trailing slash
  const canonicalMatches = [...content.matchAll(/canonical[^"']*["']https:\/\/originalinsurance\.net(\/[^"']*\/)["']/g)];
  for (const m of canonicalMatches) {
    const path = m[1];
    if (path !== "/") {
      fail(`${rel}: canonical URL has trailing slash: "${m[0]}"`);
      canonicalSlashFound = true;
    }
  }
}
if (!canonicalSlashFound) ok("No trailing-slash canonical URLs found");

// ── Check 7: Search placeholder and people-first content safeguards ──────────
console.log("\n7. Search placeholders and people-first content safeguards:");
let contentGuardFailure = false;

const publicFiles = collectFiles(PUBLIC_DIR, [".html", ".xml", ".txt"]);
for (const f of [...srcFiles, ...publicFiles]) {
  const content = readFileSync(f, "utf-8");
  const rel = relative(APP_DIR, f);
  if (/search_term_string|"@type"\s*:\s*"SearchAction"/i.test(content)) {
    fail(`${rel}: search placeholder/SearchAction can recreate indexable ?q= URLs`);
    contentGuardFailure = true;
  }
  if (/FAQSchema/.test(content)) {
    fail(`${rel}: obsolete FAQSchema reference found; visible FAQ content must not use FAQPage markup`);
    contentGuardFailure = true;
  }
}

const pageFiles = collectFiles(join(SRC_DIR, "pages"), [".tsx", ".ts", ".jsx"]);
const unsupportedClaimPatterns = [
  { label: "fixed monthly insurance price range", regex: /\$\d[\d,]*(?:\s*[–-]\s*\$\d[\d,]*)?\s+per\s+month/i },
  { label: "unqualified same-day promise", regex: /same[- ]day/i },
  { label: "unqualified within-hours promise", regex: /within\s+hours/i },
  { label: "unsupported fastest superlative", regex: /\bfastest\b/i },
  { label: "unsupported trust superlative", regex: /trusted\s+broker|we\s+know\s+this\s+market/i },
  { label: "speculative neighborhood underwriting claim", regex: /underwriters?\s+(?:use|treat)|directly\s+influence|rate\s+profiles?|above\s+average\s+for\s+LA\s+County/i },
  { label: "unsupported lowest-price claim", regex: /lowest\s+possible|typically\s+costs/i },
];

for (const f of pageFiles) {
  const content = readFileSync(f, "utf-8");
  const rel = relative(APP_DIR, f);
  for (const { label, regex } of unsupportedClaimPatterns) {
    if (regex.test(content)) {
      fail(`${rel}: ${label}`);
      contentGuardFailure = true;
    }
  }
}

const websiteSchemaPath = join(SRC_DIR, "components", "seo", "WebSiteSchema.tsx");
const homePagePath = join(SRC_DIR, "pages", "Home.tsx");
if (!existsSync(websiteSchemaPath) || !readFileSync(homePagePath, "utf-8").includes("<WebSiteSchema />")) {
  fail("Homepage must mount WebSiteSchema for Google site-name identity");
  contentGuardFailure = true;
}

if (!contentGuardFailure) {
  ok("No SearchAction/query placeholders, obsolete FAQ schema, fixed price ranges, or unsupported timing/local-rate claims found");
}

// â”€â”€ Check 8: Homepage preferred-image signals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
console.log("\n8. Homepage preferred-image discovery signals:");
const preferredImage = "https://originalinsurance.net/images/ois-insurance-consultation-thumbnail-2026.jpg";
const indexHtml = readFileSync(join(APP_DIR, "index.html"), "utf-8");
const homeSource = readFileSync(homePagePath, "utf-8");
const homeSchemaPath = join(SRC_DIR, "components", "seo", "HomePageSchema.tsx");
const sitemapSource = readFileSync(join(PUBLIC_DIR, "sitemap.xml"), "utf-8");
let imageSignalFailure = false;

if (!indexHtml.includes(`<meta property="og:image" content="${preferredImage}"`)) {
  fail("Homepage og:image must point to the preferred consultation photo");
  imageSignalFailure = true;
}
if (!indexHtml.includes("max-image-preview:large")) {
  fail("Homepage must allow large image previews");
  imageSignalFailure = true;
}
if (!existsSync(homeSchemaPath) || !readFileSync(homeSchemaPath, "utf-8").includes("primaryImageOfPage") || !homeSource.includes("<HomePageSchema />")) {
  fail("Homepage must emit WebPage primaryImageOfPage schema");
  imageSignalFailure = true;
}
if (!homeSource.includes("images.home.searchThumbnail")) {
  fail("Homepage preferred image must be visibly embedded in an img element");
  imageSignalFailure = true;
}
if (!sitemapSource.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"') || !sitemapSource.includes(`<image:loc>${preferredImage}</image:loc>`)) {
  fail("Sitemap must expose the preferred homepage image");
  imageSignalFailure = true;
}
if (!imageSignalFailure) {
  ok("Preferred image is exposed through visible HTML, Open Graph, WebPage schema, and the image sitemap");
}

// â”€â”€ Check 9: security.txt publication â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
console.log("\n9. RFC 9116 security.txt publication:");
const securityTxtPath = join(PUBLIC_DIR, ".well-known", "security.txt");
const vercelConfigSource = readFileSync(join(APP_DIR, "vercel.json"), "utf-8");
let securityTxtFailure = false;

if (!existsSync(securityTxtPath)) {
  fail("public/.well-known/security.txt is missing");
  securityTxtFailure = true;
} else {
  const securityTxt = readFileSync(securityTxtPath, "utf-8");
  const expiresMatch = securityTxt.match(/^Expires:\s*(.+)$/mi);
  const expiresAt = expiresMatch ? Date.parse(expiresMatch[1].trim()) : Number.NaN;
  const maxExpiry = Date.now() + 366 * 24 * 60 * 60 * 1000;

  for (const requiredLine of [
    "Contact: mailto:originalinsurance@gmail.com",
    "Canonical: https://originalinsurance.net/.well-known/security.txt",
    "Preferred-Languages: en, es, ar",
  ]) {
    if (!securityTxt.includes(requiredLine)) {
      fail(`security.txt missing required field: ${requiredLine}`);
      securityTxtFailure = true;
    }
  }
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now() || expiresAt > maxExpiry) {
    fail("security.txt Expires must be valid, future-dated, and no more than one year away");
    securityTxtFailure = true;
  }
}
if (!vercelConfigSource.includes('"source": "/security.txt"') || !vercelConfigSource.includes('"destination": "/.well-known/security.txt"')) {
  fail("vercel.json must redirect /security.txt to the RFC location");
  securityTxtFailure = true;
}
if (!securityTxtFailure) {
  ok("security.txt has a public contact, canonical URL, languages, safe expiry, and root redirect");
}

// ── Summary ──────────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(50));
console.log(`  ${failures} failure(s), ${warnings} warning(s)`);
if (failures === 0 && warnings === 0) {
  console.log("  ✅ SEO lint passed — safe to deploy.\n");
  process.exit(0);
} else if (failures === 0) {
  console.log("  ⚠  SEO lint passed with warnings — review before deploying.\n");
  process.exit(2);
} else {
  console.log("  ❌ SEO lint FAILED — fix before deploying.\n");
  process.exit(1);
}
