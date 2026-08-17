import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Restaurant Website Development & QR Menu Solutions | Menuvora AI",
  description:
    "Menuvora AI builds professional restaurant websites, QR code menu systems, and custom digital solutions for restaurants. Trusted by businesses including Shree Ram Dhaba, HR26 Dhaba, and Kake Da Hotel Delhi.",
  keywords: [
    "restaurant website development",
    "QR code menu",
    "digital menu",
    "restaurant website",
    "online table reservation",
    "restaurant SEO",
    "custom restaurant software",
  ],
  openGraph: {
    title: "Restaurant Website Development & QR Menu Solutions | Menuvora AI",
    description:
      "Menuvora AI builds professional restaurant websites, QR code menu systems, and custom digital solutions for restaurants.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#0a0a14] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
