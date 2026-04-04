import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTZAL_URL = "https://quotzal.com/f/original-insurance";

/** Open from anywhere: window.dispatchEvent(new Event('openQuoteModal')) */
export default function QuoteWidget() {
  const [open, setOpen] = useState(false);

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
        className="fixed bottom-[5.5rem] right-4 sm:bottom-20 sm:right-6 z-50 flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold pl-3.5 pr-4 py-2.5 sm:pl-4 sm:pr-5 sm:py-3 text-[13px] sm:text-sm rounded-full shadow-heavy ring-1 ring-brand-600 transition-colors"
        aria-label="Get a free quote"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
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
              className="relative w-full max-w-md sm:max-w-lg lg:max-w-3xl bg-white rounded-2xl shadow-heavy ring-1 ring-slate-200 overflow-hidden"
              style={{ maxHeight: "85dvh" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-5 border-b border-slate-100 bg-white">
                <h2 className="text-sm font-semibold text-slate-700">Request a Quote</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 -mr-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Iframe */}
              <iframe
                src={QUOTZAL_URL}
                width="100%"
                frameBorder="0"
                allow="clipboard-write"
                loading="lazy"
                title="Insurance Quote Request"
                className="block w-full"
                style={{ height: "calc(85dvh - 49px)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
