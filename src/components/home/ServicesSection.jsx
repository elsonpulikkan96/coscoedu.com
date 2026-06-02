import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { services } from "../../data/content";

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title="Everything you need, under one roof"
          subtitle="From the first conversation to your first day on campus — a complete, joined-up service."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-100 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-100/60 blur-2xl transition group-hover:bg-brand-200" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
                  <s.icon size={22} />
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/services" className="btn-primary">See all services & benefits</Link>
        </Reveal>
      </div>
    </section>
  );
}
