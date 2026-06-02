import { FiStar } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { testimonials } from "../../data/content";

export default function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Student stories"
          title="Loved by students across Kerala"
          subtitle="Real experiences from students who reached their study-abroad goals with us."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-ink-100 bg-paper p-6 transition hover:shadow-card">
                <div className="flex gap-0.5 text-brand-500">
                  {Array.from({ length: 5 }).map((_, k) => <FiStar key={k} className="fill-brand-500" size={16} />)}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">"{t.text}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink-900">{t.name}</span>
                    <span className="block text-xs text-ink-400">{t.course}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
