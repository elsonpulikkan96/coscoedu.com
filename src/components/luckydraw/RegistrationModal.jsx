import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Confetti from "./Confetti";
import {
  PRIZES, COUNTRIES, RESULTS_DATE_LABEL, sendConfirmationEmail,
} from "../../config/luckydraw";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

const EMPTY = { name: "", age: "", phone: "", email: "", country: COUNTRIES[0], course: "" };

export default function RegistrationModal({ entries, onRegister, onClose, onResults }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [entry, setEntry] = useState(null);        // set once registered → shows the ticket
  const [emailStatus, setEmailStatus] = useState("");
  const nameRef = useRef(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit() {
    const name = form.name.trim();
    const age = parseInt(form.age, 10);
    const phone = form.phone.replace(/\D/g, "");
    const email = form.email.trim();
    const course = form.course.trim();

    const next = {};
    if (!name) next.name = "Please enter your name.";
    if (!(age >= 10 && age <= 99)) next.age = "Enter age 10–99.";
    if (!PHONE_RE.test(phone)) next.phone = "Valid 10-digit number needed.";
    else if (entries.some((en) => en.phone === phone))
      next.phone = "This number is already registered — one entry per person.";
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email — your confirmation & result go here.";
    if (!course) next.course = "Tell us the course you're interested in.";

    setErrors(next);
    if (Object.keys(next).length) return;

    const created = onRegister({ name, age, phone, email, country: form.country, course });
    setEntry(created);

    setEmailStatus("✉ Sending confirmation email…");
    sendConfirmationEmail(created).then(() => setEmailStatus(`✉ Confirmation sent to ${email}`));
  }

  const field = (key) => `ld-field${errors[key] ? " ld-invalid" : ""}`;

  return createPortal(
    <div className="ld-overlay" data-lenis-prevent role="dialog" aria-modal="true"
      aria-label="Cosco Mega Lucky Draw registration" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ld-modal">
        <button className="ld-close" aria-label="Close" onClick={onClose}>×</button>
        <div className="ld-ticket">
          <div className="ld-ticket-head">
            <div className="ld-brand">COSCO EDU</div>
            <div className="ld-route">MEGA LUCKY DRAW<br />KOTTAYAM EXPO</div>
          </div>

          {!entry ? (
            /* STEP 1 — registration form */
            <div className="ld-body">
              <div className="ld-eyebrow">International Study Expo · Kottayam</div>
              <h2 className="ld-title">Register &amp; get your lot number</h2>
              <div className="ld-prizes">
                {PRIZES.map((p) => <span key={p.label}>{p.icon} {p.label}</span>)}
                <span>+ more</span>
              </div>
              <p className="ld-sub">Winners announced on <b>{RESULTS_DATE_LABEL}</b> — here on coscoedu.com and by email.</p>

              <div className={field("name")}>
                <label htmlFor="ld-name">Full name</label>
                <input id="ld-name" ref={nameRef} type="text" autoComplete="name" maxLength={60}
                  placeholder="Your full name" value={form.name} onChange={set("name")} />
                {errors.name && <div className="ld-err">{errors.name}</div>}
              </div>

              <div className="ld-row2">
                <div className={field("age")}>
                  <label htmlFor="ld-age">Age</label>
                  <input id="ld-age" type="number" inputMode="numeric" min={10} max={99}
                    placeholder="Age" value={form.age} onChange={set("age")} />
                  {errors.age && <div className="ld-err">{errors.age}</div>}
                </div>
                <div className={field("phone")}>
                  <label htmlFor="ld-phone">Mobile number</label>
                  <input id="ld-phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10}
                    placeholder="10-digit" value={form.phone} onChange={set("phone")} />
                  {errors.phone && <div className="ld-err">{errors.phone}</div>}
                </div>
              </div>

              <div className={field("email")}>
                <label htmlFor="ld-email">Email ID</label>
                <input id="ld-email" type="email" autoComplete="email" maxLength={80}
                  placeholder="you@example.com" value={form.email} onChange={set("email")} />
                {errors.email && <div className="ld-err">{errors.email}</div>}
              </div>

              <div className="ld-row2">
                <div className="ld-field">
                  <label htmlFor="ld-country">Preferred country</label>
                  <select id="ld-country" value={form.country} onChange={set("country")}>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className={field("course")}>
                  <label htmlFor="ld-course">Course</label>
                  <input id="ld-course" type="text" maxLength={80}
                    placeholder="e.g. MSc Nursing" value={form.course} onChange={set("course")} />
                  {errors.course && <div className="ld-err">{errors.course}</div>}
                </div>
              </div>

              <button className="ld-cta" onClick={submit}>Get my lot number →</button>
              <button className="ld-linkbtn" onClick={onResults}>Already registered? <u>Check results</u></button>
            </div>
          ) : (
            /* STEP 2 — lot-number ticket */
            <div className="ld-body">
              <div className="ld-eyebrow">Registration confirmed ✓</div>
              <h2 className="ld-title">You're in the draw!</h2>
              <div className="ld-lotbox">
                <div className="ld-lbl">★ Your lot number ★</div>
                <div className="ld-stamp">{entry.lot}</div>
                <div className="ld-holder">{entry.name}</div>
                <div className="ld-meta">
                  {entry.country.toUpperCase()} · {entry.course.toUpperCase().slice(0, 28)} · EXPO KOTTAYAM
                </div>
              </div>
              <div className="ld-notice">
                📸 <b>Screenshot this ticket.</b> Winners will be declared on <b>{RESULTS_DATE_LABEL}</b> on
                {" "}<b>coscoedu.com</b>. If you win, you'll also get an email. Prizes include flight tickets,
                laptops, visa assistance, movie tickets, trolley bags &amp; more!
              </div>
              {emailStatus && <div className="ld-email">{emailStatus}</div>}
              <button className="ld-btn2" onClick={onClose}>Done</button>
            </div>
          )}

          <div className="ld-perf" />
          <div className="ld-foot">
            <div className="ld-barcode" aria-hidden="true" />
            <div className="ld-code">RESULTS · {RESULTS_DATE_LABEL.toUpperCase()}</div>
          </div>
        </div>
        {entry && <Confetti />}
      </div>
    </div>,
    document.body
  );
}
