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

const canonical = "https://originalinsurance.net/insurance/pico-rivera";
const areaServed = [
  "Pico Rivera, CA",
  "Downey, CA",
  "Whittier, CA",
  "Montebello, CA",
  "Commerce, CA",
  "Norwalk, CA",
];

const NEARBY = [
  { name: "Downey", slug: "downey" },
  { name: "Whittier", slug: "whittier" },
  { name: "Montebello", slug: "montebello" },
  { name: "Commerce", slug: "commerce" },
  { name: "Norwalk", slug: "norwalk" },
];

export default function PicoRiveraPage() {
  usePageMeta({
    title:
      "Pico Rivera Auto Insurance — ITIN OK | Original Insurance",
    description:
      "Pico Rivera auto insurance: foreign licenses accepted, ITIN-based policies available, SR-22 same-day. Compare 30+ California carriers. Bilingual broker. Free quote.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Pico Rivera Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Pico Rivera, CA"
        subtitle="Comparing top California carriers for Pico Rivera drivers — independent broker service in English, Spanish, and Arabic since 1999."
        breadcrumb="Pico Rivera"
        backgroundImage="/images/hero-friendly-handshake.webp"
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
        title="How we quote Pico Rivera coverage"
        lede="We compare carrier fit for Pico Rivera drivers, homeowners, renters, and businesses with clear next steps before you buy."
      />

      {/* Section 1 — Auto Insurance in Pico Rivera */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Pico Rivera, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Pico Rivera drivers have immediate access to two major freeway systems:
                the 605 (San Gabriel River Freeway) running north-south through the city,
                and Washington Blvd, Rosemead Blvd, Beverly Blvd, and Whittier Blvd
                serving as key east-west surface connectors. These corridors bring Pico Rivera
                residents into close contact with freight traffic, commuters from Whittier and
                the San Gabriel Valley, and the dense urban driving environment shared with
                neighboring cities like Montebello, Commerce, and Downey.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California law requires minimum liability coverage of 30/60/15 — $30,000
                bodily injury per person, $60,000 per accident, and $15,000 in property
                damage. These minimums can be exceeded quickly in a real accident involving
                newer vehicles or significant medical costs. Many Pico Rivera drivers choose
                higher liability limits and add uninsured motorist protection for more
                complete coverage.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Rate factors for Pico Rivera drivers include zip code (90660), vehicle make
                and model, driving record, prior claims, and whether coverage has been
                continuous or lapsed. Drivers with clean records and lower-value vehicles
                can often find cheap car insurance on liability-only coverage. Drivers with
                financed or newer vehicles will typically need full coverage, but comparing
                carriers can still significantly reduce the annual premium.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare more than 30 California carriers
                simultaneously so Pico Rivera drivers see actual market competition — not
                a single company's rate. Going direct to one insurer means you only get one
                data point. Working with an independent broker like Original Insurance means
                every carrier we work with is competing for your business. Our team identifies
                the ones that price your zip code, vehicle, and driving profile most favorably
                and walks you through the tradeoffs in plain, bilingual language.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our Downey office is just minutes west via Washington Blvd. Walk-in quotes
                are welcome, and most are completed in under 10 minutes. Same-day proof of
                insurance is available when you bind a policy with us. We also offer phone
                and online quotes for clients who prefer not to come in.
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
              SR-22 Filing for Pico Rivera Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Pico Rivera drivers facing DMV reinstatement requirements after a suspension,
                uninsured incident, or lapse in coverage can get same-day SR-22 filing through
                our Downey office, just minutes west via Washington Blvd.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a separate insurance policy. It is a certificate your
                insurer submits electronically to the California DMV confirming you carry the
                state-required minimum liability coverage. The DMV requires this filing as a
                condition of license reinstatement following certain events — a suspension, a
                DUI conviction, an at-fault uninsured accident, excessive points, a court order,
                or an extended lapse in coverage.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California generally requires the SR-22 to remain active for three continuous
                years. If the policy lapses or is cancelled during that window, the DMV clock
                resets and your driving privileges may be suspended again. We monitor policy
                status for our clients to minimize the risk of accidental lapses that would
                extend the filing period.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We file SR-22 certificates electronically the same day you bind a qualifying
                policy. Bring your driver's license or DMV reinstatement paperwork, vehicle
                VIN, and any court or DMV case reference number.
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
                Vehicle ownership and the act of driving are separate legal concepts. Pico
                Rivera residents can lawfully own and insure a vehicle in several situations
                without holding a California driver's license.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                We assist: vehicle owners who do not personally drive but need the car insured
                with a licensed driver listed as the primary operator; holders of a valid foreign
                or international driver's license who have not yet converted to a California
                license; and ITIN applicants who do not have a Social Security Number. In all
                these cases, the licensed driver on the policy must be the individual who
                actually operates the vehicle. We never imply, suggest, or advise that driving
                without a valid license is legal under California law.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                With access to 30+ carriers, we can find these programs where single-company
                agents have no options. Useful documents to bring: foreign driver's license,
                passport, ITIN letter, vehicle registration, and any existing insurance
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
              Why Pico Rivera Residents Choose Original Insurance
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
              Cities Near Pico Rivera We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We serve drivers throughout the Southeast LA and San Gabriel River corridor.
              Refer a friend or family member in any of these cities.
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
                Get your Pico Rivera auto insurance quote today
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Just minutes west via Washington Blvd —
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
