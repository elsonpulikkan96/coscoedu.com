import { useState } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../config/site";
import { destinations } from "../../data/destinations";
import { submitEnquiry } from "../../lib/leads";

const empty = { name: "", email: "", phone: "", destination: "", message: "" };

export default function EnquiryForm({ compact = false, title = "Book your free consultation" }) {
  const [data, setData] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [error, setError] = useState("");

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!data.name || !data.email || !data.phone) return "Please fill in your name, email and phone.";
    if (!/\S+@\S+\.\S+/.test(data.email)) return "Please enter a valid email address.";
    if (data.phone.replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError("");
    setStatus("loading");
    // Save the lead to Supabase (the admin app reads it + the team is
    // emailed). WhatsApp handoff below still works as a fast fallback,
    // and if Supabase isn't configured this is a graceful no-op.
    await submitEnquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      destination: data.destination || null,
      message: data.message || null,
      source: "website",
    });
    setStatus("success");
  };

  if (status === "success") {
    const text = `Hi Cosco Overseas! I'm ${data.name}. I'd like a free consultation about studying${
      data.destination ? ` in ${data.destination}` : " abroad"
    }. Phone: ${data.phone}.`;
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <FiCheckCircle className="h-12 w-12 text-green-600" />
        <h3 className="text-xl font-bold text-ink-900">Thanks, {data.name.split(" ")[0]}!</h3>
        <p className="text-sm text-ink-500">
          We've got your details and will reach out shortly. Want a faster reply? Message us on WhatsApp.
        </p>
        <a href={whatsappLink(text)} target="_blank" rel="noreferrer" className="btn bg-green-600 px-5 py-2.5 text-white hover:bg-green-700">
          <FaWhatsapp /> Continue on WhatsApp
        </a>
        <button onClick={() => { setData(empty); setStatus("idle"); }} className="text-sm font-medium text-brand-700 link-underline">
          Submit another enquiry
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition";

  return (
    <form onSubmit={onSubmit} className="space-y-3.5" noValidate>
      {!compact && <h3 className="mb-1 text-center text-xl font-bold text-ink-900">{title}</h3>}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">
          <FiAlertCircle className="shrink-0" /> {error}
        </div>
      )}

      <label htmlFor="enq-name" className="sr-only">Full name</label>
      <input id="enq-name" className={field} name="name" placeholder="Full name" value={data.name} onChange={onChange} autoComplete="name" />
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-email" className="sr-only">Email address</label>
          <input id="enq-email" className={field} name="email" type="email" placeholder="Email address" value={data.email} onChange={onChange} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="enq-phone" className="sr-only">Mobile number</label>
          <input id="enq-phone" className={field} name="phone" placeholder="Mobile number" value={data.phone} onChange={onChange} autoComplete="tel" />
        </div>
      </div>
      <label htmlFor="enq-destination" className="sr-only">Preferred destination</label>
      <select id="enq-destination" className={field} name="destination" value={data.destination} onChange={onChange}>
        <option value="">Preferred destination (optional)</option>
        {destinations.map((d) => (
          <option key={d.slug} value={d.country}>{d.country}</option>
        ))}
      </select>
      {!compact && (
        <>
          <label htmlFor="enq-message" className="sr-only">Your message</label>
          <textarea id="enq-message" className={field} name="message" rows={3} placeholder="Tell us about your plans (optional)" value={data.message} onChange={onChange} />
        </>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-70">
        {status === "loading" ? "Sending…" : "Book free consultation"}
      </button>
      <p className="text-center text-xs text-ink-400">No spam. Your details are only used to contact you about studying abroad.</p>
    </form>
  );
}
