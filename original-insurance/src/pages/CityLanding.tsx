import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import { Reveal } from "../components/AnimatedSection";
import { Icons } from "../components/Icons";
import { Car, Home, Heart, Building2, Bike, FileText } from "lucide-react";
import { CTASection, Section, SectionHeader } from "../design-system";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";

/**
 * Per-city landing pages for local SEO. Each city gets a unique URL,
 * unique <title>, unique H1, and LocalBusiness areaServed JSON-LD so
 * Google can surface it for "auto insurance <city>" and "insurance
 * broker near <city>" searches.
 *
 * Route: /insurance/:citySlug
 */

type CityInfo = {
  slug: string;
  name: string;
  /** Neighborhood/landmark color used in the intro paragraph */
  blurb: string;
  /** Approx driving distance/highway hint from the Downey office */
  distance: string;
  /** Populated nearby zip codes — helps with long-tail "insurance 90242" queries */
  zips: string[];
};

const CITIES: CityInfo[] = [
  {
    slug: "downey",
    name: "Downey",
    blurb:
      "Our home base. We've insured Downey drivers, homeowners, and small businesses from our Paramount Blvd office since 1999.",
    distance: "In-town — walk-ins welcome",
    zips: ["90240", "90241", "90242"],
  },
  {
    slug: "norwalk",
    name: "Norwalk",
    blurb:
      "Just east of Downey off the 5 freeway, we serve hundreds of Norwalk families and Cerritos College commuters with bilingual auto, home, and SR-22 policies.",
    distance: "~5 minutes east via Firestone Blvd",
    zips: ["90650", "90651", "90652"],
  },
  {
    slug: "bellflower",
    name: "Bellflower",
    blurb:
      "A quick hop down Lakewood Blvd, Bellflower residents come to us for competitive auto rates, renters coverage, and commercial BOPs.",
    distance: "~7 minutes south via Lakewood Blvd",
    zips: ["90706"],
  },
  {
    slug: "lynwood",
    name: "Lynwood",
    blurb:
      "Our Spanish-speaking team handles Lynwood's auto, no-license, and SR-22 filings with same-day proof of insurance.",
    distance: "~8 minutes west via Imperial Hwy",
    zips: ["90262"],
  },
  {
    slug: "cerritos",
    name: "Cerritos",
    blurb:
      "Cerritos homeowners and business owners count on us to compare 30+ carriers for homeowners, umbrella, and commercial liability coverage.",
    distance: "~10 minutes east via 605 freeway",
    zips: ["90703"],
  },
  {
    slug: "whittier",
    name: "Whittier",
    blurb:
      "From Uptown Whittier to East Whittier, we find Whittier drivers and families better rates on auto, home, and life insurance.",
    distance: "~10 minutes northeast via Whittier Blvd",
    zips: ["90601", "90602", "90603", "90604", "90605", "90606"],
  },
  {
    slug: "lakewood",
    name: "Lakewood",
    blurb:
      "Lakewood homeowners use our multi-carrier shopping to bundle home and auto for 10–15% savings.",
    distance: "~10 minutes south via Lakewood Blvd",
    zips: ["90712", "90713", "90715"],
  },
  {
    slug: "paramount",
    name: "Paramount",
    blurb:
      "Our office sits right on Paramount Blvd — Paramount residents and businesses get the fastest turnaround and walk-in service.",
    distance: "Neighboring city — 3 minutes away",
    zips: ["90723"],
  },
  {
    slug: "south-gate",
    name: "South Gate",
    blurb:
      "Bilingual auto, home, and commercial coverage for South Gate families and small businesses, with same-day SR-22 filings.",
    distance: "~10 minutes west via Firestone Blvd",
    zips: ["90280"],
  },
  {
    slug: "pico-rivera",
    name: "Pico Rivera",
    blurb:
      "Pico Rivera drivers save by letting us compare California's top carriers in a single phone call.",
    distance: "~8 minutes north via Rosemead Blvd",
    zips: ["90660"],
  },
  {
    slug: "montebello",
    name: "Montebello",
    blurb:
      "Montebello homeowners and commuters get competitive auto, home, and life quotes — with English, Spanish, and Arabic service.",
    distance: "~12 minutes north via 605 freeway",
    zips: ["90640"],
  },
  {
    slug: "commerce",
    name: "Commerce",
    blurb:
      "We write commercial auto, BOP, and workers' comp policies for City of Commerce small businesses and owner-operators.",
    distance: "~10 minutes northwest via 710 freeway",
    zips: ["90022", "90040"],
  },
];

const CITY_MAP = Object.fromEntries(CITIES.map((c) => [c.slug, c])) as Record<string, CityInfo>;

const COVERAGE_LINES = [
  { title: "Auto Insurance", desc: "Liability, full coverage, SR-22, and no-license programs.", Icon: Car },
  { title: "Home & Renters", desc: "Homeowners, condo, and renters policies from $15/month.", Icon: Home },
  { title: "Life Insurance", desc: "Term and whole life — protect your family's future.", Icon: Heart },
  { title: "Commercial", desc: "General liability, BOPs, commercial auto, and workers' comp.", Icon: Building2 },
  { title: "Motorcycle & RV", desc: "Riders, recreational vehicles, and weekend toys covered.", Icon: Bike },
  { title: "SR-22 Filing", desc: "Same-day electronic SR-22 filing to the California DMV.", Icon: FileText },
];

export default function CityLanding() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const requestedCity = citySlug ? CITY_MAP[citySlug] : undefined;
  const city = requestedCity ?? CITIES[0];

  // Unknown city → 404
  const canonical = `https://originalinsurance.net/insurance/${city.slug}`;

  usePageMeta({
    title: `Auto Insurance ${city.name} CA — Same-Day, No License | Original`,
    description: `Get auto insurance in ${city.name}, CA. Same-day eID cards, SR-22 filing, no-license programs. Compare 30+ carriers with a bilingual broker. Free quote — call or walk in.`,
    canonical,
  });

  /* BreadcrumbList JSON-LD — InsuranceAgency now handled by LocalBusinessSchema component */
  useEffect(() => {
    const crumbLd = document.createElement("script");
    crumbLd.type = "application/ld+json";
    crumbLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://originalinsurance.net/" },
        { "@type": "ListItem", position: 2, name: "Locations", item: "https://originalinsurance.net/locations" },
        { "@type": "ListItem", position: 3, name: city.name, item: canonical },
      ],
    });
    document.head.appendChild(crumbLd);
    return () => { crumbLd.remove(); };
  }, [canonical, city.name]);

  const nearby = CITIES.filter((c) => c.slug !== city.slug).slice(0, 6);
  const isDowney = city.slug === "downey";
  const areaServed = [
    `${city.name}, CA`,
    ...["Downey, CA", "Norwalk, CA", "Bellflower, CA", "Lynwood, CA", "Paramount, CA", "Lakewood, CA", "Whittier, CA"].filter(
      (s) => s !== `${city.name}, CA`
    ),
  ];

  if (!requestedCity) return <Navigate to="/404" replace />;

  return (
    <main id="main-content">
      <LocalBusinessSchema url={canonical} areaServed={areaServed} />
      <PageHero
        title={`Insurance Broker in ${city.name}, CA`}
        subtitle={`Independent coverage from 30+ carriers — serving ${city.name} since 1999.`}
        breadcrumb={city.name}
        backgroundImage={isDowney ? "/images/downey-neighborhood.webp" : "/images/ois-city-community-golden-v4.webp"}
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <a href={site.contact.phoneHref} className="btn btn-accent">
            <Icons.Phone className="w-4 h-4" />
            Call {site.contact.phone}
          </a>
          <button onClick={openQuoteModal} className="btn btn-ghost-light">
            Get a Free Quote
          </button>
        </div>
      </PageHero>

      <StatsBar />

      {/* Downey hub — popular insurance needs */}
      {isDowney && (
        <Section tone="offwhite">
          <div className="container max-w-4xl">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Popular Downey insurance needs
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Auto Insurance in Downey", desc: "Compare 30+ carriers for liability, full coverage, and same-day quotes.", to: "/auto-insurance-downey-ca" },
                  { title: "SR-22 Filing", desc: "Same-day electronic SR-22 filing to the California DMV.", to: "/sr22-insurance-downey" },
                  { title: "No-License / Foreign-License", desc: "Coverage options for vehicle owners without a traditional CA license.", to: "/no-license-auto-insurance-downey" },
                  { title: "Commercial Auto Insurance", desc: "Business auto and fleet coverage for Downey area companies.", to: "/services" },
                ].map((card, i) => (
                  <Link
                    key={i}
                    to={card.to}
                    className="block bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:ring-brand-300 transition-all"
                  >
                    <h3 className="font-bold text-slate-900 mb-1">{card.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-700">
                      Learn more
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Intro */}
      <Section tone="light">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Trusted insurance for {city.name} families and businesses
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">{city.blurb}</p>
            <p className="text-base text-slate-500 leading-relaxed">
              As an independent brokerage we compare policies from more than 30 top-rated California carriers so{" "}
              {city.name} residents only pay for the coverage they actually need. Our bilingual English, Spanish, and
              Arabic team handles everything from same-day SR-22 filings to homeowners bundling. Our Downey office is{" "}
              <strong>{city.distance.toLowerCase()}</strong> from {city.name}, and phone and email quotes are
              available if driving in isn't convenient.
            </p>

            {/* Zip codes — helps long-tail SEO */}
            {city.zips.length > 0 && (
              <p className="mt-6 text-sm text-slate-500">
                <strong className="text-slate-700">Zip codes served in {city.name}:</strong>{" "}
                {city.zips.join(", ")}
              </p>
            )}
          </Reveal>
        </div>
      </Section>

      <InsuranceWorkflow
        tone="light"
        title={`How we quote ${city.name} coverage`}
        lede={`We compare carrier fit for ${city.name} drivers, homeowners, renters, and businesses with clear next steps before you buy.`}
      />

      {/* Coverage grid */}
      <Section tone="offwhite">
        <div className="container">
          <SectionHeader title={`Insurance we write for ${city.name}`} align="center" className="mb-8" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {COVERAGE_LINES.map((line, i) => {
              const Icon = line.Icon;
              return (
                <Reveal key={line.title} delay={i * 0.05}>
                  <Link
                    to="/services"
                    className="block h-full bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:ring-brand-300 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-50 ring-1 ring-brand-100 grid place-items-center mb-4">
                      <Icon className="w-5 h-5 text-brand-700" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{line.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{line.desc}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Why us */}
      <Section tone="light">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Why {city.name} residents choose Original Insurance
            </h2>
            <ul className="space-y-3 text-slate-600">
              {[
                "Independent broker — we work for you, not one insurance company",
                "30+ top-rated California carriers compared in a single quote",
                "Bilingual English, Spanish, and Arabic service — también hablamos español",
                "Same-day SR-22 electronic filing to the California DMV",
                "No-license and international-license auto programs",
                "25+ years serving the Downey / Southeast LA community",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Nearby cities — internal linking */}
      <Section tone="offwhite">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-xl font-bold text-slate-900 mb-4">We also serve nearby</h2>
            <div className="flex flex-wrap gap-2">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  to={`/insurance/${c.slug}`}
                  className="text-sm font-medium bg-white text-slate-700 rounded-lg px-3 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </div>

            {/* Links to money pages */}
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap gap-3">
              <Link to="/auto-insurance-downey-ca" className="text-sm font-medium text-brand-700 hover:text-brand-900 hover:underline">
                Auto insurance in Downey, CA
              </Link>
              <span className="text-slate-300">·</span>
              <Link to="/sr22-insurance-downey" className="text-sm font-medium text-brand-700 hover:text-brand-900 hover:underline">
                SR-22 filing in Downey
              </Link>
              <span className="text-slate-300">·</span>
              <Link to="/no-license-auto-insurance-downey" className="text-sm font-medium text-brand-700 hover:text-brand-900 hover:underline">
                No-license auto insurance
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        title={`Ready for a free ${city.name} quote?`}
        lede="Most quotes take under 10 minutes. Call, message, or stop by our Downey office - walk-ins welcome."
        secondaryLabel={`Call ${site.contact.phone}`}
      />
    </main>
  );
}
