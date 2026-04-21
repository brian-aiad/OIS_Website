export default function OfficePhotoBlock() {
  return (
    <section
      className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-50 border border-slate-200"
      aria-label="Our Downey office"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Photo column */}
        <div className="relative min-h-56 md:min-h-72 bg-slate-200 flex items-center justify-center">
          {/* TODO: replace placeholder with real office photo — save to public/office-downey.jpg (min 1200px wide) */}
          <img
            src="/office-downey.jpg"
            alt="Original Insurance office on Paramount Boulevard in Downey, CA"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
            loading="lazy"
            decoding="async"
          />
          {/* Placeholder shown when image is missing */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="w-16 h-16 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Caption / NAP column */}
        <div className="flex flex-col justify-center gap-4 px-6 py-8 md:px-8 bg-white">
          {/* Caption */}
          <p className="text-slate-600 text-sm leading-relaxed">
            Our Downey office on Paramount Boulevard. Walk-ins welcome during
            business hours. Street parking available. Accessible entrance.
          </p>

          {/* NAP */}
          <address className="not-italic flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-slate-700 text-sm">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-9.5 11.25S.5 17.642.5 10.5a9 9 0 0119 0z"
                />
              </svg>
              <span>9907-B Paramount Blvd, Downey, CA 90240</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 text-sm">
              <svg
                className="w-4 h-4 flex-shrink-0 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <a
                href="tel:+13105388666"
                className="text-slate-700 hover:text-navy-700 underline underline-offset-2"
              >
                (310) 538-8666
              </a>
            </div>
          </address>

          {/* Hours */}
          <div className="flex items-start gap-2 text-slate-700 text-sm">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-800">Hours</span>
              <span>Mon–Fri&nbsp; 10:00 AM – 5:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
