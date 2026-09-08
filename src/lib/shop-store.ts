import { create } from "zustand";
import {
  PRODUCTS,
  type CategoryId,
  type LeadTimeId,
  type Product,
} from "./catalog";
import {
  createProduct,
  deleteProduct,
  getAdminStatus,
  listProducts,
  loginAdmin,
  logoutAdmin,
  updateProduct,
} from "./shop-fns";

export type EditorState =
  | { mode: "add" }
  | { mode: "edit"; product: Product }
  | { mode: "delete"; product: Product }
  | null;

type ShopState = {
  products: Product[];
  isAdmin: boolean;
  ready: boolean;
  editor: EditorState;
  hydrate: () => Promise<void>;
  refresh: () => Promise<void>;
  signIn: (username: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  signOut: () => Promise<void>;
  openAdd: () => void;
  openEdit: (product: Product) => void;
  askDelete: (product: Product) => void;
  closeEditor: () => void;
  saveProduct: (input: {
    name: string;
    price: number;
    description: string;
    image: string;
    leadTime: LeadTimeId;
    category: CategoryId;
    slug?: string;
  }) => Promise<Product>;
  confirmDelete: () => Promise<void>;
};

const TOKEN_KEY = "kayz_admin";

function readToken() {
  if (typeof window === "undefined") return undefined;
  return sessionStorage.getItem(TOKEN_KEY) ?? undefined;
}

function writeToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export const useShop = create<ShopState>((set, get) => ({
  products: PRODUCTS,
  isAdmin: false,
  ready: false,
  editor: null,
  hydrate: async () => {
    try {
      const [products, admin] = await Promise.all([
        listProducts(),
        getAdminStatus({ data: { token: readToken() } }),
      ]);
      set({ products, isAdmin: admin.isAdmin, ready: true });
    } catch {
      set({ ready: true });
    }
  },
  refresh: async () => {
    const products = await listProducts();
    set({ products });
  },
  signIn: async (username, password) => {
    const result = await loginAdmin({ data: { username, password } });
    if (!result.ok) return result;
    writeToken(result.token);
    set({ isAdmin: true });
    await get().refresh();
    return { ok: true };
  },
  signOut: async () => {
    writeToken(null);
    await logoutAdmin();
    set({ isAdmin: false, editor: null });
  },
  openAdd: () => set({ editor: { mode: "add" } }),
  openEdit: (product) => set({ editor: { mode: "edit", product } }),
  askDelete: (product) => set({ editor: { mode: "delete", product } }),
  closeEditor: () => set({ editor: null }),
  saveProduct: async (input) => {
    const payload = { ...input, token: readToken() };
    const product = input.slug
      ? await updateProduct({ data: payload })
      : await createProduct({ data: payload });
    await get().refresh();
    set({ editor: null });
    return product;
  },
  confirmDelete: async () => {
    const editor = get().editor;
    if (editor?.mode !== "delete") return;
    await deleteProduct({ data: { token: readToken(), slug: editor.product.slug } });
    await get().refresh();
    set({ editor: null });
  },
}));
