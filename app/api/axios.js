import axios from "axios";

export const axiosDB = axios.create({
    baseURL : 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        
      },
    });
    
    
    axiosDB.interceptors.request.use(
      async config => {
        const googleToken = localStorage.getItem('google_access_token');
        if (googleToken) {
          config.headers.Authorization = `Bearer ${googleToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );