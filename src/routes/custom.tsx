import { createFileRoute } from "@tanstack/react-router";
import { MailForm } from "@/components/mail-form";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/custom")({
  head: () =>
    pageHead({
      title: "Custom Orders | KayzCharmzz Cleveland",
      description:
        "Custom tumblers, charm jewelry, candles, and junk cases made to order in Cleveland. Tell Lana the vision — she will bring it to life.",
      path: "/custom",
    }),
  component: CustomPage,
});

function CustomPage() {
  return (
    <main className="pb-nav pb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "KayzCharmzz custom handmade gifts",
          provider: { "@type": "Organization", name: "KayzCharmzz" },
          areaServed: "US",
          description:
            "Custom tumblers, charm jewelry, soy candles, and junk phone cases made to order in Cleveland, Ohio.",
        }}
      />
      <PageIntro kicker="Made for you" title="Custom orders">
        Custom is part of the shop. A unique design, a gift with a name on it,
        a tumbler in her colors — Lana will take the vision from here.
      </PageIntro>
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.1fr]">
        <img
          src="/products/atelier.jpg"
          alt="Handmade pieces on a dark atelier table"
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <MailForm
          subjectPrefix="KayzCharmzz custom order"
          submitLabel="Email my vision to Lana"
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
