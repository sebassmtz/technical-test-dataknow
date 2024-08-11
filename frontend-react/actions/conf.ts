import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default instance;