"use client";

import { PosCheckout } from "@/components/PosCheckout";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PosCheckoutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/checkout"
          className="inline-flex items-center gap-1.5 text-xs text-[#8888aa] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Standard Checkout
        </Link>
        <span className="text-xs text-[#8888aa] font-mono">Gateway: Ezetap POS Bridge API 3.0</span>
      </div>

      <PosCheckout />
    </div>
  );
}
