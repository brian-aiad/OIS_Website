import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

const hostedSite =
  /^(?:www\.)?originalinsurance\.net$/.test(location.hostname) ||
  location.hostname.endsWith('.vercel.app');
if (import.meta.env.PROD && hostedSite) {
  inject();
  injectSpeedInsights();
}

import { trackAction } from './analytics';
import { intentRoutes, navigationContext, contextHref } from '../intake/context';
const referral = navigationContext(location.pathname, location.search);
document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((link) => {
  link.setAttribute('href', contextHref(link.getAttribute('href')!, referral));
});
if (intentRoutes[location.pathname])
  trackAction('coverage_view', { coverage: intentRoutes[location.pathname].type });
document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
  const scheme = link?.getAttribute('href')?.split(':')[0];
  if (scheme && ['tel', 'sms', 'mailto'].includes(scheme)) {
    if (scheme === 'tel' || scheme === 'sms')
      trackAction(scheme === 'tel' ? 'phone_click' : 'text_click');
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
  menuButton?.focus();
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

// Preserve anonymous quote-open analytics while keeping normal link navigation.
document.querySelectorAll('[data-quote]').forEach((link) =>
  link.addEventListener('click', () =>
    trackAction('quote_open', {
      placement: link.closest('header')
        ? 'header'
        : link.closest('footer')
          ? 'footer'
          : link.closest('.mobile-actions')
            ? 'mobile'
            : link.closest('[data-coverage-explorer]')
              ? 'explorer'
              : link.closest('[data-markets]')
                ? 'markets'
                : location.pathname === '/es'
                  ? 'spanish'
                  : location.pathname.startsWith('/insurance/')
                    ? 'city'
                    : link.closest('.home-hero,.page-hero')
                      ? 'hero'
                      : 'content',
    }),
  ),
);
window.addEventListener('openQuoteModal', () => {
  location.assign('/quote');
});
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
  const artSelector =
    '.page-hero-image,.broker-policy-art,.information-help-art,.guide-preparation-heading figure,.contact-quote-note figure,[data-motion="art"]';
  const targets = new Set<Element>(
    document.querySelectorAll(
      [
        '[data-reveal]',
        '[data-motion]',
        '.coverage-explorer',
        '.footer-opening',
        '.coverage-diagram',
        '.broker-steps > li',
        '.customer-stories-heading',
        '.original-story-heading',
        '.original-history-line > li',
        '.information-help',
        '.locations-prepare',
        '.locations-hours',
        '.locations-practical',
        '.contact-quote-note',
        '.guide-preparation',
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
    target.dataset.motionKind = el.matches(artSelector) ? 'art' : 'content';
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
    trackAction('contact_submit');
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

// A static set of linked coverage panels becomes a keyboard-operable tab interface.
document.querySelectorAll<HTMLElement>('[data-coverage-explorer]').forEach((explorer) => {
  const tablist = explorer.querySelector<HTMLElement>('.explorer-tabs')!;
  const tabs = [...explorer.querySelectorAll<HTMLButtonElement>('[data-coverage-tab]')];
  const panels = [...explorer.querySelectorAll<HTMLElement>('[data-coverage-panel]')];
  tablist.hidden = false;
  tablist.setAttribute('role', 'tablist');
  const mobileTabs = matchMedia('(max-width: 760px)');
  const orient = () =>
    tablist.setAttribute('aria-orientation', mobileTabs.matches ? 'horizontal' : 'vertical');
  orient();
  mobileTabs.addEventListener('change', orient);
  explorer.dataset.enhanced = '';
  const select = (index: number) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
      panels[i].hidden = i !== index;
      panels[i].classList.toggle('coverage-selected', i === index);
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', (event) => {
      let next: number;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
        next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });
  select(0);
});

// All market groups remain visible and indexable without JavaScript.
document.querySelectorAll<HTMLElement>('[data-markets]').forEach((section) => {
  const filters = section.querySelector<HTMLElement>('.market-filters');
  if (!filters) return;
  filters.hidden = false;
  const initial = section.dataset.marketDefault || 'all';
  filters
    .querySelectorAll<HTMLButtonElement>('[data-market]')
    .forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.market === initial)),
    );
  section.querySelectorAll<HTMLElement>('[data-market-group]').forEach((group) => {
    group.hidden = initial !== 'all' && group.dataset.marketGroup !== initial;
  });
  filters.querySelectorAll<HTMLButtonElement>('[data-market]').forEach((button) =>
    button.addEventListener('click', () => {
      filters
        .querySelectorAll('button')
        .forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      section.querySelectorAll<HTMLElement>('[data-market-group]').forEach((group) => {
        group.hidden =
          button.dataset.market !== 'all' && group.dataset.marketGroup !== button.dataset.market;
      });
      trackAction('carrier_section_interaction', { category: button.dataset.market! });
    }),
  );
});

document
  .querySelectorAll('[data-spanish]')
  .forEach((link) => link.addEventListener('click', () => trackAction('spanish_switch')));
document
  .querySelectorAll('a[href*="maps.google.com"], a[href*="google.com/maps"]')
  .forEach((link) => link.addEventListener('click', () => trackAction('directions_click')));

// Jump links open server-rendered guide chapters before moving focus.
function openGuideHash() {
  const id = location.hash.slice(1);
  if (!/^guide-\d+$/.test(id)) return;
  const chapter = document.getElementById(id);
  if (chapter instanceof HTMLDetailsElement) {
    chapter.open = true;
    chapter.scrollIntoView({ block: 'start' });
  }
}
window.addEventListener('hashchange', openGuideHash);
if (location.hash) openGuideHash();
const faqSearch = document.querySelector<HTMLInputElement>('#faq-search');
if (faqSearch) {
  faqSearch.closest<HTMLElement>('.faq-search')!.hidden = false;
  faqSearch.addEventListener('input', () => {
    const term = faqSearch.value.trim().toLocaleLowerCase();
    let count = 0;
    document.querySelectorAll<HTMLElement>('.information-group').forEach((group) => {
      let visible = 0;
      group.querySelectorAll<HTMLDetailsElement>('.faq-list > details').forEach((answer) => {
        const match = !term || answer.textContent!.toLocaleLowerCase().includes(term);
        answer.hidden = !match;
        if (match) {
          visible++;
          count++;
        }
      });
      group.hidden = !visible;
    });
    document.querySelector('#faq-search-status')!.textContent = term
      ? count
        ? `${count} matching answers. Choose a question to read more.`
        : 'No matching answers. Try a different word or call our team.'
      : '';
  });
}
