# Design System: BALDUR KRISTJÁNS — Mutual Definition

Design read: portfolio site for one of Iceland's best-known editorial and commercial
photographers, aimed at art directors and agencies who hire him, in a dark
press-archive language, built around the sentence he already uses to describe his
own method.
Dials: VARIANCE 7 · MOTION 6 · DENSITY 5.

## 1. The concept — his words, verbatim from his own About page

> "In my work, I strive to capture intimate, revealing moments. I am fascinated by
> humans, and often try to relay their stories through environmental portraiture.
> This process involves joining people for long periods of time in an environment
> where they feel relaxed and at home. The desired result is sort of a
> **'mutual definition,'** if you will, where the subject and its surroundings shed
> light on each other and reflect one another."

**„Mutual definition" is the whole design.** He does not photograph people against
backdrops; he photographs people and their surroundings explaining each other. His
Mumbai frame from *East of the Mountain* is the proof: a shoemaker seated in front of
a wall of two hundred shoes. Remove either half and the picture means nothing.

## 2. THE SIGNATURE: the frame that widens

Every hero frame opens **cropped tight to the subject** and, on scroll, **widens to
the full photograph** to reveal the environment that defines them. His working method,
performed by the page.

- The caption resolves in two beats with the frame: first the **person**, then the
  **place**. `Shoemaker` → `Shoemaker, Mumbai`.
- It is a CLIP, never a scale, so no pixel is ever invented and the photograph is
  never cropped-in past its own resolution.
- Reversible by construction (scroll back and the frame closes again), which is what
  proves it is scrubbed rather than a one-shot.
- Reduced motion: the full frame, open, immediately.

Nothing else on the page competes with this. One idea, his.

## 3. Anti-convergence against the two builds shipped this week

| | Orr | Fríða | Baldur |
|---|---|---|---|
| ground | cool grey sheet + navy | porcelain white | near-black press ground |
| engine | ERNA damped, horizontal journey | plate-to-card, vertical chapters | the widening frame |
| signature | pointer tilt on a loose stone | wordmark inverts over the card | crop opens to environment |
| type | Bodoni + Apfel Grotezk | Cabinet Grotesk + Switzer | Familjen Grotesk + mono (verify Icelandic first) |
| index | catalogue rows | accession entries | CONTACT SHEET |

All classes and keyframes prefixed `bk-`.

## 4. Second device: the index IS a contact sheet

He is a press photographer, so his index should be the object press photographers
actually use. 52 of his 83 projects expose a real 640x426 thumbnail, and **his own
site already tags every project with the commissioning client** (Grapevine x15,
EnnEmm x5, Kormákur & Skjöldur x4, Íslenska x4, Fíton x3, Jónsson & Le'Macks x3,
Brandenburg x2, 66°North, Össur/Nike, Vatikanið, Wonwei). That pairing is the data:
frame, title, client. Nothing invented.

## 5. Structure

`reveal → hero (the widening frame) → the method (his own quote) → 5 stories →
contact sheet (52 projects, real client tags) → who he is → hire him`

The five stories are the ones he wrote himself, kept verbatim and credited:
**East of the Mountain** (India, Nepal, Tibet, Vietnam, Cambodia, Dec 2009 to May
2010) · **Sisimiut** (66°North, Greenland) · **Milos Forman** (the Crocs and the
cigar) · **Baltasar Kormákur** (the PHOTO EXPRESS cover run to Hofsós) ·
**Jón Gnarr** (last shoot before he left office, "Inspired by Peter Sellers in
Being There"). His writing is funny and specific and is the best copy on the site.

## 6. Verified facts (his own site + dated third-party)

- **Baldur Kristjánsson**, works as *Baldur Kristjáns*. `baldur@baldurkristjans.is`,
  **+354 694 2222**.
- Photographer since age 12; **earning a living since 2005**; **Baldur Kristjáns ehf
  since 2005** and **photographer for Reykjavík Grapevine since January 2007, both
  listed as Present** (LinkedIn).
- Editorial in **The New York Times** and **Der Spiegel**.
- Commercial for **Nike, Landsbankinn, Síminn, Coca Cola, Spotify**.
- No formal training. Assisted **Ari Magg** for 18 months, then shot at his studio
  for another 18.
- **ACTIVITY GATE PASSED:** he currently teaches a 14-lecture photography course on
  **frami.is** (19.900 kr single / 29.900 kr annual), where he is described as
  "einn af þekktustu ljósmyndurum þjóðarinnar". Frami menntun ehf, kt. 590219-1420.

## 7. Assets — the honest position

- 83 projects; **52 carry a real 640x426 thumbnail** (enough for the contact sheet).
- Full-size 2040px sets exist for **East of the Mountain (41)** and **Sisimiut (29)**,
  plus singles elsewhere. Cargo refuses anything above `_1020_2x`; `_2000`/`_2560`
  return 403, so **2040px is the ceiling and the design must not need more**.
- Some `_o.jpg` originals are AD LAYOUTS, not photographs (Sarah Reinertsen is a Nike
  tearsheet). Contact-sheet every asset and name what it shows before captioning it.
- The widening frame is sized so 2040px is always sufficient at full open.

## 8. Honesty model

Every story, client tag and biographical fact is his, quoted or dated. No invented
clients, no invented awards, no fabricated shoot locations. Where a project has no
story of his, it appears in the contact sheet only. Preview ships noindex +
canonical at the preview.

## 9. The pitch (measured 2026-08-11)

His current site is a **Cargo Collective template**: **452 crawlable words, no `<h1>`,
no meta description, zero JSON-LD**, and **the `Shop` link in his own navigation is a
live 404**. One of the country's best-known photographers, with New York Times and
Der Spiegel credits, is effectively invisible to search and sells nothing from his own
site while running a paid course on someone else's platform.
