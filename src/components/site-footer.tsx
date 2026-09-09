import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { FamilyBrandButtons } from "@/components/family-links";
import { SocialLinks } from "@/components/social-icons";
import { FAMILY, NAV, SITE } from "@/lib/site";
import { NAP_LINE } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-3 max-w-sm text-sm text-muted">
            {SITE.tagline}. Handmade jewelry, candles, tumblers, charms, and
            junk phone cases from Cleveland.
          </p>
          <SocialLinks className="-ml-2 mt-4" />
        </div>
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-gold">
            Visit
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shipping-returns" className="text-muted transition-colors hover:text-gold">
                Shipping & returns
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-gold">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li className="text-foreground">{SITE.contact}</li>
            <li>
              <a className="hover:text-gold" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-gold" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
            <li>{SITE.city}</li>
          </ul>
        </div>
      </div>
      <div className="gold-rule" />
      <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-gold">
          The family
        </p>
        <p className="mt-3 font-serif text-2xl text-foreground">
          Part of {FAMILY.parent.name}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Return to the parent studio, or shop original diamond painting kits at
          True Sparkle.
        </p>
        <FamilyBrandButtons className="mt-6" />
      </div>
      <div className="gold-rule" />
      <p className="px-4 py-5 text-center text-[0.7rem] tracking-[0.12em] text-muted">
        {NAP_LINE}
      </p>
    </footer>
  );
}
