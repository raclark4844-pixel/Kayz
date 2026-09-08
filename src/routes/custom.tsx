import { createFileRoute } from "@tanstack/react-router";
import { MailForm } from "@/components/mail-form";
import { PageIntro } from "@/components/page-intro";

export const Route = createFileRoute("/custom")({ component: CustomPage });

function CustomPage() {
  return (
    <main className="pb-nav pb-20">
      <PageIntro kicker="Made for you" title="Custom orders">
        Custom is part of the shop. A unique design, a gift with a name on it,
        a tumbler in her colors — Kay will take the vision from here.
      </PageIntro>
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.1fr]">
        <img
          src="/products/atelier.jpg"
          alt="Handmade pieces on a dark atelier table"
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <MailForm
          subjectPrefix="KayzCharmzz custom order"
          submitLabel="Email my vision to Kay"
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
            {
              name: "type",
              label: "Type",
              kind: "select",
              required: true,
              options: [
                { value: "tumbler", label: "Tumbler" },
                { value: "charms", label: "Charms" },
                { value: "earrings", label: "Earrings" },
                { value: "candle", label: "Candle" },
                { value: "jewelry", label: "Jewelry set" },
                { value: "other", label: "Something else" },
              ],
            },
            {
              name: "vision",
              label: "Vision",
              kind: "area",
              required: true,
              rows: 6,
              placeholder: "Colors, names, occasion, size…",
            },
          ]}
        />
      </div>
    </main>
  );
}
