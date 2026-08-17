"use client";

import { BILLING_PERIODS } from "@/lib/data";
import { useStore, BillingPeriod } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PlanSelector() {
  const { billingPeriod, setBillingPeriod } = useStore();

  return (
    <div className="flex items-center justify-center">
      <div className="glass rounded-xl p-1 flex gap-1">
        {BILLING_PERIODS.map((period) => (
          <button
            key={period.id}
            onClick={() => setBillingPeriod(period.id as BillingPeriod)}
            className={cn(
              "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              billingPeriod === period.id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-[#8888aa] hover:text-white"
            )}
          >
            {period.label}
            {period.badge && (
              <span className="absolute -top-2 -right-2 text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                {period.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
