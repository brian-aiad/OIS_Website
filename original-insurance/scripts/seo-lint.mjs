import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve(import.meta.dirname, '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const pages = JSON.parse(read('src/data/pages.json'));
const config = JSON.parse(read('vercel.json'));
const sitemap = read('public/sitemap.xml');
const origin = 'https://originalinsurance.net';
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expected = [
  '/',
  '/services',
  '/locations',
  '/about',
  '/contact',
  '/faq',
  '/privacy',
  '/accessibility',
  '/auto-insurance-downey-ca',
  '/home-insurance-downey-ca',
  '/sr22-insurance-downey',
  '/no-license-auto-insurance-downey',
  '/commercial-auto-insurance-downey',
  ...[
    'downey',
    'norwalk',
    'bellflower',
    'lynwood',
    'cerritos',
    'whittier',
    'lakewood',
    'paramount',
    'south-gate',
    'pico-rivera',
    'montebello',
    'commerce',
  ].map((c) => '/insurance/' + c),
];
assert.deepEqual(new Set(pages.map((p) => p.path)), new Set(expected), 'Route inventory changed');
assert.equal(pages.length, 25);
assert.equal(urls.length, 25);
assert.deepEqual(
  new Set(urls),
  new Set(expected.map((p) => origin + p)),
  'Sitemap and route manifest differ',
);
assert.equal(new Set(pages.map((p) => p.title)).size, 25, 'Duplicate titles');
assert.equal(new Set(pages.map((p) => p.description)).size, 25, 'Duplicate descriptions');
for (const page of pages) {
  assert.ok(page.title && page.description, 'Missing metadata: ' + page.path);
  assert.ok(page.path === '/' || !page.path.endsWith('/'), 'Trailing slash canonical');
  if (page.path !== '/')
    assert.ok(
      config.redirects.some(
        (r) => r.source === page.path + '/' && r.destination === page.path && r.permanent,
      ),
      'Missing redirect: ' + page.path,
    );
}
for (const [from, to] of [
  ['/index.html', '/'],
  ['/SITEMAP.XML', '/sitemap.xml'],
  ['/security.txt', '/.well-known/security.txt'],
])
  assert.ok(
    config.redirects.some((r) => r.source === from && r.destination === to && r.permanent),
    'Missing legacy redirect: ' + from,
  );
assert.equal(config.ignoreCommand, 'exit 0', 'Git deployments must remain disabled');
assert.equal(config.framework, 'astro');
assert.equal(config.outputDirectory, 'dist');
assert.ok(
  !config.cleanUrls && !('trailingSlash' in config) && !config.routes,
  'Unsafe global routing configuration',
);
assert.ok(
  !config.rewrites.some((r) => r.source === '/(.*)' && r.destination === '/index.html'),
  'Soft-404 rewrite',
);
assert.ok(
  config.rewrites.some(
    (r) => r.source === '/cdn-cgi/l/email-protection' && r.destination === '/api/gone',
  ),
);
for (const r of config.redirects)
  assert.notEqual(r.source.split('?')[0], r.destination.split('?')[0], 'Redirect loop');
const middleware = read('middleware.js');
assert.ok(
  middleware.includes('searchParams.delete("q")') &&
    middleware.includes('Response.redirect(url, 308)'),
  'Query cleanup missing',
);
assert.ok(read('api/gone.js').includes('status(410)'), 'Gone endpoint status');
assert.ok(read('public/robots.txt').includes('Disallow: /*?q='));
assert.ok(read('public/robots.txt').includes('Sitemap: ' + origin + '/sitemap.xml'));
const base = read('src/layouts/Base.astro');
assert.ok(
  base.includes('application/ld+json') &&
    base.includes('WebSite') &&
    base.includes('InsuranceAgency') &&
    base.includes('BreadcrumbList'),
  'Missing server-rendered schema',
);
assert.ok(base.includes('rel="canonical"') && base.includes('max-image-preview:large'));
assert.ok(read('src/pages/404.astro').includes('noindex'), '404 must be noindex');
assert.ok(
  read('src/pages/[...path].astro').includes('getStaticPaths'),
  'Routes must generate static HTML',
);
const files = [];
function walk(dir) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(astro|ts|json)$/.test(p)) files.push(p);
  }
}
walk(join(root, 'src'));
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  assert.ok(
    !/SearchAction|search_term_string|"@type"\s*:\s*"(?:FAQPage|Review|AggregateRating)"/.test(
      text,
    ),
    'Forbidden schema: ' + file,
  );
  assert.ok(
    !/client:(?:load|only)|ReactDOM|createRoot\(/.test(text),
    'Unexpected full-page client application: ' + file,
  );
  assert.ok(!/href=["']\/[^"']+\/["']/.test(text), 'Trailing slash internal link: ' + file);
}
const preferred = origin + '/images/ois-california-coverage-illustration-v2-2026.jpg';
assert.ok(sitemap.includes('<image:loc>' + preferred + '</image:loc>'));
assert.ok(
  existsSync(join(root, 'public/images/ois-california-coverage-illustration-v2-2026.jpg')) &&
    read('src/pages/index.astro').includes('california-coverage-editorial-v2.png'),
);
const security = read('public/.well-known/security.txt');
const expiry = Date.parse(security.match(/^Expires:\s*(.+)$/m)?.[1]);
assert.ok(expiry > Date.now() && expiry < Date.now() + 366 * 86400000, 'security.txt expiry');
assert.ok(security.includes('Contact: mailto:contact@originalinsurance.net'));
assert.ok(existsSync(join(root, '../.vercel/project.json')), 'Vercel project link missing');
console.log(
  'SEO source checks passed: all 25 routes, metadata, sitemap, static architecture, 24 slash redirects, legacy redirects, query cleanup, 410, 404, schema safeguards, images, and security.txt.',
);
