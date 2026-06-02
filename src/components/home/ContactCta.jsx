import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "../ui/Reveal";
import { whatsappLink } from "../../config/site";

export default function ContactCta() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-8 py-14 text-center text-white shadow-lift sm:px-12 sm:py-20">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-ink-950/20 blur-3xl" />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to take the first step abroad?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-brand-50">
              Book a free consultation today. No pressure, no jargon — just honest advice tailored to your goals.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn bg-white px-7 py-3.5 font-bold text-brand-700 hover:-translate-y-0.5 hover:bg-paper">
                Book free consultation <FiArrowRight />
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noreferrer"
                className="btn border border-white/40 px-7 py-3.5 font-bold text-white hover:-translate-y-0.5 hover:bg-white/10">
                <FaWhatsapp /> Chat now
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
