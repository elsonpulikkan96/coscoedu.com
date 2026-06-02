import { motion } from "framer-motion";
import { fadeUp, viewport } from "../../lib/motion";

// Scroll-triggered reveal wrapper.
export default function Reveal({ children, delay = 0, className = "", variants = fadeUp }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
