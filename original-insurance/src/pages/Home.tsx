import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { images, srcset } from "../lib/images";
import { useImagePreload, usePageMeta } from "../lib/seo";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { MagneticButton } from "../components/MagneticButton";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import ReviewBadge from "../components/seo/ReviewBadge";
import TrustStrip from "../components/seo/TrustStrip";
import { CTASection, Section, SectionHeader } from "../design-system";
import InsuranceWorkflow from "../components/InsuranceWorkflow";

/* ═══════════════════════════════════════════════
   HERO — Photo-based with full-bleed storefront background
   ═══════════════════════════════════════════════ */
function Hero() {
  useImagePreload(images.hero.storefront);

  return (
    <section className="relative overflow-hidden noise-overlay diagonal-pattern">
      {/* Full-bleed background photo (storefront) */}
      <img
        src={images.hero.storefront}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        width={1672}
        height={941}
      />
      {/* Navy overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(6,14,31,0.64)" }} />
      {/* Soft gradient sweetener for legibility on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-900/58 to-brand-900/12" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(245,166,35,0.22),transparent_28%)]" />

      <div className="container relative grid lg:grid-cols-[1.15fr,1fr] gap-10 lg:gap-14 items-center pt-24 pb-20 lg:pt-28 lg:pb-24">
        {/* ── Left: Copy ── */}
        <div className="max-w-xl relative z-[2]">
          {/* Trust badge pill */}
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
            <span className="text-white/90 text-sm font-semibold">Downey's Trusted Broker Since 1999</span>
          </span>

          <h1 className="display-1 text-white">
            Insurance that{" "}
            <span className="relative inline-block">
              <span className="relative z-10">works for you</span>
              <svg
                className="absolute -bottom-3 left-0 w-full"
                height="14"
                viewBox="0 0 320 14"
                fill="none"
                aria-hidden
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C40 3 80 11 120 7C160 3 200 11 240 7C280 3 300 9 318 6"
                  stroke="#F5A623"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/85 leading-relaxed">
            We compare 30+ carriers to find you the best rate. Real people, real savings, real fast.
          </p>

          <p
            className="mt-4 text-gold-400 font-semibold text-[15px]"
            style={{ borderLeft: "3px solid #F5A623", paddingLeft: "12px" }}
          >
            No license? No problem.
          </p>

          <div className="mt-5">
            <ReviewBadge count={site.reviews.count} compact />
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <MagneticButton as="div" className="inline-block">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg group">
                Get Your Free Quote
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </button>
            </MagneticButton>
            <MagneticButton as="div" className="inline-block" strength={0.2}>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                Call {site.contact.phone}
              </a>
            </MagneticButton>
          </div>

          {/* Trust signals — compact inline */}
          <div className="mt-8 flex flex-wrap items-center gap-y-2">
            {[
              { icon: <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 6v6c0 5 3.6 8.7 8 10 4.4-1.3 8-5 8-10V6l-8-4z" /></svg>, text: "Licensed CA Broker" },
              { icon: <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>, text: "4.9\u2605 Google Rating" },
              { icon: <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z" /></svg>, text: "3 Languages" },
            ].map((b, i) => (
              <span key={i} className="flex items-center">
                <span className="flex items-center gap-2 text-[13px] font-medium text-white/85 px-3 first:pl-0 cursor-default">
                  {b.icon}
                  {b.text}
                </span>
                {i < 2 && <span className="text-white/30 select-none" aria-hidden>|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Single elegant Trust Panel ── */}
        <div className="relative hidden lg:flex justify-end items-center z-[2]">
          <div
            className="w-full max-w-[460px] rounded-3xl p-3 relative"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderTop: "2px solid rgba(245,166,35,0.75)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.42)",
            }}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-brand-950">
              <img
                src={images.hero.officeDetail}
                alt="Insurance folders, keys, and policy documents on an Original Insurance broker desk"
                className="h-full w-full object-cover"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/12 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-3.5 py-2 text-[12px] font-extrabold uppercase tracking-wider text-brand-950 shadow-lg ring-1 ring-gold-200">
                  <span className="h-2 w-2 rounded-full bg-brand-900" />
                  Clean quote review
                </div>
                <p className="mt-3 max-w-sm text-xl font-extrabold leading-snug text-white drop-shadow-md">
                  Bring your details. We compare the market and explain the tradeoffs.
                </p>
              </div>
            </div>
            <div className="p-4">
            {/* Star rating + label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                ))}
              </div>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-white/70">Google Reviews</span>
            </div>

            {/* Featured testimonial */}
            <blockquote className="text-white/90 text-[15px] leading-relaxed italic" style={{ fontFamily: "var(--font-display)" }}>
              "I've trusted Aiman for over 23 years — auto, home, fire. He always finds the best rates."
            </blockquote>
            <div className="mt-2 text-[12px] text-white/60">— RiRi M.</div>

            {/* Divider */}
            <div className="my-5 h-px bg-white/10" />

            {/* Credibility checklist */}
            <ul className="space-y-2.5">
              {[
                "Licensed CA Broker",
                "30+ Insurance Carriers",
                "Response Under 1 Hour",
                "Arabic · Spanish · English",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-white/90">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-gold-500/20 grid place-items-center">
                    <svg className="w-3 h-3 text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={openQuoteModal}
              className="mt-6 w-full btn btn-accent"
              style={{ padding: "12px 16px", fontSize: "14px" }}
            >
              Get Your Free Quote
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="white">
          <path d="M0 30C240 50 480 20 720 30C960 40 1200 20 1440 30V60H0V30Z" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES — Masonry / staggered grid
   ═══════════════════════════════════════════════ */
type Svc = { key: string; title?: string; name?: string; blurb?: string; desc?: string };

const serviceImages: Record<string, { src: string; alt: string }> = {
  auto: { src: images.services.auto, alt: "Auto insurance coverage from Original Insurance in Downey, CA" },
  home: { src: images.services.home, alt: "Home and renters insurance for California homeowners" },
  life: { src: images.services.life, alt: "Family life insurance protection plans" },
  commercial: { src: images.services.commercial, alt: "Commercial and business insurance for Downey CA businesses" },
  moto: { src: images.services.motorcycle, alt: "Motorcycle insurance coverage for California riders" },
  rec: { src: images.services.rv, alt: "RV, boat and recreational vehicle insurance" },
};

function ServicesMasonry() {
  // All 6 core services in deliberate order
  const items = useMemo(() => {
    const order = ["auto", "home", "life", "commercial", "moto", "rec"];
    const map = new Map((site.services as Svc[]).map((s) => [s.key, s]));
    return order.map((k) => map.get(k)).filter(Boolean) as Svc[];
  }, []);

  const renderCard = (s: Svc, idx: number) => {
    const title = s.title ?? s.name ?? s.key;
    const blurb = s.blurb ?? s.desc ?? "";
    const img = serviceImages[s.key];
    const featured = idx === 0;

    return (
      <button
        type="button"
        onClick={openQuoteModal}
        aria-label={`Get a quote for ${title}`}
        className="service-card group relative flex flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-slate-200/80 hover:ring-slate-300 hover:shadow-lifted transition-all duration-300 text-left w-full"
        style={{ aspectRatio: "4 / 3", background: "linear-gradient(135deg, #1a2a4a 0%, #0f2147 100%)" }}
      >
        {img && (
          <div className="img-duotone absolute inset-0">
            <img
              src={img.src}
              srcSet={srcset(img.src)}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              alt={img.alt}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              style={{ background: "linear-gradient(135deg, #1a2a4a 0%, #0f2147 100%)" }}
            />
          </div>
        )}
        {/* Bottom navy fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-brand-950/5 z-[2]" />

        {featured && (
          <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-gold-400 text-brand-950 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
            Most Popular
          </span>
        )}

        <div className="relative z-10 p-5">
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
          <p className="mt-1.5 text-[13px] text-white/75 leading-relaxed line-clamp-2">{blurb}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-gold-400 group-hover:gap-2 transition-all">
            Get a quote
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </span>
        </div>
      </button>
    );
  };

  return (
    <section className="sp" style={{ background: "var(--surface-gray)" }}>
      <div className="container">
        <Reveal>
          <span className="eyebrow">What We Cover</span>
          <h2 className="mt-3 display-2 text-slate-900 max-w-xl">
            Personal &amp; commercial coverage, tailored to&nbsp;you
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg">
            We shop dozens of carriers to find coverage that actually fits your life.
          </p>
        </Reveal>

        {/* 3 × 2 equal grid */}
        <Stagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" gap={0.06}>
          {items.map((s, i) => (
            <StaggerChild key={s.key}>{renderCard(s, i)}</StaggerChild>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-7">
          <NavLink to="/services" className="btn btn-outline group">
            View All Services
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </NavLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT SPLIT — Asymmetric 2-col
   ═══════════════════════════════════════════════ */
function AboutSplit() {
  return (
    <section className="sp bg-white overflow-hidden cv-auto-tall">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal direction="left" className="relative">
            <div className="rounded-3xl overflow-hidden shadow-heavy ring-1 ring-slate-100 aspect-[4/3]">
              <img
                src={images.home.why}
                srcSet={srcset(images.home.why)}
                sizes="(max-width: 1024px) 100vw, 600px"
                alt="Original Insurance broker reviewing coverage options with Downey clients"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
            <div
              className="absolute -bottom-6 -right-4 lg:-right-8 rounded-2xl overflow-hidden shadow-heavy w-60 h-44 lg:w-72 lg:h-48"
              style={{ border: "2px solid rgba(245,166,35,0.45)" }}
            >
              <img src={images.hero.storefront} alt="Original Insurance Services storefront on Paramount Blvd, Downey, CA" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-950/85 via-brand-950/40 to-transparent px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-300">Our Downey office</p>
                <p className="text-[11px] text-white/80">9907-B Paramount Blvd</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <span className="eyebrow">Why Original Insurance</span>
            <h2 className="mt-3 display-2 text-slate-900">
              Local service backed by 25&nbsp;years of experience
            </h2>
            <p className="mt-3 text-slate-500 leading-relaxed text-[15px]">
              {site.description}
            </p>

            <div className="mt-6 space-y-3">
              {[
                "We shop 30+ carriers so you get the best fit, not just the cheapest price",
                "Multilingual staff — Arabic, Spanish, and English",
                "Claims guidance and advocacy when you need it most",
                "No driver's license? We can still help you get covered",
              ].map((t) => (
                <div key={t} className="flex gap-3">
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                    <svg className="w-3 h-3 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-slate-600 text-[15px]">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <NavLink to="/about" className="btn btn-outline group">
                More About Us
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </NavLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TESTIMONIALS — Asymmetric featured cards
   ═══════════════════════════════════════════════ */
function Testimonials() {
  const reviews = [
    { quote: "I've trusted Aiman as my insurance broker for over 23 years for my auto, home, and fire insurance. He consistently finds the best rates and provides outstanding service.", name: "RiRi M.", years: "23+ years" },
    { quote: "The best ever. They're very helpful and I just love them. I've been with them for about 20 years. You won't find a more friendly company.", name: "Sheila R.", years: "20+ years" },
    { quote: "I've been a loyal customer with Original Insurance for over ten years. Their customer service is consistently amazing.", name: "Sameh E.", years: "10+ years" },
    { quote: "I got my auto & renters insurance here and couldn't be more satisfied. They found me an excellent rate, easily the best I've come across.", name: "Bishoy M.", years: "Client" },
    { quote: "They made getting car insurance so easy and stress-free. The team is incredibly knowledgeable and took the time to explain every detail.", name: "Elizabeth H.", years: "Client" },
    { quote: "Great prices, reliable team, friendly people. Highly recommend.", name: "Karim A.", years: "Client" },
  ];

  return (
    <section className="sp bg-slate-25 overflow-hidden cv-auto-tall">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-14 items-start">
          <Reveal direction="left">
            <span className="eyebrow">Client Reviews</span>
            <h2 className="mt-3 display-2 text-slate-900">
              Real words from real&nbsp;clients
            </h2>
            <p className="mt-3 text-slate-500 max-w-md">
              We don't just sell policies — we build relationships that last decades.
            </p>

            <div className="mt-6 bg-brand-900 rounded-2xl p-7 text-white ring-1 ring-brand-800 relative overflow-hidden">
              <div className="-mx-7 -mt-7 mb-5 h-44 overflow-hidden bg-brand-950">
                <img
                  src={images.home.reviews}
                  srcSet={srcset(images.home.reviews)}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  alt="Insurance broker reviewing auto policy choices with a client"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
              </div>
              {/* Decorative open quote */}
              <span
                aria-hidden
                className="absolute top-2 left-4 select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "110px",
                  lineHeight: 1,
                  color: "rgba(245,166,35,0.18)",
                  top: "150px",
                }}
              >
                &ldquo;
              </span>
              <div className="relative">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-white/90" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                {reviews[0].quote}
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-700 grid place-items-center text-sm font-bold text-white">
                  {reviews[0].name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{reviews[0].name}</div>
                  <div className="text-[11px] text-white/70">{reviews[0].years} &middot; Google Review</div>
                </div>
              </div>
              </div>
            </div>

            {/* See all reviews link */}
            <a
              href="https://www.google.com/search?q=Original+Insurance+Services+Downey"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-800 hover:text-gold-600 transition-colors"
            >
              See all reviews on Google
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
            </a>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 gap-3">
            {reviews.slice(1).map((r, i) => {
              const avatarGradients = [
                "from-brand-500 to-brand-700",
                "from-gold-400 to-gold-600",
                "from-brand-700 to-brand-950",
                "from-gold-500 to-brand-800",
                "from-brand-600 to-gold-500",
              ];
              return (
              <StaggerChild key={i}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-xs h-full flex flex-col hover:shadow-soft hover:ring-slate-300 transition-all">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3 h-3 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-slate-600 leading-relaxed flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} grid place-items-center text-[11px] font-bold text-white shadow-sm ring-1 ring-white`}>
                      {r.name.charAt(0)}
                    </div>
                    <span className="text-[12px] font-semibold text-slate-700">{r.name}</span>
                    <span className="text-[11px] text-slate-300 ml-auto">Google</span>
                  </div>
                </div>
              </StaggerChild>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FAQ — Accordion
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const qa = [
    { q: "How fast can I get a quote?", a: "Many quotes are same-day. For specialty lines or complex risks, usually 24-48 hours." },
    { q: "Do you offer free SR-22 filings?", a: "Yes — free SR-22 filing with qualifying auto policies." },
    { q: "Can you help me after I buy?", a: "Absolutely. Policy changes, claims guidance, renewal checkups — we're here." },
    { q: "Which carriers do you work with?", a: "30+ carriers across personal and commercial lines. Availability varies by risk and location." },
    { q: "Do I need a driver's license?", a: "No — we can help customers without a driver's license get the coverage they need." },
  ];

  return (
    <Section tone="light" className="cv-auto-tall">
      <div className="container max-w-2xl">
        <SectionHeader eyebrow="FAQ" title="Common questions" align="center" className="mb-10" />

        <div>
          {qa.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{ borderBottom: "1px solid var(--border-light)" }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between text-left group"
                  style={{ padding: "20px 0" }}
                >
                  <span
                    className="pr-4 group-hover:text-brand-800 transition-colors"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 grid place-items-center text-brand-800 transition-transform duration-200 ${openIdx === i ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: openIdx === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        color: "var(--text-secondary)",
                        paddingBottom: "20px",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   STICKY RIBBON
   ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   SERVICE AREAS — City landing page hub
   ═══════════════════════════════════════════════ */
function ServiceAreas() {
  const cities = [
    { name: "Downey", slug: "downey", note: "Our home base — walk-ins welcome" },
    { name: "Norwalk", slug: "norwalk", note: "Minutes away via the 605" },
    { name: "Bellflower", slug: "bellflower", note: "Auto & SR-22 specialists" },
    { name: "Cerritos", slug: "cerritos", note: "605 & 91 corridor coverage" },
    { name: "Lakewood", slug: "lakewood", note: "Home & auto bundles" },
    { name: "Paramount", slug: "paramount", note: "Commercial & fleet coverage" },
    { name: "Lynwood", slug: "lynwood", note: "Multilingual service" },
    { name: "South Gate", slug: "south-gate", note: "No-license programs available" },
    { name: "Pico Rivera", slug: "pico-rivera", note: "Foreign-license specialists" },
    { name: "Montebello", slug: "montebello", note: "Home & renters coverage" },
    { name: "Commerce", slug: "commerce", note: "Commercial auto & BOP" },
    { name: "Whittier", slug: "whittier", note: "SR-22 same-day filing" },
  ];

  return (
    <section className="sp bg-white" id="service-areas">
      <div className="container">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Service Areas</span>
          <h2 className="mt-3 display-2 text-slate-900">
            Serving southeast Los Angeles County
          </h2>
          <p className="mt-3 text-slate-500">
            One call covers the whole region. We compare 30+ carriers for drivers, homeowners, and businesses across 12 cities in the 605 and 91 corridors.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" gap={0.03}>
          {cities.map((city) => (
            <StaggerChild key={city.slug}>
              <NavLink
                to={`/insurance/${city.slug}`}
                className="block h-full bg-slate-50 rounded-2xl p-4 ring-1 ring-slate-200/80 hover:ring-brand-300 hover:shadow-soft hover:-translate-y-0.5 transition-all"
              >
                <div className="font-bold text-slate-900 text-[15px]">
                  {city.name}
                </div>
                <div className="mt-1 text-[12px] text-slate-500 leading-snug">{city.note}</div>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-brand-700">
                  See coverage
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                </div>
              </NavLink>
            </StaggerChild>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-7 text-center">
          <NavLink to="/locations" className="btn btn-outline group">
            View our Downey office location
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </NavLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════ */
export default function Home() {
  usePageMeta({
    title: "Insurance Broker Downey CA — Free Quote | Original Insurance",
    description: "Tired of paying too much? We compare 30+ carriers for Downey drivers — auto, home, SR-22, no-license programs. 4.9★ rated, bilingual staff. Free quote in minutes.",
    canonical: "https://originalinsurance.net/",
  });


  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <Hero />
      <div className="bg-white border-b border-slate-100 py-4 text-slate-600">
        <div className="container">
          <TrustStrip />
        </div>
      </div>
      <ServicesMasonry />
      <InsuranceWorkflow tone="light" />
      <AboutSplit />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <CTASection
        title="Ready to compare 30+ carriers?"
        lede="Get a personalized quote from a licensed Downey broker. Call, text, or start online."
        secondaryLabel={`Call ${site.contact.phone}`}
      />
    </main>
  );
}
