import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { useSeo } from "../hooks/useSeo";
import Reveal from "../components/ui/Reveal";
import EnquiryForm from "../components/forms/EnquiryForm";
import { site, whatsappLink } from "../config/site";

export default function Contact() {
  useSeo({ title: "Contact Us", description: "Book a free study-abroad consultation with Cosco Overseas Education in Kottayam, Kerala. Call, WhatsApp or send an enquiry." });
  const cards = [
    { icon: FiPhone, label: "Call us", value: site.phone, href: `tel:${site.phoneDial}` },
    { icon: FaWhatsapp, label: "WhatsApp", value: "Chat with us", href: whatsappLink() },
    { icon: FiMail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: FiMapPin, label: "Visit", value: site.address.line, href: `https://maps.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}` },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pb-16 pt-36 text-white">
        <div className="absolute inset-0 bg-grid-ink bg-[size:46px_46px] opacity-10" />
        <div className="absolute -right-16 top-16 h-72 w-72 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="eyebrow">Get in touch</span>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">Let's plan your journey</h1>
            <p className="text-lg text-ink-200">Book a free consultation — we usually reply within a few hours.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="group rounded-3xl border border-ink-100 bg-paper p-6 transition hover:-translate-y-1 hover:shadow-card">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white"><c.icon size={20} /></div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">{c.label}</p>
                  <p className="mt-1 font-bold text-ink-900 group-hover:text-brand-700">{c.value}</p>
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-3xl border border-ink-100 bg-paper p-6">
              <FiClock className="text-brand-600" />
              <p className="text-sm text-ink-700"><span className="font-semibold">Hours:</span> Mon–Sat, 9:30 AM – 6:30 PM</p>
            </div>
            <div className="mt-4 h-64 overflow-hidden rounded-3xl border border-ink-100">
              <iframe title="Cosco Overseas location" loading="lazy" className="h-full w-full border-0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&z=13&output=embed`} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-4xl border border-ink-100 bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-2xl font-bold text-ink-900">Send an enquiry</h2>
              <p className="mt-1 text-sm text-ink-500">Fill this in and we'll get back to you. Prefer instant? Use WhatsApp.</p>
              <div className="mt-6"><EnquiryForm /></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
