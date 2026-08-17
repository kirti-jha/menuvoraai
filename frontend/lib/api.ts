export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://menuvoraai-backend.vercel.app/api";

// 1. Health Check
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

// 2. User Login
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

// 3. Checkout Order
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

// 4. POS Payment Initiate
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

// 5. POS Payment Status Check
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

// 6. POS Payment Cancel
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
