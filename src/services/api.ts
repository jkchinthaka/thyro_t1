/**
 * Axios API client foundation for future backend integration.
 * Phase 3: configured only — no real endpoints are called.
 * Auth interceptors are stubs for Phase 6 JWT work.
 */
import axios from "axios";
import { env } from "@/config/env";

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Phase 6: attach Authorization bearer token from secure session storage.
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // Phase 6: handle 401 refresh / logout. Do not call real APIs in Phase 3.
    return Promise.reject(error);
  },
);
