// src/utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/unilink', // ✅ Gateway base URL
});

// 🔍 Log each request URL before sending
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('🔍 Axios Request URL:', config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔒 Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Handle 401 errors globally
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
