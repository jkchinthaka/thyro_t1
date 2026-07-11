/**
 * Application-level providers.
 * Phase 2: mock AuthProvider for protected routing.
 * Temporary mock authentication for routing demonstration. Replace during Phase 6.
 */
import { AuthProvider } from "@/context/AuthContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
