import { useState } from "react";
import { Camera, Edit2 } from "lucide-react";
import { Card, Badge, Btn } from "@/components/common";
import { DashboardLayout } from "@/layouts";
import { BLUE, TEAL } from "@/constants/colors";
import type { SetScreen } from "@/types";
import { mockUser } from "@/data/mock";

export function ProfilePage({ setScreen }: { setScreen: SetScreen }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [tab, setTab] = useState<"personal" | "medical" | "settings">("personal");

  return (
    <DashboardLayout screen="profile" setScreen={setScreen} title="My Profile">
      <div className="max-w-3xl">
        {/* Profile header */}
        <Card className="mb-5">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="relative">
              <img
                src={mockUser.avatarUrl}
                alt={mockUser.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mockUser.name}</h2>
              <p className="text-muted-foreground text-sm">{mockUser.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {mockUser.badges.map(b => (
                  <Badge key={b.label} color={b.color}>{b.label}</Badge>
                ))}
              </div>
            </div>
            <Btn variant="ghost" size="sm"><Edit2 className="w-4 h-4" /> Edit Profile</Btn>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(["personal", "medical", "settings"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer capitalize ${
                tab === t ? "text-white" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
              style={tab === t ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "personal" && (
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockUser.personalFields.map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{f.label}</label>
                  <div className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "medical" && (
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockUser.medicalFields.map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{f.label}</label>
                  <div className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "settings" && (
          <Card className="space-y-4">
            {[
              { label: "Medication Reminders", sub: "Get notified when it's time for your medication", state: notifications, set: setNotifications },
              { label: "Appointment Reminders", sub: "Receive alerts 24h before appointments", state: true, set: () => {} },
              { label: "Weekly Health Reports", sub: "Get your health summary every Sunday", state: true, set: () => {} },
              { label: "Dark Mode", sub: "Switch to a darker interface", state: darkMode, set: setDarkMode },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="font-semibold text-sm text-foreground">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
                <button
                  onClick={() => s.set(!s.state)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${s.state ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${s.state ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
            <div className="pt-2">
              <Btn variant="danger" size="sm">Delete Account</Btn>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
