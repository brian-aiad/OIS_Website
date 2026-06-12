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
import { ConsultationImage } from "../components/ConsultationImage";
import { images } from "../lib/images";

const AUTO_FAQS = [
  { q: "How much does car insurance cost in Downey, CA?", a: "Most Downey drivers pay $80–$180 per month depending on driving record, vehicle type, coverage level, and ZIP code. Rates vary significantly by carrier." },
  { q: "What is California's minimum car insurance requirement?", a: "California requires 30/60/15 liability: $30,000 bodily injury per person, $60,000 per accident, and $15,000 for property damage." },
  { q: "Can I get same-day proof of insurance in Downey?", a: "Yes. Once you bind a policy, we issue a digital ID card immediately. SR-22 certificates are filed electronically with the CA DMV the same day." },
  { q: "What discounts are available for Downey auto insurance?", a: "Common discounts include multi-car, home and auto bundle (10–15%), continuous coverage, and good driver. We compare 30+ carriers to find your best combination." },
  { q: "Do you offer insurance for drivers without a California license?", a: "Yes. We work with carriers that cover vehicle owners with foreign licenses, ITIN-based applicants, and licensed household members as the primary driver." },
];
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
const NEARBY_CITIES = [
  { name: "Bellflower", slug: "bellflower" },
  { name: "Norwalk", slug: "norwalk" },
  { name: "Paramount", slug: "paramount" },
  { name: "Lakewood", slug: "lakewood" },
  { name: "Lynwood", slug: "lynwood" },
  { name: "Whittier", slug: "whittier" },
];

export default function AutoInsuranceDowneyCA() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageMeta({
    title: "Auto Insurance Downey CA — Same-Day | Original Insurance",
    description:
      "Compare 30+ carriers for auto insurance in Downey, CA. Same-day eID cards, SR-22 filing, no-license programs. Cheap car insurance that fits — walk in or call today.",
    canonical: "https://originalinsurance.net/auto-insurance-downey-ca",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Auto Insurance Downey CA", url: "https://originalinsurance.net/auto-insurance-downey-ca" },
      ]} />

      <PageHero
        title="Auto Insurance in Downey, CA"
        subtitle="Auto insurance in Downey should be simple. We compare 30+ carriers for liability, full coverage, SR-22 filings, and no-license or international-license situations so you can choose the right price and protection without calling five different companies."
        breadcrumb="Auto Insurance Downey"
        badgeText="Same-Day Quotes Available"
        backgroundImage={images.products.auto}
        imageFilter="contrast(1.08) saturate(1.03) brightness(0.96)"
        imagePosition="center"
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
            Get My Downey Auto Quote
          </button>
          <a href="#sr22" className="btn btn-ghost-light btn-lg">
            Same-Day SR-22 Help
          </a>
        </div>
      </PageHero>

      <StatsBar />

      <InsuranceWorkflow
        tone="offwhite"
        title="Auto quotes that account for the details"
        lede="Vehicle use, driver history, coverage limits, SR-22 status, and current policy details all affect which carrier is actually competitive."
      />

      {/* Section 1: Cost */}
      <section className="sp bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              How much car insurance costs in Downey
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Car insurance rates in Downey depend on several factors: your driving history, the type of vehicle you drive, the coverage level you choose, your zip code (90240, 90241, or 90242), and any prior claims. Drivers with clean records and older paid-off vehicles often qualify for cheap car insurance downey rates starting around $80/month for liability-only coverage, while those with newer financed vehicles or prior incidents typically pay more for full coverage.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California requires a minimum liability of 30/60/15 — $30,000 bodily injury per person, $60,000 per accident, and $15,000 property damage. Many Downey drivers choose more than this minimum because the limits are low relative to real-world costs. If you cause an accident with an expensive vehicle or medical bills that exceed your coverage, you can be personally responsible for the difference.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                As an independent broker, we do not work for any single insurance company. Instead, we compare rates from 30+ carriers simultaneously, which means you get cheap car insurance downey options that reflect real market competition — not just one company's price. Factors like bundling home and auto, installing safety features, or maintaining continuous coverage can all reduce your premium.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Our team walks you through each option in plain language so you understand what you're buying. There is no pressure to choose a specific carrier, and there is no extra cost to work with us — we are compensated by the carrier you choose.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Coverage Options */}
      <section className="sp bg-slate-50">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Coverage Types</span>
            <h2 className="mt-3 display-2 text-slate-900">Coverage options for Downey drivers</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Not every car or driver needs the same coverage. We match the policy to your actual situation.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Liability-Only",
                desc: "The California minimum — covers damage you cause to others. Best for older paid-off vehicles. Commuters on surface streets often choose this as a starting point.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "Full Coverage",
                desc: "Liability + collision + comprehensive. Required by most lenders on financed vehicles. Protects your investment against at-fault accidents, theft, and weather damage.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
                title: "Uninsured Motorist",
                desc: "Covers you when hit by a driver with no insurance or not enough. California has a significant uninsured driver population — worth serious consideration for any household.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: "Comprehensive",
                desc: "Non-collision damage: theft, hail, fire, flood, vandalism. If you park on the street or in a higher-theft area, this coverage pays for itself quickly after one incident.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Collision",
                desc: "Repairs or replaces your vehicle after any crash, regardless of fault. Multi-car households with newer vehicles frequently add this to avoid large out-of-pocket repair bills.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: "Add-Ons",
                desc: "Rental reimbursement while your car is repaired. Roadside assistance for towing, flats, and lockouts. Both are low cost and worth adding for daily drivers.",
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

      {/* Consultation image — independent broker advantage */}
      <section className="sp bg-white">
        <div className="container max-w-6xl">
          <ConsultationImage
            image={images.clients.autoConsultation}
            alt="Independent insurance broker at Original Insurance in Downey, CA comparing auto insurance rates across 30+ carriers side by side for client"
            eyebrow="Independent Broker Advantage"
            heading="One conversation. Thirty carrier quotes. Best rate for your situation."
            badge="Walk-ins welcome · No appointment needed"
            stats={[
              { value: "30+", label: "Carriers quoted" },
              { value: "10 min", label: "Avg. quote time" },
              { value: "Same day", label: "ID card issued" },
            ]}
            body={
              <>
                <p className="text-lg leading-relaxed">
                  A captive agent shows you one company's prices. We show you 30+. That difference matters most when your situation is non-standard — SR-22 requirement, foreign license, prior lapse, or a financed vehicle with strict lender requirements.
                </p>
                <p className="leading-relaxed">
                  Our office at 9907-B Paramount Blvd, Downey is open Monday through Friday, 10 AM to 5:30 PM. Walk in, get covered, and drive away with same-day proof of insurance. We serve in English, Spanish, and Arabic.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Section 3: SR-22 */}
      <section id="sr22" className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              SR-22 filing in Downey
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                An SR-22 is a filing — not a separate insurance policy. It is a certificate your insurance company sends electronically to the California DMV confirming that you carry the state-required minimum liability coverage. Common triggers include a lapse in coverage, a license suspension, an at-fault accident while uninsured, a DUI conviction, or a court order.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                We file SR-22s electronically the same day you bind a qualifying policy. What to bring: your driver's license or reinstatement paperwork from the DMV, your vehicle VIN, your current declarations page if you have one, and any court or DMV reference number. Most Downey clients who walk in for SR-22 leave with the filing submitted and proof of insurance in hand before they drive away.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                California typically requires you to carry SR-22 for three years. During that period, your policy must remain active — any lapse restarts the clock with the DMV. As an independent broker, we have access to carriers that specialize in SR-22 situations and can find competitive rates even when other companies have declined.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                For full details on SR-22 cost, duration, and what to expect, visit our dedicated page.
              </p>
            </div>
            <div className="mt-6">
              <NavLink to="/sr22-insurance-downey" className="btn btn-outline group">
                Full SR-22 Guide
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </NavLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4: No-License */}
      <section id="no-license" className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              No-license, foreign-license, and international-license options
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Vehicle ownership and driving are separate legal concepts. There are several lawful situations where someone needs auto insurance coverage but does not hold a traditional California driver's license. We work with carriers that understand these scenarios and write policies accordingly.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Common situations we help with: a vehicle owner who does not drive but needs the car insured with a licensed primary driver listed; foreign-license holders who have a valid driver's license from another country; international-license drivers temporarily in California; and ITIN-based applicants who do not have a Social Security Number. In all cases, the licensed driver on the policy must be the person actually operating the vehicle — we never advise or imply that driving without a valid license is permissible.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Not every carrier writes these situations. Our access to 30+ carriers means we can find options where a single-carrier agent cannot. Documents that help: foreign driver's license, passport, ITIN letter, vehicle registration, and any existing declarations page.
              </p>
            </div>
            <div className="mt-6">
              <NavLink to="/no-license-auto-insurance-downey" className="btn btn-outline group">
                No-License & Foreign-License Guide
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </NavLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 5: Why Original */}
      <section className="sp bg-white">
        <div className="container max-w-5xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-3 display-2 text-slate-900">Why Downey drivers choose Original</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              On Paramount Blvd since 1999 — we find the right policy at the right price from the right carrier for your situation.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
                title: "We work for you",
                desc: "Independent broker — zero brand quotas, zero pressure. We compare every carrier and recommend what's actually best for your situation.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: "30+ carriers, one call",
                desc: "Real market competition produces better rates. We run your profile across every carrier at once so you're not overpaying because you only called one company.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
                title: "3 languages",
                desc: "Fluent service in English, Spanish, and Arabic. Every option explained clearly — no insurance jargon, no translation gaps.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "Same-day proof",
                desc: "eID cards issued immediately after binding. SR-22 certificates filed electronically with the CA DMV the same day you bind your policy.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                title: "Claims advocacy",
                desc: "We don't disappear after the sale. We guide you through claims, communicate with adjusters, and follow up so nothing falls through the cracks.",
              },
              {
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                title: "Local office, walk-ins welcome",
                desc: "9907-B Paramount Blvd, Downey — right off the 5 freeway. 25+ years in the same location serving Southeast LA County.",
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

      <PageTestimonials tone="offwhite" />

      {/* Section 5b: Spanish-intent section */}
      <section lang="es" className="sp bg-brand-950 text-white">
        <div className="container max-w-4xl">
          <Reveal>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Seguro de Auto en Downey, California
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/85 leading-relaxed mb-4">
                En Original Insurance, comparamos más de 30 aseguradoras para encontrar la cobertura que mejor se adapta a su situación — ya sea seguro básico de responsabilidad civil, cobertura completa, o un programa especial para conductores sin licencia californiana o con licencia extranjera.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                Nuestro equipo en Downey ofrece servicio completamente en español. Explicamos cada opción de cobertura con claridad, sin terminología confusa, para que usted pueda tomar una decisión informada. Hemos ayudado a miles de familias en el área de Downey, Lynwood, South Gate, y toda el área del sureste del Condado de Los Ángeles a obtener cobertura de auto de manera rápida y accesible.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                Si usted ha tenido infracciones de tránsito, necesita un archivo SR-22 para reinstalar su licencia, o es nuevo en California con una licencia de otro país, tenemos opciones disponibles. No es necesario tener número de Seguro Social para obtener cobertura en muchos de nuestros programas. Aceptamos clientes con ITIN y con licencias extranjeras válidas.
              </p>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                Para obtener una cotización el mismo día, llámenos o visítenos en nuestra oficina en 9907-B Paramount Blvd, Downey, CA 90240. Estamos abiertos de lunes a viernes de 10:00 AM a 5:30 PM. También puede solicitar su cotización en línea y nos pondremos en contacto con usted dentro de horas hábiles.
              </p>
              <p className="text-sm text-white/60 leading-relaxed italic">
                Nota: Este contenido fue redactado para hispanohablantes que buscan seguro de auto en Downey. Recomendamos que un hispanohablante nativo revise y perfeccione el texto antes de publicarlo. — Original Insurance Team
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6: Nearby Cities */}
      <section className="sp bg-slate-50">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Nearby cities we serve
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Many of our clients come to us through family referrals from neighboring cities. We write auto insurance throughout Southeast Los Angeles County and are familiar with the roads, freeways, and commute patterns in each community.
            </p>
            <div className="flex flex-wrap gap-3">
              {NEARBY_CITIES.map((city) => (
                <NavLink
                  key={city.slug}
                  to={`/insurance/${city.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white text-slate-700 rounded-lg px-4 py-2 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700 transition-all text-sm font-medium"
                >
                  Auto insurance in {city.name}, CA
                </NavLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="sp bg-white">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-3 display-2 text-slate-900">Auto insurance questions Downey clients ask</h2>
          </Reveal>
          <div className="space-y-3">
            {AUTO_FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-slate-50 rounded-2xl ring-1 ring-slate-200/80 overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/60 transition-colors"
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

      {/* Dual CTA Footer */}
      <section className="sp bg-brand-950">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Ready to compare Downey auto quotes?
            </h2>
            <p className="text-white/70 mb-6">Most quotes take under 10 minutes. Same-day proof of insurance available.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Get My Downey Auto Quote
              </button>
              <NavLink to="/sr22-insurance-downey" className="btn btn-ghost-light btn-lg">
                Need same-day SR-22 help?
              </NavLink>
            </div>
            <p className="mt-5 text-white/60 text-sm">
              Or call us at{" "}
              <a href={site.contact.phoneHref} className="text-gold-300 hover:text-gold-200 font-semibold">
                {site.contact.phone}
              </a>
            </p>
            <p className="mt-3 text-white/50 text-sm">
              Also see:{" "}
              <NavLink to="/no-license-auto-insurance-downey" className="text-gold-300/80 hover:text-gold-200">
                No-license &amp; foreign-license options
              </NavLink>{" "}
              ·{" "}
              <NavLink to="/commercial-auto-insurance-downey" className="text-gold-300/80 hover:text-gold-200">
                Commercial auto insurance
              </NavLink>{" "}
              ·{" "}
              <NavLink to="/home-insurance-downey-ca" className="text-gold-300/80 hover:text-gold-200">
                Home &amp; renters insurance
              </NavLink>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
