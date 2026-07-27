export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

// Note: /prescriptions/refill doesn't exist yet — it's built in Milestone 9.
// Linking to it now is intentional; it'll 404 until then, which is expected.
export const REFILL_CTA: NavLink = {
  label: "Refill Prescription",
  href: "/prescriptions/refill",
};
