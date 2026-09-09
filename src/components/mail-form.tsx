import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, SelectField, Textarea } from "@/components/ui/input";
import { mailtoHref, SITE } from "@/lib/site";
import { trackEvent } from "@/lib/seo";

type FieldDef =
  | {
      name: string;
      label: string;
      type?: "text" | "email" | "tel";
      required?: boolean;
      autoComplete?: string;
      placeholder?: string;
    }
  | { name: string; label: string; kind: "select"; options: { value: string; label: string }[]; required?: boolean }
  | { name: string; label: string; kind: "area"; rows?: number; required?: boolean; placeholder?: string };

export function MailForm({
  subjectPrefix,
  fields,
  submitLabel,
  intro,
}: {
  subjectPrefix: string;
  fields: FieldDef[];
  submitLabel: string;
  intro?: ReactNode;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? data.get("fullName") ?? "").trim();
    const lines = fields.map((field) => {
      const value = String(data.get(field.name) ?? "").trim();
      return `${field.label}: ${value || "—"}`;
    });
    window.location.href = mailtoHref(
      `${subjectPrefix}${name ? ` — ${name}` : ""}`,
      `Sent from the KayzCharmzz site\n\n${lines.join("\n")}`,
    );
    trackEvent("generate_lead", { form: subjectPrefix });
    setSent(true);
    e.currentTarget.reset();
  }

  if (sent) {
    return (
      <div className="rounded-lg bg-card px-5 py-8 text-center shadow-[0_0_0_1px_rgb(212_175_55/0.22)]">
        <p className="font-serif text-2xl">Draft opened</p>
        <p className="mt-2 text-sm text-muted">
          If your mail app did not open, write {SITE.contact} at {SITE.email}.
        </p>
        <Button className="mt-5" variant="outline" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {intro}
      {fields.map((field) => (
        <Field key={field.name} label={field.label}>
          {"kind" in field && field.kind === "select" ? (
            <SelectField name={field.name} required={field.required} defaultValue="">
              <option value="" disabled>
                Choose
              </option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </SelectField>
          ) : "kind" in field && field.kind === "area" ? (
            <Textarea
              name={field.name}
              required={field.required}
              rows={field.rows ?? 5}
              placeholder={field.placeholder}
            />
          ) : (
            <Input
              name={field.name}
              type={"type" in field ? (field.type ?? "text") : "text"}
              required={field.required}
              autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
              placeholder={"placeholder" in field ? field.placeholder : undefined}
            />
          )}
        </Field>
      ))}
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        {submitLabel}
      </Button>
    </form>
  );
}
