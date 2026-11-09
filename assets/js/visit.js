/* Visit: delivery-zone map + address check (Leaflet + OpenStreetMap tiles + Nominatim) */
(function () {
  'use strict';
  var ZONE = [[40.018005, -86.922476], [40.009993, -86.91886], [39.991822, -86.909107], [39.991969, -86.903635], [39.994025, -86.900138], [40.00789, -86.879528], [39.999733, -86.87448], [39.999827, -86.87102], [40.001619, -86.865763], [40.01063, -86.822499], [40.018062, -86.824639], [40.025691, -86.839525], [40.033647, -86.853639], [40.04009, -86.826377], [40.048077, -86.827096], [40.054519, -86.859121], [40.063719, -86.843854], [40.093937, -86.903131], [40.093695, -86.908501], [40.084523, -86.912068], [40.064499, -86.943879], [40.062701, -86.953675], [40.055025, -86.950263], [40.049123, -86.944534], [40.036988, -86.963546], [40.025756, -86.972193], [40.023261, -86.971367]]; // [lat, lon] from Brothers' online-ordering delivery settings (Nov 2026)
  var SHOP = [40.042689, -86.899537];
  var mapEl = document.querySelector('[data-dz-map]'), form = document.querySelector('[data-dz-form]'), out = document.querySelector('[data-dz-out]');
  if (!mapEl || !window.L) return;
  var map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
  var zone = L.polygon(ZONE, { color: '#B5141C', weight: 2, fillColor: '#B5141C', fillOpacity: 0.12, dashArray: '6 6' }).addTo(map);
  var shopIcon = L.divIcon({ className: '', html: '<div style="width:44px;height:44px;border-radius:50%;background:#F4ECDF;border:2px solid #B5141C;display:grid;place-items:center;box-shadow:0 6px 14px rgba(0,0,0,.25)"><img src="../assets/img/logo-stamp-sm.png" alt="" style="width:32px"></div>', iconSize: [44, 44], iconAnchor: [22, 22] });
  L.marker(SHOP, { icon: shopIcon, title: 'Brothers Pizza Company' }).addTo(map).bindPopup('<b>Brothers Pizza Company</b><br>205 E Market St');
  map.fitBounds(zone.getBounds(), { padding: [16, 16] });
  addEventListener('resize', function () { map.invalidateSize(); });
  var pin = null;
  function inside(lat, lon) {
    var c = false;
    for (var i = 0, j = ZONE.length - 1; i < ZONE.length; j = i++) {
      var yi = ZONE[i][0], xi = ZONE[i][1], yj = ZONE[j][0], xj = ZONE[j][1];
      if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) c = !c;
    }
    return c;
  }
  function say(t, cls) { out.textContent = t; out.className = 'dz-out' + (cls ? ' ' + cls : ''); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = form.q.value.trim(); if (!q) return;
    if (!/crawfordsville|indiana|\bin\b|\d{5}/i.test(q)) q += ', Crawfordsville, IN';
    say('Looking that up…');
    fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&viewbox=-87.1,40.2,-86.7,39.9&q=' + encodeURIComponent(q), { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.length) { say('Couldn’t find that address. Try adding the street type (St, Ave), or call (765) 361-1800.', 'no'); return; }
        var lat = +res[0].lat, lon = +res[0].lon, ok = inside(lat, lon);
        if (pin) map.removeLayer(pin);
        pin = L.circleMarker([lat, lon], { radius: 9, color: ok ? '#3D6B37' : '#1A1411', weight: 3, fillColor: ok ? '#3D6B37' : '#fff', fillOpacity: 0.9 }).addTo(map);
        map.fitBounds(L.latLngBounds([SHOP, [lat, lon]]).pad(0.5), { maxZoom: 15 });
        var km = map.distance(SHOP, [lat, lon]) / 1609.34;
        say(ok ? 'Looks like you’re in the delivery zone (' + km.toFixed(1) + ' mi away). Call to order.' : 'That looks outside the usual zone (' + km.toFixed(1) + ' mi away). Call to ask, or pick up at the shop.', ok ? 'ok' : 'no');
      })
      .catch(function () { say('The address lookup isn’t responding. Call (765) 361-1800 and they’ll tell you.', 'no'); });
  });
})();
