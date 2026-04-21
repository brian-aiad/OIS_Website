import { useMemo } from "react";
import { Link } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import logoBadge from "../assets/logo-badge.png";

function useOpenNow() {
  return useMemo(() => {
    // Always use Pacific Time for the Downey, CA office
    const ptStr = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const pt = new Date(ptStr);
    const day = pt.getDay(); // 0 Sun .. 6 Sat
    const hour = pt.getHours();
    const minutes = pt.getMinutes();
    const decimal = hour + minutes / 60;

    const isWeekday = day >= 1 && day <= 5;
    const isBusinessHours = decimal >= 10 && decimal < 17.5; // 10:00 – 17:30

    if (isWeekday && isBusinessHours) {
      return { open: true, label: "Open Now" };
    }
    if (day === 0 || day === 6) {
      return { open: false, label: "Opens Mon 10:00 AM" };
    }
    if (decimal < 10) {
      return { open: false, label: "Opens today 10:00 AM" };
    }
    // After hours weekday
    const tomorrow = day === 5 ? "Mon" : "tomorrow";
    return { open: false, label: `Opens ${tomorrow} 10:00 AM` };
  }, []);
}

export default function Footer() {
  const { open, label } = useOpenNow();
  const year = new Date().getFullYear();


  return (
    <footer className="bg-brand-950 text-white/70">
      {/* gradient accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      {/* CTA band */}
      <div className="border-b border-white/[0.06]">
        <div className="container py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 className="text-xl font-bold text-white">Ready for a better rate?</h3>
            <p className="mt-1 text-white/80">Get a personalized quote from a real person, not a bot.</p>
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

      {/* Columns */}
      <div className="container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logoBadge} alt="" className="h-10 w-10 object-contain" />
              <div>
                <div className="text-sm font-bold text-white">Original Insurance</div>
                <div className="text-[11px] text-white/70">Est. 1999</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-[280px]">
              Independent brokerage serving California families and businesses for over 25 years.
            </p>
            <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-white/10 ${open ? "text-gold-300 bg-gold-500/10 ring-gold-400/30" : "text-white/70 bg-white/[0.04]"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-gold-400 animate-pulse" : "bg-white/60"}`} />
              {label}
            </div>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/[0.06] ring-1 ring-white/15 grid place-items-center text-white/70 hover:text-gold-400 hover:bg-white/10 hover:ring-gold-400/40 hover:-translate-y-0.5 transition-all"
                  aria-label={s.label}
                >
                  {s.icon === "Facebook" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  )}
                  {s.icon === "LinkedIn" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">Get Started</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={openQuoteModal} className="hover:text-white transition-colors">Get a Quote</button></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Visit Us</Link></li>
              <li><a className="hover:text-white transition-colors" href={site.contact.phoneHref}>Call {site.contact.phone}</a></li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">Pages</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: "About Us", to: "/about" },
                { label: "Location", to: "/locations" },
                { label: "FAQ", to: "/faq" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">Coverage</h4>
            <ul className="space-y-2.5 text-sm">
              {["Auto Insurance", "Home & Renters", "Life Insurance", "Commercial", "Motorcycle", "SR-22 Filing"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service areas */}
        <div className="mt-10 pt-8 border-t border-white/[0.06]">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">Service Areas</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Downey", slug: "downey" },
              { name: "Norwalk", slug: "norwalk" },
              { name: "Bellflower", slug: "bellflower" },
              { name: "Lynwood", slug: "lynwood" },
              { name: "Cerritos", slug: "cerritos" },
              { name: "Whittier", slug: "whittier" },
              { name: "Lakewood", slug: "lakewood" },
              { name: "Paramount", slug: "paramount" },
              { name: "South Gate", slug: "south-gate" },
              { name: "Pico Rivera", slug: "pico-rivera" },
              { name: "Montebello", slug: "montebello" },
              { name: "Commerce", slug: "commerce" },
            ].map((city) => (
              <Link
                key={city.slug}
                to={`/insurance/${city.slug}`}
                className="text-[11px] font-medium text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-md px-2.5 py-1 ring-1 ring-white/10 transition-all"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.06]">
        <div className="container py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12px] text-slate-300">
          <p>&copy; {year} Original Group Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors"
            >
              Top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
