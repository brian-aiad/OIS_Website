import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import { Reveal } from "../../components/AnimatedSection";

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
      "Auto Insurance Cerritos CA | Cheap Car Insurance, SR-22 | Original Insurance",
    description:
      "Independent insurance broker serving Cerritos, CA. Compare 30+ carriers for auto, home, and SR-22. Bilingual service for Cerritos and southeast LA families.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />

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
            <ul className="space-y-3 text-slate-600">
              {[
                "Independent broker — we work for you, not one insurance company",
                "30+ top-rated California carriers compared in a single quote session",
                "Bilingual English, Spanish, and Arabic service — también hablamos español",
                "Same-day SR-22 electronic filing to the California DMV",
                "No-license and international-license auto programs for vehicle owners",
                "Home and auto bundling discounts for Cerritos homeowners",
                "25+ years serving the Downey and southeast LA County community",
                "Real local office minutes from Cerritos via the 605 — walk-ins welcome",
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
