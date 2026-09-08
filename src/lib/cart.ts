import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, type LeadTimeId, type Product } from "./catalog";
import { snapshotFrom } from "./checkout";
import { useShop } from "./shop-store";

export type CartSnapshot = {
  name: string;
  price: number;
  image: string;
  leadTime: LeadTimeId;
};

export type CartLine = {
  slug: string;
  qty: number;
  snapshot?: CartSnapshot;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  hydrated: boolean;
  setHydrated: () => void;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, qty?: number, product?: Product) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

function lookupProduct(slug: string): Product | undefined {
  return useShop.getState().products.find((p) => p.slug === slug) ?? PRODUCTS.find((p) => p.slug === slug);
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      openCart: () => set({ open: true }),
      closeCart: () => set({ open: false }),
      add: (slug, qty = 1, product) => {
        const piece = product ?? lookupProduct(slug);
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.slug === slug);
        const snapshot = piece ? snapshotFrom(piece) : lines[i]?.snapshot;
        if (i >= 0) {
          lines[i] = {
            ...lines[i],
            qty: Math.min(10, lines[i].qty + qty),
            snapshot: snapshot ?? lines[i].snapshot,
          };
        } else {
          lines.push({ slug, qty: Math.min(10, qty), snapshot });
        }
        set({ lines, open: true });
      },
      setQty: (slug, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.slug !== slug) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.slug === slug ? { ...l, qty: Math.min(10, qty) } : l,
          ),
        });
      },
      remove: (slug) => set({ lines: get().lines.filter((l) => l.slug !== slug) }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "kayzcharmzz-cart",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export type CartItem = CartLine & { product: Product };

export function productFromSnapshot(slug: string, snapshot: CartSnapshot): Product {
  return {
    slug,
    name: snapshot.name,
    price: snapshot.price,
    image: snapshot.image,
    leadTime: snapshot.leadTime,
    categories: [],
    short: "",
    description: "",
    details: [],
  };
}

export function resolveCart(lines: CartLine[], catalog: Product[] = PRODUCTS): CartItem[] {
  return lines
    .map((line) => {
      const live = catalog.find((p) => p.slug === line.slug);
      const product = live ?? (line.snapshot ? productFromSnapshot(line.slug, line.snapshot) : undefined);
      return product ? { ...line, product } : null;
    })
    .filter((x): x is CartItem => x !== null);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((n, l) => n + l.product.price * l.qty, 0);
}
