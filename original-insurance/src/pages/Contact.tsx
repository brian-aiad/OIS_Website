import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";
import { Icons } from "../components/Icons";
import { Reveal } from "../components/AnimatedSection";

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
    title: "Contact Us | Get a Free Insurance Quote | Original Insurance Downey",
    description: "Contact Original Insurance for a free insurance quote. Call (310) 538-8666, email us, or fill out our form. Bilingual service in English, Spanish & Arabic. Located at 9907-B Paramount Blvd, Downey CA.",
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
      const endpoint = import.meta.env.VITE_CONTACT_WEBHOOK_URL;
      const key = import.meta.env.VITE_W3F_ACCESS_KEY;
      if (!endpoint || !key) throw new Error("Missing envs");

      const params = new URLSearchParams();
      params.set("access_key", key);
      params.set("subject", `${subject} \u2014 ${site.name}: ${name}`);
      params.set("from_name", site.name);
      params.set("name", name);
      params.set("email", email);
      params.set("phone", phone || "Not provided");
      params.set("topic", subject);
      params.set("message", message);
      params.set("page", window.location.href);
      params.set("company", company);

      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
        body: params.toString(),
      });
      if (!r.ok) throw new Error("Bad status");

      setSent("ok");
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } catch {
      setSent("err");
    } finally {
      setSubmitting(false);
    }
  }

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
      {/* ── Premium Header ── */}
      <section className="relative hero-mesh overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

        <div className="container relative pt-28 pb-20 md:pt-36 md:pb-28 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="flex items-center justify-center gap-2 text-sm text-blue-200 mb-6">
              <NavLink to="/" className="hover:text-white transition-colors">Home</NavLink>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              <span className="text-white font-medium">Contact</span>
            </nav>

            <h1 className="display-1 text-white">
              We're here to help
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-xl mx-auto">
              Questions about coverage? Need help with a claim? Want to discuss your policy?
              Reach out — we're a real team, not a call center.
            </p>
          </motion.div>
        </div>

        <div className="wave-divider">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="white">
            <path d="M0 30C240 50 480 20 720 30C960 40 1200 20 1440 30V60H0V30Z" />
          </svg>
        </div>
      </section>

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
              <motion.a
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                href={c.href}
                target={c.title === "Visit Us" ? "_blank" : undefined}
                rel={c.title === "Visit Us" ? "noreferrer" : undefined}
                className={cx(
                  "block rounded-2xl p-6 transition-all duration-200 hover:shadow-lifted group",
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
                <p className={cx("mt-1 text-[12px]", c.accent ? "text-white/70" : "text-slate-400")}>{c.sub}</p>
                {c.extra && <p className={cx("text-[12px]", c.accent ? "text-white/50" : "text-slate-400")}>{c.extra}</p>}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form (support/questions) + sidebar ── */}
      <section className="sp bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-14 items-start">
            {/* Form */}
            <Reveal direction="left">
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

                {/* Status banners */}
                <span aria-live="polite">
                  {sent === "ok" && (
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-100 rounded-full grid place-items-center shrink-0">
                        <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <div className="font-bold text-emerald-900 text-sm">Message sent!</div>
                        <div className="text-[12px] text-emerald-700">We'll get back to you soon.</div>
                      </div>
                    </motion.div>
                  )}
                  {sent === "err" && (
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                      <div className="w-9 h-9 bg-red-100 rounded-full grid place-items-center shrink-0">
                        <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      </div>
                      <div>
                        <div className="font-bold text-red-900 text-sm">Something went wrong</div>
                        <div className="text-[12px] text-red-700">Please try again or call us directly.</div>
                      </div>
                    </motion.div>
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
                  className={cx("btn btn-primary w-full mt-6 !py-3.5", (!canSubmit || submitting) && "opacity-50 cursor-not-allowed")}>
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
                <div className="bg-white rounded-2xl p-5 ring-1 ring-slate-200/80 shadow-soft text-sm">
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
      <section className="sp-sm bg-slate-50 border-t border-slate-100">
        <div className="container max-w-2xl">
          <Reveal className="text-center mb-10">
            <span className="inline-block bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 ring-1 ring-brand-100">Common Questions</span>
            <h2 className="display-2 text-slate-900">Quick answers</h2>
          </Reveal>

          <div className="space-y-2">
            {faqs.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="bg-white rounded-xl ring-1 ring-slate-200/80 overflow-hidden hover:ring-slate-300 transition-colors shadow-xs">
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-slate-800 pr-4 text-[15px]">{item.q}</span>
                    <motion.svg animate={{ rotate: faqOpen === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                      className="w-5 h-5 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <p className="px-5 pb-4 text-slate-500 leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
