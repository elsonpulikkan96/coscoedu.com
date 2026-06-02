import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { journey } from "../../data/content";

export default function JourneyTimeline() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28">
      <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-10" />
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          invert
          eyebrow="The journey"
          title="Five steps, fully guided"
          subtitle="A clear, predictable path — so you always know what's next."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-5">
          {journey.map((j, i) => (
            <Reveal key={j.step} delay={i * 0.1}>
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 font-display text-xl font-extrabold text-white shadow-glow">
                  {j.step}
                </div>
                {i < journey.length - 1 && (
                  <div className="absolute left-14 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-gradient-to-r from-brand-600/60 to-transparent md:block" />
                )}
                <h3 className="mt-5 text-lg font-bold text-white">{j.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{j.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
