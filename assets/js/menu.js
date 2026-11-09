/* Menu: search, veg filter, size switch, category scrollspy */
(function () {
  'use strict';
  var d = document, $ = function (s, c) { return (c || d).querySelector(s); }, $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var q = $('[data-msearch]'), vegBtn = $('[data-mveg]'), empty = $('[data-mempty]'), cats = $$('[data-mcat]'), links = $$('[data-cats] a, [data-mcats] a');
  var veg = false;
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim(); }
  function apply() {
    var term = norm(q.value), shown = 0;
    cats.forEach(function (c) {
      var n = 0;
      $$('[data-item]', c).forEach(function (it) {
        var ok = (!term || norm(it.dataset.q).indexOf(term) > -1) && (!veg || (it.dataset.tags || '').indexOf('veg') > -1);
        if (it.classList.contains('size-table')) ok = !veg && (!term || norm(it.dataset.q).indexOf(term) > -1);
        it.hidden = !ok; if (ok) n++;
      });
      var byo = $('[data-byo]', c); if (byo) { var bOk = !veg && (!term || 'build your own pizza toppings'.indexOf(term) > -1 || n > 0); byo.hidden = !bOk; if (bOk) n++; }
      c.hidden = n === 0; shown += n;
      var link = $('[data-cat="' + c.id + '"]'); if (link) link.hidden = n === 0;
    });
    empty.hidden = shown > 0;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  var t; q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(apply, 80); });
  vegBtn.addEventListener('click', function () { veg = !veg; vegBtn.setAttribute('aria-pressed', veg); apply(); });

  // size switch for specialty prices
  var ps = $('[data-psize]');
  if (ps) ps.addEventListener('change', function () {
    var i = +$('input:checked', ps).value, lbl = $('input:checked', ps).nextElementSibling.textContent;
    $$('.pz-p').forEach(function (p) {
      var v = +p.dataset.prices.split(',')[i]; $('b', p).textContent = '$' + v.toFixed(2); $('i', p).textContent = lbl;
      if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo($('b', p), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'expo.out' });
    });
  });

  // scrollspy on category chips
  var bar = $('[data-mcats]');
  function spy() {
    var y = 200, cur = null;
    cats.forEach(function (c) { if (!c.hidden && c.getBoundingClientRect().top < y) cur = c.id; });
    if (!cur && bar.scrollLeft > 0 && scrollY < 400) bar.scrollTo({ left: 0, behavior: 'smooth' });
    links.forEach(function (a) {
      var on = a.dataset.cat === cur;
      if (on && !a.classList.contains('on')) { var l = a.offsetLeft - 20; bar.scrollTo({ left: l, behavior: 'smooth' }); }
      a.classList.toggle('on', on);
    });
  }
  addEventListener('scroll', spy, { passive: true }); spy();

  // flash item from hash
  if (location.hash) { var el = d.getElementById(location.hash.slice(1)); if (el && el.classList.contains('pz')) setTimeout(function () { el.classList.add('flash'); }, 900); }
})();
