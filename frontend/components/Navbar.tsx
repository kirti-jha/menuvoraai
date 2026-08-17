"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, User, LogOut, LayoutDashboard } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, isAuthenticated, logoutUser } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/checkout/pos")) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-[rgba(99,102,241,0.2)] py-3"
            : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-shadow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-heading font-bold tracking-tight">
                Menu<span className="gradient-text">vora</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-indigo-400",
                    pathname === link.href
                      ? "text-indigo-400"
                      : "text-[#8888aa]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA / Auth State */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="px-3.5 py-1.5 rounded-xl glass-light border border-indigo-500/30 text-xs text-indigo-300 hover:text-white font-medium flex items-center gap-2 transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </Link>

                  <button
                    onClick={() => {
                      logoutUser();
                      router.push("/signin");
                    }}
                    className="p-2 rounded-xl glass-light border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="px-4 py-2 text-sm font-medium text-[#8888aa] hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/checkout"
                    className="btn-shimmer px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
                  >
                    Start for ₹100
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-[#8888aa] hover:text-white hover:bg-white/5 transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden pt-20"
          >
            <div className="glass h-full px-4 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="block text-2xl font-heading font-bold text-white hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="btn-shimmer text-center py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="w-5 h-5" /> Go to Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logoutUser();
                        router.push("/signin");
                      }}
                      className="py-3 rounded-xl glass-light border border-red-500/30 text-red-400 text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="text-center py-3 rounded-xl glass-light text-white text-base font-semibold"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/checkout"
                      className="btn-shimmer text-center py-4 rounded-xl text-base font-semibold text-white"
                    >
                      Start for ₹100
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
