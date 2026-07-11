import { useState } from "react";
import { AppProviders } from "./providers";
import type { Screen } from "@/types";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  ChatPage,
  MedicationPage,
  DietPage,
  SymptomsPage,
  FollowUpPage,
  AnalyticsPage,
  ResourcesPage,
  ProfilePage,
  EmergencyPage,
} from "@/pages";

/**
 * Phase 1 root: screen-state navigation only.
 * React Router is deferred to Phase 2 (see app/router.tsx).
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");

  const screens: Record<Screen, React.ReactNode> = {
    landing: <LandingPage setScreen={setScreen} />,
    login: <LoginPage setScreen={setScreen} />,
    register: <RegisterPage setScreen={setScreen} />,
    dashboard: <DashboardPage setScreen={setScreen} />,
    chat: <ChatPage setScreen={setScreen} />,
    medication: <MedicationPage setScreen={setScreen} />,
    diet: <DietPage setScreen={setScreen} />,
    symptoms: <SymptomsPage setScreen={setScreen} />,
    followup: <FollowUpPage setScreen={setScreen} />,
    progress: <AnalyticsPage setScreen={setScreen} />,
    education: <ResourcesPage setScreen={setScreen} />,
    profile: <ProfilePage setScreen={setScreen} />,
    emergency: <EmergencyPage setScreen={setScreen} />,
  };

  return (
    <AppProviders>
      <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
        {screens[screen]}
      </div>
    </AppProviders>
  );
}
