import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { images } from "../lib/images";

const HOME_FAQS = [
  {
    q: "How much does home insurance cost in Downey, CA?",
    a: "Rates depend on replacement cost, construction, roof and home characteristics, coverage limits, deductibles, claims history, location, and carrier. A current quote using accurate property details is more reliable than a broad price range.",
  },
  {
    q: "Is renters insurance worth it in Downey?",
    a: "Renters coverage can protect belongings from covered losses and provide personal liability and additional-living-expense coverage. A landlord's policy generally protects the building, not the tenant's belongings. Price depends on limits, deductible, location, and carrier.",
  },
  {
    q: "What does home insurance cover in California?",
    a: "Homeowners policies commonly include dwelling, other structures, personal property, loss of use, personal liability, and medical-payments coverage, subject to the policy's limits and exclusions. Flood and earthquake damage generally require separate coverage.",
  },
  {
    q: "Can bundling home and auto reduce the cost?",
    a: "Many carriers offer multi-policy discounts, but the amount varies. We compare the combined price and coverage with separate-carrier options because a bundle is not automatically the best overall value.",
  },
  {
    q: "Do I need earthquake insurance in Downey, CA?",
    a: "Standard homeowners policies generally exclude earthquake damage. Earthquake coverage may be available through the California Earthquake Authority or another insurer, depending on the qualifying home insurer and property. We can explain the available quote options.",
  },
];

export default function HomeInsuranceDowneyCA() {
  usePageMeta({
    title: "Home Insurance in Downey, CA | Original Insurance",
    description:
      "Compare homeowners, renters, condo and optional earthquake coverage with an independent insurance broker serving Downey, California.",
    canonical: "https://originalinsurance.net/home-insurance-downey-ca",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", url: "https://originalinsurance.net/" },
          { name: "Home Insurance Downey CA", url: "https://originalinsurance.net/home-insurance-downey-ca" },
        ]}
      />

      <PageHero
        title="Home & Renters Insurance in Downey, CA"
        subtitle="Compare homeowners, renters, condo, and optional earthquake coverage based on your property details, limits, deductibles, and available carrier programs."
        breadcrumb="Home Insurance Downey"
        badgeText="Home, Renters & Bundle Options"
        backgroundImage={images.products.home}
        imageFilter="contrast(1.06) saturate(1.02) brightness(0.95)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get My Home Insurance Quote
          </button>
          <a href="#renters" className="btn btn-ghost-light btn-lg">
            Renters Insurance
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Home insurance matched to the property"
        lede="Replacement cost, construction, roof and home characteristics, prior claims, coverage limits, deductibles, and available discounts can affect eligibility and price."
      />

      {/* Section 1: What home insurance covers */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What home insurance covers in California
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                A standard California homeowners policy (HO-3) protects your dwelling and your financial liability in one package. Coverage is organized into six components: dwelling (the structure), other structures (detached garage, fence, shed), personal property (your belongings), loss of use (hotel and living expenses if a covered loss displaces you), personal liability (injury or property damage claims against you), and medical payments (minor injuries to guests regardless of fault).
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Policies commonly cover losses caused by fire, windstorm, theft, vandalism, and certain sudden water events, subject to the contract. Flood and earthquake damage are generally excluded from a standard homeowners policy and require separate coverage. We review the exclusions and available options rather than assuming every loss is covered.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                The dwelling limit is based on estimated reconstruction cost rather than the home's sale price. We collect accurate property details and review the carrier's replacement-cost estimate with you; the selected limit, endorsements, deductible, and policy terms determine how a covered loss is handled.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                As an independent broker, we compare coverage terms and exclusions across carriers, not just price. A policy that appears cheaper may have a higher deductible, lower personal property limits, or ACV (actual cash value) settlement instead of replacement cost. We explain every difference in plain language before you choose.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Coverage types */}
      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Coverage Options</span>
            <h2 className="mt-3 display-2 text-slate-900">Coverage we offer Downey homeowners</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Every property is different. We match coverage to your actual structure, belongings, and risk profile.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "Dwelling Coverage",
                desc: "Protects the home's structure for covered losses, subject to limits and exclusions. We review the carrier's reconstruction estimate and available endorsements.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: "Personal Property",
                desc: "Covers furniture, electronics, clothing, and valuables against theft, fire, and certain water damage. We compare ACV vs. replacement cost so you know exactly what you'd get after a loss.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Liability Protection",
                desc: "Can respond to covered bodily-injury or property-damage claims against you. Available limits and umbrella options vary by carrier and eligibility.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Loss of Use",
                desc: "Pays hotel, meals, and living costs while your home is repaired after a covered loss. Downey-area hotel costs can add up fast — we make sure this limit is realistic.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Earthquake Coverage",
                desc: "Generally not included in standard policies. Availability through the California Earthquake Authority or other insurers depends on the property and qualifying home insurer.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Bundle Discount",
                desc: "Many carriers offer home and auto bundle discounts. We compare the combined price and coverage with separate-carrier options so you can evaluate the actual value.",
              },
            ].map((item) => (
              <StaggerChild key={item.title}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className="w-11 h-11 rounded-xl grid place-items-center mb-4 bg-brand-800 text-gold-400 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section 3: Renters insurance */}
      <section id="renters" className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Renters insurance in Downey
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                A landlord's policy generally covers the building, not a tenant's belongings. A renters policy can cover personal property, loss of use, personal liability, and medical payments for covered events. Price depends on the address, limits, deductible, claims history, discounts, and carrier, so we use current quotes instead of a generic monthly estimate.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                A lease may require renters insurance or particular liability limits. After a carrier confirms binding and payment, policy documents are generally available electronically; delivery timing varies by carrier and the information still required.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Renters policies can also include personal liability coverage for covered claims. Limits, exclusions, animal-liability rules, and eligibility differ by carrier, so the declarations and policy language should be reviewed before purchase.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Some carriers offer an auto-and-renters discount. We compare the combined premium and coverage with separate-policy options because a bundle is not automatically the lowest total cost.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4: Bundle section */}
      <section className="sp bg-brand-950 text-white">
        <div className="container max-w-4xl">
          <Reveal>
            <span className="eyebrow text-gold-400 mb-4">Bundle & Save</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Home + auto bundles in Downey
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/85 leading-relaxed mb-4">
                Many carriers offer multi-policy discounts when you bundle home and auto, but the amount and eligibility vary. A lower combined premium is useful only when the limits, deductibles, exclusions, and service also fit your needs.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                As an independent broker, we compare both the bundled price and separate-carrier options. Sometimes one insurer is more suitable for auto while another is more suitable for home. We show the resulting price and coverage differences so you can decide with full information.
              </p>
              <p className="text-base text-white/80 leading-relaxed">
                Other bundle opportunities include home + life insurance and auto + renters insurance. We look at your full household insurance picture, not just one policy at a time.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Compare Bundle Prices
              </button>
              <NavLink to="/auto-insurance-downey-ca" className="btn btn-ghost-light btn-lg">
                See Auto Insurance Options
              </NavLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="sp bg-slate-50">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-3 display-2 text-slate-900">Home insurance questions Downey clients ask</h2>
          </Reveal>
          <div className="space-y-3">
            {HOME_FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-soft overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-slate-900 text-[15px] leading-snug">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-[14px] text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageTestimonials tone="offwhite" />

      {/* CTA */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Ready to compare Downey home insurance rates?
            </h2>
            <p className="text-white/70 mb-6">
              Compare homeowners and renters options, including potential auto bundles and optional earthquake coverage.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get My Home Insurance Quote
              </button>
              <NavLink to="/services" className="btn btn-ghost-light btn-lg">
                See All Coverage Types
              </NavLink>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Or call us at{" "}
              <a href={site.contact.phoneHref} className="text-gold-300 hover:text-gold-200 font-semibold">
                {site.contact.phone}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
