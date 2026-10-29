// One Astro project, three static sites. PELETON_SITE picks which one is
// served/built (set by scripts/astro.mjs):
//   hub        -> https://peleton.sk             (rozcestník + presmerovania)
//   sport      -> https://sport.peleton.sk
//   mototechna -> https://mototechna.peleton.sk
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITES = {
  hub: { url: 'https://peleton.sk', port: 4320 },
  sport: { url: 'https://sport.peleton.sk', port: 4321 },
  mototechna: { url: 'https://mototechna.peleton.sk', port: 4322 },
};

const key = process.env.PELETON_SITE ?? 'sport';
if (!SITES[key]) {
  throw new Error(`Unknown PELETON_SITE "${key}". Use one of: ${Object.keys(SITES).join(', ')}`);
}

export default defineConfig({
  site: SITES[key].url,
  srcDir: `./src/sites/${key}`,
  publicDir: `./public/${key}`,
  outDir: `./dist/${key}`,
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { port: SITES[key].port },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
