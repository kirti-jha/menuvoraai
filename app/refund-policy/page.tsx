import Link from "next/link";
import { Check, X } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-[#8888aa]">
            Last updated: January 1, 2025 · Fair and transparent
          </p>
        </div>

        <div className="space-y-6">
          {/* Key summary */}
          <div className="glass rounded-3xl p-6 sm:p-8 border border-emerald-500/20">
            <h2 className="text-xl font-heading font-bold text-white mb-6">
              Quick Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                  What we refund
                </p>
                {[
                  "Requests within 3–7 days of payment",
                  "Technical issues preventing access",
                  "Accidental duplicate payments",
                  "Service outages over 24 hours",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-[#ccccdd]">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-red-400 uppercase tracking-wider">
                  What we don't refund
                </p>
                {[
                  "Requests after 7 days of billing",
                  "Partial month usage",
                  "Violation of Terms of Service",
                  "Change of mind after heavy usage",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-[#ccccdd]">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full policy */}
          <div className="glass rounded-3xl p-6 sm:p-10 space-y-8">
            {[
              {
                title: "1. Subscription Refund Window",
                content: `Menuvora operates on a subscription basis. All subscription plans — Basic, Pro, and Business — are eligible for a refund if requested within 3 to 7 calendar days of the original payment date. This refund window applies to your first payment on each plan. Renewal payments are not eligible for refunds once processed.`,
              },
              {
                title: "2. Eligibility for Refund",
                content: `To be eligible for a refund, you must: (a) submit a refund request within the 3–7 day window; (b) have used fewer than 20% of your monthly AI credits; (c) not have violated our Terms and Conditions; (d) contact us at refunds@menuvora.in with your registered email and order ID.`,
              },
              {
                title: "3. How to Request a Refund",
                content: `Email refunds@menuvora.in with subject line "Refund Request – [Your Order ID]". Include your registered email address, the plan you purchased, date of payment, and reason for the refund request. We aim to acknowledge all refund requests within 24 hours and process approved refunds within 5–7 business days.`,
              },
              {
                title: "4. Refund Processing",
                content: `Approved refunds will be credited to the original payment method (UPI, bank account, or credit/debit card) within 5–7 business days after approval. Processing times may vary depending on your bank or payment provider. You will receive an email confirmation once the refund is initiated.`,
              },
              {
                title: "5. Plan Upgrades and Downgrades",
                content: `When you upgrade your plan, you will be charged the prorated difference for the remainder of your billing period. When you downgrade, you will receive prorated credit applied to your next billing cycle. No cash refunds are issued for downgrades within an active billing period.`,
              },
              {
                title: "6. Annual and Multi-Month Plans",
                content: `For quarterly, semi-annual, or annual plans, refunds are only available within the first 7 days of the initial payment. After 7 days, you may cancel to stop future renewals, but no partial refund will be issued for the remaining subscription period. The exception is technical service failures lasting over 48 consecutive hours.`,
              },
              {
                title: "7. Service Credits",
                content: `In lieu of a cash refund, Menuvora may offer service credits at its discretion. Service credits can be applied to future subscription payments and do not expire while your account is active. Credits have no cash value.`,
              },
              {
                title: "8. Contact for Refund Disputes",
                content: `If your refund request is denied and you believe this decision is in error, you may escalate by emailing grievance@menuvora.in. All escalations are reviewed by our billing team within 5 business days.`,
              },
            ].map((section, i) => (
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

          {/* CTA */}
          <div className="glass rounded-2xl p-6 text-center border border-indigo-500/20">
            <p className="text-[#8888aa] text-sm mb-4">
              Have a refund question?{" "}
              <Link href="/contact" className="text-indigo-400 hover:underline">
                Contact our support team
              </Link>{" "}
              and we'll resolve it promptly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 btn-shimmer px-6 py-3 rounded-xl text-sm font-semibold text-white"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
