// TODO: replace count prop value at mount site with real GBP review count
// Search for data-verify="gbp-review-count" to find all mount points
import { useId } from "react";

interface ReviewBadgeProps {
  rating?: number;
  count: number;
  compact?: boolean;
}

function StarIcon({ fill, size }: { fill: number; size: number }) {
  const id = `star-grad-${useId().replace(/:/g, "")}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#F59E0B" />
          <stop offset={`${fill * 100}%`} stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"
      />
    </svg>
  );
}

export default function ReviewBadge({
  rating = 4.9,
  count,
  compact = false,
}: ReviewBadgeProps) {
  const starSize = compact ? 14 : 18;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(1, Math.max(0, rating - i));
    return fill;
  });

  return (
    <a
      href="https://g.page/original-insurance"
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/90 shadow-sm",
        "hover:shadow-md transition-shadow duration-200 no-underline",
        compact ? "px-3 py-1.5" : "px-4 py-2",
      ].join(" ")}
      aria-label={`${rating} stars, ${count} Google Reviews — view on Google`}
    >
      {/* Stars */}
      <span className="flex items-center gap-0.5">
        {stars.map((fill, i) => (
          <StarIcon key={i} fill={fill} size={starSize} />
        ))}
      </span>

      {/* Numeric rating */}
      <span
        className={[
          "font-semibold text-amber-600 leading-none",
          compact ? "text-xs" : "text-sm",
        ].join(" ")}
      >
        {rating.toFixed(1)}
      </span>

      {/* Review count */}
      <span
        data-verify="gbp-review-count"
        className={[
          "text-slate-500 leading-none",
          compact ? "text-xs" : "text-sm",
        ].join(" ")}
      >
        ({count} reviews)
      </span>

      {/* Label */}
      <span
        className={[
          "text-slate-400 leading-none border-l border-slate-200 pl-2",
          compact ? "text-xs" : "text-sm",
        ].join(" ")}
      >
        Google Reviews
      </span>
    </a>
  );
}
