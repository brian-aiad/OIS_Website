import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { Counter } from "../components/AnimatedCounter";

import { images } from "../lib/images";
import storefrontImg from "../assets/storefront.png";
import logoBadge from "../assets/logo-badge.png";

export default function About() {
  usePageMeta({
    title: "About Us | 25+ Years Serving Downey CA | Original Insurance",
    description: "Learn about Original Insurance Services — Downey's independent insurance broker since 1999. Family-owned, bilingual team serving the community with personalized coverage from 30+ carriers.",
    canonical: "https://originalinsurance.net/about",
  });

  return (
    <main id="main-content">
      {/* ── Premium Header ── */}
      <section className="relative hero-mesh overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

        <div className="container relative pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
                  <NavLink to="/" className="hover:text-white transition-colors">Home</NavLink>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  <span className="text-white font-medium">About</span>
                </nav>

                <h1 className="display-1 text-white">
                  Insurance built on{" "}
                  <span className="relative whitespace-nowrap">
                    relationships
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 286 8" fill="none" aria-hidden>
                      <path d="M2 5.5c50-4 120-4 282 0" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
                <p className="mt-5 text-lg text-white/80 max-w-lg">
                  {site.description}
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-heavy aspect-[4/3]">
                <img src={images.about.handshake} alt="Handshake after coverage review" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="wave-divider">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="white">
            <path d="M0 30C240 50 480 20 720 30C960 40 1200 20 1440 30V60H0V30Z" />
          </svg>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section className="relative z-10 py-14">
        <div className="container">
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { to: 25, suffix: "+", label: "Years serving CA", note: "Since 1999" },
              { to: 30, suffix: "+", label: "Carriers quoted", note: "Best fit, best price" },
              { to: 4, suffix: ".9\u2605", label: "Google rating", note: "Verified reviews", raw: true },
              { to: 3, suffix: "", label: "Languages", note: "AR \u00b7 ES \u00b7 EN" },
            ].map((s) => (
              <StaggerChild key={s.label}>
                <div className="bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-brand-800">
                    {s.raw ? <>{s.to}{s.suffix}</> : <Counter to={s.to} suffix={s.suffix} />}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-700">{s.label}</div>
                  <div className="mt-0.5 text-[11px] text-slate-400">{s.note}</div>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Mission, Values, Promise ── */}
      <section className="sp bg-white">
        <div className="container">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 ring-1 ring-brand-100">What Drives Us</span>
            <h2 className="display-2 text-slate-900">Our mission, values &amp; promise</h2>
            <p className="mt-3 text-slate-500">
              We make insurance simple and transparent by doing the heavy lifting: shopping multiple carriers, explaining coverages in plain language, and advocating for you at claim time.
            </p>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <svg className="w-6 h-6 text-brand-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 6v6c0 5 3.6 8.7 8 10 4.4-1.3 8-5 8-10V6l-8-4z" /></svg>,
                title: "Clarity over jargon",
                desc: "Plain-language guidance, not insurance speak. We make it easy to understand what you're buying.",
                bg: "bg-brand-50",
              },
              {
                icon: <svg className="w-6 h-6 text-gold-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" /></svg>,
                title: "Real responsiveness",
                desc: "Local team, not a call center. We answer, we call back, we follow up.",
                bg: "bg-gold-50",
              },
              {
                icon: <svg className="w-6 h-6 text-brand-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8.5-5.6-8.5-11c0-2.9 2.3-5 5-5 1.9 0 3.1.9 3.5 1.7.4-.8 1.6-1.7 3.5-1.7 2.7 0 5 2.1 5 5 0 5.4-8.5 11-8.5 11z" /></svg>,
                title: "Unbiased options",
                desc: "No brand quotas. We work for you, not one company, so you get honest recommendations.",
                bg: "bg-brand-50",
              },
              {
                icon: <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>,
                title: "Claims advocacy",
                desc: "Guidance through the process and follow-up — even after hours if needed.",
                bg: "bg-emerald-50",
              },
            ].map((v) => (
              <StaggerChild key={v.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted transition-all"
                >
                  <div className={`w-12 h-12 ${v.bg} rounded-xl grid place-items-center mb-4 ring-1 ring-slate-200/40`}>
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="sp bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-20 items-start">
            <Reveal direction="left">
              <span className="inline-block bg-gold-100 text-gold-600 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4">Our Story</span>
              <h2 className="display-2 text-slate-900">
                From a small Downey office to 30+ carrier partners
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                We opened our doors in 1999 to give neighbours a better way to buy insurance:
                unbiased options, friendly explanations, and real help when life happens.
                Today we serve clients across California — in English, Spanish, and Arabic —
                with the same personal service we started with.
              </p>
              <div className="mt-6 rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-soft">
                <img src={storefrontImg} alt="Original Insurance storefront in Downey" className="w-full h-auto object-cover" loading="lazy" />
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div className="relative pl-8 lg:pl-10">
                <div className="absolute left-3 lg:left-4 top-3 bottom-3 w-px bg-gradient-to-b from-brand-300 via-brand-200 to-transparent" aria-hidden />
                <div className="space-y-10">
                  {[
                    { year: "1999", title: "Founded", desc: "Original Insurance opens in Downey, CA with a mission to offer unbiased, multi-carrier coverage.", color: "bg-brand-600" },
                    { year: "2007", title: "Expanded", desc: "Carrier network grows significantly. Commercial lines added — general liability, BOP, workers' comp.", color: "bg-brand-600" },
                    { year: "2016", title: "Digital", desc: "Digital services launch — eID cards, text support, email quotes. Faster than ever.", color: "bg-gold-500" },
                    { year: "Today", title: "Thriving", desc: "30+ carriers. Thousands of families and businesses served across California, in three languages.", color: "bg-emerald-500" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="relative"
                    >
                      <div className={`absolute -left-8 lg:-left-10 top-2 w-3 h-3 rounded-full ${item.color} ring-4 ring-white`} />
                      <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200/80 shadow-soft">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">{item.year}</span>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Broker vs Agent comparison ── */}
      <section className="sp bg-white">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-12">
            <span className="inline-block bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 ring-1 ring-brand-100">Why Choose a Broker</span>
            <h2 className="display-2 text-slate-900">Independent broker vs. single-carrier agent</h2>
            <p className="mt-3 text-slate-500">
              We work for <em>you</em>, not one insurance company. Here's what that means:
            </p>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl ring-1 ring-slate-200/80 overflow-hidden shadow-lifted comparison-table-wrap">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-4 font-semibold text-slate-600"></th>
                    <th className="p-4 text-center bg-brand-50/50">
                      <div className="flex flex-col items-center gap-1">
                        <img src={logoBadge} alt="" className="h-8 w-8 object-contain" />
                        <span className="font-bold text-brand-800">Us (Broker)</span>
                      </div>
                    </th>
                    <th className="p-4 text-center font-semibold text-slate-500">Single-Carrier Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { label: "Carrier options", us: "30+ carriers", them: "One company only" },
                    { label: "Price comparison", us: "Side-by-side quotes", them: "One price, take it or leave it" },
                    { label: "Advice", us: "Unbiased, for you", them: "Tied to their brand" },
                    { label: "Claims help", us: "We advocate for you", them: "Varies" },
                    { label: "Languages", us: "AR \u00b7 ES \u00b7 EN", them: "Usually EN only" },
                    { label: "Switching carriers", us: "Easy \u2014 we find better", them: "You start over" },
                  ].map((row) => (
                    <tr key={row.label} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium text-slate-700">{row.label}</td>
                      <td className="p-4 text-center bg-brand-50/20">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          {row.us}
                        </span>
                      </td>
                      <td className="p-4 text-center text-slate-400">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="sp-sm bg-slate-50 border-t border-slate-100">
        <div className="container">
          <Reveal className="text-center mb-8">
            <span className="inline-block bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 ring-1 ring-emerald-100">Credentials</span>
            <h2 className="display-2 text-slate-900">Licenses &amp; Affiliations</h2>
          </Reveal>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {["CA DOI Licensed", "IIAB Member", "Better Business Bureau", "Downey Chamber"].map((b) => (
              <StaggerChild key={b}>
                <div className="bg-white rounded-xl p-5 text-center font-semibold text-slate-700 ring-1 ring-slate-200/80 shadow-soft">
                  {b}
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp hero-mesh relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="container relative text-center">
          <Reveal>
            <h2 className="display-2 text-white mb-4">Ready to work with a real broker?</h2>
            <p className="text-lg text-white/80 max-w-md mx-auto mb-8">
              Get a personalised quote from someone who puts your needs first.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">Get a Quote</button>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">Call {site.contact.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
