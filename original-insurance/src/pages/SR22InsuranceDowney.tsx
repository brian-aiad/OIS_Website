import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import TrustStrip from "../components/seo/TrustStrip";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";

const SR22_FAQS = [
  { q: "How long do I need SR-22 in California?", a: "California requires SR-22 for 3 continuous years from license reinstatement. Any policy lapse or cancellation resets the clock with the DMV." },
  { q: "What does SR-22 filing cost in Downey, CA?", a: "The SR-22 filing fee is $15–$25. Your underlying auto insurance premium also increases based on your driving record and the carrier." },
  { q: "Can I get same-day SR-22 filing?", a: "Yes. We file SR-22 certificates electronically with the California DMV the same day you bind a qualifying policy." },
  { q: "What happens if I miss a payment while on SR-22?", a: "If your policy lapses, the carrier notifies the DMV. Your license can be re-suspended, restarting the 3-year reinstatement requirement." },
  { q: "Do I need SR-22 if I don't own a car?", a: "Yes. A non-owner SR-22 policy provides the required liability coverage without a specific vehicle, covering you in borrowed or rented cars." },
];

export default function SR22InsuranceDowney() {
  usePageMeta({
    title: "SR-22 Downey CA — Same-Day Filing, $15 Fee | Original",
    description:
      "Need SR-22 in Downey? We file electronically with the CA DMV same day. $15–$25 filing fee. We find your cheapest qualifying carrier. Walk in or call (310) 538-8666.",
    canonical: "https://originalinsurance.net/sr22-insurance-downey",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={SR22_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "SR-22 Insurance Downey", url: "https://originalinsurance.net/sr22-insurance-downey" },
      ]} />

      <PageHero
        title="SR-22 Insurance & Same-Day Filing in Downey, CA"
        subtitle="We file SR-22 certificates electronically with the California DMV the same day you bind your policy. Walk in, get covered, drive away with proof."
        breadcrumb="SR-22 Insurance Downey"
        badgeText="Same-Day Electronic Filing"
        badgeType="open"
        backgroundImage="/images/heroTeam.webp"
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

      <div className="bg-brand-950 py-4 text-white">
        <div className="container">
          <TrustStrip />
        </div>
      </div>

      {/* What is SR-22 */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What is SR-22?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              An SR-22 is a filing — not a separate insurance policy. It is a certificate that your insurance company sends to the California DMV electronically, confirming that you carry at least the state-required minimum liability coverage (currently 30/60/15 in California). The SR-22 itself typically costs between $15 and $25 as a filing fee, separate from your underlying auto insurance premium.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Think of it this way: you still need a standard auto insurance policy. The SR-22 is simply the official documentation that your insurer sends to the DMV on your behalf, verifying you're covered. If your policy lapses at any point while you're required to carry SR-22, the insurer notifies the DMV automatically, which can result in further license suspension.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who needs SR-22 */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Who needs SR-22 in California?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              The California DMV typically requires SR-22 filing in the following situations:
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Coverage Lapse", desc: "Driving without active auto insurance, or allowing your policy to cancel while your vehicle is registered." },
              { title: "License Suspension", desc: "A suspended or revoked license due to points accumulation, failure to appear, or failure to pay a judgment." },
              { title: "DUI or DWI", desc: "A DUI conviction typically requires SR-22 as a condition of license reinstatement." },
              { title: "Uninsured Accident", desc: "Being involved in an at-fault accident while uninsured, or a hit-and-run determination." },
              { title: "Court Order", desc: "A judge can require SR-22 as part of a sentencing condition or settlement agreement." },
              { title: "Too Many Points", desc: "Accumulating too many DMV points from moving violations within a given period." },
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

      {/* How long */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              How long do I need to carry SR-22?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              California typically requires SR-22 coverage for three continuous years from the date the DMV imposes the requirement. The key word is continuous — any lapse in coverage resets your obligation, and your insurer is required to notify the DMV immediately when a policy cancels or lapses.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              After the three-year period is complete, you can ask your insurer to remove the SR-22 filing. At that point, your insurance rate will often decrease, since SR-22 situations can carry a premium surcharge that disappears once the filing requirement ends.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Always confirm your specific requirement directly with the California DMV. Courts or the DMV may impose a different duration depending on the severity of the underlying violation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What to bring */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What to bring for same-day filing
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Walk-ins are welcome at our Downey office. Bringing the following makes the process faster:
            </p>
            <ul className="space-y-3">
              {[
                "Your driver's license or DMV reinstatement letter",
                "Vehicle VIN (or have the vehicle registration handy)",
                "Current declarations page if you have existing coverage",
                "Court or DMV reference number if applicable",
                "Preferred contact information for policy delivery",
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

      {/* SR-22 Cost */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              SR-22 cost in Downey
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              The SR-22 filing fee itself is typically $15–$25, paid once. However, the more significant cost is the impact on your underlying auto insurance premium. Carriers view an SR-22 requirement as higher risk, which usually increases your monthly premium.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              The premium increase varies significantly by carrier. Some companies specialize in non-standard or high-risk auto insurance and offer more competitive rates for SR-22 situations than standard carriers. This is exactly where an independent broker provides real value — we compare SR-22-eligible carriers side by side so you're not overpaying simply because your first call was to the wrong company.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              After your three-year filing requirement ends and your record improves, we can re-shop your policy to bring your rate back down. We proactively monitor these milestones for long-term clients.
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
              Once your filing is submitted, we can provide you with written confirmation of the electronic filing for your DMV appointment or court date. Most filings are submitted within hours of binding your policy.
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

      {/* CTA */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Need same-day SR-22 filing in Downey?
            </h2>
            <p className="text-white/70 mb-6">Walk in or call — most SR-22 filings are submitted the same day.</p>
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
