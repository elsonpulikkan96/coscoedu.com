import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheck, FiArrowRight, FiStar } from "react-icons/fi";
import EnquiryForm from "../forms/EnquiryForm";
import Spotlight from "../common/Spotlight";
import { fadeUp, stagger } from "../../lib/motion";

const usps = [
  "Personalised counselling & university selection",
  "Complete admissions & visa support",
  "Post-arrival assistance & student benefits",
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-ink-950">
      {/* Background image + layered overlays for depth */}
      <div className="absolute inset-0 -z-10">
        <img src="/images/bg.jpg" alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/85 to-ink-900/70" />
        <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-[0.15]" />
      </div>
      <div className="absolute -left-20 top-24 h-80 w-80 animate-aurora rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -right-10 bottom-16 h-72 w-72 animate-float rounded-full bg-brand-500/20 blur-3xl [animation-delay:1.5s]" />
      <div className="absolute left-1/2 top-10 h-40 w-40 animate-spin-slow rounded-full border border-white/5" />
      <Spotlight />

      <div className="container-x grid items-center gap-12 pb-16 pt-32 lg:grid-cols-2 lg:gap-8">
        {/* Left: copy */}
        <motion.div variants={stagger(0.12)} initial="hidden" animate="show" className="text-white">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-300 backdrop-blur">
            <FiStar className="animate-bounce-subtle text-brand-400" /> Trusted study abroad consultants in Kerala
          </motion.span>

          <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Your global education
            <span className="relative ml-2 inline-block text-brand-500">
              journey
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 9C40 3 160 3 198 9" stroke="#EE2B2B" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{" "}
            starts here
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-ink-200">
            From choosing the right university to landing on campus, Cosco Overseas guides you through
            every step — making your journey smooth, affordable and genuinely supported.
          </motion.p>

          <motion.ul variants={stagger(0.1)} className="mt-7 space-y-3">
            {usps.map((u) => (
              <motion.li key={u} variants={fadeUp} className="flex items-center gap-3 text-ink-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
                  <FiCheck size={14} />
                </span>
                {u}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">Book free consultation <FiArrowRight /></Link>
            <Link to="/destinations" className="btn glass px-6 py-3 text-white hover:bg-white/20">Explore destinations</Link>
          </motion.div>
        </motion.div>

        {/* Right: lead form */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto w-full max-w-md rounded-4xl bg-white/95 p-6 shadow-lift backdrop-blur-xl sm:p-7">
          <EnquiryForm compact title="Start your study abroad journey" />
        </motion.div>
      </div>
    </section>
  );
}
