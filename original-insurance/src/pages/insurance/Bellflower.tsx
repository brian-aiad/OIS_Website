import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import { Reveal } from "../../components/AnimatedSection";

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
      "Bellflower Auto Insurance — SR-22, No License | Original",
    description:
      "Bellflower drivers: compare auto from 30+ carriers. SR-22 same-day, no-license programs, home & auto bundles. Our Downey office is ~7 min south on Lakewood Blvd.",
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
        subtitle="Independent auto and home coverage for Bellflower families — comparing 30+ carriers since 1999. Just minutes south of Downey via Lakewood Blvd."
        breadcrumb="Bellflower"
        backgroundImage="/images/heroTeam.webp"
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
                Bellflower drivers navigate some of the busiest corridors in Southeast Los Angeles County every day. Whether you commute east on the 91 Freeway (Artesia Freeway), merge onto the 605 (San Gabriel River Freeway) to reach Long Beach or the San Gabriel Valley, or travel local arterials like Lakewood Blvd and Bellflower Blvd, the traffic density and vehicle volume on these routes directly influence what carriers charge for auto insurance in Bellflower. Understanding how those factors affect your premium — and knowing how to find cheap car insurance that still provides real protection — is where an independent broker makes a genuine difference.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California state law requires every driver to carry a minimum liability of 30/60/15: $30,000 bodily injury per person, $60,000 bodily injury per accident, and $15,000 property damage liability. While these minimums let you legally register a vehicle and drive in Bellflower, they often fall short when a real accident involves a newer vehicle or serious injuries. Medical costs alone can exceed the 30/60 threshold quickly, leaving you personally exposed for anything beyond your policy limits. Many Bellflower residents opt for higher liability limits and add uninsured motorist coverage — a smart choice given that California consistently ranks among the states with the highest proportion of uninsured drivers on the road.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The specific corridors you drive also matter to underwriters. The 91 Freeway through the Bellflower/Artesia area sees heavy congestion during both morning and evening peak hours, and the 605/91 interchange carries interchange-specific risk factors that carriers weigh when calculating premiums. If you park on Bellflower Blvd or in areas with higher foot traffic, comprehensive coverage for theft and vandalism becomes more relevant than it might be in a quieter suburb.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent insurance broker based in Downey — just minutes north via Lakewood Blvd — Original Insurance compares rates from more than 30 top-rated California carriers simultaneously. That means you see real market competition rather than one company's take-it-or-leave-it price. Rate factors we look at together include your driving record, vehicle year and value, whether the car is financed, your zip code within Bellflower (90706), your prior coverage history, and any multi-policy discounts from bundling home or renters insurance.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Whether you need cheap car insurance to satisfy a lender's requirement, full coverage on a newer vehicle, or just want to make sure you're not overpaying on a policy you've held for years without shopping it, our team is ready to compare options for you in plain language. There is no extra charge to work with us — we are compensated by the carrier you choose.
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
                Bellflower drivers facing a license suspension, a lapse in auto coverage, or a DMV reinstatement requirement can file their SR-22 the same day through our Downey office.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                It is important to understand that an SR-22 is a filing, not a separate insurance policy. It is a certificate that your insurance company submits electronically to the California DMV confirming you carry at least the state-required minimum liability coverage. Common triggers include a DUI conviction, a lapse in coverage, an at-fault accident while uninsured, excessive points on your driving record, or a court-ordered reinstatement requirement. Once your insurer files the SR-22, the DMV acknowledges it and your reinstatement process can move forward.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California generally requires SR-22 maintenance for three consecutive years. If your policy lapses at any point during that period, your carrier is required to notify the DMV and your reinstatement clock can restart. Our team helps Bellflower clients structure their policies to avoid unintentional lapses — and if you do need same-day filing, we can have the SR-22 submitted to the DMV electronically on the same day you bind coverage. Most clients leave with proof of insurance and confirmation of the filing in hand.
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
            <ul className="space-y-3 text-slate-600">
              {[
                "Independent broker — we work for you, not one insurance company",
                "30+ top-rated California carriers compared in a single quote session",
                "Bilingual English, Spanish, and Arabic service — también hablamos español",
                "Same-day SR-22 electronic filing to the California DMV",
                "No-license and international-license auto insurance programs",
                "25+ years serving the Downey and Southeast LA County community",
              ].map((point) => (
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

      {/* Section 4b: Bellflower Local Context */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Bellflower Neighborhoods, Roads, and Your Insurance Rate
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Bellflower sits at the intersection of two major freeway corridors: the 605 (San Gabriel River Freeway) runs along the city's eastern edge, and the 91 (Artesia Freeway) cuts through the southern portion. The 605/91 interchange near Cerritos Ave is one of the busier interchange points in Southeast LA County, and drivers who regularly use either freeway for their commute will find that their ZIP code and daily route play a measurable role in what carriers charge.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The two primary ZIP codes in Bellflower — 90706 (north and central) and 90707 (south, near Artesia Blvd) — can produce slightly different rate profiles even for drivers with identical records. Underwriters treat high-traffic corridors like Artesia Blvd and Bellflower Blvd as risk factors, particularly in ZIP code 90707 where surface-street density is higher. If you live near Simms Park or the Artesia Blvd commercial strip, comprehensive coverage for theft and vandalism is worth discussing given the level of foot traffic in those areas.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Commuters heading north to Downey or west toward Lynwood and South Gate often travel Lakewood Blvd and Long Beach Blvd, two arterials that see heavy volume during rush hours. Those heading east use Artesia Blvd as a connector to the 605. Our team is familiar with these specific routes and can identify carriers that price the Bellflower market competitively for drivers in your exact situation — whether you commute short distances locally or drive longer distances to employment in downtown Los Angeles or the South Bay.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Bellflower has a substantial working-class and immigrant community, which creates real demand for no-license programs, SR-22 filings, and minimum-liability policies that let residents maintain legal vehicle registration at the lowest possible cost. At the same time, many Bellflower homeowners bundle auto and renters or homeowners insurance — a combination we can often package across the same carrier to unlock multi-policy discounts. Whether you are a renter in the apartment corridors near Bellflower Blvd or a homeowner in the quieter residential streets between Clark Ave and Woodruff Ave, we have options for your situation.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                One practical note for Bellflower commuters: California's minimum liability limits (30/60/15) were last updated decades ago, and repair costs for modern vehicles have far outpaced them. A $15,000 property damage limit may not cover the full repair bill for a newer SUV or pickup truck. We take time in every quote session to walk through what the real-world numbers mean, so you can decide whether the cheapest option genuinely fits your risk tolerance or whether slightly higher limits offer much better protection for a modest premium difference.
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
              Our Downey office is just minutes north of Bellflower via Lakewood Blvd, making it easy to serve drivers and families throughout the surrounding communities. We are familiar with the roads, commute patterns, and neighborhood characteristics throughout this part of Southeast LA County.
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

      {/* Bellflower ZIP Code Coverage Details */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Bellflower Insurance by ZIP Code: 90706 vs 90707
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-3">ZIP 90706 — North &amp; Central</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Residential streets: Clark Ave, Woodruff Ave, Virginia Ave corridor</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Proximity to Lakewood Blvd — primary north-south commute to Downey</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Lower traffic density than 90707 — typically competitive rate profiles</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Simms Park neighborhood — popular family area with active pedestrian traffic</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Good candidate for bundling auto + renters insurance</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-soft">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-3">ZIP 90707 — South (Artesia Area)</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Artesia Blvd corridor — high commercial density, more claims activity</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>605/91 interchange access — freeway commuters with longer-range exposure</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Higher foot traffic near Artesia commercial strip</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>Comprehensive for theft and vandalism is more relevant here</li>
                  <li className="flex gap-2"><span className="text-gold-500 font-bold">·</span>SR-22 and no-license programs common — we serve this profile well</li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-500 leading-relaxed">
              Rate differences between ZIP codes in Bellflower can be meaningful — sometimes $20–$40 per month on otherwise identical profiles. We compare actual carrier quotes for your address rather than using a generalized city-level estimate.
            </p>
          </Reveal>
        </div>
      </section>

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
                Most quotes take under 10 minutes. Compare 30+ carriers and get same-day proof of insurance — or same-day SR-22 filing if you need it. Call, message, or stop by our Downey office, just minutes north via Lakewood Blvd.
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
