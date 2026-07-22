# Nonchalant — Web UI Kit

Interactive recreation of the Nonchalant marketing storefront. Composes the design-system primitives (Button, ProductCard, SizeSwatch, ColorSwatch, Tag, Accordion, IconButton, Divider).

**Screens / flow** — open `index.html`:
- **Home** — hero, category rail, best-sellers grid, editorial band.
- **Collection** — filter rail (size tags + category checkboxes) + product grid. Reached from any nav item.
- **Product (PDP)** — gallery, color + size selectors, add-to-bag, detail accordions, recommendations.
- **Cart drawer** — slide-in bag with quantity steppers and subtotal.

Click products to open the PDP; "Add to bag" opens the cart drawer.

**Files**
- `data.js` — fake catalog (window.NCL_DATA). Product imagery is stubbed with warm-neutral placeholder fills (`Ph`) — swap for real photography.
- `shared.jsx` — icon set (`NclIcon`) + `Ph` placeholder.
- `Chrome.jsx` — announcement bar, nav, footer.
- `Home.jsx` / `Collection.jsx` / `Product.jsx` / `CartDrawer.jsx` — screens.
- `App.jsx` — router + cart state.

Note: no real product photography was provided, so image areas use neutral tone blocks. Provide assets to make this photographic.
