import { z } from "zod";

export const profilePersonalSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").min(2, "Enter your full name"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  phone: z.string().trim().min(1, "Phone is required"),
  location: z.string().trim().min(1, "Location is required"),
  emergencyContact: z.string().trim().min(1, "Emergency contact is required"),
});

export type ProfilePersonalValues = z.infer<typeof profilePersonalSchema>;
