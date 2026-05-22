import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import PageHero from "../components/PageHero";
import FAQSchema from "../components/seo/FAQSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { Reveal } from "../components/AnimatedSection";
import { Icons } from "../components/Icons";

/**
 * Visible answers — rich, 2-5 sentences, may include links and local context.
 * Schema answers — short, factual, no CTAs, no phone numbers.
 */

type FaqItem = {
  q: string;
  /** Displayed on page — can include links via renderA */
  a: string;
  /** For FAQPage JSON-LD — short, neutral, no CTA or phone */
  schemaA: string;
};

type FaqGroup = {
  id: string;
  heading: string;
  items: FaqItem[];
};

const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "cost-coverage",
    heading: "Cost & Coverage",
    items: [
      {
        q: "How much does car insurance cost in Downey?",
        a: "Most Downey drivers pay between $80 and $180 per month depending on age, driving record, vehicle type, coverage level, and zip code. Rates also vary significantly by carrier — which is exactly why working with an independent broker who compares 30+ carriers in one call makes a real difference. See our full breakdown on the Downey auto insurance page.",
        schemaA: "Car insurance in Downey, CA typically costs between $80 and $180 per month for most drivers, varying by driving record, vehicle type, coverage level, and zip code.",
      },
      {
        q: "What is the difference between liability and full coverage?",
        a: "Liability-only covers damage and injuries you cause to others. Full coverage adds collision (damage to your own vehicle in a crash) and comprehensive (theft, weather, vandalism, fire). California's minimum requires liability only, but lenders typically require full coverage on financed or leased vehicles. Most Downey commuters with newer or higher-value cars benefit from full coverage.",
        schemaA: "Liability insurance covers damage and injuries you cause to others. Full coverage adds collision and comprehensive, which cover damage to your own vehicle from crashes, theft, weather, and other events.",
      },
      {
        q: "What affects my car insurance rate?",
        a: "The main factors are your driving history (at-fault accidents, tickets, DUIs), your vehicle's make, model, and year, the coverage level you select, your zip code, your age, and whether you've had prior coverage lapses. Bundling home and auto or maintaining continuous coverage can reduce your rate.",
        schemaA: "Car insurance rates are primarily affected by driving history, vehicle type and value, coverage level, zip code, age, and prior coverage history.",
      },
      {
        q: "What is California's minimum liability requirement?",
        a: "California requires 30/60/15 minimum liability — $30,000 for bodily injury per person, $60,000 per accident, and $15,000 for property damage. These limits are relatively low compared to real accident costs, so many drivers in Downey choose higher limits or additional coverage for better protection.",
        schemaA: "California requires minimum liability coverage of 30/60/15: $30,000 bodily injury per person, $60,000 per accident, and $15,000 for property damage.",
      },
    ],
  },
  {
    id: "no-license",
    heading: "No-License & International-License",
    items: [
      {
        q: "Can I insure a vehicle if I do not have a traditional California license?",
        a: "Yes, in certain lawful situations. If you are a vehicle owner who does not drive, a licensed household member can be listed as the primary driver while you remain the named insured. We also work with carriers that accept foreign licenses, international licenses, and ITIN-based applicants. We never facilitate coverage for unlicensed operation of a vehicle. See our full guide for specific scenarios.",
        schemaA: "Vehicle owners without a traditional California license may have coverage options depending on their situation, including foreign license holders and those with a licensed primary driver listed on the policy. All drivers operating the vehicle must hold a valid license.",
      },
      {
        q: "Do you work with foreign or international license holders?",
        a: "Yes. Many California carriers accept valid driver's licenses issued by other countries. If your license is not in the Latin alphabet, bringing an English translation or an International Driving Permit alongside it helps. We identify which of our 30+ carriers accept your specific country's license. See our no-license and foreign-license page for details.",
        schemaA: "Many California carriers accept valid driver's licenses issued by other countries. An International Driving Permit or English translation of a foreign license can help expand available carrier options.",
      },
      {
        q: "What documents help you find coverage?",
        a: "Bring whatever you have — we'll work with it. Most helpful: a foreign driver's license, passport, ITIN letter, vehicle registration, and any existing declarations page. If a licensed household member is the primary driver, their license is also needed. The more documentation you have, the more carriers we can approach on your behalf.",
        schemaA: "Helpful documents include a foreign driver's license, passport, ITIN letter, vehicle registration, and any current declarations page. A licensed household member's license is also needed if they are the primary driver.",
      },
      {
        q: "Can a vehicle owner who doesn't drive still be insured?",
        a: "Yes. A vehicle owner can be listed as the named insured on a policy with a licensed family member or household member listed as the primary driver. The named insured owns and registers the vehicle; the listed driver is covered to operate it. This is a common and legal insurance arrangement.",
        schemaA: "A vehicle owner who does not drive can be listed as the named insured with a licensed household member listed as the primary driver on the policy.",
      },
    ],
  },
  {
    id: "sr22",
    heading: "SR-22 & DMV Reinstatement",
    items: [
      {
        q: "What is SR-22 insurance in California?",
        a: "An SR-22 is a filing — not a separate insurance policy. It is a certificate your insurer sends to the California DMV confirming you carry the state-required minimum liability coverage. The SR-22 itself is a fee of about $15–$25. You still need an underlying auto insurance policy. See our SR-22 page for a full walkthrough.",
        schemaA: "An SR-22 is a filing your insurer sends to the California DMV to confirm you carry the required liability coverage. It is not a separate insurance policy.",
      },
      {
        q: "Who usually needs SR-22?",
        a: "Common triggers in California include: a lapse in auto insurance while your vehicle is registered, a DUI conviction, a license suspension or revocation, an at-fault accident while uninsured, a hit-and-run determination, or a court order. The California DMV will notify you if SR-22 is required.",
        schemaA: "SR-22 is commonly required after a coverage lapse, DUI conviction, license suspension, at-fault accident while uninsured, or by court order.",
      },
      {
        q: "How long do I need SR-22?",
        a: "California typically requires SR-22 for three continuous years. Any lapse in coverage resets the clock. Once the three years are complete, you can request that your insurer remove the filing, and your rates will often decrease. Always confirm your specific requirement with the California DMV.",
        schemaA: "California typically requires SR-22 for three continuous years. Any lapse in coverage resets the requirement period.",
      },
      {
        q: "What is same-day SR-22 filing?",
        a: "We file SR-22 certificates electronically with the California DMV the same day you bind a qualifying policy. Walk-ins can leave our Downey office with the filing submitted and proof of insurance in hand. For most clients, the DMV receives the filing within hours.",
        schemaA: "Same-day SR-22 filing means the insurer submits the SR-22 certificate electronically to the California DMV on the day the policy is bound.",
      },
      {
        q: "How much does SR-22 cost?",
        a: "The filing fee itself is typically $15–$25. The larger cost is the impact on your underlying insurance premium — carriers view SR-22 situations as higher risk. However, premiums vary significantly between carriers, and some specialize in non-standard situations. Working with an independent broker means we compare SR-22-eligible carriers to find the most competitive rate for your specific situation.",
        schemaA: "The SR-22 filing fee is typically $15–$25. The main cost impact is an increase to the underlying auto insurance premium, which varies by carrier.",
      },
    ],
  },
  {
    id: "claims",
    heading: "Claims, Proof & After-Purchase Support",
    items: [
      {
        q: "How fast can I get proof of insurance?",
        a: "In most cases, immediately. Once we bind your policy we email you an eID card and a declarations page. For SR-22 situations, we file electronically with the DMV the same day. Walk-ins at our Downey office typically leave with physical proof of coverage before they drive away.",
        schemaA: "Proof of insurance is typically issued immediately after a policy is bound, including a digital ID card emailed to the client.",
      },
      {
        q: "What do I do after an accident?",
        a: "First, make sure everyone is safe and call 911 if there are injuries. Then document the scene — photos, the other driver's license and insurance information, and the police report number if applicable. Notify your carrier's 24-hour claims line as soon as possible. Then call us — we can help you understand the process, communicate with adjusters, and follow up on the status of your claim.",
        schemaA: "After an accident, document the scene, exchange insurance information, and notify your carrier's claims line. Your insurance broker can help navigate the claims process.",
      },
      {
        q: "How does your office help with claims?",
        a: "We act as your advocate with the carrier. We help you understand what your policy covers, assist with documentation, answer questions from adjusters, recommend repair shops if needed, and follow up on delays. This service is included — there is no separate fee for claims guidance.",
        schemaA: "An independent broker can assist with claims documentation, communication with adjusters, and follow-up on claim status as part of their ongoing client service.",
      },
      {
        q: "Can I get help in Spanish or Arabic?",
        a: "Yes. Our Downey office has native-fluency staff in both Spanish and Arabic. All conversations, policy explanations, and document reviews can be conducted entirely in the language you are most comfortable with. Many of our long-term clients have been with us for 10–20 years in part because of this multilingual service.",
        schemaA: "The office provides service in English, Spanish, and Arabic, including policy explanations and document reviews in each language.",
      },
    ],
  },
];

const SCHEMA_FAQS = FAQ_GROUPS.flatMap((g) =>
  g.items.map((item) => ({ q: item.q, a: item.schemaA }))
);

export default function Faq() {
  usePageMeta({
    title: "Insurance FAQ: SR-22, No License, ITIN | Original Insurance",
    description:
      "Straight answers about car insurance in Downey: SR-22 cost & duration, ITIN and no-license coverage, proof of insurance, claims help, and CA minimums explained.",
    canonical: "https://originalinsurance.net/faq",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  useEffect(() => {
    if (search) navigate("/faq", { replace: true });
  }, [search, navigate]);

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <main id="main-content">
      <FAQSchema questions={SCHEMA_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "FAQ", url: "https://originalinsurance.net/faq" },
      ]} />

      <PageHero
        title="Downey Auto Insurance FAQ"
        subtitle="Straight answers for Downey drivers about car insurance cost, SR-22, no-license options, proof of insurance, and claims help."
        breadcrumb="FAQ"
        backgroundImage="/images/faq-consultation.webp"
        imageFilter="contrast(1.08) saturate(1.02) brightness(0.96)"
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

      <section className="sp bg-white">
        <div className="container max-w-4xl">
          {FAQ_GROUPS.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.05}>
              <div id={group.id} className="mb-12 last:mb-0">
                <h2
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {group.heading}
                </h2>
                <div className="space-y-3">
                  {group.items.map((item, i) => {
                    const key = `${gi}-${i}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-soft overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="font-semibold text-slate-900">{item.q}</span>
                          <svg
                            className={`w-5 h-5 text-brand-600 shrink-0 mt-0.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {/* Visible answer — always in DOM for SEO */}
                        <div
                          className="grid transition-all duration-300"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                              {item.a}
                              {/* Contextual links */}
                              {group.id === "cost-coverage" && i === 0 && (
                                <p className="mt-3">
                                  <Link to="/auto-insurance-downey-ca" className="text-brand-700 font-medium hover:underline">
                                    See full cost breakdown for Downey auto insurance →
                                  </Link>
                                </p>
                              )}
                              {group.id === "sr22" && i === 0 && (
                                <p className="mt-3">
                                  <Link to="/sr22-insurance-downey" className="text-brand-700 font-medium hover:underline">
                                    Full SR-22 guide →
                                  </Link>
                                </p>
                              )}
                              {group.id === "no-license" && i === 0 && (
                                <p className="mt-3">
                                  <Link to="/no-license-auto-insurance-downey" className="text-brand-700 font-medium hover:underline">
                                    No-license & foreign-license guide →
                                  </Link>
                                </p>
                              )}
                              {group.id === "claims" && i === 2 && (
                                <p className="mt-3">
                                  <Link to="/contact" className="text-brand-700 font-medium hover:underline">
                                    Contact our Downey office →
                                  </Link>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}

          {/* About link */}
          <Reveal>
            <p className="mt-10 text-sm text-slate-500 text-center">
              Looking for background on our brokerage?{" "}
              <Link to="/about" className="text-brand-700 font-medium hover:underline">
                Learn about Original Insurance
              </Link>{" "}
              — independent broker in Downey since 1999, serving SE LA in English, Spanish, and Arabic.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 p-8 text-center text-white shadow-heavy">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Still have questions?
              </h3>
              <p className="text-white/80 mb-5 max-w-lg mx-auto">
                Our bilingual team is happy to walk you through any coverage scenario in English, Spanish, or Arabic.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={site.contact.phoneHref} className="btn btn-accent">
                  Call {site.contact.phone}
                </a>
                <Link to="/contact" className="btn btn-ghost-light">
                  Send a Message
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageTestimonials />
    </main>
  );
}
