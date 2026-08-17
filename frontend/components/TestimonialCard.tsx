"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  review: string;
  rating: number;
  plan: string;
  delay?: number;
}

export function TestimonialCard({
  name,
  role,
  avatar,
  review,
  rating,
  plan,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 card-hover flex flex-col gap-4"
    >
      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Review */}
      <p className="text-sm text-[#ccccdd] leading-relaxed flex-1">
        &ldquo;{review}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[rgba(99,102,241,0.15)]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-xs text-[#8888aa]">{role}</p>
        </div>
        <span className="ml-auto badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px]">
          {plan}
        </span>
      </div>
    </motion.div>
  );
}
