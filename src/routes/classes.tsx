import { createFileRoute } from "@tanstack/react-router";
import { MailForm } from "@/components/mail-form";
import { PageIntro } from "@/components/page-intro";

import { JsonLd } from "@/components/json-ld";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/classes")({
  head: () =>
    pageHead({
      title: "Jewelry Classes | KayzCharmzz Cleveland",
      description:
        "Book a one-hour online jewelry class with Lana for $55, or request a candle class. Learn charms, findings, and finishing in Cleveland’s sister studio.",
      path: "/classes",
    }),
  component: ClassesPage,
});

function ClassesPage() {
  return (
    <main className="pb-nav pb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "KayzCharmzz jewelry class",
          provider: { "@type": "Organization", name: "KayzCharmzz" },
          areaServed: "US",
          offers: {
            "@type": "Offer",
            price: "55.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          description: "One hour live online jewelry class. Candle class poured on request.",
        }}
      />
      <PageIntro kicker="Sit with Lana" title="Classes">
        Learn the pieces, then take the skill home. Jewelry is booked by the
        hour. Candle class is poured on request.
      </PageIntro>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <img
          src="/products/classes.jpg"
          alt="Jewelry class tools, beads, and a notebook"
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <div className="space-y-8">
          <article>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Online</p>
            <h2 className="mt-1 font-serif text-3xl">Jewelry class</h2>
            <p className="mt-2 text-sm text-muted">
              One hour, live online. $55. Bring your questions — Lana walks you
              through charms, findings, and finishing a piece you will actually wear.
            </p>
          </article>
          <article>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">On request</p>
            <h2 className="mt-1 font-serif text-3xl">Candle class</h2>
            <p className="mt-2 text-sm text-muted">
              Soy wax, scent, and pour technique. Scheduled when a small group
              is ready — tell Lana what you want to learn.
            </p>
          </article>
        </div>
      </div>
      <section className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 text-center font-serif text-3xl">Book a seat</h2>
        <MailForm
          subjectPrefix="KayzCharmzz class request"
          submitLabel="Email booking to Lana"
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
            {
              name: "classType",
              label: "Class",
              kind: "select",
              required: true,
              options: [
                { value: "jewelry", label: "Jewelry — $55 / hour online" },
                { value: "candle", label: "Candle class — on request" },
              ],
            },
            {
              name: "when",
              label: "Preferred time",
              placeholder: "Day of week, evening or weekend…",
            },
            {
              name: "notes",
              label: "What you want to learn",
              kind: "area",
              rows: 4,
            },
          ]}
        />
      </section>
    </main>
  );
}
