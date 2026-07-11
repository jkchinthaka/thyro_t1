import { CheckCircle, Plus } from "lucide-react";
import { Card, Badge } from "@/components/common";
import { TEAL } from "@/constants/colors";
import type { ComponentType } from "react";

export function MedicationCard({
  med,
  isTaken,
  onToggle,
}: {
  med: {
    id: string;
    name: string;
    dose: string;
    time: string;
    instruction: string;
    color: string;
    icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  };
  isTaken: boolean;
  onToggle: () => void;
}) {
  const Icon = med.icon;
  return (
    <Card className={`border-l-4 transition-all ${isTaken ? "opacity-70" : ""}`} style={{ borderLeftColor: med.color }}>
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
          onClick={onToggle}
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
}
