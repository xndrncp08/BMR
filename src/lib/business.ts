/**
 * Single source of truth for BMR Pharmacy's contact details, so the
 * header, footer, contact page, and CTAs never drift out of sync.
 */
export const BUSINESS = {
  name: "BMR Pharmacy",
  founded: 2019,
  founder: "Bethel Ann Tiratira, RPh",
  phone: { display: "+63 975 373 7338", href: "tel:+639753737338" },
  email: { display: "info@bmrpharmacy.com", href: "mailto:info@bmrpharmacy.com" },
  address: {
    street: "81 T. Claudio Street, Barangay San Juan Poblacion",
    city: "Morong, Rizal 1960, Philippines",
    short: "Morong, Rizal",
    landmark:
      "Near Namay Bridge, across from Let's Buy, ground floor below Beauty by Zcharina Aesthetic Clinic",
  },
  hours: { short: "Open 24/7", long: "Open 24 hours, Monday to Sunday" },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("BMR Pharmacy, 81 T. Claudio Street, Morong, Rizal"),
} as const;
