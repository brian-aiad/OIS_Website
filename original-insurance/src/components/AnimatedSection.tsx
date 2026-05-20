import { motion, useInView } from "framer-motion";
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
  const inView = useInView(ref, { once, margin: "-60px" });
  const off = offsets[direction];

  const Component = motion[Tag] as ElementType;

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, ...off }}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={{ duration, delay, ease }}
      className={className}
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
  const inView = useInView(ref, { once: true, margin: "-40px" });

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
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
