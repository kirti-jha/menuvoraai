"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Receipt, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  IndianRupee, 
  RefreshCw, 
  RotateCcw,
  Calendar, 
  ChevronRight, 
  Eye, 
  X, 
  Smartphone, 
  QrCode, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Menu,
  Sparkles,
  Copy,
  Check
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import { useStore } from "@/lib/store";
import { 
  INITIAL_TRANSACTIONS, 
  TransactionRecord, 
  exportTransactionsCSV,
  fetchAllPosTransactions,
  API_BASE_URL 
} from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logoutUser } = useStore();

  const [activeTab, setActiveTab] = useState<"dashboard" | "transactions" | "reports">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Transactions State
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [selectedTxn, setSelectedTxn] = useState<TransactionRecord | null>(null);
  const [copiedTxnId, setCopiedTxnId] = useState(false);

  // Filter States for Transactions Tab
  const [txnSearchQuery, setTxnSearchQuery] = useState("");
  const [txnStatusFilter, setTxnStatusFilter] = useState<string>("ALL");
  const [txnModeFilter, setTxnModeFilter] = useState<string>("ALL");

  // Filter States for Reports / Records Tab
  const [reportStartDate, setReportStartDate] = useState("2026-08-14");
  const [reportEndDate, setReportEndDate] = useState("2026-08-17");
  const [reportStatusFilter, setReportStatusFilter] = useState<string>("ALL");
  const [reportModeFilter, setReportModeFilter] = useState<string>("ALL");

  // Filter States for Analytics Graph
  const [graphStatusFilter, setGraphStatusFilter] = useState<string>("ALL");
  const [graphModeFilter, setGraphModeFilter] = useState<string>("ALL");
  const [graphDays, setGraphDays] = useState<number>(7);

  // Live POS Transactions Polling (Every 10 Seconds)
  useEffect(() => {
    const loadLiveTransactions = async () => {
      const liveData = await fetchAllPosTransactions();
      if (liveData && liveData.length > 0) {
        setTransactions((prev) => {
          // Merge live transactions ensuring no duplicates
          const existingIds = new Set(prev.map((t) => t.id));
          const newEntries = liveData.filter((t) => !existingIds.has(t.id));
          return newEntries.length > 0 ? [...newEntries, ...prev] : prev;
        });
      }
    };

    loadLiveTransactions();
    const interval = setInterval(loadLiveTransactions, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  // Handle Copy Txn ID
  const handleCopyTxnId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedTxnId(true);
    setTimeout(() => setCopiedTxnId(false), 2000);
  };

  // Filtered Transactions for Transactions Tab
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.id.toLowerCase().includes(txnSearchQuery.toLowerCase()) ||
        t.orderRef.toLowerCase().includes(txnSearchQuery.toLowerCase()) ||
        t.customerName.toLowerCase().includes(txnSearchQuery.toLowerCase()) ||
        t.customerEmail.toLowerCase().includes(txnSearchQuery.toLowerCase()) ||
        (t.customerPhone && t.customerPhone.includes(txnSearchQuery));

      const matchesStatus = txnStatusFilter === "ALL" || t.status === txnStatusFilter;
      const matchesMode =
        txnModeFilter === "ALL" ||
        (txnModeFilter === "UPI" && t.paymentMode === "UPI") ||
        (txnModeFilter === "CARD" && (t.paymentMode === "CARD" || t.paymentMode.includes("POS")));

      return matchesSearch && matchesStatus && matchesMode;
    });
  }, [transactions, txnSearchQuery, txnStatusFilter, txnModeFilter]);

  // Filtered Records for Reports & Export Tab
  const reportFilteredRecords = useMemo(() => {
    return transactions.filter((t) => {
      const txnDate = t.date;
      const matchesStartDate = !reportStartDate || txnDate >= reportStartDate;
      const matchesEndDate = !reportEndDate || txnDate <= reportEndDate;
      const matchesStatus = reportStatusFilter === "ALL" || t.status === reportStatusFilter;
      const matchesMode =
        reportModeFilter === "ALL" ||
        (reportModeFilter === "UPI" && t.paymentMode === "UPI") ||
        (reportModeFilter === "CARD" && (t.paymentMode === "CARD" || t.paymentMode.includes("POS")));

      return matchesStartDate && matchesEndDate && matchesStatus && matchesMode;
    });
  }, [transactions, reportStartDate, reportEndDate, reportStatusFilter, reportModeFilter]);

  // Dashboard Aggregated Analytics
  const totalRevenue = useMemo(() => {
    return transactions
      .filter((t) => t.status === "SUCCESS")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const successfulTxns = useMemo(() => {
    return transactions.filter((t) => t.status === "SUCCESS").length;
  }, [transactions]);

  const totalTxnCount = transactions.length;
  const successRate = totalTxnCount > 0 ? Math.round((successfulTxns / totalTxnCount) * 100) : 0;
  const avgTransactionValue = successfulTxns > 0 ? Math.round(totalRevenue / successfulTxns) : 0;

  // Payment Method Dynamic Metrics
  const upiTxns = useMemo(() => {
    return transactions.filter(
      (t) => t.paymentMode === "UPI" && t.status === "SUCCESS"
    );
  }, [transactions]);

  const upiRevenue = useMemo(() => {
    return upiTxns.reduce((sum, t) => sum + t.amount, 0);
  }, [upiTxns]);

  const cardTxns = useMemo(() => {
    return transactions.filter(
      (t) =>
        (t.paymentMode === "CARD" || t.paymentMode.includes("POS")) &&
        t.status === "SUCCESS"
    );
  }, [transactions]);

  const cardRevenue = useMemo(() => {
    return cardTxns.reduce((sum, t) => sum + t.amount, 0);
  }, [cardTxns]);

  const refundTxns = useMemo(() => {
    return transactions.filter(
      (t) => t.status === "CANCELLED" || t.status === "FAILED"
    );
  }, [transactions]);

  const refundAmount = useMemo(() => {
    return refundTxns.reduce((sum, t) => sum + t.amount, 0);
  }, [refundTxns]);

  // Date-wise Aggregation for Graph
  const graphData = useMemo(() => {
    const dates: { dateStr: string; label: string; amount: number; count: number }[] = [];
    const today = new Date();

    for (let i = graphDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().substring(0, 10);
      const label = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

      const dayTxns = transactions.filter((t) => {
        const matchesDate = t.date === dateStr || t.timestamp.startsWith(dateStr);
        const matchesStatus = graphStatusFilter === "ALL" || t.status === graphStatusFilter;
        const matchesMode =
          graphModeFilter === "ALL" ||
          (graphModeFilter === "UPI" && t.paymentMode === "UPI") ||
          (graphModeFilter === "CARD" && (t.paymentMode === "CARD" || t.paymentMode.includes("POS")));

        return matchesDate && matchesStatus && matchesMode;
      });

      const amount = dayTxns.reduce((sum, t) => sum + t.amount, 0);
      dates.push({ dateStr, label, amount, count: dayTxns.length });
    }

    return dates;
  }, [transactions, graphDays, graphStatusFilter, graphModeFilter]);

  const maxGraphAmount = useMemo(() => {
    const max = Math.max(...graphData.map((d) => d.amount));
    return max > 0 ? max : 1000;
  }, [graphData]);

  const totalGraphAmount = useMemo(() => {
    return graphData.reduce((sum, d) => sum + d.amount, 0);
  }, [graphData]);

  const avgGraphAmount = useMemo(() => {
    return Math.round(totalGraphAmount / (graphData.length || 1));
  }, [totalGraphAmount, graphData]);

  // Report Metrics
  const reportTotalRevenue = useMemo(() => {
    return reportFilteredRecords
      .filter((t) => t.status === "SUCCESS")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [reportFilteredRecords]);

  const reportSuccessCount = reportFilteredRecords.filter((t) => t.status === "SUCCESS").length;

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#070711] text-slate-100 font-sans flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component (Desktop & Mobile) */}
      <div className={`fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileSidebarOpen(false);
          }}
          userEmail={user.email}
          onSignOut={() => {
            logoutUser();
            router.push("/signin");
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <header className="px-6 py-4 bg-[#0d0d1a]/80 backdrop-blur-xl border-b border-[rgba(99,102,241,0.15)] flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2.5 rounded-xl glass-light border border-indigo-500/30 text-indigo-300 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-extrabold text-white tracking-tight capitalize">
                  {activeTab === "dashboard" && "Dashboard Overview"}
                  {activeTab === "transactions" && "Transaction Ledger"}
                  {activeTab === "reports" && "Reports & Export Records"}
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-[#8888aa] hidden sm:block">
                Menuvora AI Gateway Connection & Real-time Merchant Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Backend Connected
            </div>

            <button
              onClick={() => setTransactions([...INITIAL_TRANSACTIONS])}
              className="p-2.5 rounded-xl glass-light border border-indigo-500/30 text-indigo-300 hover:text-white hover:bg-indigo-600/20 transition-all"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Main Workspace Content */}
        <main className="p-6 space-y-8 flex-1">
          {/* TAB 1: OVERALL DASHBOARD */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Revenue */}
                <div className="glass p-6 rounded-3xl border border-[rgba(99,102,241,0.2)] shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-[#8888aa] uppercase tracking-wider">
                      Total Sales Revenue
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-white tracking-tight">
                    ₹ {totalRevenue.toLocaleString("en-IN")}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18.4% this week</span>
                  </div>
                </div>

                {/* Total Transactions */}
                <div className="glass p-6 rounded-3xl border border-[rgba(99,102,241,0.2)] shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-[#8888aa] uppercase tracking-wider">
                      Total Transactions
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Receipt className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-white tracking-tight">
                    {totalTxnCount} <span className="text-sm font-normal text-[#8888aa]">logs</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-indigo-300 font-mono">
                    <span>{successfulTxns} Successful</span> • <span>{totalTxnCount - successfulTxns} Unresolved</span>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="glass p-6 rounded-3xl border border-[rgba(99,102,241,0.2)] shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-[#8888aa] uppercase tracking-wider">
                      Success Rate
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-white tracking-tight">
                    {successRate}%
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-purple-300 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>High authorization index</span>
                  </div>
                </div>

                {/* Avg Transaction Value */}
                <div className="glass p-6 rounded-3xl border border-[rgba(99,102,241,0.2)] shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-[#8888aa] uppercase tracking-wider">
                      Avg Order Size
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-white tracking-tight">
                    ₹ {avgTransactionValue.toLocaleString("en-IN")}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-blue-300 font-mono">
                    <span>Per order average</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-light p-6 rounded-3xl border border-indigo-500/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8888aa] font-mono block">UPI Payments</span>
                    <span className="text-xl font-bold text-white">₹ {upiRevenue.toLocaleString("en-IN")}</span>
                    <span className="text-[11px] text-indigo-400 block font-mono">{upiTxns.length} successful payments</span>
                  </div>
                </div>

                <div className="glass-light p-6 rounded-3xl border border-purple-500/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8888aa] font-mono block">Card / Razorpay POS</span>
                    <span className="text-xl font-bold text-white">₹ {cardRevenue.toLocaleString("en-IN")}</span>
                    <span className="text-[11px] text-purple-400 block font-mono">{cardTxns.length} POS terminal charges</span>
                  </div>
                </div>

                <div className="glass-light p-6 rounded-3xl border border-amber-500/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8888aa] font-mono block">Refunds & Cancellations</span>
                    <span className="text-xl font-bold text-white">₹ {refundAmount.toLocaleString("en-IN")}</span>
                    <span className="text-[11px] text-amber-400 block font-mono">{refundTxns.length} processed refunds</span>
                  </div>
                </div>
              </div>

              {/* Date-Wise Transaction Revenue & Volume Analytics Graph Card */}
              <div className="glass rounded-3xl border border-[rgba(99,102,241,0.2)] p-6 space-y-6 relative overflow-hidden">
                {/* Header & Interactive Filter Bar */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[rgba(99,102,241,0.15)] pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-lg font-bold text-white tracking-tight">Date-Wise Transaction Analytics Graph</h2>
                    </div>
                    <p className="text-xs text-[#8888aa] mt-0.5">
                      Visual daily revenue breakdown & transaction volume with interactive filtering
                    </p>
                  </div>

                  {/* Filter Controls for Graph */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Time Period Filter Pills */}
                    <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
                      {[
                        { days: 7, label: "Last 7 Days" },
                        { days: 14, label: "14 Days" },
                        { days: 30, label: "30 Days" },
                      ].map((item) => (
                        <button
                          key={item.days}
                          onClick={() => setGraphDays(item.days)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                            graphDays === item.days
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                              : "text-[#8888aa] hover:text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Status Filter */}
                    <select
                      value={graphStatusFilter}
                      onChange={(e) => setGraphStatusFilter(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ALL" className="bg-[#0f0f20]">All Statuses</option>
                      <option value="SUCCESS" className="bg-[#0f0f20]">Success Only</option>
                      <option value="PENDING" className="bg-[#0f0f20]">Pending Only</option>
                      <option value="FAILED" className="bg-[#0f0f20]">Failed / Cancelled</option>
                    </select>

                    {/* Payment Mode Filter */}
                    <select
                      value={graphModeFilter}
                      onChange={(e) => setGraphModeFilter(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ALL" className="bg-[#0f0f20]">All Modes</option>
                      <option value="UPI" className="bg-[#0f0f20]">UPI Only</option>
                      <option value="CARD" className="bg-[#0f0f20]">Card / POS Only</option>
                    </select>
                  </div>
                </div>

                {/* Graph Summary Metrics Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl glass-light border border-indigo-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-[#8888aa] block">Period Total Revenue</span>
                      <span className="text-xl font-extrabold text-white">₹ {totalGraphAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <IndianRupee className="w-6 h-6 text-indigo-400/50" />
                  </div>

                  <div className="p-4 rounded-2xl glass-light border border-purple-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-[#8888aa] block">Peak Daily Revenue</span>
                      <span className="text-xl font-extrabold text-emerald-400">₹ {maxGraphAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-emerald-400/50" />
                  </div>

                  <div className="p-4 rounded-2xl glass-light border border-blue-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-[#8888aa] block">Avg Daily Revenue</span>
                      <span className="text-xl font-extrabold text-blue-300">₹ {avgGraphAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <Receipt className="w-6 h-6 text-blue-400/50" />
                  </div>
                </div>

                {/* Visual Bar Chart Display */}
                <div className="space-y-2">
                  <div className="h-56 w-full pt-6 flex items-end justify-between gap-2 sm:gap-4 relative px-2">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none opacity-15">
                      <div className="border-b border-indigo-400 w-full" />
                      <div className="border-b border-indigo-400 w-full" />
                      <div className="border-b border-indigo-400 w-full" />
                      <div className="border-b border-indigo-400 w-full" />
                    </div>

                    {/* Dynamic Bar Columns */}
                    {graphData.map((item, idx) => {
                      const barHeightPercent = maxGraphAmount > 0 ? Math.max(8, (item.amount / maxGraphAmount) * 100) : 8;
                      return (
                        <div
                          key={item.dateStr || idx}
                          className="flex-1 flex flex-col items-center h-full justify-end group relative z-10"
                        >
                          {/* Hover Tooltip */}
                          <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-slate-900/95 border border-indigo-500/40 text-white p-2 rounded-xl text-xs font-mono text-center shadow-xl z-30 whitespace-nowrap">
                            <div className="font-bold text-indigo-300">{item.label}</div>
                            <div className="text-emerald-400 font-extrabold">₹ {item.amount.toLocaleString("en-IN")}</div>
                            <div className="text-[10px] text-slate-400">{item.count} transactions</div>
                          </div>

                          {/* Bar Amount Value Tag */}
                          <span className="text-[10px] font-mono text-indigo-300 mb-1.5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all font-bold">
                            {item.amount > 0 ? `₹${item.amount >= 1000 ? `${(item.amount / 1000).toFixed(1)}k` : item.amount}` : "₹0"}
                          </span>

                          {/* Bar Element */}
                          <div
                            style={{ height: `${barHeightPercent}%` }}
                            className={`w-full max-w-[48px] rounded-t-xl transition-all duration-500 shadow-lg ${
                              item.amount > 0
                                ? "bg-gradient-to-t from-indigo-600 via-purple-600 to-indigo-400 group-hover:from-indigo-500 group-hover:to-pink-500 shadow-indigo-500/30"
                                : "bg-white/[0.04] border border-white/[0.08]"
                            }`}
                          />

                          {/* Date Label */}
                          <span className="text-[11px] font-mono text-[#8888aa] mt-2 group-hover:text-white transition-colors truncate">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Transactions Preview Section */}
              <div className="glass rounded-3xl border border-[rgba(99,102,241,0.2)] p-6 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Recent Transactions Overview</h2>
                    <p className="text-xs text-[#8888aa]">Latest customer payments across all gateways</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("transactions")}
                    className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    View All Transactions <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Table Preview */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs text-[#8888aa] uppercase font-mono bg-white/[0.03] border-y border-white/[0.08]">
                      <tr>
                        <th className="py-3.5 px-4">Txn ID</th>
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Amount</th>
                        <th className="py-3.5 px-4">Mode</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {transactions.slice(0, 5).map((t) => (
                        <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-indigo-300">{t.id}</td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-200">{t.customerName}</div>
                            <div className="text-xs text-[#777799] font-mono">{t.customerEmail}</div>
                          </td>
                          <td className="py-4 px-4 font-extrabold text-white">₹ {t.amount.toLocaleString("en-IN")}</td>
                          <td className="py-4 px-4 text-xs font-mono text-slate-300">{t.paymentMode}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold font-mono inline-flex items-center gap-1.5 border ${
                                t.status === "SUCCESS"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  : t.status === "PENDING"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-red-500/10 text-red-400 border-red-500/30"
                              }`}
                            >
                              {t.status === "SUCCESS" && <CheckCircle2 className="w-3.5 h-3.5" />}
                              {t.status === "PENDING" && <Clock className="w-3.5 h-3.5" />}
                              {t.status !== "SUCCESS" && t.status !== "PENDING" && <XCircle className="w-3.5 h-3.5" />}
                              {t.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-xs text-[#8888aa] font-mono">{t.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: TRANSACTIONS LIST */}
          {activeTab === "transactions" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Search & Filters */}
              <div className="glass p-5 rounded-3xl border border-[rgba(99,102,241,0.2)] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-[#8888aa] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search Txn ID, Customer, Email..."
                    value={txnSearchQuery}
                    onChange={(e) => setTxnSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder-[#777799] focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
                  {/* Status Filter Tabs */}
                  <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
                    {["ALL", "SUCCESS", "PENDING", "FAILED", "CANCELLED"].map((st) => (
                      <button
                        key={st}
                        onClick={() => setTxnStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          txnStatusFilter === st
                            ? "bg-indigo-600 text-white shadow-md"
                            : "text-[#8888aa] hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Payment Mode Filter */}
                  <select
                    value={txnModeFilter}
                    onChange={(e) => setTxnModeFilter(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ALL" className="bg-[#0f0f20]">All Modes</option>
                    <option value="UPI" className="bg-[#0f0f20]">UPI Only</option>
                    <option value="CARD" className="bg-[#0f0f20]">Card / POS Only</option>
                  </select>
                </div>
              </div>

              {/* Transactions Data Table */}
              <div className="glass rounded-3xl border border-[rgba(99,102,241,0.2)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs text-[#8888aa] uppercase font-mono bg-white/[0.04] border-b border-white/[0.08]">
                      <tr>
                        <th className="py-4 px-5">Transaction ID</th>
                        <th className="py-4 px-5">Order Ref</th>
                        <th className="py-4 px-5">Customer Info</th>
                        <th className="py-4 px-5">Payment Mode</th>
                        <th className="py-4 px-5">Amount</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5">Date & Time</th>
                        <th className="py-4 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {filteredTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-[#8888aa]">
                            No transaction records found matching your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredTransactions.map((t) => (
                          <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-5 font-mono font-bold text-indigo-300">{t.id}</td>
                            <td className="py-4 px-5 font-mono text-xs text-[#8888aa]">{t.orderRef}</td>
                            <td className="py-4 px-5">
                              <div className="font-semibold text-slate-200">{t.customerName}</div>
                              <div className="text-xs text-[#777799] font-mono">{t.customerEmail}</div>
                            </td>
                            <td className="py-4 px-5 text-xs font-mono text-slate-300">{t.paymentMode}</td>
                            <td className="py-4 px-5 font-extrabold text-white">₹ {t.amount.toLocaleString("en-IN")}</td>
                            <td className="py-4 px-5">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold font-mono inline-flex items-center gap-1.5 border ${
                                  t.status === "SUCCESS"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                    : t.status === "PENDING"
                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                    : "bg-red-500/10 text-red-400 border-red-500/30"
                                }`}
                              >
                                {t.status === "SUCCESS" && <CheckCircle2 className="w-3.5 h-3.5" />}
                                {t.status === "PENDING" && <Clock className="w-3.5 h-3.5" />}
                                {t.status !== "SUCCESS" && t.status !== "PENDING" && <XCircle className="w-3.5 h-3.5" />}
                                {t.status}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-xs text-[#8888aa] font-mono">{t.timestamp}</td>
                            <td className="py-4 px-5 text-right">
                              <button
                                onClick={() => setSelectedTxn(t)}
                                className="p-2 rounded-lg bg-white/[0.05] hover:bg-indigo-600/30 text-indigo-300 hover:text-white transition-all"
                                title="Inspect Transaction"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: REPORTS & RECORDS (DATE-WISE FILTER & CSV EXPORT) */}
          {activeTab === "reports" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Date Filter & Control Card */}
              <div className="glass p-6 rounded-3xl border border-[rgba(99,102,241,0.2)] space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[rgba(99,102,241,0.15)] pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                      Date-Wise Transaction Reports
                    </h2>
                    <p className="text-xs text-[#8888aa]">Filter records by date range, mode, and status to export CSV</p>
                  </div>

                  <button
                    onClick={() => exportTransactionsCSV(reportFilteredRecords, `transactions_report_${reportStartDate}_to_${reportEndDate}.csv`)}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4" /> Export CSV Report
                  </button>
                </div>

                {/* Filter Controls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Start Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8888aa] block">From Date (Start)</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#8888aa] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={reportStartDate}
                        onChange={(e) => setReportStartDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8888aa] block">To Date (End)</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#8888aa] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={reportEndDate}
                        onChange={(e) => setReportEndDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8888aa] block">Status Filter</label>
                    <select
                      value={reportStatusFilter}
                      onChange={(e) => setReportStatusFilter(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ALL" className="bg-[#0f0f20]">All Statuses</option>
                      <option value="SUCCESS" className="bg-[#0f0f20]">Success Only</option>
                      <option value="PENDING" className="bg-[#0f0f20]">Pending Only</option>
                      <option value="FAILED" className="bg-[#0f0f20]">Failed Only</option>
                      <option value="CANCELLED" className="bg-[#0f0f20]">Cancelled Only</option>
                    </select>
                  </div>

                  {/* Payment Mode */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8888aa] block">Payment Mode</label>
                    <select
                      value={reportModeFilter}
                      onChange={(e) => setReportModeFilter(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ALL" className="bg-[#0f0f20]">All Modes</option>
                      <option value="UPI" className="bg-[#0f0f20]">UPI Only</option>
                      <option value="CARD" className="bg-[#0f0f20]">Card / POS Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Filtered Range Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="glass p-5 rounded-2xl border border-indigo-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8888aa] font-mono block">Filtered Range Revenue</span>
                    <span className="text-2xl font-extrabold text-emerald-400">₹ {reportTotalRevenue.toLocaleString("en-IN")}</span>
                  </div>
                  <IndianRupee className="w-7 h-7 text-emerald-400/50" />
                </div>

                <div className="glass p-5 rounded-2xl border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8888aa] font-mono block">Records Matching</span>
                    <span className="text-2xl font-extrabold text-purple-300">{reportFilteredRecords.length} records</span>
                  </div>
                  <Receipt className="w-8 h-8 text-purple-400/40" />
                </div>

                <div className="glass p-5 rounded-2xl border border-blue-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8888aa] font-mono block">Successful Payments</span>
                    <span className="text-2xl font-extrabold text-blue-300">{reportSuccessCount} successful</span>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-400/40" />
                </div>
              </div>

              {/* Filtered Records Preview Table */}
              <div className="glass rounded-3xl border border-[rgba(99,102,241,0.2)] overflow-hidden">
                <div className="p-4 border-b border-[rgba(99,102,241,0.15)] flex items-center justify-between text-xs font-mono text-[#8888aa]">
                  <span>Showing {reportFilteredRecords.length} matching transaction records</span>
                  <span>Date Range: {reportStartDate} to {reportEndDate}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs text-[#8888aa] uppercase font-mono bg-white/[0.04] border-b border-white/[0.08]">
                      <tr>
                        <th className="py-3.5 px-4">Txn ID</th>
                        <th className="py-3.5 px-4">Order Ref</th>
                        <th className="py-3.5 px-4">Customer Name</th>
                        <th className="py-3.5 px-4">Payment Mode</th>
                        <th className="py-3.5 px-4">Amount</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {reportFilteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-10 text-center text-[#8888aa]">
                            No transactions match the selected date range and filter criteria.
                          </td>
                        </tr>
                      ) : (
                        reportFilteredRecords.map((t) => (
                          <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">{t.id}</td>
                            <td className="py-3.5 px-4 font-mono text-xs text-[#8888aa]">{t.orderRef}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-200">{t.customerName}</td>
                            <td className="py-3.5 px-4 text-xs font-mono text-slate-300">{t.paymentMode}</td>
                            <td className="py-3.5 px-4 font-extrabold text-white">₹ {t.amount.toLocaleString("en-IN")}</td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono inline-flex items-center gap-1 border ${
                                  t.status === "SUCCESS"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                    : t.status === "PENDING"
                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                    : "bg-red-500/10 text-red-400 border-red-500/30"
                                }`}
                              >
                                {t.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-[#8888aa] font-mono">{t.timestamp}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Inspection Modal for Transaction Detail */}
      <AnimatePresence>
        {selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTxn(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg glass rounded-3xl border border-[rgba(99,102,241,0.3)] p-6 space-y-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-[rgba(99,102,241,0.2)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Transaction Detail Inspector</h3>
                  <p className="text-xs text-indigo-300 font-mono">{selectedTxn.id}</p>
                </div>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#8888aa]">Transaction ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-300 font-bold">{selectedTxn.id}</span>
                    <button
                      onClick={() => handleCopyTxnId(selectedTxn.id)}
                      className="p-1 rounded bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
                    >
                      {copiedTxnId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#8888aa]">Order Reference:</span>
                  <span className="text-white font-bold">{selectedTxn.orderRef}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#8888aa]">Customer Name:</span>
                  <span className="text-white font-bold">{selectedTxn.customerName}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#8888aa]">Customer Email:</span>
                  <span className="text-slate-300">{selectedTxn.customerEmail}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#8888aa]">Total Amount:</span>
                  <span className="text-emerald-400 text-sm font-extrabold">₹ {selectedTxn.amount.toLocaleString("en-IN")}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#8888aa]">Payment Mode:</span>
                  <span className="text-purple-300 font-bold">{selectedTxn.paymentMode}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#8888aa]">Timestamp:</span>
                  <span className="text-slate-300">{selectedTxn.timestamp}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
