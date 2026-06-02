import { metrics } from "../../config/site";
import { useCountUp } from "../../hooks/useCountUp";

function Stat({ value, suffix, label }) {
  const { value: v, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {v}<span className="text-brand-500">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-ink-300">{label}</div>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-16">
      <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-10" />
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="container-x relative grid grid-cols-2 gap-8 lg:grid-cols-4">
        {metrics.map((m) => <Stat key={m.label} {...m} />)}
      </div>
    </section>
  );
}
