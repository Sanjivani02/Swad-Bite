import axios from "axios";

// Create a single API instance pointing to Render backend
const API = axios.create({
  baseURL: "https://swadbite-backend-2.onrender.com/api", // ✅ your deployed backend
});

// Orders
export const createOrder = (data) => API.post("/orderHistory", data);
export const getAllOrders = () => API.get("/orderHistory");
export const getOrdersByUser = (userId) => API.get(`/orderHistory/${userId}`);
export const saveOrder = (data) => API.post("/orderHistory", data);

// Feedback
export const getFeedback = () => API.get("/feedback");
export const submitFeedback = (data) => API.post("/feedback", data);
