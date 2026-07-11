import { useState } from "react";
import { AlertTriangle, Stethoscope, Heart, CheckCircle } from "lucide-react";
import { Card, Btn } from "@/components/common";
import { DashboardLayout } from "@/layouts";
import { BLUE, TEAL, GREEN, AMBER, RED } from "@/constants/colors";
import { severityLabels } from "@/constants/status";
import type { SetScreen } from "@/types";
import { mockSymptoms, mockSymptomRecommendations } from "@/data/mock";

export function SymptomsPage({ setScreen }: { setScreen: SetScreen }) {
  const [selected, setSelected] = useState<string[]>(["fatigue"]);
  const [severity, setSeverity] = useState(3);
  const [assessed, setAssessed] = useState(false);

  const symptoms = mockSymptoms;

  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const isCritical = selected.includes("heart-palp") && severity >= 4;

  return (
    <DashboardLayout screen="symptoms" setScreen={setScreen} title="Symptom Checker">
      <div className="max-w-3xl">
        {isCritical && (
          <div className="rounded-2xl p-4 mb-4 bg-red-50 border border-red-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-800">Emergency Warning</p>
              <p className="text-sm text-red-700 mt-0.5">Heart palpitations with high severity may require immediate medical attention. Please contact your doctor or call emergency services.</p>
              <button onClick={() => setScreen("emergency")} className="mt-2 text-sm font-bold text-red-600 hover:underline cursor-pointer">Go to Emergency Support →</button>
            </div>
          </div>
        )}

        <Card className="mb-5">
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Select Your Symptoms</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {symptoms.map(s => {
              const Icon = s.icon;
              const isSelected = selected.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected ? "border-primary bg-blue-50" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isSelected ? "bg-primary" : "bg-muted"}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                  <span className="text-xs font-semibold text-foreground text-center">{s.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="mb-5">
          <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Severity Level: <span style={{ color: severity <= 2 ? GREEN : severity <= 3 ? AMBER : RED }}>{severityLabels[severity]}</span>
          </h3>
          <input
            type="range" min={1} max={5} value={severity}
            onChange={e => setSeverity(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Mild</span><span>Moderate</span><span>Critical</span>
          </div>
        </Card>

        <Btn size="lg" onClick={() => setAssessed(true)}>
          <Stethoscope className="w-5 h-5" /> Get AI Assessment
        </Btn>

        {assessed && (
          <Card className="mt-5 border-l-4" style={{ borderLeftColor: severity >= 4 ? RED : severity >= 3 ? AMBER : GREEN }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AI Health Assessment</h3>
                <p className="text-xs text-muted-foreground">Based on your selected symptoms and severity</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Based on your reported symptoms <strong className="text-foreground">({selected.map(s => symptoms.find(x => x.id === s)?.label).join(", ")})</strong> at severity level {severity}, here is my assessment:</p>
              <p>These symptoms are <strong className="text-foreground">{severity <= 2 ? "within the normal range" : severity <= 3 ? "worth monitoring closely" : "concerning and require attention"}</strong> for someone 9 months post-thyroidectomy. Fatigue and dry mouth are commonly experienced during the hormonal adjustment period.</p>
              <div className="space-y-1.5 bg-blue-50 rounded-xl p-3 mt-3">
                <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide">Recommendations</p>
                <ul className="space-y-1">
                  {mockSymptomRecommendations.map(r => (
                    <li key={r} className="flex items-start gap-1.5 text-blue-700 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
