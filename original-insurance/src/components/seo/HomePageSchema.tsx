import { useEffect } from "react";

const HOME_URL = "https://originalinsurance.net/";
const IMAGE_URL = "https://originalinsurance.net/images/ois-insurance-consultation-thumbnail-2026.jpg";

/** Homepage WebPage identity and preferred representative image. */
export default function HomePageSchema() {
  useEffect(() => {
    document.querySelectorAll('script[data-schema="HomePageSchema"]').forEach((script) => script.remove());

    const element = document.createElement("script");
    element.type = "application/ld+json";
    element.setAttribute("data-schema", "HomePageSchema");
    element.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${HOME_URL}#webpage`,
      url: HOME_URL,
      name: "Independent Insurance Broker in Downey, CA | Original",
      description: "Compare auto, home, commercial, life and specialty insurance with an independent Downey broker serving southeast Los Angeles County since 1999.",
      inLanguage: "en-US",
      isPartOf: { "@id": `${HOME_URL}#website` },
      about: { "@id": `${HOME_URL}#agency` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${HOME_URL}#primaryimage`,
        url: IMAGE_URL,
        contentUrl: IMAGE_URL,
        width: 1448,
        height: 1086,
        caption: "Insurance advisor reviewing auto and home coverage options with a client",
      },
      thumbnailUrl: IMAGE_URL,
    });
    document.head.appendChild(element);

    return () => element.remove();
  }, []);

  return null;
}
