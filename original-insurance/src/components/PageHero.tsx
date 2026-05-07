import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import BrokerHeroPanel from "./BrokerHeroPanel";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  badgeText?: string;
  badgeType?: "open" | "default";
  /** URL to a background photo (imported asset URL or public path) */
  backgroundImage?: string;
  /** Override the navy overlay gradient (e.g. for a different mood per page) */
  overlayGradient?: string;
  /** Override the CSS filter applied to the background photo */
  imageFilter?: string;
  rightContent?: ReactNode;
  children?: ReactNode;
}

/**
 * Shared page hero used by Services / Contact / About / Locations.
 * Matches the home hero treatment: photo background + dark overlay,
 * diagonal line texture, vignette, Playfair Display headline, gold
 * accent rule, and a wave divider.
 */
export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  badgeText,
  badgeType = "default",
  backgroundImage,
  overlayGradient,
  imageFilter,
  rightContent,
  children,
}: PageHeroProps) {
  const heroAside = rightContent ?? <BrokerHeroPanel />;

  return (
    <section
      className="page-hero relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #060E1F 0%, #0B1E3D 50%, #162D5E 100%)",
      }}
    >
      {/* Background photo */}
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: imageFilter ?? "contrast(1.05) saturate(0.85)" }}
            fetchPriority="high"
            width={1440}
            height={960}
          />
          {/* Dark overlay over photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                overlayGradient ??
                "linear-gradient(to right, rgba(6,14,31,0.92) 0%, rgba(11,30,61,0.78) 55%, rgba(11,30,61,0.55) 100%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Diagonal line texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, transparent, transparent 30px, rgba(255,255,255,0.018) 30px, rgba(255,255,255,0.018) 31px)",
        }}
      />

      {/* Vignette edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(6,14,31,0.45) 100%)",
        }}
      />

      <div className="container relative z-10 pt-28 pb-24 md:pt-32 md:pb-28">
        <div
          className={
            heroAside
              ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              : "max-w-3xl"
          }
        >
          <div>
            {breadcrumb && (
              <nav className="mb-6 flex items-center gap-2 text-sm text-white/55">
                <NavLink to="/" className="hover:text-white/90 transition-colors">
                  Home
                </NavLink>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white/85 font-medium">{breadcrumb}</span>
              </nav>
            )}

            {badgeText && (
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-5 border ${
                  badgeType === "open"
                    ? "bg-gold-500/15 border-gold-400/30 text-gold-300"
                    : "bg-white/8 border-white/15 text-white/80"
                }`}
                style={badgeType !== "open" ? { background: "rgba(255,255,255,0.06)" } : undefined}
              >
                {badgeType === "open" && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                )}
                {badgeText}
              </div>
            )}

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>

            {/* Gold accent rule */}
            <div
              className="mt-5 mb-5 rounded-full"
              style={{ width: "56px", height: "4px", background: "var(--gold-500)" }}
            />

            {subtitle && (
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">{subtitle}</p>
            )}

            {children && <div className="mt-7">{children}</div>}
          </div>

          {heroAside && <div className="hidden lg:block">{heroAside}</div>}
        </div>
      </div>

      {/* Wave divider — same SVG used everywhere */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", height: "60px" }}
        >
          <path
            d="M0 64L1440 64L1440 24C1200 64 900 4 720 24C540 44 240 4 0 24L0 64Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
