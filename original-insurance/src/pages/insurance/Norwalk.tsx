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

const canonical = "https://originalinsurance.net/insurance/norwalk";

const areaServed = [
  "Norwalk, CA",
  "Downey, CA",
  "Bellflower, CA",
  "Cerritos, CA",
  "South Gate, CA",
  "Pico Rivera, CA",
  "Whittier, CA",
];

const NEARBY_CITIES = [
  { slug: "downey", name: "Downey" },
  { slug: "bellflower", name: "Bellflower" },
  { slug: "cerritos", name: "Cerritos" },
  { slug: "south-gate", name: "South Gate" },
  { slug: "pico-rivera", name: "Pico Rivera" },
];

export default function NorwalkPage() {
  usePageMeta({
    title:
      "Auto Insurance in Norwalk, CA | Original Insurance",
    description:
      "Compare auto, home and SR-22 coverage for Norwalk with an independent broker at our nearby Downey office. English, Spanish and Arabic service.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Norwalk Insurance", url: canonical },
      ]} />

      <PageHero
        title="Auto Insurance in Norwalk, CA"
        subtitle="Serving Norwalk families and commuters with bilingual insurance comparisons from our nearby Downey office."
        breadcrumb="Norwalk"
        backgroundImage="/images/ois-city-commercial-corridor-v4.webp"
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent">
            Get My Norwalk Auto Quote
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="How we quote Norwalk coverage"
        lede="We compare carrier fit for Norwalk drivers, homeowners, renters, and businesses with clear next steps before you buy."
      />

      {/* Section 1: Auto Insurance in Norwalk */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Insurance in Norwalk, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Norwalk residents can work with our Downey office in person or remotely. We quote the actual driver, vehicle, garaging address, mileage, use, coverage limits, and deductibles rather than publishing a generic citywide price that may not apply to an individual household.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                For policies issued or renewed on or after January 1, 2025, California's minimum liability limits are 30/60/15: $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. Those limits are a legal minimum, not a recommendation for every household. Higher limits and optional uninsured-motorist, comprehensive, and collision coverage may also be quoted when available.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Vehicle use matters. Tell us whether a car is used for commuting, school, delivery, rideshare, or business activity, and provide lender requirements for financed or leased vehicles. Accurate use and mileage help us approach appropriate carriers and avoid a misleading quote.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker based in Downey, Original Insurance can compare available options from multiple carriers. Discounts and eligibility vary, so we use the same coverage limits and deductibles across quotes and show qualifying discounts separately.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our team can explain options in English, Spanish, or Arabic. Before purchase, we review the limits, deductibles, exclusions, payment requirements, and documents the selected carrier still needs.
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
              SR-22 Filing for Norwalk Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Norwalk drivers with an SR-22 requirement can compare qualifying policies through our Downey office. Electronic filing availability and timing depend on the selected carrier, completed binding requirements, and DMV systems.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a separate insurance policy. It is proof that your insurance carrier submits to the California DMV confirming required financial responsibility. Common triggers can include a DUI conviction, an uninsured accident, a license suspension, or a court or DMV requirement. Filing and reinstatement timing depends on the carrier and DMV systems.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The required filing period depends on the DMV or court action. If proof is no longer in force, the insurer may notify the DMV and driving privileges can be affected. Confirm your own start and end dates with the DMV. We can compare carriers that accept the situation and explain the policy's ongoing requirements.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                For full details on SR-22 costs, what documents to bring, and how the process works, visit our dedicated{" "}
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
                Vehicle ownership is a separate legal matter from holding a California driver's license, and Norwalk has a significant population of residents who find themselves in entirely lawful situations where they need auto insurance but do not yet have — or do not hold — a traditional California license. We work with carriers experienced in these scenarios and write policies that reflect each applicant's actual situation.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The situations we regularly assist with include: a vehicle owner who does not personally drive but needs the car insured with a licensed primary driver properly listed on the policy; holders of a valid foreign driver's license issued by another country who are residing in or visiting California; international license holders in the process of converting to a California license; and ITIN applicants who legally own a vehicle but do not have a Social Security Number. In every case, the licensed driver named on the policy must be the individual who actually operates the vehicle — we are unambiguous that driving without a valid license is not legal and never advise otherwise.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Because we represent more than 30 carriers, we have access to policy types that many single-carrier agents cannot offer. For a full breakdown of documents needed and how these programs work, visit our{" "}
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

      {/* Section 4: Why Norwalk Residents Choose Original */}
      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-3 display-2 text-slate-900">Why Norwalk Residents Choose Original Insurance</h2>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5" /></svg>,
                title: "Independent broker",
                desc: "We work for you, not one insurance company",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "30+ carriers compared",
                desc: "Side-by-side quotes from multiple California carriers in a single session",
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
                desc: "Foreign license, ITIN, and international-license auto insurance programs",
              },
              {
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "25+ years serving SE LA",
                desc: "Norwalk, Downey, and the Southeast LA County community since 1999",
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

      {/* Section 4b: Norwalk Local Context */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Norwalk vehicle-use details that affect a quote
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Norwalk clients use vehicles for many different purposes, including commuting, school, delivery, household errands, and business activity. Accurately describing the use and estimated annual mileage helps carriers evaluate the actual application instead of relying on a generic city assumption.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Tell us whether each vehicle is personally owned, financed, leased, or used for an employer or independent business. A personal auto policy may restrict delivery, rideshare, or other commercial use, and lenders may require particular physical-damage coverage and deductibles.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The Norwalk/Santa Fe Springs Metrolink station and the 5 and 605 freeways shape many local commutes. When a vehicle is used for station access, commuting, delivery, or other business activity, accurate use and annual-mileage details help carriers price the policy correctly.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Cerritos College sits near the Norwalk and Cerritos border along Bloomfield Avenue. Students, parents, and staff may have different vehicle use, mileage, and household-driver details, so accurate information matters. We compare suitable carriers and explain how limits, deductibles, and optional coverage affect the quote.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Use the complete address where the vehicle is principally garaged, list household and regular drivers accurately, and disclose recent incidents or coverage lapses. Complete information lets us compare proposals consistently and reduces the risk that a carrier changes or withdraws a preliminary quote.
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
              Cities Near Norwalk We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our office is in Downey on Paramount Boulevard. Norwalk clients can visit in person or complete the quote process remotely by phone, text, or online.
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

      {/* Norwalk Commuter & Student Insurance Guide */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Norwalk Commuter and Student Insurance: What to Know
            </h2>
            <div className="space-y-4">
              {[
                {
                  n: "01",
                  title: "Metrolink commuters still need car insurance",
                  body: "If you drive to the Norwalk/Santa Fe Springs Metrolink station, tell the carrier how the vehicle is used and where it is parked. Comprehensive and collision cover different physical-damage risks, and each is subject to the policy terms and deductible."
                },
                {
                  n: "02",
                  title: "Students should disclose the actual driver and garaging address",
                  body: "A student's ownership, household, primary driver, school location, vehicle location, and use can affect eligibility. Some carriers offer qualifying student or mileage-based discounts; availability and privacy terms should be reviewed before enrollment."
                },
                {
                  n: "03",
                  title: "Use the correct garaging address",
                  body: "Insurers require the address where the vehicle is principally garaged. Use the complete, accurate address and tell us if the vehicle is kept somewhere different from the mailing address so each quote is based on consistent information."
                },
                {
                  n: "04",
                  title: "Compare the same coverage on every proposal",
                  body: "California premiums are individualized. We keep liability limits, optional coverages, and deductibles consistent across proposals, then identify carrier-specific differences instead of claiming that Norwalk has one universal premium."
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-5 bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-soft">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-800 text-white grid place-items-center text-sm font-extrabold">{item.n}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PageTestimonials tone="white" />

      {/* CTA Block */}
      <section className="sp bg-white">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 p-8 md:p-10 text-center text-white shadow-heavy">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get your Norwalk auto insurance quote
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto leading-relaxed">
                Quote, binding, policy-document, and SR-22 filing timing depend on the carrier and information required. Our Downey office serves Norwalk clients in person and remotely.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={openQuoteModal} className="btn btn-accent">
                  Get My Norwalk Quote
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
