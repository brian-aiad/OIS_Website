import { agency } from './agency';
import logoUrl from '../assets/logo-badge.webp?url';
import {
  configuredCoverage,
  questionKinds,
  maxCustomQuestions,
  coverages,
  toggle,
  fieldKey,
  type CustomQuestion,
  type FormConfig,
} from './schema';
import { api, ApiError, escape as e, icon } from './ui';
import { editQuestion } from './editor';
let deletedQuestion: { type: string; index: number; question: CustomQuestion } | undefined;
const root = document.querySelector<HTMLElement>('#admin-root')!;
let config: FormConfig | undefined;
let saved = '';
let selected = 'auto';
let sectionIndex = 0;
let recipient = '';
let local = false;
let saving = false;
let shareType = '';
let mobilePreview = false;
let conflict = false;
let shareOpen = false;
const dirty = () => !!config && JSON.stringify(config) !== saved;
const brand = `<a class="brand" href="/" aria-label="${e(agency.name)} home"><img src="${logoUrl}" alt="" width="44" height="44" /><span>${e(agency.name)}<small>AGENCY WORKSPACE</small></span></a>`;
function toast(message: string, error = false) {
  const box = root.querySelector<HTMLElement>('[data-toast]');
  if (box) {
    box.textContent = message;
    box.className = `toast ${error ? 'toast-error' : ''}`;
    box.hidden = false;
  }
}
function login(message = '') {
  root.innerHTML = `<header class="intake-header">${brand}<a class="text-link" href="/">Back to website ↗</a></header><main id="main" class="login-layout"><div class="login-story"><p class="eyebrow">THE ORIGINAL WAY</p><h1>Less paperwork.<br /><em>More personal.</em></h1><p>A thoughtful first step for your customers.<br />A simpler workday for your team.</p><div class="login-illustration" aria-hidden="true"><div class="paper-back"></div><div class="paper-front"><span>${icon('shield', 38)}</span><strong>Good coverage<br />starts with<br /><em>good questions.</em></strong><div class="paper-rule"></div><small>${e(agency.legalName.toUpperCase())}</small></div></div></div><section class="login-card"><span class="step-emblem">${icon('lock', 24)}</span><p class="eyebrow">YOUR AGENCY WORKSPACE</p><h2>Welcome back.</h2><p>Sign in to make your quote form your own.</p><form><div class="field"><label for="password">Admin password</label><div class="password-wrap"><input id="password" name="password" type="password" autocomplete="current-password" required maxlength="256" /><button type="button" data-show aria-label="Show password">Show</button></div></div><p class="error-banner" data-login-error role="alert" ${message ? '' : 'hidden'}>${e(message)}</p><button class="primary-button" type="submit">Sign in ${icon('arrow', 18)}</button></form><p class="fine-print">For the ${e(agency.name)} team.<br />Need access? Contact your website administrator.</p></section></main>`;
  root.querySelector('[data-show]')!.addEventListener('click', (ev) => {
    const input = root.querySelector<HTMLInputElement>('#password')!;
    input.type = input.type === 'password' ? 'text' : 'password';
    const button = ev.currentTarget as HTMLButtonElement;
    button.textContent = input.type === 'password' ? 'Show' : 'Hide';
    button.setAttribute('aria-label', `${button.textContent} password`);
  });
  root.querySelector('form')!.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const button = root.querySelector<HTMLButtonElement>('[type="submit"]')!;
    button.disabled = true;
    button.textContent = 'Signing in…';
    try {
      await api('login', { password: root.querySelector<HTMLInputElement>('#password')!.value });
      await init();
    } catch (err) {
      const error = root.querySelector<HTMLElement>('[data-login-error]')!;
      error.hidden = false;
      error.textContent = (err as Error).message;
      button.disabled = false;
      button.textContent = 'Sign in →';
    }
  });
}
function preview() {
  const c = configuredCoverage(
    config!,
    coverages.find((c) => c.id === selected)!,
  );
  const section = c.sections[sectionIndex];
  const fields = section.fields.filter((f) => toggle(config!, c.id, section, f).show);
  return `<div class="preview-paper"><div class="preview-brand"><img src="${logoUrl}" alt="" width="28" height="28" /><span>${e(agency.name)}</span></div><div class="preview-progress"><span style="width:${((sectionIndex + 2) / (c.sections.length + 2)) * 100}%"></span></div><div class="preview-content">${!config!.enabled.includes(c.id) ? '<p class="notice">This insurance type is hidden from customers. These questions are a preview only.</p>' : ''}<span class="preview-tag">${icon(c.icon, 15)} ${c.label}</span><h3>${section.label}</h3><p>${section.repeat ? `Add each ${section.repeat} you’d like included.` : 'A few details. A more personal quote.'}</p>${fields.length ? fields.map((f) => `<div class="preview-field"><span>${e(f.label)}${toggle(config!, c.id, section, f).required ? ' <b>*</b>' : '<small>Optional</small>'}</span><div class="preview-input ${f.kind === 'textarea' ? 'preview-textarea' : ''}">${f.kind === 'checkbox' ? '□ Yes' : f.kind === 'vin' ? '17-character VIN <span>Find vehicle →</span>' : f.options ? 'Choose an option <span>⌄</span>' : '<span class="preview-placeholder"></span>'}</div>${section.id === 'policy' && ['carrier', 'expiry'].includes(f.id) && toggle(config!, c.id, section, section.fields[0]).show ? '<small class="conditional-preview">Shown when the customer has insurance.</small>' : ''}${f.hint ? `<small class="preview-help">${e(f.hint)}</small>` : ''}</div>`).join('') : '<p class="notice">This step is hidden because all its questions are off.</p>'}<div class="preview-continue">Continue ${icon('arrow', 15)}</div></div></div>`;
}
function quoteLink() {
  return location.origin + '/quote' + (shareType ? '?type=' + shareType : '');
}
function invitation() {
  return `Hi! Please complete this ${shareType ? coverages.find((c) => c.id === shareType)!.label.toLowerCase() + ' ' : ''}quote form so our team at ${agency.name} can help with your coverage: ${quoteLink()} If you have any questions, call ${agency.phone}.`;
}
function shareCard() {
  const enabled: string[] = saved ? JSON.parse(saved).enabled : config!.enabled;
  if (!enabled.includes(shareType)) shareType = '';
  return `<details class="share-card" data-share ${shareOpen ? 'open' : ''}><summary class="share-top"><span class="share-icon">${icon('link', 23)}</span><div><h2>Share your quote form</h2><p>Copy a customer link or a ready-to-send message.</p></div><span class="share-chevron">${icon('chevron', 18)}</span></summary><div class="share-controls"><label for="share-type">Link opens<select id="share-type"><option value="">All insurance types</option>${coverages
    .filter((c) => enabled.includes(c.id))
    .map(
      (c) => `<option value="${c.id}" ${shareType === c.id ? 'selected' : ''}>${c.label}</option>`,
    )
    .join(
      '',
    )}</select></label><div class="share-link-field"><span>Customer link</span><a class="share-url" href="${e(quoteLink())}" target="_blank" rel="noopener">${e(quoteLink())}</a></div><button class="secondary-button" data-copy>Copy link ${icon('link', 16)}</button></div><details class="invitation"><summary>Ready-to-send invitation ${icon('chevron', 15)}</summary><label class="sr-only" for="invitation">Message to your customer</label><textarea id="invitation" readonly rows="4">${e(invitation())}</textarea><button class="text-button" data-copy-message>Copy invitation ${icon('link', 15)}</button></details></details>`;
}
function render() {
  // Read the DOM synchronously: native toggle events can arrive after a select change.
  const previousShare = root.querySelector<HTMLDetailsElement>('[data-share]');
  if (previousShare) shareOpen = previousShare.open;
  const c = configuredCoverage(
    config!,
    coverages.find((c) => c.id === selected)!,
  );
  const section = c.sections[sectionIndex];
  const enabled = config!.enabled.includes(c.id);
  const counts = c.sections.map((s) => ({
    shown: s.fields.filter((f) => toggle(config!, c.id, s, f).show).length,
    required: s.fields.filter((f) => toggle(config!, c.id, s, f).required).length,
  }));
  const shown = counts.reduce((n, s) => n + s.shown, 0);
  const required = counts.reduce((n, s) => n + s.required, 0);
  root.innerHTML = `<div class="admin-shell"><aside class="admin-sidebar">${brand}<div class="workspace-label">WORKSPACE</div><a class="sidebar-active" href="/admin">${icon('sliders', 20)} Form studio</a><a class="sidebar-link" href="/quote" target="_blank" rel="noopener">${icon('external', 19)} Open quote form</a><div class="sidebar-bottom"><span class="agency-avatar">${e(agency.initials)}</span><div><strong>${e(agency.name)}</strong><small>${e(agency.location)}</small></div><button class="logout" data-logout aria-label="Sign out" title="Sign out">↪</button></div></aside><div class="admin-main"><header class="admin-topbar"><span>Workspace <span class="breadcrumb-divider">/</span> <strong>Form studio</strong></span><div class="save-controls"><button class="text-button discard-button" data-discard ${dirty() && !saving ? '' : 'disabled'}>Discard</button><span class="save-status" data-save-status>${dirty() ? 'Unsaved changes' : 'All changes saved'}</span><button class="primary-button compact" data-save ${dirty() && !saving ? '' : 'disabled'}>${saving ? 'Saving…' : 'Save changes'}</button></div></header><main id="main" class="studio"><div class="studio-heading"><div><p class="eyebrow">A BETTER FIRST CONVERSATION</p><h1>Your form. <em>Your way.</em></h1><p>Ask for what you need. Make the rest effortless.</p></div><span class="status-pill"><span></span>${config!.enabled.length} types available</span></div>${local ? '<div class="local-banner">Local preview · settings stay on this computer and submissions create test emails.</div>' : ''}${conflict ? '<div class="conflict-notice" role="alert"><div><strong>Newer changes were saved in another session.</strong><p>Your draft is still here. Load the saved version to continue editing.</p></div><button class="secondary-button" data-refresh>Load latest saved form</button></div>' : ''}${shareCard()}<div class="mobile-view-tabs" aria-label="Workspace view"><button data-mobile-view="edit" aria-pressed="${!mobilePreview}">${icon('sliders', 17)} Edit questions</button><button data-mobile-view="preview" aria-pressed="${mobilePreview}">${icon('eye', 17)} Preview form</button></div><div class="studio-grid ${mobilePreview ? 'preview-mode' : ''}"><div class="editor-column"><section class="editor-card"><div class="card-heading"><div><h2>Insurance types</h2><p>Choose a type to edit its questions.</p></div><span class="subtle-label">${config!.enabled.length} OF ${coverages.length} ON</span></div><div class="admin-coverage-grid">${coverages.map((t) => `<button class="type-tab ${t.id === selected ? 'selected' : ''}" data-type="${t.id}" aria-pressed="${t.id === selected}"><span>${icon(t.icon, 23)}</span><strong>${t.label}</strong><small><i class="type-dot ${config!.enabled.includes(t.id) ? 'on' : ''}"></i>${config!.enabled.includes(t.id) ? 'Available' : 'Hidden'}</small></button>`).join('')}</div></section><section class="editor-card question-card"><div class="card-heading"><div class="coverage-title"><span>${icon(c.icon, 24)}</span><div><h2>${c.label}</h2><p>Edit wording, choose what’s required, or add your own questions below.</p></div></div><label class="switch-label"><span>${enabled ? 'Enabled' : 'Disabled'}</span><input class="switch" type="checkbox" data-enabled aria-label="Enable ${c.label}" ${enabled ? 'checked' : ''} /></label></div><div class="form-outline"><span><strong>${counts.filter((s) => s.shown).length}</strong> question steps</span><span><strong>${shown}</strong> shown</span><span><strong>${required}</strong> required</span></div>${!enabled ? '<div class="notice">This insurance type is hidden from your quote form. You can still edit its questions.</div>' : ''}<div class="section-tabs" role="tablist" aria-label="Form steps">${c.sections.map((s, i) => `<button role="tab" id="tab-${s.id}" aria-selected="${i === sectionIndex}" aria-controls="question-panel" tabindex="${i === sectionIndex ? '0' : '-1'}" data-section="${i}">${s.label}<span class="tab-count">${counts[i].shown || 'Off'}</span></button>`).join('')}</div><div class="field-table" id="question-panel" role="tabpanel" aria-labelledby="tab-${section.id}"><div class="question-list-intro"><strong>Questions in this step</strong><button class="text-button" data-add-question ${config!.custom[selected].length >= maxCustomQuestions ? 'disabled' : ''}>+ Add custom question</button><p>${counts[sectionIndex].shown} shown · ${counts[sectionIndex].required} required${section.repeat ? ` · Asked for each ${section.repeat}` : ''}. Click a question to edit it.</p></div><div class="field-table-header"><span>QUESTION</span><span>SHOW</span><span>REQUIRED</span></div>${section.fields
    .map((f) => {
      const t = toggle(config!, c.id, section, f);
      return `${f.custom && section.fields.find((f) => f.custom)?.id === f.id ? '<div class="question-group-label">CUSTOM QUESTIONS</div>' : ''}<div class="field-row"><div class="question-description"><button class="question-edit" data-edit-question="${f.id}" aria-label="Edit question: ${e(f.label)}"><strong>${e(f.label)}</strong><span>Edit wording ↗</span></button><small>${f.custom ? `Custom · ${questionKinds[f.kind as keyof typeof questionKinds]}` : f.fixed ? 'Standard · Always required' : 'Standard question'}</small>${f.custom ? `<div class="custom-actions"><button data-move="${f.id}" data-direction="-1" aria-label="Move ${e(f.label)} up" ${section.fields.filter((f) => f.custom)[0].id === f.id ? 'disabled' : ''}>↑</button><button data-move="${f.id}" data-direction="1" aria-label="Move ${e(f.label)} down" ${section.fields.filter((f) => f.custom).at(-1)!.id === f.id ? 'disabled' : ''}>↓</button><button data-delete="${f.id}" aria-label="Remove question: ${e(f.label)}">Remove</button></div>` : ''}</div><label><span class="sr-only">Show ${e(f.label)}</span><input class="switch" type="checkbox" data-field="${f.id}" data-setting="show" ${t.show ? 'checked' : ''} ${f.fixed ? 'disabled' : ''} /></label><label><span class="sr-only">Require ${e(f.label)}</span><input class="require-checkbox" type="checkbox" data-field="${f.id}" data-setting="required" ${t.required ? 'checked' : ''} ${f.fixed || !t.show ? 'disabled' : ''} /></label></div>`;
    })
    .join(
      '',
    )}</div><div class="custom-question-footer"><div><strong>Your own questions</strong><p>${config!.custom[selected].length} of ${maxCustomQuestions} custom questions used for ${e(c.label.toLowerCase())}.</p></div><button class="secondary-button" data-add-question ${config!.custom[selected].length >= maxCustomQuestions ? 'disabled' : ''}>+ Add question</button></div>${deletedQuestion?.type === selected ? '<div class="undo-row">Question removed from draft.<button class="text-button" data-undo-question>Undo</button></div>' : ''}<div class="editor-footnote">${icon('lock', 14)} Essential questions stay on so every request is usable.</div></section><div class="delivery-note">${icon('shield', 21)}<div><strong>From their screen to your inbox.</strong><p>${local ? 'Local testing is active. No customer emails will be sent.' : `Completed requests go to ${e(recipient)}.`} No submissions dashboard to manage.</p></div></div></div><aside class="preview-column"><div class="preview-heading"><span class="eyebrow">LAYOUT PREVIEW</span><span class="preview-live"><i></i> ${dirty() ? 'Unsaved draft' : 'Saved form'}</span></div><label class="preview-step-picker" for="preview-step">Preview step<select id="preview-step">${c.sections.map((s, i) => `<option value="${i}" ${i === sectionIndex ? 'selected' : ''}>${s.label}${counts[i].shown ? '' : ' (hidden)'}</option>`).join('')}</select></label><div id="field-preview" aria-label="Preview of selected form step">${preview()}</div><p class="preview-caption">Layout only. Save changes, then use “Try the saved form” to test the full experience.</p><a class="text-link" href="/quote?type=${selected}" target="_blank" rel="noopener">Try the saved form ${icon('external', 14)}</a></aside></div><footer class="studio-footer">${e(agency.legalName)} <span>Made for a more personal kind of insurance.</span></footer></main></div></div><div class="toast" data-toast role="status" hidden></div>`;
  root.querySelector<HTMLDetailsElement>('[data-share]')!.addEventListener('toggle', (event) => {
    const details = event.currentTarget as HTMLDetailsElement;
    if (details.isConnected) shareOpen = details.open;
  });
  root.querySelector<HTMLSelectElement>('#preview-step')!.addEventListener('change', (event) => {
    sectionIndex = +(event.target as HTMLSelectElement).value;
    render();
    root.querySelector<HTMLElement>('#preview-step')?.focus();
  });
  root.querySelectorAll<HTMLElement>('[data-type]').forEach((b) =>
    b.addEventListener('click', () => {
      selected = b.dataset.type!;
      sectionIndex = 0;
      render();
      root.querySelector<HTMLElement>(`[data-type="${selected}"]`)?.focus();
    }),
  );
  root.querySelectorAll<HTMLElement>('[data-section]').forEach((b) => {
    b.addEventListener('click', () => {
      sectionIndex = +b.dataset.section!;
      render();
      root.querySelector<HTMLElement>(`[data-section="${sectionIndex}"]`)?.focus();
    });
    b.addEventListener('keydown', (ev) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) return;
      ev.preventDefault();
      sectionIndex =
        ev.key === 'Home'
          ? 0
          : ev.key === 'End'
            ? c.sections.length - 1
            : (sectionIndex + (ev.key === 'ArrowRight' ? 1 : -1) + c.sections.length) %
              c.sections.length;
      render();
      root.querySelector<HTMLElement>(`[data-section="${sectionIndex}"]`)?.focus();
    });
  });
  root.querySelector<HTMLInputElement>('[data-enabled]')!.addEventListener('change', (ev) => {
    const checked = (ev.target as HTMLInputElement).checked;
    if (!checked && config!.enabled.length === 1) {
      (ev.target as HTMLInputElement).checked = true;
      toast('Keep at least one insurance type enabled.', true);
      return;
    }
    config!.enabled = checked
      ? [...config!.enabled, selected]
      : config!.enabled.filter((id) => id !== selected);
    render();
    root.querySelector<HTMLElement>('[data-enabled]')?.focus();
  });
  root.querySelectorAll<HTMLInputElement>('[data-field]').forEach((input) =>
    input.addEventListener('change', () => {
      const f = section.fields.find((f) => f.id === input.dataset.field)!;
      const value = f.custom
        ? config!.custom[selected].find((q) => q.id === f.id)!
        : config!.fields[selected][fieldKey(section, f)];
      value[input.dataset.setting as 'show' | 'required'] = input.checked;
      if (!value.show) value.required = false;
      const selector = `[data-field="${f.id}"][data-setting="${input.dataset.setting}"]`;
      render();
      root.querySelector<HTMLElement>(selector)?.focus();
    }),
  );
  const afterEdit = (id?: string, sectionId?: string) => {
    if (sectionId) sectionIndex = c.sections.findIndex((s) => s.id === sectionId);
    render();
    if (id) root.querySelector<HTMLElement>(`[data-edit-question="${id}"]`)?.focus();
    toast('Draft updated. Save changes when you’re ready.');
  };
  root
    .querySelectorAll('[data-add-question]')
    .forEach((b) =>
      b.addEventListener('click', () =>
        editQuestion(config!, selected, section, undefined, afterEdit),
      ),
    );
  root.querySelectorAll<HTMLElement>('[data-edit-question]').forEach((b) =>
    b.addEventListener('click', () =>
      editQuestion(
        config!,
        selected,
        section,
        section.fields.find((f) => f.id === b.dataset.editQuestion),
        afterEdit,
      ),
    ),
  );
  root.querySelectorAll<HTMLElement>('[data-delete]').forEach((b) =>
    b.addEventListener('click', () => {
      const list = config!.custom[selected];
      const index = list.findIndex((q) => q.id === b.dataset.delete);
      deletedQuestion = { type: selected, index, question: list[index] };
      list.splice(index, 1);
      render();
    }),
  );
  root.querySelector('[data-undo-question]')?.addEventListener('click', () => {
    if (deletedQuestion && config!.custom[selected].length < maxCustomQuestions)
      config!.custom[selected].splice(deletedQuestion.index, 0, deletedQuestion.question);
    deletedQuestion = undefined;
    render();
  });
  root.querySelectorAll<HTMLElement>('[data-move]').forEach((b) =>
    b.addEventListener('click', () => {
      const list = config!.custom[selected];
      const siblings = list.filter((q) => q.section === section.id);
      const index = siblings.findIndex((q) => q.id === b.dataset.move);
      const other = siblings[index + Number(b.dataset.direction)];
      if (other) {
        const a = list.findIndex((q) => q.id === b.dataset.move),
          z = list.indexOf(other);
        [list[a], list[z]] = [list[z], list[a]];
        render();
      }
    }),
  );
  root.querySelector('[data-save]')!.addEventListener('click', save);
  root.querySelector('[data-discard]')?.addEventListener('click', () => {
    deletedQuestion = undefined;
    config = JSON.parse(saved);
    render();
    toast('Unsaved changes discarded.');
  });
  root.querySelector('[data-refresh]')?.addEventListener('click', async () => {
    try {
      const data = await api('config');
      config = data.config;
      saved = JSON.stringify(config);
      conflict = false;
      render();
      toast('Latest saved form loaded.');
    } catch (err) {
      toast((err as Error).message, true);
    }
  });
  root.querySelector<HTMLSelectElement>('#share-type')!.addEventListener('change', (event) => {
    shareType = (event.target as HTMLSelectElement).value;
    render();
    root.querySelector<HTMLElement>('#share-type')?.focus();
  });
  root.querySelector('[data-copy-message]')!.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(invitation());
      toast('Invitation copied. Paste it into your text message or email.');
    } catch {
      root.querySelector<HTMLTextAreaElement>('#invitation')?.select();
      toast('Select and copy the invitation above.', true);
    }
  });
  root.querySelectorAll<HTMLElement>('[data-mobile-view]').forEach((button) =>
    button.addEventListener('click', () => {
      mobilePreview = button.dataset.mobileView === 'preview';
      render();
      root
        .querySelector<HTMLElement>(`[data-mobile-view="${mobilePreview ? 'preview' : 'edit'}"]`)
        ?.focus({ preventScroll: true });
      root
        .querySelector('.mobile-view-tabs')
        ?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }),
  );

  root.querySelector('[data-copy]')!.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(quoteLink());
      toast('Quote link copied. Ready to share.');
    } catch {
      toast('Select and copy the quote link above.', true);
    }
  });
  root.querySelector('[data-logout]')!.addEventListener('click', async () => {
    if (dirty() && !confirm('Discard your unsaved changes and sign out?')) return;
    try {
      await api('logout', {});
      config = undefined;
      saved = '';
      login();
    } catch {
      toast('Couldn’t sign out. Please try again.', true);
    }
  });
}
async function save() {
  if (saving || !dirty()) return;
  saving = true;
  // Disable the entire editor during save so the returned version cannot erase newer edits.
  root
    .querySelectorAll<HTMLButtonElement | HTMLInputElement | HTMLSelectElement>(
      'button, input, select',
    )
    .forEach((el) => (el.disabled = true));
  root.querySelector('[data-save]')!.textContent = 'Saving…';
  try {
    const data = await api('save', { config });
    config = data.config;
    saved = JSON.stringify(config);
    deletedQuestion = undefined;
    conflict = false;
    saving = false;
    render();
    toast('Changes saved. Your quote form is up to date.');
  } catch (err) {
    saving = false;
    if (err instanceof ApiError && err.status === 401) {
      login('Your session expired. Sign in to keep editing your unsaved changes.');
      return;
    }
    if (err instanceof ApiError && err.status === 409) conflict = true;
    render();
    toast((err as Error).message, true);
  }
}
async function init() {
  try {
    const session = await api('session');
    local = session.local;
    recipient = session.recipient;
    if (!session.authenticated) {
      login();
      return;
    }
    if (!config) {
      config = (await api('config')).config;
      saved = JSON.stringify(config);
    }
    render();
  } catch (err) {
    login((err as Error).message);
  }
}
window.addEventListener('beforeunload', (ev) => {
  if (dirty()) ev.preventDefault();
});
void init();
