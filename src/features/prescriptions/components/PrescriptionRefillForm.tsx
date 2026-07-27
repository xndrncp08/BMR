"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { FormField } from "@/components/shared/FormField";
import { getInputClassName } from "@/components/shared/input-styles";
import {
  prescriptionRefillSchema,
  type PrescriptionRefillInput,
} from "../schema";

type FieldErrors = Partial<Record<keyof PrescriptionRefillInput, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialValues: PrescriptionRefillInput = {
  customerName: "",
  email: "",
  phone: "",
  medicineName: "",
  prescriptionNumber: "",
  notes: "",
};

export function PrescriptionRefillForm() {
  const [values, setValues] = useState<PrescriptionRefillInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(field: keyof PrescriptionRefillInput) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const result = prescriptionRefillSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof PrescriptionRefillInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setServerError(
          data?.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setServerError(
        "Network error — please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-secondary/30 bg-secondary-light p-6">
        <p className="font-semibold text-secondary-dark">Request received!</p>
        <p className="mt-1 text-sm text-secondary-dark">
          We&apos;ll text or email you when your prescription is ready. Call us
          directly if it&apos;s urgent.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <div
          role="alert"
          className="rounded-md bg-error-light px-4 py-3 text-sm text-error"
        >
          {serverError}
        </div>
      )}

      <FormField
        label="Full Name"
        htmlFor="customerName"
        error={errors.customerName}
        required
      >
        <input
          id="customerName"
          type="text"
          value={values.customerName}
          onChange={handleChange("customerName")}
          autoComplete="name"
          className={getInputClassName(!!errors.customerName)}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            autoComplete="email"
            className={getInputClassName(!!errors.email)}
          />
        </FormField>
        <FormField label="Phone" htmlFor="phone" error={errors.phone} required>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            autoComplete="tel"
            className={getInputClassName(!!errors.phone)}
          />
        </FormField>
      </div>

      <FormField
        label="Medicine Name"
        htmlFor="medicineName"
        error={errors.medicineName}
        required
      >
        <input
          id="medicineName"
          type="text"
          value={values.medicineName}
          onChange={handleChange("medicineName")}
          className={getInputClassName(!!errors.medicineName)}
        />
      </FormField>

      <FormField
        label="Prescription Number"
        htmlFor="prescriptionNumber"
        error={errors.prescriptionNumber}
        hint="Optional — found on your prescription label"
      >
        <input
          id="prescriptionNumber"
          type="text"
          value={values.prescriptionNumber}
          onChange={handleChange("prescriptionNumber")}
          className={getInputClassName(!!errors.prescriptionNumber)}
        />
      </FormField>

      <FormField
        label="Notes"
        htmlFor="notes"
        error={errors.notes}
        hint="Optional — anything else we should know"
      >
        <textarea
          id="notes"
          rows={4}
          value={values.notes}
          onChange={handleChange("notes")}
          className={getInputClassName(!!errors.notes)}
        />
      </FormField>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? "Submitting..." : "Submit Refill Request"}
      </Button>
    </form>
  );
}
