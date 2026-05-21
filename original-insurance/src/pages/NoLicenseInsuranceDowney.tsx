import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import { ConsultationImage } from "../components/ConsultationImage";

const NO_LICENSE_FAQS = [
  { q: "Can I insure a car without a California driver's license?", a: "In certain lawful situations, yes. Vehicle owners who are not the primary driver, foreign-license holders, and ITIN-based applicants may have coverage options." },
  { q: "Does Original Insurance accept ITIN for car insurance?", a: "Yes. Several California carriers we work with accept ITIN-based applicants who do not have a Social Security Number." },
  { q: "Will a foreign driver's license work for auto insurance in California?", a: "Many California carriers accept valid licenses issued by other countries. An International Driving Permit can expand your carrier options." },
  { q: "What documents do I need for no-license auto insurance?", a: "Bring your foreign driver's license, passport, ITIN letter if applicable, vehicle registration, and any current declarations page." },
  { q: "Is it legal to insure a car you don't personally drive?", a: "Yes. A vehicle owner can be the named insured with a licensed household member listed as the primary driver on the policy." },
];

export default function NoLicenseInsuranceDowney() {
  usePageMeta({
    title: "No-License Auto Insurance Downey — ITIN OK | Original",
    description:
      "No CA license? We help Downey vehicle owners get covered — foreign license, ITIN, international drivers welcome. Licensed CA broker. Tell us your situation, we find options.",
    canonical: "https://originalinsurance.net/no-license-auto-insurance-downey",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={NO_LICENSE_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "No-License Insurance Downey", url: "https://originalinsurance.net/no-license-auto-insurance-downey" },
      ]} />

      <PageHero
        title="No-License & International-License Auto Insurance in Downey, CA"
        subtitle="Vehicle ownership and driving are separate legal situations. We work with carriers that understand the difference and write policies for foreign-license holders, international drivers, and vehicle owners who are not the primary driver."
        breadcrumb="No-License Insurance Downey"
        backgroundImage="/images/product-no-license-auto.webp"
        imageFilter="contrast(1.06) saturate(0.92) brightness(0.78)"
        imagePosition="center"
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

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Non-standard license situations need carrier fit"
        lede="We identify which carriers can consider foreign licenses, ITIN-based applicants, excluded-owner setups, and named-insured arrangements."
      />

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

      {/* Consultation image — non-standard license specialist */}
      <section className="sp bg-slate-50">
        <div className="container max-w-6xl">
          <ConsultationImage
            image="/images/ois-no-license-consultation.webp"
            alt="Original Insurance agent in Downey, CA helping ITIN holder and foreign driver's license applicant obtain California auto insurance coverage"
            eyebrow="Non-Standard Insurance Specialists"
            heading="We've helped hundreds of Downey-area families get covered without a CA license"
            imageLeft
            badge="ITIN accepted · Foreign license OK"
            stats={[
              { value: "25+", label: "Years experience" },
              { value: "30+", label: "Carriers compared" },
              { value: "3 langs", label: "We speak yours" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  Most offices turn away clients who don't have a California driver's license. We specialize in exactly these situations — vehicle owners with foreign licenses, ITIN-based applicants, and named-insured arrangements where a licensed household member drives.
                </p>
                <p className="leading-relaxed">
                  Our bilingual and trilingual staff explain your options in English, Spanish, or Arabic. We know which carriers have the most flexible underwriting and which documents they require. We never advise unlicensed vehicle operation — every driver on the policy must hold a valid license.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Documents */}
      <section className="sp bg-white">
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

      {/* Carrier access */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Carrier access for non-standard license situations
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

      {/* Why Original — icon card grid */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Why Downey clients choose Original
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Non-standard license situations need a broker with real carrier access — not a single company that says no.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5" /></svg>,
                title: "We work for you",
                desc: "Independent broker — we compare 30+ carriers with zero brand pressure.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "30+ carriers compared",
                desc: "Side-by-side quotes in a single conversation — more options than any captive agent.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
                title: "Bilingual service",
                desc: "English, Spanish, and Arabic — también hablamos español, وأيضاً نتحدث العربية.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "Same-day SR-22 filing",
                desc: "Electronic filing to the California DMV the same day you bind coverage.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                title: "No-license programs",
                desc: "Foreign license, ITIN, and international driver options — we know which carriers say yes.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "25+ years serving SE LA",
                desc: "Downey's trusted broker since 1999 — we know this community's situations.",
              },
            ].map((item) => (
              <StaggerChild key={item.title}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className="w-11 h-11 rounded-xl grid place-items-center mb-4 bg-brand-800 text-gold-400 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
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

      <PageTestimonials />

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
