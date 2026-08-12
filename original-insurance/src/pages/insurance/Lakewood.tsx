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
      "Auto & Home Insurance in Lakewood, CA | Original",
    description:
      "Compare auto, home, renters and potential bundle options for Lakewood with an independent broker at our nearby Downey office.",
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
        subtitle="Helping Lakewood households compare auto, home, renters, and bundle options from our nearby Downey office."
        breadcrumb="Auto Insurance Lakewood"
        backgroundImage="/images/ois-city-community-golden-v4.webp"
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
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

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="How we quote Lakewood coverage"
        lede="We compare carrier fit for Lakewood drivers, homeowners, renters, and businesses with clear next steps before you buy."
      />

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
                Lakewood residents can work with our Downey office in person or remotely. We compare auto coverage using the actual driver, vehicle, garaging address, annual mileage, use, limits, and deductibles rather than assigning one price or risk profile to the entire city.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                For policies issued or renewed on or after January 1, 2025, California's minimum liability limits are 30/60/15: $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. Those limits are a legal minimum, not a recommendation for every household. Financed or leased vehicles may be subject to lender coverage requirements.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare multiple California carriers. Lakewood residents can review options from more than one company instead of seeing a single carrier's price. Rate factors include driving history, vehicle type, ZIP code, prior claims, annual mileage, and whether you qualify for a home and auto bundle. Multi-policy discounts vary, so we compare the combined price and coverage with separate-carrier options.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Our team can explain options in English, Spanish, or Arabic. Before purchase, we review limits, deductibles, exclusions, payment requirements, and documents the selected carrier still needs so the comparison is based on more than price alone.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Some carriers offer home-and-auto discounts, but a bundle is not automatically the lowest total cost or best coverage fit. We compare the combined premium, limits, deductibles, and exclusions with separate-carrier options before you decide.
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
                Lakewood drivers with an SR-22 requirement can compare qualifying policies through our Downey office. Electronic filing availability and timing depend on the selected carrier, completed binding requirements, and DMV systems.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a standalone insurance policy. It is a certificate your insurance carrier submits electronically to the California DMV confirming that you carry the state-required minimum liability coverage. Common reasons a Lakewood driver might need one include a lapse in insurance coverage, an at-fault accident while uninsured, a DUI or reckless driving conviction, a license suspension, or a reinstatement order from the DMV or a court.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The required filing period depends on the DMV or court action. If proof is no longer in force, the insurer may notify the DMV and driving privileges can be affected. Confirm your own end date with the DMV and keep carrier contact and payment information current.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                To get started, bring your driver's license or DMV paperwork, vehicle identification number, and any court or DMV reference numbers. Electronic filing may be available after a qualifying policy is bound; timing depends on the carrier and DMV systems. See our dedicated SR-22 guide for details.
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
                Ready for a Free Lakewood Auto Quote?
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Quote, binding, policy-document, and SR-22 filing timing depend on the carrier and information required. Review auto, home, and SR-22 options through one nearby office.
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
