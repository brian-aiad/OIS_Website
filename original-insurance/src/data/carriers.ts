/** Network categories supplied by Original Insurance, October 2026.
 * A market listing is not a product or applicant eligibility promise.
 * Use a text name until a suitable official asset is available for agency use.
 */
export type MarketCategory = 'auto' | 'property' | 'commercial';
export type Carrier = { name: string; logo?: string; width?: number; height?: number };
const officialLogos: Record<string, string> = {
  Kemper: 'kemper' + '.png',
  'National General': 'national-general' + '.png',
  MAPFRE: 'mapfre' + '.png',
  Hagerty: 'hagerty' + '.png',
  Aspire: 'aspire' + '.png',
  Bridger: 'bridger' + '.png',
  Aegis: 'aegis' + '.png',
  'American Modern': 'american-modern' + '.png',
  'Pacific Specialty': 'pacific-specialty' + '.png',
  'Cabrillo Coastal': 'cabrillo-coastal' + '.png',
  Arrowhead: 'arrowhead' + '.png',
  Bamboo: 'bamboo' + '.png',
  Delos: 'delos' + '.png',
  Lightspeed: 'lightspeed' + '.png',
  'NEXT Insurance': 'next-insurance' + '.png',
  Hiscox: 'hiscox' + '.png',
  THREE: 'three' + '.png',
  Blitz: 'blitz' + '.png',
  'Bristol West': 'bristol-west' + '.png',
  Foremost: 'foremost' + '.png',
  Chubb: 'chubb' + '.png',
};
export const markets: {
  id: MarketCategory;
  label: string;
  description: string;
  link: string;
  carriers: Carrier[];
}[] = [
  {
    id: 'auto',
    label: 'Auto',
    description: 'Explore available options for your vehicle and driving situation.',
    link: '/auto-insurance-downey-ca',
    carriers: [
      'Progressive',
      'Kemper',
      'National General',
      'Bristol West',
      'MAPFRE',
      'Hagerty',
      'Aspire',
      'Bridger',
    ].map((name) => ({
      name,
      ...(officialLogos[name] ? { logo: officialLogos[name] } : {}),
    })),
  },
  {
    id: 'property',
    label: 'Property',
    description: 'Talk through your home, belongings, and property coverage needs.',
    link: '/home-insurance-downey-ca',
    carriers: [
      'Foremost',
      'Aegis',
      'American Modern',
      'Pacific Specialty',
      'Cabrillo Coastal',
      'Arrowhead',
      'Bamboo',
      'Delos',
      'Lightspeed',
    ].map((name) => ({
      name,
      ...(officialLogos[name] ? { logo: officialLogos[name] } : {}),
    })),
  },
  {
    id: 'commercial',
    label: 'Commercial',
    description: 'Discuss the business you run and the risks you need to address.',
    link: '/services#business',
    carriers: ['Chubb', 'NEXT Insurance', 'Hiscox', 'CNA', 'THREE', 'Attune', 'Blitz'].map(
      (name) => ({
        name,
        ...(officialLogos[name] ? { logo: officialLogos[name] } : {}),
      }),
    ),
  },
];
