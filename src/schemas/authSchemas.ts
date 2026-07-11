import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required").min(2, "Enter your full name"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    age: z
      .string()
      .trim()
      .min(1, "Age is required")
      .refine((v) => {
        const n = Number(v);
        return Number.isFinite(n) && n >= 1 && n <= 120;
      }, "Enter a valid age"),
    gender: z.enum(["female", "male", "other"]),
    surgeryDate: z.string().min(1, "Date of surgery is required"),
    rai: z.enum(["yes", "no"], {
      error: "Select RAI treatment status",
    }),
    consent: z.boolean().refine((v) => v === true, {
      message: "You must agree to the Terms and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
