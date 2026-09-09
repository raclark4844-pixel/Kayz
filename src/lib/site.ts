export const SITE = {
  name: "KayzCharmzz",
  tagline: "A Store With a Purpose",
  email: "lana@ikscharmsandtwosparkles.com",
  contact: "Lana Moss",
  phone: "216-309-0331",
  phoneHref: "tel:+12163090331",
  city: "Cleveland, Ohio",
  est: "2021",
  founder: "Lana",
  instagram: "https://www.instagram.com/kayzcharmzz",
  facebook: "https://www.facebook.com/kayzcharmzz",
  tiktok: "https://www.tiktok.com/@mamk40",
} as const;

export const FAMILY = {
  parent: {
    name: "IK’s Charms & True Sparkle",
    label: "Parent company",
    href: "https://www.ikscharmsandtwosparkles.com",
  },
  sparkle: {
    name: "True Sparkle",
    label: "True Sparkle",
    href: "https://www.truesparkles.com",
  },
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/classes", label: "Classes" },
  { to: "/custom", label: "Custom" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function mailtoHref(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
