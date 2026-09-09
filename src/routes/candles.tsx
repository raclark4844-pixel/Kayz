import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/candles")({
  head: () =>
    pageHead({
      title: "Soy Candles Cleveland | KayzCharmzz",
      description:
        "Handmade soy candles and whipped dessert jars poured in Cleveland — vanilla coffee, banana pudding, margarita sets, and more.",
      path: "/candles",
    }),
  component: () => (
    <CategoryPage
      id="candles"
      kicker="Poured here"
      title="Soy candles"
      intro="Soy wax, dessert jars, and essential-oil pours from Kay’s table. Each listing names size, scent, and made-to-order time."
    />
  ),
});
