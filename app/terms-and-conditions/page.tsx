import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using Menuvora ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Platform. These terms apply to all users, including visitors, registered users, and subscribers.`,
  },
  {
    title: "2. Description of Service",
    content: `Menuvora AI provides restaurant-focused digital services including but not limited to: restaurant website development, QR code menu solutions, interactive digital menus, online table reservation, WhatsApp ordering integration, SEO optimization, and custom restaurant software and management tools. The scope of services depends on the package or engagement you select.`,
  },
  {
    title: "3. Account Registration",
    content: `To access the Platform's features, you must register for an account. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized access to your account. Menuvora is not liable for any losses due to unauthorized account access.`,
  },
  {
    title: "4. Subscription and Billing",
    content: `Menuvora offers subscription plans billed on a monthly, quarterly, semi-annual, or annual basis. All prices are in Indian Rupees (INR) and inclusive of applicable taxes. Subscriptions auto-renew unless cancelled before the renewal date. You authorize us to charge your payment method for recurring subscription fees.`,
  },
  {
    title: "5. Acceptable Use",
    content: `You agree not to use the Platform to: (a) generate illegal, harmful, defamatory, or infringing content; (b) spam, phish, or engage in fraudulent activity; (c) violate any applicable laws or regulations; (d) interfere with the Platform's infrastructure or other users; (e) reverse engineer, copy, or redistribute the Platform's core technology.`,
  },
  {
    title: "6. Intellectual Property",
    content: `Content you provide — including your menu, branding, logos, images, and business information — remains your intellectual property. Upon full payment, ownership of the custom website and digital assets we build for you transfers to you. Menuvora retains ownership of its underlying frameworks, reusable components, tools, and brand. You grant Menuvora a limited license to use your content solely to deliver the service.`,
  },
  {
    title: "7. Content Accuracy",
    content: `You are responsible for providing accurate menu items, prices, descriptions, and business details, and for reviewing all content before it goes live. Menuvora is not liable for errors, outdated prices, or omissions in content supplied or approved by you. Menu and content updates are handled per the terms of your package or engagement.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by law, Menuvora and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform. Our total liability shall not exceed the amount paid by you in the three months preceding the claim.`,
  },
  {
    title: "9. Privacy",
    content: `Your use of the Platform is subject to our Privacy Policy, which is incorporated into these Terms by reference. By using the Platform, you consent to our collection and use of data as described in the Privacy Policy.`,
  },
  {
    title: "10. Modifications to Terms",
    content: `Menuvora reserves the right to modify these Terms at any time. We will notify users of material changes via email or in-app notification. Continued use of the Platform after changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana, India.`,
  },
  {
    title: "12. Contact",
    content: `For questions about these Terms, contact us at menuvoraai@gmail.com or write to: Menuvora AI Systems Pvt. Ltd., Plot No 90, 2nd Floor, Cabin No 1, Sector 14, Mehrauli Road, Gurugram, Haryana, India – 122001.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-[#8888aa]">
            Last updated: January 1, 2025 · Effective immediately
          </p>
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-6 sm:p-10 space-y-8">
          <p className="text-[#8888aa] leading-relaxed text-sm">
            Please read these Terms and Conditions carefully before using the
            Menuvora platform. These terms constitute a legally binding agreement
            between you and Menuvora AI Systems Pvt. Ltd.
          </p>

          {sections.map((section, i) => (
            <div key={i} className="border-t border-[rgba(99,102,241,0.1)] pt-8 first:border-0 first:pt-0">
              <h2 className="text-lg font-heading font-bold text-white mb-3">
                {section.title}
              </h2>
              <p className="text-sm text-[#8888aa] leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
