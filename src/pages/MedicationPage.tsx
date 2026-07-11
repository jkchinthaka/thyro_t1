import { useState } from "react";
import { AlertTriangle, CheckCircle, Plus } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, Badge, Btn } from "@/components/common";
import { DashboardLayout } from "@/layouts";
import { TEAL, GREEN } from "@/constants/colors";
import type { SetScreen } from "@/types";
import {
  mockMedications,
  mockAdherenceData,
  mockPrescriptionInfo,
  mockInitialTaken,
} from "@/data/mock";

export function MedicationPage({ setScreen }: { setScreen: SetScreen }) {
  const [taken, setTaken] = useState<string[]>([...mockInitialTaken]);

  const meds = mockMedications;
  const adherenceData = mockAdherenceData;

  return (
    <DashboardLayout screen="medication" setScreen={setScreen} title="Medication Management">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Medications list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today&apos;s Medications</h2>
            <Badge color="green">3 of 4 taken</Badge>
          </div>

          {meds.map(med => {
            const isTaken = taken.includes(med.id);
            const Icon = med.icon;
            return (
              <Card key={med.id} className={`border-l-4 transition-all ${isTaken ? "opacity-70" : ""}`} style={{ borderLeftColor: med.color }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${med.color}18` }}>
                    <Icon className="w-6 h-6" style={{ color: med.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{med.name}</h3>
                      <Badge color={isTaken ? "green" : "blue"}>{isTaken ? "Taken" : "Pending"}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{med.dose} · {med.time}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{med.instruction}</p>
                  </div>
                  <button
                    onClick={() => setTaken(t => isTaken ? t.filter(x => x !== med.id) : [...t, med.id])}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                      isTaken
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "text-white hover:opacity-90"
                    }`}
                    style={!isTaken ? { background: `linear-gradient(135deg, ${med.color}, ${TEAL})` } : {}}
                  >
                    {isTaken ? <><CheckCircle className="w-4 h-4" /> Taken</> : <><Plus className="w-4 h-4" /> Mark Taken</>}
                  </button>
                </div>
              </Card>
            );
          })}

          {/* Missed alert */}
          <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Missed medication reminder</p>
              <p className="text-xs text-amber-700 mt-0.5">You missed Calcium Carbonate on Monday. Consistent medication adherence is critical for your recovery. Please consult your doctor if you frequently miss doses.</p>
            </div>
          </div>
        </div>

        {/* Sidebar: adherence chart */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Adherence Rate</h3>
            <div className="text-4xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: GREEN }}>94%</div>
            <p className="text-sm text-muted-foreground mb-4">Last 30 days — excellent!</p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={adherenceData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: GRAY }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: GRAY }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="pct" fill={TEAL} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Prescription Info</h3>
            <div className="space-y-3 text-sm">
              {mockPrescriptionInfo.map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-semibold text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
            <Btn className="w-full justify-center mt-4" variant="ghost" size="sm">Request Refill</Btn>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
