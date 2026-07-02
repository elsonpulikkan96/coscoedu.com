import { useEffect, useRef } from "react";

const COLORS = ["#D10A12", "#E8B33C", "#1E4FA3", "#FBF8F3"];

// A one-shot burst of falling confetti inside a positioned parent.
// Remount with a changing `key` to fire it again. The pieces are visual
// only, so we build them imperatively in an effect (updating the DOM) —
// this keeps render pure and avoids setState-in-effect churn.
export default function Confetti({ count = 60 }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const b = document.createElement("i");
      b.style.left = `${Math.random() * 100}%`;
      b.style.background = COLORS[i % COLORS.length];
      b.style.animationDuration = `${1.4 + Math.random() * 1.2}s`;
      b.style.animationDelay = `${Math.random() * 0.4}s`;
      box.appendChild(b);
      nodes.push(b);
    }
    return () => nodes.forEach((n) => n.remove());
  }, [count]);

  return <div className="ld-confetti" aria-hidden="true" ref={boxRef} />;
}
