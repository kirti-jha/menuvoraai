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

// Default initial transaction records list
export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: "TXN-98401",
    orderRef: "ORD-8801",
    customerName: "Rahul Sharma",
    customerEmail: "rahul.sharma@gmail.com",
    customerPhone: "+91 98765 43210",
    amount: 1250,
    paymentMode: "UPI",
    status: "SUCCESS",
    deviceId: "5B006033",
    timestamp: "2026-08-17 14:32:10",
    date: "2026-08-17",
  },
  {
    id: "TXN-98402",
    orderRef: "ORD-8802",
    customerName: "Priya Verma",
    customerEmail: "priya.v@outlook.com",
    customerPhone: "+91 98123 55678",
    amount: 2800,
    paymentMode: "RAZORPAY_POS",
    status: "SUCCESS",
    deviceId: "5B006033",
    timestamp: "2026-08-17 13:15:42",
    date: "2026-08-17",
  },
  {
    id: "TXN-98403",
    orderRef: "ORD-8803",
    customerName: "Amit Kumar",
    customerEmail: "amit.k@yahoo.com",
    customerPhone: "+91 97654 32109",
    amount: 450,
    paymentMode: "UPI",
    status: "FAILED",
    deviceId: "5B006033",
    timestamp: "2026-08-17 12:45:00",
    date: "2026-08-17",
  },
  {
    id: "TXN-98404",
    orderRef: "ORD-8804",
    customerName: "Sneha Gupta",
    customerEmail: "sneha.g@gmail.com",
    customerPhone: "+91 99887 66554",
    amount: 3400,
    paymentMode: "CARD",
    status: "SUCCESS",
    deviceId: "5B006033",
    timestamp: "2026-08-16 19:20:15",
    date: "2026-08-16",
  },
  {
    id: "TXN-98405",
    orderRef: "ORD-8805",
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@gmail.com",
    customerPhone: "+91 98112 23344",
    amount: 980,
    paymentMode: "UPI",
    status: "SUCCESS",
    deviceId: "5B006033",
    timestamp: "2026-08-16 18:05:30",
    date: "2026-08-16",
  },
  {
    id: "TXN-98406",
    orderRef: "ORD-8806",
    customerName: "Karan Patel",
    customerEmail: "karan.p@rediffmail.com",
    customerPhone: "+91 99001 12233",
    amount: 1850,
    paymentMode: "POS_SOUNDBOX",
    status: "PENDING",
    deviceId: "5B006033",
    timestamp: "2026-08-16 16:40:00",
    date: "2026-08-16",
  },
  {
    id: "TXN-98407",
    orderRef: "ORD-8807",
    customerName: "Neha Reddy",
    customerEmail: "neha.reddy@gmail.com",
    customerPhone: "+91 97112 34567",
    amount: 4200,
    paymentMode: "CARD",
    status: "SUCCESS",
    deviceId: "5B006033",
    timestamp: "2026-08-15 21:10:05",
    date: "2026-08-15",
  },
  {
    id: "TXN-98408",
    orderRef: "ORD-8808",
    customerName: "Ananya Roy",
    customerEmail: "ananya.r@gmail.com",
    customerPhone: "+91 98334 45566",
    amount: 620,
    paymentMode: "UPI",
    status: "SUCCESS",
    deviceId: "5B006033",
    timestamp: "2026-08-15 15:30:22",
    date: "2026-08-15",
  },
  {
    id: "TXN-98409",
    orderRef: "ORD-8809",
    customerName: "Manish Joshi",
    customerEmail: "manish.j@gmail.com",
    customerPhone: "+91 98445 56677",
    amount: 1500,
    paymentMode: "CANCELLED",
    status: "CANCELLED",
    deviceId: "5B006033",
    timestamp: "2026-08-15 11:20:00",
    date: "2026-08-15",
  },
  {
    id: "TXN-98410",
    orderRef: "ORD-8810",
    customerName: "Pooja Malhotra",
    customerEmail: "pooja.m@gmail.com",
    customerPhone: "+91 98556 67788",
    amount: 2150,
    paymentMode: "UPI",
    status: "SUCCESS",
    deviceId: "5B006033",
    timestamp: "2026-08-14 20:45:12",
    date: "2026-08-14",
  },
];

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
  try {
    const response = await fetch(`${API_BASE_URL}/payments/pos/transactions`);
    if (!response.ok) {
      return [];
    }
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data.map((item: any) => ({
        id: item.transactionId || item.id || `TXN-${Date.now()}`,
        orderRef: item.externalRefNumber || item.orderRef || "ORD-LIVE",
        customerName: item.customerName || item.customerEmail?.split("@")[0] || "POS Customer",
        customerEmail: item.customerEmail || "customer@menuvora.ai",
        customerPhone: item.customerMobileNumber || item.customerPhone || "",
        amount: item.amount || 0,
        paymentMode: item.paymentMode || "RAZORPAY_POS",
        status: item.status || "SUCCESS",
        deviceId: item.deviceId || "5B006033",
        timestamp: item.timestamp || new Date().toISOString().replace("T", " ").substring(0, 19),
        date: item.date || new Date().toISOString().substring(0, 10),
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch live transactions:", error);
    return [];
  }
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

