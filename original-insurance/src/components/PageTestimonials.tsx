import { RevealOnScroll } from "../design-system";
import { images, srcset } from "../lib/images";
import { Stagger, StaggerChild } from "./AnimatedSection";

const REVIEWS = [
  {
    quote: "I've trusted Aiman for over 23 years — auto, home, fire. He always finds the best rates.",
    name: "RiRi M.",
    tenure: "23+ years",
    image: images.testimonials.auto,
    alt: "Insurance broker consultation with local Downey clients",
  },
  {
    quote: "The best ever. Very helpful, I've been with them for about 20 years. You won't find a more friendly company.",
    name: "Sheila R.",
    tenure: "20+ years",
    image: images.testimonials.family,
    alt: "Original Insurance broker reviewing coverage with a client",
  },
  {
    quote: "I've been a loyal customer for over ten years. Their customer service is consistently amazing.",
    name: "Sameh E.",
    tenure: "10+ years",
    image: images.testimonials.business,
    alt: "Commercial auto insurance review with an Original Insurance broker",
  },
];

const GRADIENTS = [
  "from-brand-500 to-brand-700",
  "from-gold-400 to-gold-600",
  "from-brand-700 to-brand-950",
];

interface PageTestimonialsProps {
  tone?: "white" | "offwhite";
}

export default function PageTestimonials({ tone = "offwhite" }: PageTestimonialsProps) {
  return (
    <section className={`sp ${tone === "offwhite" ? "bg-slate-50" : "bg-white"}`}>
      <div className="container">
        <RevealOnScroll className="text-center mb-10">
          <span className="eyebrow">Client Stories</span>
          <h2 className="mt-3 display-2 text-slate-900">
            Downey families trust us for decades
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            We don't just sell policies — we build relationships. These are real words from long-term clients.
          </p>
        </RevealOnScroll>

        <Stagger className="grid sm:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <StaggerChild key={r.name}>
              <div className="relative bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft h-full flex flex-col hover:shadow-lifted hover:ring-brand-200 transition-all overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-700 via-gold-400 to-brand-700" aria-hidden="true" />
                <div className="-mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={r.image}
                    srcSet={srcset(r.image)}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    alt={r.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={400}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" />
                    </svg>
                  ))}
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-lg font-serif text-brand-700 ring-1 ring-brand-100">
                    &ldquo;
                  </span>
                </div>
                <blockquote className="text-[14px] text-slate-600 leading-relaxed flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${GRADIENTS[i]} grid place-items-center text-[11px] font-bold text-white shadow-sm ring-1 ring-white`}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-800">{r.name}</div>
                    <div className="text-[11px] text-slate-400">{r.tenure} · Google Review</div>
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </Stagger>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Original+Insurance+Services+Downey"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 hover:text-gold-600 transition-colors"
          >
            See all reviews on Google
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
