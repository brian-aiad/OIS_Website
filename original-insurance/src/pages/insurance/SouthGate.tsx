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

const canonical = "https://originalinsurance.net/insurance/south-gate";
const areaServed = [
  "South Gate, CA",
  "Downey, CA",
  "Lynwood, CA",
  "Paramount, CA",
  "Norwalk, CA",
  "Bellflower, CA",
];

const NEARBY = [
  { name: "Downey", slug: "downey" },
  { name: "Lynwood", slug: "lynwood" },
  { name: "Paramount", slug: "paramount" },
  { name: "Pico Rivera", slug: "pico-rivera" },
  { name: "Norwalk", slug: "norwalk" },
];

export default function SouthGatePage() {
  usePageMeta({
    title:
      "South Gate Auto Insurance — SR-22 & No License | Original",
    description:
      "South Gate drivers: SR-22 filing, no-license programs, and competitive auto rates from 30+ carriers. Firestone Blvd and the 710 corridor. Bilingual. Same-day quotes.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "South Gate Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in South Gate, CA"
        subtitle="Bilingual auto, home, and SR-22 insurance for South Gate families — comparing 30+ top California carriers with English, Spanish, and Arabic service."
        breadcrumb="South Gate"
        backgroundImage="/images/heroTeam.webp"
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
        title="How we quote South Gate coverage"
        lede="We compare carrier fit for South Gate drivers, homeowners, renters, and businesses with clear next steps before you buy."
      />

      {/* Section 1 — Auto Insurance in South Gate */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in South Gate, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                South Gate sits in the heart of Southeast Los Angeles, bounded by the 710
                (Long Beach Freeway) to the west and crisscrossed by busy surface streets like
                Firestone Blvd, Garfield Ave, and Long Beach Blvd. The 105 (Century Freeway)
                clips the northern edge of the city, connecting South Gate commuters to LAX
                and the wider metro freeway network. Daily driving in South Gate means
                navigating high-traffic commercial corridors, dense residential neighborhoods,
                and one of the most truck-heavy freight routes in Southern California along
                the 710.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California's minimum liability requirement — 30/60/15 — provides $30,000
                bodily injury per person, $60,000 per accident, and $15,000 in property
                damage coverage. Along a busy stretch of Firestone Blvd or at a busy
                intersection on Garfield Ave, where vehicle values and medical costs can
                exceed these minimums, many South Gate drivers choose higher liability
                limits for genuine protection.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Rate factors for South Gate drivers include zip code (90280), driving history,
                vehicle type and year, annual mileage, and prior claims or coverage lapses.
                Drivers who maintain continuous coverage, bundle home and auto policies, or
                take a defensive driving course can often qualify for meaningful discounts.
                For drivers seeking cheap car insurance, comparing multiple carriers is
                essential — every insurer prices South Gate's 90280 zip code differently.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare more than 30 top-rated California carriers
                in a single visit or phone call. A captive agent at one insurance company can
                only offer that company's rates. We work across the market to find the
                combination of price, coverage, and carrier financial strength that fits each
                South Gate client's needs. Our bilingual English, Spanish, and Arabic service
                means that language is never a barrier to understanding exactly what you're
                buying.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                South Gate families often need more than just a minimum liability policy —
                uninsured motorist coverage, comprehensive, and collision all add meaningful
                protection in a dense urban driving environment. We explain every option in
                plain language and never pressure clients toward higher coverage than they
                actually need. If cheap car insurance that meets legal minimums is the right
                fit for your situation, we'll find you the best available rate for that too.
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
              SR-22 Filing for South Gate Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                South Gate drivers needing SR-22 filing after an uninsured accident, a license
                suspension, or a lapse in coverage can get same-day electronic filing through
                our Downey office, easily reached via the 710 or Firestone Blvd.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a separate insurance policy. It is a certificate
                that your insurer submits electronically to the California DMV, confirming
                you carry at least the state's minimum liability coverage. The DMV requires
                this filing as a condition of license reinstatement following certain events —
                a suspension, a DUI conviction, a court order, an at-fault accident while
                uninsured, or an extended lapse in coverage.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Once the SR-22 is on file, the DMV can proceed with reinstating your driving
                privileges. California generally requires the filing to stay active for three
                years. A cancellation or lapse during that period restarts the DMV clock and
                may trigger a new suspension. We help South Gate clients avoid accidental
                lapses by keeping their policy current.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We file SR-22 certificates electronically the same day you bind a qualifying
                policy — same-day proof of insurance included. Bring your license or DMV
                reinstatement letter, vehicle VIN, and any court reference number.
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
                Vehicle ownership and driving are distinct legal matters. South Gate residents
                can lawfully own and insure a vehicle without holding a California driver's
                license in several recognized situations — and we have programs specifically
                designed for each one.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                We assist: vehicle owners who do not drive but need the car insured with a
                licensed driver as the primary operator; holders of a valid foreign or
                international driver's license who have not yet converted to a California
                license; and ITIN applicants who lack a Social Security Number. The licensed
                driver on the policy must be the individual who actually operates the vehicle.
                We never suggest, imply, or advise that driving without a valid license is
                legal or acceptable.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because we work with 30+ carriers, we can find these programs where single-company
                agents cannot. Documents that help us find the right policy: foreign driver's
                license, passport, ITIN letter, vehicle registration, and any existing insurance
                declarations page.
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
              Why South Gate Residents Choose Original Insurance
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
                title: "Same-day SR-22 filing",
                desc: "Electronic filing to the California DMV the day you bind",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                title: "No-license programs",
                desc: "Foreign license, ITIN, and international driver options available",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "25+ years serving SE LA",
                desc: "Downey's trusted broker since 1999 — we know this market",
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
              Cities Near South Gate We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We cover the full Southeast LA corridor. If someone you know lives in a
              neighboring city, we can help them too.
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
                Get your South Gate auto insurance quote today
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Walk in, call, or click — same-day
                proof of insurance available.
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
