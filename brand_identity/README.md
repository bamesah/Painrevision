# Handoff: PainRevision — Brand Identity

## Overview
**PainRevision** (painrevision.com) is an education resource for the **FFPMRCA** exam (Fellowship of the Faculty of Pain Medicine of the Royal College of Anaesthetists). It spans a website, social media, YouTube tutorials, online + physical courses, and — eventually — an MCQ revision app. Business model: **paid courses with some free content**.

This bundle is the **brand identity system**: the logo, color palette, typography, and usage rules. The job for Claude Code is to **build painrevision.com on top of this brand system** — translating these tokens and assets into the website's actual stack.

Brand personality: **modern & clean — clinical but approachable** (a good med-tech startup, with the warmth of Headspace and the rigour of Pastest). Tagline: **"One resource to pass your pain exams."**

---

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype brand-guidelines page (`PainRevision Brand Identity.html`) plus extracted SVG logo assets. They show the intended look of the brand; they are **not** production website code to copy directly.

The task is to **implement painrevision.com in a real codebase** using the brand system documented here. There is **no existing codebase yet**, so choose the most appropriate modern stack for a content + courses site (e.g. Next.js / Astro + Tailwind, or similar). Recreate the brand faithfully using that stack's conventions — turn the tokens below into CSS variables / a Tailwind theme, and use the SVG assets directly.

## Fidelity
**High-fidelity.** Colors, typography, the logo geometry, and spacing are final. Reproduce them exactly. The brand-guidelines HTML page itself is a *reference document* (you don't need to rebuild the guidelines page) — but every token, asset, and rule in it is production-ready.

---

## The Logo

### The mark — "The Revision Loop"
An **open ring** (revising again and again) with an **amber spark** resting in the gap at the top (the moment understanding clicks). This is the committed primary mark.

The exact SVG geometry (100×100 viewBox):
```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- open loop: a 32px-radius circle centred at 50,50, opened at the top -->
  <path fill="none" stroke="#F0623C" stroke-width="14" stroke-linecap="round"
        d="M68.35 23.79 A32 32 0 1 1 31.65 23.79"/>
  <!-- the spark -->
  <circle fill="#F5A524" cx="50" cy="13" r="8.5"/>
</svg>
```
Provided as files in `assets/`:
| File | Use |
|---|---|
| `logo-mark.svg` | Primary mark (coral loop + amber spark) |
| `logo-mark-reversed.svg` | On dark/ink backgrounds (white loop, amber spark) |
| `logo-mark-mono.svg` | Single-colour (ink) for 1-colour print |
| `logo-horizontal.svg` | Full horizontal lockup (mark + wordmark) |

> Note: `logo-horizontal.svg` references the `Plus Jakarta Sans` font in a `<text>` element. For guaranteed rendering on any surface, either ensure the font is available or convert the wordmark text to outlines/paths in your final asset pipeline. The mark-only SVGs have no font dependency.

### Wordmark
"**Pain**Revision" — one word, camel case. Split coloured: **"Pain" in ink (#241B16)**, **"Revision" in coral (#F0623C)**. Font: Plus Jakarta Sans, weight **800**, letter-spacing **-0.03em**. On dark backgrounds, "Pain" is white and "Revision" is amber (#F5A524). On coral backgrounds, the whole wordmark is white.

### Lockups
- **Horizontal** (default): mark left, wordmark right, gap ≈ 0.3× wordmark height.
- **Stacked**: mark above wordmark, centred — for square spaces.
- **Mark only**: avatars, app icon, favicon.

### App icon
Mark centred in a **rounded square (border-radius ≈ 24% of size)**. Hero version: coral gradient background `linear-gradient(155deg, #F47A4F, #E04A1F)` with a **white loop + #FBD9CC (coral tint) spark**. Alternates: ink gradient `linear-gradient(155deg, #352920, #1C1511)` with white loop + amber spark; and a light version (white bg, standard coral mark). Legible down to **56px**.

### Clearspace & don'ts
- **Clearspace**: keep clear space equal to the height of the spark (the dot) on all sides.
- **Minimum size**: 24px (digital).
- **Don't**: rotate, stretch/distort, recolour the mark, or place it on low-contrast backgrounds.

---

## Design Tokens

### Colors
| Token | Hex | oklch | Role |
|---|---|---|---|
| `--coral` | `#F0623C` | `oklch(.69 .163 41)` | **Primary** — logo, buttons, links |
| `--coral-deep` | `#D2491F` | `oklch(.59 .17 38)` | Hover / depth |
| `--coral-soft` | `#FBD9CC` | `oklch(.89 .045 40)` | Badges, soft fills, tints |
| `--amber` | `#F5A524` | `oklch(.79 .145 70)` | **Accent** — the spark, highlights |
| `--amber-soft` | `#FCE6BF` | — | Soft accent fills |
| `--ink` | `#241B16` | `oklch(.25 .015 55)` | Text & dark surfaces (warm espresso) |
| `--ink-soft` | `#3A2D25` | — | Slightly lifted dark text |
| `--stone` | `#7C7068` | `oklch(.55 .013 60)` | Secondary / muted text |
| `--stone-light` | `#A99E95` | — | Tertiary text, captions |
| `--cream` | `#FBF5EE` | `oklch(.97 .009 75)` | Page background |
| `--surface` | `#FFFFFF` | `oklch(1 0 0)` | Cards & surfaces |
| `--surface-warm` | `#FFFAF4` | — | Subtle warm surface |
| `--border` | `#EDE3D7` | — | Default borders |
| `--border-strong` | `#E0D3C4` | — | Stronger borders |

The palette is intentionally **warm** — coral nods to "pain" without alarming red; amber adds optimism; espresso + cream keep everything calm and readable rather than clinical-cold.

### Typography
Both load from Google Fonts.
- **Plus Jakarta Sans** — primary, for headings & body. Weights used: 300, 400, 500, 600, 700, 800 (+ italic 500).
- **IBM Plex Mono** — accent, for labels, codes, stats, and exam references like "FFPMRCA · MODULE 04 · 25 MCQ". Weights: 400, 500, 600.

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Type scale** (the system used throughout):
| Role | Font | Size | Weight | Letter-spacing | Notes |
|---|---|---|---|---|---|
| Display | Jakarta | clamp(46px, 9vw, 104px) | 800 | -0.04em | Hero only |
| Display (section) | Jakarta | clamp(30px, 4vw, 44px) | 800 | -0.025em | line-height 1.05 |
| Heading 1 | Jakarta | 30px | 800 | -0.025em | |
| Heading 2 | Jakarta | 23px | 700 | -0.02em | |
| Lead / large body | Jakarta | 18px | 400–500 | — | color: stone |
| Body | Jakarta | 16–17px | 400 | — | line-height 1.5–1.6 |
| Label / eyebrow | **IBM Plex Mono** | 12–13px | 500 | +0.14em–0.18em | UPPERCASE, coral |

### Spacing, radius, shadow
| Token | Value | Use |
|---|---|---|
| Section vertical padding | `100px` (desktop) | between major sections |
| Container max-width | `1120px` | `--maxw` |
| Container side padding | `32px` | |
| Grid gap | `24px` | card grids |
| `--r` (card radius) | `18px` | cards, large surfaces |
| Pill / chip radius | `999px` | pills, badges, buttons |
| Inner radius | `11–14px` | options, small cards |
| App-icon radius | `24%` of size | rounded-square icon |
| `--shadow` | `0 1px 2px rgba(36,27,22,.04), 0 18px 40px -22px rgba(36,27,22,.22)` | raised cards |
| `--shadow-sm` | `0 1px 2px rgba(36,27,22,.05), 0 8px 20px -14px rgba(36,27,22,.18)` | resting cards |

Shadows are tinted with the warm ink color (not neutral grey) — keep that.

### Ready-to-use CSS variables block
```css
:root{
  --coral:#F0623C; --coral-deep:#D2491F; --coral-soft:#FBD9CC;
  --amber:#F5A524; --amber-soft:#FCE6BF;
  --ink:#241B16; --ink-soft:#3A2D25;
  --stone:#7C7068; --stone-light:#A99E95;
  --cream:#FBF5EE; --surface:#FFFFFF; --surface-warm:#FFFAF4;
  --border:#EDE3D7; --border-strong:#E0D3C4;
  --shadow:0 1px 2px rgba(36,27,22,.04), 0 18px 40px -22px rgba(36,27,22,.22);
  --shadow-sm:0 1px 2px rgba(36,27,22,.05), 0 8px 20px -14px rgba(36,27,22,.18);
  --r:18px; --maxw:1120px;
  --san:'Plus Jakarta Sans', system-ui, sans-serif;
  --mono:'IBM Plex Mono', ui-monospace, monospace;
}
```

---

## Interactions & Behavior (from the reference page)
These are brand-level motion cues to carry into the site:
- **Logo draw-in**: on first load, the loop animates by drawing its stroke (`stroke-dasharray`/`dashoffset`, ~1.15s, ease `cubic-bezier(.5,0,.2,1)`), then the spark pops in (scale 0→1, ~0.5s, ease `cubic-bezier(.2,1.4,.4,1)`) at ~1s. Optional but on-brand for a splash/hero.
- **Scroll reveal**: sections fade + rise (`translateY(22px)` → 0, opacity 0→1, ~0.7s) via IntersectionObserver at ~12% threshold.
- **Card hover**: lift `translateY(-4px)` and swap `--shadow-sm` → `--shadow`, ~0.25s.
- **Nav links hover**: text → ink, background → warm surface, pill radius, ~0.2s.
- Respect `prefers-reduced-motion` in the real build.

---

## Screens / Views
This bundle does **not** include website page designs — only the brand system. When building the site, apply the system above. Suggested first pages (confirm with the owner): Home, Courses (paid + free), a single Course page, About, and a YouTube/resources hub. The MCQ app is a later phase.

A small set of **brand applications** are mocked in the reference HTML for flavour and can guide tone:
- **YouTube banner**: coral radial-gradient background, white mark + wordmark left-aligned, tagline beneath.
- **Social avatars**: mark-only in a circle, in coral / ink / light variants.
- **MCQ app home screen**: question card with mono question label (coral), multiple-choice options where the correct/selected option uses `--coral-soft` fill + `--coral-deep` text, and a coral progress bar.

---

## Assets
All in `assets/`:
- `logo-mark.svg`, `logo-mark-reversed.svg`, `logo-mark-mono.svg`, `logo-horizontal.svg`
- No raster images or third-party icons are required by the brand core. If you add an icon set for the site UI, pick one with a friendly, rounded geometric feel to match the mark's round stroke caps (e.g. Lucide, Phosphor).
- Fonts are loaded from Google Fonts (see link tag above); no font files are bundled.

## Files
- `PainRevision Brand Identity.html` — the full brand-guidelines reference page (logo concepts, anatomy, lockups, app icons, clearspace/don'ts, color, type, applications). Open in a browser to see everything rendered.
- `assets/*.svg` — extracted, production-ready logo files.
- This `README.md` — self-sufficient brand spec.

---

## Notes for the developer
- Recreate the brand exactly from the tokens above; the HTML is a reference, not the shipping codebase.
- Wire the color tokens into your framework's theme (CSS vars or Tailwind `theme.extend`) so they're used consistently.
- Keep shadows warm-tinted and corners soft — that softness is what makes a clinical exam brand feel approachable.
- The mark must never be rotated, stretched, or recoloured; honour the 24px minimum and spark-height clearspace.
