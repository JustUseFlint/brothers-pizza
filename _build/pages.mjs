import { page, img, esc, money, arrow, ext, phoneIco, pinIco, menuIco, callBtn, status, BPie, PHONE, TEL } from './shell.mjs';
import { SIZES, TOPPINGS, SPECIALTY, POTM, MENU, REVIEWS, MENU_SOURCE, ADDR1, ADDR2, GMAPS, GMAP_EMBED, GIFT, JOBS, FB } from './data.mjs';

const pieFor = (s, extra = {}) => BPie.pie({ toppings: s.tops, sauce: s.sauce, cheese: s.cheese, seed: s.id, label: s.name + ', illustrated', ...extra });
const mystery = `<span class="pie-q" aria-hidden="true">?</span>`;
const from = s => money(s.prices[1]);
const veg = t => (t || []).includes('veg') ? '<span class="tag tag-veg" title="Vegetarian">Veg</span>' : '';

/* ---------- shared: build-your-own pricer ---------- */
function builder(root, { compact = false } = {}) {
  return `<div class="byo${compact ? ' byo-compact' : ''}" data-byo>
  <div class="byo-stage">
    <div class="byo-pie" data-byo-pie aria-hidden="true">${BPie.pie({ toppings: ['pepperoni'], seed: 'byo' })}</div>
    <div class="byo-total" aria-live="polite"><span class="mono">Your pie</span><b data-byo-total>$10.10</b><span class="byo-sum" data-byo-sum>12″ · Pepperoni</span></div>
  </div>
  <div class="byo-ctrl">
    <fieldset class="byo-f"><legend class="eyebrow">1 · Size</legend>
      <div class="seg" role="radiogroup" aria-label="Size">${SIZES.map((s, i) => `<label class="seg-o"><input type="radio" name="byo-size" value="${s.id}"${i === 2 ? ' checked' : ''} data-base="${s.base}" data-top="${s.top}" data-cheese="${s.cheese ?? ''}" data-label="${s.label}"><span><b>${s.label}</b><i>${money(s.base)}</i></span></label>`).join('')}</div>
    </fieldset>
    <fieldset class="byo-f"><legend class="eyebrow">2 · Sauce <span class="byo-hint">one included</span></legend>
      <div class="chips">${[['marinara', 'Marinara'], ['ranch', 'Ranch'], ['bbq', 'BBQ']].map(([v, t], i) => `<label class="chip"><input type="radio" name="byo-sauce" value="${v}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div>
    </fieldset>
    <fieldset class="byo-f"><legend class="eyebrow">3 · Toppings <span class="byo-hint" data-byo-each>+$1.55 each</span></legend>
      <div class="chips">${TOPPINGS.map(([v, t]) => `<label class="chip"><input type="checkbox" name="byo-top" value="${v}"${v === 'pepperoni' ? ' checked' : ''}${v === 'pineapple' ? ' data-no6' : ''}><span>${t}</span></label>`).join('')}<label class="chip"><input type="checkbox" name="byo-cheese" value="extra-cheese"><span>Extra cheese</span></label></div>
    </fieldset>
    <div class="byo-act">
      <a class="btn btn-red" href="${TEL}" data-magnetic data-cursor="Call"><span>${phoneIco}Call with this order</span></a>
      <button class="btn btn-line" type="button" data-byo-copy><span>Copy order</span></button>
    </div>
    <p class="fine">Estimate before tax, from their published online-ordering prices. Hand-tossed crust. Confirm when you call.</p>
  </div>
</div>`;
}

const reviewBlock = () => `<div class="revs">
  <div class="rev-score" data-reveal><span class="rev-n"><span data-count="4.5" data-dec="1">4.5</span><i>/5</i></span><span class="rev-stars" aria-hidden="true"><span>★★★★★</span><span class="rs-on" style="width:90%">★★★★★</span></span><p>Google rating from about 400 reviews <span class="mono">(Nov 2026)</span></p></div>
  ${REVIEWS.map(r => `<figure class="rev" data-reveal><blockquote>“${esc(r.q)}”</blockquote><figcaption class="mono">${r.who} · ${r.when}</figcaption></figure>`).join('')}
</div>`;

/* ================= HOME ================= */
export function home() {
  const root = '';
  const sig = SPECIALTY.filter(s => !s.mystery).slice(0, 6);
  const body = `
<section class="hero" data-hero>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow hero-eb" data-fade>Downtown Crawfordsville · Since Sept. 4, 2013</p>
      <h1 class="hero-h" data-split="hero">Pizza for your <em>family.</em></h1>
      <p class="hero-p" data-fade>Hand-tossed pizza, grinders and stuffed breadsticks from six brothers at the corner of Market&nbsp;&amp;&nbsp;Green. Carryout and delivery.</p>
      <div class="hero-cta" data-fade>${callBtn('', `Call to order`)}<a class="btn btn-line" href="menu/" data-magnetic><span>${menuIco}See the menu</span></a></div>
      <div class="hero-meta" data-fade>${status('status-lg')}<a class="hm-addr ul" href="${GMAPS}" target="_blank" rel="noopener">${pinIco}${ADDR1}</a></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="ha-photo" data-hero-photo>${img(root, 'real-pizza-sausage', '', '', 'fetchpriority="high" loading="eager"')}</div>
      <div class="ha-logo" data-hero-logo><img src="assets/img/logo-brothers.webp" alt="" width="700" height="741"></div>
      <svg class="ha-ring" viewBox="0 0 200 200" data-spin><defs><path id="ring" d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1 -164 0"/></defs><text><textPath href="#ring">PIZZA FOR YOUR FAMILY · 205 E MARKET ST · CRAWFORDSVILLE · </textPath></text></svg>
    </div>
  </div>
  <p class="hero-note mono wrap">Photo: a Brothers pie, via Crawfordsville Main Street</p>
</section>

<div class="mq" data-marquee aria-hidden="true"><div class="mq-track">${['Hand tossed', 'Stanislaus tomatoes', 'Delco cheeses', 'Pizza of the Month', 'Grinders', 'Stuffed breadsticks', 'Boss Bites', 'Since 2013'].map(t => `<span>${t}</span><i>✺</i>`).join('')}</div></div>

<section class="sec sig" aria-labelledby="sig-h">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">The house pies</p>
      <h2 id="sig-h" class="h-lg" data-split>Nine specialty pies, one of them a monthly&nbsp;surprise.</h2>
      <a class="ul sec-link" href="menu/#pizzas">Full pizza menu ${arrow}</a>
    </div>
    <div class="sig-grid">
      ${sig.map((s, i) => `<a class="sig-card" href="menu/#${s.id}" data-reveal data-cursor="View">
        <div class="sc-art">${s.photo ? `<div class="sc-photo">${img(root, s.photo, s.name + ' pizza from Brothers')}</div>` : ''}<div class="sc-pie${s.photo ? ' sc-pie-sm' : ''}">${pieFor(s)}</div></div>
        <div class="sc-t"><span class="mono">0${i + 1}</span><h3>${s.name}</h3><p>${s.desc}</p><span class="sc-p">10″ from <b>${from(s)}</b></span></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="potm" aria-labelledby="potm-h">
  <div class="wrap potm-in">
    <div class="potm-l">
      <p class="eyebrow">Pizza of the Month</p>
      <h2 id="potm-h" class="h-xl" data-split>A new pie every&nbsp;month.</h2>
      <p class="potm-p" data-fade>Each month the brothers announce a one-off pizza on Facebook. November’s hasn’t been posted online yet, so call and ask what’s in the oven.</p>
      <div class="potm-cta" data-fade><a class="btn btn-cream" href="${TEL}" data-magnetic><span>${phoneIco}Ask about November’s</span></a><a class="ul" href="${FB}" target="_blank" rel="noopener">Announcements on Facebook ${ext}</a></div>
    </div>
    <ol class="potm-list" data-potm>
      ${POTM.slice().reverse().map(([m, n, d]) => `<li data-reveal><span class="mono">${m}</span><div><b>${n}</b><p>${d}</p></div></li>`).join('')}
    </ol>
  </div>
</section>

<section class="sec build" id="build" aria-labelledby="byo-h">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Build &amp; price your own</p>
      <h2 id="byo-h" class="h-lg" data-split>Know the total before you&nbsp;call.</h2>
    </div>
    ${builder(root)}
  </div>
</section>

<section class="sec story-t" aria-labelledby="st-h">
  <div class="wrap st-grid">
    <div class="st-media" data-img-reveal>${img(root, 'gen-dough-toss', 'Pizza dough being stretched overhead in a pizzeria kitchen')}</div>
    <div class="st-copy">
      <p class="eyebrow">Six brothers, one kitchen</p>
      <h2 id="st-h" class="h-lg" data-split>Luke, Jack, John, Michael, Mark and&nbsp;Brandon.</h2>
      <p class="lead" data-focus>The Lowe brothers grew up on “pizza and a movie” nights. In 2013 they opened at the corner of Market and Green to give other families the same thing. They learned the craft from a master baker from Godfather’s Pizza, make their sauce from Stanislaus tomatoes and buy their cheeses through Delco.</p>
      <a class="btn btn-line" href="story/" data-magnetic><span>Read our story ${arrow}</span></a>
    </div>
  </div>
</section>

<section class="sec trio" aria-label="What goes into it">
  <div class="wrap trio-grid">
    <article class="trio-c" data-reveal><div class="trio-m">${img(root, 'gen-sauce', 'Pizza sauce being spread over hand-stretched dough')}</div><span class="mono">01</span><h3>The sauce</h3><p>Fresh-packed tomatoes from Stanislaus, a family business for 80 years. Stanislaus also trained the brothers on the recipe.</p></article>
    <article class="trio-c" data-reveal><div class="trio-m trio-pie">${BPie.pie({ toppings: [], cheese: 'boss', seed: 'trio-cheese', label: 'Cheese Boss pizza, illustrated' })}</div><span class="mono">02</span><h3>The cheese</h3><p>Sourced through Delco, an Italian specialty food supplier. The Cheese Boss and Boss Bites put it front and centre.</p></article>
    <article class="trio-c" data-reveal><div class="trio-m">${img(root, 'real-stuffed-sticks', 'Brothers stuffed breadsticks, golden and brushed with butter')}</div><span class="mono">03</span><h3>The dough</h3><p>Hand tossed every time, and the same dough makes the breadsticks. If you visit, you might catch Jack spinning dough overhead.</p></article>
  </div>
</section>

<section class="sec rev-sec" aria-labelledby="rev-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">What Crawfordsville says</p><h2 id="rev-h" class="h-lg" data-split>The breadsticks get a mention&nbsp;too.</h2></div>
    ${reviewBlock()}
  </div>
</section>

<section class="sec comm" aria-labelledby="comm-h">
  <div class="wrap comm-grid">
    <div class="comm-media" data-img-reveal>${img(root, 'real-christmas-sleigh', 'Santa and Mrs. Claus in a red sleigh on Green Street with a snow-monster mascot and balloon arches')}</div>
    <div class="comm-copy">
      <p class="eyebrow">Christmas on Green St.</p>
      <h2 id="comm-h" class="h-lg" data-split>Five people came the first year. Now the line wraps the building.</h2>
      <p data-fade>Every December since 2013 the brothers host Santa on Green Street, and every child picks out a toy. They also give away turkeys at Thanksgiving and host fundraisers for schools, teams and families who need a hand.</p>
      <a class="ul" href="story/#community">How it started ${arrow}</a>
    </div>
  </div>
</section>

<section class="sec visit-t" aria-labelledby="vt-h">
  <div class="wrap vt-grid">
    <div>
      <p class="eyebrow">Hours</p>
      <h2 id="vt-h" class="h-lg" data-split>Open seven days.</h2>
      ${hoursTable()}
    </div>
    <div class="vt-card" data-reveal>
      <p class="eyebrow">Pick up or get it delivered</p>
      <p class="vt-addr">${ADDR1}<br>${ADDR2}</p>
      <p>Corner of Market &amp; Green, downtown. Delivery covers roughly the city of Crawfordsville. <a class="ul" href="visit/#delivery">Check your address</a>.</p>
      <div class="vt-btns"><a class="btn btn-line" href="${GMAPS}" target="_blank" rel="noopener"><span>${pinIco}Directions</span></a><a class="btn btn-line" href="visit/"><span>Visit &amp; delivery ${arrow}</span></a></div>
    </div>
  </div>
</section>`;
  return page({ root, path: '', cls: 'p-home', title: 'Brothers Pizza Company · Pizza for your family · Crawfordsville, IN', desc: 'Hand-tossed pizza, grinders, calzones and stuffed breadsticks from the Lowe brothers in downtown Crawfordsville since 2013. Carryout and delivery. Call (765) 361-1800.', body });
}

export function hoursTable() {
  const rows = [['Monday', '11 AM – 9 PM', 1], ['Tuesday', '11 AM – 9 PM', 2], ['Wednesday', '11 AM – 9 PM', 3], ['Thursday', '11 AM – 9 PM', 4], ['Friday', '11 AM – 9 PM', 5], ['Saturday', '11 AM – 9 PM', 6], ['Sunday', '4 PM – 9 PM', 0]];
  return `<table class="hours" data-hours><caption class="sr">Opening hours</caption><tbody>${rows.map(([d, h, n]) => `<tr data-day="${n}"><th scope="row">${d}</th><td>${h}</td></tr>`).join('')}</tbody></table>`;
}

/* ================= MENU ================= */
export function menu() {
  const root = '../';
  const cats = [['pizzas', 'Pizzas'], ['build', 'Build your own'], ...MENU.map(c => [c.id, c.name])];
  const priceRow = (p) => p.map(([l, v]) => `<span class="pr">${l ? `<i>${l}</i>` : ''}<b>${money(v)}</b></span>`).join('');
  const body = `
<section class="phero mhero">
  <div class="wrap">
    <p class="eyebrow" data-fade>Brothers Pizza Co. · Menu</p>
    <h1 class="h-xxl" data-split="hero">The menu.</h1>
    <div class="mhero-row" data-fade><p class="mhero-p">Pizzas in five sizes, grinders, calzones, breadsticks and 8″ cookies. Call ${PHONE} to order for carryout or delivery.</p>${callBtn()}</div>
  </div>
</section>

<div class="mnav" data-mnav>
  <div class="wrap mnav-in">
    <label class="msearch"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16 16l4.5 4.5" stroke="currentColor" stroke-width="1.8"/></svg><span class="sr">Search the menu</span><input type="search" placeholder="Search: bacon, ranch, cookie…" data-msearch autocomplete="off"></label>
    <nav class="mcats" aria-label="Menu categories" data-mcats>${cats.map(([id, n]) => `<a href="#${id}" data-cat="${id}">${n}</a>`).join('')}<button type="button" class="mveg" aria-pressed="false" data-mveg>Vegetarian</button></nav>
  </div>
</div>

<div class="wrap mbody">
  <p class="mempty" data-mempty hidden>Nothing matches that. Try “sausage” or “ranch”, or call ${PHONE} and ask.</p>

  <section class="mcat" id="pizzas" data-mcat aria-labelledby="pz-h">
    <div class="mcat-head">
      <h2 id="pz-h" class="h-md">Specialty pizzas</h2>
      <p>Hand tossed. Pick a size to see every price.</p>
      <div class="seg seg-sm" role="radiogroup" aria-label="Show prices for size" data-psize>${SIZES.map((s, i) => `<label class="seg-o"><input type="radio" name="psize" value="${i}"${i === 1 ? ' checked' : ''}><span><b>${s.label}</b></span></label>`).join('')}</div>
    </div>
    <ul class="pz-list">
      ${SPECIALTY.map(s => `<li class="pz" id="${s.id}" data-item data-tags="${(s.tags || []).join(' ')}" data-q="${esc((s.name + ' ' + s.desc + ' ' + s.tops.join(' ')).toLowerCase())}">
        <div class="pz-art">${pieFor(s, { big: 1.25 })}${s.mystery ? mystery : ''}</div>
        <div class="pz-t"><h3>${s.name} ${veg(s.tags)}</h3><p>${s.desc}</p>
          <div class="pz-all mono">${s.prices.map((p, i) => `<span>${SIZES[i].label} ${money(p)}</span>`).join('')}</div></div>
        <div class="pz-p" data-prices="${s.prices.join(',')}"><b>${money(s.prices[1])}</b><i class="mono">10″</i></div>
      </li>`).join('')}
    </ul>
    <p class="fine">Specialty prices are the cheese pizza price plus the specialty charge listed in their ordering system. The 6″ personal pizza is available with any specialty.</p>
  </section>

  <section class="mcat" id="build" data-mcat aria-labelledby="by-h">
    <div class="mcat-head"><h2 id="by-h" class="h-md">Build your own</h2><p>Cheese pizza, then add what you like. Each topping is priced by size.</p></div>
    <div class="size-table" data-item data-q="build your own cheese pizza toppings size personal small medium large extra large">
      <table><thead><tr><th scope="col">Size</th><th scope="col">Cheese</th><th scope="col">Each topping</th><th scope="col">Extra cheese</th></tr></thead>
      <tbody>${SIZES.map(s => `<tr><th scope="row">${s.label} <span>${s.name}</span></th><td>${money(s.base)}</td><td>+${money(s.top)}</td><td>${s.cheese ? '+' + money(s.cheese) : '—'}</td></tr>`).join('')}</tbody></table>
      <p class="fine">Sauce: marinara, ranch or BBQ, one included. Toppings: ${TOPPINGS.map(t => t[1].toLowerCase()).join(', ')}. Pineapple isn’t offered on the 6″.</p>
    </div>
    ${builder(root, { compact: true })}
  </section>

  ${MENU.map(c => `<section class="mcat" id="${c.id}" data-mcat aria-labelledby="${c.id}-h">
    <div class="mcat-head"><h2 id="${c.id}-h" class="h-md">${c.name}</h2><p>${c.blurb}</p></div>
    <ul class="mi-list">${c.items.map(it => `<li class="mi${it.photo ? ' mi-ph' : ''}" data-item data-tags="${(it.tags || []).join(' ')}" data-q="${esc((it.name + ' ' + it.desc + ' ' + c.name).toLowerCase())}">
      ${it.photo ? `<div class="mi-img">${img(root, it.photo, it.name + ' from Brothers')}</div>` : ''}
      <div class="mi-t"><h3>${it.name} ${veg(it.tags)}</h3>${it.desc ? `<p>${it.desc}</p>` : ''}</div>
      <div class="mi-p">${priceRow(it.prices)}</div>
    </li>`).join('')}</ul>
  </section>`).join('')}

  <aside class="msrc">
    <p class="eyebrow">About these prices</p>
    <p>${MENU_SOURCE}</p>
    <p>Gift cards are sold online: <a class="ul" href="${GIFT}" target="_blank" rel="noopener">buy a gift card ${ext}</a></p>
  </aside>
</div>`;
  return page({ root, path: 'menu/', cls: 'p-menu', title: 'Menu · Brothers Pizza Company, Crawfordsville', desc: 'Brothers Pizza menu with prices: specialty pizzas, build your own, grinders, calzones, breadsticks, salads, dessert and drinks. Call (765) 361-1800.', body, extraJs: `<script src="${root}assets/js/menu.js" defer></script>\n` });
}

/* ================= STORY ================= */
export function story() {
  const root = '../';
  const bros = ['Luke', 'Jack', 'John', 'Michael', 'Mark', 'Brandon'];
  const body = `
<section class="phero shero">
  <div class="wrap shero-in">
    <div>
      <p class="eyebrow" data-fade>Our story</p>
      <h1 class="h-xxl" data-split="hero">Six brothers. One&nbsp;kitchen.</h1>
      <p class="lead" data-fade>Brothers Pizza Company has served Crawfordsville since September 4, 2013, from the corner of Market Street and Green Street.</p>
    </div>
    <div class="shero-logo" data-hero-logo><img src="../assets/img/logo-brothers.webp" alt="The Brothers Pizza Co. logo: a hand-drawn caricature of the brothers in ball caps under a split pizza" width="700" height="741"></div>
  </div>
</section>

<section class="sec bros" aria-labelledby="bros-h">
  <div class="wrap">
    <h2 id="bros-h" class="sr">The brothers</h2>
    <ul class="bros-list" data-bros>${bros.map((b, i) => `<li><span class="mono">0${i + 1}</span><b>${b}</b></li>`).join('')}</ul>
    <p class="bros-sur" data-fade>The Lowe brothers</p>
  </div>
</section>

<section class="sec chap" data-chapters aria-label="How Brothers came together">
  <div class="wrap chap-grid">
    <div class="chap-media" aria-hidden="true">
      <div class="cc-plate on">${img(root, 'gen-pizza-night', '')}</div>
      <div class="cc-plate">${img(root, 'gen-dough-toss', '')}</div>
      <div class="cc-plate">${img(root, 'gen-sauce', '')}</div>
      <div class="cc-plate">${img(root, 'real-supreme', '')}</div>
      <span class="cc-n mono" data-cc-i>01</span>
    </div>
    <div class="chap-list">
      ${[
        ['Pizza and a movie', 'The brothers grew up on family “pizza and a movie” nights at home. That became the mission and the motto: Pizza for your family. They want other Crawfordsville families to have their own pizza nights.', 'gen-pizza-night'],
        ['A second run at it', 'They had been in the pizza business before. They stepped back to rework their plan and their recipes, then learned pizza-making in a professional kitchen alongside a master baker from Godfather’s Pizza.', 'gen-dough-toss'],
        ['Serious about ingredients', 'Their tomatoes come from Stanislaus, a family-run company for 80 years that also trained them on the sauce. Their cheeses come through Delco, an Italian specialty food supplier.', 'gen-sauce'],
        ['Someone has to break the tie', 'Six brothers means six opinions. Mark’s advice to other family businesses is to set boundaries early and put one person in charge. Every Saturday after close, the whole family gets together for game night with pizza and dessert. The brothers have even been writing their own tabletop game, <i>Garden Fall</i>.', 'real-supreme'],
      ].map(([h, p, im], i) => `<article class="cc-ch${i === 0 ? ' on' : ''}"><div class="cc-mob">${img(root, im, '')}</div><span class="mono">0${i + 1}</span><h3 class="h-md">${h}</h3><p>${p}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="sec tl-sec" aria-labelledby="tl-h">
  <div class="wrap"><p class="eyebrow">Along the way</p><h2 id="tl-h" class="h-lg" data-split>A short timeline.</h2></div>
  <div class="wrap"><ol class="tl" data-tl>
    ${[
      ['Sept 4, 2013', 'Doors open', 'Brothers Pizza Company opens at 205 E Market St.'],
      ['Dec 2013', 'The first Christmas on Green St.', 'Five people come out to meet Santa.'],
      ['Nov 2024', '20 turkeys', 'Donations let the brothers give away 20 turkeys for Thanksgiving.'],
      ['Dec 2024', 'Hundreds of toys', 'Christmas on Green St. fills a whole room with toys, and the brothers start working toward non-profit status.'],
      ['2026', 'A pie a month', 'Nacho, BBQ Bacon Cheeseburger, Buffalo Chicken, Ultimate Sausage, Oktoberfest…'],
    ].map(([y, h, p]) => `<li data-reveal><span class="mono tl-y">${y}</span><b>${h}</b><p>${p}</p></li>`).join('')}
  </ol></div>
</section>

<section class="sec comm comm-full" id="community" aria-labelledby="cm-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">Giving back</p><h2 id="cm-h" class="h-xl" data-split>Christmas on Green&nbsp;St.</h2></div>
    <div class="cm-grid">
      <div class="cm-a" data-img-reveal>${img(root, 'real-christmas-sleigh', 'Santa and Mrs. Claus waving from a red sleigh on Green Street, with balloon arches and a snow-monster mascot')}</div>
      <div class="cm-b">
        <p class="lead" data-focus>Since 2013 the brothers have hosted Santa on Green Street every December. Kids meet him, get a photo and pick out a toy of their own. Some years there’s been a sleigh and a reindeer to feed. It started with five people. Now the line goes around the building.</p>
        <p data-fade>Each year Santa also hands out two golden jingle bells, like the one in <i>The Polar Express</i>, to two children he thinks need it most. Some parents have said the toy their child chose would be their only gift that Christmas.</p>
        <div class="cm-small" data-img-reveal>${img(root, 'real-christmas-flyer', 'Brothers Pizza’s Christmas on Green Street flyer: see Santa at Brothers Pizza Co')}</div>
      </div>
    </div>
    <div class="cm-cards">
      <article data-reveal><span class="mono">Thanksgiving</span><h3>Turkey giveaway</h3><p>Every year. In 2024, donations covered 20 turkeys.</p></article>
      <article data-reveal><span class="mono">All year</span><h3>Fundraisers</h3><p>Brothers has hosted fundraisers for schools, sports teams, local groups and families dealing with illness or loss. Call to ask about hosting one.</p></article>
      <article data-reveal><span class="mono">This December</span><h3>Christmas on Green St.</h3><p>This year’s date hasn’t been posted yet. Watch <a class="ul" href="${FB}" target="_blank" rel="noopener">Facebook</a> for the announcement.</p></article>
    </div>
    <p class="fine cm-src">Story drawn from Crawfordsville Main Street’s “Brick &amp; Mortar Backstory” feature (Dec 17, 2024). Photos: Crawfordsville Main Street.</p>
  </div>
</section>

<section class="sec jobs" aria-labelledby="jobs-h">
  <div class="wrap jobs-in">
    <div><p class="eyebrow">Work with us</p><h2 id="jobs-h" class="h-lg" data-split>Join the family kitchen.</h2></div>
    <div><p>Brothers takes job applications online.</p><a class="btn btn-red" href="${JOBS}" target="_blank" rel="noopener" data-magnetic><span>Fill out the application ${ext}</span></a></div>
  </div>
</section>`;
  return page({ root, path: 'story/', cls: 'p-story', title: 'Our story · Brothers Pizza Company, Crawfordsville', desc: 'The Lowe brothers, Luke, Jack, John, Michael, Mark and Brandon, have made pizza for Crawfordsville families since 2013. Plus Christmas on Green St.', body });
}

/* ================= VISIT ================= */
export function visit() {
  const root = '../';
  const body = `
<section class="phero vhero">
  <div class="wrap">
    <p class="eyebrow" data-fade>Visit &amp; delivery</p>
    <h1 class="h-xxl" data-split="hero">Market &amp; Green.</h1>
    <div class="vhero-row" data-fade>${status('status-lg')}<p>${ADDR1}, ${ADDR2}</p></div>
  </div>
</section>

<section class="sec vgrid-sec">
  <div class="wrap vgrid">
    <div class="vcol">
      <div class="vblock" data-reveal>
        <p class="eyebrow">Hours</p>
        ${hoursTable()}
        <p class="fine">Holiday closures are posted on <a class="ul" href="${FB}" target="_blank" rel="noopener">Facebook</a>.</p>
      </div>
      <div class="vblock" data-reveal>
        <p class="eyebrow">How to order</p>
        <ol class="vsteps">
          <li><b>Call ${PHONE}.</b> Order for carryout or delivery.</li>
          <li><b>Pick up</b> at ${ADDR1}, on the corner of Market and Green, or have it delivered.</li>
          <li><b>Hungry later?</b> Kitchen hours are Mon–Sat 11–9 and Sun 4–9. Ask about the delivery cut-off when you call.</li>
        </ol>
        <div class="vbtns">${callBtn()}<a class="btn btn-line" href="${GMAPS}" target="_blank" rel="noopener"><span>${pinIco}Open in Google Maps</span></a></div>
      </div>
      <div class="vblock" data-reveal>
        <p class="eyebrow">Gift cards</p>
        <p>$10, $25 or any amount, sold through their online store.</p>
        <a class="ul" href="${GIFT}" target="_blank" rel="noopener">Buy a gift card ${ext}</a>
      </div>
    </div>
    <div class="vmap" data-reveal>
      <iframe title="Map: Brothers Pizza Company, 205 E Market St, Crawfordsville" src="${GMAP_EMBED}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>

<section class="sec deliv" id="delivery" aria-labelledby="dz-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">Delivery</p><h2 id="dz-h" class="h-lg" data-split>Do they deliver to&nbsp;you?</h2><p class="sec-sub">The shaded area is the delivery zone set up in Brothers’ ordering system. It covers roughly the city of Crawfordsville. Type your address to check, then call to confirm.</p></div>
    <div class="dz">
      <form class="dz-form" data-dz-form>
        <label for="dz-q" class="eyebrow">Your address</label>
        <div class="dz-row"><input id="dz-q" name="q" type="text" placeholder="e.g. 500 W Wabash Ave" autocomplete="street-address" required><button class="btn btn-red" type="submit"><span>Check</span></button></div>
        <p class="dz-out" data-dz-out aria-live="polite">Crawfordsville, IN is added for you.</p>
      </form>
      <div class="dz-map" data-dz-map role="img" aria-label="Map of the approximate Brothers Pizza delivery zone around Crawfordsville"></div>
    </div>
    <p class="fine">The address lookup uses OpenStreetMap. The zone is approximate and doesn’t guarantee delivery, so call ${PHONE} to confirm.</p>
  </div>
</section>`;
  return page({ root, path: 'visit/', cls: 'p-visit', title: 'Visit & delivery · Brothers Pizza Company, Crawfordsville', desc: 'Brothers Pizza hours, location at 205 E Market St in downtown Crawfordsville, delivery zone and how to order. Call (765) 361-1800.', body, extraCss: `<link rel="stylesheet" href="${root}assets/vendor/leaflet.css">\n`, extraJs: `<script src="${root}assets/vendor/leaflet.js" defer></script>\n<script src="${root}assets/js/visit.js" defer></script>\n` });
}

export function notFound() {
  const root = '/brothers-pizza/';
  const body = `<section class="phero nf"><div class="wrap"><p class="eyebrow">404</p><h1 class="h-xxl" data-split="hero">That slice is gone.</h1><p class="lead" data-fade>The page you wanted isn’t here. The pizza still is.</p><div class="hero-cta" data-fade><a class="btn btn-red" href="${root}"><span>Back home</span></a><a class="btn btn-line" href="${root}menu/"><span>See the menu</span></a></div></div></section>`;
  return page({ root, path: '404.html', cls: 'p-404', title: 'Not found · Brothers Pizza Company', desc: 'Page not found.', body, cta: false });
}
