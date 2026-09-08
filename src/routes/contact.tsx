import { createFileRoute } from "@tanstack/react-router";
import { MailForm } from "@/components/mail-form";
import { PageIntro } from "@/components/page-intro";
import { SocialLinks } from "@/components/social-icons";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <main className="pb-nav pb-20">
      <PageIntro kicker="Write Kay" title="Contact">
        Questions, pickups, and custom ideas — she reads every note.
      </PageIntro>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div className="space-y-8">
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
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Home</p>
            <p className="mt-1 font-serif text-2xl">
              {SITE.city} · Est. {SITE.est}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Follow</p>
            <p className="mt-2 text-sm text-muted">
              Instagram & Facebook @kayzcharmzz · TikTok @mamk40
            </p>
            <SocialLinks className="-ml-2 mt-1" />
          </div>
        </div>
        <MailForm
          subjectPrefix="KayzCharmzz message"
          submitLabel="Email Kay"
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
