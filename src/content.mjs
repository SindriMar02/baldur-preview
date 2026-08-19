import { sndrCredit } from '../../_tools/sndr-credit.mjs';

/* one definition of the credit and the disclaimer, shared by every build */
const CREDIT = sndrCredit({ nefnifall: 'Baldur Kristjánsson', eignarfall: 'Baldurs Kristjánssonar' });

// BALDUR KRISTJÁNS — all copy, is + en.
// Every biographical fact, project story, client tag, place and date below comes
// from baldurkristjans.is (his own About page, his own project pages, and the
// captions and filenames burned into his own photographs), read 2026-08-11.
// Nothing invented. No em-dashes.
//
// Activity gate: he currently teaches a 14-lecture photography course on frami.is
// (19.900 kr single / 29.900 kr annual). LinkedIn lists Baldur Kristjáns ehf from
// January 2005 and Reykjavík Grapevine from January 2007, both as Present.

import SHEET from './sheet.json' with { type: 'json' };

export const SITE = {
  brand: 'Baldur Kristjáns',
  legalName: 'Baldur Kristjánsson',
  company: 'Baldur Kristjáns ehf',
  email: 'baldur@baldurkristjans.is',
  phone: '694 2222',
  phoneTel: '+3546942222',
  origin: 'https://baldurkristjans.is',
  since: '2005',
  grapevineSince: '2007',
};

/* THE THESIS. His own sentence, from his own About page, unedited. */
const THESIS = {
  quote: 'The desired result is sort of a “mutual definition,” if you will, where the subject and its surroundings shed light on each other and reflect one another.',
  source: 'baldurkristjans.is, About',
};


/* THE LANDING ROTATION. His Sisimiut work for 66°North: a documentary series
   made in Sisimiut, GREENLAND, which is both a town and the name of the line he
   was shooting for. Chosen over the Asia series because this is the commercial
   commission an art director is hiring him for, and because the lead frame is
   mutual definition in a single image: a man in the cap he was photographing,
   with his own town behind him. Every filename is his; no place or date is
   asserted beyond what his own files carry. */
const rotation = [
  { img: 'g1.webp', label: 'Portrett', fx: 62 },
  { img: 'g2.webp', label: 'Bærinn',   fx: 50 },
  { img: 'g3.webp', label: 'Skíðin',   fx: 40 },
  { img: 'g4.webp', label: 'Dyrnar',   fx: 55 },
  { img: 'g5.webp', label: 'Stofan',   fx: 45 },
].map((r) => ({ ...r, project: 'Sisimiut', client: '66°North', place: 'Sisimiut, Grænland', date: '' }));
const rotationEn = rotation.map((r, i) => ({ ...r,
  label: ['Portrait','The town','The skier','The doorway','The living room'][i],
  place: 'Sisimiut, Greenland' }));

/* The five frames that carry the widening device: BALDUR'S KNIT TO THE MUSIC
   project (Ragga Eiríks + Stephen West knit designs, shot at KEX Hostel, 101
   Reykjavík), never his Asia street portraits. Focal points measured off each
   photo's own subject position, never centred by default. */
const frames = [
  {
    id: 'sofinn', img: 'k-green.webp', fx: 40, fy: 55,
    is: { who: 'Peysan', what: 'og sófinn hennar' },
    en: { who: 'The sweater', what: 'and its sofa' },
  },
  {
    id: 'thvottahusid', img: 'k-laundry.webp', fx: 50, fy: 45,
    is: { who: 'Peysan', what: 'og þvottahúsið' },
    en: { who: 'The sweater', what: 'and the laundry room' },
  },
  {
    id: 'skrifstofan', img: 'k-office.webp', fx: 82, fy: 55,
    is: { who: 'Fyrirsætan', what: 'og skrifstofan á KEX' },
    en: { who: 'The model', what: 'and the KEX office' },
  },
  {
    id: 'glugginn', img: 'k-bench.webp', fx: 55, fy: 62,
    is: { who: 'Peysan', what: 'og glugginn' },
    en: { who: 'The sweater', what: 'and the window' },
  },
  {
    id: 'gardurinn', img: 'k-yard.webp', fx: 80, fy: 48,
    is: { who: 'Trefillinn', what: 'og garðurinn á KEX' },
    en: { who: 'The scarf', what: 'and the KEX courtyard' },
  },
];
const FRAMES_META = { place: 'KEX Hostel, 101 Reykjavík', client: 'RaggaWest' };

/* His own project stories, verbatim. Kept in English because he wrote them in
   English; the surrounding page furniture is translated, his words are not. */
const stories = [
  {
    id: 'east', title: 'East of the Mountain', client: 'Asia',
    isTitle: 'Austur fyrir fjall',
    text: 'The show Austur fyrir fjall (“East of the Mountain”) consisted of photos that I shot during my backpacking trip through Asia, from December of 2009 until May of 2010. I traveled through India, Nepal, Tibet, Vietnam and Cambodia, having eye-opening experiences at every turn and photographing the people I encountered. I like to refer to these images as “environmental portraits,” as they depict the subjects going about their day-to-day lives in their natural environment.',
    img: 'h-pots.webp', fx: 60, fy: 62,
  },
  {
    id: 'milos', title: 'Milos Forman', client: 'Grapevine',
    text: 'Prior to shooting Milos Forman, I had no idea who he was or what he did. This was probably for the best, as the knowledge that I was contending with a legendary, Oscar-winning filmmaker would probably have made me nervous. Forman arrived on location donning a pair of Crocs, and I tried very hard to get him to remove the ghastly plastic shoes. He resisted with all his might, until I gave him a cigar that I had for some reason brought along.',
  },
  {
    id: 'baltasar', title: 'Baltasar Kormákur', client: 'Grapevine',
    text: 'A true PHOTO EXPRESS job. At the last minute, I flew to North Iceland and drove from there to Hofsós, where I shot director Baltasar Kormákur in record time. As he and his wife made me coffee, I processed and sent the photos off to Grapevine HQ. I flew back to Reykjavík that night, and was greeted with a still warm, fresh off the presses copy of Grapevine bearing my image on the cover.',
  },
  {
    id: 'gnarr', title: 'Jón Gnarr', client: 'Grapevine',
    text: 'The mayor of Reykjavík, Jón Gnarr, shot in front of the City Hall. His last photoshoot before he left office. Been there done that. Inspired by Peter Sellers in Being There.',
  },
  {
    id: 'gunnar', title: 'Gunnar Nelson', client: 'Grapevine',
    text: 'Rising UFC star Gunnar Nelson is without any doubt the coolest Icelander I have ever captured through my lens. And when I say cool, I don’t mean in a big, tough-guy kind of sense, more in the Zen one; Gunnar is cool, calm, and collected.',
  },
];

const facts = {
  is: [
    { k: 'Ferill', v: 'Ljósmyndari frá tólf ára aldri, í fullu starfi frá 2005.' },
    { k: 'Ritstjórnarefni', v: 'Verk hans hafa birst í The New York Times og Der Spiegel.' },
    { k: 'Auglýsingar', v: 'Nike, Landsbankinn, Síminn, Coca Cola og Spotify.' },
    { k: 'Nám', v: 'Ekkert formlegt. Aðstoðarmaður Ara Magg í átján mánuði og ljósmyndari á stofunni hans í aðra átján.' },
    { k: 'Grapevine', v: 'Ljósmyndari Reykjavík Grapevine frá janúar 2007.' },
  ],
  en: [
    { k: 'Career', v: 'A photographer since the age of twelve, working full time since 2005.' },
    { k: 'Editorial', v: 'His work has appeared in The New York Times and Der Spiegel.' },
    { k: 'Commercial', v: 'Nike, Landsbankinn, Síminn, Coca Cola and Spotify.' },
    { k: 'Education', v: 'None formal. Assistant to Ari Magg for eighteen months, then a photographer at his studio for another eighteen.' },
    { k: 'Grapevine', v: 'Photographer for Reykjavík Grapevine since January 2007.' },
  ],
};

const BIO = {
  is: 'Baldur hefur verið ljósmyndari frá því hann var tólf ára en fór ekki að lifa af því fyrr en 2005. Hann sérhæfir sig í umhverfisportrettum: hann ver löngum tíma með fólki þar sem því líður vel og heima hjá sér, og lætur manneskjuna og umhverfið skýra hvort annað.',
  en: 'Baldur has been a photographer since he was twelve, but did not earn a living from it until 2005. He works in environmental portraiture: joining people for long periods in a place where they feel at home, and letting the person and the surroundings explain one another.',
};

export const COPY = {
  is: {
    lang: 'is', dir: '/', other: { code: 'en', href: '/en/', label: 'EN' },
    title: 'Baldur Kristjáns | Umhverfisportrett og auglýsingaljósmyndun',
    description:
      'Baldur Kristjáns er ljósmyndari í Reykjavík. Umhverfisportrett fyrir The New York Times, Der Spiegel, Nike, Landsbankann, Símann, Coca Cola og Spotify. Verk frá 2005.',
    skip: 'Fara beint í efni',
    nav: [
      { href: '#adferdin', label: 'Aðferðin' },
      { href: '#verkin', label: 'Verkin' },
      { href: '#um', label: 'Um Baldur' },
      { href: '#samband', label: 'Samband' },
    ],
    navCta: 'Hafa samband',
    hero: {
      role: 'Ljósmyndari',
      line: 'Manneskjan og umhverfið skýra hvort annað',
      meta: ['Reykjavík', 'frá 2005'],
      cue: 'Skrunaðu og rammin víkkar',
      regLabel: 'Úr myndasafninu',
      note: 'Umhverfisportrett fyrir The New York Times, Der Spiegel, Nike, Landsbankann, Símann, Coca Cola og Spotify.',
    },
    method: {
      eyebrow: 'Aðferðin',
      title: 'Mutual definition',
      lead: 'Baldur myndar ekki fólk fyrir framan bakgrunn. Hann myndar fólk og umhverfið sem útskýrir það. Hann orðar það svona sjálfur:',
      quote: THESIS.quote, source: THESIS.source,
      frameLabel: 'Rammin víkkar',
    },
    rotation,
    frames: frames.map((f) => ({ ...f, ...f.is, place: FRAMES_META.place, client: FRAMES_META.client })),
    storiesHead: { eyebrow: 'Verkin', title: 'Fimm verk, hans eigin orð', lead: 'Textinn hér að neðan er hans, óbreyttur.' },
    stories,
    sheetHead: {
      eyebrow: 'Myndaskrá',
      title: `${SHEET.length} verk`,
      lead: 'Úr eigin verkaskrá Baldurs. Hvert verk er merkt þeim sem pantaði það, eins og hann merkir þau sjálfur.',
      clientLabel: 'Verkkaupi',
    },
    about: {
      eyebrow: 'Um Baldur', title: 'Baldur Kristjánsson', bio: BIO.is,
      facts: facts.is,
      courseLabel: 'Kennsla',
      course: 'Baldur kennir ljósmyndun í fjórtán fyrirlestrum á frami.is.',
      courseCta: 'Námskeiðið á frami.is', courseHref: 'https://frami.is/ljosmyndun',
    },
    contact: {
      eyebrow: 'Samband', title: 'Hafa samband',
      lead: 'Fyrirspurnir um verkefni, verðhugmyndir og laus tímabil.',
      rows: [
        { k: 'Netfang', v: 'baldur@baldurkristjans.is', href: 'mailto:baldur@baldurkristjans.is' },
        { k: 'Sími', v: '694 2222', href: 'tel:+3546942222' },
        { k: 'Staðsetning', v: 'Reykjavík, Ísland' },
      ],
      cta: { label: 'Senda póst', href: 'mailto:baldur@baldurkristjans.is' },
      cta2: { label: 'Hringja í 694 2222', href: 'tel:+3546942222' },
    },
    footer: {
      lines: ['Baldur Kristjáns', 'Ljósmyndari, Reykjavík', 'baldur@baldurkristjans.is'],
      ...CREDIT.is,
    },
  },

  en: {
    lang: 'en', dir: '/en/', other: { code: 'is', href: '/', label: 'ÍS' },
    title: 'Baldur Kristjáns | Environmental portraiture and commercial photography',
    description:
      'Baldur Kristjáns is a photographer in Reykjavík. Environmental portraiture for The New York Times, Der Spiegel, Nike, Landsbankinn, Síminn, Coca Cola and Spotify. Working since 2005.',
    skip: 'Skip to content',
    nav: [
      { href: '#adferdin', label: 'The method' },
      { href: '#verkin', label: 'The work' },
      { href: '#um', label: 'About' },
      { href: '#samband', label: 'Contact' },
    ],
    navCta: 'Get in touch',
    hero: {
      role: 'Photographer',
      line: 'The person and the place explain each other',
      meta: ['Reykjavík', 'since 2005'],
      cue: 'Scroll and the frame widens',
      regLabel: 'From the archive',
      note: 'Environmental portraiture for The New York Times, Der Spiegel, Nike, Landsbankinn, Síminn, Coca Cola and Spotify.',
    },
    method: {
      eyebrow: 'The method',
      title: 'Mutual definition',
      lead: 'Baldur does not photograph people in front of backdrops. He photographs people and the surroundings that explain them. In his own words:',
      quote: THESIS.quote, source: THESIS.source,
      frameLabel: 'The frame widens',
    },
    rotation: rotationEn,
    frames: frames.map((f) => ({ ...f, ...f.en, place: FRAMES_META.place, client: 'Knit to the Music' })),
    storiesHead: { eyebrow: 'The work', title: 'Five projects, in his own words', lead: 'The text below is his, unedited.' },
    stories,
    sheetHead: {
      eyebrow: 'Contact sheet',
      title: `${SHEET.length} projects`,
      lead: 'From Baldur’s own index. Each project carries the client who commissioned it, exactly as he tags them himself.',
      clientLabel: 'Client',
    },
    about: {
      eyebrow: 'About', title: 'Baldur Kristjánsson', bio: BIO.en,
      facts: facts.en,
      courseLabel: 'Teaching',
      course: 'Baldur teaches photography in fourteen lectures on frami.is.',
      courseCta: 'The course on frami.is', courseHref: 'https://frami.is/ljosmyndun',
    },
    contact: {
      eyebrow: 'Contact', title: 'Get in touch',
      lead: 'Enquiries about commissions, estimates and availability.',
      rows: [
        { k: 'Email', v: 'baldur@baldurkristjans.is', href: 'mailto:baldur@baldurkristjans.is' },
        { k: 'Telephone', v: '+354 694 2222', href: 'tel:+3546942222' },
        { k: 'Based in', v: 'Reykjavík, Iceland' },
      ],
      cta: { label: 'Send an email', href: 'mailto:baldur@baldurkristjans.is' },
      cta2: { label: 'Call +354 694 2222', href: 'tel:+3546942222' },
    },
    footer: {
      lines: ['Baldur Kristjáns', 'Photographer, Reykjavík', 'baldur@baldurkristjans.is'],
      ...CREDIT.en,
    },
  },
};

export { SHEET };
