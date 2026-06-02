import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiPhone } from "react-icons/fi";
import { site } from "../../config/site";
import { destinations } from "../../data/destinations";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Destinations", path: "/destinations", hasMenu: true },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const pillSpring = { type: "spring", stiffness: 380, damping: 30, mass: 0.6 };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null); // index of hovered desktop link
  const [progress, setProgress] = useState(0);  // 0..1 page scroll progress
  const location = useLocation();

  // Close any open menus whenever the route changes. Using React's
  // "adjust state during render" pattern (rather than an effect) keeps this
  // synchronous with navigation and avoids cascading-render warnings.
  const [lastPath, setLastPath] = useState(location.pathname);
  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(y / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  // Which link should carry the sliding highlight: the hovered one wins,
  // otherwise fall back to whatever matches the current route.
  const activeIndex = links.findIndex((l) =>
    l.path === "/" ? location.pathname === "/" : location.pathname.startsWith(l.path)
  );
  const highlightIndex = hovered ?? (activeIndex === -1 ? null : activeIndex);

  // On the transparent (top) state we sit over a dark hero -> light text.
  // Once scrolled we have a frosted-white bar -> dark text.
  const onDark = !scrolled;
  const linkIdle = onDark ? "text-white/70" : "text-ink-700";
  const railSkin = onDark
    ? "bg-white/5 ring-1 ring-white/10 backdrop-blur-md"
    : "bg-ink-900/[0.04] ring-1 ring-ink-900/5";
  const phoneSkin = onDark ? "text-white/80 hover:text-white" : "text-ink-700 hover:text-brand-700";

  const Pill = () => (
    <motion.span
      layoutId="nav-pill"
      transition={pillSpring}
      className="absolute inset-0 rounded-full bg-brand-600 shadow-[0_10px_28px_-8px_rgba(239,68,68,0.6)]"
      aria-hidden
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-200/70 bg-white/80 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="container-x flex items-center justify-between py-3"
      >
        {/* Logo */}
        <Link to="/" className="group relative flex items-center gap-2.5">
          <span className="pointer-events-none absolute -inset-2 rounded-2xl bg-brand-500/20 opacity-0 blur-lg transition duration-300 group-hover:opacity-100" aria-hidden />
          <img
            src="/images/logo.jpeg"
            alt={site.name}
            className="relative h-14 w-auto rounded-xl object-contain transition duration-300 group-hover:scale-[1.04]"
          />
        </Link>

        {/* Desktop nav — glass rail with a sliding pill */}
        <nav
          onMouseLeave={() => setHovered(null)}
          className={`relative hidden items-center gap-0.5 rounded-full px-1.5 py-1.5 transition-colors duration-300 lg:flex ${railSkin}`}
        >
          {links.map((l, i) => {
            const isHi = highlightIndex === i;
            const textSkin = isHi ? "text-white" : `${linkIdle} hover:text-white`;
            return l.hasMenu ? (
              <div
                key={l.path}
                className="relative"
                onMouseEnter={() => { setHovered(i); setMenuOpen(true); }}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <NavLink
                  to={l.path}
                  className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${textSkin}`}
                >
                  {isHi && <Pill />}
                  <span className="relative z-10 flex items-center gap-1">
                    {l.name}
                    <FiChevronDown className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                  </span>
                </NavLink>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                    >
                      <div className="card grid grid-cols-2 gap-1 p-3 shadow-lift">
                        {destinations.map((d) => (
                          <Link
                            key={d.slug}
                            to={`/destinations#${d.slug}`}
                            className="group/dest flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-paper"
                          >
                            <span className="text-2xl transition-transform duration-200 group-hover/dest:scale-110">{d.flag}</span>
                            <span>
                              <span className="block text-sm font-semibold text-ink-900">{d.country}</span>
                              <span className="block text-xs text-ink-400">{d.intakes}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={l.path}
                to={l.path}
                onMouseEnter={() => setHovered(i)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${textSkin}`}
              >
                {isHi && <Pill />}
                <span className="relative z-10">{l.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${site.phoneDial}`} className={`group flex items-center gap-2 text-sm font-semibold transition-colors ${phoneSkin}`}>
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ring-1 transition ${onDark ? "bg-white/10 ring-white/15" : "bg-brand-50 ring-brand-100/60"}`}>
              <FiPhone className={onDark ? "text-white" : "text-brand-700"} />
            </span>
            {site.phone}
          </a>

          <Link to="/contact" className="group relative inline-flex items-center">
            <span
              className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 opacity-60 blur-md transition duration-500 group-hover:opacity-100 group-hover:blur-lg"
              aria-hidden
            />
            <span className="btn-primary relative overflow-hidden rounded-full px-7 py-3 text-sm">
              <span className="relative z-10">Free consultation</span>
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                aria-hidden
              />
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 backdrop-blur transition lg:hidden ${
            onDark ? "bg-white/10 text-white ring-white/15" : "bg-white/80 text-ink-900 ring-ink-200"
          }`}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </motion.div>

      {/* Scroll progress line */}
      <div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand-500 via-rose-500 to-brand-600 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, opacity: progress > 0.01 ? 1 : 0 }}
        aria-hidden
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-0 -z-10 bg-ink-900/50 backdrop-blur-sm lg:hidden"
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden"
            >
              <div className="container-x pb-5">
                <div className="card flex flex-col gap-1 p-4">
                  {links.map((l, i) => (
                    <motion.div
                      key={l.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <NavLink
                        to={l.path}
                        className={({ isActive }) =>
                          `block rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                            isActive ? "bg-brand-50 text-brand-700" : "text-ink-800 hover:bg-paper"
                          }`
                        }
                      >
                        {l.name}
                      </NavLink>
                    </motion.div>
                  ))}
                  <div className="mt-2 flex flex-col gap-2">
                    <a href={`tel:${site.phoneDial}`} className="btn-ghost w-full"><FiPhone /> {site.phone}</a>
                    <Link to="/contact" className="btn-primary w-full rounded-full py-3.5">Free consultation</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}