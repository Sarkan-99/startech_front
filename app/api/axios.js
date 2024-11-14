import axios from "axios";

export const axiosDB = axios.create({
  baseURL: 'https://backend.competence-info.com/api',
  //baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    "Content-Type": 'application/json',
  }
});

// Set up an interceptor
axiosDB.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('google_access_token') : null;
    
    if (token) {
      // If token exists, attach it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      // If no token, redirect the user
      window.location.href = '/';
      return Promise.reject(new Error("No token found"));
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
