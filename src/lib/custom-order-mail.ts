import { SITE } from "@/lib/site";

export { SITE };

// Literal URL so the photo loader cannot fall back to an old inbox.
export const FORMSUBMIT_URL =
  "https://formsubmit.co/ajax/lana@ikscharmsandtwosparkles.com";

export function buildCustomOrderPayload(input: {
  name: string;
  email: string;
  phone?: string;
  type?: string;
  notes?: string;
  files: File[];
}) {
  const outbound = new FormData();
  outbound.set("_subject", `KayzCharmzz custom order from ${input.name}`);
  outbound.set("_template", "box");
  outbound.set("_captcha", "false");
  outbound.set("_to", SITE.email);
  outbound.set("Name", input.name);
  outbound.set("Email", input.email);
  if (input.phone) outbound.set("Phone", input.phone);
  if (input.type) outbound.set("Type", input.type);
  outbound.set("Notes", input.notes || "(none)");
  outbound.set("Photo count", String(input.files.length));
  outbound.set(
    "message",
    [
      "New custom order request from the KayzCharmzz shop.",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      input.phone ? `Phone: ${input.phone}` : null,
      input.type ? `Type: ${input.type}` : null,
      input.notes ? `Vision: ${input.notes}` : null,
      `Photos attached: ${input.files.length || "none — description only"}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  input.files.forEach((file, i) => {
    outbound.set(`attachment${i + 1}`, file, file.name || `photo-${i + 1}.jpg`);
  });
  return outbound;
}

export async function sendCustomOrderMail(input: {
  name: string;
  email: string;
  phone?: string;
  type?: string;
  notes?: string;
  files: File[];
}) {
  const res = await fetch(FORMSUBMIT_URL, {
    method: "POST",
    body: buildCustomOrderPayload(input),
    headers: { Accept: "application/json" },
  });
  const payload = (await res.json().catch(() => ({}))) as {
    success?: string;
    message?: string;
  };
  if (!res.ok) {
    throw new Error(payload.message || "Mail service rejected the request.");
  }
  return payload.success || "Request sent to the studio.";
}
