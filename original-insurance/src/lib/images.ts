/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized WebP from /public/images */
export const images = {
  hero: {
    meeting: "/images/hero-professional-meeting.webp",
  },
  services: {
    auto: "/images/product-auto-insurance.webp",
    home: "/images/product-home-renters-insurance.webp",
    life: "/images/product-life-insurance.webp",
    commercial: "/images/product-commercial-auto-insurance.webp",
    motorcycle: "/images/product-motorcycle-insurance.webp",
    rv: "/images/product-rv-boat-insurance.webp",
  },
  products: {
    overview: "/images/product-services-overview.webp",
    auto: "/images/product-auto-insurance.webp",
    home: "/images/product-home-renters-insurance.webp",
    life: "/images/product-life-insurance.webp",
    commercial: "/images/product-commercial-auto-insurance.webp",
    motorcycle: "/images/product-motorcycle-insurance.webp",
    rv: "/images/product-rv-boat-insurance.webp",
    sr22: "/images/product-sr22-filing.webp",
    noLicense: "/images/product-no-license-auto.webp",
  },
  about: {
    handshake: "/images/hero-friendly-handshake.webp",
    consultation: "/images/office-client-consultation.webp",
  },
  clients: {
    consultation: "/images/broker-client-consultation.webp",
    commercialReview: "/images/broker-commercial-review.webp",
    officeConsultation: "/images/office-client-consultation.webp",
    autoConsultation: "/images/ois-auto-consultation.webp",
    sr22Consultation: "/images/ois-sr22-filing-consultation.webp",
    noLicenseConsultation: "/images/ois-no-license-consultation.webp",
    commercialConsultation: "/images/ois-commercial-auto-consultation.webp",
    homeLifeConsultation: "/images/ois-home-life-consultation.webp",
    motorcycleConsultation: "/images/ois-motorcycle-consultation.webp",
    recreationalConsultation: "/images/ois-recreational-consultation.webp",
    contactFrontDesk: "/images/ois-contact-front-desk.webp",
  },
  claims: {
    docs: "/images/claimsDocs.webp",
  },
};
