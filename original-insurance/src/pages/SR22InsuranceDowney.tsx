import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { ConsultationImage } from "../components/ConsultationImage";
import { images } from "../lib/images";

const SR22_FAQS = [
  { q: "How long might I need an SR-22 in California?", a: "The required period depends on the DMV or court action. California DMV materials commonly refer to maintaining proof during a three-year period in certain cases, but confirm your own end date directly with the DMV." },
  { q: "What does an SR-22 filing cost in Downey, CA?", a: "Filing fees and the underlying insurance premium vary by carrier and driving history. We show the filing charge and policy cost before you choose coverage." },
  { q: "Can an SR-22 be filed electronically?", a: "Qualifying insurers can submit SR-22 proof electronically. Timing depends on when the policy is bound, carrier processing, and DMV systems." },
  { q: "What happens if my policy lapses while an SR-22 is required?", a: "The insurer may notify the DMV that proof is no longer in force, which can affect driving privileges. Contact the DMV and insurer promptly for instructions specific to your case." },
  { q: "Do I need SR-22 if I don't own a car?", a: "Yes. A non-owner SR-22 policy provides the required liability coverage without a specific vehicle, covering you in borrowed or rented cars." },
];

export default function SR22InsuranceDowney() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageMeta({
    title: "SR-22 Insurance in Downey, CA | Original Insurance",
    description:
      "Learn how California SR-22 filings work and compare qualifying auto insurance options with an independent broker in Downey. Call or visit our office.",
    canonical: "https://originalinsurance.net/sr22-insurance-downey",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "SR-22 Insurance Downey", url: "https://originalinsurance.net/sr22-insurance-downey" },
      ]} />

      <PageHero
        title="SR-22 Insurance Filing Help in Downey, CA"
        subtitle="Compare qualifying auto policies, understand the filing requirement, and confirm the carrier's electronic filing process and expected timing before you purchase."
        breadcrumb="SR-22 Insurance Downey"
        badgeText="Electronic Filing Support"
        badgeType="open"
        backgroundImage={images.products.sr22}
        imageFilter="contrast(1.08) saturate(1.02) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get SR-22 Quote Now
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="SR-22 filing without extra confusion"
        lede="We quote the underlying auto policy, confirm the SR-22 filing requirement, and submit the certificate electronically when the policy is bound."
      />

      {/* What is SR-22 */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What is SR-22?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              An SR-22 is a filing — not a separate insurance policy. It is proof that your insurance company sends to the California DMV confirming required financial responsibility. California's minimum auto liability limits are currently 30/60/15. Filing charges and the underlying policy premium vary by carrier and situation.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Think of it this way: you still need a standard auto insurance policy. The SR-22 is simply the official documentation that your insurer sends to the DMV on your behalf, verifying you're covered. If your policy lapses at any point while you're required to carry SR-22, the insurer notifies the DMV automatically, which can result in further license suspension.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Consultation image — SR-22 filing expertise */}
      <section className="sp bg-slate-50">
        <div className="container max-w-6xl">
          <ConsultationImage
            image={images.clients.sr22Consultation}
            alt="Original Insurance broker in Downey reviewing SR-22 filing documents and carrier requirements with a client"
            eyebrow="Serving Downey Since 1999"
            heading="Local help with California SR-22 requirements"
            imageLeft
            badge="Electronic filing support"
            stats={[
              { value: "Electronic", label: "Filing method" },
              { value: "Varies", label: "Carrier fee" },
              { value: "DMV", label: "Confirms duration" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  Our team helps clients understand the SR-22 notice, compare qualifying insurance options, and prepare the details a carrier needs for electronic filing.
                </p>
                <p className="leading-relaxed">
                  Walk-ins are welcome. Filing availability and timing depend on the qualifying carrier, when coverage is bound, and DMV systems. Service is available in English, Spanish, and Arabic.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Who needs SR-22 */}
      <section className="sp bg-white">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">SR-22 Triggers</span>
            <h2 className="mt-3 display-2 text-slate-900">Who needs SR-22 in California?</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              The California DMV typically requires SR-22 filing in these situations:
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
                title: "Coverage Lapse",
                desc: "Driving without active auto insurance, or allowing your policy to cancel while your vehicle is registered.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
                title: "License Suspension",
                desc: "A suspended or revoked license due to points accumulation, failure to appear, or failure to pay a judgment.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "DUI or DWI",
                desc: "A DUI conviction typically requires SR-22 as a condition of California license reinstatement.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l3.5 3.5M3 3h5m-5 0v5m18 13l-3.5-3.5M21 21h-5m5 0v-5M3 21l3.5-3.5M3 21v-5m0 5h5m13-18l-3.5 3.5M21 3h-5m5 0v5" /></svg>,
                title: "Uninsured Accident",
                desc: "Being involved in an at-fault accident while uninsured, or a hit-and-run determination by the DMV.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5" /></svg>,
                title: "Court Order",
                desc: "A judge can require SR-22 as part of a sentencing condition or civil settlement agreement.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "Too Many Points",
                desc: "Accumulating too many DMV points from moving violations within a given period triggers the SR-22 requirement.",
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

      {/* How long */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              How long do I need to carry SR-22?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              The required period depends on the DMV or court action. California DMV materials commonly refer to maintaining proof during a three-year period in certain cases, but that is not a universal start or end date. Use your notice and confirm the exact dates directly with the DMV.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Do not remove the filing based only on a general timeline. Ask the DMV whether the requirement has ended, then coordinate any policy change with your insurer so you do not create an unintended lapse.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Always confirm your specific requirement directly with the California DMV. Courts or the DMV may impose a different duration depending on the severity of the underlying violation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What to bring */}
      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Walk-In Ready</span>
            <h2 className="mt-3 display-2 text-slate-900">What to bring for an SR-22 quote</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Walk-ins are welcome. Bringing these items can make quoting and carrier processing more efficient.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
                title: "Driver's License or DMV Letter",
                desc: "Your current license, or your DMV reinstatement paperwork if your license has been suspended.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10" /></svg>,
                title: "Vehicle VIN or Registration",
                desc: "The 17-digit VIN from your dashboard or registration card. This is required to quote and bind the underlying policy.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                title: "Current Declarations Page",
                desc: "Your existing policy's declarations page if you have coverage. Helps us compare rates against your current carrier.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
                title: "Court or DMV Reference Number",
                desc: "If a court or the DMV issued a specific SR-22 requirement notice, the reference number speeds up the filing confirmation.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                title: "Contact Information",
                desc: "Email and phone number for policy delivery. eID cards and SR-22 confirmation are sent electronically as soon as the policy is bound.",
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

      {/* SR-22 Cost */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              SR-22 cost in Downey
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              The filing charge and the cost of the underlying auto insurance policy vary by carrier, driving history, vehicle, coverage, and other rating factors. We show both before you choose coverage.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Carrier eligibility and premiums vary for drivers with an SR-22 requirement. We compare available proposals using consistent liability limits, payment terms, and filing details so you can evaluate the differences before choosing.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              When the DMV confirms that your filing requirement has ended, we can review the policy again and compare current options. Any change should be coordinated with the insurer to avoid a coverage gap.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why independent broker */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Why file SR-22 with an independent broker
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Not every insurance carrier writes SR-22 policies, and those that do charge very different premiums for the same coverage. A captive agent who works for a single company can only offer you that company's rate. An independent broker like Original Insurance can compare multiple SR-22-eligible carriers in a single conversation and find the policy that fits your budget.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              We have been filing SR-22 certificates in Downey and Southeast Los Angeles since 1999. Our team understands the DMV reinstatement process, can answer questions about what documentation the DMV needs, and can communicate in English, Spanish, and Arabic to make sure nothing is misunderstood.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              When a qualifying carrier submits the filing, we can provide available confirmation for your records. Submission and DMV processing time vary by carrier, time of binding, and DMV systems.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Want to learn more about our brokerage?{" "}
              <NavLink to="/about" className="text-brand-700 font-medium hover:underline">
                About Original Insurance
              </NavLink>{" "}
              — independent broker in Downey since 1999.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp bg-slate-50">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-3 display-2 text-slate-900">SR-22 questions Downey clients ask</h2>
          </Reveal>
          <div className="space-y-3">
            {SR22_FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-2xl ring-1 ring-slate-200/80 overflow-hidden">
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

      <PageTestimonials />

      {/* CTA */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Need SR-22 filing help in Downey?
            </h2>
            <p className="text-white/70 mb-6">Walk in or call to compare qualifying policies and confirm the filing steps and expected timing.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get SR-22 Quote Now
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
              <NavLink to="/no-license-auto-insurance-downey" className="text-gold-300 hover:text-gold-200">
                No-license options
              </NavLink>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
