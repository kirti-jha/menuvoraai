"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Heart, Target } from "lucide-react";
import Link from "next/link";

const TEAM_STATS = [
  { label: "Restaurants Served", value: "50+" },
  { label: "Menus Digitized", value: "100+" },
  { label: "Cities Reached", value: "12" },
  { label: "Uptime", value: "99.9%" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "We get your restaurant online quickly, with fast-loading, secure websites and QR menus that are ready to serve customers.",
  },
  {
    icon: Globe,
    title: "Mobile-First",
    description:
      "Most diners find you on their phone. Every site we build is designed mobile-first, then scaled up beautifully to desktop.",
  },
  {
    icon: Heart,
    title: "Made for Restaurants",
    description:
      "From cafés to dhabas to cloud kitchens, we build around how your restaurant actually operates — not a generic template.",
  },
  {
    icon: Target,
    title: "Growth-Driven",
    description:
      "SEO, reservations, and QR menus that drive real footfall and orders. We measure success by your restaurant's growth.",
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
              We help restaurants{" "}
              <span className="gradient-text">grow online</span>
            </h1>
            <p className="text-lg text-[#8888aa] leading-relaxed">
              Menuvora AI specializes in building high-performance restaurant
              websites and digital QR menu solutions that increase visibility,
              improve customer experience, and streamline daily operations.
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
                The restaurant industry has become increasingly digital.
                Customers now expect to browse menus, place orders, and interact
                with restaurants online before they ever walk through the door.
              </p>
              <p>
                Many restaurants — from local cafés and dhabas to cloud kitchens
                and food chains — were being left behind simply because building
                a proper website or digital menu felt expensive and complicated.
              </p>
              <p>
                So we built Menuvora AI: a team focused on restaurant website
                development, smart QR code menus, and custom digital solutions.
                Every project is built around the restaurant's branding,
                workflow, and customer experience goals.
              </p>
              <p>
                Today we've delivered customized digital solutions for
                restaurants including Shree Ram Dhaba, HR26 Dhaba, and Kake Da
                Hotel, Delhi — helping them serve customers better and grow
                their business online.
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
                To make professional websites and digital menus accessible and
                affordable for every restaurant — from a small café to an
                established food chain — so they can compete and grow online.
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
                A world where every restaurant — regardless of size or location —
                has a modern digital presence: a fast website, an easy QR menu,
                and the tools to serve customers better every single day.
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
              Ready to digitize your restaurant?
            </h2>
            <p className="text-[#8888aa] mb-6">
              Let's build your website and QR menu. Start from just ₹100.
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
