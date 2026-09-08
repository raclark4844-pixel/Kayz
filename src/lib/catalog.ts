export const CATEGORIES = [
  { id: "tumblers", label: "Tumblers" },
  { id: "candles", label: "Candles" },
  { id: "charms", label: "Charms" },
  { id: "earrings", label: "Earrings" },
  { id: "cases", label: "Cases" },
  { id: "art", label: "Art" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const LEAD_TIMES = [
  { id: "1-week", label: "1 week" },
  { id: "2-weeks", label: "2 weeks" },
  { id: "3-weeks", label: "3 weeks" },
  { id: "1-month", label: "1 month" },
] as const;

export type LeadTimeId = (typeof LEAD_TIMES)[number]["id"];

export type Product = {
  slug: string;
  name: string;
  price: number;
  categories: CategoryId[];
  short: string;
  description: string;
  details: string[];
  image: string;
  featured?: boolean;
  leadTime: LeadTimeId;
};

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((c) => c.id === value);
}

export function isLeadTimeId(value: string): value is LeadTimeId {
  return LEAD_TIMES.some((l) => l.id === value);
}

export function leadTimeLabel(id?: string) {
  return LEAD_TIMES.find((l) => l.id === id)?.label ?? "1 week";
}

export const PRODUCTS: Product[] = [
  {
    slug: "betty-boop-tumbler",
    name: "Betty Boop 20oz Hot and Cold Tumbler",
    price: 35,
    categories: ["tumblers"],
    short: "Handmade 20oz insulated cup, hot or cold.",
    description:
      "A handmade 20oz stainless tumbler with lid — keeps drinks hot or cold for about 8 hours. Figural Betty Boop piece, hand-wash only, made to gift or keep.",
    details: ["20 fl oz", "Insulated stainless steel", "Lid included", "Hand wash only"],
    image: "/products/betty-boop-tumbler.jpg",
    featured: true,
    leadTime: "1-week",
  },
  {
    slug: "snow-globe-tumbler",
    name: "Snow Globe Tumbler",
    price: 26,
    categories: ["tumblers"],
    short: "A 20oz snow-globe style tumbler.",
    description:
      "Handmade snow globe tumbler — shake, sparkle, sip. A 20oz everyday cup with a globe chamber that catches the light.",
    details: ["20oz", "Handmade snow-globe finish", "Lid included"],
    image: "/products/snow-globe-tumbler.jpg",
    featured: true,
    leadTime: "1-week",
  },
  {
    slug: "snow-globe-tumbler-mini",
    name: "Snow Globe Tumbler — Mini",
    price: 19,
    categories: ["tumblers"],
    short: "A smaller snow-globe tumbler, ready to gift.",
    description:
      "The smaller snow globe tumbler from the shop — same handmade sparkle, a little easier to carry.",
    details: ["Handmade snow-globe finish", "Lid included"],
    image: "/products/snow-globe-tumbler.jpg",
    leadTime: "1-week",
  },
  {
    slug: "glitter-tumbler",
    name: "Glitter Tumbler",
    price: 28,
    categories: ["tumblers"],
    short: "Handmade sparkle, made to travel.",
    description:
      "A handmade glitter tumbler in black and rose-gold sparkle — the kind of everyday piece that still feels like a gift.",
    details: ["Handmade glitter finish", "Gold-tone lid and straw", "Custom colors available"],
    image: "/products/glitter-tumbler.jpg",
    leadTime: "2-weeks",
  },
  {
    slug: "junk-case-tumbler-set",
    name: "Junk Phone Case and Tumbler Set",
    price: 60,
    categories: ["cases", "tumblers"],
    short: "Matching bling case and tumbler, made as a set.",
    description:
      "A handmade junk / decoden phone case paired with a matching tumbler. Winnie the Pooh charm mix, glossy luxury finish, sized for iPhone Pro Max. Personalize the charm mix with Kay.",
    details: ["Case + tumbler set", "Fits iPhone Pro Max", "Handmade junk-case charms", "Personalize on request"],
    image: "/products/junk-case-tumbler-set.jpg",
    featured: true,
    leadTime: "3-weeks",
  },
  {
    slug: "pink-junk-pixel-case",
    name: "Pink Freestyle Bling Junk Pixel 10 Case",
    price: 30,
    categories: ["cases"],
    short: "Pink glitter junk case for Google Pixel 10.",
    description:
      "A handmade pink freestyle junk case for Google Pixel 10 — diamonds, pearls, and charms piled on a hard fitted shell. Luxury glitter finish.",
    details: ["Fits Google Pixel 10", "Handmade junk-case style", "Glitter luxury finish"],
    image: "/products/pink-junk-pixel-case.jpg",
    featured: true,
    leadTime: "2-weeks",
  },
  {
    slug: "black-junk-iphone-case",
    name: "iPhone Freestyle Black Junk Case",
    price: 30,
    categories: ["cases"],
    short: "Black rhinestone junk case, fitted for iPhone.",
    description:
      "A handmade black freestyle junk case — rhinestones, charms, and pearls on a fitted iPhone shell. Same shop style as the pink Pixel case, in black.",
    details: ["Fitted iPhone case", "Handmade junk-case style", "Black rhinestone mix"],
    image: "/products/black-junk-iphone-case.jpg",
    leadTime: "2-weeks",
  },
  {
    slug: "margarita-candle-set",
    name: "Blueberry & Watermelon Frozen Margarita Candle Set",
    price: 30,
    categories: ["candles"],
    short: "Two cocktail candles in glasses.",
    description:
      "Handmade blueberry and watermelon frozen margarita scented candles, poured in glasses as a set of two. Soy wax, cocktail theme, made to sit out on a bar cart or a nightstand.",
    details: ["Set of 2", "Soy wax", "Blueberry + watermelon margarita scents", "Poured in glasses"],
    image: "/products/margarita-candle-set.jpg",
    featured: true,
    leadTime: "1-week",
  },
  {
    slug: "french-vanilla-candle",
    name: "French Vanilla Coffee Soy Candle",
    price: 15,
    categories: ["candles"],
    short: "Strong vanilla coffee, 32oz homemade.",
    description:
      "Handmade French vanilla coffee soy wax candle — strong scented, 32oz, poured in Cleveland. Soft, cozy, and a gift that does not break the bank.",
    details: ["Soy wax", "32oz", "French vanilla coffee scent", "Handmade in Ohio"],
    image: "/products/vanilla-candle.jpg",
    featured: true,
    leadTime: "1-week",
  },
  {
    slug: "strawberry-shortcake-candle",
    name: "Strawberry Shortcake Dessert Candle",
    price: 15,
    categories: ["candles"],
    short: "A pink dessert candle that smells like the treat.",
    description:
      "Handmade strawberry shortcake scented soy candle in a jar. Pink wax, dessert-shop scent, more than 5 hours of burn. Traditional jar style from KayzCharmzz.",
    details: ["Soy wax", "Strawberry shortcake scent", "Jar candle", "Handmade"],
    image: "/products/strawberry-shortcake-candle.jpg",
    leadTime: "1-week",
  },
  {
    slug: "banana-pudding-candle",
    name: "Banana Pudding Whipped Candle",
    price: 15,
    categories: ["candles"],
    short: "Whipped topping, banana pudding scent.",
    description:
      "Handmade banana pudding whipped candle — fluffy whipped wax on top, dessert scent through the jar. A shop favorite for gifting.",
    details: ["Whipped soy wax", "Banana pudding scent", "Handmade"],
    image: "/products/banana-pudding-candle.jpg",
    featured: true,
    leadTime: "1-week",
  },
  {
    slug: "apple-pie-candle",
    name: "Apple Pie Whipped Candle 16oz",
    price: 25,
    categories: ["candles"],
    short: "16oz whipped apple pie, cinnamon on top.",
    description:
      "Handmade 16oz apple pie whipped candle. Fluffy topping, warm spice, poured as a bigger jar for the house.",
    details: ["16oz", "Whipped soy wax", "Apple pie scent", "Handmade"],
    image: "/products/apple-pie-candle.jpg",
    leadTime: "1-week",
  },
  {
    slug: "peppermint-candle",
    name: "Peppermint Essential Oil Candle",
    price: 12,
    categories: ["candles"],
    short: "Refreshing peppermint in a large jar.",
    description:
      "Handmade peppermint essential oil jar candle. Large, modern, customizable, with a burn of more than 5 hours. Holiday, Christmas, or everyday cool-down.",
    details: ["Essential oil peppermint", "Large jar", "16oz", "Handmade in the USA"],
    image: "/products/peppermint-candle.jpg",
    leadTime: "1-week",
  },
  {
    slug: "pineapple-mango-candle",
    name: "Pineapple Mango Essential Oil Candle",
    price: 15,
    categories: ["candles"],
    short: "Tropical pineapple mango, poured for home.",
    description:
      "Handmade pineapple mango candle from essential oils — bright, fruity home decor from the KayzCharmzz table.",
    details: ["Essential oil scent", "Pineapple mango", "Handmade"],
    image: "/products/pineapple-mango-candle.jpg",
    leadTime: "1-week",
  },
  {
    slug: "orange-soy-candle",
    name: "Sweet Orange Soy Candle 32oz",
    price: 15,
    categories: ["candles"],
    short: "Sweet orange essential oils, 32oz.",
    description:
      "Handmade sweet orange scented soy wax candle, 32oz, with essential oils. Big jar, bright scent, made in the shop.",
    details: ["32oz soy wax", "Sweet orange", "Essential oils", "Handmade"],
    image: "/products/orange-soy-candle.jpg",
    leadTime: "1-week",
  },
  {
    slug: "iced-coffee-candle",
    name: "Iced Coffee Candle",
    price: 12,
    categories: ["candles"],
    short: "Coffee-shop scent in a jar.",
    description:
      "Handmade iced coffee scented candle. Creamy coffee wax, made for a desk or a kitchen counter.",
    details: ["Coffee scent", "Jar candle", "Handmade"],
    image: "/products/iced-coffee-candle.jpg",
    leadTime: "1-week",
  },
  {
    slug: "strawberry-chocolate-candle",
    name: "Red Strawberry Chocolate Candle",
    price: 15,
    categories: ["candles"],
    short: "Romantic strawberry chocolate in a red jar.",
    description:
      "The Red Strawberry Chocolate candle by KayzCharmzz — large scented wax jar, romantic theme, handmade in the United States, more than 5 hours of burn.",
    details: ["Strawberry chocolate scent", "Large jar", "Handmade in the USA"],
    image: "/products/strawberry-chocolate-candle.jpg",
    leadTime: "1-week",
  },
  {
    slug: "cowboys-wax-melts",
    name: "Dallas Cowboys Inspired Wax Melts",
    price: 7,
    categories: ["candles"],
    short: "Cashmere-scented wax melts, game-day colors.",
    description:
      "Handmade Dallas Cowboys inspired wax melts in cashmere. A little dish of scent for the warmer — buy more and save on a bundle.",
    details: ["Cashmere scent", "Wax melts", "Handmade"],
    image: "/products/cowboys-wax-melts.jpg",
    leadTime: "1-week",
  },
  {
    slug: "floral-pens-set",
    name: "Floral Beaded Pens + Lip Gloss Set",
    price: 12,
    categories: ["charms"],
    short: "Two beaded pens, tassel charms, and a gloss.",
    description:
      "Floral patterned pens with decorative beads and tassel charms — a set of two pens with lip gloss. Pretty enough to gift, useful enough to keep.",
    details: ["Set of 2 pens", "Tassel charm beads", "Includes lip gloss"],
    image: "/products/floral-beaded-pens-set.jpg",
    featured: true,
    leadTime: "1-week",
  },
  {
    slug: "sunflower-bracelet",
    name: "Sunflower Yellow White Black Beaded Bracelet",
    price: 10,
    categories: ["charms"],
    short: "Handmade sunflower stretch bracelet.",
    description:
      "Handmade beaded stretch bracelet in yellow, white, and black with a sunflower charm. Adjustable, flower theme, made for birthdays and everyday.",
    details: ["Beaded stretch fit", "Sunflower charm", "Handmade"],
    image: "/products/sunflower-bracelet.jpg",
    leadTime: "1-week",
  },
  {
    slug: "turquoise-bracelet",
    name: "Turquoise and White Beaded Bracelet",
    price: 7.19,
    categories: ["charms"],
    short: "Simple turquoise and white beads.",
    description:
      "Handmade turquoise and white plastic beaded bracelet. Easy stretch fit, a little color for the wrist without a high price.",
    details: ["Beaded stretch fit", "Turquoise and white", "Handmade"],
    image: "/products/turquoise-bracelet.jpg",
    leadTime: "1-week",
  },
  {
    slug: "heart-locket-necklace",
    name: "Heart Locket Mood Necklace",
    price: 10,
    categories: ["charms"],
    short: "A small heart that shifts with the mood.",
    description:
      "Heart locket mood necklace — a gold-tone heart pendant that changes color. New other, ready to gift.",
    details: ["Mood heart locket", "Gold-tone chain", "Ready to wear"],
    image: "/products/heart-locket-necklace.jpg",
    leadTime: "1-week",
  },
  {
    slug: "earrings-charm-bracelet",
    name: "Earrings + Charm Bracelet",
    price: 22,
    categories: ["earrings", "charms"],
    short: "A matching set you can wear today.",
    description:
      "Gold-tone charm earrings paired with a matching bracelet — little hearts, crystals, and charms that catch the light. A ready-to-gift set, with custom charm mixes on request.",
    details: ["Earrings and bracelet set", "Gold-tone charms", "Ask for a custom mix"],
    image: "/products/earrings-bracelet.jpg",
    leadTime: "2-weeks",
  },
  {
    slug: "heart-drop-earrings",
    name: "I Love You Heart Drop Earrings",
    price: 10,
    categories: ["earrings"],
    short: "KayzCharmzz heart drops that say it outright.",
    description:
      "Handmade I Love You heart drop earrings from KayzCharmzz. Gold-tone hearts on a drop — a small, clear gift.",
    details: ["Heart drop earrings", "Gold-tone", "Handmade"],
    image: "/products/heart-drop-earrings.jpg",
    featured: true,
    leadTime: "1-week",
  },
  {
    slug: "gnome-diamond-art",
    name: "Valentine Gnome Garden Diamond Painting",
    price: 30,
    categories: ["art"],
    short: "12×16 framed gnome garden, round drills.",
    description:
      "Valentine’s Day gnome garden diamond painting — 12 by 16 inches, round drills on canvas, framed. One of a kind piece from the shop, signed by KayzCharmzz.",
    details: ["12 × 16 in", "Framed", "Round drills", "OOAK"],
    image: "/products/gnome-diamond-art.jpg",
    leadTime: "1-week",
  },
  {
    slug: "diamond-painting-kit",
    name: "Diamond Painting Kit",
    price: 18,
    categories: ["art"],
    short: "A quiet, sparkling night in.",
    description:
      "A 5D diamond painting kit with round drills — floral, sparkly, and ready to sit with.",
    details: ["5D round drills", "Floral design", "Stylus and wax included"],
    image: "/products/diamond-kit.jpg",
    leadTime: "1-week",
  },
  {
    slug: "hoodie-art-print",
    name: "Bejeweled Hoodie Art Print",
    price: 15,
    categories: ["art"],
    short: "Colorful digital artwork of a rhinestone hoodie.",
    description:
      "Colorful bejeweled hoodie art print — digital artwork from the shop, printed to hang. A little extra sparkle for a wall.",
    details: ["Art print", "Hoodie artwork", "Ready to frame"],
    image: "/products/hoodie-art-print.jpg",
    leadTime: "1-week",
  },
];

export function getProduct(slug: string, catalog: Product[] = PRODUCTS) {
  return catalog.find((p) => p.slug === slug);
}

export function productsByCategory(category?: string, catalog: Product[] = PRODUCTS) {
  if (!category || category === "all") return catalog;
  return catalog.filter((p) => p.categories.includes(category as CategoryId));
}

export function featuredProducts(catalog: Product[] = PRODUCTS) {
  const featured = catalog.filter((p) => p.featured);
  return featured.length ? featured : catalog.slice(0, 6);
}

export function categoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function slugifyName(name: string) {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base || "piece";
}
