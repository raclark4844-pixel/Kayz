create table if not exists products (
  slug        text primary key,
  name        text not null,
  price       numeric not null,
  categories  text not null,
  short       text not null default '',
  description text not null default '',
  details     text not null default '[]',
  image       text not null,
  featured    boolean not null default false,
  lead_time   text not null default '1-week',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists shop_meta (
  key   text primary key,
  value text not null
);

create index if not exists products_updated_at_idx on products (updated_at desc);
