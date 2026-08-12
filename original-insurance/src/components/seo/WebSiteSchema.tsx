import { useEffect } from "react";

/** Homepage site-identity schema. Intentionally omits SearchAction/query URLs. */
export default function WebSiteSchema() {
  useEffect(() => {
    document.querySelectorAll('script[data-schema="WebSiteSchema"]').forEach((script) => script.remove());

    const element = document.createElement("script");
    element.type = "application/ld+json";
    element.setAttribute("data-schema", "WebSiteSchema");
    element.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://originalinsurance.net/#website",
      url: "https://originalinsurance.net/",
      name: "Original Insurance",
      alternateName: "Original Insurance Services",
      inLanguage: "en-US",
      publisher: { "@id": "https://originalinsurance.net/#agency" },
    });
    document.head.appendChild(element);

    return () => element.remove();
  }, []);

  return null;
}
