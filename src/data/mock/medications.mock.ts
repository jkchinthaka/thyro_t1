import { Pill, Droplets, Sun, Calendar } from "lucide-react";
import { BLUE, TEAL, AMBER, GREEN } from "@/constants/colors";

export const mockMedications = [
  { id: "levo-morning", name: "Levothyroxine", dose: "100 mcg", time: "7:00 AM", instruction: "30 min before breakfast with water", color: BLUE, icon: Pill },
  { id: "calcium", name: "Calcium Carbonate", dose: "500 mg", time: "12:00 PM", instruction: "With lunch", color: TEAL, icon: Droplets },
  { id: "vit-d", name: "Vitamin D3", dose: "2000 IU", time: "12:00 PM", instruction: "With a fatty meal", color: AMBER, icon: Sun },
  { id: "levo-evening", name: "Levothyroxine check", dose: "Lab reminder", time: "Next Thursday", instruction: "TSH blood draw — fasting required", color: GREEN, icon: Calendar },
];

export const mockAdherenceData = [
  { week: "W1", pct: 88 }, { week: "W2", pct: 94 }, { week: "W3", pct: 91 },
  { week: "W4", pct: 97 }, { week: "W5", pct: 94 },
];

export const mockPrescriptionInfo = [
  { label: "Prescriber", value: "Dr. Emily Chen" },
  { label: "Pharmacy", value: "MedPlus Pharmacy" },
  { label: "Refill Date", value: "July 28, 2026" },
  { label: "Refills Left", value: "2 remaining" },
];

export const mockInitialTaken = ["levo-morning"];
