/* Brothers Pizza Company — interaction + motion (GSAP + ScrollTrigger + Lenis) */
(function () {
  'use strict';
  var d = document, H = d.documentElement, W = window;
  var RM = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasG = !!(W.gsap && W.ScrollTrigger);
  var motion = !RM && hasG;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var lenis = null;
  W.__bpReady = true;
  H.classList.toggle('motion', motion);
  H.classList.toggle('no-motion', !motion);
  if (hasG) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Hours / open status (America/Indianapolis) ---------- */
  var HOURS = [[960, 1260], [660, 1260], [660, 1260], [660, 1260], [660, 1260], [660, 1260], [660, 1260]];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function nowLocal() {
    try {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Indianapolis', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), min: (+o.hour % 24) * 60 + +o.minute };
    } catch (e) { var n = new Date(); return { day: n.getDay(), min: n.getHours() * 60 + n.getMinutes() }; }
  }
  function fmt(m) { var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '') + ' ' + ap; }
  function statusText() {
    var n = nowLocal(), h = HOURS[n.day];
    if (n.min >= h[0] && n.min < h[1]) {
      var left = h[1] - n.min;
      return { cls: left <= 45 ? 'is-soon' : 'is-open', t: left <= 45 ? 'Open · closes ' + fmt(h[1]) + ' (' + left + ' min)' : 'Open now · until ' + fmt(h[1]) };
    }
    if (n.min < h[0]) return { cls: 'is-closed', t: 'Closed · opens ' + fmt(h[0]) + ' today' };
    var nd = (n.day + 1) % 7; return { cls: 'is-closed', t: 'Closed · opens ' + (nd === 0 ? 'Sunday ' : 'tomorrow ') + fmt(HOURS[nd][0]) };
  }
  function paintStatus() {
    var s = statusText();
    $$('[data-status]').forEach(function (el) { el.classList.remove('is-open', 'is-closed', 'is-soon'); el.classList.add(s.cls); var t = $('[data-status-t]', el); if (t) t.textContent = s.t; });
    var day = nowLocal().day;
    $$('[data-hours] tr').forEach(function (tr) { tr.classList.toggle('is-today', +tr.dataset.day === day); });
  }
  paintStatus(); setInterval(paintStatus, 30000);

  /* ---------- Smooth scroll ---------- */
  if (motion && W.Lenis) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  W.bpLenis = lenis;

  /* ---------- Page transitions ---------- */
  var pt = $('.pt');
  var entering = H.classList.contains('pt-in');
  if (motion && pt) {
    if (entering) { gsap.set(pt, { yPercent: 0, visibility: 'visible' }); H.classList.remove('pt-in'); gsap.to(pt, { yPercent: -100, duration: 0.85, ease: 'expo.inOut', delay: 0.12, onComplete: function () { gsap.set(pt, { yPercent: 100, visibility: 'hidden' }); } }); gsap.fromTo($('img', pt), { rotate: 0 }, { rotate: -20, duration: 0.9, ease: 'expo.inOut' }); }
    else gsap.set(pt, { yPercent: 100, visibility: 'hidden' });
  }
  H.classList.remove('pt-in'); try { sessionStorage.removeItem('bp-pt'); } catch (e) {}
  function leave(href) {
    try { sessionStorage.setItem('bp-pt', '1'); } catch (e) {}
    if (!motion || !pt) { location.href = href; return; }
    closeMenu();
    gsap.fromTo(pt, { yPercent: 100, visibility: 'visible' }, { yPercent: 0, duration: 0.6, ease: 'expo.inOut', onComplete: function () { location.href = href; } });
    gsap.fromTo($('img', pt), { rotate: 20 }, { rotate: 0, duration: 0.6, ease: 'expo.inOut' });
  }
  W.bpScrollTo = function (t, off) {
    if (lenis) {
      var y0 = t === 0 ? 0 : t.getBoundingClientRect().top + scrollY + (off || 0);
      lenis.scrollTo(y0, { duration: 1.1, onComplete: function () { if (t !== 0) { var dy = t.getBoundingClientRect().top + (off || 0); if (Math.abs(dy) > 4) lenis.scrollTo(scrollY + dy, { duration: 0.5 }); } } });
    }
    else { var y = t === 0 ? 0 : t.getBoundingClientRect().top + scrollY + (off || 0); W.scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' }); }
  };
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (/^(tel|sms|mailto):/.test(href)) return;
    var url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) {
      if (url.hash) {
        var t = url.hash === '#top' ? 0 : d.getElementById(url.hash.slice(1));
        if (t !== null) { e.preventDefault(); closeMenu(); W.bpScrollTo(t, -140); history.replaceState(null, '', url.hash); }
        return;
      }
      e.preventDefault(); closeMenu(); return;
    }
    e.preventDefault(); leave(url.href);
  });
  W.addEventListener('pageshow', function (e) { if (e.persisted && hasG && pt) gsap.set(pt, { yPercent: 100, visibility: 'hidden' }); H.classList.remove('pt-in'); });

  /* ---------- Header + call bar ---------- */
  var hdr = $('[data-hdr]'), cb = $('.callbar'), lastY = scrollY, isMenu = d.body.classList.contains('p-menu');
  function onScroll() {
    var y = scrollY;
    if (hdr) {
      hdr.classList.toggle('is-scrolled', y > 30);
      if (!H.classList.contains('menu-open')) {
        if (y > lastY + 6 && y > 320) hdr.classList.add('is-hidden');
        else if (y < lastY - 6 || y < 200) hdr.classList.remove('is-hidden');
      }
    }
    if (cb) cb.classList.toggle('on', isMenu ? y > 200 : y > innerHeight * 0.6);
    lastY = y;
  }
  W.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Mobile menu ---------- */
  var mb = $('[data-menu-btn]'), menu = $('[data-menu]');
  function closeMenu() { if (!H.classList.contains('menu-open')) return; H.classList.remove('menu-open'); mb && mb.setAttribute('aria-expanded', 'false'); menu && menu.setAttribute('aria-hidden', 'true'); if (lenis) lenis.start(); d.body.style.overflow = ''; }
  if (mb) mb.addEventListener('click', function () {
    if (H.classList.contains('menu-open')) return closeMenu();
    H.classList.add('menu-open'); mb.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop(); d.body.style.overflow = 'hidden';
    if (motion) gsap.fromTo($$('.menu-nav a', menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.2 });
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Build-your-own pricer ---------- */
  $$('[data-byo]').forEach(function (b) {
    var pieBox = $('[data-byo-pie]', b), tot = $('[data-byo-total]', b), sum = $('[data-byo-sum]', b), each = $('[data-byo-each]', b), copyBtn = $('[data-byo-copy]', b), lastKey = '';
    var orderText = '';
    function upd() {
      var sz = $('input[name="byo-size"]:checked', b), sauce = $('input[name="byo-sauce"]:checked', b);
      var base = +sz.dataset.base, top = +sz.dataset.top, ch = sz.dataset.cheese, is6 = sz.value === 's6';
      $$('input[data-no6]', b).forEach(function (i) { i.disabled = is6; if (is6) i.checked = false; });
      var xc = $('input[name="byo-cheese"]', b); xc.disabled = !ch; if (!ch) xc.checked = false;
      var tops = $$('input[name="byo-top"]:checked', b);
      var total = base + tops.length * top + (xc.checked ? +ch : 0);
      tot.textContent = '$' + total.toFixed(2);
      each.textContent = '+$' + top.toFixed(2) + ' each';
      var names = tops.map(function (i) { return i.nextElementSibling.textContent; });
      if (xc.checked) names.push('Extra cheese');
      var sauceName = sauce.nextElementSibling.textContent;
      sum.textContent = sz.dataset.label + ' · ' + sauceName + ' · ' + (names.length ? names.join(', ') : 'Cheese only');
      orderText = 'Brothers Pizza order: ' + sz.dataset.label + ' hand-tossed pizza, ' + sauceName.toLowerCase() + ' sauce, ' + (names.length ? names.join(', ').toLowerCase() : 'cheese only') + '. Estimate $' + total.toFixed(2) + ' before tax.';
      var key = tops.map(function (i) { return i.value; }).concat(xc.checked ? ['extra-cheese'] : []).join('|') + '#' + sauce.value;
      if (key !== lastKey && W.BPie) {
        lastKey = key;
        pieBox.innerHTML = BPie.pie({ toppings: key.split('#')[0] ? key.split('#')[0].split('|') : [], sauce: sauce.value, seed: 'byo' });
        if (motion) {
          gsap.fromTo(pieBox, { rotate: -25 }, { rotate: 0, duration: 1, ease: 'expo.out' });
          gsap.fromTo($$('.pie-tops > g > g', pieBox), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)', stagger: { each: 0.008, from: 'random' }, transformOrigin: '50% 50%' });
        }
      }
      var s6 = sz.value; if (motion) gsap.fromTo(pieBox, { scale: s6 === 's6' ? .7 : s6 === 's10' ? .8 : s6 === 's12' ? .88 : s6 === 's14' ? .95 : 1 }, { scale: s6 === 's6' ? .72 : s6 === 's10' ? .82 : s6 === 's12' ? .9 : s6 === 's14' ? .96 : 1, duration: .6, ease: 'expo.out' });
      else pieBox.style.transform = 'scale(' + (s6 === 's6' ? .72 : s6 === 's10' ? .82 : s6 === 's12' ? .9 : s6 === 's14' ? .96 : 1) + ')';
    }
    b.addEventListener('change', upd); upd();
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var done = function () { var s = $('span', copyBtn); s.textContent = 'Copied'; setTimeout(function () { s.textContent = 'Copy order'; }, 1800); };
      if (navigator.clipboard && W.isSecureContext) navigator.clipboard.writeText(orderText).then(done, done); else { var ta = d.createElement('textarea'); ta.value = orderText; d.body.appendChild(ta); ta.select(); try { d.execCommand('copy'); } catch (e) {} ta.remove(); done(); }
    });
  });

  if (!motion) { $$('[data-count]').forEach(function (el) { el.textContent = el.dataset.count; }); return; }

  /* ================= GSAP motion ================= */
  var ease = 'expo.out';
  var SP = /[ \t\n\r]+/;
  function splitWords(el) {
    if (el._words) return el._words;
    var frag = d.createDocumentFragment(), words = [];
    var add = function (node) { var s = d.createElement('span'); s.className = 'w'; s.appendChild(node); frag.appendChild(s); words.push(s); };
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/([ \t\n\r]+)/).forEach(function (p) { if (!p) return; if (SP.test(p) && !p.replace(SP, '')) frag.appendChild(d.createTextNode(' ')); else add(d.createTextNode(p)); });
      } else if (n.nodeType === 1) {
        if (n.tagName === 'BR') { frag.appendChild(n); return; }
        var txt = n.textContent.trim();
        if (!n.children.length && SP.test(txt)) { txt.split(SP).forEach(function (wd, k, arr) { var c = n.cloneNode(false); c.textContent = wd; add(c); if (k < arr.length - 1) frag.appendChild(d.createTextNode(' ')); }); }
        else add(n);
      }
    });
    el.innerHTML = ''; el.appendChild(frag); el._words = words; return words;
  }
  function splitLines(el) {
    el._orig = el.innerHTML;
    var words = splitWords(el), lines = [], top = null;
    words.forEach(function (w) { var t = w.offsetTop; if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; } lines[lines.length - 1].push(w); });
    el.innerHTML = '';
    var inners = lines.map(function (ws) {
      var ln = d.createElement('span'); ln.className = 'ln'; var inn = d.createElement('span');
      ws.forEach(function (w, k) { inn.appendChild(w); if (k < ws.length - 1) inn.appendChild(d.createTextNode(' ')); });
      ln.appendChild(inn); el.appendChild(ln); return inn;
    });
    el._words = null; return inners;
  }
  function revealSplit(el, delay) {
    var inners = splitLines(el);
    el.classList.add('is-split');
    gsap.fromTo(inners, { yPercent: 118, rotate: 2.5 }, { yPercent: 0, rotate: 0, duration: 1.2, ease: ease, stagger: 0.09, delay: delay || 0, onComplete: function () { el.innerHTML = el._orig; el.classList.add('done'); } });
  }
  var fontsReady = (d.fonts && d.fonts.ready) ? Promise.race([d.fonts.ready, new Promise(function (r) { setTimeout(r, 1800); })]) : Promise.resolve();

  fontsReady.then(function () {
    var heroDelay = entering ? 0.5 : 0.12;
    $$('[data-split]').forEach(function (el) {
      if (el.dataset.split === 'hero') { revealSplit(el, heroDelay); return; }
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { revealSplit(el); } });
    });
    $$('[data-fade]').forEach(function (el, i) {
      var inHero = el.closest('.hero,.phero');
      gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, ease: ease, delay: inHero ? heroDelay + 0.35 + (i % 5) * 0.07 : 0, scrollTrigger: inHero ? null : { trigger: el, start: 'top 94%', once: true } });
    });
    ScrollTrigger.batch('[data-reveal]', { start: 'top 92%', once: true, onEnter: function (b) { gsap.fromTo(b, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: ease, stagger: 0.08, overwrite: true }); } });
    $$('[data-focus]').forEach(function (el) {
      var ws = splitWords(el);
      gsap.fromTo(ws, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: true } });
    });
    setTimeout(function () { ScrollTrigger.refresh(); }, 60);
  });

  // hero art entrance + parallax
  var hp = $('[data-hero-photo]'), hl = $$('[data-hero-logo]');
  if (hp) {
    gsap.fromTo(hp, { clipPath: 'inset(100% 0% 0% 0% round 22px)', rotate: 2 }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', rotate: -4, duration: 1.5, ease: 'expo.inOut', delay: entering ? 0.4 : 0.05 });
    gsap.fromTo($('img', hp), { scale: 1.4 }, { scale: 1, duration: 2, ease: ease, delay: entering ? 0.4 : 0.05 });
    gsap.to(hp, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
  hl.forEach(function (l) { gsap.fromTo(l, { scale: 0.4, rotate: -30, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1.5, ease: 'elastic.out(1,0.7)', delay: entering ? 0.9 : 0.5 }); });
  $$('[data-spin]').forEach(function (s) { gsap.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 }); gsap.to(s, { rotate: 360, duration: 30, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }); });

  // image clip reveal
  $$('[data-img-reveal]').forEach(function (el) {
    var im = $('img', el);
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () {
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
      if (im) gsap.fromTo(im, { scale: 1.35 }, { scale: 1, duration: 1.9, ease: ease, clearProps: 'transform' });
    } });
  });

  // signature pies spin into place
  $$('.sig-card .sc-pie, .pz-art .pie').forEach(function (p) {
    gsap.fromTo(p, { rotate: -120, scale: 0.7 }, { rotate: 0, scale: 1, duration: 1.6, ease: ease, scrollTrigger: { trigger: p, start: 'top 95%', once: true } });
  });

  // counters
  $$('[data-count]').forEach(function (el) {
    var v = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), o = { x: 0 };
    el.textContent = (0).toFixed(dec);
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () { gsap.to(o, { x: v, duration: 1.8, ease: 'power3.out', onUpdate: function () { el.textContent = o.x.toFixed(dec); } }); } });
  });

  // marquee driven by scroll velocity
  $$('[data-marquee]').forEach(function (m) {
    var tr = $('.mq-track', m); tr.innerHTML += tr.innerHTML;
    var x = 0, vis = false, boost = 0;
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(m);
    gsap.ticker.add(function () {
      if (!vis) return;
      var w = tr.scrollWidth / 2; if (!w) return;
      var v = lenis ? lenis.velocity : 0; boost += (Math.abs(v) * 0.35 - boost) * 0.1;
      var sd = lenis && lenis.direction ? lenis.direction : 1;
      x -= (0.55 + boost) * sd; x = gsap.utils.wrap(-w, 0, x);
      tr.style.transform = 'translate3d(' + x + 'px,0,0)';
    });
  });

  // magnetic
  if (FINE) $$('[data-magnetic]').forEach(function (el) {
    var s = 0.28, inner = el.firstElementChild;
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); var x = (e.clientX - r.left - r.width / 2) * s, y = (e.clientY - r.top - r.height / 2) * s; gsap.to(el, { x: x, y: y, duration: 0.6, ease: 'power3.out' }); if (inner) gsap.to(inner, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3.out' }); });
    el.addEventListener('pointerleave', function () { gsap.to(inner ? [el, inner] : el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1,0.35)' }); });
  });

  // cursor
  if (FINE) {
    H.classList.add('has-cursor');
    var cur = $('.cursor'), ct = $('.cursor-t', cur);
    var cx = gsap.quickTo(cur, 'x', { duration: 0.3, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: 0.3, ease: 'power3' }), seen = false;
    cur.classList.add('is-hidden');
    W.addEventListener('pointermove', function (e) { if (!seen) { seen = true; gsap.set(cur, { x: e.clientX, y: e.clientY }); cur.classList.remove('is-hidden'); } cx(e.clientX); cy(e.clientY); }, { passive: true });
    d.addEventListener('pointerover', function (e) { var t = e.target.closest ? e.target.closest('[data-cursor]') : null; if (t) { ct.textContent = t.dataset.cursor; cur.classList.add('is-label'); } else cur.classList.remove('is-label'); });
    d.addEventListener('pointerleave', function () { cur.classList.add('is-hidden'); });
    d.addEventListener('pointerenter', function () { cur.classList.remove('is-hidden'); });
  }

  // chapters with sticky media (desktop)
  var mm = gsap.matchMedia();
  $$('[data-chapters]').forEach(function (sec) {
    var chs = $$('.cc-ch', sec), plates = $$('.cc-plate', sec), num = $('[data-cc-i]', sec);
    var set = function (k) { chs.forEach(function (c, j) { c.classList.toggle('on', j === k); }); plates.forEach(function (p, j) { p.classList.toggle('on', j <= k); }); if (num) num.textContent = '0' + (k + 1) + ' / 0' + chs.length; };
    mm.add('(min-width: 980px)', function () { set(0); chs.forEach(function (c, k) { ScrollTrigger.create({ trigger: c, start: 'top 60%', end: 'bottom 60%', onToggle: function (s) { if (s.isActive) set(k); } }); }); });
  });

  // brothers names stagger
  $$('[data-bros] li').forEach(function (li, i) {
    gsap.fromTo(li, { opacity: 0, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: 1.1, ease: ease, delay: (i % 3) * 0.08, scrollTrigger: { trigger: li, start: 'top 95%', once: true } });
  });

  // timeline line draw
  $$('[data-tl]').forEach(function (tl) { gsap.fromTo(tl, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 80%', end: 'bottom 60%', scrub: true } }); });

  // footer wordmark rises
  $$('[data-wm]').forEach(function (wm) {
    gsap.fromTo($$('span', wm), { yPercent: 100 }, { yPercent: 0, ease: 'none', stagger: 0.03, scrollTrigger: { trigger: wm, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });
  });

  W.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
