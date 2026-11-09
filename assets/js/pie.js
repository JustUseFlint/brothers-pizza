/* Brothers Pizza — illustrated pie generator (shared by build + browser) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BPie = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  function rng(seed) { var s = 0; for (var i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0; s = s || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  var C = 100, R = 74; // cheese radius
  // topping painters: return svg string at (x,y) with rotation a, random r()
  var T = {
    pepperoni: { n: 9, d: function (x, y, a, r) { var s = 8.5 + r() * 1.5; return '<circle cx="' + x + '" cy="' + y + '" r="' + s + '" fill="#B3261E"/><circle cx="' + (x - 2) + '" cy="' + (y - 2) + '" r="' + (s * .35) + '" fill="#8E1A14" opacity=".55"/><circle cx="' + (x + 3) + '" cy="' + (y + 2) + '" r="1.3" fill="#7A1510" opacity=".6"/>'; } },
    sausage: { n: 12, d: function (x, y, a, r) { var s = 4 + r() * 2; return '<path d="M' + (x - s) + ' ' + y + 'q' + s * .4 + ' ' + (-s) + ' ' + s + ' ' + (-s * .8) + 'q' + s + ' ' + s * .2 + ' ' + s * .9 + ' ' + s + 'q' + (-s * .3) + ' ' + s * .9 + ' ' + (-s) + ' ' + s * .8 + 'q' + (-s * .9) + ' ' + (-s * .1) + ' ' + (-s * .9) + ' ' + (-s) + 'z" fill="#6E4127"/>'; } },
    ham: { n: 9, d: function (x, y, a, r) { return '<rect x="' + (x - 4.5) + '" y="' + (y - 4.5) + '" width="9" height="9" rx="1.6" fill="#E59A93" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/>'; } },
    bacon: { n: 7, d: function (x, y, a, r) { return '<path d="M' + (x - 9) + ' ' + y + 'q4 -3 9 0t9 0" stroke="#9C3B2A" stroke-width="4.4" fill="none" stroke-linecap="round" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/><path d="M' + (x - 8) + ' ' + y + 'q4 -3 8 0t8 0" stroke="#E8B49A" stroke-width="1.2" fill="none" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/>'; } },
    chicken: { n: 9, d: function (x, y, a, r) { return '<path d="M' + (x - 5) + ' ' + (y - 2) + 'l4 -3 6 1 1 5 -4 4 -6 -1z" fill="#EFD9AE" stroke="#C9A66C" stroke-width=".8" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/>'; } },
    mushrooms: { n: 8, d: function (x, y, a, r) { return '<g transform="rotate(' + a + ' ' + x + ' ' + y + ')"><path d="M' + (x - 6) + ' ' + y + 'a6 5 0 0 1 12 0z" fill="#B59A7A"/><rect x="' + (x - 2) + '" y="' + y + '" width="4" height="5" rx="1" fill="#D8C4A6"/></g>'; } },
    'green-peppers': { n: 8, d: function (x, y, a, r) { return '<path d="M' + (x - 7) + ' ' + y + 'a7 7 0 0 1 14 0" stroke="#3E7B3A" stroke-width="2.6" fill="none" stroke-linecap="round" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/>'; } },
    'red-onions': { n: 8, d: function (x, y, a, r) { return '<path d="M' + (x - 6) + ' ' + y + 'a6 6 0 0 1 12 0" stroke="#8B4F86" stroke-width="1.8" fill="none" stroke-linecap="round" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/>'; } },
    'black-olives': { n: 10, d: function (x, y, a, r) { return '<circle cx="' + x + '" cy="' + y + '" r="3.4" fill="none" stroke="#222" stroke-width="2.2"/>'; } },
    tomatoes: { n: 7, d: function (x, y, a, r) { return '<circle cx="' + x + '" cy="' + y + '" r="6" fill="#D9412F"/><circle cx="' + x + '" cy="' + y + '" r="3.4" fill="#F07A5C"/>'; } },
    jalapenos: { n: 9, d: function (x, y, a, r) { return '<circle cx="' + x + '" cy="' + y + '" r="3.8" fill="#BFD77A" stroke="#4E8A2E" stroke-width="1.6"/><circle cx="' + x + '" cy="' + y + '" r="1" fill="#F4F1D0"/>'; } },
    'banana-peppers': { n: 9, d: function (x, y, a, r) { return '<circle cx="' + x + '" cy="' + y + '" r="4" fill="none" stroke="#E2C23E" stroke-width="2.2"/>'; } },
    pineapple: { n: 9, d: function (x, y, a, r) { return '<path d="M' + x + ' ' + (y - 5) + 'l5 8h-10z" fill="#F2C94C" stroke="#D9A82A" stroke-width=".6" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/>'; } },
    'extra-cheese': { n: 0 }
  };
  var SAUCE = { marinara: '#C23A22', bbq: '#7A2E17', ranch: '#F1E8D2' };
  function pie(opts) {
    opts = opts || {};
    var tops = opts.toppings || [], seed = opts.seed || tops.join('|') || 'cheese', r = rng(seed), sauce = SAUCE[opts.sauce || 'marinara'];
    var id = 'p' + Math.floor(r() * 1e9).toString(36);
    var o = '<svg class="pie" viewBox="0 0 200 200" role="img" aria-label="' + (opts.label || 'Illustrated pizza') + '"><defs><radialGradient id="' + id + 'c" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#F9DE8F"/><stop offset=".8" stop-color="#F2C766"/><stop offset="1" stop-color="#E3A94B"/></radialGradient></defs>';
    o += '<circle cx="100" cy="100" r="96" fill="#D99A4E"/><circle cx="100" cy="100" r="92" fill="#E7B36A"/><circle cx="100" cy="100" r="96" fill="none" stroke="#B8752F" stroke-width="2" opacity=".5"/>';
    // crust speckle
    for (var i = 0; i < 26; i++) { var aa = r() * Math.PI * 2, rr = 86 + r() * 8; o += '<circle cx="' + (100 + Math.cos(aa) * rr).toFixed(1) + '" cy="' + (100 + Math.sin(aa) * rr).toFixed(1) + '" r="' + (0.8 + r() * 1.6).toFixed(1) + '" fill="#A8652A" opacity=".55"/>'; }
    o += '<circle cx="100" cy="100" r="82" fill="' + sauce + '"/>';
    // cheese blob
    var pts = [], N = 22; for (i = 0; i < N; i++) { var t = i / N * Math.PI * 2, rad = (opts.cheese === 'boss' ? 80 : 77) - r() * 6; pts.push([100 + Math.cos(t) * rad, 100 + Math.sin(t) * rad]); }
    var dP = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L') + 'Z';
    o += '<path d="' + dP + '" fill="url(#' + id + 'c)" stroke="#F7D98A" stroke-width="5" stroke-linejoin="round"/>';
    // browned cheese spots
    var spots = opts.cheese === 'boss' || tops.indexOf('extra-cheese') > -1 ? 22 : 12;
    for (i = 0; i < spots; i++) { var a2 = r() * Math.PI * 2, r2 = Math.sqrt(r()) * 66; o += '<ellipse cx="' + (100 + Math.cos(a2) * r2).toFixed(1) + '" cy="' + (100 + Math.sin(a2) * r2).toFixed(1) + '" rx="' + (2 + r() * 4).toFixed(1) + '" ry="' + (1.5 + r() * 2.5).toFixed(1) + '" fill="#D9963E" opacity="' + (0.25 + r() * 0.35).toFixed(2) + '"/>'; }
    if (opts.cheese === 'boss') for (i = 0; i < 30; i++) { var a3 = r() * Math.PI * 2, r3 = Math.sqrt(r()) * 68; o += '<path d="M' + (100 + Math.cos(a3) * r3).toFixed(1) + ' ' + (100 + Math.sin(a3) * r3).toFixed(1) + 'l' + (r() * 6 - 3).toFixed(1) + ' ' + (r() * 6 - 3).toFixed(1) + '" stroke="' + (r() > .5 ? '#E8892B' : '#FFF6D6') + '" stroke-width="2" stroke-linecap="round"/>'; }
    // toppings, spread with jittered sunflower placement per topping
    var list = tops.filter(function (k) { return T[k] && T[k].n; });
    var scale = list.length > 3 ? 0.62 : list.length > 1 ? 0.8 : 1;
    o += '<g class="pie-tops">';
    list.forEach(function (k, ti) {
      var n = Math.max(4, Math.round(T[k].n * scale)), off = r() * Math.PI * 2;
      o += '<g class="pt-' + k + '">';
      for (var j = 0; j < n; j++) {
        var idx = j + 0.5, rad = Math.sqrt(idx / n) * 62, th = idx * 2.39996 + off + ti * 0.7;
        var x = 100 + Math.cos(th) * rad + (r() * 6 - 3), y = 100 + Math.sin(th) * rad + (r() * 6 - 3);
        x = +x.toFixed(1); y = +y.toFixed(1); o += '<g transform="translate(' + x + ' ' + y + ') scale(' + (opts.big || 1.3) + ') translate(' + (-x) + ' ' + (-y) + ')">' + T[k].d(x, y, Math.round(r() * 360), r) + '</g>';
      }
      o += '</g>';
    });
    o += '</g>';
    if (opts.slices !== false) for (i = 0; i < 4; i++) { var ang = i * Math.PI / 4 + 0.2; o += '<line x1="' + (100 + Math.cos(ang) * 92).toFixed(1) + '" y1="' + (100 + Math.sin(ang) * 92).toFixed(1) + '" x2="' + (100 - Math.cos(ang) * 92).toFixed(1) + '" y2="' + (100 - Math.sin(ang) * 92).toFixed(1) + '" stroke="#7A4A1E" stroke-width="1" opacity=".22"/>'; }
    return o + '</svg>';
  }
  return { pie: pie, toppings: Object.keys(T) };
});
