import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", invert = false }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center mx-auto";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl ${invert ? "text-white" : "text-ink-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed sm:text-lg ${invert ? "text-ink-200" : "text-ink-500"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
