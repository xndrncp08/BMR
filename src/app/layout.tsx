import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BMR Pharmacy",
  description:
    "BMR Pharmacy — trusted prescriptions, expert consultations, and wellness products for your community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
