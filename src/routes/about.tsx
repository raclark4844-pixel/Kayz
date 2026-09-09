import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { FAMILY, SITE } from "@/lib/site";
import { SISTER_SENTENCE, SPARKLE_URL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About KayzCharmzz | Cleveland Handmade Boutique",
      description:
        "KayzCharmzz is a Black-owned, woman-led handmade boutique in Cleveland, started in 2021. Sister brand True Sparkle makes original diamond painting kits.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="pb-nav pb-20">
      <PageIntro kicker="The house" title="About KayzCharmzz">
        A handmade boutique for jewelry, candles, tumblers, charms, and junk phone
        cases.
      </PageIntro>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <img
          src="/products/atelier.jpg"
          alt="KayzCharmzz pieces arranged on black linen"
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <div className="space-y-5 text-muted">
          <p>
            KayzCharmzz is a female and Black-owned company in {SITE.city},
            started in {SITE.est} by {SITE.founder}.
          </p>
          <blockquote className="border-l border-gold pl-4 font-serif text-2xl leading-snug text-foreground italic">
            “I created KayzCharmzz when I had so many beautiful items around
            that I needed to share them with the world.”
          </blockquote>
          <p>
            What began as a table full of finished pieces became a shop with a
            purpose: give people a chance to buy beautiful things — gifts chosen
            with more thought — without breaking the bank or the pockets.
          </p>
          <p>
            Custom is part of the shop. If you can picture it, Lana will help
            make it.
          </p>
          <p>
            {SISTER_SENTENCE}{" "}
            <a href={FAMILY.parent.href} className="text-gold transition-colors hover:text-gold-soft">
              {FAMILY.parent.name}
            </a>{" "}
            is the house brand. Original diamond painting kits live at{" "}
            <a href={SPARKLE_URL} className="text-gold transition-colors hover:text-gold-soft">
              True Sparkle
            </a>
            — we do not sell the same kits here.
          </p>
          <Button asChild>
            <Link to="/contact">Say hello</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
