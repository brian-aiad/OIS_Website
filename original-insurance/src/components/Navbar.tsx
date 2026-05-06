import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../lib/site";
import logoBadge from "../assets/logo-badge.png";

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

const LINKS = [
  { to: "/",          label: "Home" },
  { to: "/services",  label: "Services" },
  { to: "/about",     label: "About" },
  { to: "/faq",       label: "FAQ" },
  { to: "/locations", label: "Location" },
  { to: "/contact",   label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  /* close on route change */
  useEffect(() => setOpen(false), [pathname]);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* lock body */
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  /* esc */
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  /* outside click */
  useEffect(() => {
    if (!open) return;
    const fn = (e: Event) => {
      const t = e.target as Node;
      if (sheetRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* ── Top utility strip (desktop) ── */}
      <div className="hidden lg:block bg-brand-950 text-[12px] text-white/60">
        <div className="container flex items-center justify-between py-1.5">
          <div className="flex items-center divide-x divide-white/10">
            <span className="pr-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Mon - Fri 10am-5:30pm
            </span>
            <span className="px-4">{site.contact.address}</span>
            <span className="pl-4">Arabic &middot; Spanish &middot; English</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={site.contact.phoneHref} className="hover:text-white transition-colors">{site.contact.phone}</a>
            <a href={site.contact.emailHref} className="hover:text-white transition-colors">{site.contact.email}</a>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div
        className={cx(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-soft border-slate-200/80"
            : "bg-white border-transparent"
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-[68px]">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={logoBadge}
              alt="Original Insurance Services"
              className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-[15px] font-bold text-brand-900 tracking-tight">Original Insurance</div>
              <div className="text-[11px] text-slate-400 font-medium">Est. 1999 &middot; Downey, CA</div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cx(
                    "relative px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors",
                    isActive
                      ? "text-brand-800"
                      : "text-slate-500 hover:text-slate-800"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-lg bg-brand-50 -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.contact.phoneHref}
              className="text-[13px] font-medium text-slate-500 hover:text-brand-700 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.2-.2.6-.3.9-.2 1 .3 2 .5 3.1.5.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9C9.6 20.9 3.1 14.4 3.1 6.9c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9 0 1.1.2 2.1.5 3.1.1.3 0 .6-.2.9l-1.8 1.8z" /></svg>
              {site.contact.phone}
            </a>
            <button onClick={openQuoteModal} className="btn btn-primary btn-sm">
              Free Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile sheet ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={sheetRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-slate-100"
            >
              <div className="container py-5 space-y-2">
                {LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cx(
                          "block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors",
                          isActive
                            ? "bg-brand-50 text-brand-800"
                            : "text-slate-600 hover:bg-slate-50"
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}

                <div className="pt-3 grid grid-cols-2 gap-2">
                  <a href={site.contact.phoneHref} className="btn btn-outline btn-sm justify-center">
                    Call Us
                  </a>
                  <button onClick={() => { setOpen(false); openQuoteModal(); }} className="btn btn-primary btn-sm justify-center">
                    Free Quote
                  </button>
                </div>

                <div className="pt-2 text-[12px] text-slate-400 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Mon-Fri 10-5:30 &middot; {site.contact.phone}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
