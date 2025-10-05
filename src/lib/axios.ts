import axios from 'axios';
const RENDER_BASE_URL = 'https://rest-shop.onrender.com';
const LOCAL_HOST_BASE_URL = ' http://localhost:8626';
// Base API instance
const api = axios.create({
  baseURL: LOCAL_HOST_BASE_URL,
  timeout: 10000, // 10s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (e.g. attach auth token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g. handle 401 errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: redirect to login or refresh token
      console.warn('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default api;
