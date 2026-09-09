import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/jewelry")({
  head: () =>
    pageHead({
      title: "Charm Jewelry Cleveland | KayzCharmzz",
      description:
        "Handmade charm bracelets, heart drop earrings, and gold-tone sets from KayzCharmzz in Cleveland. Custom charm mixes on request.",
      path: "/jewelry",
    }),
  component: () => (
    <CategoryPage
      id="jewelry"
      kicker="Charm jewelry"
      title="Handmade jewelry"
      intro="Bracelets, earrings, and lockets made to gift. Custom charm mixes are part of the shop — tell Kay the vision."
    />
  ),
});
