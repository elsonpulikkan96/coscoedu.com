import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { site, whatsappLink } from "../../config/site";
import { destinations } from "../../data/destinations";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <img src="/images/logo.jpeg" alt={site.name} className="h-12 w-auto rounded-lg" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
            Helping students from Kerala reach world-class universities — with honest counselling,
            careful admissions and dependable visa support, end to end.
          </p>
          <a href={whatsappLink()} target="_blank" rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
            <FaWhatsapp /> Chat on WhatsApp
          </a>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[["Home","/"],["About","/about"],["Destinations","/destinations"],["Services","/services"],["Contact","/contact"]].map(([n,p]) => (
              <li key={p}><Link to={p} className="text-ink-300 transition hover:text-white">{n}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Destinations</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
            {destinations.map((d) => (
              <li key={d.slug}><Link to={`/destinations#${d.slug}`} className="text-ink-300 transition hover:text-white">{d.flag} {d.country}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><FiMapPin className="mt-0.5 shrink-0 text-brand-500" /> {site.address.line}</li>
            <li className="flex items-center gap-2.5"><FiPhone className="shrink-0 text-brand-500" /> <a href={`tel:${site.phoneDial}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex items-center gap-2.5"><FiMail className="shrink-0 text-brand-500" /> <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
          </ul>
          <div className="mt-5 flex gap-2.5">
            {[["Instagram",FaInstagram,site.social.instagram],["Facebook",FaFacebookF,site.social.facebook],["YouTube",FaYoutube,site.social.youtube],["LinkedIn",FaLinkedinIn,site.social.linkedin]].map(([label,Icon,url]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer"
                aria-label={`${site.shortName} on ${label}`} title={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-ink-300 transition hover:border-brand-500 hover:bg-brand-600 hover:text-white">
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-300 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Founder & CEO — {site.founder}</p>
        </div>
      </div>
    </footer>
  );
}
