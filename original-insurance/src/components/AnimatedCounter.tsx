import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function Counter({
  to,
  suffix = "",
  duration = 2000,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let prev = 0;
    function tick(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(eased * to);
      if (cur !== prev) { setVal(cur); prev = cur; }
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref} className={className}>{val}{suffix}</span>;
}
