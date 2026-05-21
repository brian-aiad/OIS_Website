import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ElementType } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up:    { y: 32 },
  down:  { y: -16 },
  left:  { x: -40 },
  right: { x: 40 },
  fade:  {},
  scale: { scale: 0.96 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "figure";
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once, margin: "-80px 0px -40px 0px", amount: 0.18 });
  const off = offsets[direction];

  const Component = motion[Tag] as ElementType;

  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, filter: "blur(8px)", ...off }}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
      transition={{ duration, delay, ease }}
      className={`reveal-surface ${className}`}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  children,
  className = "",
  gap = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-70px 0px -35px 0px", amount: 0.14 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
        show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.52, ease } },
      }}
      className={`reveal-surface ${className}`}
    >
      {children}
    </motion.div>
  );
}
