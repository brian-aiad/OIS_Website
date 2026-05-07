import { ClipboardCheck, FileText, Phone, ShieldCheck } from "lucide-react";
import { openQuoteModal } from "../lib/openQuote";
import { site } from "../lib/site";

const REVIEW_ITEMS = [
  "License or ownership status",
  "Vehicle, home, or business use",
  "Current coverage and gaps",
  "SR-22, no-license, or certificate needs",
];

export default function BrokerHeroPanel() {
  return (
    <aside className="rounded-2xl bg-white/[0.07] p-5 text-white ring-1 ring-white/15 shadow-heavy backdrop-blur-md">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="eyebrow-light">Broker Review</span>
          <h2 className="mt-2 text-2xl font-bold leading-tight">Coverage checked before price.</h2>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400 text-brand-950 shadow-md">
          <ClipboardCheck className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/75">
        A quote is only useful if the policy can actually protect you. We review the details carriers care about, then compare available options.
      </p>

      <div className="mt-5 grid gap-3">
        {REVIEW_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10">
            <ShieldCheck className="h-4 w-4 shrink-0 text-gold-300" />
            <span className="text-sm font-medium text-white/85">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-brand-900/70 p-4 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <FileText className="h-4 w-4 text-gold-300" />
          Same-day proof when carrier binding is available
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-white/65">
          Bring what you have. If something is missing, a broker can tell you what is actually required.
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <button onClick={openQuoteModal} className="btn btn-accent justify-center">
          Start Quote
        </button>
        <a href={site.contact.phoneHref} className="btn btn-ghost-light justify-center">
          <Phone className="h-4 w-4" />
          Call
        </a>
      </div>
    </aside>
  );
}
