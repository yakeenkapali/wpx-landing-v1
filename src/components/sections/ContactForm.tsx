"use client";

import { useRef, useState, type FormEvent } from "react";
import { siteContent } from "@/content/site";

type Fields = "name" | "email" | "company" | "message";
type FormValues = Record<Fields, string>;
type FormErrors = Partial<Record<Fields, string>>;

const emptyValues: FormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactForm() {
  const content = siteContent.sections.contact.form;
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = content.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      nextErrors.email = content.errors.email;
    if (!values.company.trim()) nextErrors.company = content.errors.company;
    if (!values.message.trim()) nextErrors.message = content.errors.message;
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid='true']")
          ?.focus();
      });
    }
  }

  function update(field: Fields, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  return (
    <form
      aria-label="Contact form"
      className="contact-form"
      id="contact-form"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {(["name", "email", "company", "message"] as const).map((field) => {
        const label = content[field];
        const error = errors[field];
        const id = `contact-${field}`;
        return (
          <div
            className={`form-field ${field === "message" ? "form-field--message" : ""}`}
            key={field}
          >
            <label htmlFor={id}>{label}</label>
            {field === "message" ? (
              <textarea
                aria-describedby={error ? `${id}-error` : undefined}
                aria-invalid={Boolean(error)}
                id={id}
                onChange={(event) => update(field, event.target.value)}
                required
                rows={4}
                value={values[field]}
              />
            ) : (
              <input
                aria-describedby={error ? `${id}-error` : undefined}
                aria-invalid={Boolean(error)}
                autoComplete={
                  field === "name"
                    ? "name"
                    : field === "email"
                      ? "email"
                      : "organization"
                }
                id={id}
                onChange={(event) => update(field, event.target.value)}
                required
                type={field === "email" ? "email" : "text"}
                value={values[field]}
              />
            )}
            {error ? (
              <p className="field-error" id={`${id}-error`} role="alert">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}
      <button className="contact-form__submit" type="submit">
        {content.submit}
      </button>
      {submitted ? (
        <p className="contact-form__status" role="status">
          {content.notConnected}
        </p>
      ) : null}
    </form>
  );
}
