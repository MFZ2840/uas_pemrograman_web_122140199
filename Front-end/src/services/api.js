// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:6543";

const api = axios.create({
  baseURL: "http://localhost:6543",
  withCredentials: true, // ✅ ini penting untuk mengirim cookie session
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error logging
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    // Pastikan credentials selalu dikirim
    config.withCredentials = true;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user.token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------------------- TASK API ------------------------- */
export const fetchTasks = () => api.get("/api/tasks").then(res => res.data);
export const createTask = (task) => api.post("/api/tasks", task).then(res => res.data);
export const updateTask = (id, task) => api.put(`/api/tasks/${id}`, task).then(res => res.data);
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`).then(res => res.data);
export const markTaskDone = (id) => api.patch(`/api/tasks/${id}/done`).then(res => res.data);

/* ---------------------- CATEGORY API ------------------------ */
export const fetchCategories = () => api.get("/api/categories").then(res => res.data);
export const createCategory = (category) => api.post("/api/categories", category).then(res => res.data);
export const updateCategory = (id, category) => api.put(`/api/categories/${id}`, category).then(res => res.data);
export const deleteCategory = (id) => api.delete(`/api/categories/${id}`).then(res => res.data);

/* ---------------------- AUTH API ---------------------------- */
export const login = (credentials) => api.post("/api/login", credentials).then(res => res.data);
export const register = (data) => api.post("/api/register", data).then(res => res.data);

/* ---------------------- UTILITY FUNCTIONS ------------------ */
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  // Redirect to login page
  window.location.href = '/login';
};

export default api;