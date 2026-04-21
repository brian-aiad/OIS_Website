import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import { Reveal } from "../../components/AnimatedSection";

const canonical = "https://originalinsurance.net/insurance/commerce";
const areaServed = [
  "Commerce, CA",
  "Downey, CA",
  "Montebello, CA",
  "Pico Rivera, CA",
  "South Gate, CA",
  "Norwalk, CA",
];

const NEARBY = [
  { name: "Downey", slug: "downey" },
  { name: "Montebello", slug: "montebello" },
  { name: "Pico Rivera", slug: "pico-rivera" },
  { name: "South Gate", slug: "south-gate" },
];

const TRUST_POINTS = [
  "Independent broker — we work for you, not one insurance company",
  "30+ top-rated California carriers compared in a single quote",
  "Bilingual English, Spanish, and Arabic service — también hablamos español",
  "Same-day SR-22 electronic filing to the California DMV",
  "No-license and international-license auto programs available",
  "25+ years serving the Downey and Southeast LA community",
];

export default function CommercePage() {
  usePageMeta({
    title:
      "Auto Insurance Commerce CA | Commercial Auto, SR-22 | Original Insurance",
    description:
      "Insurance broker serving City of Commerce businesses and residents. Commercial auto, BOP, SR-22, and personal auto from 30+ carriers.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />

      <PageHero
        title="Auto Insurance in City of Commerce, CA"
        subtitle="Commercial and personal auto insurance for City of Commerce businesses and residents — 30+ carriers, same-day SR-22, bilingual service."
        breadcrumb="Commerce"
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

      {/* Section 1 — Auto Insurance in Commerce */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in City of Commerce, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                The City of Commerce sits at the intersection of three major Southern
                California freeways — the 710 (Long Beach Freeway), the 5 (Santa Ana
                Freeway), and the 60 (Pomona Freeway) — making it one of the most logistically
                significant small cities in the region. Eastern Ave and Garfield Ave carry
                heavy surface traffic connecting Commerce to neighboring Montebello, Pico
                Rivera, and the broader Southeast LA corridor.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Commerce is home to a large concentration of industrial employers, distribution
                warehouses, and manufacturing operations. Many residents and owner-operators
                here need both commercial auto coverage — for business vehicles, delivery vans,
                and work trucks — and personal auto coverage for their private vehicles. As an
                independent broker, we write both, and we can bundle commercial and personal
                policies to simplify your coverage and potentially reduce your overall premiums.
                If you run a small fleet, operate as an independent contractor, or use a vehicle
                for any business purpose, a personal auto policy alone may not cover you when it
                matters most.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California's minimum liability requirement is 30/60/15 — $30,000 bodily injury
                per person, $60,000 per accident, and $15,000 property damage. For personal
                vehicles, many Commerce drivers choose higher limits given the high volume of
                commercial traffic on the 710 and 5. For commercial vehicles, minimum liability
                limits are set even higher by state and federal regulations depending on vehicle
                type and use.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Rate factors for Commerce drivers and businesses include zip code (90022 or
                90040), vehicle type and use, annual mileage, driver history, and whether
                vehicles are used for personal or commercial purposes. Drivers seeking
                cheap car insurance for personal vehicles with clean records will find
                competitive options among the 30+ carriers we represent. Business owners
                need accurate commercial classification to avoid coverage gaps — we help
                ensure the policy matches the actual use.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                As an independent broker, we never steer you toward a single carrier's
                product. We compare the market and identify the combination of price, coverage,
                and carrier strength that fits each Commerce client — whether that is a personal
                liability policy, a commercial auto program, a business owner's policy (BOP),
                or a bundle of multiple lines. Our Downey office is accessible via the 710,
                5, or 60 freeways.
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
              SR-22 Filing for Commerce Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Commerce drivers and owner-operators needing SR-22 filing or commercial fleet
                coverage can get same-day service through our Downey office, accessible via
                the 710, 5, or 60 freeways.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a standalone insurance policy. It is a certificate
                your insurer submits electronically to the California DMV confirming you carry
                at minimum the state's required liability coverage. Common triggers include a
                license suspension, a DUI or reckless driving conviction, an at-fault accident
                while uninsured, a lapse in coverage, excessive DMV points, or a court order
                requiring proof of financial responsibility.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Once the SR-22 is filed, the DMV can process license reinstatement. California
                typically requires the filing to remain continuously active for three years.
                A cancellation or lapse during that period resets the DMV timeline and may
                result in immediate re-suspension of driving privileges. For owner-operators
                whose livelihood depends on their driving record, maintaining the SR-22 without
                interruption is critical.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We file SR-22 certificates electronically the same day you bind a qualifying
                policy — same-day proof of insurance included. Bring your driver's license or
                DMV reinstatement letter, vehicle VIN, and any court or DMV case reference
                number.
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
                Vehicle ownership and the act of driving are distinct legal concepts. Commerce
                residents can lawfully own and insure a vehicle in several situations without
                holding a California driver's license.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                We assist: vehicle owners who do not personally drive but need the car insured
                with a licensed driver as the primary operator; holders of a valid foreign or
                international driver's license who have not yet converted to a California
                license; and ITIN applicants who do not have a Social Security Number. In every
                case, the licensed driver on the policy must be the person who actually operates
                the vehicle. We never advise, suggest, or imply that driving without a valid
                license is legal or permissible under California law.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because we work with 30+ carriers, we can find these programs where single-company
                agents have no options. Useful documents: foreign driver's license, passport,
                ITIN letter, vehicle registration, and any existing insurance declarations page.
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
              Why Commerce Residents Choose Original Insurance
            </h2>
            <ul className="space-y-3 text-slate-600">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                    <svg
                      className="w-3 h-3 text-gold-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
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
              Cities Near Commerce We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our service area covers the 710, 5, and 60 corridor and the broader Southeast
              LA region. If someone you know needs coverage in a neighboring city, we're here.
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
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get your Commerce auto insurance quote today
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Personal and commercial coverage from 30+ carriers. Accessible via the 710,
                5, or 60 — walk-ins welcome, or call ahead.
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
