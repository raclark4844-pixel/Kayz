import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import { Field, Input, SelectField, Textarea } from "@/components/ui/input";
import { leadTimeLabel } from "@/lib/catalog";
import {
  buildOrderEmail,
  checkoutTotals,
  DELIVERY,
  longestLeadTime,
  US_STATES,
  type DeliveryId,
} from "@/lib/checkout";
import { resolveCart, useCart } from "@/lib/cart";
import { mailtoHref, SITE } from "@/lib/site";
import { useShop } from "@/lib/shop-store";
import { pageHead, trackEvent } from "@/lib/seo";
import { cn, formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () =>
    pageHead({
      title: "Checkout | KayzCharmzz",
      description: "Review your KayzCharmzz bag and email the order to the Cleveland studio.",
      path: "/checkout",
    }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const openCart = useCart((s) => s.openCart);
  const catalog = useShop((s) => s.products);
  const hydrated = useCart((s) => s.hydrated);
  const items = resolveCart(lines, catalog);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [delivery, setDelivery] = useState<DeliveryId>("pickup");
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("OH");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [placed, setPlaced] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(true);

  const { subtotal, shipping, total } = useMemo(
    () => checkoutTotals(items, delivery),
    [items, delivery],
  );
  const lead = items.length ? longestLeadTime(items) : "1-week";

  function onPlace(e: FormEvent) {
    e.preventDefault();
    if (!items.length) return;
    const details = {
      email,
      phone,
      firstName,
      lastName,
      delivery,
      address,
      apt,
      city,
      state,
      zip,
      notes,
    };
    trackEvent("begin_checkout", { currency: "USD", value: total });
    window.location.href = mailtoHref(
      `KayzCharmzz order — ${firstName} ${lastName}`.trim(),
      buildOrderEmail(items, details),
    );
    trackEvent("purchase", { currency: "USD", value: total });
    setPlaced(true);
    clear();
  }

  if (!hydrated) {
    return (
      <main className="pb-nav mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="text-muted">Loading your bag…</p>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="pb-nav mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">Order started</p>
        <h1 className="mt-3 font-serif text-4xl">Thank you</h1>
        <p className="mt-4 text-muted">
          A message opened to {SITE.email} with every piece in your bag — including
          custom and newly added shop items. Kay will reply with PayPal or Cash App
          to finish, and a time if you chose pickup.
        </p>
        <Button asChild className="mt-8">
          <Link to="/shop">Back to the shop</Link>
        </Button>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="pb-nav mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">Checkout</p>
        <h1 className="mt-3 font-serif text-4xl">Your bag is empty</h1>
        <p className="mt-4 text-muted">Add a piece from the shop, then come back to check out.</p>
        <Button asChild className="mt-8">
          <Link to="/shop">Shop the collection</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="pb-nav">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-4 py-8 sm:px-6">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">Checkout</p>
            <h1 className="mt-2 font-serif text-4xl">Place your order</h1>
          </div>
          <button
            type="button"
            onClick={openCart}
            className="hidden text-xs uppercase tracking-[0.16em] text-muted hover:text-gold sm:inline"
          >
            Return to bag
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <form className="space-y-8" onSubmit={onPlace}>
          <section>
            <h2 className="font-serif text-2xl">Customer</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Email">
                <Input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label="Phone">
                <Input
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Field>
              <Field label="First name">
                <Input
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Field>
              <Field label="Last name">
                <Input
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl">Delivery</h2>
            <div className="mt-4 grid gap-3">
              {DELIVERY.map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg bg-card px-4 py-3 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]",
                    delivery === option.id && "shadow-[0_0_0_1px_var(--color-gold)]",
                  )}
                >
                  <input
                    type="radio"
                    name="delivery"
                    className="mt-1 accent-gold"
                    checked={delivery === option.id}
                    onChange={() => setDelivery(option.id)}
                  />
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm tabular-nums text-gold">
                        {option.price === 0 ? "Free" : formatPrice(option.price)}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-muted">{option.detail}</span>
                  </span>
                </label>
              ))}
            </div>

            {delivery === "ship" ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Country / region">
                    <Input value="United States" readOnly />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Address">
                    <Input
                      autoComplete="street-address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Apt, suite (optional)">
                    <Input
                      autoComplete="address-line2"
                      value={apt}
                      onChange={(e) => setApt(e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="City">
                  <Input
                    autoComplete="address-level2"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Field>
                <Field label="State">
                  <SelectField
                    required
                    autoComplete="address-level1"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {US_STATES.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="ZIP code">
                  <Input
                    autoComplete="postal-code"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Field>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Pickup is in Cleveland, Ohio. Allow {leadTimeLabel(lead)} for made-to-order
                pieces, then Kay will text a time.
              </p>
            )}
          </section>

          <section>
            <h2 className="font-serif text-2xl">Payment</h2>
            <div className="mt-4 rounded-lg bg-card px-4 py-4 shadow-[0_0_0_1px_rgb(212_175_55/0.22)]">
              <p className="text-sm font-medium text-gold">Pay Kay after she confirms</p>
              <p className="mt-2 text-sm text-muted">
                Place order opens a message to {SITE.email} with this bag — every
                tumbler, candle, charm, and any piece added in the studio. Kay replies
                with PayPal or Cash App. No card is charged on this page.
              </p>
            </div>
            <div className="mt-4">
              <Field label="Note to Kay (optional)">
                <Textarea
                  rows={3}
                  placeholder="Gift wrap, colors, gate code, pickup day…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Field>
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full">
            Place order · {formatPrice(total)}
          </Button>
          <p className="text-center text-xs text-muted">
            You will review the order in your mail app before it sends.
          </p>
        </form>

        <aside className="lg:sticky lg:top-24">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg bg-card px-4 py-3 text-left lg:hidden"
            onClick={() => setSummaryOpen((v) => !v)}
          >
            <span className="text-sm uppercase tracking-[0.16em] text-muted">
              {summaryOpen ? "Hide bag" : `Show bag · ${items.length}`}
            </span>
            <span className="tabular-nums text-gold">{formatPrice(total)}</span>
          </button>
          <div className={cn("mt-3 space-y-4 lg:mt-0", !summaryOpen && "hidden lg:block")}>
            <h2 className="hidden font-serif text-2xl lg:block">Order summary</h2>
            <ul className="space-y-3">
              {items.map((line) => (
                <li key={line.slug} className="flex gap-3">
                  <img
                    src={line.product.image}
                    alt=""
                    className="size-16 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-lg leading-tight">{line.product.name}</p>
                    <p className="text-xs text-muted">
                      {leadTimeLabel(line.product.leadTime)} · {formatPrice(line.product.price)}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <QtyStepper
                        value={line.qty}
                        onChange={(n) => setQty(line.slug, n)}
                        className="h-9"
                      />
                      <button
                        type="button"
                        className="text-xs uppercase tracking-[0.14em] text-muted hover:text-rose-deep"
                        onClick={() => remove(line.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="gold-rule" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">
                  {delivery === "pickup" ? "Pickup" : "Shipping"}
                </dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between pt-1 text-base">
                <dt>Total</dt>
                <dd className="tabular-nums text-gold">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="text-xs text-muted">
              Made to order — please allow {leadTimeLabel(lead)}. Tax is confirmed by Kay
              if it applies.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
