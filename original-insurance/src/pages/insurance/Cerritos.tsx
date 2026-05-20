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

const canonical = "https://originalinsurance.net/insurance/cerritos";
const areaServed = [
  "Cerritos, CA",
  "Downey, CA",
  "Norwalk, CA",
  "Bellflower, CA",
  "Lakewood, CA",
  "Whittier, CA",
];

const NEARBY_CITIES = [
  { name: "Downey", slug: "downey" },
  { name: "Norwalk", slug: "norwalk" },
  { name: "Bellflower", slug: "bellflower" },
  { name: "Lakewood", slug: "lakewood" },
  { name: "Whittier", slug: "whittier" },
];

export default function CerritosPage() {
  usePageMeta({
    title:
      "Cerritos Auto Insurance — 605 Corridor | Original Insurance",
    description:
      "Auto insurance for Cerritos drivers in the 605 corridor. Compare 30+ carriers — SR-22, full coverage, no-license options. Bilingual broker just minutes away.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Cerritos Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Cerritos, CA"
        subtitle="Comparing 30+ carriers for Cerritos homeowners, drivers, and business owners — bilingual English, Spanish, and Arabic service since 1999."
        breadcrumb="Auto Insurance Cerritos"
        backgroundImage="/images/heroTeam.webp"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent">
            Get a Free Cerritos Quote
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="How we quote Cerritos coverage"
        lede="We compare carrier fit for Cerritos drivers, homeowners, renters, and businesses with clear next steps before you buy."
      />

      {/* Section 1: Auto Insurance Intro */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Cerritos, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Cerritos sits at the junction of two major freeways — the 605 (San Gabriel River Freeway) running north–south and the 91 (Artesia Freeway) cutting east–west — making it one of the higher-traffic communities in southeast Los Angeles County. Daily commuters navigating Studebaker Rd, Gridley Rd, and Artesia Blvd know that congestion and stop-and-go conditions increase the statistical risk of a fender-bender or rear-end collision, which is one reason insurers price coverage in this ZIP code the way they do.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California law requires every registered vehicle to carry minimum liability limits of 30/60/15 — $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. These minimums are a legal floor, not a recommendation. A single serious accident in today's market can easily exceed those limits, leaving the at-fault driver personally responsible for the gap. Many Cerritos families choose higher liability limits and add uninsured motorist coverage given the volume of daily traffic on the 605 corridor.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare rates from more than 30 top-rated California carriers at once. That means you get cheap car insurance options that reflect real market competition, not a single company's pricing. Rate factors in Cerritos include your driving record, vehicle make and model, annual mileage, prior claims, and whether you bundle home and auto — which frequently unlocks multi-policy discounts of 10–15%. Drivers with clean records and older paid-off vehicles often qualify for liability-only rates that are genuinely affordable; those with newer financed vehicles benefit most from full coverage comparisons.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Our bilingual English, Spanish, and Arabic team walks every Cerritos client through policy options in plain language. There is no pressure to choose a specific carrier, no extra fee to use our services, and no obligation to buy. We are compensated by the carrier you select, which means our only job is to find you the best match for your situation. Whether you commute on the 605, run a business near Artesia Blvd, or are simply looking for cheap car insurance that doesn't sacrifice essential coverage, we can help you compare and decide with confidence.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Cerritos homeowners who bundle home and auto policies consistently see the strongest discounts. If you own a home in one of Cerritos's well-maintained residential neighborhoods, asking about a bundle quote alongside your auto policy is one of the easiest ways to reduce your overall insurance spend without changing your coverage levels.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: SR-22 */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SR-22 Filing for Cerritos Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Cerritos residents needing SR-22 filing to reinstate a California driver's license after a suspension, lapse, or DUI can file same-day through our Downey office, just minutes away via the 605.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                It is important to understand that an SR-22 is a filing, not a separate insurance policy. It is a certificate your insurance carrier submits electronically to the California DMV confirming you carry the state-required minimum liability coverage. Common triggers include a coverage lapse, an at-fault accident while uninsured, a DUI or reckless driving conviction, a court order, or a DMV-mandated reinstatement requirement.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California typically requires SR-22 status for three years from the date of reinstatement. During that entire period, your policy must remain active and in force — any lapse, cancellation, or missed payment resets the clock with the DMV and can trigger a new suspension. Our team monitors policy status and can alert you before a payment is missed so your reinstatement is never jeopardized.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                When you visit our Downey office, bring your driver's license or DMV reinstatement paperwork, your vehicle VIN, and any court or DMV reference numbers. Most Cerritos clients leave with the SR-22 electronically submitted and proof of insurance in hand the same day. For a complete guide to cost, duration, and the process, visit our dedicated SR-22 page.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/sr22-insurance-downey"
                className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-900 hover:underline"
              >
                Full SR-22 Guide for Cerritos Drivers
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3: No-License */}
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
                Vehicle ownership and driving are distinct legal concepts. There are several lawful situations in Cerritos and throughout California where someone needs auto insurance coverage but does not hold a traditional California driver's license. We work with specialized carriers that understand these situations and write policies accordingly.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Common situations we assist with include: vehicle owners who do not drive but need the car insured with a licensed primary driver listed on the policy; foreign-license holders who have a valid driver's license issued by another country; international visitors or temporary residents holding an international driving permit; and ITIN-based applicants who do not have a Social Security Number. In every case, the licensed driver listed on the policy must be the person who is legally permitted to and actually does operate the vehicle. We never suggest or imply that driving without a valid license is permissible under California law.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Not every insurance carrier writes policies for these situations. Our access to more than 30 carriers means we can identify options where a single-carrier agent often cannot. Helpful documents to bring: your foreign or international driver's license, passport, ITIN letter, vehicle registration, and any existing declarations page. For full details on how these programs work, visit our dedicated no-license page.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/no-license-auto-insurance-downey"
                className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-900 hover:underline"
              >
                No-License &amp; Foreign-License Guide
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4: Why Original */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Cerritos Residents Choose Original Insurance
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

      {/* Section 5: Nearby Cities */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cities Near Cerritos We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Many of our Cerritos clients find us through family referrals from neighboring communities across the 605 and 91 corridors. We write auto, home, and commercial insurance throughout southeast Los Angeles County.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {NEARBY_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  to={`/insurance/${city.slug}`}
                  className="block bg-slate-50 rounded-xl px-4 py-3 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium text-slate-700 text-center"
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
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready for a Free Cerritos Auto Quote?
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Compare 30+ carriers for cheap car insurance, SR-22 filings, and home bundles — same-day proof of insurance available.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={openQuoteModal} className="btn btn-accent">
                  Get My Cerritos Quote
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
