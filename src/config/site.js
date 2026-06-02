// ──────────────────────────────────────────────────────────────
// Single source of truth for brand + contact details.
// Edit values here and they update everywhere on the site.
// ──────────────────────────────────────────────────────────────
export const site = {
  name: "Cosco Overseas Education",
  shortName: "Cosco Overseas",
  tagline: "Your global education journey starts here",
  founder: "Ben Jaison",
  phone: "+917902844844",
  phoneDial: "+917902844844",
  whatsapp: "917902844844",
  email: "info@coscoedu.com",
  address: {
    line: "Kottayam, Kerala, India",
    locality: "Kottayam",
    region: "Kerala",
    mapsQuery: "9.5951504,76.5291046",
  },
  social: {
    instagram: "https://www.instagram.com/cosco_overseas_education_?igsh=a244bjlhNXhiMHZr",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    linkedin: "https://www.linkedin.com/company/115862933/admin/inbox?lipi=urn%3Ali%3Apage%3Ad_flagship3_messaging_conversation_detail%3B%2FbwJSrFdScqyzIKC6QGKrw%3D%3D",
  },
};

export const whatsappLink = () =>
  'https://wa.me/message/A3MRTASHMFEOE1';

// Headline metrics. TODO: replace with verified figures before launch.
export const metrics = [
  { value: 1200, suffix: "+", label: "Students guided" },
  { value: 98, suffix: "%", label: "Visa success rate" },
  { value: 50, suffix: "+", label: "Partner universities" },
  { value: 7, suffix: "", label: "Countries served" },
];
