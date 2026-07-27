import { z } from "zod";

export const prescriptionRefillSchema = z.object({
  customerName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  medicineName: z.string().trim().min(2, "Enter the medication name").max(200),
  prescriptionNumber: z.string().trim().max(50).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type PrescriptionRefillInput = z.infer<typeof prescriptionRefillSchema>;
