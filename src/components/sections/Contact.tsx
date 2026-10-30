"use client";

import { useState, type FormEvent } from "react";
import { siteContent } from "@/content/site";

type SubmissionState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "company" | "message", string>>;

export function Contact() {
  const content = siteContent.contact;
  const [state, setState] = useState<SubmissionState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [serverFieldErrors, setServerFieldErrors] = useState<FieldErrors>({});
  const [retryAvailable, setRetryAvailable] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submission = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };
    const nextErrors: FieldErrors = {};
    for (const key of ["name", "email", "company", "message"] as const) {
      if (!submission[key]) nextErrors[key] = content.validation.required;
      else if (submission[key].length > content.limits[key]) {
        nextErrors[key] = content.validation.tooLong(content.limits[key]);
      }
    }
    if (submission.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
      nextErrors.email = content.validation.invalidEmail;
    } else if (submission.email && isPersonalEmail(submission.email)) {
      nextErrors.email = content.validation.workEmail;
    }
    setErrors(nextErrors);
    setServerError("");
    setServerFieldErrors({});
    setRetryAvailable(false);
    const firstInvalidField = (Object.keys(nextErrors) as Array<keyof FieldErrors>)[0];
    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
      setState("error");
      return;
    }

    setState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      const result = (await response.json()) as {
        delivered?: boolean;
        error?: string;
        field?: keyof FieldErrors;
      };
      if (!response.ok) {
        if (result.field) {
          setServerFieldErrors({ [result.field]: result.error ?? content.validation.required });
          document.getElementById(result.field)?.focus();
        } else {
          setServerError(result.delivered === false ? content.deliveryUnavailable : content.errorMessage);
          setRetryAvailable(result.delivered !== false);
        }
        setState("error");
        return;
      }
      if (result.delivered !== true) {
        setServerError(content.deliveryUnavailable);
        setState("error");
        return;
      }
      setState("success");
      form.reset();
    } catch {
      setServerError(content.errorMessage);
      setRetryAvailable(true);
      setState("error");
    }
  }

  function clearError(name: keyof FieldErrors) {
    setErrors((current) => ({ ...current, [name]: undefined }));
    setServerFieldErrors((current) => ({ ...current, [name]: undefined }));
    setServerError("");
    if (state === "error") setState("idle");
  }

  return (
    <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
      <div className="content-width contact-layout">
        <div className="contact-copy">
          <h2 id="contact-title">{content.heading}</h2>
          <p>{content.description}</p>
          <p
            className="contact-copy__notice"
            role="note"
            aria-label={siteContent.accessibility.contactDeliveryNote}
          >
            {content.deliveryNotice}
          </p>
        </div>

        <form className="contact-form" id="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form__grid">
            <Field
              id="name"
              label={content.fields.name.label}
              autoComplete={content.fields.name.autocomplete}
              error={errors.name ?? serverFieldErrors.name}
              maxLength={content.limits.name}
              onChange={() => clearError("name")}
              required
            />
            <Field
              id="email"
              label={content.fields.email.label}
              type="email"
              autoComplete={content.fields.email.autocomplete}
              error={errors.email ?? serverFieldErrors.email}
              maxLength={content.limits.email}
              onChange={() => clearError("email")}
              required
            />
            <Field
              id="company"
              label={content.fields.company.label}
              autoComplete={content.fields.company.autocomplete}
              error={errors.company ?? serverFieldErrors.company}
              maxLength={content.limits.company}
              onChange={() => clearError("company")}
              required
            />
            <label className="form-field form-field--message" htmlFor="message">
              <span>{content.fields.message.label}</span>
              <textarea
                aria-describedby={errors.message || serverFieldErrors.message ? "message-error" : undefined}
                aria-invalid={Boolean(errors.message || serverFieldErrors.message)}
                autoComplete={content.fields.message.autocomplete}
                id="message"
                name="message"
                maxLength={content.limits.message}
                onChange={() => clearError("message")}
                required
                rows={4}
              />
              {errors.message || serverFieldErrors.message ? (
                <span className="form-field__error" id="message-error">
                  {errors.message ?? serverFieldErrors.message}
                </span>
              ) : null}
            </label>
            <p className="contact-form__required-note">{content.requiredNote}</p>
          </div>
          <div className="contact-form__submit-row">
            <button
              className="button button--primary"
              disabled={state === "submitting"}
              type="submit"
            >
              {state === "submitting" ? content.sendingLabel : content.submitLabel}
            </button>
            {state === "success" ? (
              <p className="form-status form-status--success" role="status">
                {content.successMessage}
              </p>
            ) : null}
            {state === "error" ? (
              <p className="form-status form-status--error" role="alert">
                {serverError || content.errorMessage}
              </p>
            ) : null}
            {state === "error" && retryAvailable ? (
              <button
                className="form-retry"
                onClick={() =>
                  document.querySelector<HTMLFormElement>("#contact-form")?.requestSubmit()
                }
                type="button"
              >
                {content.retryLabel}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  error,
  onChange,
  required,
  maxLength,
}: {
  id: "name" | "email" | "company";
  label: string;
  type?: string;
  autoComplete: string;
  error?: string;
  onChange: () => void;
  required: boolean;
  maxLength: number;
}) {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        id={id}
        name={id}
        maxLength={maxLength}
        onChange={onChange}
        required={required}
        type={type}
      />
      {error ? (
        <span className="form-field__error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function isPersonalEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  return [
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "yahoo.co.uk",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "icloud.com",
    "me.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
  ].includes(domain ?? "");
}
