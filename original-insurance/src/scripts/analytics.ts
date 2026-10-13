import { citySlugs, intentRoutes } from '../intake/context';
const events = new Set([
  'contact_click',
  'quote_open',
  'contact_message_sent',
  'quote_start',
  'quote_coverage_selected',
  'quote_step_completed',
  'quote_submit',
  'phone_click',
  'text_click',
  'contact_submit',
  'directions_click',
  'carrier_section_interaction',
  'spanish_switch',
  'coverage_view',
]);
const types = new Set(['auto', 'home', 'commercial', 'motorcycle', 'rv', 'boat', 'life', 'other']);
const routes = new Set([
  '/',
  '/services',
  '/locations',
  '/about',
  '/contact',
  '/faq',
  '/es',
  '/insurance-markets',
  '/quote',
  ...Object.keys(intentRoutes),
  ...citySlugs.map((city) => '/insurance/' + city),
]);
/** An allowlist, never a generic event payload. No answers, names, VINs, URLs or query strings. */
export function trackAction(name: string, raw: Record<string, string | number> = {}) {
  if (!events.has(name)) return;
  const parameters: Record<string, string | number> = {
    source_page: routes.has(location.pathname) ? location.pathname : 'other',
  };
  if (typeof raw.coverage === 'string' && types.has(raw.coverage))
    parameters.coverage = raw.coverage;
  if (Number.isInteger(raw.step) && +raw.step >= 0 && +raw.step <= 30) parameters.step = +raw.step;
  if (['phone', 'text', 'email'].includes(String(raw.contact_method)))
    parameters.contact_method = raw.contact_method;
  if (['all', 'auto', 'property', 'commercial'].includes(String(raw.category)))
    parameters.category = raw.category;
  if (
    [
      'header',
      'hero',
      'content',
      'footer',
      'mobile',
      'explorer',
      'markets',
      'city',
      'spanish',
    ].includes(String(raw.placement))
  )
    parameters.placement = raw.placement;
  // Useful for QA and a future analytics adapter, with exactly the same safe payload.
  window.dispatchEvent(new CustomEvent('ois:conversion', { detail: { name, parameters } }));
  if (!/^(?:www\.)?originalinsurance\.net$/.test(location.hostname)) return;
  (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', name, parameters);
}
