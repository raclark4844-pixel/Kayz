import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CustomOrderForm } from "@/components/custom-order-form";
import { JsonLd } from "@/components/json-ld";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/custom")({
  head: () =>
    pageHead({
      title: "Custom Orders | KayzCharmzz Cleveland",
      description:
        "Custom tumblers, charm jewelry, candles, junk cases, and pens made to order in Cleveland. Describe the vision — a photo is optional, not required.",
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
            "Custom tumblers, charm jewelry, soy candles, junk phone cases, and beaded pens made to order in Cleveland, Ohio. Photos are optional.",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "Custom", path: "/custom" },
          ]}
        />
      </div>
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 pt-8 pb-12 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:pt-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Made for you
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Tell Lana the vision.
          </h1>
          <p className="mt-5 text-muted">
            Custom is part of the shop — a tumbler in her colors, a name on a cup, a
            charm mix, a junk case for your exact phone, a candle in a scent that is
            not on the shelf. Describe it here. A photo helps if you have one. It is
            not required.
          </p>
          <img
            src="/products/atelier.jpg"
            alt="Handmade pieces on a dark atelier table"
            className="mt-8 aspect-4/3 w-full rounded-lg object-cover"
          />
          <h2 className="mt-8 font-serif text-2xl">How custom works</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Write the piece you want. Colors, names, size, phone model.</li>
            <li>Photos are optional — up to 5, 8 MB each, if you want to show a shade or a mockup.</li>
            <li>Lana replies with a price and a lead time from the Cleveland studio.</li>
            <li>Original diamond painting kits live at sister shop True Sparkle — this page is handmade gifts only.</li>
          </ul>
        </div>
        <CustomOrderForm />
      </div>
    </main>
  );
}
