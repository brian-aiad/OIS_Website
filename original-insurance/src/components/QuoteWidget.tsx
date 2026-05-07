import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, FileText, Phone, ShieldCheck, X } from "lucide-react";
import { site } from "../lib/site";

const QUOTZAL_URL = "https://quotzal.com/f/original-insurance";
const CHECKLIST = ["Driver or owner details", "VIN or property address", "Current policy if you have one", "SR-22 or business-use notes"];

/** Open from anywhere: window.dispatchEvent(new Event('openQuoteModal')) */
export default function QuoteWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("openQuoteModal", handleOpen);
    return () => window.removeEventListener("openQuoteModal", handleOpen);
  }, []);

  /* Lock body scroll when modal open */
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-[5.5rem] right-4 sm:bottom-20 sm:right-6 z-50 flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-semibold pl-3.5 pr-4 py-2.5 sm:pl-4 sm:pr-5 sm:py-3 text-[13px] sm:text-sm rounded-full shadow-heavy ring-1 ring-brand-700 transition-colors"
        aria-label="Get a Quote"
      >
        <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5 text-gold-300" />
        <span className="hidden sm:inline">Get a Quote</span>
        <span className="sm:hidden">Quote</span>
      </motion.button>

      {/* Modal overlay — centered popup on ALL devices */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal — centered card on all screens */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl bg-white rounded-2xl shadow-heavy ring-1 ring-slate-200 overflow-hidden"
              style={{ maxHeight: "90dvh" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-5 border-b border-slate-100 bg-white">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Request an insurance quote</h2>
                  <p className="hidden sm:block text-[12px] text-slate-500">Compare coverage with a licensed Downey broker.</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 -mr-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid lg:grid-cols-[320px,1fr]">
                <aside className="hidden lg:flex flex-col bg-brand-950 text-white p-6">
                  <span className="eyebrow-light">What Happens Next</span>
                  <h3 className="mt-3 text-2xl font-bold leading-tight">We compare carrier fit, not just price.</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    Your quote request goes to Original Insurance. A real broker reviews the details, checks available programs, and follows up during business hours.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      { icon: ShieldCheck, label: "30+ carrier comparison" },
                      { icon: FileText, label: "SR-22 and no-license options" },
                      { icon: Phone, label: "Call or text follow-up" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                        <Icon className="h-4 w-4 text-gold-300" />
                        <span className="text-sm font-medium text-white/85">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">Helpful to have</div>
                    <ul className="mt-3 space-y-2">
                      {CHECKLIST.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13px] text-white/75">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6 text-sm">
                    <a href={site.contact.phoneHref} className="btn btn-ghost-light w-full justify-center">
                      Call {site.contact.phone}
                    </a>
                    <a href={QUOTZAL_URL} target="_blank" rel="noreferrer" className="mt-3 block text-center text-[12px] font-medium text-white/60 hover:text-white">
                      Open quote form in a new tab
                    </a>
                  </div>
                </aside>

                <div className="relative bg-slate-50">
                  {!loaded && (
                    <div className="absolute inset-0 z-10 grid place-items-center bg-slate-50">
                      <div className="text-center">
                        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-brand-700" />
                        <p className="text-sm font-medium text-slate-600">Loading secure quote form</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={QUOTZAL_URL}
                    width="100%"
                    frameBorder="0"
                    allow="clipboard-write"
                    loading="lazy"
                    title="Insurance Quote Request"
                    className="block w-full bg-white"
                    style={{ height: "calc(90dvh - 65px)", minHeight: "620px" }}
                    onLoad={() => setLoaded(true)}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
