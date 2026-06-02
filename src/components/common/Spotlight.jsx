import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// A soft radial glow that follows the cursor across its parent element.
// pointer-events-none so it never intercepts clicks; the listener is bound
// to the parent. Disabled for users who prefer reduced motion.
export default function Spotlight({ color = "rgba(238,43,43,0.20)", size = 460 }) {
  const x = useMotionValue(-size);
  const y = useMotionValue(-size);
  const ref = useRef(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, [x, y]);

  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
      style={{ background: bg }}
    />
  );
}
