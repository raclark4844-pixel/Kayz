import { FormEvent, useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, SelectField, Textarea } from "@/components/ui/input";
import { mailtoHref, SITE } from "@/lib/site";
import { trackEvent } from "@/lib/seo";

const TYPES = [
  { value: "tumbler", label: "Tumbler" },
  { value: "jewelry", label: "Jewelry" },
  { value: "candle", label: "Candle" },
  { value: "phone-case", label: "Junk phone case" },
  { value: "pens", label: "Beaded pens" },
  { value: "set", label: "Matching set" },
  { value: "other", label: "Something else" },
] as const;

export function CustomOrderForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list)) {
      if (!file.type.startsWith("image/") && file.type !== "") continue;
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      next.push(file);
    }
    setFiles(next.slice(0, 5));
    setSent(false);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }
    if (!notes) {
      setError("Tell Lana what to make — a photo is optional.");
      return;
    }
    files.forEach((file) => data.append("photos", file));
    setPending(true);

    const openMailDraft = () => {
      window.location.href = mailtoHref(
        `KayzCharmzz custom order${name ? ` — ${name}` : ""}`,
        [
          "Sent from the KayzCharmzz custom form",
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          type ? `Type: ${type}` : null,
          `Vision: ${notes}`,
          `Photos: ${files.length ? files.map((f) => f.name).join(", ") : "none — description only"}`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
    };

    try {
      const res = await fetch("/api/custom-order", { method: "POST", body: data });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        retryClient?: boolean;
      };
      if (res.ok && !payload.error) {
        setSent(true);
        setFiles([]);
        form.reset();
        trackEvent("generate_lead", { form: "custom-order" });
        return;
      }
      if (payload.retryClient) {
        try {
          const { sendCustomOrderMail } = await import("@/lib/custom-order-mail");
          await sendCustomOrderMail({ name, email, phone, type, notes, files });
          setSent(true);
          setFiles([]);
          form.reset();
          trackEvent("generate_lead", { form: "custom-order" });
          return;
        } catch {
          openMailDraft();
          setSent(true);
          setFiles([]);
          form.reset();
          trackEvent("generate_lead", { form: "custom-order-mailto" });
          return;
        }
      }
      setError(payload.error || "Could not send. Try again.");
    } catch {
      openMailDraft();
      setSent(true);
      setFiles([]);
      form.reset();
      trackEvent("generate_lead", { form: "custom-order-mailto" });
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg bg-card px-5 py-8 text-center shadow-[0_0_0_1px_rgb(212_175_55/0.22)]">
        <p className="font-serif text-2xl">Request sent</p>
        <p className="mt-2 text-sm text-muted">
          Lana will email you at the address you gave. If you attached photos, they
          went with the note. If nothing arrives, write {SITE.contact} at {SITE.email}.
        </p>
        <Button className="mt-5" variant="outline" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg bg-card p-5 shadow-[0_0_0_1px_rgb(212_175_55/0.22)] sm:p-8"
      noValidate
    >
      <Field label="Name *">
        <Input name="name" autoComplete="name" required placeholder="Your name" />
      </Field>
      <Field label="Email *">
        <Input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
        />
      </Field>
      <Field label="Phone (optional)">
        <Input name="phone" type="tel" autoComplete="tel" placeholder="Mobile number" />
      </Field>
      <Field label="What should we make?">
        <SelectField name="type" defaultValue="tumbler">
          {TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </SelectField>
      </Field>
      <Field label="Vision *">
        <Textarea
          name="notes"
          required
          rows={6}
          placeholder="Colors, names, occasion, size, phone model…"
        />
      </Field>
      <p className="sr-only" aria-hidden>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </p>

      <div>
        <p className="mb-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
          Photos <span className="normal-case tracking-normal">(optional)</span>
        </p>
        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line bg-elevated px-4 py-6 text-center transition-colors hover:border-gold/55">
          <ImagePlus className="size-6 text-gold" aria-hidden />
          <span className="mt-2 text-sm text-foreground">Tap to add photos</span>
          <span className="mt-1 text-xs text-muted">
            Optional · phone camera or camera roll · up to 5
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
        {previews.length > 0 ? (
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {previews.map((src, i) => (
              <li key={src} className="relative">
                <img
                  src={src}
                  alt={files[i]?.name || `Photo ${i + 1}`}
                  className="aspect-square w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 inline-flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground"
                  aria-label={`Remove ${files[i]?.name || "photo"}`}
                  onClick={() => setFiles((all) => all.filter((_, j) => j !== i))}
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm text-rose-deep" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Send my vision to Lana"}
      </Button>
    </form>
  );
}
