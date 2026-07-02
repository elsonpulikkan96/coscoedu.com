// ──────────────────────────────────────────────────────────────
// Cosco Mega Lucky Draw — campaign configuration.
// Everything the Cosco team needs to run / update the raffle lives
// here. Edit these values; the UI updates everywhere.
// ──────────────────────────────────────────────────────────────
import { submitLuckyDrawEntry } from "../lib/leads";

// When winners go live (IST). Before this the results panel shows a
// countdown; on/after it, the lot-number lookup opens.
export const RESULTS_DATE = new Date("2026-07-20T10:00:00+05:30");
export const RESULTS_DATE_LABEL = "July 20"; // human-facing copy

// How long after RESULTS_DATE the campaign UI keeps showing (a claim
// window). Once past this, the launcher + auto-popup stop appearing.
const CLAIM_WINDOW_DAYS = 14;

// Auto-open the registration popup for a first-time visitor this many
// ms after load (once per browser session). Set to null to disable.
export const AUTO_OPEN_DELAY = 3000;

// Lot-number prefix. On the live site the BACKEND should assign these
// sequentially so they're unique across every device at the stall.
export const LOT_PREFIX = "KTM";

// Staff panel PIN (entries table + CSV export).
export const STAFF_PIN = "2026";

// Prizes shown on the ticket + homepage promo + emails.
export const PRIZES = [
  { icon: "📱", label: "iPhone 17" },
  { icon: "💻", label: "Laptop" },
  { icon: "✈️", label: "Flight ticket" },
  { icon: "🛂", label: "Visa assistance" },
  { icon: "🎓", label: "Free scholarship application" },
  { icon: "💸", label: "Fee waiver" },
  { icon: "📚", label: "Free IELTS coaching" },
];

// Options in the "preferred country" dropdown.
export const COUNTRIES = [
  "Not sure yet", "UK", "Canada", "Australia", "Germany",
  "USA", "Ireland", "New Zealand", "France", "Other",
];

// WINNERS — on July 10 the team fills this in (lot number → prize),
// or the backend serves it. Any lot not listed here = no win.
export const WINNERS = {
  // "KTM-4821": "✈️ Free Flight Ticket",
  // "KTM-1093": "💻 Free Laptop",
  // "KTM-2277": "🛂 Free Visa Assistance",
};

// Is the campaign still within its active window?
export const isCampaignActive = () =>
  Date.now() < RESULTS_DATE.getTime() + CLAIM_WINDOW_DAYS * 864e5;

// Are winner results live yet?
export const resultsAreLive = () => Date.now() >= RESULTS_DATE.getTime();

// ── Backend hooks ───────────────────────────────────────────────
// saveEntry sends each registration to Supabase (the admin app reads
// it and the team is emailed). Entries are ALSO persisted to this
// browser's localStorage as a local fallback so the staff CSV survives
// a page refresh even if the network / Supabase is unavailable.
export function saveEntry(entry) {
  submitLuckyDrawEntry({
    lot_number: entry.lot,
    name: entry.name,
    age: entry.age,
    phone: entry.phone,
    email: entry.email,
    country: entry.country || null,
    course: entry.course || null,
  });
  if (import.meta.env.DEV) console.log("[luckydraw] entry saved:", entry);
}

export function sendConfirmationEmail(entry) {
  // Example (EmailJS):
  // return emailjs.send("service_id", "template_id", {
  //   to_email: entry.email, name: entry.name, lot: entry.lot,
  // });
  if (import.meta.env.DEV) console.log("[luckydraw] email queued to:", entry.email);
  return new Promise((res) => setTimeout(res, 900)); // simulated send
}
