import { FiCheck, FiGift } from "react-icons/fi";
import { useSeo } from "../hooks/useSeo";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import JourneyTimeline from "../components/home/JourneyTimeline";
import ContactCta from "../components/home/ContactCta";
import { services } from "../data/content";

const benefits = ["Free iPad / laptop*", "Free trolley bag*", "Free airport pickup", "Accommodation assistance", "Education loan guidance", "Post-arrival support"];

export default function Services() {
  useSeo({ title: "Our Services", description: "End-to-end study abroad services: counselling, university selection, admissions, SOP, visa support, education loans and accommodation." });
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pb-16 pt-36 text-white">
        <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-10" />
        <div className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="eyebrow">Our services</span>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">Complete support, start to finish</h1>
            <p className="text-lg text-ink-200">Everything a student needs to study abroad — handled by one team that genuinely cares.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="group h-full rounded-3xl border border-ink-100 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white transition group-hover:bg-brand-600">
                    <s.icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <JourneyTimeline />

      <section className="bg-paper py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow="Student benefits" title="A few extras, on us"
              subtitle="Genuine perks that make settling in easier — no hidden conditions beyond what's noted." />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3.5 shadow-soft">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"><FiGift size={16} /></span>
                  <span className="text-sm font-medium text-ink-800">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-400">* Selected benefits depend on the university and offer; we'll confirm what applies to you.</p>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
