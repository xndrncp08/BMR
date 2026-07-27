"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { FormField } from "@/components/shared/FormField";
import { getInputClassName } from "@/components/shared/input-styles";
import { contactSchema, type ContactInput } from "../schema";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialValues: ContactInput = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(field: keyof ContactInput) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
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
      setValues(initialValues);
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-secondary/30 bg-secondary-light p-6">
        <p className="font-semibold text-secondary-dark">Message sent!</p>
        <p className="mt-1 text-sm text-secondary-dark">
          We&apos;ll get back to you as soon as possible.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <div role="alert" className="rounded-md bg-error-light px-4 py-3 text-sm text-error">
          {serverError}
        </div>
      )}

      <FormField label="Name" htmlFor="name" error={errors.name} required>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange("name")}
          autoComplete="name"
          className={getInputClassName(!!errors.name)}
        />
      </FormField>

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

      <FormField label="Subject" htmlFor="subject" error={errors.subject} required>
        <input
          id="subject"
          type="text"
          value={values.subject}
          onChange={handleChange("subject")}
          className={getInputClassName(!!errors.subject)}
        />
      </FormField>

      <FormField label="Message" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          className={getInputClassName(!!errors.message)}
        />
      </FormField>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
