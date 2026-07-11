import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Edit2 } from "lucide-react";
import { Card, Badge, Btn, Input } from "@/components/common";
import { BLUE, TEAL } from "@/constants/colors";
import { mockUser } from "@/data/mock";
import { profilePersonalSchema, type ProfilePersonalValues } from "@/schemas/profileSchemas";
import { useToast } from "@/hooks/useToast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ProfilePage() {
  useDocumentTitle("Profile");
  const { success } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [tab, setTab] = useState<"personal" | "medical" | "settings">("personal");
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfilePersonalValues>({
    resolver: zodResolver(profilePersonalSchema),
    defaultValues: {
      fullName: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      location: mockUser.location,
      emergencyContact: mockUser.emergencyContact,
    },
  });

  const onSave = (_values: ProfilePersonalValues) => {
    void _values;
    success("Profile saved");
    setEditing(false);
  };

  const settings = [
    {
      label: "Medication Reminders",
      sub: "Get notified when it's time for your medication",
      state: notifications,
      set: setNotifications,
    },
    {
      label: "Appointment Reminders",
      sub: "Receive alerts 24h before appointments",
      state: appointmentReminders,
      set: setAppointmentReminders,
    },
    {
      label: "Weekly Health Reports",
      sub: "Get your health summary every Sunday",
      state: weeklyReports,
      set: setWeeklyReports,
    },
    {
      label: "Dark Mode",
      sub: "Switch to a darker interface",
      state: darkMode,
      set: setDarkMode,
    },
  ];

  return (
    <>
      <div className="max-w-3xl">
        <Card className="mb-5">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="relative">
              <img
                src={mockUser.avatarUrl}
                alt={mockUser.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label="Change profile photo"
              >
                <Camera className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {mockUser.name}
              </h2>
              <p className="text-muted-foreground text-sm break-all">{mockUser.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {mockUser.badges.map((b) => (
                  <Badge key={b.label} color={b.color}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>
            <Btn
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => {
                setTab("personal");
                setEditing(true);
                reset();
              }}
            >
              <Edit2 className="w-4 h-4" aria-hidden="true" /> Edit Profile
            </Btn>
          </div>
        </Card>

        <div
          className="flex gap-2 mb-5 overflow-x-auto"
          role="tablist"
          aria-label="Profile sections"
        >
          {(["personal", "medical", "settings"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer capitalize flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                tab === t ? "text-white" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
              style={tab === t ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "personal" && (
          <Card role="tabpanel">
            {editing ? (
              <form className="space-y-4" onSubmit={handleSubmit(onSave)} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <Input
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
                  <Input
                    label="Location"
                    error={errors.location?.message}
                    {...register("location")}
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Emergency Contact"
                      error={errors.emergencyContact?.message}
                      {...register("emergencyContact")}
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Btn type="submit" size="sm">
                    Save changes
                  </Btn>
                  <Btn
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditing(false);
                      reset();
                    }}
                  >
                    Cancel
                  </Btn>
                </div>
              </form>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {mockUser.personalFields.map((f) => (
                  <div key={f.label}>
                    <div className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {f.label}
                    </div>
                    <div className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground font-medium">
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {tab === "medical" && (
          <Card role="tabpanel">
            <div className="grid sm:grid-cols-2 gap-4">
              {mockUser.medicalFields.map((f) => (
                <div key={f.label}>
                  <div className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {f.label}
                  </div>
                  <div className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground font-medium">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "settings" && (
          <Card className="space-y-4" role="tabpanel">
            {settings.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0"
              >
                <div>
                  <div className="font-semibold text-sm text-foreground">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={s.state}
                  aria-label={s.label}
                  onClick={() => s.set(!s.state)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    s.state ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      s.state ? "translate-x-7" : "translate-x-1"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ))}
            <div className="pt-2">
              <Btn variant="danger" size="sm" type="button">
                Delete Account
              </Btn>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
