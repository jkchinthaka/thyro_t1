import { z } from "zod";

export const appointmentSchema = z.object({
  type: z.string().trim().min(1, "Appointment type is required"),
  date: z.string().min(1, "Date is required"),
  time: z
    .string()
    .min(1, "Time is required")
    .refine((v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v), "Use HH:MM format"),
  doctor: z.string().trim().optional(),
  note: z.string().trim().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
