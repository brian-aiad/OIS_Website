import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import TrustStrip from "../components/seo/TrustStrip";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";

export default function NoLicenseInsuranceDowney() {
  usePageMeta({
    title: "No-License & Foreign-License Auto Insurance Downey CA | Original Insurance",
    description:
      "Auto insurance options in Downey, CA for vehicle owners without a traditional California license, foreign-license holders, and international-license drivers.",
    canonical: "https://originalinsurance.net/no-license-auto-insurance-downey",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "No-License Insurance Downey", url: "https://originalinsurance.net/no-license-auto-insurance-downey" },
      ]} />

      <PageHero
        title="No-License & International-License Auto Insurance in Downey, CA"
        subtitle="Vehicle ownership and driving are separate legal situations. We work with carriers that understand the difference and write policies for foreign-license holders, international drivers, and vehicle owners who are not the primary driver."
        breadcrumb="No-License Insurance Downey"
        backgroundImage="/images/heroTeam.webp"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Discuss My Situation
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <div className="bg-brand-950 py-4 text-white">
        <div className="container">
          <TrustStrip />
        </div>
      </div>

      {/* Common Scenarios */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Common scenarios we help with
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Every situation below involves a lawful vehicle ownership or insurance need. We never advise driving without a valid license, and the policies we write always require that anyone operating the insured vehicle hold a valid license for the jurisdiction where they are driving.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Vehicle Owner Who Doesn't Drive",
                desc: "You own and register the vehicle but a licensed family member or household member is the primary driver. You can be listed as the named insured with the licensed driver on the policy.",
              },
              {
                title: "Foreign License Holder",
                desc: "You hold a valid driver's license issued by another country. Many California carriers accept foreign licenses for coverage. We identify which carriers accept your specific country of origin.",
              },
              {
                title: "International License Driver",
                desc: "You are temporarily in California and hold an International Driving Permit (IDP) alongside your home country license. Coverage is available for this situation through select carriers.",
              },
              {
                title: "Household Named-Insured Setup",
                desc: "The vehicle owner and primary driver are different household members. This is a common and legal insurance structure. The named insured on the policy owns the vehicle; the listed driver is the one operating it.",
              },
              {
                title: "ITIN-Based Applicants",
                desc: "You have an Individual Taxpayer Identification Number (ITIN) rather than a Social Security Number. Several carriers accept ITIN for insurance purposes, and we know which ones.",
              },
              {
                title: "Excluded Unlicensed Owner",
                desc: "In some cases, an unlicensed owner can be excluded from a policy — meaning they are listed as an excluded driver — while a licensed household member is the covered driver. We explain the implications so you fully understand what you're signing.",
              },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft h-full">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Documents */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What documents help us find coverage
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              You do not need all of these — bring what you have and we'll work with it. More documentation simply expands the number of carriers we can approach on your behalf.
            </p>
            <ul className="space-y-3">
              {[
                "Foreign driver's license (any country) — ideally with an English translation if not in the Latin alphabet",
                "Passport or government-issued photo ID",
                "ITIN letter or ITIN card (Individual Taxpayer Identification Number)",
                "Vehicle registration in your name",
                "Current declarations page if you have existing coverage",
                "International Driving Permit (IDP) if you have one",
                "Licensed household member's driver's license (for named-insured / different driver setups)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                    <svg className="w-3 h-3 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Why independent broker */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Why an independent broker matters here
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              No-license, foreign-license, and international-license situations are not standard applications at most insurance companies. A captive agent who works for one carrier may simply tell you they cannot help — because their single carrier does not write these situations.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              As an independent broker with access to 30+ carriers, we can identify the companies that specifically handle foreign license holders, ITIN applicants, and complex named-insured setups. This carrier knowledge has been built over 25 years of serving Downey and Southeast LA — a community where these situations are common.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We will always explain your options clearly and let you choose. If a particular carrier requires additional documentation or has restrictions, we tell you upfront so there are no surprises at the time of claim.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Languages */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              We serve Downey and Southeast LA in English, Spanish, and Arabic
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Many of the situations we handle involve clients whose first language is not English. We have native-fluency staff in Arabic and Spanish, and all conversations can be conducted entirely in the language you are most comfortable with.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Insurance documents can be confusing even in your native language. We take the time to explain what each section of the policy means, what is and is not covered, and what your obligations are as the named insured. Our goal is that you leave our office fully understanding what you bought.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {["English", "Español", "عربي"].map((lang, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-white text-brand-800 rounded-full px-4 py-2 ring-1 ring-brand-100 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  {lang}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Tell us your situation — we'll find the options
            </h2>
            <p className="text-white/70 mb-6">
              No judgment, no pressure. We've helped hundreds of Downey-area clients with non-standard license situations find coverage that works.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Discuss My Situation
              </button>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
                Call {site.contact.phone}
              </a>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Also see:{" "}
              <NavLink to="/auto-insurance-downey-ca" className="text-gold-300 hover:text-gold-200">
                Auto insurance in Downey
              </NavLink>{" "}
              ·{" "}
              <NavLink to="/sr22-insurance-downey" className="text-gold-300 hover:text-gold-200">
                SR-22 filing
              </NavLink>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
