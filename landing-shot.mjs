import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.BASE;
const OUT = process.env.OUT;
const READY = process.env.READY_CLASS || 'loaded';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 45000 });
await page.waitForFunction((cls) => document.body.classList.contains(cls), { timeout: 15000 }, READY).catch(() => {});
await sleep(2500);
await page.evaluate(() => scrollTo(0, 0));
await sleep(400);
await page.screenshot({ path: OUT });
await browser.close();
console.log('saved', OUT);
