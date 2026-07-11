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

export interface ChatMsg {
  id: number;
  from: "ai" | "user";
  text: string;
  time: string;
}
