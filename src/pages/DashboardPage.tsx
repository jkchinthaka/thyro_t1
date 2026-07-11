import { CheckCircle, Clock } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, Badge } from "@/components/common";
import { DashboardLayout } from "@/layouts";
import { BLUE, GRAY } from "@/constants/colors";
import type { Screen, SetScreen } from "@/types";
import {
  mockDashboardCards,
  mockDashboardQuickStats,
  mockDashboardWeekData,
  mockDashboardReminders,
} from "@/data/mock";

export function DashboardPage({ setScreen }: { setScreen: SetScreen }) {
  const cards = mockDashboardCards;
  const weekData = mockDashboardWeekData;

  return (
    <DashboardLayout screen="dashboard" setScreen={setScreen} title="Good morning, Sarah 👋">
      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockDashboardQuickStats.map(s => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {s.value}<span className="text-sm font-normal text-muted-foreground">{s.unit}</span>
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map(c => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setScreen(c.id as Screen)}
              className="text-left bg-white rounded-2xl border border-border p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ background: c.bg }}>
                <Icon className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div className="font-bold text-sm text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.label}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{c.value}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Bottom grid: chart + alerts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Weekly Health Score</h3>
            <Badge color="blue">This week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weekData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BLUE} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: GRAY }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: GRAY }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="score" stroke={BLUE} strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: BLUE, strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today&apos;s Reminders</h3>
          <div className="space-y-3">
            {mockDashboardReminders.map(r => (
              <div key={r.task} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${r.done ? "bg-green-100" : "bg-muted"}`}>
                  {r.done ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${r.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{r.task}</div>
                  <div className="text-xs text-muted-foreground">{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
