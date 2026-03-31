"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Heart, Target } from "lucide-react";
import Link from "next/link";

const TEAM_STATS = [
  { label: "Businesses Powered", value: "10,000+" },
  { label: "AI Outputs Generated", value: "2M+" },
  { label: "Countries Reached", value: "18" },
  { label: "Uptime", value: "99.9%" },
];

const VALUES = [
  {
    icon: Zap,
    title: "AI-First",
    description:
      "We believe every business deserves access to the power of artificial intelligence, not just the Fortune 500.",
  },
  {
    icon: Globe,
    title: "India-Built",
    description:
      "Built in India for the world. Priced for emerging markets, engineered for global scale.",
  },
  {
    icon: Heart,
    title: "Human-Centered",
    description:
      "AI should amplify human creativity, not replace it. We build tools that make you better at what you do.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We measure success by the growth of our customers, not by the features we ship.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Header */}
      <section className="relative pb-20">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="orb orb-purple w-96 h-96 top-0 right-0 opacity-20" />
        <div className="orb orb-accent w-64 h-64 bottom-0 left-0 opacity-15" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="badge bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold text-white mb-6">
              We're building the{" "}
              <span className="gradient-text">AI-first future</span>{" "}
              of business
            </h1>
            <p className="text-lg text-[#8888aa] leading-relaxed">
              Menuvora was born from a simple frustration: why do businesses
              need 12 different subscriptions to access AI tools that should
              all work together?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {TEAM_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="text-3xl font-heading font-bold gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-[#8888aa]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-heading font-bold text-white">
              The story behind Menuvora
            </h2>
            <div className="space-y-4 text-[#8888aa] leading-relaxed">
              <p>
                In 2023, our founding team was running a digital marketing
                agency in Bangalore. We were paying for ChatGPT, Midjourney,
                Jasper, HubSpot, Zapier, and five other tools — spending over
                ₹50,000 a month just to stay competitive.
              </p>
              <p>
                We knew small businesses, freelancers, and solo creators
                couldn't afford this. They were being left behind by the AI
                revolution simply because of pricing and complexity.
              </p>
              <p>
                So we built Menuvora — a unified AI Business OS that brings
                every tool a modern business needs into one affordable,
                easy-to-use platform. Built specifically for the Indian market,
                but designed to work globally.
              </p>
              <p>
                Today, Menuvora powers over 10,000 businesses across 18
                countries. Our mission is simple: make the power of AI
                accessible to every entrepreneur, creator, and business owner
                on the planet.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="orb orb-brand w-32 h-32 -top-8 -right-8 opacity-30" />
            <div className="relative">
              <span className="text-4xl mb-4 block">🎯</span>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                Our Mission
              </h3>
              <p className="text-[#8888aa] leading-relaxed">
                To make AI accessible, affordable, and actionable for every
                business — from a solo creator to a 100-person agency. We
                believe AI should be a superpower for everyone, not just the
                elite.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="orb orb-accent w-32 h-32 -top-8 -right-8 opacity-30" />
            <div className="relative">
              <span className="text-4xl mb-4 block">🌍</span>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                Our Vision
              </h3>
              <p className="text-[#8888aa] leading-relaxed">
                A world where every business, regardless of size or location, can
                compete at the highest level using AI. We're building toward
                a future where the next unicorn could come from a tier-3 city in
                India.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-white">
            What we stand for
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <value.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-white mb-1">
                  {value.title}
                </h3>
                <p className="text-sm text-[#8888aa] leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <div className="glass rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="orb orb-brand w-48 h-48 -top-10 -right-10 opacity-30" />
          <div className="relative">
            <h2 className="text-3xl font-heading font-bold text-white mb-3">
              Be part of the AI revolution
            </h2>
            <p className="text-[#8888aa] mb-6">
              Join 10,000+ businesses already using Menuvora.
            </p>
            <Link
              href="/checkout"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white"
            >
              Start for ₹100
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
