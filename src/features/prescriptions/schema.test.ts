import { describe, expect, it } from "vitest";
import { prescriptionRefillSchema } from "./schema";

const validInput = {
  customerName: "Jamie Rivera",
  email: "jamie@example.com",
  phone: "555-123-4567",
  medicineName: "Lisinopril 10mg",
  prescriptionNumber: "RX-2024-001",
  notes: "",
};

describe("prescriptionRefillSchema", () => {
  it("accepts valid input", () => {
    const result = prescriptionRefillSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = prescriptionRefillSchema.safeParse({ ...validInput, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a name that's too short", () => {
    const result = prescriptionRefillSchema.safeParse({ ...validInput, customerName: "J" });
    expect(result.success).toBe(false);
  });

  it("allows prescriptionNumber and notes to be empty", () => {
    const result = prescriptionRefillSchema.safeParse({
      ...validInput,
      prescriptionNumber: "",
      notes: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing medicine name", () => {
    const result = prescriptionRefillSchema.safeParse({ ...validInput, medicineName: "" });
    expect(result.success).toBe(false);
  });
});
