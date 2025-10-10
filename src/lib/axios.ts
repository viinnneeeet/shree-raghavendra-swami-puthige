import axios from 'axios';
const RENDER_BASE_URL = 'https://rest-shop.onrender.com';
const LOCAL_HOST_BASE_URL = ' http://localhost:8626';
import { secureStorage } from '@/utils/secureStorage';
// Base API instance
const api = axios.create({
  baseURL: RENDER_BASE_URL,
  timeout: 10000, // 10s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (e.g. attach auth token)
api.interceptors.request.use(
  (config) => {
    const token = secureStorage.get('temple_admin_token');
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
    const status = error.response?.status;

    if ([401, 403].includes(status)) {
      console.warn(`Unauthorized (${status}), redirecting to login...`);
      secureStorage.remove('temple_admin_token');
      secureStorage.remove('temple_admin_session');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
