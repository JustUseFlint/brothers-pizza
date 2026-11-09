import asyncio, sys, json
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8811/brothers-pizza/'
OUT = '/workspace/brothers-pizza/shots/'
PAGES = ['', 'menu/', 'story/', 'visit/']
VP = {'phone': dict(viewport={'width': 393, 'height': 852}, device_scale_factor=3, is_mobile=True, has_touch=True), 'desk': dict(viewport={'width': 1440, 'height': 900}), 'small': dict(viewport={'width': 360, 'height': 740}, device_scale_factor=2, is_mobile=True, has_touch=True)}
only = sys.argv[2].split(',') if len(sys.argv) > 2 else list(VP)
async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        report = {}
        for vk in only:
            ctx = await b.new_context(**VP[vk], timezone_id='America/Indianapolis')
            for pg_path in PAGES:
                pg = await ctx.new_page(); errs = []
                pg.on('console', lambda m, e=errs: e.append(m.text) if m.type == 'error' else None)
                pg.on('pageerror', lambda x, e=errs: e.append('PAGEERR ' + str(x)))
                await pg.goto(BASE + pg_path, wait_until='networkidle', timeout=60000)
                await pg.wait_for_timeout(1500)
                # scroll through to trigger reveals
                h = await pg.evaluate('document.body.scrollHeight')
                y = 0
                while y < h:
                    y += 500; await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(110)
                    h = await pg.evaluate('document.body.scrollHeight')
                await pg.wait_for_timeout(1200)
                await pg.evaluate('window.scrollTo(0,0)'); await pg.wait_for_timeout(1300)
                name = (pg_path.strip('/') or 'home') + '-' + vk
                await pg.screenshot(path=OUT + name + '.png')
                await pg.screenshot(path=OUT + name + '-full.png', full_page=True)
                ow = await pg.evaluate('document.documentElement.scrollWidth - innerWidth')
                report[name] = {'errors': errs, 'overflowX': ow}
                await pg.close()
            await ctx.close()
        print(json.dumps(report, indent=1))
        await b.close()
asyncio.run(run())
