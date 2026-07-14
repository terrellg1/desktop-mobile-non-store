# Take ZOZ live — GitHub Pages + Stripe Payment Links

**No server. No Cloudflare. No Shopify/Wix. No monthly fee.**
The only cost is Stripe's per-sale fee (2.9% + 30¢) — unavoidable for taking real
Apple Pay money anywhere.

Stack:
- **Site** → GitHub Pages (free forever, no credit card).
- **Checkout + Apple Pay** → Stripe Payment Links (Stripe *hosts* the checkout page —
  nothing for you to deploy).
- **Orders → podpartner.com** → Stripe integration or Zapier (no code).

---

## Step 1 — Put the site on GitHub Pages (≈5 min, $0)

1. On GitHub: **New repository** → name it e.g. `zoz-store` → Public → Create.
2. **Add file → Upload files** → drag in `ZOZ Store.html`.
   Rename it to **`index.html`** (GitHub Pages serves that automatically).
3. Commit.
4. Repo **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / root → Save.
5. Wait ~1 min. Your site is live at `https://<your-username>.github.io/zoz-store/`.

Custom domain (optional): Settings → Pages → Custom domain → add yours (from
Namecheap etc.), then point a CNAME at `<your-username>.github.io`. HTTPS is automatic.

**The site is now live.** Next, make the Pay buttons charge for real.

---

## Step 2 — Create Stripe Payment Links (Stripe hosts checkout + Apple Pay)

No code, no server. Stripe hosts the whole payment page.

1. Create a free account at stripe.com.
2. Settings → Payments → **Apple Pay** → add & verify your domain
   (Stripe gives you a file to upload to the repo — drop it in and commit).
3. For **each ZOZ product**: Dashboard → **Payment Links → New**.
   - Add the product (name, price, image).
   - Turn on **"Collect shipping address"**.
   - (Optional) let the customer adjust quantity.
   - Create → **copy the link** (looks like `https://buy.stripe.com/xxxxxxxx`).

Apple Pay shows up automatically on that page for eligible devices — you don't write
a single line of Apple Pay code.

---

## Step 3 — Paste the links into the storefront

In `ZozStore.dc.html` (the single responsive source — one file serves both desktop and
mobile), find `stripeLinks()` in the logic class and paste each product's URL:

```js
stripeLinks() {
  return {
    'zip-hoodie':      'https://buy.stripe.com/aaaa',
    'world-tee':       'https://buy.stripe.com/bbbb',
    'love-non-tee':    'https://buy.stripe.com/cccc',
    'asl-longsleeve':  'https://buy.stripe.com/dddd',
    'sweatpants-sand': 'https://buy.stripe.com/eeee',
    'sweatpants-fog':  'https://buy.stripe.com/ffff',
    'beanie':          'https://buy.stripe.com/gggg'
  };
}
```

How the buttons behave now:
- Product page **Pay** button → opens that product's Stripe link (express Apple Pay).
- Cart **Pay** button → if the bag is a single product, opens its link; otherwise the
  built-in demo confirmation runs (see Step 3b for real multi-item checkout).
- Any product left **blank** keeps the demo confirmation, so nothing breaks while you
  fill links in one at a time.

---

## Step 3b — Real cart checkout for multi-item bags (Stripe.js, still no server)

Payment Links only handle one product at a time. To charge a full multi-item cart in one
go, use Stripe's **client-only Checkout** — no backend needed, just your keys:

1. Stripe Dashboard → **Settings → Checkout and Payment Links** → enable
   **“Allow client-only integration.”**
2. For each product, create a **Price** and copy its `price_...` id
   (Products → your product → Pricing).
3. In `ZozStore.dc.html`, fill in `stripePublishableKey()` and `stripePriceIds()`:

```js
stripePublishableKey() { return 'pk_live_51H...'; }
stripePriceIds() {
  return {
    'zip-hoodie':      'price_1AaaaZip',
    'world-tee':       'price_1BbbbWorld',
    'love-non-tee':    'price_1CcccLove',
    'asl-longsleeve':  'price_1DdddAsl',
    'sweatpants-sand': 'price_1EeeeSand',
    'sweatpants-fog':  'price_1FfffFog',
    'beanie':          'price_1GgggBeanie'
  };
}
```

Now the cart **Pay** button sends the whole bag (each line item + quantity) to Stripe's
hosted checkout, which handles cards, Apple Pay, and Google Pay, then returns the buyer
to your site with `?checkout=success`. Priority order the store uses: multi-item Stripe
Checkout (if keys + all price ids are set) → single-product Payment Link → demo screen.
Stripe.js loads only when someone actually checks out.

> Note: client-only Checkout passes price + quantity to Stripe, not the size chosen in
> the UI. If you need size on the receipt, create a separate Price per size, or move to a
> tiny serverless Checkout Session later (your POD host may provide one).

Then re-export the single file and re-upload `index.html` to GitHub — **ping me and I'll
regenerate `ZOZ Store.html` for you** after you've added the links.

---

## Step 4 — Route paid orders to podpartner.com (no code)

Pick whichever podpartner.com supports:
- **Native Stripe integration** — in podpartner.com's dashboard, connect your Stripe
  account; paid orders import automatically. (Check their docs first — most POD
  services have this.)
- **Zapier** — Trigger: *Stripe → New Payment*; Action: *podpartner.com → Create Order*.
  Map name/address/line-items. Free tier covers low volume.

---

## Step 3.5 — Add your product photos (drag & drop)

Open `ZozStore.dc.html` in the editor. Every product image — the shop grid, the phone
rail, and the big product-page shot — is now a drop target. **Drag a photo file straight
onto any tile** (or click it to browse). Grid card and product page share one slot per
product, so a photo you drop in either place shows in both. The homepage campaign card
and the studio panel are editable the same way.

Dropped photos are saved to a sidecar file, `.image-slots.state.json`, that sits next to
the HTML. When you re-export the single `ZOZ Store.html`, upload **that sidecar alongside
`index.html`** to GitHub so visitors see your photos. (Or send it to me and I'll bake the
images directly into the file so it stays a single upload.)

---

## Reality check on cost
- GitHub Pages: **$0**.
- Stripe: **$0 monthly**, 2.9% + 30¢ per sale only when you actually get paid.
- Zapier: free tier is fine to start.
- Domain (optional): ~$10/yr.

That's a fully self-hosted store with real Apple Pay for essentially free until you
make a sale.

---

## Analytics (already wired in)

The store is already sending analytics — nothing to install:
- **Google Analytics 4** (`G-6X5EBVPG1B`) — pageviews **plus** shopper events:
  `view_item` (product opened), `add_to_cart`, `begin_checkout`, and `purchase`
  (with revenue + line items). See these in GA4 under Reports → Engagement / Monetisation,
  or Realtime while you test.
- **Cloudflare Web Analytics** — privacy-friendly traffic + top pages, no cookie banner.

Between these two and your **Stripe Dashboard** (revenue, orders, conversion) you have the
same picture Shopify's analytics give you. To swap in different IDs later, tell me and I'll
update the tags.

---

## Note on multi-item carts
Multi-item checkout is now built in via Stripe's **client-only Checkout** — see Step 3b.
No server required: fill in your publishable key + price IDs and the cart Pay button sends
the whole bag to Stripe. (A serverless Checkout Session is only needed if you later want
per-size line items or custom server logic.)
