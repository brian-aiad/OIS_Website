import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import PageHero from "../components/PageHero";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { Reveal } from "../components/AnimatedSection";
import { Icons } from "../components/Icons";
import { images } from "../lib/images";

/**
 * Visible answers only. This page intentionally emits no FAQPage structured
 * data because the site is not eligible for Google's FAQ rich results.
 */

type FaqItem = {
  q: string;
  a: string;
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
        a: "There is no reliable citywide price range. California auto premiums are individualized using factors such as driving history, years of experience, annual mileage, vehicle, coverage choices, discounts, and where the vehicle is garaged. We compare current quotes using the same limits and deductibles so the prices are genuinely comparable.",
      },
      {
        q: "What is the difference between liability and full coverage?",
        a: "Liability-only covers damage and injuries you cause to others. Full coverage adds collision (damage to your own vehicle in a crash) and comprehensive (theft, weather, vandalism, fire). California's minimum requires liability only, but lenders typically require full coverage on financed or leased vehicles. Most Downey commuters with newer or higher-value cars benefit from full coverage.",
      },
      {
        q: "What affects my car insurance rate?",
        a: "The main factors are your driving history (at-fault accidents, tickets, DUIs), your vehicle's make, model, and year, the coverage level you select, your zip code, your age, and whether you've had prior coverage lapses. Bundling home and auto or maintaining continuous coverage can reduce your rate.",
      },
      {
        q: "What is California's minimum liability requirement?",
        a: "California requires 30/60/15 minimum liability — $30,000 for bodily injury per person, $60,000 per accident, and $15,000 for property damage. These limits are relatively low compared to real accident costs, so many drivers in Downey choose higher limits or additional coverage for better protection.",
      },
    ],
  },
  {
    id: "no-license",
    heading: "No-License & International-License",
    items: [
      {
        q: "Can I insure a vehicle if I do not have a traditional California license?",
        a: "Possibly, depending on the carrier and disclosed facts. Some insurers may consider a non-driving vehicle owner, a foreign-license holder, an applicant using an ITIN, or a household with a different licensed primary driver. Insurance eligibility does not establish legal permission to drive, and every owner, household member, and actual driver must be disclosed accurately.",
      },
      {
        q: "Do you work with foreign or international license holders?",
        a: "Some carriers may consider a valid license issued by another country. Acceptance, translations, identification, driving-history treatment, and residency requirements vary. California residents must follow DMV licensing rules; an International Driving Permit does not replace the underlying license or guarantee coverage.",
      },
      {
        q: "What documents help you find coverage?",
        a: "Bring whatever you have — we'll work with it. Most helpful: a foreign driver's license, passport, ITIN letter, vehicle registration, and any existing declarations page. If a licensed household member is the primary driver, their license is also needed. The more documentation you have, the more carriers we can approach on your behalf.",
      },
      {
        q: "Can a vehicle owner who doesn't drive still be insured?",
        a: "Some carriers may consider a non-driving owner with a different licensed primary driver after reviewing ownership, household, garaging, and use. The application must identify the actual drivers, and an excluded person has no driving coverage under that policy.",
      },
    ],
  },
  {
    id: "sr22",
    heading: "SR-22 & DMV Reinstatement",
    items: [
      {
        q: "What is SR-22 insurance in California?",
        a: "An SR-22 is a filing — not a separate insurance policy. It is proof an insurer sends to the California DMV confirming required financial responsibility. Filing charges and the underlying policy cost vary by carrier. See our SR-22 page for a full walkthrough.",
      },
      {
        q: "Who usually needs SR-22?",
        a: "Common triggers in California include: a lapse in auto insurance while your vehicle is registered, a DUI conviction, a license suspension or revocation, an at-fault accident while uninsured, a hit-and-run determination, or a court order. The California DMV will notify you if SR-22 is required.",
      },
      {
        q: "How long do I need SR-22?",
        a: "The required period depends on the DMV or court action. California DMV materials commonly refer to a three-year period in certain cases. A lapse can affect driving privileges, so confirm your personal start and end dates directly with the DMV.",
      },
      {
        q: "How quickly can an SR-22 be filed?",
        a: "Qualifying insurers can submit SR-22 proof electronically after a policy is bound. Processing time depends on the carrier, the time of day, and DMV systems; we explain the expected timing before you purchase.",
      },
      {
        q: "How much does SR-22 cost?",
        a: "The filing charge and underlying insurance premium vary by carrier and driving history. We compare eligible carriers and show the filing charge, limits, deductibles, and policy price before you choose coverage.",
      },
    ],
  },
  {
    id: "claims",
    heading: "Claims, Proof & After-Purchase Support",
    items: [
      {
        q: "How fast can I get proof of insurance?",
        a: "After a carrier confirms that coverage is bound, proof of insurance is generally delivered electronically. Timing depends on the carrier, payment confirmation, required documents, and the type of policy. For SR-22 situations, we explain the carrier's filing process and expected timing before you purchase.",
      },
      {
        q: "What do I do after an accident?",
        a: "First, make sure everyone is safe and call 911 if there are injuries. Then document the scene — photos, the other driver's license and insurance information, and the police report number if applicable. Notify your carrier's 24-hour claims line as soon as possible. Then call us — we can help you understand the process, communicate with adjusters, and follow up on the status of your claim.",
      },
      {
        q: "How does your office help with claims?",
        a: "We help you locate the carrier's claims contact, understand requested documents, and follow up on communication questions. The carrier and assigned adjuster decide coverage and settlement under the policy; we do not replace the adjuster or make claim decisions.",
      },
      {
        q: "Can I get help in Spanish or Arabic?",
        a: "Yes. Our Downey office provides service in English, Spanish, and Arabic. Ask for the language you prefer when you call, text, or visit so our team can explain the available options clearly.",
      },
    ],
  },
];

export default function Faq() {
  usePageMeta({
    title: "California Insurance FAQ | Original Insurance Services",
    description:
      "Clear answers about California auto insurance, SR-22 filings, foreign-license situations, proof of insurance, claims and required liability limits.",
    canonical: "https://originalinsurance.net/faq",
  });

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "FAQ", url: "https://originalinsurance.net/faq" },
      ]} />

      <PageHero
        title="California insurance questions, answered"
        subtitle="Plain-language guidance on auto coverage, SR-22 filings, foreign-license situations, proof of insurance, and claims support from our Downey office."
        breadcrumb="FAQ"
        backgroundImage={images.claims.docs}
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
                                    Read the Downey auto insurance guide →
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
