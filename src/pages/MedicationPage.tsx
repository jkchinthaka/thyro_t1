import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Badge, Btn } from "@/components/common";
import { MedicationCard } from "@/components/medication";
import { TEAL, GREEN, GRAY } from "@/constants/colors";
import {
  mockMedications,
  mockAdherenceData,
  mockPrescriptionInfo,
  mockInitialTaken,
} from "@/data/mock";
import { useToast } from "@/hooks/useToast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function MedicationPage() {
  useDocumentTitle("Medications");
  const { success, info } = useToast();
  const [taken, setTaken] = useState<string[]>([...mockInitialTaken]);

  const meds = mockMedications;
  const adherenceData = mockAdherenceData;

  const toggleTaken = (id: string, name: string, isTaken: boolean) => {
    setTaken((t) => (isTaken ? t.filter((x) => x !== id) : [...t, id]));
    if (isTaken) info(`${name} marked as pending`);
    else success(`${name} marked as taken`);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Medications list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-bold text-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Today&apos;s Medications
            </h2>
            <Badge color="green">3 of 4 taken</Badge>
          </div>

          {meds.map((med) => {
            const isTaken = taken.includes(med.id);
            return (
              <MedicationCard
                key={med.id}
                med={med}
                isTaken={isTaken}
                onToggle={() => toggleTaken(med.id, med.name, isTaken)}
              />
            );
          })}

          {/* Missed alert */}
          <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Missed medication reminder</p>
              <p className="text-xs text-amber-700 mt-0.5">
                You missed Calcium Carbonate on Monday. Consistent medication adherence is critical
                for your recovery. Please consult your doctor if you frequently miss doses.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: adherence chart */}
        <div className="space-y-4">
          <Card>
            <h3
              className="font-bold text-foreground mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Adherence Rate
            </h3>
            <div
              className="text-4xl font-extrabold mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: GREEN }}
            >
              94%
            </div>
            <p className="text-sm text-muted-foreground mb-4">Last 30 days — excellent!</p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={adherenceData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: GRAY }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: GRAY }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="pct" fill={TEAL} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3
              className="font-bold text-foreground mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Prescription Info
            </h3>
            <div className="space-y-3 text-sm">
              {mockPrescriptionInfo.map((r) => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-semibold text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
            <Btn className="w-full justify-center mt-4" variant="ghost" size="sm">
              Request Refill
            </Btn>
          </Card>
        </div>
      </div>
    </>
  );
}
