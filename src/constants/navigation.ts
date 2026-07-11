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
import { ROUTES } from "./routes";

export const navItems: {
  path: string;
  label: string;
  icon: typeof Home;
}[] = [
  { path: ROUTES.DASHBOARD, label: "Dashboard", icon: Home },
  { path: ROUTES.CHAT, label: "AI Chat", icon: MessageCircle },
  { path: ROUTES.MEDICATIONS, label: "Medication", icon: Pill },
  { path: ROUTES.DIET, label: "Diet Guide", icon: Salad },
  { path: ROUTES.SYMPTOMS, label: "Symptoms", icon: Activity },
  { path: ROUTES.FOLLOW_UPS, label: "Follow-up", icon: Calendar },
  { path: ROUTES.ANALYTICS, label: "Progress", icon: TrendingUp },
  { path: ROUTES.RESOURCES, label: "Resources", icon: BookOpen },
  { path: ROUTES.PROFILE, label: "Profile", icon: User },
];
