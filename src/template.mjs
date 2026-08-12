import { SITE, SHEET } from './content.mjs';
import SIZES from './img-sizes.json' with { type: 'json' };

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Per-character reveal for the opening name (eladiodieste.com device, saved
   to memory 2026-08-05: chars fly in from x:1em, masked, staggered). The DOM
   text node stays the accessible name; chars are a decorative aria-hidden
   overlay so a screen reader is never read the name letter by letter. */
function chars(text, tag = 'span', cls = '') {
  const html = String(text).split('').map((ch, i) =>
    `<span class="bk-ch" style="--i:${i}"><span class="bk-ch-i">${ch === ' ' ? '&nbsp;' : esc(ch)}</span></span>`
  ).join('');
  return `<${tag} class="${cls}" aria-hidden="true">${html}</${tag}>`;
}

/* Per-word reveal. Real whitespace text nodes between the words so textContent
   and the accessible name both stay clean (craft ledger #36c). */
function words(text, tag = 'h2', cls = '') {
  const html = String(text).split(' ')
    .map((w, i) => `<span class="bk-w" style="--i:${i}"><span class="bk-w-i">${esc(w)}</span></span>`)
    .join(' ');
  return `<${tag} class="bk-rev ${cls}" aria-label="${esc(text)}"><span aria-hidden="true">${html}</span></${tag}>`;
}

export function render(c, { assetBase, previewOrigin = '', noindex = false }) {
  const A = assetBase;
  const ORIGIN = previewOrigin || SITE.origin;

  const im = (name, alt, cls = '', extra = '') => {
    const [w, h] = SIZES[name] || [];
    const dim = w ? ` width="${w}" height="${h}"` : '';
    return `<img class="${cls}" src="${A}img/${name}" alt="${esc(alt)}" loading="lazy" decoding="async"${dim}${extra}>`;
  };

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.legalName,
    alternateName: SITE.brand,
    jobTitle: c.hero.role,
    url: ORIGIN,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phoneTel,
    address: { '@type': 'PostalAddress', addressLocality: 'Reykjavík', addressCountry: 'IS' },
    worksFor: { '@type': 'Organization', name: SITE.company },
    knowsAbout: ['Environmental portraiture', 'Editorial photography', 'Commercial photography'],
    /* the client list is his own, tagged on his own index: exactly the record a
       search engine cannot read from his current site */
    workExample: SHEET.slice(0, 24).map((s) => ({
      '@type': 'CreativeWork',
      name: s.title,
      ...(s.client ? { sponsor: { '@type': 'Organization', name: s.client } } : {}),
    })),
  };

  /* ---- THE SIGNATURE: frames that open tight on the subject and widen ---- */
  const frames = c.frames.map((f, i) => `
    <figure class="bk-fr" id="${esc(f.id)}" data-fx="${f.fx}" data-fy="${f.fy}" style="--i:${i}">
      <div class="bk-fr-win">
        ${im(f.img, `${f.who} ${f.what}, ${f.place}`, 'bk-fr-img')}
      </div>
      <figcaption class="bk-fr-cap">
        <span class="bk-fr-who">${esc(f.who)}</span>
        <span class="bk-fr-what">${esc(f.what)}</span>
        <span class="reg bk-fr-meta">${esc(f.client)} · ${esc(f.place)}</span>
      </figcaption>
    </figure>`).join('');

  const stories = c.stories.map((s, i) => `
    <article class="bk-st" id="st-${esc(s.id)}" style="--i:${i}">
      <p class="reg bk-st-meta"><span class="bk-st-no">${String(i + 1).padStart(2, '0')}</span>${esc(s.client)}</p>
      <h3 class="bk-st-h">${esc(s.title)}${s.isTitle ? `<i class="bk-st-alt">${esc(s.isTitle)}</i>` : ''}</h3>
      <p class="bk-st-b">${esc(s.text)}</p>
    </article>`).join('');

  const sheet = SHEET.map((s) => `
    <li class="bk-sh-i">
      <a class="bk-sh-a" href="${SITE.origin}/${esc(s.handle)}" target="_blank" rel="noopener">
        <span class="bk-sh-m">${im(s.file, s.title, 'bk-sh-img')}</span>
        <span class="bk-sh-t">${esc(s.title)}</span>
        ${s.client ? `<span class="reg bk-sh-c">${esc(s.client)}</span>` : ''}
      </a>
    </li>`).join('');

  const factRows = c.about.facts.map((f) =>
    `<div class="bk-fa-r"><dt class="reg">${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('');

  const contactRows = c.contact.rows.map((r) =>
    `<div class="bk-ct-r"><dt class="reg">${esc(r.k)}</dt><dd>${r.href ? `<a href="${esc(r.href)}">${esc(r.v)}</a>` : esc(r.v)}</dd></div>`).join('');

  const navLinks = c.nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('');
  const navLinksM = c.nav.map((n, i) => `<li style="--i:${i}"><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('');

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<meta name="theme-color" content="#0B0B0C">
<link rel="canonical" href="${ORIGIN}${c.dir}">
${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}
<link rel="alternate" hreflang="is" href="${ORIGIN}/">
<link rel="alternate" hreflang="en" href="${ORIGIN}/en/">
<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.description)}">
<meta property="og:locale" content="${c.lang === 'is' ? 'is_IS' : 'en_GB'}">
<meta property="og:image" content="${ORIGIN}${c.dir}img/g1.webp">
<link rel="icon" href="${A}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${A}favicon-48.png" type="image/png" sizes="48x48">
<link rel="icon" href="${A}favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${A}apple-touch-icon.png">
<link rel="preload" href="${A}fonts/FamiljenGrotesk-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${A}fonts/BasierMono-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${A}img/g1.webp" fetchpriority="high">
<link rel="stylesheet" href="${A}styles.css">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body class="bk-loading">

<!-- THE REVEAL: the eladiodieste.com device (saved to memory 2026-08-05 as
     THE reference for premium opening reveals), rebuilt in vanilla CSS/JS.
     A slit clip-path opens dead centre on the LANDING'S OWN first photograph,
     the frame pushes back from 1.4x, his name flies in char by char, a rule
     draws, then the overlay hands off to the real landing underneath it,
     already painted identically. The reveal does not precede the design; it
     performs the design's own arrival once at full screen. -->
<div class="bk-load" id="load" aria-hidden="true">
  <div class="bk-load-clip" id="loadClip">
    <img class="bk-load-img" id="loadImg" src="${A}img/g1.webp" alt="" decoding="async" fetchpriority="high" style="object-position:62% 50%">
  </div>
  <div class="bk-load-veil"></div>
  <div class="bk-load-in">
    <h2 class="bk-load-h1">${chars(SITE.brand, 'span', 'bk-load-name')}</h2>
    <div class="bk-load-rule" id="loadRule"></div>
  </div>
</div>

<a class="bk-skip" href="#main">${esc(c.skip)}</a>

<header class="bk-hdr" id="hdr">
  <div class="bk-hdr-in">
    <a class="bk-hdr-home" href="${c.lang === 'is' ? './' : '../'}">
      <span class="bk-hdr-name">${esc(SITE.brand)}</span>
      <span class="reg bk-hdr-role">${esc(c.hero.role)}</span>
    </a>
    <nav class="bk-hdr-nav" aria-label="${c.lang === 'is' ? 'Aðalvalmynd' : 'Main'}"><ul>${navLinks}</ul></nav>
    <div class="bk-hdr-end">
      <a class="bk-hdr-lang reg" href="${esc(c.other.href)}" hreflang="${esc(c.other.code)}" lang="${esc(c.other.code)}">${esc(c.other.label)}</a>
      <a class="bk-hdr-cta reg" href="#samband">${esc(c.navCta)}</a>
      <button class="bk-burger" id="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="${c.lang === 'is' ? 'Opna valmynd' : 'Open menu'}"><span></span><span></span></button>
    </div>
  </div>
</header>

<div class="bk-menu" id="menu" hidden>
  <nav aria-label="${c.lang === 'is' ? 'Valmynd' : 'Menu'}"><ul class="bk-menu-list">${navLinksM}</ul></nav>
  <div class="bk-menu-foot reg">
    <a href="tel:${SITE.phoneTel}">${SITE.phone}</a>
    <a href="${esc(c.other.href)}" hreflang="${esc(c.other.code)}" lang="${esc(c.other.code)}">${esc(c.other.label)}</a>
  </div>
</div>

<main id="main">

<!-- THE LANDING: a full-bleed rotation of his own frames. The photographs are
     the site, so they get the whole screen; the register beneath names what you
     are looking at, and it changes with the frame. -->
<!-- THE LANDING: one full-bleed photograph, his Sisimiut work for 66°North,
     rotating. The lead frame is mutual definition in a single image, so the
     landing states the whole site before a word is read. -->
<section class="bk-land" id="hero">
  <div class="bk-rot" id="rot">
    ${c.rotation.map((r, i) => `
    <figure class="bk-rot-f${i === 0 ? ' is-on' : ''}" data-i="${i}" style="--fx:${r.fx}%">
      ${im(r.img, `${r.project}, ${r.place}`, 'bk-rot-img', i === 0 ? ' fetchpriority="high" loading="eager"' : '')}
    </figure>`).join('')}
    <div class="bk-rot-veil" aria-hidden="true"></div>
  </div>

  <div class="bk-land-in">
    <h1 class="bk-land-h1">${chars(SITE.brand, 'span', 'bk-land-name')}<span class="bk-sr-only">${esc(SITE.brand)}</span></h1>
    <p class="bk-land-line">${esc(c.hero.line)}</p>
  </div>

  <div class="bk-reg" aria-live="polite">
    <div class="bk-reg-l">
      <p class="reg bk-reg-label">${esc(c.hero.regLabel)}</p>
      ${c.rotation.map((r, i) => `
      <p class="bk-reg-i${i === 0 ? ' is-on' : ''}" data-i="${i}">
        <span class="bk-reg-p">${esc(r.project)}</span>
        <span class="reg bk-reg-c">${esc(r.client)}</span>
        <span class="reg bk-reg-m">${esc(r.place)}</span>
      </p>`).join('')}
    </div>
    <ol class="bk-rot-t" aria-hidden="true">
      ${c.rotation.map((r, i) => `<li class="bk-rot-tk${i === 0 ? ' is-on' : ''}" data-i="${i}"><span></span></li>`).join('')}
    </ol>
  </div>
</section>

<!-- ---------------------------------------------------------- the method -->
<section class="bk-me" id="adferdin">
  <div class="bk-wrap bk-me-head">
    <p class="reg bk-eyebrow">${esc(c.method.eyebrow)}</p>
    ${words(c.method.title, 'h2', 'bk-h2')}
    <p class="bk-lead">${esc(c.method.lead)}</p>
    <figure class="bk-me-q">
      <blockquote><p>${esc(c.method.quote)}</p></blockquote>
      <figcaption class="reg">${esc(c.method.source)}</figcaption>
    </figure>
    <p class="reg bk-me-cue">${esc(c.method.frameLabel)}</p>
  </div>
  <div class="bk-fr-l">${frames}</div>
</section>

<!-- ---------------------------------------------------------- the stories -->
<section class="bk-sts" id="verkin">
  <div class="bk-wrap">
    <p class="reg bk-eyebrow">${esc(c.storiesHead.eyebrow)}</p>
    ${words(c.storiesHead.title, 'h2', 'bk-h2')}
    <p class="bk-lead">${esc(c.storiesHead.lead)}</p>
    <div class="bk-st-l">${stories}</div>
  </div>
</section>

<!-- ---------------------------------------------------------- contact sheet -->
<section class="bk-sh" id="myndaskra">
  <div class="bk-wrap">
    <p class="reg bk-eyebrow">${esc(c.sheetHead.eyebrow)}</p>
    ${words(c.sheetHead.title, 'h2', 'bk-h2')}
    <p class="bk-lead">${esc(c.sheetHead.lead)}</p>
  </div>
  <ul class="bk-sh-l">${sheet}</ul>
</section>

<!-- ---------------------------------------------------------- about -->
<section class="bk-ab" id="um">
  <div class="bk-wrap">
    <p class="reg bk-eyebrow">${esc(c.about.eyebrow)}</p>
    ${words(c.about.title, 'h2', 'bk-h2')}
    <p class="bk-lead">${esc(c.about.bio)}</p>
    <dl class="bk-fa">${factRows}</dl>
    <p class="bk-ab-course"><span class="reg">${esc(c.about.courseLabel)}</span> ${esc(c.about.course)}
      <a class="bk-ib" href="${esc(c.about.courseHref)}" target="_blank" rel="noopener"><span>${esc(c.about.courseCta)}</span></a>
    </p>
  </div>
</section>

<!-- ---------------------------------------------------------- contact -->
<section class="bk-ct" id="samband">
  <div class="bk-wrap">
    <p class="reg bk-eyebrow">${esc(c.contact.eyebrow)}</p>
    ${words(c.contact.title, 'h2', 'bk-h2')}
    <p class="bk-lead">${esc(c.contact.lead)}</p>
    <dl class="bk-ct-l">${contactRows}</dl>
    <p class="bk-ct-btns">
      <a class="bk-ib bk-ib--solid" href="${esc(c.contact.cta.href)}"><span>${esc(c.contact.cta.label)}</span></a>
      <a class="bk-ib" href="${esc(c.contact.cta2.href)}"><span>${esc(c.contact.cta2.label)}</span></a>
    </p>
  </div>
</section>
</main>

<footer class="bk-ft">
  <div class="bk-wrap bk-ft-in">
    <div class="bk-ft-txt">${c.footer.lines.map((l) => `<p>${esc(l)}</p>`).join('')}</div>
    <div class="bk-ft-end reg">
      <p>${esc(c.footer.credit)}</p>
      <p class="bk-ft-note">${esc(c.footer.note)}</p>
    </div>
  </div>
</footer>

<script src="${A}app.js" defer></script>
</body>
</html>
`;
}
