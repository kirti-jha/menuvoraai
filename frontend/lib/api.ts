export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://menuvoraai-backend.vercel.app/api";

export interface TransactionRecord {
  id: string;
  orderRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  paymentMode: string;
  status: "SUCCESS" | "PENDING" | "FAILED" | "CANCELLED";
  deviceId?: string;
  timestamp: string; // ISO String or YYYY-MM-DD HH:mm
  date: string; // YYYY-MM-DD format for filtering
}

// Default initial transaction records list (Empty array for pure live dataset)
export const INITIAL_TRANSACTIONS: TransactionRecord[] = [];

// CSV Exporter Helper Function
export const exportTransactionsCSV = (transactions: TransactionRecord[], filename = "transactions_report.csv") => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions available to export.");
    return;
  }

  const headers = [
    "Transaction ID",
    "Order Ref",
    "Customer Name",
    "Customer Email",
    "Customer Phone",
    "Amount (INR)",
    "Payment Mode",
    "Status",
    "Device ID",
    "Date & Time",
  ];

  const rows = transactions.map((t) => [
    `"${t.id}"`,
    `"${t.orderRef}"`,
    `"${t.customerName}"`,
    `"${t.customerEmail}"`,
    `"${t.customerPhone || ""}"`,
    t.amount,
    `"${t.paymentMode}"`,
    `"${t.status}"`,
    `"${t.deviceId || ""}"`,
    `"${t.timestamp}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// API Health Check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Health check error:", error);
    throw error;
  }
};

// API User Login
export const loginUserApi = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

// API Fetch Orders / Transactions
export const fetchLiveOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch orders error:", error);
    return { success: false, data: [] };
  }
};

// API Create Checkout Order
export const createOrder = async (orderData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
};

// API Start POS Payment
export const startPosPayment = async (
  amount: number,
  paymentMode: string,
  deviceId: string,
  additionalData: Record<string, any> = {}
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/pos/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, paymentMode, deviceId, ...additionalData }),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error("Start POS Payment error:", error);
    throw error;
  }
};

// API Check POS Payment Status
export const checkPosPaymentStatus = async (transactionId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/${transactionId}/status`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Check POS Payment status error:", error);
    throw error;
  }
};

// API Cancel POS Payment
export const cancelPosPayment = async (
  origP2pRequestId: string,
  deviceId: string,
  transactionId: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/pos/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origP2pRequestId, deviceId, transactionId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cancel POS Payment error:", error);
    throw error;
  }
};

/**
 * Fetch All Live POS Transactions (For Admin Dashboard / Order History)
 */
export const fetchAllPosTransactions = async (): Promise<TransactionRecord[]> => {
  const records: TransactionRecord[] = [];

  // 1. Try POS Payments Webhook Endpoint
  try {
    const resPos = await fetch(`${API_BASE_URL}/payments/pos/transactions`);
    if (resPos.ok) {
      const result = await resPos.json();
      if (result.success && Array.isArray(result.data)) {
        result.data.forEach((item: any) => {
          records.push({
            id: item.transactionId || item.id || `TXN-${Date.now()}`,
            orderRef: item.externalRefNumber || item.orderRef || "ORD-POS",
            customerName: item.customerName || item.customerEmail?.split("@")[0] || "POS Customer",
            customerEmail: item.customerEmail || "customer@menuvora.ai",
            customerPhone: item.customerMobileNumber || item.customerPhone || "",
            amount: item.amount || 0,
            paymentMode: item.paymentMode || "RAZORPAY_POS",
            status: item.status || "SUCCESS",
            deviceId: item.deviceId || "5B006033",
            timestamp: item.timestamp || new Date().toISOString().replace("T", " ").substring(0, 19),
            date: item.date || new Date().toISOString().substring(0, 10),
          });
        });
      }
    }
  } catch (error) {
    // Ignore endpoint 404 or connection error
  }

  // 2. Try Live Orders DB Endpoint
  try {
    const resOrders = await fetch(`${API_BASE_URL}/orders`);
    if (resOrders.ok) {
      const result = await resOrders.json();
      if (result.success && Array.isArray(result.data)) {
        result.data.forEach((item: any) => {
          records.push({
            id: item.order_id || item.id || `ORD-${Date.now()}`,
            orderRef: item.order_id || item.plan_name || "WEB-ORDER",
            customerName: item.customer_name || "Customer",
            customerEmail: item.customer_email || "user@menuvora.ai",
            customerPhone: item.customer_phone || "",
            amount: item.amount || 0,
            paymentMode: item.payment_mode || "ONLINE",
            status: item.status || "COMPLETED",
            deviceId: item.device_id || "WEB",
            timestamp: item.created_at || new Date().toISOString().replace("T", " ").substring(0, 19),
            date: (item.created_at || new Date().toISOString()).substring(0, 10),
          });
        });
      }
    }
  } catch (error) {
    // Ignore endpoint 404 or connection error
  }

  return records;
};

/**
 * Check Single Transaction Status (For Polling after initiating payment)
 */
export const checkTransactionStatus = async (transactionId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/${transactionId}/status`);
    if (!response.ok) {
      return { success: false, status: "NOT_FOUND" };
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to check status:", error);
    return { success: false, status: "ERROR" };
  }
};

/**
 * Helper to Poll Status until Payment Completes or Times Out
 */
export const pollPaymentStatus = (
  transactionId: string,
  onStatusChange?: (statusData: any) => void,
  intervalMs = 3000,
  maxAttempts = 20
) => {
  let attempts = 0;
  const timer = setInterval(async () => {
    attempts++;
    const statusData = await checkTransactionStatus(transactionId);

    if (onStatusChange) {
      onStatusChange(statusData);
    }

    if (
      statusData.status === "SUCCESS" ||
      statusData.status === "FAILED" ||
      statusData.status === "CANCELLED" ||
      attempts >= maxAttempts
    ) {
      clearInterval(timer);
    }
  }, intervalMs);

  return () => clearInterval(timer);
};

