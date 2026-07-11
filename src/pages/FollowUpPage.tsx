import { Plus, CheckCircle, Calendar, AlertTriangle } from "lucide-react";
import { Card, Badge, Btn } from "@/components/common";
import { BLUE, TEAL } from "@/constants/colors";
import {
  mockAppointments,
  mockTshHistory,
  mockNextAppointment,
} from "@/data/mock";

export function FollowUpPage() {
  const appointments = mockAppointments;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Care Timeline</h2>
            <Btn size="sm" variant="ghost"><Plus className="w-4 h-4" /> Add Appointment</Btn>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-4">
              {appointments.map((a, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-background z-10 ${
                    a.status === "completed" ? "bg-green-500" : a.status === "upcoming" ? "bg-primary" : "bg-muted"
                  }`}>
                    {a.status === "completed" ? <CheckCircle className="w-5 h-5 text-white" /> : <Calendar className="w-5 h-5 text-white" />}
                  </div>
                  <Card className={`flex-1 ${a.status === "upcoming" ? "border-primary/30 bg-blue-50/50" : ""}`}>
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{a.type}</h3>
                          <Badge color={a.status === "completed" ? "green" : a.status === "upcoming" ? "blue" : "purple"}>
                            {a.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{a.doctor} · {a.date}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.note}</p>
                      </div>
                      {a.status !== "completed" && (
                        <Btn size="sm" variant="ghost">Reschedule</Btn>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Next Appointment</h3>
            <div className="rounded-xl p-4" style={{ background: `linear-gradient(135deg, ${BLUE}18, ${TEAL}18)` }}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{mockNextAppointment.type}</p>
              <p className="text-2xl font-extrabold text-foreground mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mockNextAppointment.date}</p>
              <p className="text-sm text-muted-foreground">{mockNextAppointment.subtitle}</p>
              <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-700 font-semibold"><AlertTriangle className="w-3 h-3 inline mr-1" />{mockNextAppointment.warning}</p>
              </div>
            </div>
            <Btn className="w-full justify-center mt-3" variant="ghost" size="sm">Add to Calendar</Btn>
          </Card>

          <Card>
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TSH History</h3>
            <div className="space-y-2 text-sm">
              {mockTshHistory.map(t => (
                <div key={t.date} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.date}</span>
                  <span className="font-bold text-foreground">{t.value} <span className="text-xs font-normal">mIU/L</span></span>
                  <Badge color={t.status === "optimal" ? "green" : t.status === "normal" ? "blue" : "red"}>{t.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
