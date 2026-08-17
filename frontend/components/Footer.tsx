import Link from "next/link";
import { Zap } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { label: "Our Services", href: "/products" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About", href: "/about" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[rgba(99,102,241,0.15)] bg-[#0a0a14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-heading font-bold">
                Menu<span className="gradient-text">vora</span>
              </span>
            </Link>
            <p className="text-sm text-[#8888aa] leading-relaxed max-w-xs">
              Helping restaurants grow with smart websites, QR menu solutions,
              and custom digital tools across India.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-heading font-bold text-white mb-4 uppercase tracking-wider">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8888aa] hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mt-12 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8888aa]">
            © {new Date().getFullYear()} Menuvora AI Systems Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
            <span className="text-sm text-[#8888aa]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
