import { createFileRoute } from "@tanstack/react-router";
import { sendCustomOrderMail } from "@/lib/custom-order-mail";
import { SITE } from "@/lib/site";

const MAX_FILES = 5;
const MAX_BYTES = 8 * 1024 * 1024;

function json(
  status: number,
  body: { ok?: boolean; error?: string; retryClient?: boolean },
) {
  return Response.json(body, { status });
}

export const Route = createFileRoute("/api/custom-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const incoming = await request.formData();
        const name = String(incoming.get("name") ?? "").trim();
        const email = String(incoming.get("email") ?? "").trim();
        const phone = String(incoming.get("phone") ?? "").trim();
        const type = String(incoming.get("type") ?? "").trim();
        const notes = String(incoming.get("notes") ?? "").trim();
        const website = String(incoming.get("website") ?? "").trim();

        if (website) return json(200, { ok: true });
        if (!name || !email) {
          return json(400, { error: "Name and email are required." });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json(400, { error: "Enter a valid email so we can write back." });
        }
        if (!notes) {
          return json(400, { error: "Tell Lana what to make." });
        }

        const files = incoming
          .getAll("photos")
          .filter((item): item is File => item instanceof File && item.size > 0);

        if (files.length > MAX_FILES) {
          return json(400, { error: `Up to ${MAX_FILES} photos per request.` });
        }
        for (const file of files) {
          const typeName = file.type || "";
          if (typeName && !typeName.startsWith("image/")) {
            return json(400, { error: "Photos only — JPEG, PNG, HEIC, or WebP." });
          }
          if (file.size > MAX_BYTES) {
            return json(400, {
              error: `${file.name} is over 8 MB. Try a smaller photo.`,
            });
          }
        }

        try {
          await sendCustomOrderMail({ name, email, phone, type, notes, files });
          return json(200, { ok: true });
        } catch (err) {
          const message = err instanceof Error ? err.message : "";
          const rateLimited = /rate limit/i.test(message);
          return json(502, {
            error: rateLimited
              ? "Mail is busy. Retrying from your device…"
              : message ||
                `Could not send just now. Try again, or email ${SITE.email}.`,
            retryClient: true,
          });
        }
      },
    },
  },
});
