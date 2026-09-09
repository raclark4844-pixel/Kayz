import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/shipping-returns")({
  head: () =>
    pageHead({
      title: "Shipping & Returns | KayzCharmzz",
      description:
        "KayzCharmzz pieces are made to order in Cleveland. Typical lead times are on each product. US shipping or local pickup, with a simple made-to-order return policy.",
      path: "/shipping-returns",
    }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <main className="pb-nav pb-20">
      <PageIntro kicker="Studio queue" title="Shipping and returns">
        Everything is made to order. The product page lists the current lead time for that piece.
      </PageIntro>
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 text-muted sm:px-6">
        <section>
          <h2 className="font-serif text-3xl text-foreground">Lead time</h2>
          <p className="mt-3">
            Tumblers and candles often ship in about a week. Junk cases and matching
            sets can take two to three weeks. Custom pieces follow the note you send
            on the{" "}
            <Link to="/custom" className="text-gold underline">
              custom order
            </Link>{" "}
            form — a photo is optional. Holidays run longer.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Shipping</h2>
          <p className="mt-3">
            We ship inside the United States. Local pickup at {SITE.address} can be arranged on{" "}
            <Link to="/contact" className="text-gold underline">
              contact
            </Link>
            . Tracking goes to the email on the order.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Returns</h2>
          <p className="mt-3">
            Made-to-order and custom pieces are not returnable unless they arrive
            damaged. Write Lana with photos within three days of delivery and we will
            make it right.
          </p>
        </section>
      </div>
    </main>
  );
}
