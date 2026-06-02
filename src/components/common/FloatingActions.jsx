import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiArrowUp } from "react-icons/fi";
import { site, whatsappLink } from "../../config/site";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-800 shadow-card transition hover:-translate-y-0.5">
          <FiArrowUp />
        </button>
      )}
      <a href={`tel:${site.phoneDial}`} aria-label="Call us"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white shadow-card transition hover:-translate-y-0.5">
        <FiPhone size={20} />
      </a>
      <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="group relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500/60" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lift transition group-hover:scale-105">
          <FaWhatsapp size={28} />
        </span>
      </a>
    </div>
  );
}
