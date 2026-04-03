import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
}

/**
 * Sets document title, meta description, and canonical URL per page.
 * Cleans up on unmount by restoring defaults.
 */
export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    // Meta description
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.content ?? "";
    if (meta) {
      meta.content = description;
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Open Graph
    setOgContent("og:title", title);
    setOgContent("og:description", description);
    if (canonical) {
      setOgContent("og:url", canonical);
    }

    // Canonical link
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = link?.href ?? "";
    if (canonical) {
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement("link");
        link.rel = "canonical";
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    return () => {
      document.title = prev;
      const m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (m) m.content = prevDesc;
      const l = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (l && prevCanonical) l.href = prevCanonical;
    };
  }, [title, description, canonical]);
}

function setOgContent(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (el) {
    el.content = content;
  }
}
