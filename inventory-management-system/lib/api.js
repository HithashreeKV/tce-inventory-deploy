const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const apiCall = async (endpoint, options = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
  } = options;

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || "API Error");
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error at ${endpoint}:`, error.message);
    if (error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend at ${API_BASE_URL}. Make sure the server is running on port 5000.`);
    }
    throw error;
  }
};

export const authAPI = {
  signup: (name, email, password) =>
    apiCall("/auth/signup", {
      method: "POST",
      body: { name, email, password },
    }),
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: { email, password },
    }),
};

export const productAPI = {
  getAll: () => apiCall("/products", { method: "GET" }),
  add: (name, description, masterCount) =>
    apiCall("/products", {
      method: "POST",
      body: { name, description, masterCount },
    }),
  updateMaster: (id, masterCount) =>
    apiCall(`/products/${id}/master`, {
      method: "PUT",
      body: { masterCount },
    }),
};

export const transactionAPI = {
  getAll: () => apiCall("/transactions", { method: "GET" }),
  create: (productId, studentName, usn, section, transactionType, phoneNumber, quantity, takenDate, returnDate) => {
    const body = {
      productId,
      student_name: studentName,
      usn,
      section,
      issue_date: takenDate || new Date().toISOString().split("T")[0],
      transaction_type: transactionType === 'purchase' ? 'purchased' : 'borrowed',
    };
    if (phoneNumber) {
      body.phone_number = phoneNumber;
    }
    if (quantity) {
      body.quantity = quantity;
    }
    if (returnDate) {
      body.return_date = returnDate;
    }
    return apiCall("/transactions", {
      method: "POST",
      body,
    });
  },
  delete: (id) =>
    apiCall(`/transactions/${id}`, {
      method: "DELETE",
    }),
  return: (id) =>
    apiCall(`/transactions/${id}/return`, {
      method: "PUT",
    }),
};

export const logsAPI = {
  downloadPDF: (month) => {
    window.location.href = `${API_BASE_URL}/logs/download?month=${month}`;
  },
  getMonthlySummary: (months = 6) =>
    apiCall(`/logs/monthly?months=${months}`, { method: "GET" }),
};
