// Numeric, indicative annual ranges for the estimator (local currency).
// inrPerUnit = ROUGH conversion to INR — EDIT to current rate before launch.
export const estimatorData = {
  "United Kingdom": { cur: "£", inrPerUnit: 106, tuition: [11000, 38000], living: [9000, 15000], oneOff: 2500 },
  Canada: { cur: "CAD ", inrPerUnit: 61, tuition: [15000, 35000], living: [12000, 18000], oneOff: 3000 },
  Australia: { cur: "AUD ", inrPerUnit: 55, tuition: [20000, 45000], living: [21000, 29000], oneOff: 3500 },
  "United States": { cur: "USD ", inrPerUnit: 83, tuition: [20000, 55000], living: [12000, 20000], oneOff: 3000 },
  Ireland: { cur: "€", inrPerUnit: 90, tuition: [10000, 25000], living: [11000, 15000], oneOff: 2500 },
  Germany: { cur: "€", inrPerUnit: 90, tuition: [0, 20000], living: [11000, 14000], oneOff: 2500 },
  "New Zealand": { cur: "NZD ", inrPerUnit: 50, tuition: [22000, 40000], living: [18000, 25000], oneOff: 3000 },
};

export const lifestyleFactor = { Budget: 0.85, Moderate: 1.0, Comfortable: 1.2 };
