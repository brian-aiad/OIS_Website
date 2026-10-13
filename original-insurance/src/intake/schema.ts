import { normalizeVin } from './vin';

/** The same field catalog drives the editor, customer form and server validation. */
export type Field = {
  id: string;
  label: string;
  kind?: string;
  options?: string[];
  fixed?: boolean;
  required?: boolean;
  hint?: string;
  min?: number;
  max?: number;
  custom?: boolean;
};
export type Section = { id: string; label: string; repeat?: string; fields: Field[] };
export type Coverage = {
  id: string;
  label: string;
  short: string;
  icon: string;
  sections: Section[];
};
const contact: Section = {
  id: 'contact',
  label: 'About you',
  fields: [
    { id: 'name', label: 'Full name', fixed: true, required: true },
    { id: 'email', label: 'Email address', kind: 'email', fixed: true, required: true },
    { id: 'phone', label: 'Phone number', kind: 'tel' },
    { id: 'zip', label: 'ZIP code', kind: 'zip', required: true },
    {
      id: 'method',
      label: 'Best way to reach you',
      kind: 'select',
      options: ['Phone call', 'Text message', 'Email'],
    },
    {
      id: 'time',
      label: 'Best time to reach you',
      kind: 'select',
      options: ['Morning', 'Afternoon', 'Evening', 'Any time'],
    },
    {
      id: 'language',
      label: 'Preferred language',
      kind: 'select',
      options: ['English', 'Spanish', 'Arabic'],
    },
  ],
};
const drivers: Section = {
  id: 'drivers',
  label: 'Drivers',
  repeat: 'driver',
  fields: [
    { id: 'name', label: 'Driver’s full name', fixed: true, required: true },
    {
      id: 'dob',
      label: 'Date of birth',
      kind: 'date',
      hint: 'Helps us find age-related rates and discounts.',
    },
    {
      id: 'license',
      label: 'License status',
      kind: 'select',
      options: ['US license', 'International license', 'Permit', 'No license'],
    },
    { id: 'state', label: 'License state or country' },
    {
      id: 'relationship',
      label: 'Relationship to you',
      kind: 'select',
      options: ['Self', 'Spouse / partner', 'Child', 'Parent', 'Employee', 'Other'],
    },
    {
      id: 'sr22',
      label: 'Do you need an SR-22?',
      kind: 'select',
      options: ['No', 'Yes', 'Not sure'],
    },
    {
      id: 'incidents',
      label: 'Accidents or tickets in the last 3 years',
      kind: 'textarea',
      hint: 'Include the approximate date and a brief description, or enter “None”.',
    },
  ],
};
const vehicles: Section = {
  id: 'vehicles',
  label: 'Vehicles',
  repeat: 'vehicle',
  fields: [
    {
      id: 'vin',
      label: 'VIN',
      kind: 'vin',
      hint: 'Find it on your registration or the driver-side dashboard.',
    },
    {
      id: 'year',
      label: 'Year',
      kind: 'number',
      min: 1900,
      max: new Date().getFullYear() + 2,
      fixed: true,
      required: true,
    },
    { id: 'make', label: 'Make', fixed: true, required: true },
    { id: 'model', label: 'Model', fixed: true, required: true },
    { id: 'driver', label: 'Primary driver', kind: 'driver' },
    {
      id: 'ownership',
      label: 'Ownership',
      kind: 'select',
      options: ['Owned', 'Financed', 'Leased'],
    },
    {
      id: 'use',
      label: 'Main use',
      kind: 'select',
      options: ['Personal / commuting', 'Business', 'Delivery / rideshare', 'Pleasure'],
    },
    { id: 'mileage', label: 'Annual mileage', kind: 'number', min: 0, max: 500000 },
    {
      id: 'coverage',
      label: 'Coverage preference',
      kind: 'select',
      options: ['Liability only', 'Liability + comprehensive & collision', 'Help me decide'],
    },
  ],
};
const current: Section = {
  id: 'policy',
  label: 'Current coverage',
  fields: [
    { id: 'insured', label: 'Do you have insurance now?', kind: 'select', options: ['Yes', 'No'] },
    { id: 'carrier', label: 'Current insurance company' },
    { id: 'expiry', label: 'Policy expiration date', kind: 'date' },
    { id: 'start', label: 'When would you like coverage to start?', kind: 'date' },
    {
      id: 'notes',
      label: 'Anything else we should know?',
      kind: 'textarea',
      hint: 'Please don’t include Social Security numbers, payment details, or medical records.',
    },
  ],
};
const autoSections = [contact, drivers, vehicles, current];
export const coverages: Coverage[] = [
  {
    id: 'auto',
    label: 'Personal auto',
    short: 'Everyday miles, covered.',
    icon: 'car',
    sections: autoSections,
  },
  {
    id: 'home',
    label: 'Home & renters',
    short: 'For your place in the world.',
    icon: 'home',
    sections: [
      contact,
      {
        id: 'property',
        label: 'Your property',
        fields: [
          { id: 'address', label: 'Property address', fixed: true, required: true },
          {
            id: 'ownership',
            label: 'Do you own or rent?',
            kind: 'select',
            options: ['Own', 'Rent'],
            required: true,
          },
          {
            id: 'type',
            label: 'Property type',
            kind: 'select',
            options: ['House', 'Condo', 'Apartment', 'Manufactured home', 'Other'],
          },
          {
            id: 'year',
            label: 'Year built',
            kind: 'number',
            min: 1700,
            max: new Date().getFullYear() + 2,
          },
          { id: 'area', label: 'Square footage', kind: 'number', min: 1, max: 100000 },
          { id: 'roof', label: 'Roof age in years', kind: 'number', min: 0, max: 150 },
          { id: 'claims', label: 'Recent property claims', kind: 'textarea' },
        ],
      },
      current,
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial auto',
    short: 'Keep your business moving.',
    icon: 'truck',
    sections: [
      contact,
      {
        id: 'business',
        label: 'Your business',
        fields: [
          { id: 'name', label: 'Business name', fixed: true, required: true },
          { id: 'work', label: 'Type of business', required: true },
          { id: 'radius', label: 'Operating radius in miles', kind: 'number', min: 0, max: 10000 },
        ],
      },
      drivers,
      vehicles,
      current,
    ],
  },
  {
    id: 'motorcycle',
    label: 'Motorcycle',
    short: 'A little more freedom.',
    icon: 'bike',
    sections: autoSections,
  },
  {
    id: 'rv',
    label: 'RV & motorhome',
    short: 'Wherever the road leads.',
    icon: 'truck',
    sections: autoSections,
  },
  {
    id: 'boat',
    label: 'Boat & watercraft',
    short: 'For your time on the water.',
    icon: 'boat',
    sections: [
      contact,
      {
        id: 'boat',
        label: 'Your watercraft',
        fields: [
          {
            id: 'year',
            label: 'Year',
            kind: 'number',
            min: 1900,
            max: new Date().getFullYear() + 2,
            required: true,
          },
          { id: 'make', label: 'Make & model', required: true },
          { id: 'length', label: 'Length in feet', kind: 'number', min: 1, max: 500 },
          { id: 'storage', label: 'Where is it stored?' },
        ],
      },
      current,
    ],
  },
  {
    id: 'life',
    label: 'Life insurance',
    short: 'For the people who matter.',
    icon: 'heart',
    sections: [
      contact,
      {
        id: 'life',
        label: 'Your coverage',
        fields: [
          {
            id: 'amount',
            label: 'Coverage amount',
            kind: 'select',
            options: [
              'Under $100,000',
              '$100,000–$250,000',
              '$250,000–$500,000',
              '$500,000–$1 million',
              'Over $1 million',
              'Help me decide',
            ],
          },
          {
            id: 'type',
            label: 'Policy preference',
            kind: 'select',
            options: ['Term life', 'Permanent life', 'Help me decide'],
          },
        ],
      },
      current,
    ],
  },
  {
    id: 'other',
    label: 'Something else',
    short: 'Tell us what you have in mind.',
    icon: 'shield',
    sections: [
      contact,
      {
        id: 'details',
        label: 'What you need',
        fields: [
          {
            id: 'description',
            label: 'What would you like to insure?',
            kind: 'textarea',
            fixed: true,
            required: true,
          },
        ],
      },
      current,
    ],
  },
];
export type Toggle = { show: boolean; required: boolean };
export type QuestionCopy = { label: string; hint: string };
export type CustomQuestion = QuestionCopy & {
  id: string;
  section: string;
  kind: string;
  options?: string[];
  show: boolean;
  required: boolean;
};
export const questionKinds = {
  text: 'Short answer',
  textarea: 'Long answer',
  number: 'Number',
  date: 'Date',
  select: 'Dropdown',
  checkbox: 'Checkbox',
};
export const maxCustomQuestions = 10;
export type FormConfig = {
  version: number;
  updatedAt: string | null;
  enabled: string[];
  fields: Record<string, Record<string, Toggle>>;
  wording: Record<string, Record<string, QuestionCopy>>;
  custom: Record<string, CustomQuestion[]>;
};
export const fieldKey = (section: Section, field: Field) => `${section.id}.${field.id}`;
export function defaults(): FormConfig {
  return {
    wording: Object.fromEntries(coverages.map((c) => [c.id, {}])),
    custom: Object.fromEntries(coverages.map((c) => [c.id, []])),
    version: 1,
    updatedAt: null,
    enabled: coverages.map((c) => c.id),
    fields: Object.fromEntries(
      coverages.map((c) => [
        c.id,
        Object.fromEntries(
          c.sections.flatMap((s) =>
            s.fields.map((f) => [fieldKey(s, f), { show: true, required: !!f.required }]),
          ),
        ),
      ]),
    ),
  };
}
export function toggle(config: FormConfig, type: string, section: Section, field: Field): Toggle {
  if (field.custom) {
    const q = config.custom[type].find((q) => q.id === field.id)!;
    return { show: q.show, required: q.required };
  }
  return field.fixed
    ? { show: true, required: true }
    : config.fields[type][fieldKey(section, field)];
}
export function configuredCoverage(config: FormConfig, type: Coverage): Coverage {
  return {
    ...type,
    sections: type.sections.map((s) => ({
      ...s,
      fields: [
        ...s.fields
          .filter((f) => !f.custom)
          .map((f) => ({ ...f, ...config.wording[type.id]?.[fieldKey(s, f)] })),
        ...(config.custom[type.id] || [])
          .filter((q) => q.section === s.id)
          .map((q) => ({ ...q, custom: true })),
      ],
    })),
  };
}
export function visibleSections(config: FormConfig, type: Coverage) {
  return configuredCoverage(config, type).sections.filter((s) =>
    s.fields.some((f) => toggle(config, type.id, s, f).show),
  );
}
export type Answers = Record<string, Record<string, string>[]>;
export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
export function validateConfig(raw: unknown): FormConfig {
  if (
    !isRecord(raw) ||
    !Number.isInteger(raw.version) ||
    !Array.isArray(raw.enabled) ||
    !raw.enabled.length ||
    new Set(raw.enabled).size !== raw.enabled.length ||
    raw.enabled.some((id) => !coverages.some((c) => c.id === id)) ||
    !isRecord(raw.fields)
  )
    throw new Error('Choose at least one insurance type.');
  const result = defaults();
  result.version = raw.version as number;
  result.enabled = raw.enabled as string[];
  for (const c of coverages) {
    const fields = raw.fields[c.id];
    if (!isRecord(fields))
      throw new Error('The form settings are incomplete. Reload and try again.');
    for (const s of c.sections)
      for (const f of s.fields) {
        const key = fieldKey(s, f),
          value = fields[key];
        if (
          !isRecord(value) ||
          typeof value.show !== 'boolean' ||
          typeof value.required !== 'boolean' ||
          (!value.show && value.required) ||
          (f.fixed && (!value.show || !value.required))
        )
          throw new Error(`Check the setting for ${f.label}.`);
        result.fields[c.id][key] = { show: value.show, required: value.required };
      }
  }
  const unsafeCopy = (text: string) =>
    [...text].some((c) => c.charCodeAt(0) < 32 || c === '<' || c === '>');
  const copy = (value: unknown): QuestionCopy => {
    if (
      !isRecord(value) ||
      typeof value.label !== 'string' ||
      !value.label.trim() ||
      value.label.length > 120 ||
      typeof value.hint !== 'string' ||
      value.hint.length > 300 ||
      unsafeCopy(value.label + value.hint)
    )
      throw new Error('Use plain text: a question up to 120 characters and help text up to 300.');
    return { label: value.label.trim(), hint: value.hint.trim() };
  };
  for (const c of coverages) {
    if (raw.wording !== undefined && !isRecord(raw.wording))
      throw new Error('Check question wording.');
    const wording = isRecord(raw.wording) ? raw.wording[c.id] : undefined;
    if (wording !== undefined && !isRecord(wording)) throw new Error('Check question wording.');
    for (const [key, value] of Object.entries(wording || {})) {
      if (!c.sections.some((s) => s.fields.some((f) => fieldKey(s, f) === key)))
        throw new Error('Unknown standard question.');
      result.wording[c.id][key] = copy(value);
    }
    if (raw.custom !== undefined && !isRecord(raw.custom))
      throw new Error('Check custom questions.');
    const custom = isRecord(raw.custom) ? raw.custom[c.id] : undefined;
    if (custom !== undefined && (!Array.isArray(custom) || custom.length > maxCustomQuestions))
      throw new Error('Add up to 10 custom questions per insurance type.');
    const ids = new Set<string>();
    for (const q of (custom || []) as unknown[]) {
      if (
        !isRecord(q) ||
        typeof q.id !== 'string' ||
        !/^custom_[a-f0-9]{16}$/.test(q.id) ||
        ids.has(q.id) ||
        !c.sections.some((s) => s.id === q.section) ||
        typeof q.kind !== 'string' ||
        !Object.hasOwn(questionKinds, q.kind) ||
        typeof q.show !== 'boolean' ||
        typeof q.required !== 'boolean' ||
        (!q.show && q.required)
      )
        throw new Error('Check the custom question settings.');
      ids.add(q.id);
      const item: CustomQuestion = {
        ...copy(q),
        id: q.id,
        section: q.section as string,
        kind: q.kind,
        show: q.show,
        required: q.required,
      };
      if (q.kind === 'select') {
        if (
          !Array.isArray(q.options) ||
          q.options.length < 2 ||
          q.options.length > 12 ||
          q.options.some(
            (o) => typeof o !== 'string' || !o.trim() || o.length > 80 || unsafeCopy(o),
          ) ||
          new Set(q.options.map((o) => o.trim())).size !== q.options.length
        )
          throw new Error('Dropdowns need 2–12 different options, up to 80 characters each.');
        item.options = q.options.map((o) => o.trim());
      }
      result.custom[c.id].push(item);
    }
  }
  return result;
}
/** Add newly introduced optional questions without resetting an agency's saved choices. */
export function hydrateConfig(raw: unknown): FormConfig {
  if (!isRecord(raw) || !isRecord(raw.fields)) return validateConfig(raw);
  const base = defaults();
  const storedFields = raw.fields;
  const fields = Object.fromEntries(
    coverages.map((c) => {
      const stored = storedFields[c.id];
      return [c.id, { ...base.fields[c.id], ...(isRecord(stored) ? stored : {}) }];
    }),
  );
  return {
    ...validateConfig({ ...raw, fields }),
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : null,
  };
}
export function fieldVisible(
  config: FormConfig,
  type: string,
  section: Section,
  field: Field,
  row: Record<string, string>,
) {
  return (
    toggle(config, type, section, field).show &&
    !(
      section.id === 'policy' &&
      ['carrier', 'expiry'].includes(field.id) &&
      toggle(config, type, section, section.fields[0]).show &&
      row.insured !== 'Yes'
    )
  );
}
export function fieldError(field: Field, value: string, required: boolean): string | null {
  if (field.kind === 'checkbox')
    return !value || value === 'No'
      ? required
        ? `Confirm ${field.label.toLowerCase()}.`
        : null
      : value === 'Yes'
        ? null
        : 'Choose the checkbox option.';
  if (!value) return required ? `Enter ${field.label.toLowerCase()}.` : null;
  // Reject control characters in untrusted email/form content.
  if (
    value.length > (field.kind === 'textarea' ? 2000 : 200) ||
    [...value].some((c) => {
      const n = c.charCodeAt(0);
      return (n < 32 && n !== 9 && n !== 10 && n !== 13) || n === 127;
    })
  )
    return 'This answer is too long or contains invalid characters.';
  if (field.kind === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Enter a valid email address.';
  if (
    field.kind === 'tel' &&
    (!/^[+()\d\s.-]{7,25}$/.test(value) ||
      value.replace(/\D/g, '').length < 7 ||
      value.replace(/\D/g, '').length > 15)
  )
    return 'Enter a valid phone number.';
  if (field.kind === 'zip' && !/^\d{5}(-\d{4})?$/.test(value)) return 'Enter a 5-digit ZIP code.';
  if (field.kind === 'vin' && !/^[A-HJ-NPR-Z0-9]{17}$/i.test(value))
    return 'A VIN has 17 letters and numbers (no I, O, or Q).';
  if (
    field.kind === 'number' &&
    (!/^\d+$/.test(value) || +value < (field.min ?? 0) || +value > (field.max ?? 1000000))
  )
    return `Enter a whole number from ${field.min ?? 0} to ${field.max ?? 1000000}.`;
  if (field.options && !field.options.includes(value))
    return 'Choose one of the available options.';
  if (
    field.kind === 'date' &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      !Number.isFinite(Date.parse(value)) ||
      new Date(value).toISOString().slice(0, 10) !== value)
  )
    return 'Enter a valid date.';
  if (field.id === 'dob' && (value > new Date().toISOString().slice(0, 10) || value < '1900-01-01'))
    return 'Enter a date of birth between 1900 and today.';
  return null;
}
export function validateAnswers(raw: unknown, config: FormConfig, type: Coverage): Answers {
  if (!isRecord(raw)) throw new Error('Complete the form before sending.');
  const clean: Answers = {};
  for (const s of visibleSections(config, type)) {
    const rows = raw[s.id];
    if (!Array.isArray(rows) || rows.length < 1 || rows.length > (s.repeat ? 10 : 1))
      throw new Error(`Check ${s.label.toLowerCase()}.`);
    clean[s.id] = rows.map((row, index) => {
      if (!isRecord(row)) throw new Error('Check your answers.');
      const values: Record<string, string> = {};
      for (const f of s.fields) {
        const t = toggle(config, type.id, s, f);
        if (
          !t.show ||
          (s.id === 'policy' &&
            ['carrier', 'expiry'].includes(f.id) &&
            toggle(config, type.id, s, s.fields[0]).show &&
            row.insured !== 'Yes')
        )
          continue;
        if (row[f.id] !== undefined && typeof row[f.id] !== 'string')
          throw new Error(`Check ${f.label.toLowerCase()}.`);
        const rawValue = String(row[f.id] ?? '').trim();
        const value = f.kind === 'vin' ? normalizeVin(rawValue) : rawValue;
        const error = fieldError(f, value, t.required);
        if (error) throw new Error(`${s.label}${s.repeat ? ` ${index + 1}` : ''}: ${error}`);
        if (
          f.kind === 'driver' &&
          value &&
          (!Array.isArray(raw.drivers) || !/^\d+$/.test(value) || +value >= raw.drivers.length)
        )
          throw new Error('Choose an available primary driver.');
        if (value) values[f.id] = value;
      }
      return values;
    });
  }
  const vins = (clean.vehicles || []).map((row) => row.vin).filter(Boolean);
  if (new Set(vins).size !== vins.length)
    throw new Error(
      'The same VIN appears on more than one vehicle. Remove the duplicate or correct its VIN.',
    );
  if (
    ['Phone call', 'Text message'].includes(clean.contact?.[0]?.method || '') &&
    !clean.contact?.[0]?.phone
  )
    throw new Error('Enter a phone number for your chosen contact method, or choose Email.');
  return clean;
}
