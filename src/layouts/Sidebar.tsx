import { NavLink, useNavigate } from "react-router";
import {
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { BrandLogo } from "@/components/common";
import { BLUE, TEAL } from "@/constants/colors";
import { navItems } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";

export function Sidebar({ collapsed, setCollapsed }: {
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <aside
      className="flex flex-col border-r border-border bg-card transition-all duration-300 z-20"
      style={{ width: collapsed ? 64 : 220, minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <button
          type="button"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="flex items-center gap-3 min-w-0 cursor-pointer"
        >
          <BrandLogo size="sm" />
          {!collapsed && (
            <div className="leading-none text-left">
              <div className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ThyroCare</div>
              <div className="text-[10px] text-muted-foreground font-medium">AI Support</div>
            </div>
          )}
        </button>
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-muted-foreground hover:text-foreground transition">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group ${
                  isActive
                    ? "text-white shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : undefined
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Emergency + Logout */}
      <div className="px-2 pb-4 space-y-1">
        <NavLink
          to={ROUTES.EMERGENCY}
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
              isActive ? "bg-red-500 text-white" : "text-red-500 hover:bg-red-50"
            }`
          }
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Emergency</span>}
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 cursor-pointer"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
