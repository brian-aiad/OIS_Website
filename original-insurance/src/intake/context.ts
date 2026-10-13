/** Public navigation context only. Never accept arbitrary URL text or customer identifiers. */
export const citySlugs = [
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
];
export const intentRoutes: Record<string, { type: string; need?: string }> = {
  '/auto-insurance-downey-ca': { type: 'auto' },
  '/home-insurance-downey-ca': { type: 'home' },
  '/commercial-auto-insurance-downey': { type: 'commercial' },
  '/sr22-insurance-downey': { type: 'auto', need: 'sr22' },
  '/no-license-auto-insurance-downey': { type: 'auto', need: 'license' },
};
export type QuoteContext = { need?: 'sr22' | 'license'; city?: string; language?: 'es' };
export function cleanContext(raw: unknown): QuoteContext {
  if (!raw || typeof raw !== 'object') return {};
  const r = raw as Record<string, unknown>;
  return {
    ...(r.need === 'sr22' || r.need === 'license' ? { need: r.need } : {}),
    ...(typeof r.city === 'string' && citySlugs.includes(r.city) ? { city: r.city } : {}),
    ...(r.language === 'es' ? { language: 'es' as const } : {}),
  };
}
export function quoteHref(path: string, language?: string) {
  const intent = intentRoutes[path];
  const city = path.startsWith('/insurance/') ? path.split('/').at(-1) : undefined;
  const q = new URLSearchParams();
  if (intent) {
    q.set('type', intent.type);
    if (intent.need) q.set('need', intent.need);
  } else if (city && citySlugs.includes(city)) q.set('type', 'auto');
  if (city && citySlugs.includes(city)) q.set('city', city);
  if (language === 'es') q.set('lang', 'es');
  return '/quote' + (q.size ? '?' + q.toString() : '');
}

/** Carry only public referral context in links, never in browser storage or customer answers. */
export function navigationContext(path: string, search = ''): QuoteContext {
  const query = new URLSearchParams(search);
  const from = path === '/es' ? query.get('from') || '' : '';
  const fromCity = from.startsWith('/insurance/') ? from.split('/').at(-1) : undefined;
  return cleanContext({
    city: path.startsWith('/insurance/') ? path.split('/').at(-1) : query.get('city') || fromCity,
    language: path === '/es' ? 'es' : query.get('lang'),
  });
}

export function contextHref(href: string, context: QuoteContext): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const url = new URL(href, 'https://originalinsurance.net');
  if (
    url.pathname === '/quote' ||
    intentRoutes[url.pathname] ||
    ['/services', '/insurance-markets', '/es'].includes(url.pathname)
  ) {
    const safe = cleanContext(context);
    if (safe.city) url.searchParams.set('city', safe.city);
    if (safe.language) url.searchParams.set('lang', safe.language);
  }
  return url.pathname + url.search + url.hash;
}

export function quoteLabel(path: string): string {
  const intent = intentRoutes[path];
  return intent?.need === 'sr22'
    ? 'Ask about SR-22'
    : intent?.need === 'license'
      ? 'Ask about license options'
      : intent?.type === 'auto'
        ? 'Get an auto quote'
        : intent?.type === 'home'
          ? 'Get a home quote'
          : intent?.type === 'commercial'
            ? 'Request commercial auto coverage'
            : 'Get a quote';
}
