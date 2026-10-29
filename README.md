# Peleton web

Static websites for the two Peleton shops in Handlová, built with [Astro](https://astro.build).
One project produces three independent sites:

| Site         | Domain                          | Source                  | Output             |
| ------------ | ------------------------------- | ----------------------- | ------------------ |
| Hub          | https://peleton.sk              | `src/sites/hub`         | `dist/hub`         |
| Bike shop    | https://sport.peleton.sk        | `src/sites/sport`       | `dist/sport`       |
| Car parts    | https://mototechna.peleton.sk   | `src/sites/mototechna`  | `dist/mototechna`  |

The hub is a small landing page for people who type `peleton.sk`. Its `.htaccess` also
301-redirects every old URL (`sport.php?contid=…`, `mototechna-*.php`) to the matching new page
and answers `410 Gone` for the old admin, editor and spam URLs, so search engines drop them.

## Commands

```sh
npm install
npm run dev:sport         # http://localhost:4321  (also dev:mototechna, dev:hub)
npm run build             # builds all three sites into dist/
npm run build:sport       # one site only
npm run check             # type check
npm run icons             # regenerate favicons + Open Graph images (after logo/colour changes)
```

Astro runs only one dev server per project – stop one before starting another.

## Where to change things

- **Contacts, opening hours, address, map** – `src/shared/data/business.ts`.
  Every page, footer and the structured data (JSON-LD) read from here.
  Keep name and address identical to the Google Business Profile of each shop.
- **Product categories** – `src/sites/<site>/data/sortiment.ts`
- **Page texts** – `src/sites/<site>/pages/*.astro`
- **Logo marks** – `src/shared/brand/marks.mjs` (then `npm run icons`)
- **Colours, fonts, spacing** – `src/shared/styles/global.css`
- **Photos** – `src/shared/assets/photos/<site>/`. Astro creates resized AVIF/WebP versions at build time.
- **Analytics** – Matomo site IDs in `src/shared/data/sites.ts`

## Deployment

Upload the **contents** of each output folder to the web root of its domain:

```
dist/hub/*         ->  peleton.sk web root (replaces the old site)
dist/sport/*       ->  folder of the sport.peleton.sk subdomain
dist/mototechna/*  ->  folder of the mototechna.peleton.sk subdomain
```

Include the hidden `.htaccess` file in each folder. Both subdomains need DNS records and an SSL
certificate in the hosting administration.

Before uploading the hub, **delete everything from the old peleton.sk web root** – the old PHP
site contains backdoors and must not stay on the server.

After the first deployment:

1. Google Search Console – add `sport.peleton.sk` and `mototechna.peleton.sk` as properties,
   submit `/sitemap-index.xml` of each, and keep the `peleton.sk` property to watch the redirects.
2. Google Business Profile – set the website of each shop to its subdomain.
