import { useState } from "react";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger, StaggerChild } from "../components/AnimatedSection";
import { Car, Home, Heart, Building2, Bike, Caravan } from "lucide-react";
import { images } from "../lib/images";

/* ── Service tab data ── */
const SERVICE_TABS = [
  {
    key: "auto",
    label: "Auto",
    icon: Car,
    badge: "Most Popular",
    title: "Auto Insurance",
    desc: "From daily drivers to weekend classics — comprehensive coverage with competitive rates and same-day eID cards.",
    img: images.services.auto,
    alt: "Premium auto insurance coverage",
    highlights: [
      { title: "Full coverage options", sub: "Liability, comprehensive, collision" },
      { title: "SR-22 filing included", sub: "Fast processing, no hassle" },
      { title: "No license? We can help", sub: "Special programs available" },
      { title: "Multi-car discounts", sub: "Save on family policies" },
    ],
    stats: [
      { value: "Same Day", label: "eID Cards" },
      { value: "30+", label: "Carriers" },
      { value: "25%", label: "Avg. Savings" },
    ],
  },
  {
    key: "home",
    label: "Home",
    icon: Home,
    badge: null,
    title: "Home & Renters Insurance",
    desc: "Protect your dwelling, personal belongings, and liability. Whether you own or rent, we find the right-sized coverage.",
    img: images.services.home,
    alt: "Comprehensive home insurance protection",
    highlights: [
      { title: "Dwelling & personal property", sub: "Full replacement options" },
      { title: "Liability protection", sub: "Coverage up to $1M+" },
      { title: "Renters coverage too", sub: "Affordable policies from $15/mo" },
      { title: "Bundle & save", sub: "Home + Auto discounts" },
    ],
    stats: [
      { value: "15%", label: "Avg. Bundle Savings" },
      { value: "$15/mo", label: "Renters Starting" },
      { value: "24/7", label: "Claims Support" },
    ],
  },
  {
    key: "life",
    label: "Life",
    icon: Heart,
    badge: null,
    title: "Life Insurance",
    desc: "Term and whole life options that protect your family's future. Affordable premiums with flexible coverage amounts.",
    img: images.services.life,
    alt: "Family life insurance planning",
    highlights: [
      { title: "Term & whole life", sub: "Options for every budget" },
      { title: "Family protection", sub: "Peace of mind for loved ones" },
      { title: "Flexible coverage amounts", sub: "$50K to $1M+" },
      { title: "Affordable premiums", sub: "Starting at $20/mo" },
    ],
    stats: [
      { value: "24hr", label: "Approval Turnaround" },
      { value: "$20/mo", label: "Plans Starting" },
      { value: "$1M+", label: "Coverage Available" },
    ],
  },
  {
    key: "commercial",
    label: "Business",
    icon: Building2,
    badge: null,
    title: "Commercial Insurance",
    desc: "Protect your business with general liability, BOP, commercial auto, and workers' compensation coverage.",
    img: images.services.commercial,
    alt: "Business insurance solutions",
    highlights: [
      { title: "General liability", sub: "Essential business protection" },
      { title: "Business owner's policy", sub: "Bundled coverage & savings" },
      { title: "Commercial auto", sub: "Fleets and single vehicles" },
      { title: "Workers' compensation", sub: "Required CA coverage" },
    ],
    stats: [
      { value: "500+", label: "Businesses Covered" },
      { value: "Same Day", label: "Certificates" },
      { value: "20%", label: "Avg. BOP Savings" },
    ],
  },
  {
    key: "moto",
    label: "Motorcycle",
    icon: Bike,
    badge: null,
    title: "Motorcycle Insurance",
    desc: "Coverage for riders with liability, collision, and gear protection. Multi-bike discounts available.",
    img: images.services.motorcycle,
    alt: "Motorcycle insurance coverage",
    highlights: [
      { title: "Liability & collision", sub: "Full protection on the road" },
      { title: "Gear protection", sub: "Helmets, jackets, accessories" },
      { title: "Multi-bike discounts", sub: "Garage policy savings" },
      { title: "Same day coverage", sub: "Ride today, insured today" },
    ],
    stats: [
      { value: "Same Day", label: "Coverage Available" },
      { value: "15%", label: "Multi-Bike Discount" },
      { value: "30+", label: "Carriers" },
    ],
  },
  {
    key: "rec",
    label: "RV",
    icon: Caravan,
    badge: null,
    title: "Recreational Vehicle Insurance",
    desc: "RV, boat, and specialty toys — enjoy the weekend safely with coverage tailored to your adventures.",
    img: images.services.rv,
    alt: "RV and recreational vehicle insurance",
    highlights: [
      { title: "RV & motorhome", sub: "Full-time & part-time coverage" },
      { title: "Boat & watercraft", sub: "On and off the water" },
      { title: "Specialty toys", sub: "ATVs, jet skis, and more" },
      { title: "Weekend-ready coverage", sub: "Quick bind, fast eID" },
    ],
    stats: [
      { value: "Custom", label: "Coverage Plans" },
      { value: "10%", label: "Seasonal Savings" },
      { value: "24/7", label: "Roadside Assist" },
    ],
  },
];

export default function Services() {
  usePageMeta({
    title: "Auto, Home & SR-22 Insurance in Downey | Original Insurance",
    description: "Auto, home, life, SR-22, commercial, renters, motorcycle — we compare 30+ carriers so you get the best fit. Bilingual English, Spanish, Arabic. Same-day eID cards.",
    canonical: "https://originalinsurance.net/services",
  });

  const [activeTab, setActiveTab] = useState("auto");


  const active = SERVICE_TABS.find((t) => t.key === activeTab) || SERVICE_TABS[0];
  const ActiveIcon = active.icon;

  const extraServices = (site.services as { key: string; title?: string; name?: string; blurb?: string; desc?: string }[])
    .slice(6)
    .filter((s) => !/translate|translation/i.test(s.name || s.title || ""));

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Services", url: "https://originalinsurance.net/services" },
      ]} />
      {/* ── Premium Header ── */}
      <section className="relative hero-mesh overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

        <div className="container relative pt-28 pb-20 md:pt-36 md:pb-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
              <NavLink to="/" className="hover:text-white transition-colors">Home</NavLink>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              <span className="text-white font-medium">Services</span>
            </nav>
            <h1 className="display-1 text-white max-w-2xl">
              Complete insurance coverage
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-xl">
              Every policy is different because every person is different.
              We tailor coverage to your situation — not just your budget.
            </p>
          </motion.div>
        </div>

        <div className="wave-divider">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="white">
            <path d="M0 30C240 50 480 20 720 30C960 40 1200 20 1440 30V60H0V30Z" />
          </svg>
        </div>
      </section>

      {/* ── Interactive Service Browser ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <Reveal className="text-center mb-12 md:mb-16">
            <span className="eyebrow">What We Cover</span>
            <h2 className="mt-3 display-2 text-slate-900">
              Complete coverage for every part of your life
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              From your daily commute to your dream home — we've got you covered with 30+ carriers
            </p>
          </Reveal>

          {/* Tab triggers — scrollable on mobile, wrap on desktop */}
          <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 mb-10 md:mb-12 scrollbar-none">
            <div className="flex gap-2.5 md:gap-3 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
            {SERVICE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-brand-700 text-white shadow-lg scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-[1.02]"
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-[13px] md:text-sm">{tab.label}</span>
                </button>
              );
            })}
            </div>
          </div>

          {/* Tab content — two column */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
                {/* Image side */}
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-lifted aspect-[4/3]">
                    <img src={active.img} alt={active.alt} className="h-full w-full object-cover" loading="lazy" width={800} height={600} />
                  </div>

                  {/* Floating stats overlay */}
                  <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-xl shadow-heavy ring-1 ring-slate-100 p-5">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {active.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="text-xl font-extrabold text-brand-700">{stat.value}</div>
                          <div className="text-[11px] text-slate-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-50 rounded-2xl ring-1 ring-brand-100 mb-5">
                    <ActiveIcon className="w-7 h-7 text-brand-700" />
                  </div>

                  {active.badge && (
                    <span className="inline-block bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold mb-4 ring-1 ring-brand-200/60 ml-3">
                      {active.badge}
                    </span>
                  )}

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-display">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-slate-500 text-base md:text-lg leading-relaxed max-w-md">
                    {active.desc}
                  </p>

                  <div className="mt-6 md:mt-8 space-y-3">
                    {active.highlights.map((h) => (
                      <div key={h.title} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-emerald-50 ring-1 ring-emerald-200 grid place-items-center">
                          <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{h.title}</div>
                          <div className="text-slate-400 text-sm">{h.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={openQuoteModal} className="btn btn-accent btn-lg group">
                      Get a Quote
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                      </svg>
                    </button>
                    <a href={site.contact.phoneHref} className="btn btn-outline">
                      Call for Details
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick access grid */}
          <Stagger className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { title: "Need SR-22?", sub: "Fast filing, same-day service" },
              { title: "Bundle & Save", sub: "Home + Auto discounts" },
              { title: "Claims Support", sub: "We handle the paperwork" },
            ].map((item) => (
              <StaggerChild key={item.title}>
                <button onClick={openQuoteModal} className="group bg-slate-50 hover:bg-white p-5 md:p-6 rounded-xl ring-1 ring-slate-200/80 hover:ring-brand-200 hover:shadow-soft transition-all duration-300 block w-full text-left">
                  <div className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-brand-800 transition-colors">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                </button>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Additional services ── */}
      {extraServices.length > 0 && (
        <section className="sp-sm bg-slate-50 border-t border-slate-100">
          <div className="container">
            <Reveal className="text-center mb-10">
              <span className="eyebrow">Beyond Insurance</span>
              <h2 className="mt-3 display-2 text-slate-900">Additional Services</h2>
              <p className="mt-2 text-slate-500">We help with the paperwork too.</p>
            </Reveal>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {extraServices.map((svc) => (
                <StaggerChild key={svc.key}>
                  <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted transition-all card-hover">
                    <h3 className="font-bold text-slate-900">{svc.title || svc.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">{svc.blurb || svc.desc}</p>
                  </div>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="sp hero-mesh relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="container relative text-center">
          <Reveal>
            <h2 className="display-2 text-white mb-4">
              Can't find what you need?
            </h2>
            <p className="text-lg text-white/80 max-w-md mx-auto mb-8">
              We handle unusual risks too. Tell us what you need and we'll find a solution.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={openQuoteModal} className="btn btn-accent btn-lg">
                Start a Conversation
              </button>
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
                Call {site.contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
