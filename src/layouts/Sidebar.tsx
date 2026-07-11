import {
  Heart,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { BLUE, TEAL } from "@/constants/colors";
import { navItems } from "@/constants/navigation";
import type { Screen } from "@/types";

export function Sidebar({ current, setScreen, collapsed, setCollapsed }: {
  current: Screen; setScreen: (s: Screen) => void;
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <aside
      className="flex flex-col border-r border-border bg-card transition-all duration-300 z-20"
      style={{ width: collapsed ? 64 : 220, minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
          <Heart className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="leading-none">
            <div className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ThyroCare</div>
            <div className="text-[10px] text-muted-foreground font-medium">AI Support</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-muted-foreground hover:text-foreground transition">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id as Screen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group ${
                active
                  ? "text-white shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              style={active ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Emergency + Logout */}
      <div className="px-2 pb-4 space-y-1">
        <button
          onClick={() => setScreen("emergency")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
            current === "emergency" ? "bg-red-500 text-white" : "text-red-500 hover:bg-red-50"
          }`}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Emergency</span>}
        </button>
        <button
          onClick={() => setScreen("landing")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 cursor-pointer"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
