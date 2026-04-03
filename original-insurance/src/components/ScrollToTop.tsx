import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // useLayoutEffect fires before paint — resets scroll before the new page renders
  useLayoutEffect(() => {
    if (hash) return;

    // Force-reset scroll position (works even with Lenis smooth-scroll)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
