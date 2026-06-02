const items = [
  "University of the Arts", "Coventry", "Deakin", "Conestoga",
  "Trinity College", "TU Munich", "Auckland", "Greenwich",
];

// Logo-wall placeholder marquee. Swap the text chips for real partner logos.
export default function TrustBar() {
  const row = [...items, ...items];
  return (
    <section className="border-y border-ink-100 bg-paper py-8">
      <p className="container-x mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
        Guiding students to leading universities worldwide
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {row.map((name, i) => (
            <span key={i} className="whitespace-nowrap font-display text-lg font-semibold text-ink-300">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
