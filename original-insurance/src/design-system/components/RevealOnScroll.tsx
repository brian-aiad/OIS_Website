import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { motion as motionTokens } from "../tokens";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

/**
 * Standard scroll-entrance animation. Replaces every ad-hoc Framer Motion
 * fadeUp pattern across the site. One pattern everywhere = cohesion.
 *
 * Usage:
 *   <RevealOnScroll>
 *     <h2>Section Heading</h2>
 *   </RevealOnScroll>
 */
export function RevealOnScroll({ children, className, delay = 0, direction = "up" }: RevealOnScrollProps) {
  const initialY = direction === "up" ? 20 : 0;
  const initialX = direction === "left" ? -20 : direction === "right" ? 20 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={motionTokens.fadeUp.viewport}
      transition={{ ...motionTokens.fadeUp.transition, delay }}
    >
      {children}
    </motion.div>
  );
}
