import { Counter } from "./AnimatedCounter";
import { Stagger, StaggerChild } from "./AnimatedSection";

const STATS = [
  {
    value: 25,
    suffix: "+",
    label: "Years Serving CA",
    note: "Est. 1999 · Downey",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    value: 30,
    suffix: "+",
    label: "Insurance Carriers",
    note: "Best fit, best price",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    value: 4,
    suffix: ".9★",
    label: "Google Rating",
    note: "Verified reviews",
    raw: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" />
      </svg>
    ),
  },
  {
    value: 3,
    suffix: "",
    label: "Languages",
    note: "Arabic · Spanish · English",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
];

export default function StatsBar() {
  return (
    <div className="bg-brand-950 border-t border-brand-900">
      <div className="container py-6">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-800/40 rounded-2xl overflow-hidden">
          {STATS.map((s) => (
            <StaggerChild key={s.label}>
              <div className="bg-brand-950 px-6 py-5 flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-800/60 ring-1 ring-brand-700/60 grid place-items-center text-gold-400">
                  {s.icon}
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {s.raw ? (
                      <>{s.value}{s.suffix}</>
                    ) : (
                      <Counter to={s.value} suffix={s.suffix} />
                    )}
                  </div>
                  <div className="text-[12px] font-semibold text-white/70">{s.label}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">{s.note}</div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
