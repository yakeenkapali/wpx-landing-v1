import { siteContent } from "@/content/site";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: siteContent.contact.errorMessage }, { status: 400 });
  }

  if (!isContactSubmission(body)) {
    const field = getInvalidField(body);
    let error: string = siteContent.contact.validation.required;
    const email = getFieldValue(body, "email");
    if (field === "email" && typeof email === "string" && email.trim().length > 0) {
      error = siteContent.contact.validation.invalidEmail;
    }
    return Response.json({ error, field }, { status: 400 });
  }

  if (isPersonalEmail(body.email)) {
    return Response.json(
      { error: siteContent.contact.validation.workEmail, field: "email" },
      { status: 400 },
    );
  }

  // No approved delivery destination is configured. Do not imply this was saved or sent.
  return Response.json(
    {
      received: false,
      delivered: false,
      error: siteContent.contact.deliveryUnavailable,
    },
    { status: 503 },
  );
}

function isContactSubmission(value: unknown): value is {
  name: string;
  email: string;
  company: string;
  message: string;
} {
  if (typeof value !== "object" || value === null) return false;

  const submission = value as Record<string, unknown>;
  return (
    typeof submission.name === "string" &&
    submission.name.trim().length > 0 &&
    typeof submission.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email) &&
    typeof submission.company === "string" &&
    submission.company.trim().length > 0 &&
    typeof submission.message === "string" &&
    submission.message.trim().length > 0
  );
}

function getInvalidField(value: unknown): "name" | "email" | "company" | "message" {
  if (typeof value !== "object" || value === null) return "name";
  const submission = value as Record<string, unknown>;
  if (typeof submission.name !== "string" || submission.name.trim().length === 0) return "name";
  if (typeof submission.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) return "email";
  if (typeof submission.company !== "string" || submission.company.trim().length === 0) return "company";
  return "message";
}

function getFieldValue(value: unknown, field: string): unknown {
  if (typeof value !== "object" || value === null) return undefined;
  return (value as Record<string, unknown>)[field];
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
