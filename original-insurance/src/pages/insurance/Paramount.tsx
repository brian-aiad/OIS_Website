import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import { Reveal } from "../../components/AnimatedSection";

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

const TRUST_POINTS = [
  "Independent broker — we work for you, not one insurance company",
  "30+ top-rated California carriers compared in a single quote",
  "Bilingual English, Spanish, and Arabic service — también hablamos español",
  "Same-day SR-22 electronic filing to the California DMV",
  "No-license and international-license auto programs available",
  "25+ years serving the Downey and Southeast LA community",
];

export default function ParamountPage() {
  usePageMeta({
    title:
      "Auto Insurance Paramount CA | Cheap Car Insurance, SR-22 | Original Insurance",
    description:
      "Independent insurance broker serving Paramount, CA. Fast walk-in service — our Downey office is just minutes away on Paramount Blvd. Compare 30+ carriers.",
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
        subtitle="Our Downey office sits right on Paramount Blvd — Paramount residents get the fastest walk-in service and same-day SR-22 filings from 30+ carriers."
        breadcrumb="Paramount"
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
                Paramount drivers navigate some of the busiest corridors in Southeast Los
                Angeles every day — the 710 (Long Beach Freeway), the 91 (Artesia Freeway),
                Rosecrans Ave, Alondra Blvd, and Paramount Blvd itself. Heavy freeway
                interchange traffic at the 710/91 split means exposure to rear-end collisions,
                lane changes at speed, and a high density of commercial trucks traveling between
                the ports and inland distribution centers. Your auto insurance needs to reflect
                that reality.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California sets a minimum liability requirement of 30/60/15 — $30,000 bodily
                injury per person, $60,000 per accident, and $15,000 property damage. These
                limits are a legal floor, not a recommended coverage level. A single multi-car
                accident on the 710 can easily exceed $15,000 in property damage alone.
                Many Paramount drivers wisely choose higher liability limits and add
                uninsured/underinsured motorist coverage, given the significant number of
                uninsured drivers on California roads.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Rate factors that directly affect your premium include your driving record,
                vehicle make, model and year, annual mileage, zip code (90723 in Paramount),
                prior claims history, and whether you carry continuous or lapsed coverage.
                Drivers with clean records commuting short distances on surface streets
                can often find cheap car insurance options with liability-only coverage.
                Drivers with financed vehicles, or those needing full coverage for higher-value
                cars, will pay more — but shopping multiple carriers can still cut hundreds
                of dollars off the annual cost.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent insurance broker, we do not represent a single carrier.
                We compare rates simultaneously from more than 30 top California companies,
                which means you see the actual market range — not a single quoted price. Going
                direct to one insurer locks you into whatever that company prices your risk at.
                Using an independent broker like Original Insurance means competition works in
                your favor. We identify cheap car insurance solutions that fit your specific
                driving profile, vehicle, and coverage needs without sacrificing the protections
                that actually matter.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because our Downey office is located right on Paramount Blvd, Paramount
                residents have faster, easier walk-in access than clients from nearly any
                other neighboring city. Most quotes take under 10 minutes. Same-day proof
                of insurance is standard when you bind a policy with us.
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
                Paramount drivers needing same-day SR-22 filing are steps from our office on
                Paramount Blvd — we can file electronically to the California DMV the same day
                you walk in.
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
                Once your SR-22 is on file, the DMV can process your license reinstatement.
                California typically requires the SR-22 to remain active for three years. Any
                lapse or cancellation during that period resets the DMV clock and can result
                in re-suspension. We help clients understand the ongoing requirement and
                monitor policy status to prevent unintentional lapses.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Our electronic filing is submitted the same day you bind a qualifying policy —
                no waiting for paper documents in the mail. Bring your driver's license or
                DMV reinstatement paperwork, your vehicle's VIN, and any court or case
                reference number.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                For complete SR-22 details including cost, carriers, and what to expect during
                the three-year filing period, visit our dedicated SR-22 page.
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
                Get your Paramount auto insurance quote today
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Walk into our Paramount Blvd office,
                call, or click — same-day proof of insurance available.
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
