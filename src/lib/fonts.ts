import { Plus_Jakarta_Sans, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Display face — headings, hero copy, prices, and anywhere the brand's
 * personality should show through. Plus Jakarta Sans has open, friendly
 * curves that keep a clinical subject feeling approachable, and it holds
 * up well at tight tracking for large headlines.
 */
export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

/**
 * Body face — paragraphs, form fields, and UI text. Chosen for legibility
 * at small sizes, which matters when displaying medication names,
 * dosages, and instructions.
 */
export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Utility/mono face — prescription numbers, order IDs, dates, and anything
 * that benefits from fixed-width alignment.
 */
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});
