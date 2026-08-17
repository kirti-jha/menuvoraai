"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  ShieldCheck, 
  Send,
  RefreshCw,
  Wallet,
  Building,
  Check
} from "lucide-react";

const PAYMENT_MODES = [
  { id: "UPI", label: "UPI", icon: QrCode },
  { id: "CARD", label: "Card (Tap/Dip)", icon: CreditCard },
  { id: "QR", label: "QR Code", icon: QrCode },
  { id: "CASH", label: "Cash", icon: Wallet },
  { id: "CHEQUE", label: "Cheque", icon: Building },
  { id: "REMOTE PAY", label: "Remote Pay", icon: Smartphone },
  { id: "WALLET", label: "Wallet", icon: Wallet },
  { id: "BHARATQR", label: "BharatQR", icon: QrCode },
];

export function PosCheckout() {
  const [amount, setAmount] = useState("2100");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [deviceId, setDeviceId] = useState("5B006033");
  const [customerEmail, setCustomerEmail] = useState("test@gmail.com");
  const [customerMobile, setCustomerMobile] = useState("7026428262");
  
  const [activeTxn, setActiveTxn] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear polling timers on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  const stopPolling = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const handleInitiatePosPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatusMessage("Dispatching payment request to Ezetap / Razorpay POS Device...");
    setActiveTxn(null);
    setElapsedTime(0);
    stopPolling();

    try {
      const res = await fetch("http://localhost:5000/api/payments/pos/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          externalRefNumber: `ORDER-${Date.now().toString().slice(-6)}`,
          customerEmail,
          customerMobileNumber: customerMobile,
          paymentMode,
          deviceId
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActiveTxn(data);
        setStatusMessage("Payment request sent to POS device. Please complete the payment on the device.");
        startPolling(data.transactionId, data.p2pRequestId, data.deviceId);
      } else {
        setError(data.message || "Failed to initiate POS payment.");
      }
    } catch (err) {
      setError("Unable to connect to POS Backend Gateway. Check backend status.");
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (transactionId: string, p2pRequestId: string, deviceId: string) => {
    let seconds = 0;

    // Start timer counter
    timerIntervalRef.current = setInterval(() => {
      seconds += 1;
      setElapsedTime(seconds);

      // Auto cancel after 150 seconds if still pending per Ezetap recommendation
      if (seconds >= 150) {
        stopPolling();
        handleCancelPayment(p2pRequestId, deviceId, transactionId, "Timeout at 150s");
      }
    }, 1000);

    // Poll backend every 10 seconds starting after 5s initial wait
    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/payments/${transactionId}/status`);
        const data = await res.json();

        if (data.success && data.status) {
          setActiveTxn((prev: any) => ({ ...prev, status: data.status }));

          if (data.status === "SUCCESS") {
            stopPolling();
            setStatusMessage("🎉 Payment Authorized & Completed!");
          } else if (data.status === "FAILED") {
            stopPolling();
            setError("❌ Transaction Failed on POS Device.");
          } else if (data.status === "CANCELLED") {
            stopPolling();
            setStatusMessage("Transaction Cancelled.");
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 10000);
  };

  const handleCancelPayment = async (p2pRequestId: string, devId: string, txnId: string, reason = "User Cancelled") => {
    stopPolling();
    setStatusMessage("Cancelling transaction on POS device...");

    try {
      const res = await fetch("http://localhost:5000/api/payments/pos/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origP2pRequestId: p2pRequestId,
          deviceId: devId,
          transactionId: txnId
        })
      });

      const data = await res.json();
      if (data.success) {
        setActiveTxn((prev: any) => ({ ...prev, status: "CANCELLED" }));
        setStatusMessage(`Cancelled (${reason})`);
      }
    } catch (err) {
      console.error("Cancel API error:", err);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(99,102,241,0.2)] shadow-2xl relative">
      <div className="flex items-center justify-between border-b border-[rgba(99,102,241,0.15)] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-bold text-white">Razorpay POS / Ezetap Bridge</h2>
            <p className="text-xs text-[#8888aa]">Terminal Payment & Soundbox Integration</p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          DEMO Mode
        </span>
      </div>

      <form onSubmit={handleInitiatePosPayment} className="space-y-5">
        
        {/* Payment Amount & Device ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#ccccdd] mb-1.5 uppercase tracking-wider">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-[#8888aa] font-semibold">₹</span>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl glass-light text-white font-bold text-sm border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#ccccdd] mb-1.5 uppercase tracking-wider">
              POS Device ID / Soundbox
            </label>
            <input
              type="text"
              required
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="DEVICE_ID|razorpay_pos_soundbox"
              className="w-full px-4 py-2.5 rounded-xl glass-light text-white text-sm font-mono border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none"
            />
          </div>
        </div>

        {/* Payment Modes */}
        <div>
          <label className="block text-xs font-semibold text-[#ccccdd] mb-2 uppercase tracking-wider">
            Select Payment Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PAYMENT_MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = paymentMode === mode.id;
              return (
                <button
                  type="button"
                  key={mode.id}
                  onClick={() => setPaymentMode(mode.id)}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-2 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/10"
                      : "glass-light border-[rgba(99,102,241,0.15)] text-[#8888aa] hover:text-white"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-indigo-400" : ""}`} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#ccccdd] mb-1.5 uppercase tracking-wider">
              Customer Mobile
            </label>
            <input
              type="tel"
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-light text-white text-sm border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#ccccdd] mb-1.5 uppercase tracking-wider">
              Customer Email
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-light text-white text-sm border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || (activeTxn && activeTxn.status === "PENDING")}
          className="w-full btn-shimmer py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Initiate Payment on POS Terminal
        </button>

      </form>

      {/* Status Panel & Polling View */}
      {statusMessage && (
        <div className="mt-6 p-4 rounded-2xl glass-light border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8888aa] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Polling Window: <strong>{elapsedTime}s</strong> / 150s
            </span>
            {activeTxn && (
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                activeTxn.status === "SUCCESS" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                activeTxn.status === "FAILED" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                activeTxn.status === "CANCELLED" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse"
              }`}>
                {activeTxn.status}
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-white">{statusMessage}</p>

          {activeTxn && activeTxn.status === "PENDING" && (
            <button
              onClick={() => handleCancelPayment(activeTxn.p2pRequestId, activeTxn.deviceId, activeTxn.transactionId)}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <XCircle className="w-3.5 h-3.5" /> Cancel POS Txn
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
}
