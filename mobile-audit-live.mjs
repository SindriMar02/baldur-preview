import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.BASE;
const OUT = process.env.OUT || 'qa-shots/mobile-live';
const READY = process.env.READY_CLASS || 'loaded';
const NAME = process.env.SITE_NAME || 'site';
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const DEVICES = [
  { name: 'iPhone-SE',      w: 320, h: 568, dpr: 2 },
  { name: 'iPhone-14',      w: 390, h: 844, dpr: 3 },
  { name: 'iPhone-Pro-Max', w: 430, h: 932, dpr: 3 },
  { name: 'iPad-portrait',  w: 768, h: 1024, dpr: 2 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--force-color-profile=srgb'],
});

const issues = [];
const flag = (dev, kind, detail) => issues.push(`[${NAME}/${dev}] ${kind}: ${detail}`);

for (const d of DEVICES) {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await page.setViewport({ width: d.w, height: d.h, deviceScaleFactor: d.dpr, isMobile: true, hasTouch: true });
  const cdp = await page.createCDPSession();
  await cdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'hover', value: 'none' }, { name: 'pointer', value: 'coarse' }],
  });

  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 45000 });
  await page.waitForFunction((cls) => document.body.classList.contains(cls), { timeout: 15000 }, READY).catch(() => flag(d.name, 'READY CLASS TIMEOUT', READY));
  await sleep(2000);

  if (errs.length) flag(d.name, 'CONSOLE ERROR', [...new Set(errs)].slice(0, 4).join(' | '));

  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const all = Array.from(document.images);
    all.forEach((i) => { i.loading = 'eager'; });
    await Promise.allSettled(all.map((i) => i.decode().catch(() => {})));
  });
  await sleep(500);

  /* horizontal overflow */
  const of = await page.evaluate(() => {
    scrollTo(60, 0); const canScrollX = window.scrollX; scrollTo(0, 0);
    const bad = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed') return;
      let n = el.parentElement, isClipped = false;
      while (n && n !== document.documentElement) {
        if (/hidden|clip/.test(getComputedStyle(n).overflowX)) { isClipped = true; break; }
        n = n.parentElement;
      }
      if (isClipped) return;
      if (r.right > innerWidth + 1.5 || r.left < -1.5) {
        bad.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ').filter(Boolean)[0] || '?'} [${Math.round(r.left)}..${Math.round(r.right)}]`);
      }
    });
    return { docOver: canScrollX, bad: [...new Set(bad)].slice(0, 8) };
  });
  if (of.docOver > 0) flag(d.name, 'HORIZONTAL SCROLL POSSIBLE', of.docOver + 'px');
  if (of.bad.length) flag(d.name, 'ELEMENT OVERFLOW', of.bad.join(' | '));

  /* tap targets */
  const taps = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('a[href], button').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      if (getComputedStyle(el).visibility === 'hidden') return;
      if (r.height < 24 || r.width < 24) bad.push(`${(el.textContent || '').trim().slice(0, 22)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    });
    return bad;
  });
  if (taps.length) flag(d.name, 'SMALL TAP TARGET', taps.join(' | '));

  /* tiny text */
  const tiny = await page.evaluate(() => {
    const bad = new Set();
    document.querySelectorAll('p, li, dd, dt, span, a, h1, h2, h3, figcaption').forEach((el) => {
      if (!el.textContent.trim() || el.children.length) return;
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.display === 'none') return;
      const px = parseFloat(s.fontSize);
      if (px < 11.5) bad.add(`${String(el.className).split(' ')[0] || el.tagName.toLowerCase()} ${px}px`);
    });
    return [...bad];
  });
  if (tiny.length) flag(d.name, 'TEXT UNDER 11.5px', tiny.join(' | '));

  /* clipped headings */
  const clipped = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('h1, h2, h3').forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 2) {
        bad.push(`${String(el.className).split(' ')[0]} "${el.textContent.trim().slice(0, 24)}" ${el.scrollWidth}>${el.clientWidth}`);
      }
    });
    return bad;
  });
  if (clipped.length) flag(d.name, 'TEXT CLIPPED', clipped.join(' | '));

  await page.screenshot({ path: `${OUT}/${d.name}-top.png` });

  /* burger + menu */
  const hasBurger = await page.evaluate(() => !!document.querySelector('#burger'));
  if (hasBurger && d.w < 930) {
    const burger = await page.evaluate(() => {
      const b = document.querySelector('#burger');
      const r = b.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return { visible: getComputedStyle(b).display !== 'none', top: Math.round(r.top),
               reachable: !!(hit && hit.closest('#burger')) };
    });
    if (!burger.visible || !burger.reachable) flag(d.name, 'BURGER', JSON.stringify(burger));
    await page.click('#burger');
    await sleep(700);
    const menu = await page.evaluate(() => {
      const m = document.querySelector('#menu');
      if (!m) return { open: false, missing: true };
      const links = [...m.querySelectorAll('a')];
      return { open: m.classList.contains('is-open'),
               allInView: links.every((a) => { const r = a.getBoundingClientRect(); return r.top >= -2 && r.bottom <= innerHeight + 2; }),
               overflow: m.scrollHeight > m.clientHeight + 2,
               n: links.length };
    });
    if (!menu.open || menu.overflow || !menu.allInView) flag(d.name, 'MENU', JSON.stringify(menu));
    await page.screenshot({ path: `${OUT}/${d.name}-menu.png` });
    await page.evaluate(() => document.querySelector('#burger')?.click());
    await sleep(600);
  }

  /* full-page scroll shot at bottom */
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await sleep(900);
  await page.screenshot({ path: `${OUT}/${d.name}-bottom.png` });

  await page.close();
}

await browser.close();

console.log(`\n=== ${NAME} mobile audit (${BASE}) ===`);
if (issues.length === 0) {
  console.log('CLEAN — no issues found.');
} else {
  issues.forEach((i) => console.log(i));
}
