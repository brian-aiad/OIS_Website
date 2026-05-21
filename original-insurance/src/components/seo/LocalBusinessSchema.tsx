import { useEffect } from "react";
import { site } from "../../lib/site";

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
  "Cerritos, CA",
  "Commerce, CA",
  "Montebello, CA",
  "Pico Rivera, CA",
  "South Gate, CA",
  // Additional GBP-listed service areas
  "Bell, CA",
  "Bell Gardens, CA",
  "Cudahy, CA",
  "Huntington Park, CA",
  "La Habra, CA",
  "La Mirada, CA",
  "Maywood, CA",
  "Santa Fe Springs, CA",
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
      } catch {
        return;
      }
    });

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-schema", "LocalBusinessSchema");
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "@id": "https://originalinsurance.net/#agency",
      name: "Original Insurance Services",
      description: "Independent insurance broker in Downey, CA serving Southeast Los Angeles County since 1999. We compare 30+ carriers for auto, home, SR-22, commercial, and specialty insurance. Bilingual service in English, Spanish, and Arabic.",
      foundingDate: "1999",
      url,
      telephone: "+1-310-538-8666",
      priceRange: "$$",
      image: [
        "https://originalinsurance.net/og-image.png",
        "https://originalinsurance.net/images/office-client-consultation.webp",
        "https://originalinsurance.net/images/broker-client-consultation.webp",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: site.reviews.rating,
        reviewCount: site.reviews.count,
        bestRating: 5,
        worstRating: 1,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+1-310-538-8666",
          contactType: "customer service",
          availableLanguage: ["English", "Spanish", "Arabic"],
          areaServed: "US-CA",
        },
        {
          "@type": "ContactPoint",
          telephone: "+1-310-429-6777",
          contactType: "sales",
          availableLanguage: ["English", "Spanish", "Arabic"],
          areaServed: "US-CA",
        },
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible parking lot", value: true },
        { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible entrance", value: true },
        { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible seating", value: true },
      ],
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
        "https://g.page/original-insurance",
      ],
      serviceType: [
        "Auto Insurance",
        "SR-22 Filing",
        "No-License Auto Insurance",
        "Commercial Auto Insurance",
        "Home Insurance",
        "Renters Insurance",
        "Motorcycle Insurance",
        "Life Insurance",
        "Commercial Property Insurance",
        "Condo Insurance",
      ],
    });
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [url, areaServed]);

  return null;
}
