/**
 * Application-level providers.
 * Phase 1: none required (no Auth/Theme providers yet).
 * Phase 2+: wrap Router, Auth, Query, Toast providers here.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
