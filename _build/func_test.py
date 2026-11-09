import asyncio, sys, json
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8811/brothers-pizza/'
async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 393, 'height': 852}, device_scale_factor=3, is_mobile=True, has_touch=True, timezone_id='America/Indianapolis')
        pg = await ctx.new_page(); errs = []
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        pg.on('pageerror', lambda x: errs.append('PAGEERR ' + str(x)))
        await pg.goto(BASE + 'menu/', wait_until='networkidle'); await pg.wait_for_timeout(1500)
        res = {}
        await pg.fill('[data-msearch]', 'bacon'); await pg.wait_for_timeout(400)
        res['bacon_visible'] = await pg.evaluate("[...document.querySelectorAll('[data-item]')].filter(e=>!e.hidden && e.closest('[data-mcat]') && !e.closest('[data-mcat]').hidden).map(e=>(e.querySelector('h3')||{}).textContent||'table')")
        await pg.fill('[data-msearch]', 'zzzz'); await pg.wait_for_timeout(400)
        res['empty_shown'] = await pg.evaluate("!document.querySelector('[data-mempty]').hidden")
        await pg.fill('[data-msearch]', ''); await pg.wait_for_timeout(300)
        await pg.click('[data-mveg]'); await pg.wait_for_timeout(400)
        res['veg_count'] = await pg.evaluate("[...document.querySelectorAll('[data-item]')].filter(e=>!e.hidden && !e.closest('[data-mcat]').hidden).length")
        await pg.click('[data-mveg]'); await pg.wait_for_timeout(300)
        await pg.click('[data-psize] label:nth-child(4)'); await pg.wait_for_timeout(600)
        res['supreme_14'] = await pg.evaluate("document.querySelector('#supreme .pz-p b').textContent")
        byo = '#build [data-byo]'
        await pg.locator(byo + ' .seg-o').nth(4).click(); await pg.wait_for_timeout(200)
        await pg.locator(byo + ' .chip', has_text='Sausage').click(); await pg.locator(byo + ' .chip', has_text='Mushrooms').click(); await pg.wait_for_timeout(500)
        res['byo_16_pep_saus_mush'] = await pg.evaluate(f"document.querySelector('{byo} [data-byo-total]').textContent")
        res['byo_sum'] = await pg.evaluate(f"document.querySelector('{byo} [data-byo-sum]').textContent")
        await pg.locator(byo + ' .seg-o').nth(0).click(); await pg.wait_for_timeout(300)
        res['byo_6_pineapple_disabled'] = await pg.evaluate(f"document.querySelector('{byo} input[value=pineapple]').disabled")
        res['byo_6_total'] = await pg.evaluate(f"document.querySelector('{byo} [data-byo-total]').textContent")
        # tap a category chip
        await pg.click('[data-mcats] a[data-cat=grinders]'); await pg.wait_for_timeout(1800)
        res['grinders_top'] = await pg.evaluate("Math.round(document.getElementById('grinders').getBoundingClientRect().top)")
        res['menu_errors'] = list(errs)
        # visit address check
        errs.clear()
        await pg.goto(BASE + 'visit/', wait_until='networkidle'); await pg.wait_for_timeout(1200)
        await pg.fill('#dz-q', '1 Lafayette Ave'); await pg.click('[data-dz-form] button'); await pg.wait_for_timeout(4000)
        res['dz_in'] = await pg.evaluate("document.querySelector('[data-dz-out]').textContent")
        await pg.fill('#dz-q', 'Ladoga, IN'); await pg.click('[data-dz-form] button'); await pg.wait_for_timeout(4000)
        res['dz_out'] = await pg.evaluate("document.querySelector('[data-dz-out]').textContent")
        res['visit_errors'] = list(errs)
        # link check
        links = set()
        for path in ['', 'menu/', 'story/', 'visit/']:
            await pg.goto(BASE + path, wait_until='domcontentloaded')
            for h in await pg.evaluate("[...document.querySelectorAll('a[href]')].map(a=>a.href)"): links.add(h)
        bad = []
        for h in sorted(links):
            if h.startswith('tel:') : continue
            try:
                r = await ctx.request.get(h.split('#')[0], timeout=20000, max_redirects=5)
                if r.status >= 400: bad.append((h, r.status))
            except Exception as e: bad.append((h, str(e)[:60]))
        res['links'] = len(links); res['bad_links'] = bad
        print(json.dumps(res, indent=1)); await b.close()
asyncio.run(run())
