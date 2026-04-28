import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  // Jika 'localhost' tidak jalan, coba ganti ke 'http://127.0.0.1:8080/api'
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
