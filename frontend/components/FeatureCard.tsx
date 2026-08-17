"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  color,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 card-hover group relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className={cn(
          "absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500",
          color
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl mb-4 shadow-lg",
          color
        )}
      >
        {icon}
      </div>

      <h3 className="text-base font-heading font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#8888aa] leading-relaxed">{description}</p>
    </motion.div>
  );
}
