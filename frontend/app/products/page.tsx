"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FEATURES } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FILTERS = ["all", "basic", "pro", "business"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_LABELS: Record<Filter, string> = {
  all: "All Services",
  basic: "Website",
  pro: "Website + QR Menu",
  business: "Custom",
};

const PLAN_COLORS: Record<string, string> = {
  basic: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  pro: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  business: "bg-purple-500/15 text-purple-300 border-purple-500/30",
};

const PLAN_LABELS: Record<string, string> = {
  basic: "Website",
  pro: "QR Menu",
  business: "Custom",
};

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered =
    activeFilter === "all"
      ? FEATURES
      : FEATURES.filter((f) => f.plans.includes(activeFilter));

  return (
    <div className="min-h-screen pt-28">
      {/* Header */}
      <section className="relative pb-16">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="orb orb-brand w-96 h-96 top-0 right-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              Our Services
            </span>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold text-white mb-4">
              Restaurant{" "}
              <span className="gradient-text">Digital</span> Solutions
            </h1>
            <p className="text-[#8888aa] text-lg max-w-xl mx-auto">
              Everything you need to take your restaurant online and grow.
              Filter by package to see what's included.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border",
                activeFilter === f
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                  : "glass-light text-[#8888aa] border-white/10 hover:text-white"
              )}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((feature, i) => (
            <motion.div
              key={feature.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 card-hover group relative overflow-hidden"
            >
              {/* Glow */}
              <div
                className={cn(
                  "absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-15 transition-opacity duration-500",
                  feature.color
                )}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl mb-4 shadow-lg",
                    feature.color
                  )}
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#8888aa] leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Plans */}
                <div className="flex flex-wrap gap-1.5">
                  {feature.plans.map((plan) => (
                    <span
                      key={plan}
                      className={cn(
                        "badge text-[10px] border",
                        PLAN_COLORS[plan]
                      )}
                    >
                      <Check className="w-3 h-3" />
                      {PLAN_LABELS[plan] ?? plan}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-[#8888aa]">
            No services found for this filter.
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <div className="glass rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="orb orb-brand w-48 h-48 -top-10 -left-10 opacity-30" />
          <div className="relative">
            <h2 className="text-3xl font-heading font-bold text-white mb-3">
              Ready to take your restaurant online?
            </h2>
            <p className="text-[#8888aa] mb-6">
              Start with a website from just ₹100 and add QR menus and custom
              tools as you grow.
            </p>
            <Link
              href="/checkout"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
