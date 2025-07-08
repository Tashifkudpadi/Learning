// lib/axios.ts

import axios from "axios";

// Create a base Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Change to your backend URL in production
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set to true if you're using cookies
});

// Automatically attach token from localStorage to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle global response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can catch token expiration, network errors etc. here
    if (error.response?.status === 401) {
      console.warn("Unauthorized - possibly invalid token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
