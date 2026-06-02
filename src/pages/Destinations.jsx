import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiClock, FiBriefcase, FiHome, FiBookOpen, FiCalendar, FiArrowRight } from "react-icons/fi";
import { useSeo } from "../hooks/useSeo";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import ContactCta from "../components/home/ContactCta";
import { destinations } from "../data/destinations";

export default function Destinations() {
  useSeo({ title: "Study Destinations", description: "Compare tuition, living costs, visa rules and work rights for studying in the UK, Canada, Australia, USA, Ireland, Germany and New Zealand." });
  const location = useLocation();
  const slugFromHash = () => {
    const s = location.hash.replace("#", "");
    return destinations.some((d) => d.slug === s) ? s : null;
  };
  const [active, setActive] = useState(() => slugFromHash() || destinations[0].slug);

  // Sync selection when the URL hash changes (e.g. /destinations#canada),
  // using React's "adjust state during render" pattern instead of an effect.
  const [lastHash, setLastHash] = useState(location.hash);
  if (location.hash !== lastHash) {
    setLastHash(location.hash);
    const s = slugFromHash();
    if (s) setActive(s);
  }

  const current = destinations.find((d) => d.slug === active);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pb-16 pt-36 text-white">
        <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-10" />
        <div className="absolute -right-16 top-16 h-72 w-72 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="eyebrow">Study destinations</span>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">Choose where you'll thrive</h1>
            <p className="text-lg text-ink-200">Explore tuition, living costs, visas and work rights across seven leading destinations.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <div className="container-x">
          {/* Country selector */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {destinations.map((d) => (
              <button key={d.slug} onClick={() => setActive(d.slug)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  active === d.slug ? "border-brand-600 bg-brand-600 text-white shadow-soft" : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
                }`}>
                <span className="text-lg">{d.flag}</span> {d.country}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={current.slug}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="mt-10 overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-card">
              <div className="grid lg:grid-cols-5">
                <div className="bg-ink-950 p-8 text-white lg:col-span-2">
                  <span className="text-6xl">{current.flag}</span>
                  <h2 className="mt-4 text-3xl font-extrabold text-white">{current.country}</h2>
                  <p className="mt-3 text-ink-200">{current.blurb}</p>
                  <div className="mt-7 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm">
                    <FiCalendar className="text-brand-400" /> <span className="text-ink-200">Intakes:</span>
                    <span className="font-semibold text-white">{current.intakes}</span>
                  </div>
                  <Link to="/contact" className="btn-primary mt-6 w-full">Apply to {current.country} <FiArrowRight /></Link>
                </div>

                <div className="grid gap-px bg-ink-100 p-px lg:col-span-3 sm:grid-cols-2">
                  {[
                    { icon: FiBookOpen, label: "Tuition (indicative)", value: current.tuition },
                    { icon: FiHome, label: "Living cost (indicative)", value: current.living },
                    { icon: FiBriefcase, label: "Post-study work", value: current.work },
                    { icon: FiClock, label: "Intakes", value: current.intakes },
                  ].map((f) => (
                    <div key={f.label} className="bg-white p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><f.icon size={18} /></div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">{f.label}</p>
                      <p className="mt-1 text-lg font-bold text-ink-900">{f.value}</p>
                    </div>
                  ))}
                  <div className="bg-white p-6 sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Popular courses</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {current.popular.map((c) => (
                        <span key={c} className="rounded-full bg-paper px-3 py-1.5 text-sm font-medium text-ink-700">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <p className="mt-4 text-center text-xs text-ink-400">
            Figures are indicative public ranges for orientation only and vary by university, course and city. We confirm exact numbers during your consultation.
          </p>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
