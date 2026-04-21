import { useEffect } from "react";

interface LocalBusinessSchemaProps {
  /** Override the page URL (defaults to homepage) */
  url?: string;
  /** Override or extend areaServed list (first entry should be the current city) */
  areaServed?: string[];
}

const DEFAULT_AREA_SERVED = [
  "Downey, CA",
  "Norwalk, CA",
  "Bellflower, CA",
  "Lynwood, CA",
  "Paramount, CA",
  "Lakewood, CA",
  "Whittier, CA",
];

export default function LocalBusinessSchema({
  url = "https://originalinsurance.net/",
  areaServed = DEFAULT_AREA_SERVED,
}: LocalBusinessSchemaProps) {
  useEffect(() => {
    // Remove any pre-existing InsuranceAgency blocks (static template block + prior mounts)
    // so every page ends up with exactly 1.
    document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
      try {
        if (JSON.parse(s.textContent || "{}")["@type"] === "InsuranceAgency") s.remove();
      } catch {}
    });

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-schema", "LocalBusinessSchema");
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "@id": "https://originalinsurance.net/#agency",
      name: "Original Insurance Services",
      url,
      telephone: "+1-310-538-8666",
      priceRange: "$$",
      image: "https://originalinsurance.net/og-image.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "9907-B Paramount Blvd",
        addressLocality: "Downey",
        addressRegion: "CA",
        postalCode: "90240",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 33.9403,
        longitude: -118.1331,
      },
      areaServed,
      availableLanguage: ["English", "Spanish", "Arabic"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "17:30",
        },
      ],
      sameAs: [
        "https://www.facebook.com/157258154314691/",
        "https://www.linkedin.com/company/original-insurance-services/",
      ],
      serviceType: [
        "Auto Insurance",
        "SR-22 Filing",
        "No-License Auto Insurance",
        "Commercial Auto Insurance",
        "Home Insurance",
        "Renters Insurance",
      ],
    });
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [url, areaServed]);

  return null;
}
