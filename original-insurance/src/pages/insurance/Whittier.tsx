import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import { Reveal } from "../../components/AnimatedSection";

const canonical = "https://originalinsurance.net/insurance/whittier";
const areaServed = [
  "Whittier, CA",
  "Downey, CA",
  "Pico Rivera, CA",
  "Montebello, CA",
  "Norwalk, CA",
  "Cerritos, CA",
];

const NEARBY = [
  { name: "Downey", slug: "downey" },
  { name: "Pico Rivera", slug: "pico-rivera" },
  { name: "Montebello", slug: "montebello" },
  { name: "Norwalk", slug: "norwalk" },
  { name: "Cerritos", slug: "cerritos" },
];

const TRUST_POINTS = [
  "Independent broker — we work for you, not one insurance company",
  "30+ top-rated California carriers compared in a single quote",
  "Bilingual English, Spanish, and Arabic service — también hablamos español",
  "Same-day SR-22 electronic filing to the California DMV",
  "No-license and international-license auto programs available",
  "25+ years serving the Downey and Southeast LA community",
];

export default function WhittierPage() {
  usePageMeta({
    title:
      "Auto Insurance Whittier CA | Cheap Car Insurance, SR-22 | Original Insurance",
    description:
      "Independent insurance broker serving Whittier, CA. Compare 30+ carriers for auto, home, and SR-22. From Uptown Whittier to East Whittier.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Whittier Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Whittier, CA"
        subtitle="From Uptown Whittier to East Whittier — independent insurance broker comparing 30+ carriers for auto, home, and SR-22 filing needs."
        breadcrumb="Whittier"
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

      {/* Section 1 — Auto Insurance in Whittier */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Whittier, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Whittier drivers travel a mix of freeway and surface-street terrain that
                demands solid auto coverage. The 605 (San Gabriel River Freeway) carries heavy
                traffic between the Whittier Narrows and the 91, while the 60 (Pomona Freeway)
                runs across the northern edge of the city, connecting Whittier commuters to
                Downtown LA and the Inland Empire. Surface arteries like Whittier Blvd, Painter
                Ave, and Colima Rd handle the day-to-day neighborhood driving from Uptown
                Whittier through East Whittier.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California's minimum liability requirement is 30/60/15 — $30,000 bodily injury
                per person, $60,000 per accident, and $15,000 property damage. The state sets
                these as a floor, not a recommended coverage level. Given the mix of newer
                vehicles and high-traffic corridors in Whittier, many drivers opt for higher
                liability limits and add uninsured motorist coverage. California's uninsured
                driver rate makes this addition particularly valuable.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Auto insurance rates in Whittier vary by zip code (90601–90606), vehicle
                type, annual mileage, driving record, and prior claims. Drivers with clean
                records and older paid-off vehicles often qualify for cheap car insurance
                rates on liability-only coverage. Those with financed vehicles, newer models,
                or prior incidents will see higher premiums for full coverage — but comparing
                carriers can still produce meaningful savings.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare more than 30 California carriers at once.
                Going direct to a single insurer means you only see one price for your risk
                profile. Working with an independent broker like Original Insurance means the
                entire market is working for you — we identify the carriers that price Whittier's
                zip codes most competitively and match them to your specific driving history
                and coverage needs.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our Downey office is accessible from Whittier via the 605 or Whittier Blvd.
                We also offer phone and online quotes for clients who prefer not to drive in.
                Most quotes are completed in under 10 minutes, with same-day proof of insurance
                available when you bind a policy with us.
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
              SR-22 Filing for Whittier Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Whittier drivers ordered to carry SR-22 by the DMV or a court — after a
                suspension, DUI, or uninsured accident — can get same-day electronic filing
                at our Downey office, accessible via the 605 or Whittier Blvd.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a standalone insurance policy. It is a certificate
                your insurer submits electronically to the California DMV confirming you carry
                at least the state-required minimum liability coverage. The DMV typically
                requires this filing before restoring a suspended license. Common triggers
                include a DUI conviction, a lapse in coverage, an at-fault accident while
                uninsured, excessive points on a driving record, or a specific court order.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California generally requires the SR-22 filing to remain active for three
                continuous years. Any cancellation or policy lapse during that period resets
                the DMV timeline and can result in a new suspension. Our team monitors policy
                status to help Whittier clients avoid accidental lapses that would restart
                the clock.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We file electronically the same day you bind a qualifying policy. What to
                bring: your driver's license or DMV reinstatement paperwork, vehicle VIN,
                and any court or case reference numbers.
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
                Owning a vehicle and driving one are separate legal matters. Whittier residents
                in several lawful situations may need auto insurance coverage without holding
                a California driver's license, and we have programs for each scenario.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                We help: vehicle owners who do not personally drive but must insure their car
                with a licensed driver listed as the primary operator; holders of a valid
                foreign or international license who have not yet transitioned to a California
                license; and ITIN applicants who do not have a Social Security Number. In
                every one of these cases, the licensed driver named on the policy must be the
                person who actually operates the vehicle. We do not advise, imply, or suggest
                that operating a motor vehicle without a valid license is permissible under
                California law.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because we work with 30+ carriers, we can identify programs for these situations
                where a single-carrier agent has no options. Helpful documents: foreign driver's
                license, passport, ITIN letter, vehicle registration, and any existing
                insurance declarations page.
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
              Why Whittier Residents Choose Original Insurance
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
              Cities Near Whittier We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our coverage area spans the Southeast LA and San Gabriel Valley corridor.
              Refer a neighbor and they'll get the same personal service you do.
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
                Get your Whittier auto insurance quote today
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Walk in via the 605 or Whittier Blvd,
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
