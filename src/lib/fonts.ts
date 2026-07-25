import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Display face — used for headings, hero copy, and anywhere the brand's
 * personality should show through. Confident and warm without feeling
 * cold or purely corporate.
 */
export const fontDisplay = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

/**
 * Body face — used for paragraphs, form fields, and UI text. Chosen for
 * legibility at small sizes, which matters when displaying medication
 * names, dosages, and instructions.
 */
export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

/**
 * Utility/mono face — used for prescription numbers, order IDs, dates,
 * and anything that benefits from fixed-width alignment.
 */
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});
