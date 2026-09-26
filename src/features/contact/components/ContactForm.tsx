"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui";
import { FormField, fieldA11y } from "@/components/shared/FormField";
import { FormAlert } from "@/components/shared/FormAlert";
import { SuccessPanel } from "@/components/shared/SuccessPanel";
import { getInputClassName } from "@/components/shared/input-styles";
import { focusFirstInvalid, toFieldErrors } from "@/lib/forms";
import { contactSchema, type ContactInput } from "../schema";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER = ["name", "email", "subject", "message"] as const;

interface ContactFormProps {
  /** Pre-fills the subject, e.g. when arriving from a service's "Ask about this" link. */
  defaultSubject?: string;
}

export function ContactForm({ defaultSubject = "" }: ContactFormProps) {
  const initialValues: ContactInput = { name: "", email: "", subject: defaultSubject, message: "" };
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(field: keyof ContactInput) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear a field's error as soon as the user starts fixing it
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = toFieldErrors<ContactInput>(result.error);
      setErrors(fieldErrors);
      focusFirstInvalid(formRef.current, FIELD_ORDER.filter((f) => fieldErrors[f]));
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
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
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <SuccessPanel
        title="Message sent!"
        action={
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        }
      >
        Thanks for reaching out. We&apos;ll get back to you as soon as possible.
      </SuccessPanel>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && <FormAlert>{serverError}</FormAlert>}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            autoComplete="name"
            className={getInputClassName(!!errors.name)}
            {...fieldA11y("name", { error: errors.name })}
          />
        </FormField>

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
      </div>

      <FormField label="Subject" htmlFor="subject" error={errors.subject} required>
        <input
          id="subject"
          type="text"
          value={values.subject}
          onChange={handleChange("subject")}
          className={getInputClassName(!!errors.subject)}
          {...fieldA11y("subject", { error: errors.subject })}
        />
      </FormField>

      <FormField label="Message" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          className={getInputClassName(!!errors.message)}
          {...fieldA11y("message", { error: errors.message })}
        />
      </FormField>

      <Button type="submit" size="lg" loading={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send message"}
        {status !== "submitting" && <Send aria-hidden="true" />}
      </Button>
    </form>
  );
}
