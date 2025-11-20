// src/api/axios.js
import axios from "axios";
import config from "../utils/config";

const BASE_URL = config.apiBaseUrl;

//  Create Axios instance
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
