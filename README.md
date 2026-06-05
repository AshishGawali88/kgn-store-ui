# KGN Storefront — Angular 19

The KGN Power Tools & Materials storefront, rebuilt in **Angular 19** (standalone
components, signals, the new `@if`/`@for` control flow, lazy-loaded routes) and wired
to the Spring Boot API (`kgn-store-api`).

It keeps the **exact look** of the original site (the CSS is ported verbatim) and the
same **offline fallback**: if the API isn't configured or is unreachable, the app uses
a built-in product list and the WhatsApp enquiry/order flow, so it always works.

## Requirements
- Node.js 18.19+ (or 20+) and npm
- Angular CLI (optional globally): `npm i -g @angular/cli`

## Run locally
```bash
npm install
npm start        # = ng serve  → http://localhost:4200
```
With no API configured it shows the built-in 14 products.

## Connect to your Spring Boot API
Set the API URL in the environment files (leave empty to stay offline):

- `src/environments/environment.ts` (dev) — e.g. `apiBase: 'http://localhost:8080'`
- `src/environments/environment.prod.ts` (prod) — e.g. `apiBase: 'https://kgn-store-api.onrender.com'`

When set, the app loads `/api/products`, posts enquiries to `/api/enquiries`, and
places orders at `/api/orders`. On any failure it silently falls back.

> Also make sure the API's `ALLOWED_ORIGINS` includes this app's URL
> (`http://localhost:4200` for dev, your Netlify/Vercel URL for prod), or the browser
> will block the cross-origin calls.

## Build for production
```bash
npm run build    # outputs to dist/kgn-angular/browser
```

## Project structure
```
src/
├── environments/         API base URL config (dev + prod)
├── styles.css            global styles (ported from the original site)
├── assets/images/        product images
└── app/
    ├── app.component.ts   layout: top bar, header, nav, footer, WhatsApp button
    ├── app.config.ts      router + HttpClient providers
    ├── app.routes.ts      lazy standalone routes
    ├── models/            Product / CartLine types
    ├── data/              built-in product list (offline fallback)
    ├── services/          ProductService, CartService, EnquiryService, OrderService (signals)
    ├── components/
    │   └── product-card/  reusable product card
    └── pages/             home, shop, cart, checkout, about, contact, login
```

## How the pieces connect
- **ProductService** — signal of products; tries the API, falls back to built-in list.
- **CartService** — signal-based cart with computed subtotal / GST / total.
- **EnquiryService / OrderService** — POST to the API, with a WhatsApp fallback.
- **Shop** — category, price and brand filters + sort + search (via `?cat=` / `?q=`).

## Deploy the UI for free
Build, then drag the **`dist/kgn-angular/browser`** folder to https://app.netlify.com/drop
(or use Vercel / Cloudflare Pages). Set `apiBase` in `environment.prod.ts` to your
deployed API URL before building. See the project's `FREE-HOSTING-GUIDE.md` for the
full walkthrough, including hosting the Spring Boot API free on Render.

> SPA routing note: on Netlify, add a `_redirects` file containing
> `/*  /index.html  200` to the published folder so deep links work. (Included in
> `public/_redirects`.)
