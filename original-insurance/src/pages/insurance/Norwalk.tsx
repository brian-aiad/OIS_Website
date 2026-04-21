import { Link } from "react-router-dom";
import { usePageMeta } from "../../lib/seo";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import PageHero from "../../components/PageHero";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import { Reveal } from "../../components/AnimatedSection";

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
      "Auto Insurance Norwalk CA | Cheap Car Insurance, SR-22 | Original Insurance",
    description:
      "Independent insurance broker serving Norwalk, CA. Compare 30+ carriers for auto, SR-22, and no-license programs. Bilingual service near Cerritos College.",
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
        subtitle="Serving Norwalk families and Cerritos College commuters with bilingual insurance from 30+ top California carriers."
        breadcrumb="Norwalk"
        backgroundImage="/images/heroTeam.webp"
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
                Norwalk sits at a busy crossroads in Southeast Los Angeles County, where the 5 Freeway (Santa Ana) and the 605 (San Gabriel River Freeway) intersect and surface streets like Firestone Blvd, Pioneer Blvd, and Rosecrans Ave carry heavy local traffic throughout the day. These corridors connect Norwalk residents to jobs in downtown Los Angeles, Long Beach, and the San Gabriel Valley — and the daily exposure on those roads is one of the biggest factors that shapes what carriers charge for auto insurance in Norwalk. Knowing how to navigate the market and find cheap car insurance that still delivers real protection is where working with an independent broker pays off.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California mandates a minimum liability of 30/60/15 for every driver: $30,000 bodily injury per person, $60,000 bodily injury per accident, and $15,000 property damage. For many Norwalk drivers, those minimums represent a starting point — not an endpoint. On the 5 Freeway or Pioneer Blvd during peak hours, a single collision can easily generate repair bills and medical costs that exceed state minimums, leaving you personally responsible for the difference. Adding uninsured motorist coverage is also worth serious consideration in a region where a significant percentage of drivers carry insufficient coverage or none at all.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The diversity of Norwalk's driving population also creates unique insurance needs. Students and staff commuting to and from Cerritos College on Bloomfield Ave, warehouse and distribution workers heading to industrial corridors off the 5, and families running daily errands on Rosecrans Ave all have different vehicle profiles, risk exposures, and budget constraints. Our approach is to look at your specific situation — driving record, vehicle type, how the car is used, whether it's financed, and your prior coverage history — and then match you to the carrier and coverage tier that fits.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker based in Downey — just minutes west via Firestone Blvd — Original Insurance shops your coverage across more than 30 California-licensed carriers at once. That competition is what consistently produces cheap car insurance options that single-carrier agents simply cannot match. Bundling home or renters insurance, maintaining continuous coverage, and installing safety features are among the factors that can reduce your auto premium further.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our bilingual team explains every option in plain language — English, Spanish, or Arabic — so you understand exactly what you're buying before you commit. There is no extra cost to work with us as a broker; we are compensated by the carrier you select.
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
                Norwalk drivers needing SR-22 filing after a DMV suspension, an uninsured incident, or a court requirement can get same-day electronic filing through our Downey office — just minutes west via Firestone Blvd.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing, not a separate insurance policy. It is a certificate that your insurance carrier submits electronically to the California DMV confirming you maintain at least the state-required minimum liability coverage. Common reasons Norwalk drivers need SR-22 include: a DUI or DWI conviction, an at-fault accident while driving uninsured, a license suspension for excessive points, a lapse in required coverage, or a reinstatement order from a court. Once the filing is submitted, it is immediately visible to the DMV and your reinstatement process can move forward.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California typically requires you to maintain SR-22 status for three consecutive years. Any policy lapse during that window triggers a notification to the DMV from your carrier, which can restart the requirement period. Our team helps Norwalk clients build policies that remain active and properly structured so inadvertent lapses do not derail reinstatement progress. We also work with carriers that specialize in higher-risk profiles, which means competitive SR-22 rates even when other insurers have declined.
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
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Norwalk Residents Choose Original Insurance
            </h2>
            <ul className="space-y-3 text-slate-600">
              {[
                "Independent broker — we work for you, not one insurance company",
                "30+ top-rated California carriers compared in a single quote session",
                "Bilingual English, Spanish, and Arabic service — también hablamos español",
                "Same-day SR-22 electronic filing to the California DMV",
                "No-license and international-license auto insurance programs",
                "25+ years serving Norwalk, Downey, and the Southeast LA County community",
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

      {/* Section 4b: Norwalk Local Context */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Norwalk Roads, Transit, and Auto Insurance Context
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Norwalk sits at the junction of three major freeways: the 605 (San Gabriel River Freeway) runs along the western edge, the 5 (Santa Ana Freeway) cuts through the center, and the 105 (Century Freeway) forms the northern boundary. For daily commuters, these three corridors offer fast connections to downtown Los Angeles, Long Beach, and the San Gabriel Valley — but they also create high-volume merge zones that affect how carriers price coverage for Norwalk ZIP codes 90650, 90651, and 90652.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Surface-street traffic in Norwalk is anchored by Alondra Blvd and Firestone Blvd, two east-west arterials that carry heavy commercial and residential traffic throughout the day. Alondra Blvd is particularly important for local trips — connecting Norwalk to Bellflower, Paramount, and Cerritos — and its mix of residential driveways and commercial intersections creates the kind of stop-and-go conditions that increase fender-bender frequency relative to freeway driving. If Alondra Blvd is part of your regular commute, we factor that in when evaluating carrier options.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The Norwalk/Santa Fe Springs Metrolink station, located near the 5 Freeway, is a key transit hub for commuters riding the 91/Perris Valley Line and the Orange County Line into downtown Los Angeles or toward Riverside. Metrolink users still need to drive or be driven to the station, which means vehicle ownership and insurance remain a practical necessity for most Norwalk households even if they commute by rail for the main leg of their trip. We regularly serve Norwalk clients who park at the Metrolink station during the week and need competitive full coverage for those vehicles.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Cerritos College — straddling the Norwalk/Cerritos border along Bloomfield Ave — draws thousands of students and staff daily, many of whom are young or first-time insurance buyers. If you are a student, parent of a student, or staff member looking for affordable auto insurance that fits a student's driving profile, we compare options across 30+ carriers and can often find rates significantly better than what you would get going directly to a single-company agent. Young drivers benefit most from shopping multiple carriers because the rate spread for that demographic is wider than for experienced drivers.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Norwalk's residential areas vary from dense apartment corridors near the transit station to quieter single-family neighborhoods east of the 605. ZIP code 90650 covers most of the city's residential areas and generally sees competitive pricing from our carrier network. Drivers with clean records, continuous prior coverage, and vehicles in the mid-range value tier tend to get the strongest results from our shopping process. Those with recent violations, lapses, or SR-22 requirements also have strong options — we access specialty carriers that serve the high-risk segment throughout Southeast LA County.
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
              Our Downey office is just minutes west of Norwalk via Firestone Blvd, and we serve drivers and families throughout the surrounding communities in Southeast Los Angeles County. We know the roads, the commute patterns, and the neighborhoods in each of these cities.
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
                  body: "The Norwalk/Santa Fe Springs Metrolink station handles hundreds of daily boarders on the 91/Perris Valley and Orange County Lines. Even if you commute by rail Monday through Friday, your vehicle sits in the park-and-ride all day — and theft, collision in the lot, and vandalism coverage require active comprehensive and collision policies. We structure policies for park-and-ride vehicles that balance low mileage rates with appropriate physical damage coverage."
                },
                {
                  n: "02",
                  title: "Cerritos College students: compare rates before defaulting to your parents' policy",
                  body: "Adding a young driver to a parent's policy is often cheaper than a standalone policy — but not always. Cerritos College students who own their own vehicles can sometimes save by qualifying for good-student discounts, low-mileage programs, or telematics-based rates. We run both scenarios and show you the real numbers, so you're not paying more than necessary for your situation."
                },
                {
                  n: "03",
                  title: "ZIP 90650 vs 90651/90652: know your rate zone",
                  body: "Most residential Norwalk is in ZIP 90650. The 90651 and 90652 codes cover smaller geographic areas but may produce different rate profiles depending on the carrier. When we run quotes, we use your exact street address — not just the city name — to get accurate pricing. A one-block difference in address can sometimes matter to certain carriers."
                },
                {
                  n: "04",
                  title: "The 5/605/105 merge zone affects your premium",
                  body: "Underwriters use ZIP code and address-level data to estimate accident frequency. Norwalk's position between three major freeways means some carriers price this area slightly above average for LA County. Others — particularly those that weigh individual driving record more heavily than geography — can price Norwalk drivers competitively. Our job is to find which carriers work in your favor."
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
                Most quotes take under 10 minutes. Compare 30+ carriers for the best Norwalk rate — with same-day proof of insurance and SR-22 filing available. Our Downey office is just minutes west via Firestone Blvd.
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
