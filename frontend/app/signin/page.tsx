"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function SignInPage() {
  const router = useRouter();
  const loginUser = useStore((state) => state.loginUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleQuickFill = () => {
    setEmail("menuvoraai@gmail.com");
    setPassword("nonu8198@A");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://menuvoraai-backend.vercel.app/api";
    const endpoint = `${apiBase}/auth/login`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess("Authentication successful! Redirecting...");
        loginUser(data.user);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError(data.message || "Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold tracking-tight">
              Menu<span className="gradient-text">vora</span>
            </span>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-[#8888aa] mt-1">
            Sign in to access your Menuvora AI restaurant dashboard
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(99,102,241,0.2)] shadow-2xl relative overflow-hidden">
          
          {/* Quick Fill Button Helper */}
          <div className="mb-6 p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Admin Account Access</span>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] transition-colors shadow-sm"
            >
              Fill Credentials
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#ccccdd] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8888aa] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="menuvoraai@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-light text-white placeholder-[#8888aa] text-sm border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#ccccdd] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8888aa] absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl glass-light text-white placeholder-[#8888aa] text-sm border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#8888aa] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-shimmer py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-[#8888aa] mt-6">
          Need assistance?{" "}
          <Link href="/contact" className="text-indigo-400 hover:underline">
            Contact Menuvora Support
          </Link>
        </p>

      </motion.div>
    </div>
  );
}
