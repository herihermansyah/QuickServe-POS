import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

export const api = axios.create({
  baseURL: apiURL.endsWith("/") ? apiURL.slice(0, -1) : apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
