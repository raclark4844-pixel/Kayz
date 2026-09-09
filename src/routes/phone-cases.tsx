import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/phone-cases")({
  head: () =>
    pageHead({
      title: "Junk Phone Cases | KayzCharmzz Cleveland",
      description:
        "Handmade junk phone cases for iPhone and Google Pixel — rhinestones, pearls, and charm mixes made to order in Cleveland.",
      path: "/phone-cases",
    }),
  component: () => (
    <CategoryPage
      id="cases"
      kicker="Junk cases"
      title="Junk phone cases"
      intro="Fitted shells with handmade charm piles. Confirm your phone model in the notes. Matching tumbler sets are listed when Lana is building them."
    />
  ),
});
