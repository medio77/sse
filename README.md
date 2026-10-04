# رَوَق (Ravaq)

A static, research-oriented digital archive of Hafez's ghazals.

The **poem is the central entity**. Everything else in this project — manuscripts,
variant readings, sources, podcast episodes, metre, textual notes — will hang off
poems. None of it exists yet; this first version deliberately contains only poems.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · static export · GitHub Pages.
No backend, no database, no CMS, no runtime server.

## Data

The source of truth is `data/episodes.json`. Only two fields are read:

| field | use |
| --- | --- |
| `title` | the poem's **identifier**, its display title, and its URL |
| `description` | the poem's raw text |

Every other field in the JSON is ignored.

### Identity rule

A poem **is** its `title` string, verbatim. There is no surrogate ID and no slug.
The same exact string is used to identify the poem, display it, and build its route:

```text
می خواه و گل‌افشان کن از دهر چه می‌جویی؟ ۴۹۵
```

Only standard percent-encoding is applied to make it a valid URL path
(`/poems/%D9%85%DB%8C%20%D8%AE%D9%88%D8%A7%D9%87…`). The identifier itself is never
normalized, transliterated, slugified or shortened. See `src/lib/poems.ts`.

### Text fidelity

`description` is rendered as a single text node with `whitespace-pre-wrap`
(`src/components/poem/poem-text.tsx`). Nothing is corrected, normalized, trimmed
or stripped — spelling variants, emojis, metadata lines, blank lines and
punctuation all reach the browser byte-for-byte.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # static export to ./out
npm run serve     # preview ./out at http://localhost:4321
npm run typecheck
```

## Routes

| route | purpose |
| --- | --- |
| `/` | landing page and a short selection of poems |
| `/poems` | full index of every poem in the JSON |
| `/poems/<title>` | one poem: exact title, exact text, prev/next navigation |

## Deploying to GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds and publishes `out/`. For a
project page (`https://<user>.github.io/<repo>/`) set the repository variable
`NEXT_PUBLIC_BASE_PATH` to `/<repo>`. For a user/organization page leave it empty.
`npm run serve` reproduces the Pages behaviour locally (`foo/` → `foo/index.html`).

## Structure

```text
data/episodes.json          source of truth
src/lib/poems.ts            the poem model, lookup and route helper
src/components/poem/        poem-specific components (not generic cards)
src/app/                    routes
```

## Adding future entities

Related entities should attach to a poem by its `title`, keyed through
`src/lib/poems.ts`. Keeping identity in one module means a manuscript or variant
model can be added without touching routing or the data layer.
