import { lazy, Suspense, useEffect, useRef, createContext, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import QuoteWidget from "./components/QuoteWidget";

// Eagerly load primary prerendered pages — lazy-loading causes Suspense-induced CLS:
// the fallback briefly replaces prerendered DOM before the chunk arrives.
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import CityLanding from "./pages/CityLanding";

// Lazy load low-traffic / utility pages (acceptable CLS tradeoff, not prerendered entry points)
const Locations = lazy(() => import("./pages/Locations"));
const AutoInsuranceDowneyCA = lazy(() => import("./pages/AutoInsuranceDowneyCA"));
const SR22InsuranceDowney = lazy(() => import("./pages/SR22InsuranceDowney"));
const NoLicenseInsuranceDowney = lazy(() => import("./pages/NoLicenseInsuranceDowney"));
const CommercialAutoInsuranceDowney = lazy(() => import("./pages/CommercialAutoInsuranceDowney"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Individual localized city pages
const BellflowerPage = lazy(() => import("./pages/insurance/Bellflower"));
const NorwalkPage = lazy(() => import("./pages/insurance/Norwalk"));
const CerritosPage = lazy(() => import("./pages/insurance/Cerritos"));
const LakewoodPage = lazy(() => import("./pages/insurance/Lakewood"));
const LynwoodPage = lazy(() => import("./pages/insurance/Lynwood"));
const ParamountPage = lazy(() => import("./pages/insurance/Paramount"));
const SouthGatePage = lazy(() => import("./pages/insurance/SouthGate"));
const WhittierPage = lazy(() => import("./pages/insurance/Whittier"));
const PicoRiveraPage = lazy(() => import("./pages/insurance/PicoRivera"));
const MontebelloPage = lazy(() => import("./pages/insurance/Montebello"));
const CommercePage = lazy(() => import("./pages/insurance/Commerce"));

// Lenis context so ScrollToTop and other components can reset scroll
export const LenisContext = createContext<React.RefObject<Lenis | null>>({ current: null });
export const useLenis = () => useContext(LenisContext);

function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-center"
      >
        <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-brand-50 ring-1 ring-brand-100 grid place-items-center">
          <svg className="animate-spin w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
          </svg>
        </div>
        <p className="text-slate-400 text-[13px] font-medium tracking-wide">Loading</p>
      </motion.div>
    </div>
  );
}

export default function App() {
  const lenisRef = useSmoothScroll();
  const location = useLocation();

  return (
    <LenisContext.Provider value={lenisRef}>
      <ScrollToTop />

      <div className="min-h-dvh flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">
          {/* initial={false} skips the entrance animation on first page load so the
              prerendered content is never hidden by opacity:0 during hydration.
              SPA navigations (key changes) still animate normally. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<LoadingFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<Faq />} />
                  {/* Individual localized city pages (take priority over generic slug route) */}
                  <Route path="/insurance/bellflower" element={<BellflowerPage />} />
                  <Route path="/insurance/norwalk" element={<NorwalkPage />} />
                  <Route path="/insurance/cerritos" element={<CerritosPage />} />
                  <Route path="/insurance/lakewood" element={<LakewoodPage />} />
                  <Route path="/insurance/lynwood" element={<LynwoodPage />} />
                  <Route path="/insurance/paramount" element={<ParamountPage />} />
                  <Route path="/insurance/south-gate" element={<SouthGatePage />} />
                  <Route path="/insurance/whittier" element={<WhittierPage />} />
                  <Route path="/insurance/pico-rivera" element={<PicoRiveraPage />} />
                  <Route path="/insurance/montebello" element={<MontebelloPage />} />
                  <Route path="/insurance/commerce" element={<CommercePage />} />
                  {/* Downey hub + fallback for any unlisted city slug */}
                  <Route path="/insurance/:citySlug" element={<CityLanding />} />
                  <Route path="/auto-insurance-downey-ca" element={<AutoInsuranceDowneyCA />} />
                  <Route path="/sr22-insurance-downey" element={<SR22InsuranceDowney />} />
                  <Route path="/no-license-auto-insurance-downey" element={<NoLicenseInsuranceDowney />} />
                  <Route path="/commercial-auto-insurance-downey" element={<CommercialAutoInsuranceDowney />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>

      {/* Global quote modal — listens for openQuoteModal events */}
      <QuoteWidget />
    </LenisContext.Provider>
  );
}
