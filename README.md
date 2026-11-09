# Brothers Pizza Company — concept website

A pitch-quality redesign for **Brothers Pizza Company**, 205 E Market St, Crawfordsville, IN 47933 · (765) 361-1800.
Their current site is a free Google Sites page (https://sites.google.com/view/brotherspizzaco/home).

Live: https://justuseflint.github.io/brothers-pizza/

## Pages
- `/` Home: hero, live open/closed status, specialty pies, Pizza of the Month, build-and-price tool, story, reviews, community, hours
- `/menu/` Full menu with sticky categories, search, vegetarian filter, size switch and the build-your-own pricer
- `/story/` The Lowe brothers, timeline, Christmas on Green St., job application link
- `/visit/` Hours, Google Map, how to order, gift cards, delivery-zone map with an address check

## Sources
See `research/notes.md`. Menu and prices come from their own Heartland online-ordering menu data (fetched Nov 9, 2026; raw captures kept locally, not in the repo).
Online ordering there is switched off, so the site's order CTA is tap-to-call. Story facts come from Crawfordsville Main Street's "Brick & Mortar Backstory" (Dec 17, 2024).

## Images
Real (the business's own, or from coverage of it):
- `logo-brothers.webp`, `logo-brothers-sm.png`: caricature logo (Google Sites / Main Street)
- `logo-stamp.webp`, `logo-stamp-sm.png`, `favicon.png`, `apple-touch-icon.png`: stamp logo (Google Sites / Heartland)
- `real-supreme.webp`, `real-calzone.webp`, `real-stuffed-sticks.webp`, `real-cheese-sauce.webp`: menu photos from their Heartland ordering page
- `real-pizza-sausage.webp`, `real-christmas-sleigh.webp`, `real-christmas-flyer.webp`: Crawfordsville Main Street post (Dec 2024)

AI-generated atmosphere (not photos of Brothers; replace with real photos when available):
- `gen-dough-toss.webp`, `gen-sauce.webp`, `gen-pizza-night.webp`

Pizza illustrations are drawn in code (`assets/js/pie.js`) from each pizza's listed toppings.
`og.jpg` is a share card built from the logo.

## Needs from the owner
Permission for the photos above, real kitchen/storefront photos, current prices, delivery fee/minimum/cut-off, parking notes, this month's Pizza of the Month, the 2026 Christmas on Green St. date, and whether they want online ordering turned back on.

## Stack
Plain HTML, CSS and JavaScript, no build step needed to serve. Pages are generated with `node _build/build.mjs` from `_build/data.mjs` and `_build/pages.mjs`.
Motion: GSAP + ScrollTrigger + Lenis (vendored in `assets/vendor/`). Map: Leaflet with OpenStreetMap tiles; address lookup via OSM Nominatim.
Respects `prefers-reduced-motion`. Fonts: Fraunces, Instrument Sans, DM Mono (Google Fonts).

    python3 -m http.server 8765   # from the parent folder, then open /brothers-pizza/
