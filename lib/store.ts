import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PlanId = "basic" | "pro" | "business";
export type BillingPeriod = "monthly" | "quarterly" | "halfyearly" | "yearly";

interface CheckoutState {
  selectedPlan: PlanId | null;
  billingPeriod: BillingPeriod;
  planAmount: number;
  planName: string;

  // Checkout form
  name: string;
  email: string;
  phone: string;

  // Step
  checkoutStep: number;

  // Actions
  selectPlan: (plan: PlanId, amount: number, name: string) => void;
  setBillingPeriod: (period: BillingPeriod) => void;
  setUserDetails: (name: string, email: string, phone: string) => void;
  setCheckoutStep: (step: number) => void;
  reset: () => void;
}

export const useStore = create<CheckoutState>()(
  persist(
    (set) => ({
      selectedPlan: null,
      billingPeriod: "monthly",
      planAmount: 0,
      planName: "",
      name: "",
      email: "",
      phone: "",
      checkoutStep: 1,

      selectPlan: (plan, amount, name) =>
        set({ selectedPlan: plan, planAmount: amount, planName: name }),

      setBillingPeriod: (period) => set({ billingPeriod: period }),

      setUserDetails: (name, email, phone) =>
        set({ name, email, phone }),

      setCheckoutStep: (step) => set({ checkoutStep: step }),

      reset: () =>
        set({
          selectedPlan: null,
          billingPeriod: "monthly",
          planAmount: 0,
          planName: "",
          name: "",
          email: "",
          phone: "",
          checkoutStep: 1,
        }),
    }),
    {
      name: "menuvora-checkout",
    }
  )
);
