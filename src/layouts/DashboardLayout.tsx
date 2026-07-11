import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import type { Screen, SetScreen } from "@/types";

export function DashboardLayout({ screen, setScreen, title, children }: {
  screen: Screen; setScreen: SetScreen; title: string; children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar current={screen} setScreen={setScreen} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} setScreen={setScreen} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
