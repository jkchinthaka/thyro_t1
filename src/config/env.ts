/**
 * Centralized frontend environment config.
 * Do not read import.meta.env directly from components.
 */

const DEFAULT_API_BASE_URL = "http://localhost:8000/api/v1";
const DEFAULT_APP_NAME = "ThyroCare AI";

function readEnv(key: keyof ImportMetaEnv, fallback: string): string {
  const value = import.meta.env[key];
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return fallback;
}

const appEnvironment = readEnv("VITE_APP_ENV", import.meta.env.MODE || "development");
const isProduction = appEnvironment === "production" || import.meta.env.PROD;
const isDevelopment = !isProduction;

const apiBaseUrl = readEnv("VITE_API_BASE_URL", DEFAULT_API_BASE_URL);

if (isProduction && !import.meta.env.VITE_API_BASE_URL) {
  console.error(
    "[env] VITE_API_BASE_URL is required in production. Using development default is unsafe for deployed builds.",
  );
}

export const env = Object.freeze({
  apiBaseUrl,
  appName: readEnv("VITE_APP_NAME", DEFAULT_APP_NAME),
  appEnvironment,
  isDevelopment,
  isProduction,
});

export type AppEnv = typeof env;
