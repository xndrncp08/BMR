import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BMR Pharmacy — Your community pharmacy in Morong, Rizal",
    template: "%s — BMR Pharmacy",
  },
  description:
    "BMR Pharmacy — trusted prescriptions, expert consultations, and wellness products for your community. Open 24 hours in Morong, Rizal.",
};

export const viewport: Viewport = {
  themeColor: "#062a1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body className="flex min-h-screen flex-col font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-primary-700 focus:px-4 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lift"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
