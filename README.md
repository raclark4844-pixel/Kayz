# KayzCharmzz

Handmade boutique site for **KayzCharmzz** — a female and Black-owned shop in Cleveland, Ohio. Tagline: *A Store With a Purpose.*

Live: [https://kayzcharmzz.grok.me](https://kayzcharmzz.grok.me)

## What’s here

- Home, Shop, Classes, Custom, About, Contact
- Product catalog (tumblers, candles, charms, earrings, cases, diamond art)
- Local bag + checkout (Cleveland pickup or USPS, order emails Kay)
- Studio login to add, edit, or remove pieces and set lead time
- Family links to parent company and True Sparkle

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:8080

```bash
npm run build
npm run typecheck
```

## Studio

`/login`

- Username: `admin`
- Password: `sparkle`

Signed in, you can add items (price, description, photo, lead time), edit them, or delete them. New pieces use the same bag and checkout as the rest of the shop.

## Contact

- Lana Moss
- lana@ikscharmsandtwosparkles.com
- 216-309-0331

## Stack

TanStack Start, React 19, Tailwind CSS v4, Zustand, Postgres / PGLite.

Checkout does not charge cards. Place order opens a message to Kay with the bag, address, and total. She replies with PayPal or Cash App.
