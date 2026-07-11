import { Outlet } from "react-router";

/** Auth shell — login / register keep their existing full-page layouts. */
export function AuthLayout() {
  return <Outlet />;
}
