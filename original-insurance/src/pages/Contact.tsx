import { useState } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Icons } from "../components/Icons";
import { Reveal } from "../components/AnimatedSection";
import PageHero from "../components/PageHero";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";

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
    title: "Contact Original Insurance Downey — Call or Visit",
    description: "Call, email, or walk in. Our Downey office is open Mon–Fri 10AM–5:30PM. Bilingual English, Spanish & Arabic. Same-day quotes and SR-22 filing. Call (310) 538-8666.",
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

      if (!WEB3FORMS_KEY) throw new Error("Web3Forms access key is missing");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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

  return (
    <main id="main-content">
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://originalinsurance.net/" },
        { name: "Contact", url: "https://originalinsurance.net/contact" },
      ]} />

      <PageHero
        title="We're here to help"
        subtitle="Questions about coverage? Need help with a claim? Reach out — real people, real answers."
        breadcrumb="Contact"
        backgroundImage="/images/handshake.webp"
      />

      {/* 3 contact cards */}
      <section className="relative -mt-2 z-10 pb-12">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Icons.Phone className="w-5 h-5" />,
                title: "Call Us",
                detail: site.contact.phone,
                sub: "Mon–Fri 10 AM – 5:30 PM",
                href: site.contact.phoneHref,
                accent: true,
              },
              {
                icon: <Icons.Mail className="w-5 h-5" />,
                title: "Email Us",
                detail: site.contact.email,
                sub: "Reply within 1–2 hours",
                href: site.contact.emailHref,
                accent: false,
              },
              {
                icon: <Icons.MapPin className="w-5 h-5" />,
                title: "Visit Us",
                detail: "9907-B Paramount Blvd",
                sub: "Downey, CA 90240 — walk-ins welcome",
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
                <p className={cx("mt-1 font-semibold text-[15px]", c.accent ? "text-white/90" : "text-brand-700")}>{c.detail}</p>
                <p className={cx("mt-1 text-[12px]", c.accent ? "text-white/70" : "text-slate-500")}>{c.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="sp bg-white border-t border-slate-100">
        <div className="container">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-14 items-start">

            {/* Form */}
            <Reveal direction="left">
              {sent === "ok" ? (
                <div
                  className="rounded-2xl p-8 md:p-14 text-center page-fade-in relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, var(--navy-800), var(--navy-900))",
                    border: "1px solid var(--navy-700)",
                    borderTop: "2px solid var(--gold-500)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                  aria-live="polite"
                >
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
                    We'll be in touch within 1–2 hours during business hours (Mon–Fri, 10 AM – 5:30 PM PT).
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a href={site.contact.phoneHref} className="btn btn-accent">Call {site.contact.phone}</a>
                    <button type="button" onClick={() => setSent(null)} className="btn btn-ghost-light">
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-slate-200/80 shadow-lifted" noValidate>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Send us a message</h2>
                  <p className="text-sm text-slate-400 mb-6">Have a question? Need help with your policy? We'll get back to you within business hours.</p>

                  {/* Error banner */}
                  <span aria-live="polite">
                    {sent === "err" && (
                      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 page-fade-in">
                        <svg className="w-5 h-5 text-red-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-bold text-red-900 text-sm">Something went wrong</p>
                          <p className="text-[12px] text-red-700">Call us at <a href="tel:+13105388666" className="underline">(310) 538-8666</a> or try again.</p>
                        </div>
                      </div>
                    )}
                  </span>

                  {/* Honeypot */}
                  <label className="sr-only">
                    Company
                    <input autoComplete="organization" tabIndex={-1} value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" />
                  </label>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                      <input
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                        placeholder="John Smith" required
                      />
                    </div>

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
                          placeholder="(310) 000-0000"
                        />
                      </div>
                    </div>

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

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message *</label>
                      <textarea
                        rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 ring-1 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none"
                        placeholder="How can we help you today?" required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className={cx("btn btn-accent w-full mt-6 !py-3.5 text-base", (!canSubmit || submitting) && "opacity-70 cursor-not-allowed")}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </button>

                  <p className="text-[12px] text-slate-400 mt-3 text-center">
                    We typically respond within <strong className="text-slate-500">1–2 hours</strong> during business hours
                  </p>
                </form>
              )}
            </Reveal>

            {/* Sidebar */}
            <Reveal direction="right" delay={0.1}>
              <div className="space-y-6">
                {/* Quote CTA */}
                <div className="bg-brand-50 rounded-2xl p-6 ring-1 ring-brand-100 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl grid place-items-center mx-auto mb-3">
                    <Icons.Phone className="w-6 h-6 text-brand-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Looking for a quote?</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Compare 30+ carriers for auto, home, SR-22, and more.
                  </p>
                  <button onClick={openQuoteModal} className="btn btn-accent btn-sm w-full justify-center">
                    Get a Free Quote &rarr;
                  </button>
                </div>

                {/* Multilingual */}
                <div className="bg-gradient-to-br from-gold-500 to-gold-400 rounded-2xl p-6 text-white relative overflow-hidden shadow-lifted">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <h3 className="font-bold text-lg text-brand-950 mb-2">We speak your language</h3>
                  <p className="text-brand-900/70 text-sm leading-relaxed">
                    <strong>Tambi&eacute;n hablamos espa&ntilde;ol.</strong>{" "}
                    <strong>نتحدث العربية.</strong>{" "}
                    Fluent service in Arabic, Spanish, and English.
                  </p>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 shadow-soft aspect-[4/3]">
                  <iframe
                    title="Original Insurance office map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1323.4536432142705!2d-118.2979079!3d33.9010092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bae3e93f75f9%3A0xf8e0a9d1b3d7472d!2s9907B%20PARAMOUNT%20BLVD%2C%20DOWNEY%2C%20CA%2090240-3805!5e0!3m2!1sen!2sus!4v1623703061556"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  />
                </div>

                {/* Office info */}
                <div className="bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft text-sm space-y-1">
                  <p className="font-semibold text-slate-900">{site.contact.address}</p>
                  <p className="text-slate-400">Mon–Fri &nbsp;10 AM – 5:30 PM</p>
                  <NavLink to="/services" className="btn btn-outline btn-sm w-full mt-3 justify-center">
                    Browse Services
                  </NavLink>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </main>
  );
}
