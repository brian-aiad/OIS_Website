import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { Counter } from "../components/AnimatedCounter";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import ReviewBadge from "../components/seo/ReviewBadge";

import storefrontImg from "../assets/storefront.png";
import logoBadge from "../assets/logo-badge.png";

export default function About() {
  usePageMeta({
    title: "Independent Insurance Broker in Downey CA Since 1999 | Original Insurance",
    description: "Learn why Downey drivers choose an independent broker. Compare 30+ carriers with local multilingual service and claims guidance.",
    canonical: "https://originalinsurance.net/about",
  });

  useEffect(() => {
    const aboutEl = document.createElement("script");
    aboutEl.type = "application/ld+json";
    aboutEl.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Original Insurance Services",
      url: "https://originalinsurance.net/about",
      description: "Family-owned independent insurance broker in Downey, CA serving Southern California since 1999.",
      mainEntity: { "@id": "https://originalinsurance.net/#organization" },
    });
    document.head.appendChild(aboutEl);
    return () => { aboutEl.remove(); };
  }, []);

  return (
    <main id="main-content">
      <LocalBusinessSchema url="https://originalinsurance.net/about" />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "About", url: "https://originalinsurance.net/about" },
      ]} />
      <PageHero
        title="Insurance built on relationships"
        subtitle={site.description}
        breadcrumb="About"
        backgroundImage="/images/handshake-800w.webp"
        overlayGradient="linear-gradient(105deg, rgba(6,14,31,0.92) 0%, rgba(11,30,61,0.82) 50%, rgba(11,30,61,0.65) 100%)"
        imageFilter="contrast(1.08) saturate(0.7) brightness(0.9)"
        rightContent={
          <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-heavy aspect-[4/3] relative">
            <img
              src={storefrontImg}
              alt="Original Insurance Services storefront on Paramount Blvd in Downey, CA"
              className="h-full w-full object-cover"
              width={800}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full ring-1 ring-white/20">
                <svg className="w-3.5 h-3.5 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
                9907-B Paramount Blvd, Downey CA
              </span>
            </div>
          </div>
        }
      />

      {/* ── Stats row ── */}
      <section className="relative z-10 py-14">
        <div className="container">
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { to: 25, suffix: "+", label: "Years serving CA", note: "Since 1999" },
              { to: 30, suffix: "+", label: "Carriers quoted", note: "Best fit, best price" },
              { to: 4, suffix: ".9\u2605", label: "Google rating", note: "Verified reviews", raw: true },
            ].map((s) => (
              <StaggerChild key={s.label}>
                <div className="h-full bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-brand-800">
                    {s.raw ? <>{s.to}{s.suffix}</> : <Counter to={s.to} suffix={s.suffix} />}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-700">{s.label}</div>
                  <div className="mt-0.5 text-[11px] text-slate-400">{s.note}</div>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
          <div className="mt-3">
            <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft text-center">
              <div className="text-3xl font-extrabold tracking-tight text-brand-800">3</div>
              <div className="mt-1 text-sm font-medium text-slate-700">Languages</div>
              <div className="mt-0.5 text-[11px] text-slate-400">Arabic &middot; Spanish &middot; English</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission, Values, Promise ── */}
      <section className="sp bg-white">
        <div className="container">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <span className="eyebrow mb-4">What Drives Us</span>
            <h2 className="display-2 text-slate-900">Our mission, values &amp; promise</h2>
            <p className="mt-3 text-slate-500">
              We make insurance simple and transparent by doing the heavy lifting: shopping multiple carriers, explaining coverages in plain language, and advocating for you at claim time.
            </p>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                // Speech bubble = plain-language communication
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "Clarity over jargon",
                desc: "Plain-language guidance, not insurance speak. We make it easy to understand what you're buying.",
              },
              {
                // Phone = we answer, we call back
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: "Real responsiveness",
                desc: "Local team, not a call center. We answer, we call back, we follow up.",
              },
              {
                // Scales = balance, fairness, unbiased
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                title: "Unbiased options",
                desc: "No brand quotas. We work for you, not one company, so you get honest recommendations.",
              },
              {
                // Shield with check = protection, advocacy
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Claims advocacy",
                desc: "Guidance through the process and follow-up — even after hours if needed.",
              },
            ].map((v) => (
              <StaggerChild key={v.title}>
                <div className="h-full bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-200">
                  <div
                    className="w-12 h-12 rounded-xl grid place-items-center mb-4"
                    style={{ background: "rgba(15,33,71,0.06)", color: "var(--navy-800)" }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>

          <div className="mt-10 flex justify-center">
            <ReviewBadge count={47} />
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="sp bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-20 items-start">
            <Reveal direction="left">
              <span className="eyebrow mb-4">Our Story</span>
              <h2 className="display-2 text-slate-900">
                From a small Downey office to 30+ carrier partners
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                We opened our doors on Paramount Blvd in Downey in 1999, when the Southeast LA community needed a local broker who would compare options honestly instead of pushing a single company's policies. Over 25 years, we have helped thousands of Downey-area families and businesses find the right coverage for auto, home, life, and commercial needs — including SR-22 filings, no-license auto programs, and commercial fleet policies.
              </p>
              <p className="mt-3 text-slate-500 leading-relaxed">
                Today we serve clients across California — in English, Spanish, and Arabic — with the same personal service we started with. If you're looking for{" "}
                <NavLink to="/auto-insurance-downey-ca" className="text-brand-700 hover:underline font-medium">
                  auto insurance in Downey
                </NavLink>
                , our local knowledge of Southeast LA's roads, freeways, and driver profiles means we know which carriers price this market competitively.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div className="relative pl-8 lg:pl-10">
                <div
                  className="absolute left-3 lg:left-4 top-3 bottom-3"
                  style={{ borderLeft: "2px dashed rgba(245,166,35,0.35)" }}
                  aria-hidden
                />
                <div className="space-y-10">
                  {[
                    { year: "1999", title: "Founded", desc: "Original Insurance opens in Downey, CA with a mission to offer unbiased, multi-carrier coverage." },
                    { year: "2007", title: "Expanded", desc: "Carrier network grows significantly. Commercial lines added — general liability, BOP, workers' comp." },
                    { year: "2016", title: "Digital", desc: "Digital services launch — eID cards, text support, email quotes. Faster than ever." },
                    { year: "Today", title: "Thriving", desc: "30+ carriers. Thousands of families and businesses served across California, in three languages." },
                  ].map((item) => (
                    <Reveal key={item.year} direction="right" className="relative">
                      <div
                        className="absolute -left-[34px] lg:-left-[42px] top-2 rounded-full"
                        style={{
                          width: "14px",
                          height: "14px",
                          background: "var(--gold-500)",
                          border: "2px solid white",
                          boxShadow: "0 0 0 3px rgba(245,166,35,0.25)",
                        }}
                      />
                      <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200/80 shadow-soft">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600">{item.year}</span>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </Reveal>
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
            <span className="eyebrow mb-4">Why Choose a Broker</span>
            <h2 className="display-2 text-slate-900">Independent broker vs. single-carrier agent</h2>
            <p className="mt-3 text-slate-500">
              We work for <em>you</em>, not one insurance company. Here's what that means:
            </p>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl ring-1 ring-slate-200/80 overflow-hidden shadow-lifted comparison-table-wrap" style={{ boxShadow: "var(--shadow-lg)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-600 bg-slate-50"></th>
                    <th className="p-4 text-center" style={{ background: "var(--navy-800)", color: "white", borderBottom: "3px solid var(--gold-500)" }}>
                      <div className="flex flex-col items-center gap-1">
                        <img src={logoBadge} alt="" className="h-8 w-8 object-contain" />
                        <span className="font-bold text-white">Us (Broker)</span>
                      </div>
                    </th>
                    <th className="p-4 text-center font-semibold text-slate-500 bg-slate-50">Single-Carrier Agent</th>
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
                      <td className="p-4 text-center" style={{ background: "rgba(245,166,35,0.06)" }}>
                        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "var(--navy-800)" }}>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          {row.us}
                        </span>
                      </td>
                      <td className="p-4 text-center text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          {row.them}
                        </span>
                      </td>
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
          <Reveal className="text-center mb-10 max-w-2xl mx-auto">
            <span className="eyebrow mb-4">Credentials</span>
            <h2 className="display-2 text-slate-900">Licenses &amp; Affiliations</h2>
            <p className="mt-3 text-slate-500 leading-relaxed">
              Licensed by the California Department of Insurance since 1999, and proud members of
              local and national industry associations.
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                title: "CA DOI Licensed",
                sub: "California Dept. of Insurance",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.6 8.7-8 10-4.4-1.3-8-5-8-10V6l8-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "IIAB Member",
                sub: "Independent Insurance Agents & Brokers",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
              },
              {
                title: "BBB Accredited",
                sub: "Better Business Bureau",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="8" r="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                ),
              },
              {
                title: "Downey Chamber",
                sub: "Member of Commerce",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h.01M12 9h.01M15 9h.01M9 12h.01M12 12h.01M15 12h.01" />
                  </svg>
                ),
              },
            ].map((c) => (
              <StaggerChild key={c.title}>
                <div className="relative h-full bg-white rounded-2xl p-6 text-center ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:ring-gold-200 hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
                  {/* Subtle gold corner accent */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gold-400/10 blur-2xl group-hover:bg-gold-400/20 transition-colors" />
                  <div className="relative">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 grid place-items-center text-gold-400 ring-1 ring-brand-800 shadow-md">
                      {c.icon}
                    </div>
                    <h3 className="mt-4 font-bold text-slate-900 text-sm md:text-[15px] leading-tight">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      {c.sub}
                    </p>
                  </div>
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
              Get a personalized quote from someone who puts your needs first — compare 30+ carriers in one conversation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <NavLink to="/auto-insurance-downey-ca" className="btn btn-accent btn-lg">
                Compare auto quotes in Downey
              </NavLink>
              <NavLink to="/sr22-insurance-downey" className="btn btn-ghost-light btn-lg">
                SR-22 or no-license options
              </NavLink>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Or call us at{" "}
              <a href={site.contact.phoneHref} className="text-gold-300 hover:text-gold-200 font-semibold">
                {site.contact.phone}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
