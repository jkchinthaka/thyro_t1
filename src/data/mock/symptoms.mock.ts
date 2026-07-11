/** Demo symptom options and assessment copy — not clinical decision support. */
import {
  Droplets,
  Eye,
  Coffee,
  Thermometer,
  Zap,
  Wind,
  Activity,
  Heart,
} from "lucide-react";

export const mockSymptoms = [
  { id: "dry-mouth", label: "Dry Mouth", icon: Droplets },
  { id: "taste-change", label: "Taste Changes", icon: Coffee },
  { id: "dry-eyes", label: "Dry Eyes", icon: Eye },
  { id: "swollen-glands", label: "Swollen Glands", icon: Thermometer },
  { id: "fatigue", label: "Fatigue", icon: Zap },
  { id: "nausea", label: "Nausea", icon: Wind },
  { id: "neck-pain", label: "Neck Pain", icon: Activity },
  { id: "heart-palp", label: "Heart Palpitations", icon: Heart },
];

export const mockSymptomRecommendations = [
  "Stay hydrated — aim for 8+ glasses of water daily",
  "Ensure Levothyroxine is taken consistently each morning",
  "Log these symptoms and discuss at your next appointment",
  "Contact Dr. Chen if symptoms worsen over 48 hours",
];
