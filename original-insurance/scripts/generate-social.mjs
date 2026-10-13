import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
const output = new URL('../public/images/social/', import.meta.url);
mkdirSync(output, { recursive: true });
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const pages = [
  [
    'original-insurance',
    'Insurance options.',
    'A local team.',
    'Auto · Home · Business',
    'M730 365 895 270 1060 365M755 353v165h282V353M855 518V408h85v110M785 393h42v42h-42zM967 393h42v42h-42z',
  ],
  [
    'auto',
    'Auto insurance.',
    'Compare your options.',
    'Independent insurance · Downey, CA',
    'M720 405 773 334h180l61 71 51 17v59h-46m-51 0H805m-48 0h-39v-59l2-17ZM736 405h278M790 345v60m85-60v60M805 481a25 25 0 1 0-50 0 25 25 0 0 0 50 0Zm214 0a25 25 0 1 0-50 0 25 25 0 0 0 50 0Z',
  ],
  [
    'home',
    'Home & renters.',
    'Know your coverage.',
    'Independent insurance · Downey, CA',
    'M730 365 895 270 1060 365M755 353v165h282V353M855 518V408h85v110M785 393h42v42h-42zM967 393h42v42h-42z',
  ],
  [
    'commercial',
    'Vehicles for work.',
    'Coverage for business.',
    'Commercial auto · Downey, CA',
    'M725 470V290h205v180m0-120h75l66 90v40h-40m-50 0H825m-50 0h-50m220-112v66h90l-40-66ZM825 480a25 25 0 1 0-50 0 25 25 0 0 0 50 0Zm205 0a25 25 0 1 0-50 0 25 25 0 0 0 50 0Z',
  ],
  [
    'sr22',
    'Need an SR-22?',
    'Start with clear answers.',
    'Insurance & filing guidance · Downey',
    'M805 510V250h135l60 60v200ZM940 250v60h60M835 355h130m-130 40h90m-90 40h110m-98 38 20 20 42-47',
  ],
  [
    'license',
    'A license question?',
    'Talk through your options.',
    'Independent insurance · Downey, CA',
    'M805 510V250h135l60 60v200ZM940 250v60h60M835 355h130m-130 40h90m-90 40h110',
  ],
  [
    'es',
    'Seguros en Downey.',
    'Atención en español.',
    'Auto · Casa · Negocio',
    'M730 365 895 270 1060 365M755 353v165h282V353M855 518V408h85v110M785 393h42v42h-42zM967 393h42v42h-42z',
  ],
];
for (const [slug, line1, line2, sub, path] of pages) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#142b44"/><path d="M690 0h510v630H690z" fill="#1a3858"/><path d="M54 128h1092" stroke="#ccd6df" opacity=".3"/><text x="56" y="72" fill="white" font-family="Arial,sans-serif" font-size="27" font-weight="700">ORIGINAL INSURANCE SERVICES</text><text x="56" y="242" fill="#d8b46d" font-family="Arial,sans-serif" font-size="22">${escape(sub)}</text><text x="54" y="328" fill="white" font-family="Arial,sans-serif" font-size="49" font-weight="700">${escape(line1)}</text><text x="54" y="391" fill="white" font-family="Arial,sans-serif" font-size="43" font-weight="700">${escape(line2)}</text><path d="${path}" fill="none" stroke="#ccd6df" stroke-width="3" stroke-linejoin="round"/><path d="M717 545h360" stroke="#d8b46d" stroke-width="3"/><text x="56" y="561" fill="#ccd6df" font-family="Arial,sans-serif" font-size="22">originalinsurance.net · (310) 538-8666</text></svg>`;
  writeFileSync(new URL(`${slug}.svg`, output), svg);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(new URL(`${slug}.jpg`, output).pathname);
}
await sharp(
  new URL('../src/assets/southern-california-auto-home-business-v3.png', import.meta.url).pathname,
)
  .resize({ width: 1536, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(
    new URL('../public/images/southern-california-insurance-v3.webp', import.meta.url).pathname,
  );
console.log('7 social images and optimized sitemap hero exported.');
