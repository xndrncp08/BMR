"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui";
import { FormField, fieldA11y } from "@/components/shared/FormField";
import { FormAlert } from "@/components/shared/FormAlert";
import { SuccessPanel } from "@/components/shared/SuccessPanel";
import { getInputClassName } from "@/components/shared/input-styles";
import { focusFirstInvalid, toFieldErrors } from "@/lib/forms";
import { prescriptionRefillSchema, type PrescriptionRefillInput } from "../schema";

type FieldErrors = Partial<Record<keyof PrescriptionRefillInput, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER = [
  "customerName",
  "email",
  "phone",
  "medicineName",
  "prescriptionNumber",
  "notes",
] as const;

const initialValues: PrescriptionRefillInput = {
  customerName: "",
  email: "",
  phone: "",
  medicineName: "",
  prescriptionNumber: "",
  notes: "",
};

const HINTS = {
  prescriptionNumber: "Found on your prescription label",
  notes: "Dosage, quantity, or preferred pickup time",
};

function FieldsetLegend({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <legend className="mb-5 flex items-center gap-3 font-display text-base font-bold text-neutral-900">
      <span className="grid size-7 place-items-center rounded-full bg-primary-600 font-mono text-xs font-medium text-white">
        {step}
      </span>
      {children}
    </legend>
  );
}

export function PrescriptionRefillForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<PrescriptionRefillInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(field: keyof PrescriptionRefillInput) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const result = prescriptionRefillSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = toFieldErrors<PrescriptionRefillInput>(result.error);
      setErrors(fieldErrors);
      focusFirstInvalid(formRef.current, FIELD_ORDER.filter((f) => fieldErrors[f]));
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
        setServerError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <SuccessPanel
        title="Refill request received!"
        action={
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Submit another request
          </Button>
        }
      >
        We&apos;ll text or email you when your prescription is ready. Call us directly if it&apos;s
        urgent.
      </SuccessPanel>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
      {serverError && <FormAlert>{serverError}</FormAlert>}

      <fieldset>
        <FieldsetLegend step={1}>Your details</FieldsetLegend>
        <div className="space-y-5">
          <FormField label="Full name" htmlFor="customerName" error={errors.customerName} required>
            <input
              id="customerName"
              type="text"
              value={values.customerName}
              onChange={handleChange("customerName")}
              autoComplete="name"
              className={getInputClassName(!!errors.customerName)}
              {...fieldA11y("customerName", { error: errors.customerName })}
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
                inputMode="email"
                className={getInputClassName(!!errors.email)}
                {...fieldA11y("email", { error: errors.email })}
              />
            </FormField>
            <FormField label="Phone" htmlFor="phone" error={errors.phone} required>
              <input
                id="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange("phone")}
                autoComplete="tel"
                inputMode="tel"
                placeholder="09XX XXX XXXX"
                className={getInputClassName(!!errors.phone)}
                {...fieldA11y("phone", { error: errors.phone })}
              />
            </FormField>
          </div>
        </div>
      </fieldset>

      <fieldset className="border-t border-neutral-200 pt-8">
        <FieldsetLegend step={2}>Your prescription</FieldsetLegend>
        <div className="space-y-5">
          <FormField label="Medicine name" htmlFor="medicineName" error={errors.medicineName} required>
            <input
              id="medicineName"
              type="text"
              value={values.medicineName}
              onChange={handleChange("medicineName")}
              placeholder="e.g. Metformin 500mg"
              className={getInputClassName(!!errors.medicineName)}
              {...fieldA11y("medicineName", { error: errors.medicineName })}
            />
          </FormField>

          <FormField
            label="Prescription number"
            htmlFor="prescriptionNumber"
            error={errors.prescriptionNumber}
            hint={HINTS.prescriptionNumber}
          >
            <input
              id="prescriptionNumber"
              type="text"
              value={values.prescriptionNumber}
              onChange={handleChange("prescriptionNumber")}
              className={`${getInputClassName(!!errors.prescriptionNumber)} font-mono`}
              {...fieldA11y("prescriptionNumber", {
                error: errors.prescriptionNumber,
                hint: HINTS.prescriptionNumber,
              })}
            />
          </FormField>

          <FormField label="Notes" htmlFor="notes" error={errors.notes} hint={HINTS.notes}>
            <textarea
              id="notes"
              rows={4}
              value={values.notes}
              onChange={handleChange("notes")}
              className={getInputClassName(!!errors.notes)}
              {...fieldA11y("notes", { error: errors.notes, hint: HINTS.notes })}
            />
          </FormField>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-neutral-600">
          <Lock className="size-4 text-primary-600" aria-hidden="true" />
          Your details are only used to process this request.
        </p>
        <Button type="submit" size="lg" variant="accent" loading={status === "submitting"}>
          {status === "submitting" ? "Submitting…" : "Submit refill request"}
          {status !== "submitting" && <ArrowRight aria-hidden="true" />}
        </Button>
      </div>
    </form>
  );
}
