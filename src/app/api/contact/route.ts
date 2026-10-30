export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isContactSubmission(body)) {
    return Response.json(
      { error: "Request must include a valid name, email, company, and message." },
      { status: 400 },
    );
  }

  // TODO: Add spam protection and an approved contact-delivery integration.
  return Response.json({ received: true }, { status: 200 });
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
