import axios from "axios";

// ✅ Backend base URL (Render)
const BASE_URL = "https://swad-tgay.onrender.com/api";

// ✅ Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
});

// ---------------- Orders ----------------
export const createOrder = (data) => API.post("/orders", data);
export const getAllOrders = () => API.get("/orders");
export const getOrdersByUser = (userId) => API.get(`/orders/user/${userId}`);
export const saveOrder = (data) => API.post("/orders", data);

// ---------------- Feedback ----------------
export const getFeedback = () => API.get("/feedback");
export const submitFeedback = (data) => API.post("/feedback", data);
