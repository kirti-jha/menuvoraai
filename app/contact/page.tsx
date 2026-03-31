"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Header */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center mb-16">
        <div className="orb orb-brand w-80 h-80 top-0 left-1/2 -translate-x-1/2 opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <span className="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            Get in Touch
          </span>
          <h1 className="text-5xl font-heading font-bold text-white mb-4">
            We'd love to <span className="gradient-text">hear from you</span>
          </h1>
          <p className="text-[#8888aa] text-lg">
            Whether you have a question, feedback, or just want to say hi —
            we're here for you.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Mail,
                title: "Email us",
                value: "menuvoraai@gmail.com",
                desc: "We reply within 24 hours",
              },
              // {
              //   icon: MessageSquare,
              //   title: "Live Chat",
              //   value: "Chat with us",
              //   desc: "Available Mon–Fri, 9am–6pm IST",
              // },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-2xl p-5 flex gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-sm text-indigo-400">{item.value}</p>
                  <p className="text-xs text-[#8888aa]">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-5"
            >
              <p className="text-sm font-bold text-white mb-2">Office</p>
              <p className="text-sm text-[#8888aa] leading-relaxed">
                Menuvora AI Systems Pvt. Ltd.
                <br />
                Plot No 90, 2nd Floor, Cabin No 1, Sector 14
                <br />
                Mehrauli Road Gurugram, 
                <br />
                Haryana, India – 122001
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-6 sm:p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    Message sent!
                  </h3>
                  <p className="text-[#8888aa]">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "name", label: "Name", placeholder: "Your full name", type: "text" },
                      { id: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="block text-sm font-medium text-[#ccccdd] mb-1.5">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.id as keyof typeof form]}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, [f.id]: e.target.value }))
                          }
                          className={cn(
                            "w-full px-4 py-3 rounded-xl glass-light text-white placeholder-[#8888aa] text-sm border transition-all",
                            errors[f.id]
                              ? "border-red-500/50"
                              : "border-[rgba(99,102,241,0.2)] focus:border-indigo-500/60"
                          )}
                        />
                        {errors[f.id] && (
                          <p className="text-xs text-red-400 mt-1">{errors[f.id]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ccccdd] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl glass-light text-white placeholder-[#8888aa] text-sm border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ccccdd] mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl glass-light text-white placeholder-[#8888aa] text-sm border transition-all resize-none",
                        errors.message
                          ? "border-red-500/50"
                          : "border-[rgba(99,102,241,0.2)] focus:border-indigo-500/60"
                      )}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full btn-shimmer py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
