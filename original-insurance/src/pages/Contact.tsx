import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Icons } from "../components/Icons";
import { Reveal } from "../components/AnimatedSection";
import PageHero from "../components/PageHero";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import OfficePhotoBlock from "../components/seo/OfficePhotoBlock";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

const SUBJECTS = [
  "Question about my policy",
  "Help with a claim",
  "Coverage question",
  "Billing question",
  "General question",
  "Something else",
] as const;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const [company, setCompany] = useState(""); // honeypot

  usePageMeta({
    title: "Contact Original Insurance in Downey, CA | Phone, Hours, Map & Quote",
    description: "Call, email, or visit Original Insurance in Downey, CA. Office hours, map, parking, multilingual help, and what to bring for a same-day quote.",
    canonical: "https://originalinsurance.net/contact",
  });

  const canSubmit = name.trim() && email.trim() && subject && message.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    if (company.trim()) { setSent("ok"); return; }

    try {
      setSubmitting(true);
      setSent(null);

      if (!WEB3FORMS_KEY) {
        throw new Error("Web3Forms access key is missing");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          phone: phone || "Not provided",
          subject: `New message from ${name} — Original Insurance Website`,
          topic: subject || "General inquiry",
          message,
          from_name: "Original Insurance Website",
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Failed");

      setSent("ok");
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } catch {
      setSent("err");
    } finally {
      setSubmitting(false);
    }
  }

  /* JSON-LD: ContactPage + Breadcrumbs + FAQ */
  useEffect(() => {
    const contactEl = document.createElement("script");
    contactEl.type = "application/ld+json";
    contactEl.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Original Insurance Services",
      url: "https://originalinsurance.net/contact",
      description: "Contact Original Insurance Services for a free insurance quote in Downey, CA. Bilingual service in English, Spanish and Arabic.",
      mainEntity: { "@id": "https://originalinsurance.net/#agency" },
    });
    document.head.appendChild(contactEl);
    return () => { contactEl.remove(); };
  }, []);

  /* FAQ */
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const faqs = [
    { q: "How do I file a claim?", a: "Call us immediately at (310) 538-8666 or email us. We'll guide you through the process and help with all paperwork." },
    { q: "Can I make changes to my policy?", a: "Absolutely. Call or email us with the changes you need. We handle all updates with your carrier." },
    { q: "Do you speak Spanish or Arabic?", a: "Yes! We offer fluent service in Arabic, Spanish, and English. Tambi\u00e9n hablamos espa\u00f1ol. \u0646\u062a\u062d\u062f\u062b \u0627\u0644\u0639\u0631\u0628\u064a\u0629." },
    { q: "What if I need help after hours?", a: "For urgent matters, leave a voicemail or send an email. We check messages regularly and will get back to you first thing the next business day." },
    { q: "Is there a fee for your service?", a: "No. We're paid by the carrier, not by you. Our help is completely free." },
  ];

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Contact", url: "https://originalinsurance.net/contact" },
      ]} />
      <PageHero
        title="We're here to help"
        subtitle="Questions about coverage? Need help with a claim? Reach out — we're a real team at 9907-B Paramount Blvd, Downey, just off the 5 freeway. Walk-ins welcome Mon–Fri 10 AM–5:30 PM."
        breadcrumb="Contact"
        backgroundImage="/images/handshake.webp"
      />

      {/* ── 3 Contact method cards ── */}
      <section className="relative -mt-2 z-10 pb-12">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Icons.Phone className="w-5 h-5" />,
                title: "Call Us",
                detail: site.contact.phone,
                sub: "Fastest way to get help",
                extra: "Mon-Fri 10 AM - 5:30 PM",
                href: site.contact.phoneHref,
                accent: true,
              },
              {
                icon: <Icons.Mail className="w-5 h-5" />,
                title: "Email Us",
                detail: site.contact.email,
                sub: "We typically respond within 1-2 hours",
                extra: "",
                href: site.contact.emailHref,
                accent: false,
              },
              {
                icon: <Icons.MapPin className="w-5 h-5" />,
                title: "Visit Us",
                detail: "9907-B Paramount Blvd",
                sub: "Walk-ins welcome during business hours",
                extra: "Downey, CA 90240",
                href: site.contact.mapsHref,
                accent: false,
              },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.title === "Visit Us" ? "_blank" : undefined}
                rel={c.title === "Visit Us" ? "noreferrer" : undefined}
                className={cx(
                  "block rounded-2xl p-6 transition-all duration-200 hover:shadow-lifted hover:-translate-y-1 group",
                  c.accent
                    ? "bg-brand-900 text-white ring-1 ring-brand-800 hover:bg-brand-800"
                    : "bg-white text-slate-900 ring-1 ring-slate-200/80 shadow-soft hover:ring-slate-300"
                )}
              >
                <div className={cx(
                  "w-10 h-10 rounded-xl grid place-items-center mb-4",
                  c.accent ? "bg-brand-800 text-gold-400" : "bg-brand-50 ring-1 ring-brand-100 text-brand-700"
                )}>
                  {c.icon}
                </div>
                <h3 className="font-bold text-lg">{c.title}</h3>
                <p className={cx("mt-1 font-semibold", c.accent ? "text-white/90" : "text-brand-700")}>{c.detail}</p>
                <p className={cx("mt-1 text-[12px]", c.accent ? "text-white/80" : "text-slate-500")}>{c.sub}</p>
                {c.extra && <p className={cx("text-[12px]", c.accent ? "text-white/70" : "text-slate-500")}>{c.extra}</p>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three conversion pathways ── */}
      <section className="sp-sm bg-slate-50 border-b border-slate-100">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-xl font-bold text-slate-900 mb-4">What are you looking for?</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Need a Downey auto quote?", desc: "Compare 30+ carriers for liability, full coverage, and SR-22.", to: "/auto-insurance-downey-ca", cta: "See auto options" },
                { title: "Need same-day SR-22 filing?", desc: "Walk in and leave with the filing submitted to the DMV.", to: "/sr22-insurance-downey", cta: "SR-22 guide" },
                { title: "No-license or international-license?", desc: "Coverage options for foreign-license holders and vehicle owners.", to: "/no-license-auto-insurance-downey", cta: "Learn more" },
              ].map((card, i) => (
                <NavLink
                  key={i}
                  to={card.to}
                  className="block bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft hover:shadow-lifted hover:ring-brand-300 transition-all"
                >
                  <h3 className="font-bold text-slate-900 mb-1 text-[15px]">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{card.desc}</p>
                  <span className="text-[12px] font-semibold text-brand-700 flex items-center gap-1">
                    {card.cta}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
                  </span>
                </NavLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What to bring ── */}
      <section className="sp-sm bg-white border-b border-slate-100">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-xl font-bold text-slate-900 mb-3">What to bring for a quote</h2>
            <p className="text-sm text-slate-500 mb-4">You don't need everything — bring what you have and we'll work with it.</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {[
                "Driver's license (if available) or government-issued ID",
                "Vehicle VIN or registration",
                "Current declarations page if you have existing coverage",
                { text: "SR-22 reinstatement paperwork from the DMV", link: "/sr22-insurance-downey" },
                "Preferred contact details for policy delivery",
                { text: "Foreign or international license documents (for no-license scenarios)", link: "/no-license-auto-insurance-downey" },
              ].map((item, i) => {
                const text = typeof item === "string" ? item : item.text;
                const link = typeof item === "string" ? null : item.link;
                return (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-gold-50 ring-1 ring-gold-200 grid place-items-center">
                      <svg className="w-2.5 h-2.5 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span>
                      {text}
                      {link && (
                        <NavLink to={link} className="ml-1 text-brand-600 hover:underline text-[11px]">
                          (learn more)
                        </NavLink>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Office Photo Block ── */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container max-w-4xl">
          <OfficePhotoBlock />
        </div>
      </section>

      {/* ── Contact Form (support/questions) + sidebar ── */}
      <section className="sp bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-14 items-start">
            {/* Form */}
            <Reveal direction="left">
              {sent === "ok" ? (
                <div
                  className="rounded-2xl p-8 md:p-14 text-center page-fade-in relative overflow-hidden noise-overlay"
                  style={{
                    background: "linear-gradient(135deg, var(--navy-800), var(--navy-900))",
                    border: "1px solid var(--navy-700)",
                    borderTop: "2px solid var(--gold-500)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                  aria-live="polite"
                >
                  <div className="relative z-[2]">
                  <div
                    className="w-16 h-16 mx-auto rounded-full grid place-items-center"
                    style={{ background: "var(--gold-500)", boxShadow: "var(--shadow-gold)" }}
                  >
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#0B1E3D" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-5 display-3 text-white">Thanks — message received!</h2>
                  <p className="mt-3 text-white/75 leading-relaxed max-w-md mx-auto">
                    We'll be in touch within 1–2 hours during business hours
                    (Mon–Fri, 10:00 AM – 5:30 PM PT). For anything urgent, please call us directly.
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a href={site.contact.phoneHref} className="btn btn-accent">
                      Call {site.contact.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => setSent(null)}
                      className="btn btn-ghost-light"
                    >
                      Send another message
                    </button>
                  </div>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-slate-200/80 shadow-lifted" noValidate>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl grid place-items-center ring-1 ring-brand-100">
                    <svg className="w-5 h-5 text-brand-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-6">Have a question? Need help with your policy? We'll get back to you within business hours.</p>

                {/* Error banner */}
                <span aria-live="polite">
                  {sent === "err" && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 page-fade-in">
                      <div className="w-9 h-9 bg-red-100 rounded-full grid place-items-center shrink-0">
                        <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      </div>
                      <div>
                        <div className="font-bold text-red-900 text-sm">Something went wrong</div>
                        <div className="text-[12px] text-red-700">
                          Please call us at <a href="tel:+13105388666" className="underline">(310) 538-8666</a> or try again.
                        </div>
                      </div>
                    </div>
                  )}
                </span>

                {/* Honeypot */}
                <label className="sr-only">Company<input autoComplete="organization" tabIndex={-1} value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" /></label>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                    <input
                      value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                      placeholder="John Smith" required
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                      <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                        placeholder="you@email.com" required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone <span className="text-slate-400 font-normal">(optional)</span></label>
                      <input
                        type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                        placeholder="(310) 538-8666"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">What's this about? *</label>
                    <select
                      value={subject} onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                      required
                    >
                      <option value="">Select a topic...</option>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message *</label>
                    <textarea
                      rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none"
                      placeholder="How can we help you today?" required
                    />
                  </div>
                </div>

                <button type="submit" disabled={!canSubmit || submitting}
                  className={cx("btn btn-accent w-full mt-6 !py-3.5 text-base", (!canSubmit || submitting) && "opacity-70 cursor-not-allowed")}>
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Send Message
                    </span>
                  )}
                </button>

                <p className="text-[12px] text-slate-400 mt-3 text-center">
                  We typically respond within <strong className="text-slate-500">1-2 hours</strong> during business hours
                </p>
              </form>
              )}
            </Reveal>

            {/* Sidebar */}
            <Reveal direction="right" delay={0.1}>
              <div className="space-y-6">
                {/* Looking for a quote? */}
                <div className="bg-brand-50 rounded-2xl p-6 ring-1 ring-brand-100 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl grid place-items-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-brand-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Looking for a quote?</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    If you need pricing or want to compare coverage options, use our quote form instead.
                  </p>
                  <button onClick={openQuoteModal} className="btn btn-accent btn-sm w-full justify-center">
                    Get a Quote &rarr;
                  </button>
                </div>

                {/* Multilingual note */}
                <div className="bg-gradient-to-br from-gold-500 to-gold-400 rounded-2xl p-6 text-white relative overflow-hidden shadow-lifted">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <h3 className="font-bold text-lg text-brand-950 mb-2">We speak your language</h3>
                  <p className="text-brand-900/70 text-sm leading-relaxed">
                    <strong>Tambi&eacute;n hablamos espa&ntilde;ol.</strong>{" "}
                    <strong>نتحدث العربية.</strong>{" "}
                    Fluent service in Arabic, Spanish, and English.
                  </p>
                </div>

                {/* Mini map */}
                <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-soft aspect-[4/3]">
                  <iframe
                    title="Office map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1323.4536432142705!2d-118.2979079!3d33.9010092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bae3e93f75f9%3A0xf8e0a9d1b3d7472d!2s9907B%20PARAMOUNT%20BLVD%2C%20DOWNEY%2C%20CA%2090240-3805!5e0!3m2!1sen!2sus!4v1623703061556"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  />
                </div>

                {/* Office info */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 shadow-soft text-sm">
                  <p className="font-semibold text-slate-900">{site.contact.address}</p>
                  <p className="mt-1 text-slate-400">Mon-Fri 10 AM - 5:30 PM</p>
                  <NavLink to="/services" className="btn btn-outline btn-sm w-full mt-4 justify-center">
                    Browse Services
                  </NavLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sp-sm bg-white border-t border-slate-100">
        <div className="container max-w-2xl">
          <Reveal className="text-center mb-10">
            <span className="eyebrow inline-flex">Common Questions</span>
            <h2 className="mt-3 display-2 text-slate-900">Quick answers</h2>
          </Reveal>

          <div>
            {faqs.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between text-left group"
                    style={{ padding: "20px 0" }}
                  >
                    <span
                      className="pr-4 group-hover:text-brand-800 transition-colors"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 grid place-items-center text-brand-800 transition-transform duration-200 ${faqOpen === i ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div className="grid transition-all duration-300" style={{ gridTemplateRows: faqOpen === i ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)", paddingBottom: "20px" }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Claims CTA ── */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="container relative py-14">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Need help with a claim?</h3>
                <p className="mt-2 text-white/80 text-lg">We'll help you report, document, and follow up — even after hours.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href={site.contact.phoneHref} className="btn btn-ghost-light">Call {site.contact.phone}</a>
                <button onClick={openQuoteModal} className="btn btn-accent">Get a Quote</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
