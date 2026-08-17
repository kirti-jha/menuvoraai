import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PlanId = "basic" | "pro" | "business";
export type BillingPeriod = "monthly" | "quarterly" | "halfyearly" | "yearly";

export interface User {
  name: string;
  email: string;
  role?: string;
}

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

  // User Auth State
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  selectPlan: (plan: PlanId, amount: number, name: string) => void;
  setBillingPeriod: (period: BillingPeriod) => void;
  setUserDetails: (name: string, email: string, phone: string) => void;
  setCheckoutStep: (step: number) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
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

      user: null,
      isAuthenticated: false,

      selectPlan: (plan, amount, name) =>
        set({ selectedPlan: plan, planAmount: amount, planName: name }),

      setBillingPeriod: (period) => set({ billingPeriod: period }),

      setUserDetails: (name, email, phone) =>
        set({ name, email, phone }),

      setCheckoutStep: (step) => set({ checkoutStep: step }),

      loginUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          email: user.email,
          name: user.name,
        }),

      logoutUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

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
      name: "menuvora-store",
    }
  )
);
