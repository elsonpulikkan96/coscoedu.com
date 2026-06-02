import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Tilt from "react-parallax-tilt";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { destinations } from "../../data/destinations";

export default function DestinationsSection() {
  const featured = destinations.filter((d) => d.highlight);
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Study destinations"
          title="Where will your story begin?"
          subtitle="Seven of the world's most popular study destinations — with the tuition, living costs and work rights that matter most to students from Kerala."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.08}>
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                scale={1.03}
                transitionSpeed={900}
                glareEnable
                glareMaxOpacity={0.12}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="24px"
                className="h-full [transform-style:preserve-3d]"
              >
                <Link to={`/destinations#${d.slug}`} className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-paper p-6 transition-colors duration-300 hover:border-brand-200 hover:shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{d.flag}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-500 transition group-hover:rotate-45 group-hover:bg-brand-600 group-hover:text-white">
                      <FiArrowUpRight />
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink-900">{d.country}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{d.blurb}</p>
                  <dl className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
                    <div className="flex justify-between gap-3"><dt className="text-ink-500">Tuition</dt><dd className="text-right font-medium text-ink-800">{d.tuition}</dd></div>
                    <div className="flex justify-between gap-3"><dt className="text-ink-500">Work</dt><dd className="text-right font-medium text-ink-800">{d.work}</dd></div>
                  </dl>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link to="/destinations" className="btn-dark">View all destinations &amp; details</Link>
        </Reveal>
      </div>
    </section>
  );
}
