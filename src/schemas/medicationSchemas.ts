import { z } from "zod";

/** Schema for future/inline medication logging — used when a medication form is shown. */
export const medicationSchema = z.object({
  name: z.string().trim().min(1, "Medication name is required"),
  dosage: z.string().trim().min(1, "Dosage is required"),
  frequency: z.string().trim().min(1, "Frequency is required"),
  reminderTime: z
    .string()
    .optional()
    .refine((v) => !v || /^([01]\d|2[0-3]):[0-5]\d$/.test(v), "Use HH:MM format"),
});

export type MedicationFormValues = z.infer<typeof medicationSchema>;
