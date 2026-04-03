import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { site } from "../lib/site";
import { images } from "../lib/images";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { Counter } from "../components/AnimatedCounter";
import { MagneticButton } from "../components/MagneticButton";

import storefrontImg from "../assets/storefront.png";
import logoBadge from "../assets/logo-badge.png";

const OFFICE = { street: "9907-B Paramount Blvd", city: "Downey", region: "CA", zip: "90240" } as const;

/* ═══════════════════════════════════════════════
   HERO — Premium gradient mesh + parallax depth
   ═══════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={ref} className="relative hero-mesh overflow-hidden">
      {/* Floating ambient shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[8%] w-40 h-40 rounded-full bg-gold-400/[0.07] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 right-[15%] w-56 h-56 rounded-full bg-brand-500/[0.08] blur-3xl"
      />

      {/* Decorative grid lines (subtle) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <motion.div style={{ y: bgY }} className="container relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-24 pb-16 lg:pt-28 lg:pb-16">
        {/* ── Left: Copy ── */}
        <div className="max-w-xl">
          {/* Trust badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
              <span className="text-white/90 text-sm font-semibold">Downey's Trusted Broker Since 1999</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="display-1 text-white"
          >
            Insurance that{" "}
            <span className="relative inline-block">
              <span className="relative z-10">works for you</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.path
                  d="M2 10C100 5 200 5 298 10"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 text-lg text-blue-100 leading-relaxed"
          >
            We compare 30+ carriers to find you the best rate. Real people, real savings, real fast.
            <span className="block mt-2 text-gold-400 font-semibold">No license? No problem.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 flex flex-col sm:flex-row gap-3"
          >
            <MagneticButton as="a" className="inline-block">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg group">
                Get Your Free Quote
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </button>
            </MagneticButton>
            <MagneticButton as="a" className="inline-block" strength={0.2}>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                Call {site.contact.phone}
              </a>
            </MagneticButton>
          </motion.div>

          {/* Trust signals — compact inline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {[
              { icon: <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 6v6c0 5 3.6 8.7 8 10 4.4-1.3 8-5 8-10V6l-8-4z" /></svg>, text: "Licensed CA Broker" },
              { icon: <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>, text: "4.9\u2605 Google Rating" },
              { icon: <svg className="w-4 h-4 text-brand-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>, text: "3 Languages Spoken" },
            ].map((b, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-1.5 text-[13px] text-blue-100 cursor-default"
              >
                {b.icon}
                {b.text}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Image with floating elements ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block lg:ml-auto"
        >
          {/* Background glow behind image */}
          <div className="absolute -inset-8 bg-gradient-to-br from-brand-500/20 via-transparent to-gold-400/10 rounded-[40px] blur-2xl" />

          <motion.div style={{ y: imgY }} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-heavy ring-1 ring-white/10">
              <img src={images.hero.meeting} alt="Professional insurance consultation at Original Insurance" className="w-full h-auto object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-brand-950/10" />
            </div>

            {/* Floating badge — Top right: Response time */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 bg-white rounded-xl shadow-heavy p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Avg. Response</div>
                  <div className="text-lg font-bold text-gray-900">Under 1 Hour</div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — Bottom left: Carriers */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-6 left-6 bg-white rounded-xl shadow-heavy p-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-600 rounded-full" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">30+</div>
                  <div className="text-xs text-gray-600">Carriers Compared</div>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Decorative blurs */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl -z-10" />
        </motion.div>
      </motion.div>

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
        <Stagger className="grid grid-cols-12 gap-3 lg:gap-4">
          {/* Big featured card — years in business */}
          <StaggerChild className="col-span-12 md:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full bg-brand-900 rounded-2xl p-7 text-white flex flex-col justify-between ring-1 ring-brand-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-700/30 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-400/10 rounded-full -ml-12 -mb-12" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-gold-400/15 text-gold-400 px-3 py-1 rounded-full text-[11px] font-bold mb-3">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                  ESTABLISHED
                </div>
                <div className="text-5xl md:text-6xl font-extrabold tracking-tight">
                  <Counter to={25} suffix="+" />
                </div>
                <div className="mt-2 text-lg font-medium text-white/90">Years in Business</div>
              </div>
              <div className="mt-5 flex items-center gap-2 relative">
                <img src={logoBadge} alt="" className="h-7 w-7 object-contain" />
                <span className="text-[11px] text-white/60">Since 1999, Downey CA</span>
              </div>
            </motion.div>
          </StaggerChild>

          {/* Right side — 2x2 grid */}
          <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-3 lg:gap-4">
            {/* Carriers */}
            <StaggerChild>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft flex flex-col hover:ring-brand-200 transition-colors"
              >
                <div className="text-3xl font-extrabold text-brand-800 tracking-tight">
                  <Counter to={30} suffix="+" />
                </div>
                <div className="mt-1 text-sm font-medium text-slate-700">Insurance Carriers</div>
                <div className="mt-auto pt-3 text-[11px] text-slate-400">We shop them all for you</div>
              </motion.div>
            </StaggerChild>

            {/* Rating — FIXED: 4.9, no broken entity */}
            <StaggerChild>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft flex flex-col hover:ring-brand-200 transition-colors"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-brand-800 tracking-tight">4.9</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                    ))}
                  </div>
                </div>
                <div className="mt-1 text-sm font-medium text-slate-700">Google Reviews</div>
                <div className="mt-auto pt-3 text-[11px] text-slate-400">From real clients</div>
              </motion.div>
            </StaggerChild>

            {/* Languages — full width accent card */}
            <StaggerChild className="col-span-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-gold-500 to-gold-400 rounded-2xl p-5 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-1/2 w-20 h-20 bg-white/5 rounded-full -mb-10" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-brand-950">3 Languages</div>
                    <div className="mt-1 text-sm text-brand-900/70">We speak your language</div>
                  </div>
                  <div className="flex gap-2">
                    {["Arabic", "Spanish", "English"].map((l) => (
                      <span key={l} className="text-[11px] font-semibold bg-white/25 text-brand-950 rounded-full px-2.5 py-1">{l}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerChild>
          </div>
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
  auto: { src: images.services.auto, alt: "Car keys being handed over" },
  home: { src: images.services.home, alt: "House with keys" },
  life: { src: images.services.life, alt: "Family outdoors" },
  commercial: { src: images.services.commercial, alt: "Business documents" },
  moto: { src: images.services.motorcycle, alt: "Motorcycle on road" },
  rec: { src: images.services.rv, alt: "RV at campsite" },
};

function ServicesMasonry() {
  const items = useMemo(() => (site.services as Svc[]).slice(0, 6), []);

  const spans = [
    "sm:col-span-2 sm:row-span-2",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-2 sm:row-span-1",
  ];

  return (
    <section className="sp bg-white" id="main-content">
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

        <Stagger className="mt-10 grid sm:grid-cols-3 gap-3 auto-rows-[minmax(180px,auto)]" gap={0.06}>
          {items.map((s, i) => {
            const title = s.title ?? s.name ?? s.key;
            const blurb = s.blurb ?? s.desc ?? "";
            const img = serviceImages[s.key];
            const isBig = i === 0;

            return (
              <StaggerChild key={s.key} className={spans[i] || ""}>
                <NavLink
                  to="/contact"
                  className={`service-card group relative flex flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-slate-200/80 hover:shadow-lifted hover:ring-slate-300 h-full ${isBig ? "min-h-[340px]" : "min-h-[180px]"}`}
                >
                  {img && (
                    <>
                      <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/30 to-transparent" />
                    </>
                  )}
                  {!img && (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-600" />
                  )}

                  <div className="relative p-5">
                    <h3 className={`font-bold text-white ${isBig ? "text-2xl" : "text-lg"}`}>{title}</h3>
                    <p className={`mt-1 text-white/60 leading-relaxed ${isBig ? "text-sm max-w-md" : "text-[13px] line-clamp-2"}`}>{blurb}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-gold-400 group-hover:gap-2 transition-all">
                      Get a quote
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </NavLink>
              </StaggerChild>
            );
          })}
        </Stagger>

        <Reveal delay={0.2} className="mt-6">
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
      new URL(`../assets/clients/client-${i + 1}.png`, import.meta.url).href
    ), []);
  const row = [...logos, ...logos];

  return (
    <section className="py-8 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mb-4">
        <Reveal className="text-center">
          <p className="text-sm text-slate-400">
            We shop <span className="font-semibold text-slate-700">30+ carriers</span> to find your best fit
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="overflow-hidden py-2 select-none" style={{ "--marquee-speed": "35s" } as any}>
          <div className="flex w-max animate-marquee">
            {row.map((src, i) => (
              <div key={i} className="shrink-0 mx-3 w-[180px] h-20 rounded-xl bg-white ring-1 ring-slate-100 grid place-items-center">
                <img src={src} alt={`Partner ${(i % logos.length) + 1}`} className="h-10 w-auto max-w-[140px] object-contain" loading="lazy" draggable={false} />
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
    <section className="sp bg-slate-25 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-brand-100/40 rounded-full blur-3xl opacity-50" />

      <div className="container relative">
        <Reveal className="text-center max-w-xl mx-auto">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-3 display-2 text-slate-900">Your quote in three steps</h2>
          <p className="mt-2 text-slate-500">
            No pressure, no spam — just straight answers from a licensed broker.
          </p>
        </Reveal>

        <div className="mt-12 max-w-3xl mx-auto relative">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-brand-200 via-brand-300 to-brand-100 hidden md:block" aria-hidden />

          <Stagger className="space-y-8 md:space-y-10">
            {steps.map((s, i) => (
              <StaggerChild key={i}>
                <div className="flex gap-5 md:gap-8 items-start">
                  <div className="shrink-0 relative z-10 w-14 h-14 rounded-2xl bg-brand-700 text-white grid place-items-center text-xl font-extrabold shadow-md shadow-brand-700/20">
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

        <Reveal delay={0.2} className="mt-10 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 text-[13px] text-slate-400">
            {["Average call ~10 min", "Most quotes same day", "Same-day eID cards"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
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
    <section className="sp bg-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal direction="left" className="relative">
            <div className="rounded-3xl overflow-hidden shadow-heavy ring-1 ring-slate-100 aspect-[4/3]">
              <img src={images.about.handshake} alt="Handshake after coverage discussion" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 -right-3 lg:-right-6 rounded-2xl overflow-hidden shadow-heavy ring-1 ring-slate-100 w-44 h-32">
              <img src={storefrontImg} alt="Original Insurance storefront" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-950/80 to-transparent px-3 py-2">
                <p className="text-[10px] font-semibold text-white">Our Downey office</p>
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
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-50 ring-1 ring-emerald-200 grid place-items-center">
                    <svg className="w-3 h-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
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
    <section className="sp bg-slate-25 overflow-hidden">
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

            <div className="mt-6 bg-brand-900 rounded-2xl p-6 text-white ring-1 ring-brand-800">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-white/85">
                &ldquo;{reviews[0].quote}&rdquo;
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
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 gap-3">
            {reviews.slice(1).map((r, i) => (
              <StaggerChild key={i}>
                <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200/80 shadow-xs h-full flex flex-col hover:shadow-soft hover:ring-slate-300 transition-all">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3 h-3 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-slate-600 leading-relaxed flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 grid place-items-center text-[10px] font-bold text-slate-600">
                      {r.name.charAt(0)}
                    </div>
                    <span className="text-[12px] font-medium text-slate-700">{r.name}</span>
                    <span className="text-[11px] text-slate-300 ml-auto">Google</span>
                  </div>
                </div>
              </StaggerChild>
            ))}
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
    <section className="relative overflow-hidden">
      <img src={images.claims.docs} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-brand-950/90" />

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
          <div className="mt-6 text-sm text-white/60">
            <strong className="text-white/80">También hablamos español</strong> &middot; <strong className="text-white/80">نتحدث العربية</strong>
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
    <section className="sp bg-white">
      <div className="container max-w-2xl">
        <Reveal className="text-center mb-10">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 display-2 text-slate-900">Common questions</h2>
        </Reveal>

        <div className="space-y-2">
          {qa.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-xl ring-1 ring-slate-200/80 overflow-hidden bg-white hover:ring-slate-300 transition-colors">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-slate-800 pr-4 text-[15px]">{item.q}</span>
                  <motion.svg
                    animate={{ rotate: openIdx === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-slate-300 shrink-0"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-slate-500 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 100, opacity: show ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 inset-x-0 z-40 pointer-events-none"
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
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════ */
export default function Home() {
  usePageMeta({
    title: "Original Insurance Services | Independent Insurance Broker Downey CA",
    description: "Downey's trusted insurance broker since 1999. Compare 30+ carriers for auto, home, life & business insurance. Bilingual service in English, Spanish & Arabic. Call (310) 538-8666 for a free quote.",
    canonical: "https://originalinsurance.net/",
  });

  useEffect(() => {
    // Business structured data
    const bizEl = document.createElement("script");
    bizEl.type = "application/ld+json";
    bizEl.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: site.name,
      image: `${window.location.origin}/logo.png`,
      url: window.location.origin,
      telephone: site.contact.phone,
      email: site.contact.email,
      description: "Independent insurance brokerage in Downey, CA comparing 30+ carriers for auto, home, life, commercial, motorcycle, and recreational vehicle insurance. Bilingual service in English, Spanish, and Arabic since 1999.",
      address: {
        "@type": "PostalAddress",
        streetAddress: OFFICE.street,
        addressLocality: OFFICE.city,
        addressRegion: OFFICE.region,
        postalCode: OFFICE.zip,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: 33.9403, longitude: -118.1331 },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "10:00", closes: "17:30" },
      ],
      priceRange: "$$",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", reviewCount: "47" },
      areaServed: [
        { "@type": "City", name: "Downey" },
        { "@type": "City", name: "Norwalk" },
        { "@type": "City", name: "Bellflower" },
        { "@type": "City", name: "Paramount" },
        { "@type": "City", name: "Lynwood" },
        { "@type": "City", name: "Cerritos" },
        { "@type": "City", name: "Whittier" },
        { "@type": "City", name: "Lakewood" },
        { "@type": "City", name: "South Gate" },
        { "@type": "State", name: "California" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Insurance Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auto Insurance", description: "Comprehensive auto insurance including liability, collision, SR-22 filing, and no-license programs" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home & Renters Insurance", description: "Home and renters insurance coverage with bundle discounts" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Insurance", description: "Business insurance including general liability, BOP, commercial auto, workers compensation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Life Insurance", description: "Term and whole life insurance options starting at $20/month" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motorcycle Insurance", description: "Coverage for motorcycle riders with gear protection" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recreational Vehicle Insurance", description: "RV, boat, and specialty vehicle coverage" } },
        ],
      },
      knowsLanguage: ["en", "es", "ar"],
      sameAs: [
        "https://www.facebook.com/157258154314691/",
        "https://www.linkedin.com/company/original-insurance-services/",
      ],
    });
    document.head.appendChild(bizEl);

    // FAQ structured data
    const faqEl = document.createElement("script");
    faqEl.type = "application/ld+json";
    faqEl.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How fast can I get a quote?", acceptedAnswer: { "@type": "Answer", text: "Many quotes are same-day. For specialty lines or complex risks, usually 24-48 hours." } },
        { "@type": "Question", name: "Do you offer free SR-22 filings?", acceptedAnswer: { "@type": "Answer", text: "Yes — free SR-22 filing with qualifying auto policies." } },
        { "@type": "Question", name: "Can you help me after I buy?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Policy changes, claims guidance, renewal checkups — we're here." } },
        { "@type": "Question", name: "Which carriers do you work with?", acceptedAnswer: { "@type": "Answer", text: "30+ carriers across personal and commercial lines. Availability varies by risk and location." } },
        { "@type": "Question", name: "Do I need a driver's license to get insurance?", acceptedAnswer: { "@type": "Answer", text: "No — we can help customers without a driver's license get the coverage they need." } },
      ],
    });
    document.head.appendChild(faqEl);

    return () => { bizEl.remove(); faqEl.remove(); };
  }, []);

  return (
    <>
      <StickyRibbon />
      <Hero />
      <BentoStats />
      <ServicesMasonry />
      <Carriers />
      <HowItWorks />
      <AboutSplit />
      <Testimonials />
      <ClaimsCTA />
      <FAQ />
    </>
  );
}
