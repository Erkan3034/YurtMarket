import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message ?? error.message;
    return Promise.reject(
      new Error(typeof message === "string" ? message : "Bir hata oluştu"),
    );
  },
);

export default api;

