"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { useStore, BillingPeriod } from "@/lib/store";
import { cn } from "@/lib/utils";

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  prices: Record<string, { amount: number; label: string }>;
  popular: boolean;
  color: string;
  features: string[];
  cta: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  delay?: number;
}

export function PricingCard({ plan, delay = 0 }: PricingCardProps) {
  const { billingPeriod, selectPlan } = useStore();
  const price = plan.prices[billingPeriod as BillingPeriod];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative rounded-3xl p-px overflow-hidden",
        plan.popular
          ? "shadow-2xl shadow-indigo-500/20"
          : ""
      )}
    >
      {/* Border gradient for popular */}
      {plan.popular && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent rounded-3xl" />
      )}

      <div
        className={cn(
          "relative rounded-3xl p-6 h-full flex flex-col",
          plan.popular
            ? "bg-[#16162a]"
            : "glass"
        )}
      >
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-b-xl">
              <Zap className="w-3 h-3" />
              Most Popular
            </div>
          </div>
        )}

        <div className="mt-4">
          {/* Plan name */}
          <div
            className={cn(
              "inline-flex items-center gap-1.5 badge mb-3",
              plan.popular
                ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                : "bg-white/5 text-[#8888aa] border border-white/10"
            )}
          >
            {plan.name}
          </div>

          <p className="text-xs text-[#8888aa] mb-4">{plan.tagline}</p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-heading font-bold text-white">
                {price.label}
              </span>
              <span className="text-[#8888aa] text-sm mb-1.5">
                /{billingPeriod === "monthly" ? "mo" : billingPeriod === "quarterly" ? "3mo" : billingPeriod === "halfyearly" ? "6mo" : "yr"}
              </span>
            </div>
            {billingPeriod !== "monthly" && (
              <p className="text-xs text-emerald-400 mt-1">
                Billed {billingPeriod === "quarterly" ? "every 3 months" : billingPeriod === "halfyearly" ? "every 6 months" : "yearly"}
              </p>
            )}
          </div>

          {/* CTA */}
          <Link
            href="/checkout"
            onClick={() => selectPlan(plan.id as any, price.amount, plan.name)}
            className={cn(
              "block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200",
              plan.popular
                ? "btn-shimmer text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
            )}
          >
            {plan.cta}
          </Link>

          {/* Divider */}
          <div className="divider my-5" />

          {/* Features */}
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[#ccccdd]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
