import { agency } from '../intake/agency';
import type { Answers, Coverage } from '../intake/schema';
import { vehicleLabel } from '../intake/vin';
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

/** Built from validated/filtered answers only; unknown and hidden answers never enter this module. */
export function quoteEmail(type: Coverage, answers: Answers, id: string) {
  const person = answers.contact[0];
  const reference = id.slice(0, 8).toUpperCase();
  const counts = [
    answers.drivers?.length
      ? `${answers.drivers.length} driver${answers.drivers.length > 1 ? 's' : ''}`
      : '',
    answers.vehicles?.length
      ? `${answers.vehicles.length} vehicle${answers.vehicles.length > 1 ? 's' : ''}`
      : '',
  ]
    .filter(Boolean)
    .join(' · ');
  const overview = [
    ['Customer', person.name],
    ['Email', person.email],
    ['Phone', person.phone],
    ['Contact preference', [person.method, person.time].filter(Boolean).join(' · ')],
    ['Preferred language', person.language],
    ['Requested start', answers.policy?.[0]?.start],
    ['Included', counts],
  ].filter((row): row is [string, string] => !!row[1]);
  const sections = type.sections
    .flatMap((section) =>
      (answers[section.id] || []).map((row, i) => {
        const title = `${section.label}${section.repeat ? ` ${i + 1}` : ''}`;
        const subtitle =
          section.id === 'vehicles' ? vehicleLabel(row) : section.id === 'drivers' ? row.name : '';
        const fields = section.fields.flatMap((field) => {
          let value = row[field.id];
          if (field.kind === 'driver' && value)
            value = answers.drivers?.[+value]?.name || `Driver ${+value + 1}`;
          return value ? [[field.label, value] as [string, string]] : [];
        });
        return { title, subtitle, fields };
      }),
    )
    .filter((section) => section.fields.length);
  const lines = [
    agency.legalName.toUpperCase(),
    `New quote request · ${type.label}`,
    `Reference: ${id}`,
    '',
    'AT A GLANCE',
    ...overview.map(([label, value]) => `${label}: ${value}`),
    '',
  ];
  for (const section of sections)
    lines.push(
      section.title.toUpperCase(),
      '─'.repeat(36),
      ...section.fields.map(([label, value]) => `${label}: ${value}`),
      '',
    );
  lines.push(
    'Customer agreed to be contacted about this quote request.',
    'A quote request does not bind coverage.',
  );
  const table = (rows: [string, string][]) =>
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;table-layout:fixed">${rows.map(([label, value]) => `<tr><td width="40%" style="padding:9px 12px 9px 0;border-bottom:1px solid #e8ebe6;vertical-align:top;font-size:13px;color:#64716d;word-wrap:break-word">${escape(label)}</td><td style="padding:9px 0;border-bottom:1px solid #e8ebe6;vertical-align:top;font-size:14px;color:#142b44;white-space:pre-wrap;word-wrap:break-word">${escape(value)}</td></tr>`).join('')}</table>`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f6f3ed;font-family:Arial,sans-serif;color:#142b44"><div style="max-width:640px;margin:0 auto;padding:24px 16px"><div style="padding:26px 24px;background:#142b44;color:white;border-radius:10px 10px 0 0"><p style="margin:0 0 14px;font-size:11px;letter-spacing:1px;color:#e9d09e">${escape(agency.legalName.toUpperCase())}</p><h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:normal">A new quote request.</h1><p style="margin:12px 0 0;font-size:14px">${escape(type.label)}${counts ? ` · ${escape(counts)}` : ''}</p></div><div style="background:white;padding:24px;border:1px solid #e0e4de;border-top:0"><p style="font-size:12px;margin:0 0 20px;color:#64716d">Reference ${reference} · Reply to this email to contact your customer.</p><h2 style="font-size:17px;margin:0 0 10px">At a glance</h2>${table(overview)}${sections.map((section) => `<div style="margin-top:28px"><h2 style="font-size:17px;margin:0 0 6px">${escape(section.title)}</h2>${section.subtitle ? `<p style="font-size:12px;color:#526b5b;margin:0 0 8px">${escape(section.subtitle)}</p>` : ''}${table(section.fields)}</div>`).join('')}<p style="font-size:11px;line-height:1.7;color:#64716d;margin:28px 0 0">Customer agreed to be contacted about this request. A quote request does not bind coverage.</p></div><p style="font-size:11px;color:#64716d;line-height:1.7;margin:18px 8px">Need to move this into your quoting system? The plain-text version of this email includes every provided answer with a label.</p></div></body></html>`;
  return {
    subject: `[${type.label}] ${person.name.replace(/[\r\n]/g, ' ')}${counts ? ` · ${counts}` : ''} — ${reference}`,
    text: lines.join('\n'),
    html,
  };
}
