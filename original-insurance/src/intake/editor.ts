import {
  coverages,
  fieldKey,
  questionKinds,
  maxCustomQuestions,
  validateConfig,
  type FormConfig,
  type Section,
  type Field,
  type CustomQuestion,
} from './schema';
import { escape as e, icon } from './ui';

/** A small native dialog keeps unfinished wording separate from the publishable draft. */
export function editQuestion(
  config: FormConfig,
  type: string,
  section: Section,
  field: Field | undefined,
  done: () => void,
) {
  const original = field?.custom ? config.custom[type].find((q) => q.id === field.id) : undefined;
  const custom = !field || !!field.custom;
  const dialog = document.createElement('dialog');
  dialog.className = 'question-dialog';
  dialog.setAttribute('aria-labelledby', 'question-editor-title');
  dialog.innerHTML = `<form class="question-editor"><div class="question-editor-heading"><div><p class="eyebrow">${e(coverages.find((c) => c.id === type)!.label)} · ${e(section.label)}</p><h2 id="question-editor-title">${field ? 'Edit question' : 'Add a question'}</h2></div><button type="button" data-close aria-label="Close question editor">×</button></div><p class="editor-intro">${custom ? `Your question appears in this step${section.repeat ? ` for each ${section.repeat}` : ''}, in the customer's review, and in your email.` : 'Change the wording and help text. The answer format and validation stay connected to this standard question.'}</p><div class="field"><label for="question-label">Question wording</label><input id="question-label" required maxlength="120" value="${e(field?.label || '')}" placeholder="For example: Where do you usually park?" /></div><div class="field"><label for="question-hint">Help text <span class="optional">Optional</span></label><textarea id="question-hint" rows="2" maxlength="300" placeholder="A short explanation to help customers answer.">${e(field?.hint || '')}</textarea></div>${
    custom
      ? `<div class="field"><label for="question-kind">Answer type</label><select id="question-kind">${Object.entries(
          questionKinds,
        )
          .map(
            ([kind, label]) =>
              `<option value="${kind}" ${kind === (field?.kind || 'text') ? 'selected' : ''}>${label}</option>`,
          )
          .join(
            '',
          )}</select></div><div class="field" data-options ${field?.kind === 'select' ? '' : 'hidden'}><label for="question-options">Dropdown choices</label><textarea id="question-options" rows="4" placeholder="Garage\nDriveway\nStreet">${e(field?.options?.join('\n') || '')}</textarea><small>One choice per line. Add 2–12 unique choices.</small></div><label class="editor-required"><input id="question-required" type="checkbox" ${original?.required ? 'checked' : ''} /> Require an answer</label><p class="field-hint" data-checkbox-note ${field?.kind === 'checkbox' ? '' : 'hidden'}>A required checkbox must be checked to continue. Use a dropdown for a Yes / No question.</p>`
      : `<p class="standard-note">Standard question: ${e(
          coverages
            .find((c) => c.id === type)!
            .sections.find((s) => s.id === section.id)!
            .fields.find((f) => f.id === field!.id)!.label,
        )}. ${field?.fixed ? 'Always shown and required.' : 'Visibility and requirement are controlled in the question list.'}</p>`
  }<p class="error-banner" data-editor-error role="alert" hidden></p><div class="question-editor-actions">${!custom ? '<button type="button" class="text-button" data-reset>Restore original wording</button>' : '<span></span>'}<button class="secondary-button" type="button" data-close>Cancel</button><button class="primary-button" type="submit">${field ? 'Apply to draft' : 'Add to draft'} ${icon('check', 16)}</button></div><p class="fine-print">Then choose Save changes to update the customer form.</p></form>`;
  const restore = document.activeElement as HTMLElement | null;
  const close = () => {
    dialog.close();
    dialog.remove();
    if (restore?.isConnected) restore.focus();
  };
  dialog.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  dialog.addEventListener('cancel', (ev) => {
    ev.preventDefault();
    close();
  });
  dialog.querySelector('[data-reset]')?.addEventListener('click', () => {
    const base = coverages
      .find((c) => c.id === type)!
      .sections.find((s) => s.id === section.id)!
      .fields.find((f) => f.id === field!.id)!;
    dialog.querySelector<HTMLInputElement>('#question-label')!.value = base.label;
    dialog.querySelector<HTMLTextAreaElement>('#question-hint')!.value = base.hint || '';
  });
  dialog.querySelector<HTMLSelectElement>('#question-kind')?.addEventListener('change', (ev) => {
    const kind = (ev.target as HTMLSelectElement).value;
    dialog.querySelector<HTMLElement>('[data-options]')!.hidden = kind !== 'select';
    dialog.querySelector<HTMLElement>('[data-checkbox-note]')!.hidden = kind !== 'checkbox';
  });
  dialog.querySelector('form')!.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const draft = structuredClone(config);
    const copy = {
      label: dialog.querySelector<HTMLInputElement>('#question-label')!.value.trim(),
      hint: dialog.querySelector<HTMLTextAreaElement>('#question-hint')!.value.trim(),
    };
    try {
      if (custom) {
        if (!field && draft.custom[type].length >= maxCustomQuestions)
          throw new Error('You can add up to 10 custom questions per insurance type.');
        const kind = dialog.querySelector<HTMLSelectElement>('#question-kind')!.value;
        const q: CustomQuestion = {
          ...copy,
          id: field?.id || 'custom_' + crypto.randomUUID().replaceAll('-', '').slice(0, 16),
          section: section.id,
          kind,
          show: original?.show ?? true,
          required: dialog.querySelector<HTMLInputElement>('#question-required')!.checked,
        };
        if (q.required) q.show = true;
        if (kind === 'select')
          q.options = dialog
            .querySelector<HTMLTextAreaElement>('#question-options')!
            .value.split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
        const index = draft.custom[type].findIndex((q) => q.id === field?.id);
        if (index < 0) draft.custom[type].push(q);
        else draft.custom[type][index] = q;
      } else draft.wording[type][fieldKey(section, field!)] = copy;
      const validated = validateConfig(draft);
      config.wording = validated.wording;
      config.custom = validated.custom;
      close();
      done();
    } catch (err) {
      const box = dialog.querySelector<HTMLElement>('[data-editor-error]')!;
      box.hidden = false;
      box.textContent = (err as Error).message;
    }
  });
  document.body.append(dialog);
  dialog.showModal();
  dialog.querySelector<HTMLInputElement>('#question-label')!.focus();
}
