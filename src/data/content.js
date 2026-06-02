import {
  FiCompass, FiAward, FiFileText, FiCreditCard, FiHome, FiShield,
  FiUsers, FiTrendingUp, FiClock, FiHeart,
} from "react-icons/fi";

export const services = [
  { icon: FiCompass, title: "Free Counselling", desc: "One-to-one guidance to match your profile, budget and goals to the right course and country." },
  { icon: FiAward, title: "University Selection", desc: "Shortlists built around your academics, finances and long-term career and PR plans." },
  { icon: FiFileText, title: "Admissions & SOP", desc: "Application drafting, statement of purpose support, and document checks end to end." },
  { icon: FiShield, title: "Visa Support", desc: "Financial documentation, interview preparation and filing — with a strong success record." },
  { icon: FiCreditCard, title: "Education Loans", desc: "Help comparing lenders and assembling a clean, lender-ready loan file." },
  { icon: FiHome, title: "Accommodation & Arrival", desc: "Safe housing options, airport pickup and post-arrival settling-in support." },
];

export const whyChooseUs = [
  { icon: FiUsers, title: "Personalised counselling", desc: "Experienced consultants who plan around you — not a one-size template." },
  { icon: FiAward, title: "Trusted university network", desc: "Direct routes to leading universities across seven study destinations." },
  { icon: FiShield, title: "Strong visa record", desc: "Meticulous documentation that gives your application its best shot." },
  { icon: FiClock, title: "Fast turnaround", desc: "Quick application processing and offer-letter follow-up." },
  { icon: FiHeart, title: "Student benefits", desc: "Welcome perks and genuine support — no hidden surprises." },
  { icon: FiTrendingUp, title: "End-to-end support", desc: "From first call to first day on campus, one team has your back." },
];

export const journey = [
  { step: "01", title: "Free consultation", desc: "We understand your goals, grades and budget, and map realistic options." },
  { step: "02", title: "Shortlist & apply", desc: "Choose universities together, then we handle applications and your SOP." },
  { step: "03", title: "Offers & finance", desc: "Receive offers, plan funding, and prepare loan and financial documents." },
  { step: "04", title: "Visa & departure", desc: "File a strong visa application, prep for interviews, and sort travel." },
  { step: "05", title: "Arrival & beyond", desc: "Accommodation, airport pickup and settling-in — we stay with you." },
];

// Sample testimonials carried over from the existing site.
// TODO: replace with verified Google reviews before launch.
export const testimonials = [
  { name: "Rahul S.", course: "MSc · Canada", text: "Cosco made my Canada admission completely smooth. The support was excellent from the first call to landing in Toronto." },
  { name: "Anjali P.", course: "MS · UK", text: "They guided me through every step of the visa process. Professional, patient and genuinely trustworthy." },
  { name: "Akhil K.", course: "MBA · Australia", text: "Got my offer letter quickly and the whole process felt stress-free. Highly recommended for anyone in Kerala." },
  { name: "Meera T.", course: "BSc Nursing · UK", text: "Honest advice about cost and work options. They never oversold — that's why I trusted them." },
];

export const faqs = [
  { q: "How much does it cost to study abroad?", a: "It depends on the country, university and city. Use our estimator below for an indicative figure, then we confirm exact numbers for your shortlist during a free consultation." },
  { q: "Do you charge for counselling?", a: "Your first counselling session is free. We're transparent about any service fees before you commit to anything." },
  { q: "Which countries do you cover?", a: "The UK, Canada, Australia, USA, Ireland, Germany and New Zealand — with the most popular routes for Kerala students." },
  { q: "Can you help with education loans?", a: "Yes. We help you compare lenders and put together a clean, lender-ready file to improve approval chances." },
  { q: "What if my visa is refused?", a: "We build applications carefully to minimise that risk, and if a refusal happens we review the reasons and plan the strongest possible reapplication." },
];
