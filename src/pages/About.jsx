import { Link } from "react-router-dom";
import { FiTarget, FiEye, FiHeart, FiMapPin, FiArrowRight } from "react-icons/fi";
import { useSeo } from "../hooks/useSeo";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import StatsStrip from "../components/home/StatsStrip";
import ContactCta from "../components/home/ContactCta";
import { site } from "../config/site";

const values = [
  { icon: FiTarget, title: "Our mission", desc: "To make world-class education accessible to every ambitious student from Kerala, with honest, expert guidance at every step." },
  { icon: FiEye, title: "Our vision", desc: "To be the most trusted study-abroad partner in the region — known for integrity, results and genuine care." },
  { icon: FiHeart, title: "Our values", desc: "Transparency over hype, students over sales, and long-term trust over quick wins. We only recommend what's right for you." },
];

export default function About() {
  useSeo({ title: "About Us", description: "Learn about Cosco Overseas Education — our mission, values and the team helping Kerala students study abroad." });
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pb-20 pt-36 text-white">
        <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-10" />
        <div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">About Cosco Overseas</span>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Built to help students from Kerala go further
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-200">
              Cosco Overseas Education exists to turn the dream of studying abroad into a clear, achievable plan —
              with end-to-end support from university selection to your first day on campus.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img src="/images/about.jpg" alt="Cosco Overseas team" className="rounded-4xl shadow-card" />
              <div className="absolute -bottom-5 -right-3 rounded-2xl border-l-4 border-brand-600 bg-white px-5 py-4 shadow-lift sm:right-6">
                <p className="text-sm font-bold text-ink-900">🎓 Trusted by students across Kerala</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading align="left" eyebrow="Our story"
              title="Honest advice, real results"
              subtitle="We started Cosco Overseas because too many students were sold the wrong course in the wrong country. We do it differently." />
            <div className="mt-6 space-y-4 text-ink-600">
              <p>Our team of experienced consultants offers personalised guidance built around your academics, finances and long-term goals — not a sales quota. We're transparent about costs, realistic about options, and with you long after you land.</p>
              <p>From the first free consultation to settling into your new city, one dedicated team handles everything: admissions, statements of purpose, visa documentation, education loans and accommodation.</p>
            </div>
            <div className="mt-7 flex items-center gap-3 rounded-2xl bg-paper p-4">
              <FiMapPin className="text-brand-600" />
              <p className="text-sm text-ink-700"><span className="font-semibold">Office:</span> {site.address.line}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What drives us" title="The principles behind every plan" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white"><v.icon size={22} /></div>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsStrip />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x text-center">
          <SectionHeading eyebrow="Leadership" title="Led with care" subtitle="A team that treats every application as if it were their own." />
          <Reveal className="mt-12">
            <div className="mx-auto max-w-sm rounded-4xl border border-ink-100 bg-paper p-8 shadow-soft">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 font-display text-2xl font-extrabold text-white">
                {site.founder.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink-900">{site.founder}</h3>
              <p className="text-sm font-medium text-brand-600">Founder & CEO</p>
              <p className="mt-3 text-sm text-ink-500">Driving Cosco Overseas with a simple belief: students deserve honest guidance and a partner who stays the whole way.</p>
              <Link to="/contact" className="btn-primary mt-6 w-full">Talk to our team <FiArrowRight /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
