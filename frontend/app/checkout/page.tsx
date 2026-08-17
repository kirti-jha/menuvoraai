"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, Lock, ChevronRight, ArrowLeft, Zap } from "lucide-react";
import { useStore } from "@/lib/store";
import { PRICING_PLANS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STEPS = ["Select Plan", "Your Details", "Payment", "Confirmation"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                i + 1 < current
                  ? "bg-emerald-500 text-white"
                  : i + 1 === current
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "glass-light text-[#8888aa]"
              )}
            >
              {i + 1 < current ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span
              className={cn(
                "hidden sm:block text-xs font-medium",
                i + 1 === current ? "text-white" : "text-[#8888aa]"
              )}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "w-8 h-px transition-all",
                i + 1 < current ? "bg-emerald-500" : "bg-[rgba(99,102,241,0.2)]"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1 – Plan Selection
function StepPlan({ onNext }: { onNext: () => void }) {
  const { selectedPlan, billingPeriod, selectPlan } = useStore();

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Choose your plan</h2>
      <p className="text-[#8888aa] mb-8">You can upgrade or downgrade anytime.</p>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {PRICING_PLANS.map((plan) => {
          const price = plan.prices[billingPeriod];
          const isSelected = selectedPlan === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => selectPlan(plan.id as any, price.amount, plan.name)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all",
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                  : "border-[rgba(99,102,241,0.2)] glass-light hover:border-indigo-500/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                      isSelected
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-[#8888aa]"
                    )}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white">
                        {plan.name}
                      </span>
                      {plan.popular && (
                        <span className="badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px]">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#8888aa]">{plan.tagline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-heading font-bold text-white">
                    {price.label}
                  </p>
                  <p className="text-xs text-[#8888aa]">/{billingPeriod}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={!selectedPlan}
        className={cn(
          "w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
          selectedPlan
            ? "btn-shimmer text-white shadow-lg shadow-indigo-500/20"
            : "bg-white/5 text-[#8888aa] cursor-not-allowed"
        )}
      >
        Continue <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// Step 2 – User Details
function StepDetails({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { name, email, phone, setUserDetails } = useStore();
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(phone);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!localName.trim()) errs.name = "Name is required";
    if (!localEmail.trim() || !/\S+@\S+\.\S+/.test(localEmail))
      errs.email = "Valid email is required";
    if (!localPhone.trim() || localPhone.length < 10)
      errs.phone = "Valid phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setUserDetails(localName, localEmail, localPhone);
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Your details</h2>
      <p className="text-[#8888aa] mb-8">We'll use this to set up your account.</p>
      <div className="space-y-4 mb-6">
        {[
          { id: "name", label: "Full Name", placeholder: "Arjun Sharma", value: localName, setter: setLocalName, type: "text" },
          { id: "email", label: "Email Address", placeholder: "arjun@example.com", value: localEmail, setter: setLocalEmail, type: "email" },
          { id: "phone", label: "Phone Number", placeholder: "+91 98765 43210", value: localPhone, setter: setLocalPhone, type: "tel" },
        ].map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-[#ccccdd] mb-1.5">
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl glass-light text-white placeholder-[#8888aa] text-sm border transition-all",
                errors[field.id]
                  ? "border-red-500/50"
                  : "border-[rgba(99,102,241,0.2)] focus:border-indigo-500/60"
              )}
            />
            {errors[field.id] && (
              <p className="text-xs text-red-400 mt-1">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl glass-light text-[#8888aa] hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 btn-shimmer py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Step 3 – Payment
function StepPayment({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { planName, planAmount, name, email } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://menuvoraai-backend.vercel.app/api";
      const res = await fetch(`${apiBase}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName, amount: planAmount, name, email }),
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(() => {
          setLoading(false);
          onNext();
        }, 1500);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Payment</h2>
      <p className="text-[#8888aa] mb-8">Secure checkout powered by Razorpay.</p>

      {/* Payment method selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {(["upi", "card", "netbanking"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setPaymentMethod(m)}
            className={cn(
              "py-3 rounded-xl text-sm font-medium border transition-all capitalize",
              paymentMethod === m
                ? "border-indigo-500 bg-indigo-500/10 text-white"
                : "glass-light border-[rgba(99,102,241,0.2)] text-[#8888aa] hover:text-white"
            )}
          >
            {m === "upi" ? "UPI" : m === "card" ? "Card" : "Net Banking"}
          </button>
        ))}
      </div>

      {/* Payment form */}
      <div className="glass-light rounded-2xl p-5 mb-5 border border-[rgba(99,102,241,0.2)]">
        {paymentMethod === "upi" && (
          <div>
            <label className="block text-sm font-medium text-[#ccccdd] mb-2">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="yourname@upi"
              className="w-full px-4 py-3 rounded-xl glass text-white placeholder-[#8888aa] text-sm border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/60"
            />
          </div>
        )}
        {paymentMethod === "card" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[#ccccdd] mb-2">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-xl glass text-white placeholder-[#8888aa] text-sm border border-[rgba(99,102,241,0.2)]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#ccccdd] mb-2">Expiry</label>
                <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl glass text-white placeholder-[#8888aa] text-sm border border-[rgba(99,102,241,0.2)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#ccccdd] mb-2">CVV</label>
                <input type="text" placeholder="•••" className="w-full px-4 py-3 rounded-xl glass text-white placeholder-[#8888aa] text-sm border border-[rgba(99,102,241,0.2)]" />
              </div>
            </div>
          </div>
        )}
        {paymentMethod === "netbanking" && (
          <div>
            <label className="block text-sm font-medium text-[#ccccdd] mb-3">Select Bank</label>
            <div className="grid grid-cols-2 gap-2">
              {["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank"].map((bank) => (
                <button key={bank} className="py-2.5 px-3 glass rounded-xl text-sm text-[#8888aa] hover:text-white border border-[rgba(99,102,241,0.2)] hover:border-indigo-500/50 transition-all text-left">
                  {bank}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {[
          { icon: Shield, label: "256-bit SSL" },
          { icon: Lock, label: "PCI DSS Compliant" },
          { icon: Check, label: "Secure Checkout" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-[#8888aa]">
            <Icon className="w-3.5 h-3.5 text-emerald-400" />
            {label}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl glass-light text-[#8888aa] hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handlePay}
          disabled={loading}
          className="flex-1 btn-shimmer py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Processing…
            </span>
          ) : (
            <>Pay ₹{planAmount.toLocaleString("en-IN")} <Lock className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}

// Step 4 – Confirmation
function StepConfirmation() {
  const { planName, planAmount, name, reset } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6"
    >
      <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-emerald-400" />
      </div>
      <h2 className="text-3xl font-heading font-bold text-white mb-2">
        You're in! 🎉
      </h2>
      <p className="text-[#8888aa] mb-6">
        Welcome to Menuvora, {name}. Your{" "}
        <span className="text-indigo-400 font-semibold">{planName} plan</span> is
        now active.
      </p>
      <div className="glass-light rounded-2xl p-5 text-left mb-8 border border-emerald-500/20">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#8888aa]">Plan</span>
            <span className="text-white font-medium">{planName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8888aa]">Amount Paid</span>
            <span className="text-emerald-400 font-medium">
              ₹{planAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8888aa]">Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Active
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-[#8888aa] mb-6">
        A confirmation email has been sent. Check your inbox to access your dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          onClick={reset}
          className="btn-shimmer px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2 justify-center"
        >
          <Zap className="w-4 h-4" /> Go to Dashboard
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl glass-light text-[#8888aa] hover:text-white transition-colors text-sm text-center"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}

// Order Summary sidebar
function OrderSummary() {
  const { selectedPlan, billingPeriod, planAmount, planName } = useStore();
  const plan = PRICING_PLANS.find((p) => p.id === selectedPlan);

  return (
    <div className="glass rounded-2xl p-6 sticky top-28">
      <h3 className="font-heading font-bold text-white mb-5">Order Summary</h3>
      {plan ? (
        <div className="space-y-4">
          <div className="glass-light rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-white">{planName} Plan</p>
                <p className="text-xs text-[#8888aa] capitalize">{billingPeriod} billing</p>
              </div>
              <p className="text-lg font-bold text-white">
                ₹{planAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {plan.features.slice(0, 4).map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-[#8888aa]">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="flex justify-between text-sm">
            <span className="text-[#8888aa]">Total</span>
            <span className="font-bold text-white">
              ₹{planAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-xs text-[#8888aa]">
            Refundable within 7 days.{" "}
            <Link href="/refund-policy" className="text-indigo-400 hover:underline">
              Refund Policy
            </Link>
          </p>
        </div>
      ) : (
        <p className="text-sm text-[#8888aa]">Select a plan to see your summary.</p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { checkoutStep, setCheckoutStep } = useStore();

  const next = () => setCheckoutStep(Math.min(checkoutStep + 1, 4));
  const back = () => setCheckoutStep(Math.max(checkoutStep - 1, 1));

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">
            Get Started with{" "}
            <span className="gradient-text">Menuvora</span>
          </h1>
          <p className="text-[#8888aa]">
            Instant access. Cancel anytime.
          </p>
        </div>

        <StepIndicator current={checkoutStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={checkoutStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {checkoutStep === 1 && <StepPlan onNext={next} />}
                  {checkoutStep === 2 && <StepDetails onNext={next} onBack={back} />}
                  {checkoutStep === 3 && <StepPayment onNext={next} onBack={back} />}
                  {checkoutStep === 4 && <StepConfirmation />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
