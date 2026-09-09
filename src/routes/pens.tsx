import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/pens")({
  head: () =>
    pageHead({
      title: "Beaded Pens | KayzCharmzz Cleveland",
      description:
        "Handmade beaded pens with tassel charms from KayzCharmzz in Cleveland. Gift sets with gloss, custom bead colors on request.",
      path: "/pens",
    }),
  component: () => (
    <CategoryPage
      id="pens"
      kicker="Write pretty"
      title="Beaded pens"
      intro="Floral beads, tassels, and ready-to-gift sets. These are writing pens — diamond painting styluses live at True Sparkle."
    />
  ),
});
