/** Network categories supplied by Original Insurance, October 2026.
 * A market listing is not a product or applicant eligibility promise.
 * Use a text name until a suitable official asset is available for agency use.
 */
export type MarketCategory = 'auto' | 'property' | 'commercial';
export type Carrier = { name: string; logo?: string; width?: number; height?: number };
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
      ...(name === 'Bristol West' ? { logo: 'bristol-west.png', width: 1410, height: 506 } : {}),
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
      ...(name === 'Foremost' ? { logo: 'foremost.png', width: 274, height: 40 } : {}),
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
        ...(name === 'Chubb' ? { logo: 'chubb.png', width: 3034, height: 307 } : {}),
      }),
    ),
  },
];
