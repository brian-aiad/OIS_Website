import { useEffect } from "react";

interface FAQSchemaProps {
  questions: Array<{ q: string; a: string }>;
}

/** FAQPage JSON-LD — mount ONLY on /faq. Answers must be short, factual, no CTAs or phone numbers. */
export default function FAQSchema({ questions }: FAQSchemaProps) {
  useEffect(() => {
    // Remove any pre-existing FAQSchema tags (e.g. baked in by a prior prerender
    // run) before injecting, so we never end up with duplicate FAQPage blocks.
    document.querySelectorAll('script[data-schema="FAQSchema"]').forEach((s) => s.remove());

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-schema", "FAQSchema");
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [questions]);

  return null;
}
