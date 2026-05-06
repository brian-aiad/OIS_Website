import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { images, srcset } from "../lib/images";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { Counter } from "../components/AnimatedCounter";
import { MagneticButton } from "../components/MagneticButton";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import ReviewBadge from "../components/seo/ReviewBadge";
import TrustStrip from "../components/seo/TrustStrip";

import storefrontImg from "../assets/storefront.webp";

/* ═══════════════════════════════════════════════
   HERO — Photo-based with full-bleed storefront background
   ═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden noise-overlay diagonal-pattern">
      {/* Full-bleed background photo (storefront) */}
      <img
        src={storefrontImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        width={1200}
        height={800}
      />
      {/* Navy overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(6,14,31,0.82)" }} />
      {/* Soft gradient sweetener for legibility on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/65 to-brand-900/30" />

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
            className="w-full max-w-[400px] rounded-2xl p-7 relative"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderTop: "2px solid #F5A623",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
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
   STATS — Bento grid with visual hierarchy
   ═══════════════════════════════════════════════ */
function BentoStats() {
  return (
    <section className="relative -mt-1 z-10 pb-10">
      <div className="container">
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {/* 25+ Years — compact navy card, same height as siblings */}
          <StaggerChild>
            <div
              className="h-full bg-brand-900 rounded-2xl p-6 text-white ring-1 ring-brand-800 hover:-translate-y-1 hover:shadow-heavy transition-all duration-200 flex flex-col"
              style={{ minHeight: "150px" }}
            >
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                  <Counter to={25} suffix="+" />
                </span>
              </div>
              <div className="mt-1 text-sm font-medium text-white/90">Years in Business</div>
              <div className="mt-auto pt-3 flex items-center gap-2">
                <div className="h-px w-8" style={{ background: "var(--gold-500)" }} />
                <span className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Since 1999 · Downey CA</span>
              </div>
            </div>
          </StaggerChild>

          {/* Carriers */}
          <StaggerChild>
            <div
              className="h-full bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft flex flex-col hover:ring-brand-200 hover:-translate-y-1 transition-all duration-200"
              style={{ minHeight: "150px" }}
            >
              <div className="text-4xl font-extrabold text-brand-800 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                <Counter to={30} suffix="+" />
              </div>
              <div className="mt-1 text-sm font-medium text-slate-700">Insurance Carriers</div>
              <div className="mt-auto pt-3 text-[11px] text-slate-500">We shop them all for you</div>
            </div>
          </StaggerChild>

          {/* Rating */}
          <StaggerChild>
            <div
              className="h-full bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft flex flex-col hover:ring-brand-200 hover:-translate-y-1 transition-all duration-200"
              style={{ minHeight: "150px" }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-brand-800 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                  ))}
                </div>
              </div>
              <div className="mt-1 text-sm font-medium text-slate-700">Google Reviews</div>
              <div className="mt-auto pt-3 text-[11px] text-slate-500">From real clients</div>
            </div>
          </StaggerChild>

          {/* Languages — full-width gold card */}
          <StaggerChild className="md:col-span-3">
            <div className="bg-gradient-to-r from-gold-500 to-gold-400 rounded-2xl p-6 text-white relative overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-2xl font-extrabold text-brand-950" style={{ fontFamily: "var(--font-display)" }}>3 Languages</div>
                  <div className="mt-1 text-sm text-brand-900/70">We speak your language</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Arabic", "Spanish", "English"].map((l) => (
                    <span key={l} className="text-[11px] font-semibold bg-white/25 text-brand-950 rounded-full px-2.5 py-1">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </StaggerChild>
        </Stagger>
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
    <section className="sp" style={{ background: "var(--surface-gray)" }} id="main-content">
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
   CARRIERS MARQUEE — logos at full color
   ═══════════════════════════════════════════════ */
function Carriers() {
  const logos = useMemo(() =>
    Array.from({ length: 8 }, (_, i) =>
      new URL(`../assets/clients/client-${i + 1}.webp`, import.meta.url).href
    ), []);
  const row = [...logos, ...logos];

  return (
    <section className="py-6 md:py-7 overflow-hidden cv-auto" style={{ background: "var(--surface-gray)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
      <div className="container mb-3">
        <Reveal className="text-center">
          <p className="text-[13px] font-semibold text-slate-500">
            We shop <span className="text-slate-800">30+ carriers</span> to find your best fit
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        <div className="overflow-hidden py-1 select-none" style={{ "--marquee-speed": "35s" } as any}>
          <div className="flex w-max animate-marquee items-center">
            {row.map((src, i) => (
              <div key={i} className="shrink-0 mx-4 w-[160px] h-16 grid place-items-center">
                <img
                  src={src}
                  alt={`Insurance carrier partner logo ${(i % logos.length) + 1}`}
                  className="max-h-10 w-auto max-w-[140px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  width={140}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   HOW IT WORKS — Visual numbered flow
   ═══════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { title: "Tell us about you", desc: "A few basics — vehicles, property, current coverage. Takes about 10 minutes." },
    { title: "We shop 30+ carriers", desc: "We compare coverage, discounts, and price across our full network." },
    { title: "Choose with confidence", desc: "We explain options in plain language, then help bind and deliver your policy." },
  ];

  return (
    <section className="sp bg-slate-25 relative overflow-hidden cv-auto-tall">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-brand-100/40 rounded-full blur-3xl opacity-50" />

      <div className="container relative">
        <Reveal className="text-center max-w-xl mx-auto">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-3 display-2 text-slate-900">Your quote in three steps</h2>
          <p className="mt-2 text-slate-500">
            No pressure, no spam — just straight answers from a licensed broker.
          </p>
        </Reveal>

        <div className="mt-12 max-w-2xl mx-auto relative">
          <div
            className="absolute left-7 top-6 bottom-6 hidden md:block"
            style={{ borderLeft: "2px dashed rgba(15,33,71,0.18)" }}
            aria-hidden
          />

          <Stagger className="space-y-8 md:space-y-10">
            {steps.map((s, i) => (
              <StaggerChild key={i}>
                <div className="flex gap-5 md:gap-8 items-start">
                  <div
                    className="shrink-0 relative z-10 w-14 h-14 rounded-2xl bg-brand-800 text-white grid place-items-center text-xl font-extrabold"
                    style={{ boxShadow: "0 0 0 4px rgba(245,166,35,0.15), 0 4px 14px rgba(15,33,71,0.18)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-1.5 text-slate-500 leading-relaxed max-w-md">{s.desc}</p>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <div
            className="inline-flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-slate-700 px-5 py-3 rounded-full bg-white"
            style={{ border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}
          >
            {["Average call ~10 min", "Most quotes same day", "Same-day eID cards"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-100 text-gold-600 grid place-items-center ring-1 ring-gold-400/30">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                {t}
              </span>
            ))}
          </div>
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
                src={images.about.handshake}
                srcSet={srcset(images.about.handshake)}
                sizes="(max-width: 1024px) 100vw, 600px"
                alt="Original Insurance broker shaking hands with a new client in Downey, CA"
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
              <img src={storefrontImg} alt="Original Insurance Services storefront on Paramount Blvd, Downey, CA" className="h-full w-full object-cover" loading="lazy" />
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
              {/* Decorative open quote */}
              <span
                aria-hidden
                className="absolute top-2 left-4 select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "110px",
                  lineHeight: 1,
                  color: "rgba(245,166,35,0.18)",
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
                "from-emerald-500 to-emerald-700",
                "from-rose-500 to-rose-700",
                "from-violet-500 to-violet-700",
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
   CLAIMS CTA — Full bleed with overlay
   ═══════════════════════════════════════════════ */
function ClaimsCTA() {
  return (
    <section className="relative overflow-hidden hero-mesh noise-overlay cv-auto">
      {/* Decorative ambient glows — replaces the off-brand background photo */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container relative sp text-center">
        <Reveal>
          <span className="eyebrow-light">Claims Support</span>
          <h2 className="mt-3 display-2 text-white max-w-2xl mx-auto">
            Need help with a claim? We've got your back.
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
            We'll help you report, document, and follow up — even after hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={site.contact.phoneHref} className="btn btn-accent btn-lg">
              Call {site.contact.phone}
            </a>
            <NavLink to="/contact" className="btn btn-ghost-light btn-lg">
              Send a Message
            </NavLink>
          </div>
          <div className="mt-7 text-base text-white/60 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <strong className="text-white/85 font-medium">También hablamos español</strong>
            <span className="text-white/30">·</span>
            <strong className="text-white/85 font-medium">نتحدث العربية</strong>
          </div>
        </Reveal>
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
    <section className="sp bg-white cv-auto-tall">
      <div className="container max-w-2xl">
        <Reveal className="text-center mb-10">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 display-2 text-slate-900">Common questions</h2>
        </Reveal>

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
    </section>
  );
}

/* ═══════════════════════════════════════════════
   STICKY RIBBON
   ═══════════════════════════════════════════════ */
function StickyRibbon() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > window.innerHeight * 0.65);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      className="fixed bottom-4 inset-x-0 z-40 pointer-events-none transition-all duration-300"
      style={{
        transform: show ? "translateY(0)" : "translateY(120%)",
        opacity: show ? 1 : 0,
      }}
    >
      <div className="container">
        <div className="pointer-events-auto flex items-center justify-between gap-4 bg-brand-900/95 backdrop-blur-lg text-white rounded-2xl px-5 py-3 shadow-heavy ring-1 ring-white/10">
          <p className="text-sm font-medium hidden sm:block">Ready for a better rate?</p>
          <div className="flex gap-2 w-full sm:w-auto">
            <a className="btn btn-ghost-light btn-sm flex-1 sm:flex-initial justify-center" href={site.contact.phoneHref}>
              Call Now
            </a>
            <button className="btn btn-accent btn-sm flex-1 sm:flex-initial justify-center" onClick={openQuoteModal}>
              Free Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   POPULAR INSURANCE NEEDS HUB
   ═══════════════════════════════════════════════ */
function ProductShowcase() {
  const products = [
    { badge: "Same-day",    title: "SR-22 Insurance",         value: "Same-day filing, $15–$25 fee",          to: "/sr22-insurance-downey" },
    { badge: "30+ carriers", title: "Auto Insurance",         value: "Liability, full coverage, SR-22",        to: "/auto-insurance-downey-ca" },
    { badge: "ITIN OK",    title: "No-License Auto",          value: "Foreign license, ITIN, international",  to: "/no-license-auto-insurance-downey" },
    { badge: "Fleets",     title: "Commercial Auto",          value: "BOP, GL, hired/non-owned, fleet",        to: "/commercial-auto-insurance-downey" },
    { badge: "Bundle",     title: "Homeowners Insurance",     value: "Bundle with auto for 10–15% savings",   to: "/services" },
    { badge: "Walls-in",   title: "Condo Insurance",          value: "Interior coverage for condo owners",    to: "/services" },
    { badge: "Affordable", title: "Motorcycle Insurance",     value: "Gear and accessory coverage included",  to: "/services" },
    { badge: "Term",       title: "Life Insurance",           value: "Affordable family protection options",  to: "/services" },
    { badge: "Low down",   title: "Low Down Payment Auto",    value: "Drive today for less upfront",          to: "/auto-insurance-downey-ca" },
    { badge: "Coverage",   title: "Final Expense Insurance",  value: "Funeral and burial cost coverage",      to: "/services" },
  ];

  return (
    <section className="sp bg-slate-50" id="products">
      <div className="container">
        <Reveal>
          <span className="eyebrow">What We Cover</span>
          <h2 className="mt-3 display-2 text-slate-900 max-w-2xl">
            10 coverage types, one Downey office
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl leading-relaxed">
            Independent broker means we compare 30+ carriers across every line. Call, text, or walk in — we handle it all from one location.
          </p>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3" gap={0.03}>
          {products.map((p, i) => (
            <StaggerChild key={i}>
              <NavLink
                to={p.to}
                className="block h-full bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:ring-brand-300 hover:-translate-y-0.5 transition-all"
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 rounded-full px-2 py-0.5 mb-3">
                  {p.badge}
                </span>
                <h3 className="font-bold text-slate-900 text-[14px] mb-1 leading-snug">{p.title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{p.value}</p>
              </NavLink>
            </StaggerChild>
          ))}
        </Stagger>
        <Reveal delay={0.1} className="mt-6 text-center">
          <NavLink to="/services" className="text-[13px] font-medium text-brand-700 hover:text-brand-900 hover:underline transition-colors">
            View all services & coverage details →
          </NavLink>
        </Reveal>
      </div>
    </section>
  );
}

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
    <>
      <LocalBusinessSchema />
      <StickyRibbon />
      <Hero />
      <div className="bg-white border-b border-slate-100 py-4 text-slate-600">
        <div className="container">
          <TrustStrip />
        </div>
      </div>
      <BentoStats />
      <ProductShowcase />
      <ServicesMasonry />
      <Carriers />
      <HowItWorks />
      <AboutSplit />
      <Testimonials />
      <ClaimsCTA />
      <ServiceAreas />
      <FAQ />
    </>
  );
}
