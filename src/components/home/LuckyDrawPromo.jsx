import { useEffect, useState } from "react";
import { FiArrowRight, FiGift } from "react-icons/fi";
import Reveal from "../ui/Reveal";
import { useLuckyDraw } from "../luckydraw/context";
import { PRIZES, RESULTS_DATE_LABEL, RESULTS_DATE, resultsAreLive } from "../../config/luckydraw";

function remain() {
  let ms = Math.max(0, RESULTS_DATE.getTime() - Date.now());
  const d = Math.floor(ms / 864e5); ms -= d * 864e5;
  const h = Math.floor(ms / 36e5); ms -= h * 36e5;
  const m = Math.floor(ms / 6e4); ms -= m * 6e4;
  const s = Math.floor(ms / 1e3);
  return { d, h, m, s };
}

// Presentational only — parent owns the ticking state.
function Countdown({ t }) {
  const cells = [
    { n: t.d, l: "Days" }, { n: t.h, l: "Hours" },
    { n: t.m, l: "Mins" }, { n: t.s, l: "Secs" },
  ];
  return (
    <div className="flex justify-center gap-2.5 sm:gap-3">
      {cells.map((c) => (
        <div key={c.l} className="w-16 rounded-2xl border border-white/10 bg-white/5 py-3 text-center backdrop-blur sm:w-20">
          <div className="font-display text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
            {String(c.n).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">{c.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function LuckyDrawPromo() {
  const { active, openRegistration, openResults } = useLuckyDraw();
  const [t, setT] = useState(remain());
  const [live, setLive] = useState(resultsAreLive());

  // Tick once per second; flip to "live" at the results moment and stop.
  useEffect(() => {
    if (live) return;
    const id = setInterval(() => {
      if (resultsAreLive()) { setLive(true); clearInterval(id); }
      else setT(remain());
    }, 1000);
    return () => clearInterval(id);
  }, [live]);

  if (!active) return null;

  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 sm:py-20">
      {/* festive backdrop */}
      <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-[0.12]" aria-hidden />
      <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" aria-hidden />
      <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[#E8B33C]/20 blur-3xl" aria-hidden />

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8B33C]/40 bg-[#E8B33C]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8B33C]">
            <FiGift /> Kottayam International Study Expo
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
            Cosco <span className="text-brand-500">Mega Lucky Draw</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-200">
            Register free at our expo and stand a chance to win amazing prizes.
            Get an instant lot number — winners announced <b className="text-white">{RESULTS_DATE_LABEL}</b>.
          </p>
        </Reveal>

        {/* Prizes */}
        <Reveal delay={0.08} className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-3">
          {PRIZES.map((p) => (
            <div key={p.label}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur transition hover:-translate-y-0.5 hover:border-[#E8B33C]/40">
              <span className="text-2xl">{p.icon}</span>
              <span className="text-sm font-semibold text-white">{p.label}</span>
            </div>
          ))}
          <div className="flex items-center rounded-2xl border border-dashed border-white/20 px-4 py-3 text-sm font-semibold text-white/70">
            + more surprises
          </div>
        </Reveal>

        {/* Countdown */}
        <Reveal delay={0.14} className="mt-10">
          {live ? (
            <p className="text-center text-lg font-bold text-[#E8B33C]">🎉 Results are out — check your lot number!</p>
          ) : (
            <>
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Winners announced in
              </p>
              <Countdown t={t} />
            </>
          )}
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={openRegistration} className="btn-primary rounded-full px-8 py-3.5 text-base">
            🎟️ Register &amp; get your lot number <FiArrowRight />
          </button>
          <button onClick={openResults}
            className="btn rounded-full border border-white/20 px-6 py-3.5 text-white hover:bg-white/10">
            {live ? "Check results" : "How it works"}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
