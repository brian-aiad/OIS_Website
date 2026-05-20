import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gold-400 shadow-[0_1px_10px_rgba(245,158,11,0.35)]"
      style={{ scaleX }}
    />
  );
}
