import { z } from "zod";

export const symptomAssessmentSchema = z.object({
  selected: z.array(z.string()).min(1, "Select at least one symptom"),
  severity: z.number().min(1).max(5),
  notes: z.string().trim().max(500, "Notes must be 500 characters or fewer").optional(),
});

export type SymptomAssessmentValues = z.infer<typeof symptomAssessmentSchema>;
