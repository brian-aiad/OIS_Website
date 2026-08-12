import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import InsuranceWorkflow from "../components/InsuranceWorkflow";
import StatsBar from "../components/StatsBar";
import PageTestimonials from "../components/PageTestimonials";
import { ConsultationImage } from "../components/ConsultationImage";
import { images } from "../lib/images";

import { Reveal } from "../components/AnimatedSection";

const NEARBY_CITIES = [
  { name: "Bellflower", slug: "bellflower" },
  { name: "Norwalk", slug: "norwalk" },
  { name: "Paramount", slug: "paramount" },
  { name: "Lakewood", slug: "lakewood" },
  { name: "Lynwood", slug: "lynwood" },
  { name: "Whittier", slug: "whittier" },
];

const VEHICLE_TYPES = [
  {
    title: "Single commercial vehicle",
    desc: "A truck, van, or car used primarily for business may require commercial classification. We review ownership, use, drivers, radius, equipment, and contract requirements before requesting quotes.",
  },
  {
    title: "Small fleet (2–10 vehicles)",
    desc: "Small fleets require complete driver and vehicle schedules plus accurate use, radius, garaging, and loss information. Available fleet programs and discounts vary by carrier and risk.",
  },
  {
    title: "For-hire and delivery vehicles",
    desc: "For-hire, delivery, courier, and app-based use must be disclosed because personal and commercial policy terms differ. Program availability depends on the platform, operation, vehicle, driver, and carrier.",
  },
  {
    title: "Contractor pickups and vans",
    desc: "Contractor vehicles may need commercial auto plus separate tools, equipment, or general-liability coverage. We review the operation and explain which proposal addresses each exposure.",
  },
  {
    title: "Non-emergency medical transport (NEMT)",
    desc: "NEMT underwriting can require detailed vehicle, driver, passenger, radius, contract, and safety information. Availability and required filings vary; a complete submission is needed before coverage can be evaluated.",
  },
  {
    title: "Food trucks and mobile services",
    desc: "Food trucks, mobile pet groomers, pop-up retail vehicles, and other mobile operations may need both vehicle and business liability coverage. Available policies, classifications, and limits depend on the operation and underwriting.",
  },
];

export default function CommercialAutoInsuranceDowneyPage() {
  usePageMeta({
    title: "Commercial Auto Insurance in Downey, CA | Original",
    description:
      "Compare commercial auto coverage for business vehicles, fleets, contractors and hired or non-owned vehicles with a Downey insurance broker.",
    canonical:
      "https://originalinsurance.net/commercial-auto-insurance-downey",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Commercial Auto Insurance Downey", url: "https://originalinsurance.net/commercial-auto-insurance-downey" },
      ]} />

      <PageHero
        title="Commercial Auto & Business Vehicle Insurance in Downey, CA"
        subtitle="Compare commercial auto options for trucks, vans, fleets, and business vehicles. Carrier eligibility, required documents, certificates, and binding time depend on the operation and risk details."
        breadcrumb="Commercial Auto"
        backgroundImage={images.products.commercial}
        imageFilter="contrast(1.08) saturate(1.04) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get a Commercial Auto Quote
          </button>
          <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
            Call {site.contact.phone}
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Commercial auto quotes need business context"
        lede="Vehicle type, radius, drivers, filings, certificates, and hired/non-owned exposure determine which commercial carriers make sense."
      />

      {/* Section 1: What commercial auto covers */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What commercial auto insurance covers in California
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Commercial auto insurance in California is designed for vehicles
                used in the course of business — and it covers risks that a
                personal policy specifically excludes. If you use your truck,
                van, or car to generate income, transport clients, haul tools,
                or make deliveries, California carriers consider that a business
                use exposure. Filing a claim under a personal policy for a
                business-use incident frequently results in denial.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                A commercial auto policy can include <strong>liability</strong>{" "}
                coverage for bodily injury and property damage you cause to
                third parties, as well as <strong>physical damage</strong>{" "}
                — collision and comprehensive — for your own vehicle.{" "}
                <strong>Hired and non-owned auto (HNOA)</strong> coverage
                extends your policy to rented or borrowed vehicles used for
                business, protecting the business when an employee drives a
                personal car on a work errand.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Medical payments</strong> coverage pays for medical
                expenses of you or your passengers after an accident regardless
                of fault. <strong>Uninsured motorist</strong> coverage steps in
                when you are hit by a driver who carries no insurance or not
                enough — a real risk in the Los Angeles metro area where
                uninsured driver rates remain elevated.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                The right combination of these coverages depends on your
                specific operation — vehicle type, driver count, radius of
                travel, and the nature of your business all factor into what an
                underwriter will require and what limits make sense for your
                risk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Vehicles and operations */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Vehicles and operations we insure
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Commercial auto underwriting is not one-size-fits-all. Carrier
              appetite varies dramatically by vehicle type, industry class, and
              how the vehicle is used. We work with specialty commercial markets
              that cover a wide range of Downey-area business operations.
            </p>
          </Reveal>
          <div className="space-y-6">
            {VEHICLE_TYPES.map((item, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <h3
                    className="text-xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: DOT and FMCSA filings */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DOT and FMCSA filings when you need them
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Some commercial auto operations require more than just a
                standard policy — they require specific regulatory filings that
                prove financial responsibility to a federal or state authority.
                One important form is the <strong>MCS-90 endorsement</strong>,
                which certain interstate motor carriers use to demonstrate
                federally required public-liability financial responsibility.
                Whether it applies depends on the operation, cargo, authority,
                and federal rules; a USDOT number alone does not answer every filing question.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Form E</strong> (also called the Uniform Motor Carrier
                Bodily Injury and Property Damage Liability Certificate of
                Insurance) is required in many states for intrastate for-hire
                carriers. If your operation involves crossing state lines or
                operating under for-hire authority, your broker needs to
                coordinate these filings directly with the carrier.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We work with carriers experienced in FMCSA and CPUC filings and
                can coordinate the paperwork alongside binding your policy.
                Getting these filings wrong delays your authority and your
                ability to operate — having a broker who understands the
                process from the start saves time and prevents costly gaps.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Consultation image — commercial coverage specialist */}
      <section className="sp bg-white">
        <div className="container max-w-6xl">
          <ConsultationImage
            image={images.clients.commercialConsultation}
            alt="Commercial auto insurance broker at Original Insurance in Downey, CA reviewing fleet vehicle coverage and business policy options with small business owner"
            eyebrow="Commercial Auto Specialists · Downey CA"
            heading="Commercial auto quoting that starts with your business, not a form"
            badge="Fleet · Single vehicle · NEMT · Delivery"
            stats={[
              { value: "30+", label: "Commercial markets" },
              { value: "COI", label: "Certificate support" },
              { value: "25+", label: "Years experience" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  Commercial auto is not one-size-fits-all. A single contractor pickup needs entirely different coverage than a three-van HVAC fleet or a food truck operation. We open with questions about your operation before we touch a quote form.
                </p>
                <p className="leading-relaxed">
                  We can review specialty-market options for operations such as NEMT, for-hire vehicles, and businesses that use employee vehicles. Eligibility and certificate timing depend on the carrier, classification, complete documents, payment, and confirmed binding.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Section 4: Why broker beats direct */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why a broker beats a direct quote for commercial auto
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Commercial auto insurance is one of the few lines where carrier
                appetite varies more wildly than almost any other class of
                business. A carrier that happily insures a contractor's pickup
                may flatly decline a food truck or an NEMT operator. Direct
                online quote tools are built for personal auto and simple
                commercial cases — they frequently return "we cannot insure
                this" for anything with elevated exposure or an unusual vehicle
                classification.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                An independent broker with access to 30+ commercial markets can
                submit the same risk to multiple underwriters simultaneously and
                find the carrier that has actual appetite for your specific
                class of business. Brokers also understand how to present a
                risk — driver records, vehicle schedules, radius of operation,
                and business descriptions — in the way underwriters respond to
                favorably. A poorly packaged submission gets a higher rate or a
                decline; a well-packaged one gets a competitive quote.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Direct channels also offer no advocacy when a claim is filed.
                We stay involved through the life of your policy, including
                claims guidance when you need it most.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5: Downey and Southeast LA service */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Commercial auto service for Downey and Southeast LA
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Our office is located at 9907-B Paramount Blvd in Downey — just
                off the 5 freeway and a short drive from the Lakewood Blvd and
                Firestone Blvd business corridors where many of our commercial
                clients operate. We understand the local business environment,
                the industries active in Southeast LA County, and the
                underwriting issues specific to vehicles working these routes.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Walk-ins are welcome. Quote and binding time depend on the
                business classification, driver and vehicle information,
                documents, payment, and carrier review. We confirm the steps
                and expected certificate timing before you choose coverage.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6: Nearby service areas */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nearby service areas
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We write commercial auto coverage throughout Southeast Los Angeles
              County. If your vehicles operate in any of these nearby
              communities, we can help.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {NEARBY_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  to={`/insurance/${city.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  Insurance in {city.name}, CA
                </Link>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Related Downey insurance pages
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/auto-insurance-downey-ca"
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  Auto Insurance Downey CA
                </Link>
                <Link
                  to="/sr22-insurance-downey"
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  SR-22 Insurance Downey
                </Link>
                <Link
                  to="/no-license-auto-insurance-downey"
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  No-License Insurance Downey
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageTestimonials />

      {/* Dual CTA block */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to protect your business vehicles?
            </h2>
            <p className="text-white/70 mb-6">
              Compare available commercial auto markets and confirm the
              documents, binding steps, and certificate timing for your operation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get a Commercial Auto Quote
              </button>
              <a
                href={site.contact.phoneHref}
                className="btn btn-ghost-light btn-lg"
              >
                Call {site.contact.phone}
              </a>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Office at 9907-B Paramount Blvd, Downey, CA — walk-ins welcome.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
