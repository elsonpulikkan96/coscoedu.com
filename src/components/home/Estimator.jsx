import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { estimatorData, lifestyleFactor } from "../../data/estimator";
import { whatsappLink } from "../../config/site";

const inr = (n) => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${Math.round(n / 1000)}K`;
};

const readinessLabel = (s) =>
  s >= 75 ? { t: "You look ready to apply", c: "text-green-600", b: "bg-green-50" }
  : s >= 45 ? { t: "Almost there — a few steps to go", c: "text-amber-600", b: "bg-amber-50" }
  : { t: "Early stage — let's build your plan", c: "text-brand-600", b: "bg-brand-50" };

const Pill = ({ active, onClick, children }) => (
  <button type="button" onClick={onClick}
    className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
      active ? "border-brand-600 bg-brand-600 text-white shadow-soft" : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
    }`}>
    {children}
  </button>
);

export default function Estimator() {
  const [country, setCountry] = useState("United Kingdom");
  const [lifestyle, setLifestyle] = useState("Moderate");
  const [grade, setGrade] = useState(70);
  const [english, setEnglish] = useState("Preparing");
  const [funding, setFunding] = useState("Loan planned");

  const result = useMemo(() => {
    const d = estimatorData[country];
    const f = lifestyleFactor[lifestyle];
    const tuition = (d.tuition[0] + d.tuition[1]) / 2;
    const living = ((d.living[0] + d.living[1]) / 2) * f;
    const yearLocal = Math.round(tuition + living + d.oneOff);
    const yearInr = Math.round(yearLocal * d.inrPerUnit);

    // Friendly study-readiness score (never a hard reject)
    const gradeScore = Math.min(grade, 100) * 0.5;
    const engScore = { "Not started": 5, Preparing: 18, "Test ready": 30 }[english];
    const fundScore = { Self: 20, "Loan planned": 12, "Loan approved": 20 }[funding];
    const readiness = Math.round(Math.min(gradeScore + engScore + fundScore, 100));

    return { d, tuition, living, yearLocal, yearInr, readiness };
  }, [country, lifestyle, grade, english, funding]);

  const rl = readinessLabel(result.readiness);
  const fmt = (n) => `${result.d.cur}${Math.round(n).toLocaleString()}`;

  return (
    <section id="estimator" className="bg-paper py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Plan with confidence"
          title="Cost & eligibility estimator"
          subtitle="Get an indicative first-year budget and a quick readiness check in seconds. It's a guide — we confirm exact figures in your free consultation."
        />

        <Reveal className="mt-14">
          <div className="grid overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-card lg:grid-cols-2">
            {/* Inputs */}
            <div className="space-y-7 p-7 sm:p-9">
              <div>
                <label className="mb-2.5 block text-sm font-semibold text-ink-800">Destination</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(estimatorData).map((c) => (
                    <Pill key={c} active={country === c} onClick={() => setCountry(c)}>{c}</Pill>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2.5 block text-sm font-semibold text-ink-800">Lifestyle</label>
                <div className="flex gap-2">
                  {Object.keys(lifestyleFactor).map((l) => (
                    <Pill key={l} active={lifestyle === l} onClick={() => setLifestyle(l)}>{l}</Pill>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="est-grade" className="mb-2.5 flex items-center justify-between text-sm font-semibold text-ink-800">
                  Latest academic score <span className="text-brand-600">{grade}%</span>
                </label>
                <input id="est-grade" type="range" min="40" max="100" value={grade} onChange={(e) => setGrade(+e.target.value)}
                  aria-label="Latest academic score in percent"
                  className="w-full accent-brand-600" />
              </div>

              <div>
                <label className="mb-2.5 block text-sm font-semibold text-ink-800">English test (IELTS/PTE)</label>
                <div className="flex flex-wrap gap-2">
                  {["Not started", "Preparing", "Test ready"].map((e) => (
                    <Pill key={e} active={english === e} onClick={() => setEnglish(e)}>{e}</Pill>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2.5 block text-sm font-semibold text-ink-800">Funding</label>
                <div className="flex flex-wrap gap-2">
                  {["Self", "Loan planned", "Loan approved"].map((f) => (
                    <Pill key={f} active={funding === f} onClick={() => setFunding(f)}>{f}</Pill>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="relative flex flex-col justify-between bg-ink-950 p-7 text-white sm:p-9">
              <div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-brand-600/30 blur-3xl" />
              <div className="relative">
                <p className="text-sm text-ink-300">Indicative first-year cost in {country}</p>
                <motion.div key={result.yearLocal} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                  {fmt(result.yearLocal)}
                </motion.div>
                <p className="mt-1 text-brand-400">≈ {inr(result.yearInr)} INR <span className="text-ink-300">(approx)</span></p>

                <dl className="mt-7 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <div className="flex justify-between"><dt className="text-ink-300">Tuition (avg)</dt><dd className="font-medium">{fmt(result.tuition)}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-300">Living ({lifestyle.toLowerCase()})</dt><dd className="font-medium">{fmt(result.living)}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-300">Visa, travel, insurance</dt><dd className="font-medium">{fmt(result.d.oneOff)}</dd></div>
                </dl>

                <div className={`mt-6 rounded-2xl ${rl.b} p-4`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${rl.c}`}>{rl.t}</span>
                    <span className={`font-display text-xl font-extrabold ${rl.c}`}>{result.readiness}%</span>
                  </div>
                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white">
                    <motion.div className="h-full rounded-full bg-brand-600" animate={{ width: `${result.readiness}%` }} transition={{ duration: 0.5 }} />
                  </div>
                </div>
              </div>

              <div className="relative mt-7 flex flex-col gap-2.5 sm:flex-row">
                <Link to="/contact" className="btn-primary flex-1">Get my exact plan <FiArrowRight /></Link>
                <a href={whatsappLink(`Hi! My estimate for ${country} is about ${inr(result.yearInr)}/yr and my readiness is ${result.readiness}%. Can we talk?`)}
                  target="_blank" rel="noreferrer"
                  className="btn flex-1 bg-green-600 px-5 py-3 text-white hover:bg-green-700">
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink-400">
            Figures are indicative public ranges for orientation only and vary by university, city and intake. Currency conversions are approximate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
