import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import { Reveal } from "../../components/AnimatedSection";

const canonical = "https://originalinsurance.net/insurance/montebello";
const areaServed = [
  "Montebello, CA",
  "Downey, CA",
  "Pico Rivera, CA",
  "Commerce, CA",
  "Whittier, CA",
  "South Gate, CA",
];

const NEARBY = [
  { name: "Downey", slug: "downey" },
  { name: "Pico Rivera", slug: "pico-rivera" },
  { name: "Commerce", slug: "commerce" },
  { name: "Whittier", slug: "whittier" },
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

export default function MontebelloPage() {
  usePageMeta({
    title:
      "Montebello Auto Insurance — 30+ Carriers | Original",
    description:
      "Auto insurance for Montebello drivers on the 60 and 710. Compare 30+ California carriers — SR-22, no-license, home bundles. Bilingual broker. Free quote today.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Montebello Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Montebello, CA"
        subtitle="Independent insurance broker serving Montebello commuters and families — multilingual English, Spanish, and Arabic support from our Downey office."
        breadcrumb="Montebello"
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

      {/* Section 1 — Auto Insurance in Montebello */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Montebello, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Montebello sits at the crossroads of several major Southern California
                corridors. The 60 (Pomona Freeway) cuts through the city, connecting Montebello
                commuters directly to Downtown LA and the Inland Empire. The 710 (Long Beach
                Freeway) is accessible a short drive west, offering a fast route south toward
                the ports. On the surface, Garfield Ave, Washington Blvd, and Montebello Blvd
                carry steady local and pass-through traffic. Navigating this mix of freeway
                interchanges and active surface streets creates real exposure for Montebello
                drivers — exposure that adequate auto insurance needs to address.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California requires a minimum liability of 30/60/15 — $30,000 bodily injury
                per person, $60,000 per accident, and $15,000 in property damage. These
                minimums represent the legal floor, not necessarily adequate real-world
                protection. A single at-fault accident on a busy stretch of the 60 or
                Garfield Ave can exceed the property damage minimum with one modern vehicle.
                Many Montebello drivers choose higher limits and add uninsured motorist
                coverage given California's substantial uninsured driver population.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Rates for Montebello drivers (zip code 90640) depend on driving record,
                vehicle make and model, annual mileage, prior claims history, and coverage
                continuity. Drivers with clean records and older paid-off vehicles can often
                find cheap car insurance rates on liability-only coverage. Drivers with
                financed vehicles or a history of incidents will see higher premiums for full
                coverage — but shopping the full market consistently produces better outcomes
                than going direct to a single insurer.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare more than 30 California carriers in a
                single quote. When you go directly to one company, you receive only that
                company's rate for your profile. An independent broker like Original Insurance
                exposes your risk to the full market — and finds the carrier that prices it
                most favorably. Our multilingual English, Spanish, and Arabic team explains
                every coverage option clearly so Montebello clients fully understand what
                they are buying before they commit.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our Downey office is accessible from Montebello via the 60 freeway or Garfield
                Ave. Walk-ins are welcome, most quotes are completed in under 10 minutes, and
                same-day proof of insurance is standard when you bind a policy with us. Phone
                and online quotes are available for clients who prefer not to come in.
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
              SR-22 Filing for Montebello Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Montebello drivers ordered to file SR-22 by the DMV or a court after a
                suspension, lapse, or DUI can get same-day electronic filing through our
                Downey office, easily reached via the 60 freeway or Garfield Ave.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a separate insurance policy. It is a certificate
                your insurance carrier submits electronically to the California DMV confirming
                you carry the state-required minimum liability coverage. Common triggers
                include a license suspension, a DUI or reckless driving conviction, an
                at-fault accident while uninsured, a significant lapse in coverage, or a
                specific court order requiring proof of financial responsibility.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The California DMV typically requires SR-22 filing to remain continuously
                active for three years. If the policy lapses or is cancelled at any point
                during that period, the DMV timeline resets and your driving privileges can
                be re-suspended. Our team helps Montebello clients understand this requirement
                and monitors policy status to prevent unintentional gaps.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We file SR-22 certificates electronically the same day you bind a qualifying
                policy — no waiting for paper documents. Bring your driver's license or DMV
                reinstatement paperwork, vehicle VIN, and any court or DMV case reference
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
                Vehicle ownership and driving are separate legal matters. Montebello residents
                may lawfully own and insure a vehicle in several recognized situations without
                holding a California driver's license, and we have programs designed for
                each of these cases.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                We assist: vehicle owners who do not personally drive but need the car
                insured with a licensed primary operator named on the policy; holders of a
                valid foreign or international driver's license who have not yet transitioned
                to a California license; and ITIN applicants who do not have a Social Security
                Number. In every case, the licensed driver named on the policy must be the
                person who actually drives the vehicle. We never advise, suggest, or imply
                that operating a motor vehicle without a valid license is permissible under
                California law.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because we represent 30+ carriers, we can find appropriate programs where
                single-carrier agents cannot. Helpful documents: foreign driver's license,
                passport, ITIN letter, vehicle registration, and any existing declarations page.
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
              Why Montebello Residents Choose Original Insurance
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
              Cities Near Montebello We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our service area covers the full Southeast LA and San Gabriel River region.
              If a neighbor or family member needs coverage in any of these cities, we can help.
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

      {/* CTA Block */}
      <section className="sp bg-slate-50">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 p-8 md:p-10 text-center text-white shadow-heavy">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get your Montebello auto insurance quote today
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Reach us via the 60 or Garfield Ave —
                walk-ins welcome, or call ahead.
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
