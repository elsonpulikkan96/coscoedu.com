import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { faqs } from "../../data/content";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Answers, before you ask" />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
                  <button onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-display text-base font-bold text-ink-900 sm:text-lg">{f.q}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition ${isOpen ? "rotate-45" : ""}`}>
                      <FiPlus />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <p className="px-6 pb-5 text-sm leading-relaxed text-ink-500">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
