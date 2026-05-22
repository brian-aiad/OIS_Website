/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized WebP from /public/images */
export const images = {
  hero: {
    storefront: "/images/hero-storefront-updated.webp",
    team: "/images/hero-broker-team.webp",
    meeting: "/images/community-trust.webp",
    handshake: "/images/handshake-deal.webp",
  },
  services: {
    auto: "/images/auto-keys-coverage.webp",
    home: "/images/home-insurance-consult.webp",
    life: "/images/life-insurance-family.webp",
    commercial: "/images/fleet-vehicle-review.webp",
    motorcycle: "/images/motorcycle-insurance.webp",
    rv: "/images/product-rv-boat-insurance.webp",
  },
  products: {
    overview: "/images/services-overview-hero.webp",
    auto: "/images/downey-street-driving.webp",
    home: "/images/home-insurance-consult.webp",
    life: "/images/life-insurance-family.webp",
    commercial: "/images/commercial-vehicles-lineup.webp",
    motorcycle: "/images/motorcycle-insurance.webp",
    rv: "/images/product-rv-boat-insurance.webp",
    sr22: "/images/dmv-documents.webp",
    noLicense: "/images/foreign-license-consultation.webp",
  },
  about: {
    handshake: "/images/handshake-deal.webp",
    consultation: "/images/community-trust.webp",
    office: "/images/about-office-interior.webp",
    team: "/images/about-team-gathered.webp",
    portrait: "/images/about-broker-portrait.webp",
  },
  clients: {
    consultation: "/images/community-trust.webp",
    commercialReview: "/images/fleet-vehicle-review.webp",
    officeConsultation: "/images/faq-consultation.webp",
    autoConsultation: "/images/auto-consultation-main.webp",
    sr22Consultation: "/images/sr22-filing-desk.webp",
    noLicenseConsultation: "/images/foreign-license-consultation.webp",
    commercialConsultation: "/images/contractor-consultation.webp",
    homeLifeConsultation: "/images/life-insurance-family.webp",
    motorcycleConsultation: "/images/motorcycle-insurance.webp",
    recreationalConsultation: "/images/ois-recreational-consultation.webp",
    contactFrontDesk: "/images/contact-front-desk.webp",
    contactCall: "/images/contact-call-broker.webp",
  },
  city: {
    downey: "/images/downey-neighborhood.webp",
    southeastLa: "/images/southeast-la-community.webp",
    broker: "/images/bilingual-broker-city.webp",
  },
  claims: {
    docs: "/images/faq-consultation.webp",
  },
};
