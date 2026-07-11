import {
  Home,
  MessageCircle,
  Pill,
  Salad,
  Activity,
  Calendar,
  TrendingUp,
  BookOpen,
  User,
} from "lucide-react";
import type { Screen } from "@/types";

export const navItems: {
  id: Screen;
  label: string;
  icon: typeof Home;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "chat", label: "AI Chat", icon: MessageCircle },
  { id: "medication", label: "Medication", icon: Pill },
  { id: "diet", label: "Diet Guide", icon: Salad },
  { id: "symptoms", label: "Symptoms", icon: Activity },
  { id: "followup", label: "Follow-up", icon: Calendar },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "education", label: "Resources", icon: BookOpen },
  { id: "profile", label: "Profile", icon: User },
];
