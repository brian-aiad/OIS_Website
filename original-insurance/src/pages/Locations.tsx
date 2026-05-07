import { useEffect, useState } from "react";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Icons } from "../components/Icons";
import { Reveal } from "../components/AnimatedSection";

import storefrontImg from "../assets/storefront.webp";

type HourRow =
  | { label: string; short: string; open: string; close: string; closed?: false }
  | { label: string; short: string; closed: true };

const HOURS: HourRow[] = [
  { label: "Monday",    short: "Mon", open: "10:00 AM", close: "5:30 PM" },
  { label: "Tuesday",   short: "Tue", open: "10:00 AM", close: "5:30 PM" },
  { label: "Wednesday", short: "Wed", open: "10:00 AM", close: "5:30 PM" },
  { label: "Thursday",  short: "Thu", open: "10:00 AM", close: "5:30 PM" },
  { label: "Friday",    short: "Fri", open: "10:00 AM", close: "5:30 PM" },
  { label: "Saturday",  short: "Sat", closed: true },
  { label: "Sunday",    short: "Sun", closed: true },
];

const SERVICE_AREA = ["Downey", "Lynwood", "Cerritos", "Commerce", "Lakewood", "Whittier", "La Mirada", "Paramount", "Montebello", "Pico Rivera", "Norwalk", "La Habra", "Bellflower", "Santa Fe Springs", "South Gate", "Bell Gardens"];

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

function isClosedHour(row: HourRow): row is Extract<HourRow, { closed: true }> {
  return "closed" in row && row.closed === true;
}

export default function Locations() {
  usePageMeta({
    title: "Our Downey Office — Hours & Directions | Original Insurance",
    description: "Visit us at 9907-B Paramount Blvd, Downey CA 90240. Open Mon–Fri 10AM–5:30PM. Walk-ins welcome. Serving Downey, Cerritos, Norwalk, Lakewood & surrounding areas.",
    canonical: "https://originalinsurance.net/locations",
  });

  const [copied, setCopied] = useState(false);
  const todayIdx = (new Date().getDay() + 6) % 7;

  /* JSON-LD */
  useEffect(() => {
    const dayMap = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const spec = HOURS.map((h, i) => {
      if (isClosedHour(h))
        return { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[i] };
      return { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[i],
        opens: h.open.replace(" AM",":00").replace(" PM",":00"),
        closes: h.close.replace(" AM",":00").replace(" PM",":00") };
    });
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "InsuranceAgency",
      name: site.name, url: "https://originalinsurance.net/",
      telephone: site.contact.phone, email: site.contact.email,
      address: { "@type": "PostalAddress", streetAddress: site.contact.address,
        addressLocality: "Downey", addressRegion: "CA", postalCode: "90240", addressCountry: "US" },
      openingHoursSpecification: spec, areaServed: "California",
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* */ }
  };

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Location", url: "https://originalinsurance.net/locations" },
      ]} />
      {/* ── Premium Header ── */}
      <section className="relative hero-mesh overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

        <div className="container relative pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid lg:grid-cols-[1fr,0.7fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
                <NavLink to="/" className="hover:text-white transition-colors">Home</NavLink>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                <span className="text-white font-medium">Location</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Open now
              </div>

              <h1 className="display-1 text-white">Our Downey office</h1>
              <p className="mt-4 text-lg text-white/80 max-w-lg">
                Free parking lot on-site plus free street parking on Paramount Blvd.
                Walk-ins welcome Monday through Friday.
              </p>

              {/* Quick contact cards */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <a
                  href={site.contact.phoneHref}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all group"
                >
                  <Icons.Phone className="w-5 h-5 text-gold-400 mb-2" />
                  <div className="text-sm text-blue-200">Call Us</div>
                  <div className="text-white font-bold group-hover:text-gold-400 transition-colors">{site.contact.phone}</div>
                </a>

                <a
                  href={site.contact.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all group"
                >
                  <Icons.MapPin className="w-5 h-5 text-gold-400 mb-2" />
                  <div className="text-sm text-blue-200">Directions</div>
                  <div className="text-white font-bold group-hover:text-gold-400 transition-colors">Get Directions</div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-heavy">
                <img src={storefrontImg} alt="Original Insurance storefront on Paramount Blvd" className="w-full h-auto object-cover" loading="lazy" width={800} height={600} />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="wave-divider">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="white">
            <path d="M0 30C240 50 480 20 720 30C960 40 1200 20 1440 30V60H0V30Z" />
          </svg>
        </div>
      </section>

      {/* ── Main content: 2-column ── */}
      <section className="sp bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-8 lg:gap-12 items-start">
            {/* Left: Map + address */}
            <Reveal direction="left">
              <div className="space-y-6">
                {/* Map */}
                <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-lifted aspect-[16/10]">
                  <iframe
                    title="Office location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1323.4536432142705!2d-118.2979079!3d33.9010092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bae3e93f75f9%3A0xf8e0a9d1b3d7472d!2s9907B%20PARAMOUNT%20BLVD%2C%20DOWNEY%2C%20CA%2090240-3805!5e0!3m2!1sen!2sus!4v1623703061556"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  />
                </div>

                {/* Address card */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 ring-1 ring-brand-100 grid place-items-center shrink-0 mt-0.5">
                      <Icons.MapPin className="w-4 h-4 text-brand-700" />
                    </div>
                    <div>
                      <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="font-semibold text-slate-900 hover:text-brand-700 transition-colors">
                        {site.contact.address}
                      </a>
                      <div className="mt-2 flex gap-2">
                        <button onClick={handleCopy} className="text-[12px] font-medium text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1 ring-1 ring-slate-200 hover:ring-slate-300 transition-all">
                          {copied ? "Copied!" : "Copy address"}
                        </button>
                        <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="text-[12px] font-medium text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1 ring-1 ring-slate-200 hover:ring-slate-300 transition-all">
                          Open in Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 ring-1 ring-brand-100 grid place-items-center shrink-0">
                      <Icons.Phone className="w-4 h-4 text-brand-700" />
                    </div>
                    <a href={site.contact.phoneHref} className="font-semibold text-slate-900 hover:text-brand-700 transition-colors">{site.contact.phone}</a>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 ring-1 ring-brand-100 grid place-items-center shrink-0">
                      <Icons.Mail className="w-4 h-4 text-brand-700" />
                    </div>
                    <a href={site.contact.emailHref} className="font-semibold text-slate-900 hover:text-brand-700 transition-colors">{site.contact.email}</a>
                  </div>
                </div>

                {/* Parking info */}
                <div className="bg-slate-50 rounded-xl p-5 ring-1 ring-slate-200/60">
                  <h3 className="text-sm font-bold text-slate-800">Parking &amp; Access</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-500">
                    {["Free parking lot on-site", "Free street parking on Paramount Blvd", "Wheelchair-accessible entrance & parking lot", "Wheelchair-accessible seating"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right: Hours + Languages + Service Area */}
            <Reveal direction="right" delay={0.1}>
              <div className="space-y-6">
                {/* Hours */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl grid place-items-center ring-1 ring-brand-100">
                      <svg className="w-5 h-5 text-brand-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Office Hours</h2>
                  </div>
                  <div className="rounded-xl overflow-hidden ring-1 ring-slate-200/80">
                    <ul className="divide-y divide-slate-100">
                      {HOURS.map((h, i) => {
                        const isToday = i === todayIdx;
                        const isClosed = isClosedHour(h);
                        return (
                          <li key={h.label} className={cx(
                            "px-4 py-3 grid grid-cols-[1fr,auto] text-sm",
                            isToday && "bg-brand-50/60"
                          )}>
                            <span className={cx("font-medium", isToday ? "text-brand-800" : "text-slate-700")}>
                              {h.label}
                              {isToday && <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-brand-500">Today</span>}
                            </span>
                            <span className={cx(isClosed ? "text-slate-400" : "text-slate-700")}>
                              {isClosedHour(h) ? "Closed" : `${h.open} \u2013 ${h.close}`}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-gradient-to-br from-gold-500 to-gold-400 rounded-2xl p-6 text-white shadow-lifted relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <h3 className="text-lg font-bold text-brand-950 mb-2">We speak your language</h3>
                  <p className="text-brand-900/70 text-sm mb-3">
                    Tambi&eacute;n hablamos espa&ntilde;ol. &nbsp; نتحدث العربية
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Arabic", "Spanish", "English"].map((l) => (
                      <span key={l} className="text-[11px] font-semibold bg-white/25 text-brand-950 rounded-full px-2.5 py-1">{l}</span>
                    ))}
                  </div>
                </div>

                {/* Service area */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Service Area</h3>
                  <p className="text-sm text-slate-500 mb-3">Proudly serving these communities and beyond:</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_AREA.map((a) => (
                      <span key={a} className="text-[12px] font-medium bg-slate-50 text-slate-600 rounded-lg px-2.5 py-1 ring-1 ring-slate-200/80">
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-[12px] text-slate-400">Phone and email quotes available statewide.</p>
                </div>

                {/* CTA */}
                <div className="grid grid-cols-2 gap-3">
                  <a href={site.contact.phoneHref} className="btn btn-outline justify-center">Call Us</a>
                  <button onClick={openQuoteModal} className="btn btn-primary justify-center">Get a Quote</button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
