import { leadTimeLabel, type LeadTimeId, type Product } from "./catalog";
import { formatPrice } from "./utils";
import type { CartItem } from "./cart";

export const US_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["DC", "District of Columbia"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
] as const;

export type DeliveryId = "ship" | "pickup";

export const DELIVERY = [
  {
    id: "pickup" as const,
    label: "Pickup",
    detail: "Cleveland, Ohio — Lana will confirm a time.",
    price: 0,
  },
  {
    id: "ship" as const,
    label: "Shipping",
    detail: "USPS — typically 3–7 business days after the piece is ready.",
    price: 8,
  },
] as const;

export function shippingPrice(delivery: DeliveryId) {
  return DELIVERY.find((d) => d.id === delivery)?.price ?? 0;
}

const LEAD_RANK: LeadTimeId[] = ["1-week", "2-weeks", "3-weeks", "1-month"];

export function longestLeadTime(items: CartItem[]): LeadTimeId {
  let best: LeadTimeId = "1-week";
  for (const item of items) {
    const id = item.product.leadTime;
    if (LEAD_RANK.indexOf(id) > LEAD_RANK.indexOf(best)) best = id;
  }
  return best;
}

export function checkoutTotals(items: CartItem[], delivery: DeliveryId) {
  const subtotal = items.reduce((n, l) => n + l.product.price * l.qty, 0);
  const shipping = shippingPrice(delivery);
  return { subtotal, shipping, total: subtotal + shipping };
}

export type CheckoutDetails = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  delivery: DeliveryId;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
};

export function buildOrderEmail(items: CartItem[], details: CheckoutDetails) {
  const { subtotal, shipping, total } = checkoutTotals(items, details.delivery);
  const lead = longestLeadTime(items);
  const lines = items.map((l) => {
    const line = formatPrice(l.product.price * l.qty);
    return [
      `• ${l.product.name}`,
      `  Qty ${l.qty} × ${formatPrice(l.product.price)} = ${line}`,
      `  Lead time: ${leadTimeLabel(l.product.leadTime)}`,
    ].join("\n");
  });
  const shipBlock =
    details.delivery === "pickup"
      ? ["Delivery: Pickup in Cleveland, Ohio", "Shipping: Free"]
      : [
          "Delivery: Shipping",
          `${details.firstName} ${details.lastName}`,
          details.address,
          details.apt ? details.apt : "",
          `${details.city}, ${details.state} ${details.zip}`,
          "United States",
          `Shipping: ${formatPrice(shipping)}`,
        ].filter(Boolean);

  return [
    `New KayzCharmzz order from ${details.firstName} ${details.lastName}`.trim(),
    "",
    "CUSTOMER",
    `Name: ${details.firstName} ${details.lastName}`.trim(),
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    "",
    "BAG",
    ...lines,
    "",
    ...shipBlock,
    `Please allow ${leadTimeLabel(lead)} for made-to-order pieces.`,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Shipping: ${shipping === 0 ? "Free" : formatPrice(shipping)}`,
    `Total: ${formatPrice(total)}`,
    details.notes ? `\nNotes:\n${details.notes}` : "",
    "",
    "Lana will reply with PayPal or Cash App to finish payment.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function snapshotFrom(product: Product) {
  return {
    name: product.name,
    price: product.price,
    image: product.image,
    leadTime: product.leadTime,
  };
}
