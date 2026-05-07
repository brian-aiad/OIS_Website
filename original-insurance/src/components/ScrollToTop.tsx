import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../lib/lenisContext";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenisRef = useLenis();

  useLayoutEffect(() => {
    if (hash) return;

    // Reset Lenis smooth-scroll position (must come first)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Fallback: also force native scroll reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash, lenisRef]);

  return null;
}
