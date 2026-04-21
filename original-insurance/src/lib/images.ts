/** Generate a simple srcSet string for a single WebP image path */
export function srcset(src: string): string {
  return src;
}

/** Centralized image paths — all optimized WebP from /public/images */
export const images = {
  hero: {
    meeting: "/images/hero-celebration-highfive.webp",
  },
  services: {
    auto: "/images/auto-premium.webp",
    home: "/images/home-modern.webp",
    life: "/images/life-family.webp",
    commercial: "/images/commercial-team.webp",
    motorcycle: "/images/motorcycle-action.webp",
    rv: "/images/rv-adventure.webp",
  },
  about: {
    handshake: "/images/hero-friendly-handshake.webp",
  },
  claims: {
    docs: "/images/claimsDocs.webp",
  },
};
