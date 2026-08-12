import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { COPY } from './content.mjs';
import { render } from './template.mjs';

const PREVIEW_ORIGIN = process.env.PREVIEW_ORIGIN || '';
const isPreview = Boolean(PREVIEW_ORIGIN);
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'en'), { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });

/* favicon: the widening frame itself, two brackets opening */
await writeFile(join(dist, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" fill="#0B0B0C"/>
<path d="M14 20v-6h10M50 20v-6H40M14 44v6h10M50 44v6H40" fill="none" stroke="#ECEAE6" stroke-width="3"/>
<circle cx="32" cy="32" r="6" fill="#C8462F"/>
</svg>`);

const opts = { previewOrigin: PREVIEW_ORIGIN, noindex: isPreview };
await writeFile(join(dist, 'index.html'), render(COPY.is, { assetBase: '', ...opts }));
await writeFile(join(dist, 'en', 'index.html'), render(COPY.en, { assetBase: '../', ...opts }));
if (isPreview) await writeFile(join(dist, '.nojekyll'), '');

const O = PREVIEW_ORIGIN || 'https://baldurkristjans.is';
await writeFile(join(dist, 'robots.txt'), isPreview
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\nSitemap: ${O}/sitemap.xml\n`);
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${O}/</loc></url>
  <url><loc>${O}/en/</loc></url>
</urlset>
`);
console.log(`built dist/index.html + dist/en/index.html${isPreview ? ' [preview noindex]' : ''}`);
