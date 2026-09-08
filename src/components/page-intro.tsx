import type { ReactNode } from "react";

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-2xl px-4 pt-8 text-center sm:px-6 sm:pt-10">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">{kicker}</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">{title}</h1>
      {children ? <div className="mt-4 text-pretty text-muted">{children}</div> : null}
      <div className="gold-rule mx-auto mt-8 max-w-40" />
    </header>
  );
}
