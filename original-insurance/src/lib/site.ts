export const site = {
  name: "Original Insurance",
  tagline: "Trusted coverage with personal service.",
  description:
    "Original Insurance Services is an independent insurance brokerage based in Downey, California, helping individuals, families, and businesses find reliable and affordable insurance coverage. Since 1999, we have specialized in Auto Insurance, Home Insurance, Business and Commercial Insurance, Life Insurance, Motorcycle Insurance, and Boat Insurance. As independent insurance brokers, we work with multiple top rated insurance carriers to compare policies and secure the best rates and coverage options for our clients.",
  contact: {
    phone: "(310) 538-8666",
    phoneHref: "tel:+13105388666",
    text: "(310) 429-6777",
    textHref: "sms:+13104296777",
    email: "originalinsurance@gmail.com",
    emailHref: "mailto:originalinsurance@gmail.com",
    address: "9907-B Paramount Blvd, Downey, CA 90240",
    mapsHref:
      "https://maps.google.com/maps?q=9907B+PARAMOUNT+BLVD,+DOWNEY,+CA+90240",
  },
  reviews: {
    rating: 4.9,
    count: 100,
    googleUrl: "https://g.page/original-insurance",
  },
  identity: {
    blackOwned: true,
    latinoOwned: true,
    lgbtqFriendly: true,
    transgenderSafespace: true,
    wheelchairAccessible: true,
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/157258154314691/", icon: "Facebook" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/original-insurance-services/", icon: "LinkedIn" },
  ],
  services: [
    { key: "auto", title: "Auto Insurance", blurb: "Liability, comp & collision, SR-22 support, and multi-car discounts." },
    { key: "home", title: "Home & Renters", blurb: "Protect dwelling, belongings, and liability with right-sized coverage." },
    { key: "life", title: "Life Insurance", blurb: "Term & whole life options that protect your family’s future." },
    { key: "commercial", title: "Commercial", blurb: "General liability, BOP, commercial auto, and workers’ comp." },
    { key: "moto", title: "Motorcycle", blurb: "Coverage for riders with gear and accessory protection." },
    { key: "rec", title: "Recreational", blurb: "RV, boat, and specialty toys — enjoy the weekend safely." },
    { key: "notary", title: "Notary Public", blurb: "Fast, reliable notarization for personal and business documents." },
    { key: "reg", title: "Registration Services", blurb: "Skip the DMV lines. Title transfers, renewals, and plates." },
    { key: "sr22", title: "SR-22 Filing", blurb: "Fast processing, no hassle. We handle everything with the DMV." },
    { key: "translate", title: "Document Translation", blurb: "Accurate translation in Arabic, Spanish, and English." },
  ],
  faqs: [
    {
      q: "What is an insurance broker?",
      a: "A licensed professional who shops multiple carriers on your behalf to match coverage, price, and service to your needs.",
    },
    {
      q: "Which lines do you offer?",
      a: "Auto, home/renters, commercial, life, motorcycle, recreational, notary public, registration services, and document translation.",
    },
    {
      q: "How do I get a quote?",
      a: "Call, email, or use the contact form. We collect a few details and present options from multiple carriers.",
    },
    {
      q: "How do I file a claim?",
      a: "Call your carrier’s claims line listed on your policy, then notify us. We’ll help you navigate documentation and next steps.",
    },
  ],
  testimonials: [
    {
      name: "RiRi Martinez",
      source: "Google Reviews",
      quote:
        "I’ve trusted Aiman as my insurance broker for over 23 years for my auto, home, and fire insurance. He consistently finds the best rates and provides outstanding service.",
    },
    {
      name: "Sheila Redmond",
      source: "Google Reviews",
      quote:
        "The best ever. They’re very helpful and I just love them. I’ve been with them for about 20 years. You won’t find a more friendly company.",
    },
    {
      name: "Sameh Ezzat",
      source: "Google Reviews",
      quote:
        "I’ve been a loyal customer with Original Insurance for over ten years. Their customer service is consistently amazing.",
    },
    {
      name: "Bishoy Metry",
      source: "Google Reviews",
      quote:
        "I got my auto & renters insurance here and couldn’t be more satisfied. They found me an excellent rate, easily the best I’ve come across.",
    },
  ],
  carriersLogos: Array.from({ length: 8 }).map((_, i) =>
    new URL(`../assets/clients/client-${i + 1}.png`, import.meta.url).href
  ),
};
