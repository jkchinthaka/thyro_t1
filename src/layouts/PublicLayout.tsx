import { Outlet } from "react-router";

/** Public shell — pages keep their own chrome (landing / emergency). */
export function PublicLayout() {
  return <Outlet />;
}
