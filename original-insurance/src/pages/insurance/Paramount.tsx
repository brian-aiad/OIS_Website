import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import { Reveal, Stagger, StaggerChild } from "../../components/AnimatedSection";
import StatsBar from "../../components/StatsBar";
import PageTestimonials from "../../components/PageTestimonials";
import InsuranceWorkflow from "../../components/InsuranceWorkflow";

const canonical = "https://originalinsurance.net/insurance/paramount";
const areaServed = [
  "Paramount, CA",
  "Downey, CA",
  "Bellflower, CA",
  "Lynwood, CA",
  "South Gate, CA",
  "Lakewood, CA",
];

const NEARBY = [
  { name: "Downey", slug: "downey" },
  { name: "Bellflower", slug: "bellflower" },
  { name: "Lynwood", slug: "lynwood" },
  { name: "South Gate", slug: "south-gate" },
  { name: "Lakewood", slug: "lakewood" },
];

export default function ParamountPage() {
  usePageMeta({
    title:
      "Auto Insurance in Paramount, CA | Original Insurance",
    description:
      "Compare auto, home, SR-22 and commercial coverage for Paramount with an independent broker on nearby Paramount Boulevard in Downey.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Paramount Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Paramount, CA"
        subtitle="Our Downey office is on Paramount Boulevard, giving Paramount residents a direct nearby option for auto, home, commercial, and SR-22 filing support."
        breadcrumb="Paramount"
        backgroundImage="/images/ois-city-small-business-v4.webp"
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent">
            Get a Free Quote
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="How we quote Paramount coverage"
        lede="We compare carrier fit for Paramount drivers, homeowners, renters, and businesses with clear next steps before you buy."
      />

      {/* Section 1 — Auto Insurance in Paramount */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Paramount, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Paramount residents can work with our Downey office directly on Paramount
                Boulevard or complete the quote process remotely. We compare coverage using
                the actual driver, vehicle, garaging address, annual mileage, use, limits, and
                deductibles rather than assigning one price or risk profile to the entire city.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                For policies issued or renewed on or after January 1, 2025, California's
                minimum liability limits are 30/60/15: $30,000 bodily injury per person,
                $60,000 per accident, and $15,000 property damage. Those limits are a legal
                minimum, not a recommendation for every household.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Premiums are individualized using factors such as driving history, vehicle,
                annual mileage, garaging location, coverage choices, and available discounts.
                Financed or leased vehicles may also be subject to lender coverage requirements.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we can compare available options from multiple
                carriers. We keep limits and deductibles consistent across quotes and explain
                eligibility, payment, and policy differences before you choose.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because our Downey office is on Paramount Boulevard, Paramount residents have
                a direct nearby option for in-person service. Quote, binding, and policy-document
                timing depend on the coverage, completed documents, payment, and carrier approval.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — SR-22 */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SR-22 Filing for Paramount Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Paramount drivers with an SR-22 requirement can compare qualifying policies at our
                office on Paramount Boulevard. Electronic filing availability and timing depend on
                the selected carrier, completed binding requirements, and DMV systems.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                It is important to understand that an SR-22 is a filing, not a separate
                insurance policy. It is a certificate your insurance carrier sends directly
                to the California DMV confirming that you carry the state-required minimum
                liability coverage. Common triggers include a license suspension, a lapse in
                coverage, an at-fault accident while uninsured, a DUI or reckless driving
                conviction, or a court order requiring proof of financial responsibility.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The required filing period depends on the DMV or court action. If proof is no
                longer in force, the insurer may notify the DMV and driving privileges can be
                affected. Confirm your own start and end dates directly with the DMV.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Qualifying insurers can file electronically after coverage is bound. Timing
                depends on the carrier and DMV systems. Bring your driver's license or DMV
                paperwork, vehicle VIN, and any court or case reference number.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                For complete SR-22 details including costs, carrier processing, and what to
                expect during the filing period, visit our dedicated SR-22 page.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/sr22-insurance-downey"
                className="btn btn-outline group inline-flex items-center gap-2"
              >
                Full SR-22 Guide
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6l6 6-6 6"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3 — No-License */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              No-License &amp; International-License Options
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Vehicle ownership and the act of driving are separate legal matters. There are
                several entirely lawful situations in which a Paramount resident needs auto
                insurance but does not hold a California driver's license.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                We regularly assist: vehicle owners who do not drive but must insure their
                car with a licensed primary driver named on the policy; holders of a valid
                foreign or international driver's license who are new to California and have
                not yet obtained a state license; and ITIN applicants who do not have a Social
                Security Number. In every case, the licensed driver on the policy must be the
                person actually operating the vehicle. We never advise, suggest, or imply that
                driving without a valid license is permissible under California law.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Not all carriers offer programs for these situations. With access to 30+ companies,
                we can find solutions where a single-carrier agent cannot. Helpful documents
                to bring: foreign driver's license, passport, ITIN letter, vehicle registration,
                and any existing declarations page.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/no-license-auto-insurance-downey"
                className="btn btn-outline group inline-flex items-center gap-2"
              >
                No-License &amp; Foreign-License Guide
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6l6 6-6 6"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — Why Choose */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Paramount Residents Choose Original Insurance
            </h2>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5" /></svg>,
                title: "Independent broker",
                desc: "We work for you, not one insurance company",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "30+ carriers compared",
                desc: "Side-by-side quotes in a single conversation",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
                title: "Bilingual service",
                desc: "English, Spanish, and Arabic — también hablamos español",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "SR-22 filing support",
                desc: "Electronic filing timing depends on the qualifying carrier and DMV systems",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                title: "No-license programs",
                desc: "Foreign license, ITIN, and international driver options available",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "25+ years serving SE LA",
                desc: "Downey-based independent brokerage serving Southeast LA since 1999",
              },
            ].map((item) => (
              <StaggerChild key={item.title}>
                <div className="flex gap-4 bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:-translate-y-0.5 transition-all">
                  <div className="shrink-0 w-10 h-10 rounded-xl grid place-items-center bg-brand-800 text-gold-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-[14px]">{item.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section 5 — Nearby Cities */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cities Near Paramount We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our clients span the Southeast LA corridor. If you have family or friends in
              any of these cities, we serve them too.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {NEARBY.map((city) => (
                <Link
                  key={city.slug}
                  to={`/insurance/${city.slug}`}
                  className="block bg-slate-50 text-slate-700 rounded-xl px-4 py-3 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium text-center"
                >
                  Auto insurance in {city.name}, CA
                </Link>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-3">
              <Link
                to="/auto-insurance-downey-ca"
                className="text-sm font-medium text-brand-700 hover:text-brand-900 hover:underline"
              >
                Auto insurance in Downey, CA
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                to="/sr22-insurance-downey"
                className="text-sm font-medium text-brand-700 hover:text-brand-900 hover:underline"
              >
                SR-22 filing in Downey
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                to="/no-license-auto-insurance-downey"
                className="text-sm font-medium text-brand-700 hover:text-brand-900 hover:underline"
              >
                No-license auto insurance
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                to="/about"
                className="text-sm font-medium text-brand-700 hover:text-brand-900 hover:underline"
              >
                About our brokerage
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PageTestimonials />

      {/* CTA Block */}
      <section className="sp bg-slate-50">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 p-8 md:p-10 text-center text-white shadow-heavy">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get your Paramount auto insurance quote today
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Quote, binding, policy-document, and SR-22 filing timing depend on the carrier and information required.
                Walk into our Paramount Boulevard office, call, or start online.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={openQuoteModal} className="btn btn-accent">
                  Get a Free Quote
                </button>
                <a href={site.contact.phoneHref} className="btn btn-ghost-light">
                  Call {site.contact.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
