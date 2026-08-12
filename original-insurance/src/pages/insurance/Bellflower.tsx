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

const canonical = "https://originalinsurance.net/insurance/bellflower";

const areaServed = [
  "Bellflower, CA",
  "Downey, CA",
  "Norwalk, CA",
  "Cerritos, CA",
  "Lakewood, CA",
  "Paramount, CA",
  "Whittier, CA",
];

const NEARBY_CITIES = [
  { slug: "downey", name: "Downey" },
  { slug: "norwalk", name: "Norwalk" },
  { slug: "cerritos", name: "Cerritos" },
  { slug: "lakewood", name: "Lakewood" },
  { slug: "paramount", name: "Paramount" },
];

export default function BellflowerPage() {
  usePageMeta({
    title:
      "Auto Insurance in Bellflower, CA | Original Insurance",
    description:
      "Compare auto, renters, home and SR-22 coverage for Bellflower with an independent broker at our nearby Downey office on Paramount Boulevard.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Bellflower Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Bellflower, CA"
        subtitle="Compare auto, home, renters, and SR-22 options for Bellflower with an independent broker at our nearby Downey office."
        breadcrumb="Bellflower"
        backgroundImage="/images/ois-city-community-golden-v4.webp"
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent">
            Get My Bellflower Auto Quote
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="How we quote Bellflower coverage"
        lede="We compare carrier fit for Bellflower drivers, homeowners, renters, and businesses with clear next steps before you buy."
      />

      {/* Section 1: Auto Insurance in Bellflower */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Bellflower, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Bellflower residents can work with our nearby Downey office by phone, online, or in person. We quote the actual driver, vehicle, garaging address, mileage, coverage limits, and deductible choices instead of publishing a generic citywide price that may not apply to you.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                For policies issued or renewed on or after January 1, 2025, California's minimum auto liability limits are 30/60/15: $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. Those figures are a legal minimum, not a recommendation for every driver. We can also quote higher liability limits and optional coverages such as uninsured motorist, comprehensive, collision, rental reimbursement, and roadside assistance when available.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                To make a useful comparison, we keep limits and deductibles consistent across quotes and identify differences in exclusions, payment plans, and required documents. If a vehicle is financed or leased, bring the lender's coverage requirements so each option can be checked against them.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our physical office is in Downey on Paramount Boulevard, not in Bellflower. Lakewood Boulevard is a direct route between the two cities, and remote service is available if visiting the office is inconvenient.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: SR-22 Filing */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SR-22 Filing for Bellflower Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Bellflower drivers who received an SR-22 requirement can ask our Downey office to compare qualifying policies and explain the selected carrier's filing process.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                It is important to understand that an SR-22 is a filing, not a separate insurance policy. It is a certificate that your insurance company submits electronically to the California DMV confirming you carry at least the state-required minimum liability coverage. Common triggers include a DUI conviction, a lapse in coverage, an at-fault accident while uninsured, excessive points on your driving record, or a court-ordered reinstatement requirement. Once your insurer files the SR-22, the DMV acknowledges it and your reinstatement process can move forward.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The required filing period depends on the DMV or court action. If proof is no longer in force, the insurer may notify the DMV and driving privileges can be affected. Electronic filing may be available after a qualifying policy is bound; timing depends on the carrier and DMV systems. Confirm your own start and end dates directly with the DMV.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                For a detailed guide on SR-22 costs, requirements, and what to bring to your appointment, visit our{" "}
                <Link
                  to="/sr22-insurance-downey"
                  className="text-brand-700 font-medium hover:text-brand-900 hover:underline"
                >
                  SR-22 insurance page
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3: No-License & International-License */}
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
                Vehicle ownership and driving are distinct legal concepts, and there are several entirely lawful situations where a Bellflower resident needs auto insurance but does not hold a traditional California driver's license. We work with carriers that understand these situations and are willing to write policies that reflect them appropriately.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Common scenarios we assist with include: a vehicle owner who does not personally drive but needs the car properly insured with a licensed primary driver listed on the policy; individuals who hold a valid foreign or international driver's license issued by another country; newcomers to California who are in the process of transitioning to a California license; and ITIN applicants who do not have a Social Security Number but legally own a vehicle. In all cases, the licensed driver listed on the policy must be the person who actually operates the vehicle — we never advise or imply that operating a vehicle without a valid license is legal or acceptable.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Not every carrier writes these policy types. Because we represent 30+ carriers, we can find options that a single-carrier agent simply cannot offer. Learn more on our dedicated{" "}
                <Link
                  to="/no-license-auto-insurance-downey"
                  className="text-brand-700 font-medium hover:text-brand-900 hover:underline"
                >
                  no-license auto insurance page
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4: Why Bellflower Residents Choose Original */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Bellflower Residents Choose Original Insurance
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

      {/* Section 4b: Bellflower Local Context */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What Bellflower clients should prepare
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                A declarations page from your current policy is the most useful starting point because it shows existing limits, deductibles, drivers, vehicles, and endorsements. If you do not have one, bring each driver's license information, vehicle identification number, garaging address, estimated annual mileage, and financing details.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Tell us about household drivers and regular vehicle use, including commuting, delivery, rideshare, or business activity. Personal auto policies can exclude or restrict some uses, so accurate information helps us approach the appropriate carriers and avoid a misleading quote.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                If you are comparing a bundle, include the property address and current home or renters declarations page. Multi-policy discounts vary, and the lowest combined premium is not always the option with the most suitable limits or deductibles.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                For an SR-22 requirement, bring the DMV or court notice if available. The notice helps identify the filing requirement, while the DMV remains the source of truth for the required start and end dates.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5: Nearby Cities */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cities Near Bellflower We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our office is in Downey on Paramount Boulevard. Bellflower clients can visit by traveling north on Lakewood Boulevard or complete the quote process remotely by phone, text, or online.
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

      {/* Bellflower quote comparison details */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How to compare Bellflower insurance quotes
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-3">Keep the comparison consistent</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Use the same liability limits on every quote</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Match comprehensive and collision deductibles</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Include the same drivers and annual mileage</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Confirm payment-plan fees and required down payment</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Review exclusions before comparing price</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-3">Bring accurate information</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Current declarations page, if available</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Driver and vehicle information</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Garaging address and vehicle use</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Lender requirements for financed vehicles</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>DMV or court notice for an SR-22 requirement</li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-500 leading-relaxed">
              California premiums are individualized, and insurer survey examples are not quotes. We use the applicant's actual information and show current carrier proposals side by side.
            </p>
          </Reveal>
        </div>
      </section>

      <PageTestimonials />

      {/* CTA Block */}
      <section className="sp bg-white">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 p-8 md:p-10 text-center text-white shadow-heavy">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get your Bellflower auto insurance quote
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto leading-relaxed">
                Quote, binding, policy-document, and SR-22 filing timing depend on the carrier and information required. Call, message, or visit our nearby Downey office to review available options.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={openQuoteModal} className="btn btn-accent">
                  Get My Bellflower Quote
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
