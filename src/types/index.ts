import type { ComponentType } from "react";

export type Screen =
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "chat"
  | "medication"
  | "diet"
  | "symptoms"
  | "followup"
  | "progress"
  | "education"
  | "profile"
  | "emergency";

/** Callback used by pages/layouts until React Router (Phase 2). */
export type SetScreen = (screen: Screen) => void;

export interface ChatMsg {
  id: number;
  from: "ai" | "user";
  text: string;
  time: string;
}

export type BadgeColor = "blue" | "teal" | "green" | "amber" | "red" | "purple";

export type AppointmentStatus = "upcoming" | "scheduled" | "completed";

export type TshStatus = "optimal" | "normal" | "high";

export type IodineSeverity = "high" | "medium" | "low";

export type DietTab = "eat" | "avoid" | "meals";

export type ResourcesTab = "articles" | "videos" | "faqs";

export type ProfileTab = "personal" | "medical" | "settings";

export interface NavItem {
  id: Screen;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface MedicationItem {
  id: string;
  name: string;
  dose: string;
  time: string;
  instruction: string;
  color: string;
  icon: ComponentType<{ className?: string }>;
}

export interface AppointmentItem {
  date: string;
  type: string;
  doctor: string;
  status: AppointmentStatus;
  note: string;
}

export interface SymptomOption {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface ResourceArticle {
  title: string;
  category: string;
  time: string;
  badge: string;
  new: boolean;
}

export interface ResourceVideo {
  title: string;
  duration: string;
  thumbnail: string;
}

export interface ResourceFaq {
  q: string;
  a: string;
}

export interface WeeklyHealthPoint {
  day: string;
  score: number;
  mood: number;
  meds: number;
}

export interface WellnessSlice {
  name: string;
  value: number;
  color: string;
}
