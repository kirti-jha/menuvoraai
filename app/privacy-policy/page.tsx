const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly: name, email address, phone number, billing information, and account preferences. We also automatically collect usage data including IP address, browser type, pages visited, time spent, and interaction data. For payment processing, we use Razorpay and do not store your card or UPI details directly.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to: (a) provide, operate, and improve the Platform; (b) process payments and manage your subscription; (c) send you service-related communications; (d) personalize your experience; (e) send marketing communications (which you can opt out of); (f) comply with legal obligations; (g) detect and prevent fraud or abuse.`,
  },
  {
    title: "3. Data Sharing",
    content: `We do not sell your personal data. We share data with: (a) service providers who assist in platform operations (cloud hosting, payment processing, email delivery); (b) analytics providers to understand usage patterns; (c) legal authorities when required by law. All third parties are bound by confidentiality agreements.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your personal data for as long as your account is active or as needed to provide services. You can request account deletion at any time. Post-deletion, we may retain anonymized data for analytics. Billing records are retained for 7 years as required by Indian financial regulations.`,
  },
  {
    title: "5. Cookies and Tracking",
    content: `We use cookies and similar technologies to maintain sessions, remember preferences, and analyze usage. Essential cookies are required for the Platform to function. Analytics cookies help us improve the service. You can control non-essential cookies through your browser settings.`,
  },
  {
    title: "6. AI and Content Processing",
    content: `Content you submit to AI tools is processed to generate outputs. We may use aggregated, anonymized prompts to improve our AI models. We do not share your specific prompts or outputs with other users or third parties. You retain ownership of your generated content.`,
  },
  {
    title: "7. Security",
    content: `We implement industry-standard security measures: SSL/TLS encryption, data encryption at rest, access controls, regular security audits, and PCI DSS compliance for payment data. No system is 100% secure; we encourage strong passwords and immediate reporting of suspicious activity.`,
  },
  {
    title: "8. Your Rights",
    content: `You have the right to: access your personal data, correct inaccurate data, delete your account and associated data, opt out of marketing communications, and data portability. To exercise these rights, email privacy@menuvora.in. We respond within 30 days.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Menuvora is not intended for users under 18 years of age. We do not knowingly collect data from minors. If we discover we have collected data from a minor, we will delete it immediately. Parents who believe their child has provided data to us should contact us immediately.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or in-app notification. The date at the top of this page indicates when the policy was last updated. Continued use of the Platform constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    content: `For privacy-related questions, email us at privacy@menuvora.in or contact: Data Protection Officer, Menuvora Technologies Pvt. Ltd., HSR Layout, Bangalore, Karnataka, India – 560102.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#8888aa]">
            Last updated: January 1, 2025 · We respect your privacy
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10 space-y-8">
          <p className="text-[#8888aa] leading-relaxed text-sm">
            At Menuvora, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our platform and services.
          </p>

          {sections.map((section, i) => (
            <div
              key={i}
              className="border-t border-[rgba(99,102,241,0.1)] pt-8 first:border-0 first:pt-0"
            >
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
