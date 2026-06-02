import { motion, useScroll, useSpring } from "framer-motion";

// Thin brand-coloured bar that fills as the user scrolls the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700"
    />
  );
}
