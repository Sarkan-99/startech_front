import axios from "axios";

export const axiosDB = axios.create({
  baseURL : 'http://127.0.0.1:8000/api',
  headers : {
    "Content-Type" : 'application/json',
    Authorization : `Bearer ${localStorage.getItem('google_access_token')}`
  }
})

