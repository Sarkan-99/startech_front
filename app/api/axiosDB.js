import axios from "axios";

export const axiosDB = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

axiosDB.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Client-side: Access cookies using `document.cookie`
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        // console.log('hello from getCookie before returning');
        if (parts.length === 2) {
          const cookieValue = parts.pop().split(";").shift();
        //   console.log('cookie value found: ', cookieValue);
          // Decode the URI-encoded cookie value if necessary
          return decodeURIComponent(cookieValue.replace('%7C', '|'));
        }
        console.log('cookie not found');
        return null;
      };
      
      const token = getCookie("google_access_token");
    //   console.log('getCookie result: ', token);
      if (token) {
        // console.log('lkjhgfdsqsdfghjklmùmlkjhgfdxsw<wxdfghjklmùmlkjhgfdsqsdfghjklm')
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        console.log('token not defined')
      }
    } else {
      console.log("Server-side request: no document.cookie available");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
