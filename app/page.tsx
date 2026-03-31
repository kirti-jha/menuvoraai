"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PlanSelector } from "@/components/PlanSelector";
import {
  FEATURES,
  PRICING_PLANS,
  TESTIMONIALS,
  USE_CASES,
  HOW_IT_WORKS,
} from "@/lib/data";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="orb orb-brand w-[600px] h-[600px] top-[-100px] left-[-150px] opacity-30" />
        <div className="orb orb-accent w-[400px] h-[400px] bottom-[50px] right-[-100px] opacity-20" />
        <div className="orb orb-purple w-[300px] h-[300px] top-[30%] right-[20%] opacity-20" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center py-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-[#8888aa]">
              Now live — AI Business OS for India
            </span>
            <ChevronRight className="w-4 h-4 text-[#8888aa]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold leading-[1.05] mb-6"
          >
            Run Your Entire{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">Business with AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#8888aa] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Content, Leads, Automation & Sales — All in One Platform.
            <br className="hidden sm:block" />
            Built for creators, freelancers, startups, and agencies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/checkout"
              className="btn-shimmer px-8 py-4 rounded-xl text-base font-semibold text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Start for ₹100
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#pricing"
              className="px-8 py-4 rounded-xl text-base font-medium glass-light text-white hover:border-indigo-500/40 transition-colors w-full sm:w-auto text-center"
            >
              View Plans
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16"
          >
            {[
              { icon: Shield, label: "Secure Payments" },
              { icon: Zap, label: "Instant Access" },
              { icon: TrendingUp, label: "10x Your Output" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-[#8888aa]"
              >
                <Icon className="w-4 h-4 text-indigo-400" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* Hero dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="glass rounded-3xl p-4 sm:p-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="ml-2 flex-1 h-7 glass-light rounded-lg" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Content Generated", value: "24.8K", change: "+12%" },
                  { label: "Leads Found", value: "1,240", change: "+34%" },
                  { label: "Revenue Impact", value: "₹4.2L", change: "+89%" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-light rounded-2xl p-4">
                    <p className="text-xs text-[#8888aa] mb-1">{stat.label}</p>
                    <p className="text-xl font-heading font-bold text-white">
                      {stat.value}
                    </p>
                    <span className="text-xs text-emerald-400">
                      {stat.change} this month
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="glass-light rounded-2xl p-4 col-span-2 sm:col-span-1">
                  <p className="text-xs text-[#8888aa] mb-3">AI Activity</p>
                  <div className="space-y-2">
                    {[
                      { label: "Blog generated", time: "2m ago", icon: "✍️" },
                      { label: "Image created", time: "5m ago", icon: "🎨" },
                      { label: "Lead captured", time: "8m ago", icon: "🎯" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span>{item.icon}</span>
                        <span className="text-[#ccccdd] flex-1">
                          {item.label}
                        </span>
                        <span className="text-[#8888aa]">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-light rounded-2xl p-4 hidden sm:block">
                  <p className="text-xs text-[#8888aa] mb-3">Credits Used</p>
                  <div className="space-y-2">
                    {[
                      { label: "Content", pct: 72 },
                      { label: "Images", pct: 45 },
                      { label: "Video", pct: 28 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#8888aa]">{item.label}</span>
                          <span className="text-white">{item.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Glow under mockup */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a14] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              AI Tools
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Everything your business needs
            </h2>
            <p className="text-[#8888aa] max-w-xl mx-auto">
              A complete suite of AI-powered tools to replace a dozen separate
              subscriptions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section relative">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge bg-accent/10 text-accent border border-accent/20 mb-4">
              Who It's For
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Built for builders
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl p-6 card-hover bg-gradient-to-br ${uc.gradient}`}
              >
                <div className="text-4xl mb-4">{uc.icon}</div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-[#8888aa] leading-relaxed">
                  {uc.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
              Simple Setup
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Up and running in minutes
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-indigo-500/40 to-transparent -translate-y-1/2 ml-2" />
                  )}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#8888aa] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section relative">
        <div className="orb orb-brand w-[500px] h-[500px] top-0 left-[-200px] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Start at just ₹100
            </h2>
            <p className="text-[#8888aa] mb-8">
              No lock-in. Upgrade or cancel anytime.
            </p>
            <PlanSelector />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section relative">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Loved by thousands
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 sm:p-16 relative overflow-hidden"
          >
            <div className="orb orb-brand w-64 h-64 top-[-80px] right-[-80px] opacity-40" />
            <div className="orb orb-accent w-48 h-48 bottom-[-60px] left-[-60px] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
                Start Using AI to Grow{" "}
                <span className="gradient-text">Your Business Today</span>
              </h2>
              <p className="text-[#8888aa] mb-8 text-lg">
                Join thousands of businesses already using Menuvora.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/checkout"
                  className="btn-shimmer px-8 py-4 rounded-xl text-base font-semibold text-white flex items-center gap-2 justify-center"
                >
                  Start for ₹100
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#pricing"
                  className="px-8 py-4 rounded-xl text-base font-medium glass-light text-white text-center"
                >
                  Upgrade Anytime
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
