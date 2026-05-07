import { NavLink } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import PageHero from "../components/PageHero";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import FAQSchema from "../components/seo/FAQSchema";
import ReviewBadge from "../components/seo/ReviewBadge";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import InsuranceWorkflow from "../components/InsuranceWorkflow";

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

function TrustStrip() {
  const items = [
    "Founded 1999",
    "30+ Carriers",
    "Downey Office",
    "English · Español · العربية",
    "Same-Day Proof of Insurance",
    "4.9★ Google Rating",
  ];
  return (
    <div className="bg-brand-950 py-4">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-[13px] font-medium text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AutoInsuranceDowneyCA() {
  usePageMeta({
    title: "Auto Insurance Downey CA — Same-Day | Original Insurance",
    description:
      "Compare 30+ carriers for auto insurance in Downey, CA. Same-day eID cards, SR-22 filing, no-license programs. Cheap car insurance that fits — walk in or call today.",
    canonical: "https://originalinsurance.net/auto-insurance-downey-ca",
  });

  return (
    <main id="main-content">
      <LocalBusinessSchema />
      <FAQSchema questions={AUTO_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Auto Insurance Downey CA", url: "https://originalinsurance.net/auto-insurance-downey-ca" },
      ]} />

      <PageHero
        title="Auto Insurance in Downey, CA"
        subtitle="Auto insurance in Downey should be simple. We compare 30+ carriers for liability, full coverage, SR-22 filings, and no-license or international-license situations so you can choose the right price and protection without calling five different companies."
        breadcrumb="Auto Insurance Downey"
        badgeText="Same-Day Quotes Available"
        backgroundImage="/images/heroTeam.webp"
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

      <TrustStrip />

      <div className="bg-white py-4 border-b border-slate-100">
        <div className="container flex justify-center">
          <ReviewBadge count={site.reviews.count} />
        </div>
      </div>

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
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Coverage options for Downey drivers
            </h2>
          </Reveal>
          <Stagger className="space-y-6">
            {[
              {
                title: "Liability-Only",
                desc: "The minimum California requires — covers damage you cause to others' vehicles and bodily injuries. Best for older paid-off vehicles where the car's value is close to or below what full coverage would cost annually. Commuters driving shorter distances on surface streets often choose this.",
              },
              {
                title: "Full Coverage",
                desc: "Combines liability, collision (damage to your car in a crash), and comprehensive (theft, weather, fire, vandalism). Lenders typically require full coverage on financed or leased vehicles. Newer vehicles or those with significant market value usually benefit most.",
              },
              {
                title: "Uninsured / Underinsured Motorist",
                desc: "Covers you when you're hit by a driver who has no insurance or not enough. California has a significant uninsured driver population, making this coverage worth serious consideration for any Downey household.",
              },
              {
                title: "Comprehensive",
                desc: "Pays for non-collision damage — theft, hail, fire, flood, falling objects, and vandalism. If you park on the street or in an area with higher theft rates, comprehensive coverage is especially valuable.",
              },
              {
                title: "Collision",
                desc: "Pays to repair or replace your vehicle after a collision regardless of who is at fault. Multi-car households with newer vehicles frequently add this to avoid a large out-of-pocket repair bill.",
              },
              {
                title: "Optional Add-Ons",
                desc: "Rental reimbursement pays for a rental while your car is being repaired. Roadside assistance covers towing, flat tires, and lockouts. These are typically low cost and worth considering for daily drivers.",
              },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section 3: SR-22 */}
      <section id="sr22" className="sp bg-white">
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
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Why drivers choose Original in Downey
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              We have been on Paramount Blvd — just off the 5 freeway — since 1999, serving Downey families and businesses before most of our competitors existed in this market. As an independent broker, we are not paid to steer you toward a specific carrier. Our job is to find the right policy at the right price from the right company for your situation.
            </p>
            <ul className="space-y-3">
              {[
                "Independent broker — we work for you, not one insurance company",
                "30+ top-rated California carriers compared in a single quote",
                "Bilingual English, Spanish, and Arabic service",
                "Same-day proof of insurance and SR-22 electronic filing",
                "Claims guidance and advocacy throughout the life of your policy",
                "Real local office at 9907-B Paramount Blvd, Downey — walk-ins welcome",
                "25+ years serving Southeast LA County",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                    <svg className="w-3 h-3 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-slate-600">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
