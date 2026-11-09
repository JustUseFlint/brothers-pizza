import { createRequire } from 'node:module';
import { PHONE, TEL, ADDR1, ADDR2, FB, GIFT, JOBS, GMAPS } from './data.mjs';
const require = createRequire(import.meta.url);
export const BPie = require('../assets/js/pie.js');
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const money = n => '$' + n.toFixed(2);
const DIMS = { 'real-pizza-sausage': [960, 720], 'real-supreme': [620, 620], 'real-calzone': [620, 620], 'real-stuffed-sticks': [620, 620], 'real-cheese-sauce': [768, 768], 'real-christmas-sleigh': [960, 720], 'real-christmas-sleigh-2': [666, 720], 'real-christmas-flyer': [600, 503], 'gen-dough-toss': [864, 1152], 'gen-pizza-night': [1280, 720], 'gen-sauce': [1152, 864], 'logo-brothers': [700, 741], 'logo-stamp': [620, 571] };
export const img = (root, n, alt = '', cls = '', extra = '') => { const [w, h] = DIMS[n] || [800, 600]; return `<img src="${root}assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${cls ? ` class="${cls}"` : ''}${extra ? ' ' + extra : ''}>`; };
export const arrow = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
export const ext = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16L16 8M9 8h7v7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
export const phoneIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5l2.6.3 1.2 4-2 1.6a12 12 0 006.2 6.2l1.6-2 4 1.2.3 2.6c0 1-.9 2-2 2C10.8 19.4 4.6 13.2 4.6 5.5c0-1.1 1-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
export const pinIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0113 0c0 4.9-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
export const menuIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5zM8.5 8.5h7M8.5 12h7M8.5 15.5h4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
export const callBtn = (cls = '', label = `Call to order`) => `<a class="btn btn-red ${cls}" href="${TEL}" data-magnetic data-cursor="Call"><span>${phoneIco}${label}</span></a>`;
export const status = (cls = '') => `<span class="status ${cls}" data-status><i></i><span data-status-t>Mon–Sat 11–9 · Sun 4–9</span></span>`;
export { PHONE, TEL };

const NAV = [['Menu', 'menu/'], ['Our story', 'story/'], ['Visit & delivery', 'visit/']];
const FONTS = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..900,0..100,0..1;1,9..144,400..800,0..100,0..1&family=Instrument+Sans:wght@400..700&family=DM+Mono:wght@400;500&display=swap';

export function head({ root, title, desc, path = '', extraCss = '' }) {
  const url = 'https://justuseflint.github.io/brothers-pizza/' + path;
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#B5141C">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta property="og:url" content="${url}">
<meta property="og:image" content="https://justuseflint.github.io/brothers-pizza/assets/img/og.jpg">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="${url}">
<link rel="icon" href="${root}assets/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
${extraCss}<link rel="stylesheet" href="${root}assets/css/site.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Restaurant","name":"Brothers Pizza Company","servesCuisine":"Pizza","slogan":"Pizza for your family","telephone":"+1-765-361-1800","address":{"@type":"PostalAddress","streetAddress":"205 E Market St","addressLocality":"Crawfordsville","addressRegion":"IN","postalCode":"47933","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":40.042689,"longitude":-86.899537},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"11:00","closes":"21:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"16:00","closes":"21:00"}],"sameAs":["${FB}"],"foundingDate":"2013-09-04","hasMenu":"https://justuseflint.github.io/brothers-pizza/menu/"}</script>
<script>(function(d,w){var h=d.documentElement;h.className=h.className.replace('no-js','js');var rm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){h.classList.add('motion');try{if(sessionStorage.getItem('bp-pt')==='1')h.classList.add('pt-in')}catch(e){}}else{h.classList.add('no-motion')}setTimeout(function(){if(!w.__bpReady){h.classList.remove('motion','pt-in');h.classList.add('no-motion')}},4000)})(document,window)</script>
</head>`;
}

export function header(root, path) {
  const cur = p => path.startsWith(p) ? ' aria-current="page"' : '';
  return `<div class="pt" aria-hidden="true"><img src="${root}assets/img/logo-stamp-sm.png" alt="" width="360" height="331"></div>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="hdr-logo" href="${root}" aria-label="Brothers Pizza Company, home"><img src="${root}assets/img/logo-stamp-sm.png" alt="" width="360" height="331"><span class="hl-t"><b>Brothers</b><i>Pizza Co.</i></span></a>
    <nav class="hdr-nav" aria-label="Primary">${NAV.map(([t, h]) => `<a href="${root}${h}"${cur(h)} class="ul">${t}</a>`).join('')}</nav>
    <div class="hdr-r">
      ${status('hdr-status')}
      <a class="btn btn-red btn-sm hdr-cta" href="${TEL}" data-magnetic><span>${phoneIco}${PHONE}</span></a>
      <a class="hdr-callm" href="${TEL}" aria-label="Call ${PHONE}">${phoneIco}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn><span class="mb-t"><span>Menu</span><span>Close</span></span><span class="mb-i"><i></i><i></i></span></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" data-menu aria-hidden="true">
  <nav class="menu-nav" aria-label="Mobile">${[['Home', ''], ...NAV].map(([t, h], i) => `<a href="${root}${h}"><span class="mono">0${i + 1}</span><span class="mn-t">${t}</span></a>`).join('')}</nav>
  <div class="menu-foot">
    ${status()}
    <a class="menu-call" href="${TEL}">${phoneIco}<span><span class="eyebrow">Call to order</span>${PHONE}</span></a>
    <p class="mono menu-addr">${ADDR1}, Crawfordsville</p>
  </div>
</div>`;
}

export function footer(root, { cta = true } = {}) {
  return `${cta ? `<section class="cta-band" aria-labelledby="cta-h">
  <div class="wrap cta-in">
    <p class="eyebrow">Carryout &amp; delivery · Downtown Crawfordsville</p>
    <h2 id="cta-h" class="h-xl cta-h" data-split>Make it a pizza&nbsp;night.</h2>
    <div class="cta-row">
      <a class="cta-phone" href="${TEL}" data-cursor="Call"><span class="mono">Tap to call it in</span><span class="cta-num">(765) 361<i>-</i>1800</span></a>
      <div class="cta-side">
        ${status('status-inv')}
        <p>Mon–Sat 11 AM–9 PM · Sun 4–9 PM<br>${ADDR1}, at the corner of Market &amp; Green.</p>
        <div class="cta-btns"><a class="btn btn-ghost-inv" href="${root}menu/"><span>${menuIco}See the menu</span></a><a class="btn btn-ghost-inv" href="${root}visit/"><span>${pinIco}Directions</span></a></div>
      </div>
    </div>
  </div>
</section>` : ''}
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div class="ftr-col ftr-brand">
        <img src="${root}assets/img/logo-brothers-sm.png" alt="Brothers Pizza Co. logo: a drawing of the brothers in ball caps under a pizza" width="340" height="360" loading="lazy" class="ftr-logo">
        <p class="ftr-copy">Pizza for your family, from the Lowe brothers. Serving Crawfordsville since September 4, 2013.</p>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Eat</p>
        <ul class="ftr-links"><li><a class="ul" href="${root}menu/#pizzas">Pizzas</a></li><li><a class="ul" href="${root}menu/#build">Build your own</a></li><li><a class="ul" href="${root}menu/#grinders">Grinders</a></li><li><a class="ul" href="${root}menu/#apps">Breadsticks &amp; apps</a></li></ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Brothers</p>
        <ul class="ftr-links"><li><a class="ul" href="${root}story/">Our story</a></li><li><a class="ul" href="${root}story/#community">Christmas on Green St.</a></li><li><a class="ul" href="${JOBS}" target="_blank" rel="noopener">Job application ↗</a></li><li><a class="ul" href="${GIFT}" target="_blank" rel="noopener">Gift cards ↗</a></li></ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Find us</p>
        <ul class="ftr-links"><li><a class="ul" href="${TEL}">${PHONE}</a></li><li><a class="ul" href="${GMAPS}" target="_blank" rel="noopener">${ADDR1}<br>${ADDR2} ↗</a></li><li><a class="ul" href="${FB}" target="_blank" rel="noopener">Facebook ↗</a></li></ul>
      </div>
    </div>
  </div>
  <div class="ftr-wm" data-wm aria-hidden="true">${'Pizza for your family'.split('').map(c => c === ' ' ? '<span class="sp"> </span>' : `<span>${c}</span>`).join('')}</div>
  <div class="wrap ftr-base mono"><span>© 2026 Brothers Pizza Company</span><span>Concept site · prices checked Nov 9, 2026</span></div>
</footer>
<nav class="callbar" aria-label="Quick actions"><a href="${root}menu/" class="cb-menu">${menuIco}Menu</a><a href="${TEL}" class="cb-call">${phoneIco}Call to order</a></nav>
<div class="cursor" aria-hidden="true"><span class="cursor-t"></span></div>`;
}

export function scripts(root, extra = '') {
  return `<script src="${root}assets/vendor/gsap.min.js" defer></script>
<script src="${root}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${root}assets/vendor/lenis.min.js" defer></script>
<script src="${root}assets/js/pie.js" defer></script>
${extra}<script src="${root}assets/js/site.js" defer></script>`;
}

export function page({ root, path, title, desc, body, cls, extraCss, extraJs, cta = true }) {
  return `${head({ root, title, desc, path, extraCss })}
<body class="${cls}">
${header(root, path)}
<main id="main">
${body}
</main>
${footer(root, { cta })}
${scripts(root, extraJs)}
</body>
</html>
`;
}
