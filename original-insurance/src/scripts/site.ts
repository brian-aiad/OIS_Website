import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

const hostedSite =
  /^(?:www\.)?originalinsurance\.net$/.test(location.hostname) ||
  location.hostname.endsWith('.vercel.app');
if (import.meta.env.PROD && hostedSite) {
  inject();
  injectSpeedInsights();
}

// Measure next steps without sending phone numbers, email addresses, or form fields.
const trackAction = (name: string, parameters: Record<string, string> = {}) => {
  if (!/^(?:www\.)?originalinsurance\.net$/.test(location.hostname)) return;
  const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
  analytics.gtag?.('event', name, parameters);
};
document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
  const scheme = link?.getAttribute('href')?.split(':')[0];
  if (scheme && ['tel', 'sms', 'mailto'].includes(scheme)) {
    trackAction('contact_click', {
      contact_method: scheme === 'tel' ? 'phone' : scheme === 'sms' ? 'text' : 'email',
    });
  }
});

const menu = document.querySelector<HTMLDialogElement>('#mobile-nav');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
menuButton?.addEventListener('click', () => {
  menu?.showModal();
  menuButton.setAttribute('aria-expanded', 'true');
});
document.querySelector('[data-close-menu]')?.addEventListener('click', () => menu?.close());
menu?.addEventListener('close', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  if (!document.querySelector<HTMLDialogElement>('#quote-dialog')?.open) menuButton?.focus();
});
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.close()));

const dropdown = document.querySelector<HTMLDetailsElement>('.coverage-menu');
document.addEventListener('click', (event) => {
  if (dropdown?.open && !dropdown.contains(event.target as Node)) dropdown.open = false;
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && dropdown?.open) {
    dropdown.open = false;
    dropdown.querySelector('summary')?.focus();
  }
});

const quote = document.querySelector<HTMLDialogElement>('#quote-dialog');
const quoteFrame = quote?.querySelector<HTMLIFrameElement>('[data-quotzal-src]');
const quoteLoading = quote?.querySelector<HTMLElement>('[data-quote-loading]');
quoteFrame?.addEventListener('load', () => {
  if (!quoteFrame.hasAttribute('src')) return;
  if (quoteLoading) quoteLoading.hidden = true;
  quoteFrame.removeAttribute('aria-busy');
});
let quoteTrigger: HTMLElement | null = null;
const openQuote = () => {
  if (quoteFrame && !quoteFrame.hasAttribute('src')) {
    if (quoteLoading) quoteLoading.hidden = false;
    quoteFrame.setAttribute('aria-busy', 'true');
    quoteFrame.src = quoteFrame.dataset.quotzalSrc!;
  }
  quote?.showModal();
  trackAction('quote_open');
};
document.querySelectorAll<HTMLAnchorElement>('[data-quote]').forEach((link) =>
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || !quote) return;
    event.preventDefault();
    if (menu?.open) menu.close();
    quoteTrigger = menu?.contains(link) ? menuButton : link;
    openQuote();
  }),
);
window.addEventListener('openQuoteModal', openQuote);
document.querySelector('[data-close-quote]')?.addEventListener('click', () => quote?.close());
quote?.addEventListener('close', () => quoteTrigger?.focus());
document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dialog) =>
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }),
);

// Content is always visible. These finite arrivals enhance the first visit to a section.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionObserver: IntersectionObserver | undefined;
const setupMotion = () => {
  motionObserver?.disconnect();
  if (reducedMotion.matches) {
    document.querySelectorAll('.reveal-enter').forEach((el) => el.classList.remove('reveal-enter'));
    return;
  }
  if (!('IntersectionObserver' in window)) return;
  const motionGroups = [
    '.coverage-feature-grid > a',
    '.broker-steps > li',
    '.original-history-line > li',
    '.city-service-links > a',
    '.additional-services > article',
    '.service-related-options > a',
    '.coverage-directory > div',
    '.contact-channels > a',
  ];
  motionGroups.forEach((selector) =>
    document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
      el.style.setProperty('--motion-delay', `${Math.min(i % 4, 3) * 55}ms`);
    }),
  );
  document.querySelectorAll('.neighborhood-art').forEach((svg) => {
    svg.querySelector(':scope > g:last-of-type')?.classList.add('motion-neighborhood-car');
    svg.querySelector(':scope > path:last-child')?.classList.add('motion-neighborhood-car');
    svg
      .querySelectorAll('g[fill="#61715c"] > path')
      .forEach((palm) => palm.classList.add('motion-neighborhood-palms'));
  });
  const artSelector =
    '.page-hero-image,.broker-policy-art,.story-botanical,.information-help-art,.guide-preparation-heading figure,.contact-quote-note figure,[data-motion="art"]';
  const targets = new Set<Element>(
    document.querySelectorAll(
      [
        '[data-reveal]',
        '[data-motion]',
        '.section-heading',
        '.coverage-diagram',
        '.guide-chapter > h2',
        '.city-guide',
        '.additional-services article',
        '.broker-steps > li',
        '.neighborhood-scene',
        '.neighborhood-heading',
        '.customer-stories-heading',
        '.original-story-heading',
        '.original-history-line > li',
        '.information-group-heading',
        '.information-help',
        '.locations-prepare',
        '.locations-hours',
        '.locations-practical',
        '.contact-quote-note',
        '.contact-form-heading',
        '.guide-preparation',
        '.service-related-options > a',
        '.city-service-links > a',
        '.coverage-directory > div',
        artSelector,
      ].join(','),
    ),
  );
  motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-enter');
        motionObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -20px 0px' },
  );
  targets.forEach((el) => {
    const target = el as HTMLElement;
    target.dataset.motionKind = el.matches('.neighborhood-scene')
      ? 'scene'
      : el.matches(artSelector)
        ? 'art'
        : 'content';
    // Unobserving after entry keeps scrolling back through the page quiet.
    if (!el.classList.contains('reveal-enter')) motionObserver?.observe(el);
  });
};
setupMotion();
reducedMotion.addEventListener('change', setupMotion);

const form = document.querySelector<HTMLFormElement>('#contact-form');
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const status = document.querySelector<HTMLElement>('#form-status')!;
  if (button.disabled) return;
  const data = new FormData(form);
  if (data.get('botcheck')) return;
  button.disabled = true;
  button.textContent = 'Sending your message…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = '';
  status.removeAttribute('data-state');
  try {
    if (!data.get('access_key')) throw new Error('missing configuration');
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(data)),
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error('submission failed');
    trackAction('contact_message_sent');
    status.dataset.state = 'success';
    status.textContent =
      'Thank you. Your message has been received. Our team will follow up during office hours.';
    form.reset();
  } catch {
    status.dataset.state = 'error';
    status.textContent =
      'Your message could not be confirmed. Your details are still here—please try again, or call (310) 538-8666.';
  } finally {
    button.disabled = false;
    button.textContent = 'Send message';
    form.removeAttribute('aria-busy');
    status.focus();
  }
});

document
  .querySelector<HTMLButtonElement>('[data-copy-address]')
  ?.addEventListener('click', async (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const status = document.querySelector<HTMLElement>('#copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copyAddress ?? '');
      if (status) status.textContent = 'Address copied.';
    } catch {
      if (status)
        status.textContent = 'Could not copy. Select the address above to copy it manually.';
    }
  });

import './quote';
