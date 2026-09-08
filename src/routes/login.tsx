import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const isAdmin = useShop((s) => s.isAdmin);
  const signIn = useShop((s) => s.signIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await signIn(username, password);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await navigate({ to: "/shop" });
  }

  return (
    <main className="pb-nav mx-auto flex min-h-[70svh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-center text-[0.7rem] uppercase tracking-[0.28em] text-gold">Studio</p>
      <h1 className="mt-3 text-center font-serif text-4xl">Sign in</h1>
      <p className="mt-3 text-center text-sm text-muted">
        Private access for Kay. Shoppers do not need an account.
      </p>
      {isAdmin ? (
        <div className="mt-8 text-center">
          <p className="text-sm text-gold">You are already signed in.</p>
          <Button asChild className="mt-4">
            <Link to="/shop">Open shop</Link>
          </Button>
        </div>
      ) : (
        <form className="mt-10 space-y-4" onSubmit={(e) => void onSubmit(e)}>
          <Field label="Username">
            <Input
              name="username"
              id="login-username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Field>
          <Field label="Password">
            <Input
              name="password"
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          {error ? <p className="text-sm text-rose-deep">{error}</p> : null}
          <Button type="submit" className="w-full" size="lg" disabled={busy}>
            {busy ? "Checking…" : "Enter"}
          </Button>
        </form>
      )}
    </main>
  );
}
