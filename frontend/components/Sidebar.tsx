"use client";

import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Receipt, 
  FileSpreadsheet, 
  CreditCard, 
  LogOut, 
  Store, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

interface SidebarProps {
  activeTab: "dashboard" | "transactions" | "reports";
  setActiveTab: (tab: "dashboard" | "transactions" | "reports") => void;
  userEmail?: string;
  onSignOut: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  userEmail = "menuvoraai@gmail.com",
  onSignOut,
}: SidebarProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview & Analytics",
      badge: "Live",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: Receipt,
      description: "All Payment Logs",
      badge: "Real-time",
    },
    {
      id: "reports",
      label: "Reports & Records",
      icon: FileSpreadsheet,
      description: "Filter & Export CSV",
      badge: "Export",
    },
  ] as const;

  return (
    <aside className="w-72 bg-[#0d0d1a]/90 backdrop-blur-2xl border-r border-[rgba(99,102,241,0.18)] flex flex-col justify-between h-screen sticky top-0 z-40 select-none shadow-2xl">
      {/* Top Header Branding */}
      <div>
        <div className="p-6 border-b border-[rgba(99,102,241,0.15)] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Menuvora
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-[#8888aa] font-mono">Merchant Portal v2.4</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="px-4 py-6 space-y-2">
          <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#666688]">
            <span>Main Workspace</span>
            <Sparkles className="w-3 h-3 text-indigo-400" />
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group text-left relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10"
                    : "text-[#9999bb] hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500" />
                )}

                <div className="flex items-center gap-3.5 relative z-10">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30"
                        : "bg-white/[0.05] text-[#8888aa] group-hover:text-indigo-300 group-hover:bg-indigo-500/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-sm tracking-tight">{item.label}</span>
                    <span className="block text-[11px] text-[#666688] font-mono group-hover:text-[#8888aa] transition-all">
                      {item.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 relative z-10">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                      isActive
                        ? "bg-indigo-500/30 text-indigo-300 border border-indigo-500/40"
                        : "bg-white/[0.04] text-[#666688] group-hover:text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Account & Signout */}
      <div className="p-4 border-t border-[rgba(99,102,241,0.15)] space-y-3">
        <Link
          href="/checkout/pos"
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-200 text-xs font-semibold transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-purple-400" />
            <span>POS Terminal</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <div className="p-3 rounded-2xl glass-light border border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-slate-200 truncate">
                {userEmail}
              </span>
              <span className="block text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Live Merchant
              </span>
            </div>
          </div>

          <button
            onClick={onSignOut}
            title="Sign Out"
            className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center transition-all shrink-0 ml-2"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
