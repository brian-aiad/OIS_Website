import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { useLenis } from "../App";
import logoBadge from "../assets/logo-badge.png";

const HOURS_DATA = [
  { day: "Mon", open: { h: 10, m: 0 }, close: { h: 17, m: 30 } },
  { day: "Tue", open: { h: 10, m: 0 }, close: { h: 17, m: 30 } },
  { day: "Wed", open: { h: 10, m: 0 }, close: { h: 17, m: 30 } },
  { day: "Thu", open: { h: 10, m: 0 }, close: { h: 17, m: 30 } },
  { day: "Fri", open: { h: 10, m: 0 }, close: { h: 17, m: 30 } },
  { day: "Sat", open: null as any, close: null as any },
  { day: "Sun", open: null as any, close: null as any },
];

function useOpenNow() {
  return useMemo(() => {
    const now = new Date();
    const idx = (now.getDay() + 6) % 7;
    const today: any = HOURS_DATA[idx];
    if (!today.open || !today.close) return { open: false, label: "Closed" };
    const s = new Date(now); s.setHours(today.open.h, today.open.m, 0, 0);
    const e = new Date(now); e.setHours(today.close.h, today.close.m, 0, 0);
    const isOpen = now >= s && now <= e;
    return { open: isOpen, label: isOpen ? "Open now" : "Closed" };
  }, []);
}

export default function Footer() {
  const { open, label } = useOpenNow();
  const lenisRef = useLenis();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* JSON-LD */
  useEffect(() => {
    const dayMap = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const spec = HOURS_DATA.map((h, i) =>
      h.open && h.close
        ? { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[i],
            opens: `${String(h.open.h).padStart(2,"0")}:${String(h.open.m).padStart(2,"0")}`,
            closes: `${String(h.close.h).padStart(2,"0")}:${String(h.close.m).padStart(2,"0")}` }
        : { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[i] }
    );
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "InsuranceAgency",
      name: site.name, url: window.location.origin,
      telephone: site.contact?.phone, email: site.contact?.email,
      sameAs: (site.socials || []).map((s: any) => s.href).filter(Boolean),
      address: { "@type": "PostalAddress", streetAddress: site.contact?.address,
        addressLocality: "Downey", addressRegion: "CA", postalCode: "90240", addressCountry: "US" },
      openingHoursSpecification: spec, areaServed: "California",
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <footer className="bg-brand-950 text-white">
      {/* Gradient accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      {/* CTA band */}
      <div className="border-b border-white/[0.06]">
        <div className="container py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 className="text-xl font-bold text-white">Ready for a better rate?</h3>
            <p className="mt-1 text-white/70">Get a personalised quote from a real person, not a bot.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-sm">
              Call {site.contact.phone}
            </a>
            <button onClick={openQuoteModal} className="btn btn-accent btn-sm">
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* ── Main footer content ── */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* Column 1: Brand + Social */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logoBadge} alt="" className="h-12 w-12 object-contain" />
              <div>
                <div className="font-bold text-lg text-white">Original Insurance</div>
                <div className="text-sm text-blue-300">Est. 1999 &middot; Downey, CA</div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-[300px]">
              Independent brokerage serving California families and businesses for over 25 years.
            </p>

            {/* Open/Closed badge */}
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold ring-1 ring-white/10 mb-6 ${open ? "text-emerald-400 bg-emerald-500/10" : "text-white/50 bg-white/[0.04]"}`}>
              <span className={`h-2 w-2 rounded-full ${open ? "bg-emerald-400 animate-pulse" : "bg-white/40"}`} />
              {label}
              <span className="text-white/30">&middot;</span>
              <span className="text-white/40">Mon-Fri 10-5:30</span>
            </div>

            {/* Social icons — larger on mobile */}
            <div>
              <div className="text-sm font-semibold text-gray-300 mb-3">Follow Us</div>
              <div className="flex gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 md:w-10 md:h-10 rounded-xl bg-white/[0.06] ring-1 ring-white/10 grid place-items-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all"
                    aria-label={s.label}
                  >
                    {s.icon === "Facebook" && (
                      <svg className="w-5 h-5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    )}
                    {s.icon === "LinkedIn" && (
                      <svg className="w-5 h-5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick contact — mobile only */}
            <div className="mt-6 space-y-3 md:hidden">
              <a href={site.contact.phoneHref} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-1">
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                <span>{site.contact.phone}</span>
              </a>
              <a href={site.contact.emailHref} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-1">
                <svg className="w-5 h-5 text-gold-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                <span className="text-sm">{site.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Coverage */}
          <div>
            <h4 className="font-bold text-lg text-white mb-5">Coverage</h4>
            <ul className="space-y-3">
              {["Auto Insurance", "Home & Renters", "Life Insurance", "Commercial", "Motorcycle", "SR-22 Filing"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors py-0.5">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-bold text-lg text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/about" },
                { label: "Location & Hours", to: "/locations" },
                { label: "Contact Us", to: "/contact" },
                { label: "All Services", to: "/services" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors py-0.5">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={openQuoteModal} className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors py-0.5">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Visit Us */}
          <div>
            <h4 className="font-bold text-lg text-white mb-5">Visit Us</h4>
            <div className="space-y-5 text-gray-400">
              {/* Address */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /></svg>
                <div className="text-sm">
                  9907-B Paramount Blvd<br />
                  Downey, CA 90240
                </div>
              </div>

              {/* Hours */}
              <div>
                <div className="font-semibold text-white mb-2 text-sm">Office Hours</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Mon&ndash;Fri:</span><span className="text-gray-300">10am &ndash; 5:30pm</span></div>
                  <div className="flex justify-between"><span>Sat&ndash;Sun:</span><span className="text-gray-500">Closed</span></div>
                </div>
              </div>

              {/* Directions link */}
              <Link
                to="/locations"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors"
              >
                View Map &amp; Directions
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="container py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500">
          <p className="text-center sm:text-left">&copy; {year} Original Group Inc. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <button onClick={scrollToTop} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
