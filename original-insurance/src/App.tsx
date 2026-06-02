import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import SectionNavigator from "./components/SectionNavigator";

// Eagerly load primary prerendered pages. Keeping these eager prevents direct
// route loads from replacing prerendered content with a Suspense fallback.
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import CityLanding from "./pages/CityLanding";
import AutoInsuranceDowneyCA from "./pages/AutoInsuranceDowneyCA";
import SR22InsuranceDowney from "./pages/SR22InsuranceDowney";
import NoLicenseInsuranceDowney from "./pages/NoLicenseInsuranceDowney";
import CommercialAutoInsuranceDowney from "./pages/CommercialAutoInsuranceDowney";

import BellflowerPage from "./pages/insurance/Bellflower";
import NorwalkPage from "./pages/insurance/Norwalk";
import CerritosPage from "./pages/insurance/Cerritos";
import LakewoodPage from "./pages/insurance/Lakewood";
import LynwoodPage from "./pages/insurance/Lynwood";
import ParamountPage from "./pages/insurance/Paramount";
import SouthGatePage from "./pages/insurance/SouthGate";
import WhittierPage from "./pages/insurance/Whittier";
import PicoRiveraPage from "./pages/insurance/PicoRivera";
import MontebelloPage from "./pages/insurance/Montebello";
import CommercePage from "./pages/insurance/Commerce";

const NotFound = lazy(() => import("./pages/NotFound"));
const QuoteWidget = lazy(() => import("./components/QuoteWidget"));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-brand-50 ring-1 ring-brand-100 grid place-items-center">
          <svg className="animate-spin w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
          </svg>
        </div>
        <p className="text-slate-400 text-[13px] font-medium tracking-wide">Loading</p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [quoteWidgetReady, setQuoteWidgetReady] = useState(false);
  const [quoteOpenSignal, setQuoteOpenSignal] = useState(0);

  useEffect(() => {
    if (navigator.userAgent === "prerender-bot") return;

    const loadQuoteWidget = () => setQuoteWidgetReady(true);
    const openQuoteWidget = () => {
      setQuoteWidgetReady(true);
      setQuoteOpenSignal((value) => value + 1);
    };

    window.addEventListener("openQuoteModal", openQuoteWidget);
    window.addEventListener("load", loadQuoteWidget, { once: true });

    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadQuoteWidget, { timeout: 5000 })
        : globalThis.setTimeout(loadQuoteWidget, 5000);

    return () => {
      window.removeEventListener("openQuoteModal", openQuoteWidget);
      window.removeEventListener("load", loadQuoteWidget);
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else if (typeof idleId === "number") {
        globalThis.clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <>
      <ScrollToTop />

      <div className="min-h-dvh flex flex-col bg-slate-50">
        <ScrollProgress />
        <Navbar />
        <div className="flex-1">
          <SectionNavigator />
          <div key={location.pathname}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
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
                <Route path="/insurance/:citySlug" element={<CityLanding />} />
                <Route path="/auto-insurance-downey-ca" element={<AutoInsuranceDowneyCA />} />
                <Route path="/sr22-insurance-downey" element={<SR22InsuranceDowney />} />
                <Route path="/no-license-auto-insurance-downey" element={<NoLicenseInsuranceDowney />} />
                <Route path="/commercial-auto-insurance-downey" element={<CommercialAutoInsuranceDowney />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>

      {quoteWidgetReady && (
        <Suspense fallback={null}>
          <QuoteWidget openSignal={quoteOpenSignal} />
        </Suspense>
      )}
    </>
  );
}
