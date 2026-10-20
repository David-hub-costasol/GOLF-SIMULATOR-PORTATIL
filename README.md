# CostaSol Golf website

Standalone static site for the CostaSol Golf event golf simulator, a sister brand of
CostaSol Beach & Baby Equipment.

- `src/data.mjs`: all content (brand, prices, towns, events, FAQ). Edit here.
- `src/templates.mjs`: page sections and layout.
- `assets/`: stylesheet, script, favicon. Put the photos in `assets/img/` as `hero.jpg`,
  `corporate.jpg`, `wedding.jpg` and `swing.jpg` (about 1680 px wide). Until they exist, each photo
  slot shows the green pin-flag placeholder.
- `build.mjs`: generates the site into `site/` (34 pages: ES and EN home, 8 towns, 4 event types,
  prices, FAQ, printable brochure, legal, 404, sitemap, robots).
- `marketing/`: launch plan, Google Business Profile texts, outreach messages, Instagram plan, SEO.

## Build

```bash
node build.mjs
```

Node 18+, no dependencies. Commit the regenerated `site/` folder.

## Deploy

The `site/` folder is the whole website. Any static host works:

- **Cloudflare Pages / Netlify:** connect the repository, build command `node build.mjs`
  (or none), output directory `site`.
- Set the real domain in `BRAND.domain` in `src/data.mjs` before building, so canonical URLs, the
  sitemap and social previews point to it.

## Analytics

The booking ticket fires `gtag("event", "generate_lead")` when a visitor sends it by WhatsApp or
email. Add the GA4 tag to `layout()` in `src/templates.mjs` once there is a measurement ID.
