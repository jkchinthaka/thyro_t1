/**
 * Centralized route path constants.
 * Use these instead of duplicating path strings across the app.
 */

export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  EMERGENCY: "/emergency",

  // Patient (protected)
  DASHBOARD: "/dashboard",
  CHAT: "/chat",
  MEDICATIONS: "/medications",
  DIET: "/diet",
  SYMPTOMS: "/symptoms",
  FOLLOW_UPS: "/follow-ups",
  ANALYTICS: "/analytics",
  RESOURCES: "/resources",
  PROFILE: "/profile",

  // System
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "*",

  // Future admin (constants only — no admin pages in Phase 2)
  ADMIN_ROOT: "/admin",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Maps legacy Phase 1 screen ids to URL paths (for mock card / nav migration). */
export const SCREEN_PATH: Record<string, string> = {
  landing: ROUTES.HOME,
  login: ROUTES.LOGIN,
  register: ROUTES.REGISTER,
  emergency: ROUTES.EMERGENCY,
  dashboard: ROUTES.DASHBOARD,
  chat: ROUTES.CHAT,
  medication: ROUTES.MEDICATIONS,
  diet: ROUTES.DIET,
  symptoms: ROUTES.SYMPTOMS,
  followup: ROUTES.FOLLOW_UPS,
  progress: ROUTES.ANALYTICS,
  education: ROUTES.RESOURCES,
  profile: ROUTES.PROFILE,
};

/** TopBar / DashboardLayout titles keyed by pathname. */
export const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.DASHBOARD]: "Good morning, Sarah 👋",
  [ROUTES.CHAT]: "AI Health Assistant",
  [ROUTES.MEDICATIONS]: "Medication Management",
  [ROUTES.DIET]: "Low-Iodine Diet Guide",
  [ROUTES.SYMPTOMS]: "Symptom Checker",
  [ROUTES.FOLLOW_UPS]: "Follow-up Care",
  [ROUTES.ANALYTICS]: "Health Progress",
  [ROUTES.RESOURCES]: "Educational Resources",
  [ROUTES.PROFILE]: "My Profile",
};
