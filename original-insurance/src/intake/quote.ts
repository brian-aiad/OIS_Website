import {
  coverages,
  visibleSections,
  toggle,
  fieldVisible,
  fieldError,
  type FormConfig,
  type Answers,
  type Field,
  type Section,
} from './schema';
import { agency } from './agency';
import { normalizeVin, validVin, vehicleLabel, type DecodedVehicle } from './vin';
import { api, ApiError, escape as e, icon } from './ui';

const root = document.querySelector<HTMLElement>('#quote-root')!;
const progress = document.querySelector<HTMLElement>('#quote-progress')!;
type Row = Record<string, string>;
type VinState = {
  loading?: boolean;
  message?: string;
  error?: boolean;
  vehicle?: DecodedVehicle;
  complete?: boolean;
};
const vinStates = new WeakMap<Row, VinState>();
const openRows = new WeakMap<Row, boolean>();
// In-memory only. Switching coverage and returning does not throw away work.
const drafts = new Map<string, Answers>();
let config: FormConfig;
let selected = '';
let step = 0;
let answers: Answers = {};
let local = false;
let busy = false;
let consent = false;
let requestId = crypto.randomUUID();
let sent = false;
let removed: { section: string; index: number; row: Row; links: string[] } | undefined;
const type = () => coverages.find((c) => c.id === selected)!;
const sections = () => (selected ? visibleSections(config, type()) : []);
const changed = () => {
  requestId = crypto.randomUUID();
};
const currentSection = () => sections()[step - 1];
function ensureAnswers() {
  for (const section of sections()) if (!answers[section.id]) answers[section.id] = [{}];
  if (answers.drivers?.length === 1)
    for (const vehicle of answers.vehicles || [])
      if (vehicle.driver === undefined) vehicle.driver = '0';
}
function setError(message: string) {
  const el = root.querySelector<HTMLElement>('[data-error]')!;
  el.textContent = message;
  el.hidden = false;
  el.focus();
}
function preserveFocus() {
  const active = document.activeElement as HTMLInputElement | null;
  const id = active?.id;
  const selection =
    active instanceof HTMLInputElement && ['text', 'tel', 'search'].includes(active.type)
      ? [active.selectionStart, active.selectionEnd]
      : null;
  render();
  const restored = id ? document.getElementById(id) : null;
  restored?.focus({ preventScroll: true });
  if (restored instanceof HTMLInputElement && selection?.[0] != null && selection[1] != null)
    restored.setSelectionRange(selection[0], selection[1]);
}
function fieldMarkup(s: Section, f: Field, index: number) {
  const row = answers[s.id][index];
  const t = toggle(config, selected, s, f);
  if (!fieldVisible(config, selected, s, f, row)) return '';
  const value = row[f.id] || '',
    id = `${s.id}-${index}-${f.id}`;
  let choices = f.options || [];
  if (
    f.id === 'method' &&
    !toggle(
      config,
      selected,
      s,
      s.fields.find((f) => f.id === 'phone')!,
    ).show
  )
    choices = ['Email'];
  const options =
    f.kind === 'driver'
      ? (answers.drivers || []).map((d, i) => ({
          value: String(i),
          label: d.name || `Driver ${i + 1}`,
        }))
      : choices.map((value) => ({ value, label: value }));
  const attr = `id="${id}" name="${id}" data-section="${s.id}" data-index="${index}" data-field="${f.id}" ${t.required ? 'required' : ''} aria-describedby="${id}-hint ${id}-error"`;
  const autocomplete =
    s.id === 'contact'
      ? (
          { name: 'name', email: 'email', phone: 'tel', zip: 'postal-code' } as Record<
            string,
            string
          >
        )[f.id]
      : s.id === 'property' && f.id === 'address'
        ? 'street-address'
        : undefined;
  const control =
    f.kind === 'checkbox'
      ? `<label class="answer-checkbox"><input ${attr} type="checkbox" ${value === 'Yes' ? 'checked' : ''} /><span>Yes</span></label>`
      : f.kind === 'select' || f.kind === 'driver'
        ? `<select ${attr}><option value="">Choose an option</option>${options.map((o) => `<option value="${e(o.value)}" ${value === o.value ? 'selected' : ''}>${e(o.label)}</option>`).join('')}</select>`
        : f.kind === 'textarea'
          ? `<textarea ${attr} rows="3" maxlength="2000">${e(value)}</textarea>`
          : `<input ${attr} type="${['email', 'tel', 'number', 'date'].includes(f.kind || '') ? f.kind : 'text'}" value="${e(value)}" ${autocomplete ? `autocomplete="${autocomplete}"` : 'autocomplete="off"'} maxlength="${f.kind === 'vin' ? 25 : 200}" ${f.kind === 'vin' ? 'autocapitalize="characters" spellcheck="false"' : ''} ${f.kind === 'zip' || f.kind === 'number' ? 'inputmode="numeric"' : ''} ${f.kind === 'number' ? `min="${f.min ?? 0}" max="${f.max ?? 1000000}" step="1"` : ''} ${f.id === 'dob' ? `min="1900-01-01" max="${new Date().toISOString().slice(0, 10)}"` : ''} />`;
  if (f.kind === 'vin') {
    const state = vinStates.get(row);
    return `<div class="field field-wide vin-field"><div class="vin-heading"><label for="${id}">${e(f.label)} <span class="vin-abbreviation">VIN</span>${t.required ? '<span class="required-mark">*</span>' : '<span class="optional">Optional</span>'}</label><p>Have the VIN? Let’s fill in the vehicle for you.</p></div><div class="vin-controls">${control}<button type="button" class="secondary-button" id="decode-${index}" data-decode="${index}" ${state?.loading ? 'disabled' : ''}>${state?.loading ? 'Finding vehicle…' : `Find vehicle ${icon('arrow', 16)}`}</button></div><small id="${id}-hint" class="field-hint">${e(f.hint || '')} Lookup sends the VIN to NHTSA. You can also enter details below.</small><small id="${id}-error" class="field-error"></small><div class="vin-result ${state?.error ? 'vin-error' : ''}" data-vin-result="${index}" role="status" ${state?.message ? '' : 'hidden'}>${state?.message ? e(state.message) : ''}${state?.vehicle ? `<button type="button" class="text-button" data-apply-vin="${index}">Use these details ${icon('check', 15)}</button>` : ''}</div></div>`;
  }
  return `<div class="field ${f.kind === 'textarea' || f.id === 'address' ? 'field-wide' : ''}"><label for="${id}">${e(f.label)}${t.required ? '<span class="required-mark" aria-hidden="true"> *</span>' : '<span class="optional">Optional</span>'}</label>${control}<small id="${id}-hint" class="field-hint">${e(f.hint || '')}</small><small id="${id}-error" class="field-error"></small></div>`;
}
function sectionMarkup(s: Section) {
  const rows = answers[s.id];
  const summary = (row: Row) => (s.id === 'vehicles' ? vehicleLabel(row) : row.name);
  const groups = rows
    .map((row, i) => {
      const fields = `<div class="field-grid">${s.fields.map((f) => fieldMarkup(s, f, i)).join('')}</div>`;
      if (!s.repeat) return `<section class="answer-group">${fields}</section>`;
      return `<details class="answer-group repeat-card" data-row="${i}" ${openRows.get(row) === false ? '' : 'open'}><summary><span class="repeat-badge">${icon(s.id === 'drivers' ? 'person' : type().icon, 21)}</span><span class="repeat-title"><strong>${s.repeat === 'driver' ? 'Driver' : 'Vehicle'} ${i + 1}</strong><small data-row-title="${i}">${e(summary(row) || `Add ${s.repeat} details`)}</small></span><span class="repeat-chevron">${icon('chevron', 18)}</span></summary><div class="repeat-body">${s.id === 'drivers' && i === 0 ? `<button class="self-driver" type="button" data-self>${icon('person', 16)} I’m the first driver <span>Use ${e(answers.contact?.[0]?.name || 'my name')}</span></button>` : ''}${fields}${i > 0 ? `<button class="remove-entry" type="button" data-remove="${i}">${icon('trash', 15)} Remove ${s.repeat} ${i + 1}</button>` : ''}</div></details>`;
    })
    .join('');
  return `${groups}${s.repeat && rows.length < 10 ? `<button class="add-entry" type="button" data-add>+ Add another ${s.repeat} <span>${rows.length} of 10 added</span></button>` : s.repeat ? '<p class="entry-limit" role="status">All 10 entries are added. For more, please call our office.</p>' : ''}${removed?.section === s.id ? `<div class="undo-row" role="status">${s.repeat === 'driver' ? 'Driver' : 'Vehicle'} removed.<button type="button" class="text-button" data-undo>Undo removal</button></div>` : ''}`;
}
function review() {
  const counts = [
    answers.drivers?.length
      ? `${answers.drivers.length} driver${answers.drivers.length > 1 ? 's' : ''}`
      : '',
    answers.vehicles?.length
      ? `${answers.vehicles.length} vehicle${answers.vehicles.length > 1 ? 's' : ''}`
      : '',
  ].filter(Boolean);
  return (
    `<div class="review-overview"><span>${icon(type().icon, 23)}</span><div><strong>${type().label}</strong><small>${counts.length ? counts.join(' · ') : 'Prepared for ' + e(agency.name)}</small></div><span class="review-ready">Ready to review</span></div>` +
    sections()
      .map(
        (s, i) =>
          `<section class="review-section"><div class="review-heading"><h3>${e(s.label)}</h3><button type="button" class="text-button" data-edit="${i + 1}">Edit<span class="sr-only"> ${e(s.label)}</span></button></div>${(
            answers[s.id] || []
          )
            .map(
              (row, j) =>
                `<div>${s.repeat ? `<h4>${s.repeat === 'driver' ? 'Driver' : 'Vehicle'} ${j + 1}${s.id === 'vehicles' && vehicleLabel(row) ? ` <span>· ${e(vehicleLabel(row))}</span>` : ''}</h4>` : ''}<dl>${
                  s.fields
                    .filter((f) => fieldVisible(config, selected, s, f, row) && row[f.id])
                    .map(
                      (f) =>
                        `<div><dt>${e(f.label)}</dt><dd>${e(f.kind === 'driver' ? answers.drivers?.[+row[f.id]]?.name || '' : row[f.id])}</dd></div>`,
                    )
                    .join('') || '<p class="muted">No additional details.</p>'
                }</dl></div>`,
            )
            .join('')}</section>`,
      )
      .join('')
  );
}
function showSuccess(reference: string, test: boolean) {
  sent = true;
  document.body.dataset.quoteStep = 'complete';
  progress.innerHTML = `<div class="progress-finished">${icon('check', 20)} Request ${test ? 'tested' : 'sent'}</div>`;
  root.innerHTML = `<div class="form-card success-card"><span class="success-seal">${icon('check', 36)}</span><p class="eyebrow">${test ? 'TEST REQUEST COMPLETE' : 'YOUR NEXT CHAPTER STARTS HERE'}</p><h2 tabindex="-1">${test ? 'Your preview is ready.' : 'You’re in good hands.'}</h2><p>${test ? 'A test email was saved locally. No email was sent to the agency.' : `Your request has been sent to ${e(agency.name)}. Our team will review your details and contact you about the next steps.`}</p><div class="success-summary"><span>${e(type().label)}</span><strong>${e(answers.contact[0].name)}</strong><small>Reference ${e(reference.slice(0, 8).toUpperCase())}</small></div><div class="next-steps"><strong>What happens next?</strong><p>Our team reviews your information, follows up on any questions, and helps you compare your coverage options.</p></div><a class="primary-button" href="/">Back to ${e(agency.name)} ${icon('arrow', 18)}</a><p class="fine-print">Need to add something? Call <a href="${agency.phoneHref}">${e(agency.phone)}</a>.</p></div>`;
  root.querySelector<HTMLElement>('h2')?.focus();
  answers = {};
  drafts.clear();
  removed = undefined;
}
function render(focus = false) {
  ensureAnswers();
  const steps = selected
    ? ['Coverage', ...sections().map((s) => s.label), 'Review & send']
    : ['Coverage', 'Your details', 'Review & send'];
  const last = step === steps.length - 1;
  const s = currentSection();
  document.body.dataset.quoteStep = step === 0 ? 'coverage' : last ? 'review' : 'details';
  progress.innerHTML = `<ol class="progress-list">${steps.map((label, i) => `<li class="${i === step ? 'current' : i < step ? 'complete' : ''}" ${i === step ? 'aria-current="step"' : ''}><span class="step-number">${i < step ? icon('check', 14) : i + 1}</span><span>${label}</span></li>`).join('')}</ol>`;
  root.removeAttribute('aria-busy');
  root.innerHTML = `${local ? '<div class="local-banner">Local preview · requests create test emails only.</div>' : ''}<div class="form-card"><div class="form-meta"><span>${selected ? e(type().label.toUpperCase()) : 'YOUR QUOTE REQUEST'}</span><span>Step ${step + 1} of ${steps.length}</span></div><div class="form-progress"><span style="width:${((step + 1) / steps.length) * 100}%"></span></div><form novalidate><div class="step-heading"><span class="step-emblem">${icon(step === 0 ? 'shield' : last ? 'check' : type().icon, 25)}</span><h2 tabindex="-1">${step === 0 ? 'What would you like to protect?' : last ? 'Everything look right?' : e(s.label)}</h2><p>${step === 0 ? 'Choose a starting point. We’ll take it from here.' : last ? 'Review your details, then send them to our team.' : s.repeat ? `Add each ${s.repeat} you’d like included in your quote.` : s.id === 'contact' ? 'So our team can get back to you with the next steps.' : 'A few details help us understand the coverage you need.'}</p></div><div data-error class="error-banner" role="alert" tabindex="-1" hidden></div>${
    step === 0
      ? `<div class="coverage-grid" role="radiogroup" aria-label="Insurance type">${coverages
          .filter((c) => config.enabled.includes(c.id))
          .map(
            (c) =>
              `<label class="coverage-option"><input type="radio" name="coverage" value="${c.id}" ${selected === c.id ? 'checked' : ''} /><span class="coverage-content"><span class="coverage-icon">${icon(c.icon, 29)}</span><strong>${c.label}</strong><small>${c.short}</small><span class="selection-dot">${icon('check', 11)}</span></span></label>`,
          )
          .join('')}</div>`
      : last
        ? `${review()}<label class="consent"><input type="checkbox" name="consent" ${consent ? 'checked' : ''} /><span>I agree that ${e(agency.name)} may contact me about this request. I’ve read the <a href="/privacy" target="_blank" rel="noopener">privacy notice</a>.</span></label><p class="fine-print">This is a request for a quote, not a purchase. Coverage starts only after confirmation from your insurance provider.</p><div class="honeypot" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off" /></label></div>`
        : sectionMarkup(s)
  }<div class="form-actions">${step > 0 ? '<button class="secondary-button" type="button" data-back>← Back</button>' : '<span class="form-reassurance">No obligation.<br />Just possibilities.</span>'}<button class="primary-button" type="submit">${last ? 'Send quote request' : 'Continue'} ${icon('arrow', 18)}</button></div></form></div>`;
  wire();
  if (focus) {
    root.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    if (window.innerWidth < 900) root.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}
function navigate(next: number) {
  step = next;
  removed = undefined;
  render(true);
}
function applyVehicle(row: Row, vehicle: DecodedVehicle, complete: boolean) {
  for (const field of ['year', 'make', 'model'] as const)
    if (vehicle[field]) row[field] = vehicle[field];
  changed();
  vinStates.set(row, {
    message: complete
      ? `${vehicleLabel(vehicle)} — details filled. Please confirm them below.`
      : 'We found some details. Please fill in anything missing below.',
  });
}
async function findVehicle(index: number) {
  const row = answers.vehicles[index];
  const vin = normalizeVin(row.vin || '');
  row.vin = vin;
  if (!validVin(vin)) {
    vinStates.set(row, {
      error: true,
      message: 'Enter a 17-character VIN with no I, O, or Q, or fill in the vehicle details below.',
    });
    preserveFocus();
    return;
  }
  const state: VinState = { loading: true, message: 'Looking up your vehicle…' };
  vinStates.set(row, state);
  preserveFocus();
  try {
    const result = await api('decode-vin', { vin });
    if (
      vinStates.get(row) !== state ||
      !answers.vehicles?.includes(row) ||
      normalizeVin(row.vin) !== vin ||
      currentSection()?.id !== 'vehicles' ||
      sent
    ) {
      if (vinStates.get(row) === state) vinStates.delete(row);
      return;
    }
    const vehicle = result.vehicle as DecodedVehicle;
    if (
      ['year', 'make', 'model'].some(
        (key) =>
          row[key] &&
          vehicle[key as keyof DecodedVehicle] &&
          row[key].toLowerCase() !== vehicle[key as keyof DecodedVehicle].toLowerCase(),
      )
    )
      vinStates.set(row, {
        vehicle,
        complete: result.complete,
        message: `Found ${vehicleLabel(vehicle)}. Use these details to replace the vehicle information you entered?`,
      });
    else applyVehicle(row, vehicle, result.complete);
    preserveFocus();
  } catch (error) {
    if (vinStates.get(row) !== state || !answers.vehicles?.includes(row)) return;
    vinStates.set(row, { error: true, message: (error as Error).message });
    if (currentSection()?.id === 'vehicles') preserveFocus();
  }
}
function validateStep() {
  const section = currentSection();
  if (!section) return true;
  let first: HTMLElement | undefined;
  root
    .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-field]')
    .forEach((el) => {
      const f = section.fields.find((f) => f.id === el.dataset.field)!;
      let message = fieldError(
        f,
        el instanceof HTMLInputElement && el.type === 'checkbox'
          ? el.checked
            ? 'Yes'
            : 'No'
          : el.value.trim(),
        el.required,
      );
      if (
        !message &&
        f.kind === 'vin' &&
        el.value &&
        answers.vehicles.filter((v) => normalizeVin(v.vin || '') === normalizeVin(el.value))
          .length > 1
      )
        message =
          'This VIN is already listed. Enter a different VIN or remove the duplicate vehicle.';
      if (
        !message &&
        f.id === 'phone' &&
        ['Phone call', 'Text message'].includes(answers.contact[0].method || '') &&
        !el.value.trim()
      )
        message = 'Enter a phone number for your preferred contact method.';
      el.setAttribute('aria-invalid', message ? 'true' : 'false');
      document.getElementById(el.id + '-error')!.textContent = message || '';
      if (message && !first) first = el;
    });
  if (first) {
    const details = first.closest('details');
    if (details) {
      details.open = true;
      openRows.set(answers[section.id][+(details.dataset.row || 0)], true);
    }
    first.focus();
    return false;
  }
  return true;
}
async function submit(form: HTMLFormElement) {
  if (busy) return;
  if (step === 0 && !selected) return setError('Choose the type of insurance you need.');
  if (!validateStep()) return;
  if (step < sections().length + 1) return navigate(step + 1);
  if (!consent) return setError('Please agree to be contacted about your quote request.');
  busy = true;
  const button = root.querySelector<HTMLButtonElement>('[type="submit"]')!;
  button.textContent = 'Sending your request…';
  form
    .querySelectorAll<HTMLButtonElement | HTMLInputElement>('button, input')
    .forEach((b) => (b.disabled = true));
  try {
    const result = await api('submit', {
      type: selected,
      version: config.version,
      answers,
      consent,
      id: requestId,
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
    });
    showSuccess(result.reference, result.local);
  } catch (err) {
    if (err instanceof ApiError && err.status === 409) {
      try {
        config = (await api('config')).config;
        if (!config.enabled.includes(selected)) {
          drafts.set(selected, answers);
          selected = '';
          answers = {};
        }
        step = selected ? 1 : 0;
        render(true);
      } catch {
        /* Keep answers if settings cannot be loaded. */
      }
    }
    setError((err as Error).message);
    form
      .querySelectorAll<HTMLButtonElement | HTMLInputElement>('button, input')
      .forEach((b) => (b.disabled = false));
    button.textContent = 'Send quote request';
  } finally {
    busy = false;
  }
}
function wire() {
  const form = root.querySelector('form')!;
  const section = currentSection();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void submit(form);
  });
  form.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.dataset.field) {
      const row = answers[input.dataset.section!][+input.dataset.index!];
      if (input.dataset.field === 'vin') {
        input.value = normalizeVin(input.value);
        vinStates.delete(row);
        const status = root.querySelector<HTMLElement>(
          `[data-vin-result="${input.dataset.index}"]`,
        );
        if (status) status.hidden = true;
        const button = root.querySelector<HTMLButtonElement>(
          `[data-decode="${input.dataset.index}"]`,
        );
        if (button) {
          button.disabled = false;
          button.innerHTML = `Find vehicle ${icon('arrow', 16)}`;
        }
      }
      row[input.dataset.field] =
        input instanceof HTMLInputElement && input.type === 'checkbox'
          ? input.checked
            ? 'Yes'
            : 'No'
          : input.value;
      changed();
      const title = root.querySelector<HTMLElement>(`[data-row-title="${input.dataset.index}"]`);
      if (title && section?.repeat)
        title.textContent =
          (section.id === 'vehicles' ? vehicleLabel(row) : row.name) ||
          `Add ${section.repeat} details`;
      if (input.getAttribute('aria-invalid') === 'true') {
        input.removeAttribute('aria-invalid');
        document.getElementById(input.id + '-error')!.textContent = '';
      }
    }
    if (input.name === 'consent') consent = input.checked;
  });
  form.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.name === 'coverage' && selected !== input.value) {
      if (selected) drafts.set(selected, answers);
      const contact = answers.contact;
      selected = input.value;
      answers = drafts.get(selected) || (contact ? { contact: structuredClone(contact) } : {});
      consent = false;
      changed();
      render();
      root.querySelector<HTMLInputElement>(`input[value="${selected}"]`)?.focus();
    }
    if (input.dataset.field === 'insured') preserveFocus();
  });
  root.querySelector('[data-back]')?.addEventListener('click', () => navigate(step - 1));
  root
    .querySelectorAll<HTMLElement>('[data-edit]')
    .forEach((b) => b.addEventListener('click', () => navigate(+b.dataset.edit!)));
  root.querySelectorAll<HTMLDetailsElement>('[data-row]').forEach((details) => {
    const row = answers[section.id][+details.dataset.row!];
    details.addEventListener('toggle', () => {
      if (details.isConnected) openRows.set(row, details.open);
    });
  });
  root.querySelector('[data-self]')?.addEventListener('click', () => {
    const row = answers.drivers[0];
    row.name = answers.contact[0].name;
    if (
      section.fields.some(
        (f) => f.id === 'relationship' && toggle(config, selected, section, f).show,
      )
    )
      row.relationship = 'Self';
    changed();
    render();
    root.querySelector<HTMLInputElement>('#drivers-0-name')?.focus();
  });
  root.querySelector('[data-add]')?.addEventListener('click', () => {
    for (const row of answers[section.id]) openRows.set(row, false);
    const row: Row =
      section.id === 'vehicles' && answers.drivers?.length === 1 ? { driver: '0' } : {};
    answers[section.id].push(row);
    openRows.set(row, true);
    removed = undefined;
    changed();
    render();
    root
      .querySelector<HTMLInputElement>(
        `#${section.id}-${answers[section.id].length - 1}-${section.fields.find((f) => toggle(config, selected, section, f).show)!.id}`,
      )
      ?.focus();
  });
  root.querySelectorAll<HTMLElement>('[data-remove]').forEach((button) =>
    button.addEventListener('click', () => {
      const index = +button.dataset.remove!;
      removed = {
        section: section.id,
        index,
        row: answers[section.id][index],
        links: (answers.vehicles || []).map((v) => v.driver || ''),
      };
      answers[section.id].splice(index, 1);
      if (section.id === 'drivers')
        for (const vehicle of answers.vehicles || [])
          if (vehicle.driver) {
            if (+vehicle.driver === index) vehicle.driver = '';
            else if (+vehicle.driver > index) vehicle.driver = String(+vehicle.driver - 1);
          }
      changed();
      render();
      root.querySelector<HTMLElement>('[data-undo]')?.focus();
    }),
  );
  root.querySelector('[data-undo]')?.addEventListener('click', () => {
    if (!removed || removed.section !== section.id || answers[section.id].length >= 10) return;
    answers[section.id].splice(removed.index, 0, removed.row);
    openRows.set(removed.row, true);
    if (section.id === 'drivers')
      answers.vehicles?.forEach((vehicle, i) => {
        vehicle.driver = removed!.links[i];
      });
    removed = undefined;
    changed();
    render();
  });
  root
    .querySelectorAll<HTMLElement>('[data-decode]')
    .forEach((b) => b.addEventListener('click', () => void findVehicle(+b.dataset.decode!)));
  root.querySelectorAll<HTMLElement>('[data-apply-vin]').forEach((b) =>
    b.addEventListener('click', () => {
      const row = answers.vehicles[+b.dataset.applyVin!],
        state = vinStates.get(row);
      if (!state?.vehicle || normalizeVin(row.vin) !== state.vehicle.vin) return;
      applyVehicle(row, state.vehicle, !!state.complete);
      preserveFocus();
    }),
  );
}
async function init() {
  try {
    const data = await api('config');
    config = data.config;
    local = data.local;
    const preset = new URLSearchParams(location.search).get('type');
    if (preset && config.enabled.includes(preset)) selected = preset;
    render();
  } catch (err) {
    root.removeAttribute('aria-busy');
    root.innerHTML = `<div class="form-card"><h2>Let’s get you some help.</h2><p class="error-banner" role="alert">${e((err as Error).message)}</p><button class="primary-button" data-retry>Try again</button><p>Or call <a href="${agency.phoneHref}">${e(agency.phone)}</a>.</p></div>`;
    root.querySelector('[data-retry]')?.addEventListener('click', init);
  }
}
window.addEventListener('beforeunload', (event) => {
  if (
    !sent &&
    Object.values(answers).some((rows) => rows.some((row) => Object.values(row).some(Boolean)))
  )
    event.preventDefault();
});
void init();
