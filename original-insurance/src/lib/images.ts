/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized WebP from /public/images */
export const images = {
  hero: {
    storefront: "/images/ois-hero-storefront-logo-v4.webp",
    officeDetail: "/images/ois-office-desk-detail-v3.webp",
    meeting: "/images/ois-hispanic-family-consult-v3.webp",
    handshake: "/images/handshake-deal.webp",
  },
  home: {
    why: "/images/ois-home-why-hispanic-consult-v4.webp",
    reviews: "/images/ois-home-reviews-client-v4.webp",
  },
  services: {
    auto: "/images/ois-product-auto-car-v3.webp",
    home: "/images/ois-product-home-house-v3.webp",
    life: "/images/ois-product-life-policy-v3.webp",
    commercial: "/images/ois-product-commercial-vehicles-v3.webp",
    motorcycle: "/images/ois-product-motorcycle-v3.webp",
    rv: "/images/ois-product-rv-boat-v3.webp",
  },
  products: {
    overview: "/images/ois-services-overview-products-v3.webp",
    auto: "/images/ois-product-auto-car-v3.webp",
    home: "/images/ois-product-home-house-v3.webp",
    life: "/images/ois-product-life-policy-v3.webp",
    commercial: "/images/ois-product-commercial-vehicles-v3.webp",
    motorcycle: "/images/ois-product-motorcycle-v3.webp",
    rv: "/images/ois-product-rv-boat-v3.webp",
    sr22: "/images/ois-product-sr22-document-v3.webp",
    noLicense: "/images/ois-product-no-license-docs-v3.webp",
  },
  about: {
    handshake: "/images/handshake-deal.webp",
    consultation: "/images/ois-hispanic-family-consult-v3.webp",
    office: "/images/ois-office-desk-detail-v3.webp",
    team: "/images/about-team-gathered.webp",
    portrait: "/images/about-broker-portrait.webp",
  },
  testimonials: {
    auto: "/images/ois-testimonial-auto-client-v4.webp",
    family: "/images/ois-testimonial-family-client-v4.webp",
    business: "/images/ois-testimonial-business-client-v4.webp",
  },
  clients: {
    consultation: "/images/ois-home-reviews-client-v4.webp",
    commercialReview: "/images/ois-testimonial-business-client-v4.webp",
    officeConsultation: "/images/ois-testimonial-auto-client-v4.webp",
    autoConsultation: "/images/ois-hispanic-auto-consult-v3.webp",
    sr22Consultation: "/images/ois-sr22-hispanic-consult-v4.webp",
    noLicenseConsultation: "/images/ois-no-license-hispanic-consult-v4.webp",
    commercialConsultation: "/images/ois-testimonial-business-client-v4.webp",
    homeLifeConsultation: "/images/ois-testimonial-family-client-v4.webp",
    motorcycleConsultation: "/images/ois-product-motorcycle-v3.webp",
    recreationalConsultation: "/images/ois-product-rv-boat-v3.webp",
    contactFrontDesk: "/images/ois-contact-reception-v4.webp",
    contactCall: "/images/contact-call-broker.webp",
  },
  city: {
    downey: "/images/downey-neighborhood.webp",
    southeastLa: "/images/ois-city-community-golden-v4.webp",
    corridor: "/images/ois-city-commercial-corridor-v4.webp",
    smallBusiness: "/images/ois-city-small-business-v4.webp",
    broker: "/images/bilingual-broker-city.webp",
  },
  claims: {
    docs: "/images/ois-office-desk-detail-v3.webp",
  },
};
