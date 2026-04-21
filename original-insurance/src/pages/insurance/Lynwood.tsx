import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import { Reveal } from "../../components/AnimatedSection";

const canonical = "https://originalinsurance.net/insurance/lynwood";
const areaServed = [
  "Lynwood, CA",
  "Downey, CA",
  "South Gate, CA",
  "Paramount, CA",
  "Bellflower, CA",
  "Norwalk, CA",
];

const NEARBY_CITIES = [
  { name: "Downey", slug: "downey" },
  { name: "South Gate", slug: "south-gate" },
  { name: "Paramount", slug: "paramount" },
];

export default function LynwoodPage() {
  usePageMeta({
    title:
      "Auto Insurance Lynwood CA | Cheap Car Insurance, SR-22 | Original Insurance",
    description:
      "Independent insurance broker serving Lynwood, CA. Bilingual auto, no-license, and SR-22 insurance. English, Spanish, Arabic service.",
    canonical,
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />

      <PageHero
        title="Auto Insurance in Lynwood, CA"
        subtitle="Bilingual English, Spanish, and Arabic insurance service for Lynwood families — SR-22 filing, no-license programs, and 30+ carrier options."
        breadcrumb="Auto Insurance Lynwood"
        backgroundImage="/images/heroTeam.webp"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent">
            Get a Free Lynwood Quote
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
              Auto Insurance in Lynwood, CA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Lynwood is a dense, working-class community in the heart of southeast Los Angeles County, bordered by major transportation corridors including the 710 (Long Beach Freeway) to the west and the 105 (Century Freeway) along the northern edge. Surface streets like Imperial Hwy, Long Beach Blvd, and Atlantic Ave carry heavy traffic throughout the day, connecting Lynwood residents to employment centers in downtown Los Angeles, Long Beach, and the industrial areas of the 710 corridor. This combination of freeway access and busy surface streets means auto insurance pricing in Lynwood reflects a high-traffic environment.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California requires all registered vehicles to carry minimum liability of 30/60/15 — $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. These minimums represent the legal floor. In a city with heavy daily commutes, significant commercial truck traffic on the 710, and proximity to freeway on- and off-ramps, many Lynwood families choose higher limits and add uninsured motorist coverage to protect against the substantial number of uninsured drivers on California roads.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we compare rates from more than 30 top-rated California carriers simultaneously. Lynwood residents who are looking for cheap car insurance get real market options, not a single company's pricing. Rate factors that affect your premium include driving history, vehicle type, ZIP code, annual mileage, and continuous coverage history. Drivers who have maintained uninterrupted insurance coverage — even at minimum limits — often qualify for better rates when upgrading to full coverage. Those coming off a lapse or an SR-22 situation still have options; our carrier access means we can find policies where standard carriers may decline.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Our bilingual English, Spanish, and Arabic team has served Southeast LA families since 1999. Lynwood's diverse community is one we know well — many of our clients speak Spanish or Arabic as their primary language, and every one of our bilingual staff members explains policy options clearly so there is never a language barrier when making an important coverage decision. We are paid by the carrier you choose, not by steering you toward a specific policy, which means the advice you receive is genuinely independent.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Whether you commute on Imperial Hwy each morning, drive on Long Beach Blvd for work, or are a vehicle owner looking for cheap car insurance that covers your specific situation, we can compare options and have proof of insurance ready often the same day you contact us.
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
              SR-22 Filing for Lynwood Drivers
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Lynwood drivers needing SR-22 filing after an uninsured accident, a license suspension, or a lapse in coverage can get same-day electronic filing through our Downey office, accessible via the 710 or Imperial Hwy.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                It is essential to understand that an SR-22 is a filing, not a separate insurance policy. It is a certificate your insurance carrier transmits electronically to the California DMV confirming you carry the state-required minimum liability coverage. Common triggers include an uninsured at-fault accident, a policy lapse or cancellation, a DUI or reckless driving conviction, a court-ordered reinstatement requirement, or a DMV-mandated filing following a license suspension.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                In California, SR-22 status typically must be maintained continuously for three years. Any lapse in coverage, missed payment, or policy cancellation during that period triggers a notification from the carrier to the DMV and can result in an immediate re-suspension of your license — restarting the entire reinstatement timeline. Lynwood clients who come to us for SR-22 filing benefit from our monitoring of policy status throughout the three-year requirement period.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                To get started at our Downey office, bring your driver's license or DMV reinstatement paperwork, your vehicle VIN, and any court or DMV reference numbers. Most Lynwood clients leave with the SR-22 electronically submitted and proof of insurance in hand the same day they visit. For a full explanation of SR-22 cost, duration, and what the process looks like step by step, visit our dedicated SR-22 page.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/sr22-insurance-downey"
                className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-900 hover:underline"
              >
                Full SR-22 Guide for Lynwood Drivers
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
                Under California law, vehicle ownership and driving are distinct legal matters. There are several entirely lawful situations in which a Lynwood vehicle owner needs auto insurance but does not hold a traditional California driver's license. We work with carriers that specifically offer programs for these circumstances.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Situations we regularly assist with include: vehicle owners who do not personally drive but need the car covered under a licensed primary driver named on the policy; holders of a valid foreign driver's license issued by another country; international visitors or temporary California residents carrying a recognized international driving permit; and ITIN-based applicants who do not have a Social Security Number. Lynwood's significant immigrant community includes many households that fall into one of these categories. In all cases, the person listed as the primary driver must be the individual who is legally permitted to and actually operates the vehicle. We are clear with every client that operating a vehicle without a valid California or recognized foreign license is not lawful and is not something we advise, suggest, or facilitate.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our access to more than 30 carriers means we can find qualifying policies where a single-carrier agent cannot. Documents that help expedite the process include a foreign or international driver's license, passport, ITIN letter, current vehicle registration, and any existing declarations page. For a detailed guide to how these programs work and what documentation is required, visit our no-license insurance page.
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
              Why Lynwood Residents Choose Original Insurance
            </h2>
            <ul className="space-y-3 text-slate-600">
              {[
                "Independent broker — we work for you, not one insurance company",
                "30+ top-rated California carriers compared in a single quote",
                "Fluent bilingual service in English, Spanish, and Arabic",
                "Same-day SR-22 electronic filing to the California DMV",
                "No-license and international-license auto programs for vehicle owners",
                "ITIN-based applicants welcome — no Social Security Number required for a quote",
                "Downey office easily reachable from Lynwood via the 710 or Imperial Hwy",
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
              Cities Near Lynwood We Also Serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Lynwood sits at the center of a dense network of southeast LA communities. We serve drivers and families throughout the area, including Compton to the south, and our Downey office is reachable from all surrounding neighborhoods via the 710, 105, or surface streets like Imperial Hwy and Long Beach Blvd.
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
                Ready for a Free Lynwood Auto Quote?
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Most quotes take under 10 minutes. Bilingual service in English, Spanish, and Arabic — SR-22 filing, no-license programs, and 30+ carrier comparisons available same day.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={openQuoteModal} className="btn btn-accent">
                  Get My Lynwood Quote
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
