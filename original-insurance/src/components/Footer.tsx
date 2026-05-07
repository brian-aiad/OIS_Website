import { useMemo } from "react";
import { Link } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { getOfficeStatus } from "../data/hours";
import logoBadge from "../assets/logo-badge.webp";

export default function Footer() {
  const { open, label, holidayWarning } = useMemo(() => getOfficeStatus(), []);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white/70">
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      {/* CTA band */}
      <div className="border-b border-white/[0.06]">
        <div className="container py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 className="text-xl font-bold text-white">Ready for a better rate?</h3>
            <p className="mt-1 text-white/80">Get a personalized quote from a real person, not a bot.</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-sm">
              Call {site.contact.phone}
            </a>
            <a href={site.contact.textHref} className="btn btn-ghost-light btn-sm">
              Text {site.contact.text}
            </a>
            <button onClick={openQuoteModal} className="btn btn-accent btn-sm">
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand + Contact */}
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logoBadge} alt="" className="h-10 w-10 object-contain" />
              <div>
                <div className="text-sm font-bold text-white">Original Insurance</div>
                <div className="text-[11px] text-white/70">Independent Broker · Est. 1999</div>
              </div>
            </div>

            <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-white/10 ${open ? "text-gold-300 bg-gold-500/10 ring-gold-400/30" : "text-white/70 bg-white/[0.04]"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-gold-400 animate-pulse" : "bg-white/60"}`} />
              {label}
            </div>
            {holidayWarning && (
              <p className="mt-1.5 text-[10px] text-amber-400/80">{holidayWarning}</p>
            )}

            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 text-white/60 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.2-.2.6-.3.9-.2 1 .3 2 .5 3.1.5.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9C9.6 20.9 3.1 14.4 3.1 6.9c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9 0 1.1.2 2.1.5 3.1.1.3 0 .6-.2.9l-1.8 1.8z"/></svg>
                <a href={site.contact.phoneHref} className="hover:text-white transition-colors">{site.contact.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 text-white/60 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
                <a href={site.contact.textHref} className="hover:text-white transition-colors">{site.contact.text} (text)</a>
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 text-white/60 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <a href={site.contact.emailHref} className="hover:text-white transition-colors truncate">{site.contact.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="hover:text-white transition-colors leading-snug">
                  9907-B Paramount Blvd<br />Downey, CA 90240
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/50">
                <svg aria-hidden="true" className="w-3.5 h-3.5 text-white/60 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                <span>Mon–Fri 10 AM – 5:30 PM PT</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] ring-1 ring-white/15 grid place-items-center text-white/70 hover:text-gold-400 hover:bg-white/10 transition-all"
                  aria-label={s.label}
                >
                  {s.icon === "Facebook" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  )}
                  {s.icon === "LinkedIn" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services (distinct links — was all going to /services, now differentiated) */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Auto Insurance",      to: "/auto-insurance-downey-ca" },
                { label: "SR-22 Filing",         to: "/sr22-insurance-downey" },
                { label: "No-License Programs",  to: "/no-license-auto-insurance-downey" },
                { label: "Commercial Auto",      to: "/commercial-auto-insurance-downey" },
                { label: "Home & Renters",        to: "/services" },
                { label: "Life & Motorcycle",    to: "/services" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
              <li className="pt-1"><Link to="/services" className="text-gold-400/80 hover:text-gold-300 transition-colors text-[12px]">All services →</Link></li>
            </ul>
          </div>

          {/* Column 3: Pages */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home",        to: "/" },
                { label: "About Us",    to: "/about" },
                { label: "Location",    to: "/locations" },
                { label: "FAQ",         to: "/faq" },
                { label: "Contact",     to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
              <li>
                <button onClick={openQuoteModal} className="hover:text-white transition-colors text-left">
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Areas (top 8 + link) */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">Service Areas</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Downey",       slug: "downey" },
                { name: "Bellflower",   slug: "bellflower" },
                { name: "Cerritos",     slug: "cerritos" },
                { name: "Lakewood",     slug: "lakewood" },
                { name: "Norwalk",      slug: "norwalk" },
                { name: "Paramount",    slug: "paramount" },
                { name: "South Gate",   slug: "south-gate" },
                { name: "Whittier",     slug: "whittier" },
              ].map((city) => (
                <li key={city.slug}>
                  <Link to={`/insurance/${city.slug}`} className="hover:text-white transition-colors">{city.name}</Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/locations" className="text-gold-400/80 hover:text-gold-300 transition-colors text-[12px]">
                  All service areas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Identity & trust badges */}
        <div className="mt-10 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              "Black-Owned Business",
              "Latino-Owned Business",
              "LGBTQ+ Friendly",
              "Transgender Safespace",
              "Wheelchair Accessible",
              "BBB Accredited",
              "CDI Licensed Since 1999",
            ].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] font-medium text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400/80" />
                {label}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-amber-400/80">
              <span>★</span>
              {site.reviews.rating} · {site.reviews.count} Google reviews
            </span>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-4">
          <span className="text-[11px] text-white/60 uppercase tracking-widest font-semibold">Service languages: </span>
          <span className="text-[11px] text-white/60 font-medium">English · Español · العربية</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-slate-300">
          <p>&copy; {year} Original Group Inc. All rights reserved. CA DOI Licensed.</p>
          <div className="flex items-center gap-5">
            <a href={site.socials.find(s => s.label === "Facebook")?.href ?? "#"} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <a href={site.socials.find(s => s.label === "LinkedIn")?.href ?? "#"} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors"
            >
              Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
