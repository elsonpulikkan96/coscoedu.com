import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { whyChooseUs } from "../../data/content";

export default function WhyChooseUs() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Cosco Overseas"
          title="Support that actually feels personal"
          subtitle="We make studying abroad simple, honest and successful — guidance built around you, not a template."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="group h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
