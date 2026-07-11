import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/common";
import { mockNotificationCount, mockUser } from "@/data/mock";
import { ROUTES } from "@/constants/routes";

export function TopBar({ title }: { title: string }) {
  const [notifs, setNotifs] = useState(mockNotificationCount);
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-4 px-6 py-4 bg-card border-b border-border sticky top-0 z-10">
      <h1 className="text-lg font-bold text-foreground flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h1>
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Search..."
          className="pl-9 pr-4 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-48"
        />
      </div>
      <button
        className="relative p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer"
        onClick={() => setNotifs(0)}
      >
        <Bell className="w-5 h-5" />
        {notifs > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">{notifs}</span>
        )}
      </button>
      <button type="button" onClick={() => navigate(ROUTES.PROFILE)} className="cursor-pointer">
        <Avatar name={mockUser.name} size={9} />
      </button>
    </header>
  );
}
