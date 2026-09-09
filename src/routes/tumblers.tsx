import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/tumblers")({
  head: () =>
    pageHead({
      title: "Handmade Tumblers Cleveland | KayzCharmzz",
      description:
        "Handmade 20oz insulated tumblers, glitter cups, and snow-globe tumblers made to order in Cleveland. Custom colors welcome — a photo is optional.",
      path: "/tumblers",
    }),
  component: () => (
    <CategoryPage
      id="tumblers"
      kicker="Hot or cold"
      title="Handmade tumblers"
      intro="Insulated cups, glitter finishes, and snow-globe styles made to order in Cleveland. Size, materials, and lead time are on each piece. Custom colors welcome — a photo is optional."
    />
  ),
});
