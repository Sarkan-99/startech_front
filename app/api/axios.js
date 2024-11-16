import axios from "axios";

export const axiosDB = axios.create({
  baseURL: 'https://backend.competence-info.com/api',
  headers: {
    "Content-Type": 'application/json',
  }
});

axiosDB.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('google_access_token') : null;
    
    if (token) {
      
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      
      window.location.href = '/';
      return Promise.reject(new Error("No token found"));
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
