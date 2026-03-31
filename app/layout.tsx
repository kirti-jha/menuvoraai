import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Menuvora – AI Business OS",
  description:
    "Run your entire business with AI. Content, Leads, Automation & Sales — All in One Platform.",
  keywords: [
    "AI tools",
    "AI business",
    "content generator",
    "lead generation",
    "automation",
    "SaaS",
  ],
  openGraph: {
    title: "Menuvora – AI Business OS",
    description:
      "Run your entire business with AI. Content, Leads, Automation & Sales — All in One Platform.",
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
