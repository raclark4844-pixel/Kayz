import { createFileRoute, Link } from "@tanstack/react-router";
import { MailForm } from "@/components/mail-form";
import { PageIntro } from "@/components/page-intro";
import { SocialLinks } from "@/components/social-icons";
import { SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact KayzCharmzz | Avon, Ohio",
      description:
        `Email Lana Moss or visit ${SITE.address}. Handmade tumblers, candles, junk cases, jewelry, and custom orders — photos optional on custom requests.`,
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="pb-nav pb-20">
      <PageIntro kicker="Write Lana" title="Contact">
        Questions, pickups, and custom ideas — Lana Moss reads every note. For a
        custom tumbler, charm mix, or junk case, use the{" "}
        <Link to="/custom" className="text-gold underline">
          custom order form
        </Link>
        . A photo is optional.
      </PageIntro>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Contact</p>
            <p className="mt-1 font-serif text-2xl">{SITE.contact}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Email</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 block font-serif text-2xl hover:text-gold">
              {SITE.email}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Phone</p>
            <a href={SITE.phoneHref} className="mt-1 block font-serif text-2xl hover:text-gold">
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Studio</p>
            <p className="mt-1 font-serif text-2xl leading-snug">
              {SITE.street}
              <br />
              {SITE.unit}
              <br />
              {SITE.city} {SITE.zip}
            </p>
            <p className="mt-2 text-sm text-muted">Est. {SITE.est} · Pickup by appointment</p>
          </div>
          <div>
            <SocialLinks className="-ml-2" />
          </div>
        </div>
        <MailForm
          subjectPrefix="KayzCharmzz message"
          submitLabel="Email Lana"
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
            {
              name: "message",
              label: "Message",
              kind: "area",
              required: true,
              rows: 6,
            },
          ]}
        />
      </div>
    </main>
  );
}
