/**
 * Temporary mock authentication for routing demonstration. Replace during Phase 6.
 *
 * Development-only. No APIs, no JWTs, no PHI. sessionStorage holds only a
 * boolean + role string for refresh-safe protected routing demos.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { mockUser } from "@/data/mock";

export type UserRole = "PATIENT" | "ADMIN" | "MEDICAL_EXPERT";

export interface MockAuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

interface AuthContextValue {
  user: MockAuthUser | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  /** Mock sign-in as demo patient. */
  login: () => void;
  /** Mock registration — same as login for current demo flow. */
  register: () => void;
  logout: () => void;
}

const STORAGE_KEY = "thyrocare_mock_auth";

interface StoredMockAuth {
  authenticated: boolean;
  role: UserRole;
}

function readStoredAuth(): StoredMockAuth | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredMockAuth;
    if (typeof parsed?.authenticated !== "boolean" || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredAuth(value: StoredMockAuth | null) {
  try {
    if (!value) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
  } catch {
    // Ignore storage failures in demo mode
  }
}

function buildPatientUser(): MockAuthUser {
  return {
    id: "mock-patient-sarah",
    name: mockUser.name,
    email: mockUser.email,
    role: "PATIENT",
    isAuthenticated: true,
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockAuthUser | null>(() => {
    const stored = readStoredAuth();
    if (stored?.authenticated) {
      return {
        ...buildPatientUser(),
        role: stored.role,
      };
    }
    return null;
  });

  const login = useCallback(() => {
    const next = buildPatientUser();
    writeStoredAuth({ authenticated: true, role: next.role });
    setUser(next);
  }, []);

  const register = useCallback(() => {
    // Preserve existing demo: Create Account → dashboard as authenticated patient
    login();
  }, [login]);

  const logout = useCallback(() => {
    writeStoredAuth(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user?.isAuthenticated),
      role: user?.role ?? null,
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
