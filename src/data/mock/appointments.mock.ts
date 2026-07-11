export const mockAppointments = [
  { date: "Jul 12, 2026", type: "TSH Blood Test", doctor: "Lab Corp", status: "upcoming" as const, note: "Fasting required 12h prior" },
  { date: "Jul 28, 2026", type: "Endocrinologist Visit", doctor: "Dr. Emily Chen", status: "upcoming" as const, note: "Bring medication list" },
  { date: "Oct 3, 2026", type: "Whole Body Scan", doctor: "Nuclear Medicine", status: "scheduled" as const, note: "Low-iodine diet 14 days prior" },
  { date: "Jan 15, 2026", type: "TSH Blood Test", doctor: "Lab Corp", status: "completed" as const, note: "TSH: 0.8 mIU/L — optimal" },
  { date: "Nov 20, 2025", type: "Follow-up Visit", doctor: "Dr. Emily Chen", status: "completed" as const, note: "Levothyroxine adjusted to 100mcg" },
  { date: "Sep 15, 2025", type: "Thyroidectomy Surgery", doctor: "Dr. Robert Park", status: "completed" as const, note: "Total thyroidectomy — DTC papillary" },
];

export const mockTshHistory = [
  { date: "Jan 2026", value: "0.8", status: "optimal" as const },
  { date: "Oct 2025", value: "1.2", status: "normal" as const },
  { date: "Sep 2025", value: "12.4", status: "high" as const },
];

export const mockNextAppointment = {
  type: "TSH Blood Test",
  date: "Jul 12, 2026",
  subtitle: "in 8 days · Lab Corp",
  warning: "Fasting required 12 hours prior",
};
