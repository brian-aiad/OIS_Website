import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import QuoteWidget from "./components/QuoteWidget";

// Eagerly load Home (above the fold)
import Home from "./pages/Home";

// Lazy load secondary routes
const Services = lazy(() => import("./pages/Services"));
const Locations = lazy(() => import("./pages/Locations"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 relative">
          <svg className="animate-spin w-12 h-12 text-brand-600" viewBox="0 0 50 50" fill="none">
            <circle className="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" />
            <circle className="opacity-75" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeDasharray="80" strokeDashoffset="60" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-slate-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  useSmoothScroll();
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <div className="min-h-dvh flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
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
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <QuoteWidget />
    </>
  );
}
