# دفترِ سخن (sse)

A static, research-oriented digital archive of Hafez's ghazals, built alongside the podcast **"صدای سخن عشق"** (Seda-ye Sokhan-e Eshq). The archive is independent and unofficial — it collects the poems as corrected/recited in the podcast and makes them browsable, readable, and linkable.

> **رَوَق (Ravaq)** is the project codename; the site itself is **دفترِ سخن — از شنیدن تا خواندن**, served at `daftaresokhan.ir`. Source: [`github.com/medio77/sse`](https://github.com/medio77/sse).

## The poem is the central entity

Everything — variant readings, sources, metre, textual notes — hangs off poems. This version contains **495 ghazals** and nothing else.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- Static export (`output: "export"`) with trailing slashes, deployed to GitHub Pages
- No backend, no database, no CMS, no runtime server
- Three Persian fonts: IranNastaliq, Vazirmatn, Noto Naskh Arabic ( Nastaliq + Vazirmatn available in the font picker)
- Right-to-left (`dir="rtl"`, `lang="fa"`)

## Data

The source of truth is `data/episodes.json` (495 poems). Each entry carries `title`, `description`, `sequence`, `sequence_fa`, `meter`, `published`, `duration`, `link`, `audio_url`, and `guid`. The app reads `title`, `description`, and `sequence`.

| field | use |
| --- | --- |
| `title` | the poem's **identifier**, its display title, and its URL |
| `description` | the poem's raw text (rendered byte-for-byte) |
| `sequence` | the ghazal number (e.g. `"495"`), used for display and sorting only |

### Identity rule

A poem **is** its `title` string, verbatim. There is no surrogate ID and no slug. The same exact string identifies the poem, displays it, and builds its route:

```text
می خواه و گل‌افشان کن از دهر چه می‌جویی؟ ۴۹۵
```

Only standard percent-encoding is applied to make it a valid URL path (`/poems/%D9%85%DB%8C%20…`). The identifier is never normalized, transliterated, slugified, or shortened. See `src/lib/poems.ts`.

### Text fidelity

`description` is rendered as a single text node with `whitespace-pre-wrap` (`src/components/poem/poem-text.tsx`). Nothing is corrected, normalized, trimmed, or stripped — spelling variants, punctuation, blank lines all reach the browser byte-for-byte.

On desktop the poem renders as **couplet pairs (bayt)**: the two hemistichs sit side by side with a `●` separator centered between them. On mobile each hemistich stacks on its own line with a dashed divider between couplets. The source text is never rewritten.

## Commands

```bash
npm install
npm run dev       # local dev server (Next.js)
npm run build     # static export to ./out
npm run serve     # preview ./out at http://localhost:4321 (scripts/serve-out.mjs)
npm run typecheck # tsc --noEmit
```

## Routes

| route | purpose |
| --- | --- |
| `/` | landing page: about text, podcast links (Telegram, Castbox), random poem, ghazal count |
| `/poems` | full index — a Ganjoor-style rhyme index grouped by the last letter of each rhyme, with an alphabetical letter bar |
| `/poems/<title>` | one poem: exact title, exact text, ghazal position, prev/next navigation |

## Deploying to GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds and publishes `out/` on every push to `main` (and on `workflow_dispatch`). It uses GitHub Pages deployment (`actions/deploy-pages`, `actions/upload-pages-artifact`).

For a project page (`https://<user>.github.io/<repo>/`) set the repository variable `NEXT_PUBLIC_BASE_PATH` to `/<repo>`. For a user/organization page leave it empty. `npm run serve` reproduces the Pages behaviour locally (`foo/` → `foo/index.html`).

## Structure

```text
data/episodes.json          source of truth (495 ghazals)
ravaq_episodes_metered.json metered episode export (not imported by the app)
public/fonts/               IranNastaliq, Vazirmatn, Noto Naskh Arabic
public/robots.txt           allows all crawlers, sitemap reference
public/sitemap.xml          497 URLs for SEO indexing
src/app/                    App Router routes (/, /poems, /poems/[title], not-found)
src/app/layout.tsx          root layout, metadata, viewport, RTL
src/app/globals.css         Tailwind v4 theme, design tokens
src/components/             site-header, site-footer, font-picker, random-poem, scroll-buttons
src/components/poem/        poem-text (couplet rendering), poem-list, rhyme-index
src/lib/poems.ts            poem model, lookup by title, route helper, ghazal number parsing
src/lib/font-local.ts       local font definitions
src/lib/utils.ts            cn() class-name helper
.github/workflows/deploy.yml GitHub Pages deployment
scripts/serve-out.mjs       static preview server for ./out
```

## Features

- **Landing page** — about text, podcast platform links (Telegram, Castbox), open-source / independent / non-official badges, link to the archive
- **Random poem** (`انتخاب تصادفی`) on the landing page
- **Font picker** (`قلم`) in the header — toggle between Nastaliq and Vazirmatn
- **Rhyme index** (`حرف آخر قافیه`) — Ganjoor-style alphabetical index grouped by the last letter of each rhyme, ordered by ghazal number, with a sticky-header-compensated letter bar
- **Scroll to top / scroll to bottom** floating buttons
- **Prev / next poem navigation** on each poem page
- **Couplet-pair rendering** with hemistich alignment on desktop, stacked dividers on mobile
- **Persian-script numerals** throughout (`tabular-fa`)
- **Accessibility** — skip-to-content link, focus styles, ARIA labels, semantic HTML
- **SEO** — metadata, Google site-verification tag, `sitemap.xml`, `robots.txt`

## Adding future entities

Related entities (manuscripts, variant readings, sources, textual notes) should attach to a poem by its `title`, keyed through `src/lib/poems.ts`. Keeping identity in one module means a new model can be added without touching routing or the data layer.

## Contributing

This is an independent, unofficial, open-source project maintained by a listener of the podcast. Contributions are welcome — see [`github.com/medio77/sse`](https://github.com/medio77/sse) for issues and pull requests. The archive has no formal affiliation with or endorsement from «صدای سخن عشق».
