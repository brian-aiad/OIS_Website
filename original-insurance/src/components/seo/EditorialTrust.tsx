import { ExternalLink, FileCheck2, Landmark, MapPin } from "lucide-react";

const resources = [
  {
    label: "California insurance license lookup",
    href: "https://cdicloud.insurance.ca.gov/cal/",
    Icon: FileCheck2,
  },
  {
    label: "California auto insurance guide",
    href: "https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/auto101.cfm",
    Icon: Landmark,
  },
  {
    label: "DMV financial responsibility guide",
    href: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/financial-responsibility-insurance-requirements-and-collisions/",
    Icon: MapPin,
  },
];

/** Visible YMYL trust layer for substantive insurance pages. */
export default function EditorialTrust() {
  return (
    <aside aria-label="Insurance information standards" className="border-t border-slate-200 bg-slate-50 py-8">
      <div className="container">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[0.9fr,1.35fr] md:p-7">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                <FileCheck2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">Information standards</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">Reviewed by Original Insurance Services</h2>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Updated August 7, 2026. Our team reviews insurance information for clarity and California relevance.
              Coverage, eligibility, pricing, and filing times vary by carrier and individual circumstances.
            </p>
          </div>

          <div className="md:border-l md:border-slate-200 md:pl-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Primary consumer resources</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {resources.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-16 items-start gap-2.5 rounded-xl bg-slate-50 p-3 text-sm font-semibold leading-snug text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                  <span>{label}</span>
                  <ExternalLink className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-brand-600" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              This website provides general information, not legal advice. Your policy and carrier documents control the terms of coverage.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
