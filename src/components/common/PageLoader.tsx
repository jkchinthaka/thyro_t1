/** Minimal neutral Suspense fallback — no new design system. */
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div
        className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
