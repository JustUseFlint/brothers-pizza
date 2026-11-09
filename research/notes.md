# Brothers Pizza Company — research notes
Compiled Mon Nov 9, 2026 (America/Indianapolis). Raw captures kept locally in `research/src/` (git-ignored).

## Identity
- **Name:** Brothers Pizza Company (also "Brothers Pizza Co", "Brother's Pizza Company")
- **Address:** 205 E Market St, Crawfordsville, IN 47933 — corner of Market St and Green St (Main Street post)
- **Phone:** (765) 361-1800
- **Email:** none published
- **Facebook:** https://www.facebook.com/BrothersPizzaCompany/ (linked from their Google Sites contact page; login wall blocks direct reading)
- **Current site:** https://sites.google.com/view/brotherspizzaco/home (free Google Sites; pages: Home, Application, Contact Us, Menu). Listing sites also cite www.brotherspizzaco.net, which returned HTTP 500 / no site on Nov 9, 2026; brotherspizzaco.com does not resolve (prospect CSV).
- **Motto:** "Pizza For Your Family" (Google Sites contact page; Main Street post)
- **Opened:** September 4th, 2013 (Google Sites home: "proudly serving the Crawfordsville community excellent pizza since September 4th, 2013.")

## Story (source: Crawfordsville Main Street, "Brick & Mortar Backstory", Dec 17, 2024 — https://www.crawfordsvillemainstreet.com/post/brothers)
- Owned by the Lowe brothers: **Luke, Jack, John, Michael, Mark and Brandon**. Opened 2013 at the corner of Market St and Green St.
- Had been in the pizza business before, stepped back to refine strategy and recipes.
- Mission: family. Motto "Pizza for your family." Grew up with "pizza and a movie" nights.
- Learned pizza-making in a professional kitchen with a master baker from Godfather's Pizza. "You might catch Jack spinning pizza dough overhead."
- Tomatoes for the sauce from **Stanislaus** (family-run, 80 years), who also trained them on the sauce. Cheeses through **Delco**, an Italian specialty food supplier.
- Mark: set boundaries early, put someone in charge.
- Saturday game night after close with spouses, nieces, nephews. Designing a tabletop RPG, *Garden Fall* (gnomes), planned for Feb 2025 (status unknown).
- Community: fundraisers for schools, sports teams, local organizations and families facing illness or loss; **turkey giveaway** each Thanksgiving (20 turkeys donated in 2024).
- **Christmas on Green St.** since 2013: grew from 5 people to hundreds; Santa, children pick a toy; sleigh; a reindeer in past years; a room set up to meet Santa; two golden jingle bells given each year. Pursuing non-profit status. 2024 edition Sat Dec 21, 3–6 pm (also on https://www.visitmoco.com/event/christmas-on-green-street/). 2026 date not found.
- Main Street post lists hours as Mon–Sat 11 am–10 pm, Sun noon–10 pm (Dec 2024) — **conflicts** with newer sources below; not used.

## Hours (used on site)
Mon–Sat 11:00 AM–9:00 PM · Sun 4:00 PM–9:00 PM
- Their own Google Sites Contact page (fetched Nov 9, 2026).
- Google listing via exa.ai place data (4.5★, 397 reviews), Restaurant Guru, Restaurantji, findglocal — all agree.
- Heartland POS schedules match: carryout Mon–Sat 11–21, Sun 16–21; second order type (likely delivery) Mon–Sat 11–20, Sun 16–20 → delivery may stop at 8 PM (unconfirmed; site says "ask about delivery cut-off").
- Holiday closures announced on Facebook (Memorial Day, Labor Day 2026) via findglocal mirror.

## Ratings / reviews (public)
- Google: 4.5 from ~397–403 reviews (exa.ai place page; Restaurant Guru, Nov 2026). Facebook 4.6 (367) and Tripadvisor 4.5 (29) per Restaurant Guru. Yelp 4.2 (46) via Apple Maps.
- Recent reviews (2026) say it's **carryout and delivery only**; dining room not open. Heartland: EatInEnabled 0.
- Brief quotes used (Google reviews, unnamed in source, via https://exa.ai/library/place/5zdvr9t777g):
  - "Some of the best pizza in central Indiana! Great breadsticks!" — Google review, Dec 2025
  - "easily the BEST cheese pizza around." — Google review, Nov 2025

## Ordering
- Google Sites "Order Online" button → http://brotherspizzaco.hrpos.heartland.us (Heartland Restaurant / "Mobile Bytes" online ordering, reseller Skybox Systems, live since 2020-08-17).
- **On Nov 9, 2026 the page says "Online ordering is currently disabled. Please contact the restaurant to place an order."** Config flag `online.Enabled = 0` (account-level, not just after-hours). Gift cards ($10, $25, open amount) still sell there.
- So the new site's order CTA is **tap-to-call**, with a gift-card link to Heartland.
- No DoorDash/Grubhub/UberEats/Slice/Toast storefront found.
- System prep estimates: carryout 20 min, delivery 55 min (config values; not shown as promises).
- Delivery zone polygon (27 points) saved to `src/delivery.json` (lat 39.99–40.09, lon −86.97 to −86.82): roughly Crawfordsville city. Used on Visit page as "approximate".
- Catering: Heartland catering carryout/delivery disabled; no catering offer found → no catering page. Fundraisers are hosted (Main Street).
- Hiring: Google Form https://docs.google.com/forms/d/e/1FAIpQLSfJWmHklpPKDOnY0DfpQU1aAgbxYVV4dkMtBmRUc8QBMfTeXg/viewform (Application page).

## Menu — PRIMARY SOURCE
Their own online-ordering menu data, Heartland `initial_data` JSON for brotherspizzaco.hrpos.heartland.us, fetched **Nov 9, 2026** (menu config version timestamp 2026-09-22). Raw: `src/heartland_initial_data_2026-11-09.json`. Online ordering is disabled, so prices should be confirmed by phone.

### Pizzas (hand tossed; cheese + 1 topping... see note)
Base pizza prices (Build a Pizza "comes with Cheese and 1 Topping"; XLG and Personal listed separately):
| Size | Base | Each extra topping | Extra cheese |
|---|---|---|---|
| 6" Personal | $4.75 | $0.50 | — |
| 10" | $8.55 | $1.35 | $1.25 |
| 12" | $10.55 | $1.55 | $1.45 |
| 14" | $12.55 | $1.75 | $1.65 |
| 16" XLG | $17.05 | $2.05 | $1.95 |
Sauce: marinara, ranch or BBQ (one included). Crust: hand tossed.
Toppings: bacon, black olives, banana peppers, sausage, green peppers, ham, jalapeños, mushrooms, pepperoni, red onions, chicken, tomatoes, pineapple (pineapple not on 6").
NOTE: description says "comes with Cheese and 1 Topping" but toppings are priced individually in the builder; site says "cheese pizza; add toppings" and quotes the description verbatim in fine print? → Site uses "Cheese pizza, then add toppings" + footnote.

Specialty pizzas = base + specialty charge (6"/10–14" via Specialty item/16" via XLG):
| Pizza | Toppings (from POS sub-items) | 6" | 10" | 12" | 14" | 16" |
|---|---|---|---|---|---|---|
| Supreme | sausage, pepperoni, green peppers, red onions, mushrooms, marinara | +5 | +5 | +5 | +5 | +5.50 |
| Meatzza | bacon, sausage, ham, pepperoni | same as Supreme |
| Vegetarian | black olives, green peppers, mushrooms, red onions, tomatoes | same |
| Chicken Club | (no description published) | same |
| Cheese Boss | Parm-Romano, mozzarella, cheddar | +3 | +3 | +3 | +3 | +3.50 |
| Pizza of the Month | changes monthly | +3 | +3 | +3 | +3 | +3.50 |
| Chicken Bacon Ranch | ranch base, bacon, roast chicken | +2 | +2 | +2 | +2 | +2.50 |
| BBQ Chicken | BBQ sauce, red onions, roast chicken | same |
| Hawaiian | ham, pineapple, marinara | same |
Computed totals: Supreme-tier 9.75 / 13.55 / 15.55 / 17.55 / 22.55; Cheese Boss & POTM 7.75 / 11.55 / 13.55 / 15.55 / 20.55; CBR-tier 6.75 / 10.55 / 12.55 / 14.55 / 19.55.

### Grinders (baked on Italian bread) — whole $7.99, half $4.75
Sausage Marinara (Italian sausage, marinara, mozzarella) · Ham & Cheese (ham, mozzarella) · Chicken Parmesan (chicken, marinara, mozzarella) · Chicken Bacon & Ranch (roast chicken, bacon, ranch, mozzarella) · Texas BBQ (sausage, onions, BBQ, mozzarella). Add meats/veggies/sauce $0.75.

### Calzone — $6.99 cheese, sauce on the side; toppings $0.85 each (item description says ".75"; builder charges .85)
Dipping sauce: marinara, ranch, BBQ, garlic, cheese sauce.

### Appetizers & salads
Breadsticks — full $6.19 / half $3.70 (marinara, cheese, ranch or garlic sauce) · Stuffed Breadsticks — full $7.19 / half $4.19 (cheese + pepperoni, bacon, sausage or cheese only; dipping sauce) · Garlic Cheese Bread $6.19 · Boss Bites $6.19 ("6 Cheeses covering our delicious Bread & cut into squares. Choice of Sauce") · Boneless Wings $9.19 (8 boneless; hot, BBQ or no sauce; dips $0.75) · Chef Salad $6.99 (green peppers, tomatoes, cheddar jack, croutons, choice of meat & dressing) · Tossed Salad $5.99 (tomatoes, cheese, croutons, dressing) · Extra sauce $1.00 (cheese sauce $1.25). Dressings: house ranch, Italian, French.

### Dessert — 8" Brownie Cookie $6.50 · 8" Chocolate Chip Cookie $6.50

### Drinks — Can $1.50 (Coke, Diet Coke, Sprite) · 20 oz bottle $2.75 · 2-liter $3.75 · Bottled water $1.50 · Triple XXX Root Beer $2.85

### Secondary menu source (not used for prices)
placejoys / bizmapdir listings ("Updated December 2025"): prices ~$0.50 lower (e.g. 14" cheese $12.05, 14" Supreme $17.05), plus descriptions: Cheese Boss = 5 cheeses (mozzarella, cheddar, Monterey Jack, Parmesan, Romano); breadsticks = 8 sticks basted with garlic oil and Parmesan; stuffed sticks = 4 jumbo; boneless wings 10 oz. These look older than the Sept 2026 POS data.

## Pizza of the Month (their Facebook posts, via findglocal mirror, 2026)
Jun Nacho (mozzarella, cheddar jack, taco meat, jalapeños, tortilla chips, sour cream packets) · Jul BBQ Bacon Cheeseburger · Aug Buffalo Chicken (ranch, hot sauce, blue cheese crumbles, chicken, mozzarella) · Sep Ultimate Sausage (classic, spicy Italian & sweet Italian sausage) · Oct Oktoberfest (sliced bratwurst, banana peppers, German mayo-mustard sauce). November 2026: not found → "call to hear this month's".
A Google reviewer mentions a past "chicken and waffles" pizza of the month.

## Branding
- Logos: hand-drawn caricature of the brothers in caps under split pizza with red brush "PIZZA Co." (Google Sites hero / Main Street) and a red circular stamp "BROTHERS PIZZA Co." (Google Sites header / Heartland).
- Colours: Google Sites theme deep red (~#B90E0E) on white, black header; fonts Playfair Display + Open Sans.

## Photos
Real (downloaded): Supreme pizza, calzone, stuffed sticks, cheese sauce (Heartland item photos, uploaded by the business 2020); sausage/pepperoni pizza close-up and Christmas on Green St sleigh photos (Main Street post); both logos.
Generated atmosphere: dough toss, sauce, family pizza night (listed in README).

## Not verified / gaps
Parking details, delivery fee/minimum, delivery cut-off by phone, payment methods, current Pizza of the Month, 2026 Christmas on Green St date, whether a pickup window/counter is used, owner approval of photos.
