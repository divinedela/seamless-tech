# React/Next.js Migration — Tech Stack Research

> When rebuilding Seamless Technologies Hub in React/Next.js, use this as the decision guide.
> Written: 2026-09-19

---

## The Core Insight

No single package handles everything. The ecosystem splits into layers — pick one tool per layer. Compose them.

---

## Layer 1 — Headless Commerce Backend

These replace a custom backend. Handle products, inventory, orders, cart, checkout logic, customers — all exposed via API.

### Medusa.js ← Recommended
- Open-source Shopify alternative
- Node.js, fully self-hostable (no monthly SaaS fees)
- Built-in: cart, orders, product catalog, discount engine, customer accounts
- React/Next.js storefront connects via REST or GraphQL
- Ships with a Next.js starter storefront
- **Has an official Paystack plugin** — critical for Ghana
- Best fit for Seamless Tech's scale and budget

### Saleor
- GraphQL-first, Django backend
- More enterprise-grade, steeper setup
- Better for large teams with dedicated backend devs

### Vendure
- TypeScript-native, GraphQL API
- Very developer-friendly
- Good middle ground between Medusa and Saleor

**Trade-off with any headless backend:** two apps to maintain — the backend server + the React storefront. Medusa's starter storefront reduces this.

---

## Layer 2 — Cart State (Client-Side)

### Zustand ← Recommended
- Lightweight global state (~30 lines for a full cart store)
- Define: add, remove, update qty, totals
- What most modern storefronts use
- No boilerplate, no providers

### react-use-cart
- Dedicated cart hook library
- add/remove/qty/totals already wired
- Good when you don't want to write cart logic yourself
- Smaller projects only

### Redux Toolkit
- Overkill for cart unless app is already Redux-heavy

---

## Layer 3 — Product Search & Filtering

Client-side filtering (what the current static site does) breaks past ~500 products. Real filtering needs a search engine.

### Meilisearch ← Recommended
- Open-source Algolia alternative
- **Self-hostable** — no per-search fees
- Has a React adapter
- Fast, typo-tolerant, faceted filtering
- Best cost-effective choice for this project at scale

### Algolia
- Industry standard, insanely fast
- Ships `react-instantsearch` — pre-built React components for search box, filters, facets, pagination, sort
- What we built manually in 500 lines of JS = ~50 lines with Algolia
- Not free, but generous free tier
- Use if Meilisearch feels like too much ops overhead

### Fuse.js
- Pure client-side fuzzy search, no server
- Fine for catalogs under ~300 products
- Use during early migration before search engine is set up

---

## Layer 4 — Payment (Most Important for Ghana)

### Paystack ← Recommended — Primary Processor
- Dominant payment processor in Ghana and Nigeria
- Has a React SDK
- Handles natively: MTN MoMo, Vodafone Cash, AirtelTigo, Debit/Credit Card, Bank Transfer
- Medusa has an **official Paystack plugin** — wires straight in
- This is the correct choice for Seamless Technologies Hub

### Flutterwave
- Strong alternative, also covers Ghana
- Handles same payment methods
- Better pan-African coverage if expanding beyond Ghana

### Stripe
- Cards only in Ghana currently
- Not suitable as primary processor for this market
- Could be added as secondary for international card payments

---

## Layer 5 — UI Components

No library gives ready-made product card / shop page React components that look polished. The ecosystem hasn't solved this.

### Shadcn/ui ← Recommended
- Design system primitives: buttons, cards, dialogs, inputs, dropdowns
- Not e-commerce specific — you build product cards on top of these
- Fully customizable (copy the source, own the code)
- What most modern Next.js storefronts use

### Next.js Commerce (by Vercel)
- Full Next.js storefront starter
- Connects to Shopify, BigCommerce, Medusa and others
- Worth studying for patterns and component structure even if not used directly

---

## Recommended Stack When Rebuilding

| Layer | Tool | Reason |
|---|---|---|
| Backend | **Medusa.js** | Open-source, self-hostable, Paystack plugin |
| Storefront | **Next.js** (App Router) | SEO, server components, image optimization |
| Cart state | **Zustand** | Simple, no boilerplate |
| Search & filters | **Meilisearch** | Self-hostable, fast, free |
| Payment | **Paystack** | MoMo + cards + Ghana-native |
| UI primitives | **Shadcn/ui** | Fully customizable design system |
| Hosting | **Vercel** (storefront) + **Railway/Render** (Medusa) | Standard setup |

---

## Migration Strategy

The current static site is a blueprint — not throwaway work.

- Page structure carries over directly (homepage → shop → product → checkout)
- Design system (CSS tokens) maps 1:1 to Tailwind/Shadcn tokens
- UX patterns (cart drawer, filter sidebar, category tabs) stay identical
- Only the data layer changes: hardcoded JS arrays → Medusa API calls
- Product data shapes already defined in `CLAUDE.md` — match these to Medusa's product schema

**Recommended migration order:**
1. Set up Medusa backend + import product catalog
2. Set up Meilisearch, index products from Medusa
3. Rebuild storefront in Next.js page by page, reusing the design system
4. Wire Paystack via Medusa plugin
5. Go live — redirect old static URLs to new routes
