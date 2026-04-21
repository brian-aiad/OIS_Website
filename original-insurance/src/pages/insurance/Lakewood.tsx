import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import { Reveal } from "../../components/AnimatedSection";

const canonical = "https://originalinsurance.net/insurance/lakewood";
const areaServed = [
  "Lakewood, CA",
  "Downey, CA",
  "Bellflower, CA",
  "Cerritos, CA",
  "Paramount, CA",
  "Norwalk, CA",
];

const NEARBY_CITIES = [
  { name: "Downey", slug: "downey" },
  { name: "Bellflower", slug: "bellflower" },
  { name: "Cerritos", slug: "cerritos" },
  { name: "Paramount", slug: "paramount" },
  { name: "Norwalk", slug: "norwalk" },
];

export default function LakewoodPage() {
  usePageMeta({
    title:
      "Auto Insurance Lakewood CA | Cheap Car Insurance, SR-22 | Original Insurance",
    description:
      "Independent insurance broker serving Lakewood, CA. Bundle home and auto for multi-carrier savings. SR-22 filing, no-license programs, bilingual service.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Lakewood Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Lakewood, CA"
        subtitle="Helping Lakewood homeowners bundle home and auto for real savings — comparing 30+ top carriers from our Downey office."
        breadcrumb="Auto Insurance Lakewood"
        backgroundImage="/images/heroTeam.webp"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent">
            Get a Free Lakewood Quote
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      {/* Section 1: Auto Insurance Intro */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Lakewood, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Lakewood is a predominantly residential community with major arterials — Lakewood Blvd, Carson St, and Del Amo Blvd — carrying significant daily traffic between the 605 (San Gabriel River Freeway) to the east and the 91 (Artesia Freeway) to the north. Commuters heading to Long Beach, Downey, or Cerritos cross these corridors every day, and the density of intersections and shopping centers along Lakewood Blvd contributes to the kind of low-speed collision risk that drives insurance pricing in this area.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California's minimum auto liability requirement is 30/60/15 — $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. These limits are a legal baseline, not a safety net. Repair costs for newer vehicles and medical costs in Los Angeles County can easily exceed those figures in a single serious accident. Many Lakewood drivers choose higher limits and add comprehensive and collision coverage, especially for financed or leased vehicles where lenders require full coverage.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare more than 30 top-rated California carriers at once. That means Lakewood residents searching for cheap car insurance get options that reflect genuine market competition rather than a single company's pricing. Rate factors in Lakewood include driving history, vehicle type, ZIP code, prior claims, annual mileage, and whether you bundle home and auto. Lakewood has a high rate of homeownership, which makes multi-policy discounts particularly valuable here — bundling typically saves 10–15% on both the home and auto premiums.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Our bilingual English, Spanish, and Arabic team takes time to explain each option clearly. We do not work for any single insurance company, and we do not receive extra compensation for steering you toward a specific carrier. Our only goal is to find the right policy at the right price for your household or business. Whether you drive on Del Amo Blvd daily or commute across the 605 to work, we can find cheap car insurance options that match your actual coverage needs — not just the cheapest policy on paper.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Lakewood homeowners who take advantage of home and auto bundling consistently see the largest premium reductions. If you own a home in Lakewood and are paying separate premiums for home and auto with different carriers, a combined quote from a single carrier through our office is often the fastest way to lower your total annual insurance cost without reducing coverage.
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
              SR-22 Filing for Lakewood Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Lakewood drivers with a suspended license, a lapsed policy, or a court-ordered SR-22 requirement can get same-day electronic filing through our Downey office — just south on Lakewood Blvd.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a standalone insurance policy. It is a certificate your insurance carrier submits electronically to the California DMV confirming that you carry the state-required minimum liability coverage. Common reasons a Lakewood driver might need one include a lapse in insurance coverage, an at-fault accident while uninsured, a DUI or reckless driving conviction, a license suspension, or a reinstatement order from the DMV or a court.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California typically requires SR-22 status to be maintained continuously for three years. If your policy lapses, is cancelled, or a payment is missed during that period, the carrier is required to notify the DMV and your license can be re-suspended — restarting the reinstatement process. Our team helps Lakewood clients stay on track by monitoring policy status and providing payment reminders so the three-year clock is never interrupted.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                To get started, bring your driver's license or DMV reinstatement paperwork, your vehicle identification number, and any court or DMV reference numbers. Most Lakewood clients who come to our office leave with the SR-22 electronically filed and proof of insurance in hand the same day. For full details on cost, timeline, and what to expect, visit our dedicated SR-22 page.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/sr22-insurance-downey"
                className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-900 hover:underline"
              >
                Full SR-22 Guide for Lakewood Drivers
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
                Vehicle ownership and driving are separate legal matters under California law. There are lawful situations where a vehicle owner in Lakewood needs auto insurance but does not hold a traditional California driver's license. We work with carriers that are equipped to handle these specific circumstances and write qualifying policies.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Situations we routinely assist with include: vehicle owners who do not drive but need the car insured under a licensed primary driver; holders of a valid foreign driver's license issued by another country; international visitors or temporary California residents with an international driving permit; and ITIN-based applicants who do not have a Social Security Number. In all cases, the licensed driver listed on the policy must be the person who is legally authorized to operate the vehicle and does so. We never suggest or imply that operating a motor vehicle without a valid license is legal or permissible in California.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because not every carrier writes policies for these situations, our access to more than 30 carriers is a genuine advantage for Lakewood residents seeking coverage options a single-carrier agent cannot offer. Useful documents to bring: foreign or international driver's license, passport, ITIN letter, vehicle registration, and any current declarations page. For a detailed explanation of how these programs work, visit our no-license insurance page.
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
              Why Lakewood Residents Choose Original Insurance
            </h2>
            <ul className="space-y-3 text-slate-600">
              {[
                "Independent broker — we work for you, not one insurance company",
                "30+ top-rated California carriers compared in a single quote",
                "Home and auto bundling discounts especially valuable for Lakewood homeowners",
                "Bilingual English, Spanish, and Arabic service — también hablamos español",
                "Same-day SR-22 electronic filing to the California DMV",
                "No-license and international-license programs for vehicle owners",
                "Convenient Downey office accessible via Lakewood Blvd — walk-ins welcome",
                "25+ years serving Southeast Los Angeles County families and businesses",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                    <svg className="w-3 h-3 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
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
              Cities Near Lakewood We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our clients across the 605 and 91 corridors regularly refer neighbors from surrounding communities. We write auto, home, SR-22, and commercial insurance throughout southeast Los Angeles County.
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Block */}
      <section className="sp bg-slate-50">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 p-8 md:p-10 text-center text-white shadow-heavy">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready for a Free Lakewood Auto Quote?
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Bundle home and auto, compare 30+ carriers for cheap car insurance, or get same-day SR-22 filing — all from one office.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={openQuoteModal} className="btn btn-accent">
                  Get My Lakewood Quote
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
