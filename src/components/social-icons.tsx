import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-11 items-center justify-center text-muted transition-colors duration-150 hover:text-gold"
    >
      {children}
    </a>
  );
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <IconLink href={SITE.instagram} label="Instagram">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      </IconLink>
      <IconLink href={SITE.facebook} label="Facebook">
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M14.2 8.5V6.8c0-.7.5-1.1 1.2-1.1h1.1V3.2h-2.1c-2.4 0-3.9 1.6-3.9 4v1.3H9v2.7h1.5V21h3.2v-9.8h2.2l.3-2.7h-2.5z" />
        </svg>
      </IconLink>
      <IconLink href={SITE.tiktok} label="TikTok">
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M14.2 3h2.2c.2 1.7 1.3 3.2 2.8 4v2.3c-1.2.12-2.3-.18-3.3-.8v6.3c0 3.1-2.5 5.5-5.6 5.5S4.7 17.8 4.7 14.7c0-3 2.4-5.4 5.4-5.5v2.4c-1.6.1-2.9 1.4-2.9 3.1 0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V3z" />
        </svg>
      </IconLink>
    </div>
  );
}
