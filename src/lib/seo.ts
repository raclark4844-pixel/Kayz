export { gaId, trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

export const SITE_NAME = "KayzCharmzz";
export const SITE_ORIGIN = "https://www.kayzcharmzz.com";
export const PARENT_URL = "https://www.ikscharmsandtwosparkles.com";
export const SPARKLE_URL = "https://www.truesparkles.com";
export const SITE_TITLE = "Handmade Tumblers, Candles & Charms | KayzCharmzz Cleveland";
export const SITE_DESCRIPTION =
  "Handmade tumblers, junk phone cases, soy candles, charm jewelry, and beaded pens from a Black-owned Cleveland boutique. Custom orders welcome — shop KayzCharmzz.";

export const NAP_LINE = `IK’s Charms & True Sparkle · Cleveland, Ohio · ${SITE.email} · ${SITE.phone}`;
export const SISTER_SENTENCE =
  "KayzCharmzz and True Sparkle are sister brands under IK’s Charms & True Sparkle.";

export const LEGACY_HOSTS = [
  "kayzcharmzz.grok.me",
  "kayz.vercel.app",
  "kayzcharmzz.com",
] as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized === "/" ? "/" : normalized}`;
}

export function pageHead({
  title,
  description,
  path,
  image = "/og.jpg",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}) {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: SITE_NAME },
      { name: "geo.region", content: "US-OH" },
      { name: "geo.placename", content: "Cleveland" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Store", "JewelryStore"],
      "@id": `${SITE_ORIGIN}/#organization`,
      name: SITE_NAME,
      url: SITE_ORIGIN,
      image: absoluteUrl("/og.jpg"),
      email: SITE.email,
      telephone: SITE.phoneHref.replace("tel:", ""),
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cleveland",
        addressRegion: "OH",
        addressCountry: "US",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "IK’s Charms & True Sparkle",
        url: PARENT_URL,
      },
      sameAs: [SITE.instagram, SITE.facebook, SITE.tiktok, PARENT_URL, SPARKLE_URL],
    },
  ],
} as const;
