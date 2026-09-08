import { createServerFn } from "@tanstack/react-start";
import {
  isCategoryId,
  isLeadTimeId,
  PRODUCTS,
  slugifyName,
  type CategoryId,
  type LeadTimeId,
  type Product,
} from "./catalog";

type ProductRow = {
  slug: string;
  name: string;
  price: string | number;
  categories: string;
  short: string;
  description: string;
  details: string;
  image: string;
  featured: boolean | string | number;
  lead_time: string;
};

function asBool(value: boolean | string | number) {
  return value === true || value === "t" || value === "true" || value === 1 || value === "1";
}

function parseList(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function rowToProduct(row: ProductRow): Product {
  const categories = parseList(row.categories).filter(isCategoryId);
  return {
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    categories: categories.length ? categories : ["charms"],
    short: row.short,
    description: row.description,
    details: parseList(row.details),
    image: row.image,
    featured: asBool(row.featured),
    leadTime: isLeadTimeId(row.lead_time) ? row.lead_time : "1-week",
  };
}

async function seededSql() {
  const { getSql } = await import("./db");
  const sql = await getSql();
  const flags = await sql<{ value: string }>`select value from shop_meta where key = ${"catalog_seeded"}`;
  if (flags.length === 0) {
    for (const p of PRODUCTS) {
      await sql`
        insert into products (slug, name, price, categories, short, description, details, image, featured, lead_time)
        values (
          ${p.slug},
          ${p.name},
          ${p.price},
          ${JSON.stringify(p.categories)},
          ${p.short},
          ${p.description},
          ${JSON.stringify(p.details)},
          ${p.image},
          ${Boolean(p.featured)},
          ${p.leadTime}
        )
        on conflict (slug) do nothing
      `;
    }
    await sql`insert into shop_meta (key, value) values (${"catalog_seeded"}, ${"1"}) on conflict (key) do nothing`;
  }
  return sql;
}

async function requireAdmin(token?: string) {
  const { isAdminFrom } = await import("./admin.server");
  if (!isAdminFrom(token)) {
    throw new Error("Admin sign-in required.");
  }
}

function clipImage(image: string) {
  if (image.length > 1_800_000) {
    throw new Error("That photo is too large. Try a smaller picture.");
  }
  return image;
}

function shortFrom(description: string, fallback: string) {
  const text = description.trim();
  if (!text) return fallback.slice(0, 80);
  const sentence = text.split(/(?<=[.!?])\s+/)[0] ?? text;
  return sentence.slice(0, 90);
}

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await seededSql();
  const rows = await sql<ProductRow>`
    select slug, name, price, categories, short, description, details, image, featured, lead_time
    from products
    order by featured desc, name asc
  `;
  return rows.map(rowToProduct);
});

export const getAdminStatus = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const data = (d ?? {}) as { token?: string };
    return { token: typeof data.token === "string" ? data.token : undefined };
  })
  .handler(async ({ data }) => {
    const { isAdminFrom } = await import("./admin.server");
    return { isAdmin: isAdminFrom(data.token) };
  });

export const loginAdmin = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const data = (d ?? {}) as { username?: string; password?: string };
    return {
      username: String(data.username ?? ""),
      password: String(data.password ?? ""),
    };
  })
  .handler(async ({ data }) => {
    const admin = await import("./admin.server");
    if (!admin.credentialsMatch(data.username, data.password)) {
      return { ok: false as const, error: "That login is not recognized." };
    }
    const token = admin.mintAdminToken();
    admin.writeAdminCookie(token);
    return { ok: true as const, token };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { clearAdminCookie } = await import("./admin.server");
  clearAdminCookie();
  return { ok: true };
});

export type ProductInput = {
  token?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  leadTime: LeadTimeId;
  category: CategoryId;
  slug?: string;
};

function parseProductInput(d: unknown): ProductInput {
  const data = (d ?? {}) as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const description = String(data.description ?? "").trim();
  const image = String(data.image ?? "").trim();
  const price = Number(data.price);
  const leadTime = String(data.leadTime ?? "");
  const category = String(data.category ?? "");
  if (!name) throw new Error("Name is required.");
  if (!Number.isFinite(price) || price < 0) throw new Error("Enter a valid price.");
  if (!description) throw new Error("Description is required.");
  if (!image) throw new Error("A photo is required.");
  if (!isLeadTimeId(leadTime)) throw new Error("Choose a lead time.");
  if (!isCategoryId(category)) throw new Error("Choose a category.");
  return {
    token: typeof data.token === "string" ? data.token : undefined,
    name,
    price: Math.round(price * 100) / 100,
    description,
    image: clipImage(image),
    leadTime,
    category,
    slug: typeof data.slug === "string" ? data.slug : undefined,
  };
}

export const createProduct = createServerFn({ method: "POST" })
  .validator(parseProductInput)
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    const sql = await seededSql();
    let slug = slugifyName(data.name);
    const clash = await sql<{ slug: string }>`select slug from products where slug = ${slug}`;
    if (clash.length) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    const short = shortFrom(data.description, data.name);
    await sql`
      insert into products (slug, name, price, categories, short, description, details, image, featured, lead_time)
      values (
        ${slug},
        ${data.name},
        ${data.price},
        ${JSON.stringify([data.category])},
        ${short},
        ${data.description},
        ${JSON.stringify([])},
        ${data.image},
        ${false},
        ${data.leadTime}
      )
    `;
    const rows = await sql<ProductRow>`
      select slug, name, price, categories, short, description, details, image, featured, lead_time
      from products where slug = ${slug}
    `;
    return rowToProduct(rows[0]);
  });

export const updateProduct = createServerFn({ method: "POST" })
  .validator(parseProductInput)
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    if (!data.slug) throw new Error("Missing item.");
    const sql = await seededSql();
    const existing = await sql<ProductRow>`
      select slug, name, price, categories, short, description, details, image, featured, lead_time
      from products where slug = ${data.slug}
    `;
    if (!existing.length) throw new Error("That piece is not in the shop.");
    const current = rowToProduct(existing[0]);
    const categories = current.categories.includes(data.category)
      ? current.categories
      : [data.category, ...current.categories.filter((c) => c !== data.category)];
    const short = current.short;
    await sql`
      update products set
        name = ${data.name},
        price = ${data.price},
        categories = ${JSON.stringify(categories)},
        short = ${short},
        description = ${data.description},
        image = ${data.image},
        lead_time = ${data.leadTime},
        updated_at = now()
      where slug = ${data.slug}
    `;
    const rows = await sql<ProductRow>`
      select slug, name, price, categories, short, description, details, image, featured, lead_time
      from products where slug = ${data.slug}
    `;
    return rowToProduct(rows[0]);
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const data = (d ?? {}) as { token?: string; slug?: string };
    const slug = String(data.slug ?? "").trim();
    if (!slug) throw new Error("Missing item.");
    return { token: typeof data.token === "string" ? data.token : undefined, slug };
  })
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    const sql = await seededSql();
    await sql`delete from products where slug = ${data.slug}`;
    return { ok: true, slug: data.slug };
  });
