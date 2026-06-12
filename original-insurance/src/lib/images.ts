/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized from /public/images */
export const images = {
  hero: {
    /** Real photo: exterior storefront on Paramount Blvd, Downey */
    storefront: "/images/ois-storefront-real.jpg",
    officeDetail: "/images/ois-office-interior-real.jpg",
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
    /** Real photo: main office interior — teal walls, hardwood floors, workstations */
    office: "/images/ois-office-interior-real.jpg",
    /** Real photo: second interior angle — consultation area */
    officeAlt: "/images/ois-office-interior2-real.jpg",
  },
  location: {
    /** Real photo: storefront from across the street — clean, no obstruction */
    exterior: "/images/ois-storefront-real.jpg",
    /** Real photo: wider exterior showing the shopping center context */
    exteriorWide: "/images/ois-storefront-wide-real.jpg",
    /** Real photo: main office interior */
    interior: "/images/ois-office-interior-real.jpg",
    /** Real photo: consultation / private office room */
    consultationRoom: "/images/ois-consultation-room-real.jpg",
  },
  testimonials: {
    auto: "/images/ois-testimonial-auto-client-v4.webp",
    family: "/images/ois-testimonial-family-client-v4.webp",
    business: "/images/ois-testimonial-business-client-v4.webp",
  },
  clients: {
    officeConsultation: "/images/ois-testimonial-auto-client-v4.webp",
    autoConsultation: "/images/ois-hispanic-auto-consult-v3.webp",
    sr22Consultation: "/images/ois-sr22-hispanic-consult-v4.webp",
    noLicenseConsultation: "/images/ois-no-license-hispanic-consult-v4.webp",
    commercialConsultation: "/images/ois-testimonial-business-client-v4.webp",
    /** Real photo: consultation room interior */
    contactFrontDesk: "/images/ois-consultation-room-real.jpg",
  },
  claims: {
    docs: "/images/ois-office-interior-real.jpg",
  },
};
