// Generates favicons, web manifest and Open Graph images into public/<site>/.
// Run after changing the logo marks or colours:  npm run icons
import fs from 'node:fs';
import { createRequire } from 'node:module';
import opentype from 'opentype.js';
import sharp from 'sharp';
import { BIKE_VIEWBOX, CAR_VIEWBOX, COLORS, bikeMark, carMark } from '../src/shared/brand/marks.mjs';

sharp.cache(false);
const require = createRequire(import.meta.url);
const loadFont = (pkg, file) => {
  const buf = fs.readFileSync(require.resolve(`${pkg}/files/${file}`));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
// Fontsource splits each font into unicode subsets – load latin + latin-ext
const loadSubsets = (pkg, name, style) =>
  ['latin', 'latin-ext'].map((subset) => loadFont(pkg, `${name}-${subset}-${style}.woff`));
const fonts = {
  display: loadSubsets('@fontsource/barlow-condensed', 'barlow-condensed', '700-italic'),
  displayUpright: loadSubsets('@fontsource/barlow-condensed', 'barlow-condensed', '600-normal'),
  body: loadSubsets('@fontsource/barlow', 'barlow', '500-normal'),
};

// opentype.js' own toPathData() drops parts of some glyphs (e.g. "R"), so serialise by hand
const n = (v) => v.toFixed(2);
const pathData = (path) =>
  path.commands
    .map((c) => {
      if (c.type === 'Z') return 'Z';
      if (c.type === 'Q') return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
      if (c.type === 'C') return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
      return `${c.type}${n(c.x)} ${n(c.y)}`;
    })
    .join('');

/** Text as an SVG path, so the PNG does not depend on installed fonts */
function text(str, { font: subsets, size, x, y, fill, tracking = 0 }) {
  let cursor = x;
  let d = '';
  for (const ch of str) {
    const font = subsets.find((f) => f.charToGlyph(ch).index !== 0) ?? subsets[0];
    const glyph = font.charToGlyph(ch);
    d += pathData(glyph.getPath(cursor, y, size));
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  return `<path d="${d}" fill="${fill}"/>`;
}

const SITES = {
  sport: {
    name: 'Peleton Šport',
    marks: [{ viewBox: BIKE_VIEWBOX, svg: bikeMark(COLORS.paper, COLORS.sport) }],
    accent: COLORS.sport,
    sub: 'ŠPORT · BICYKLE · SERVIS',
    headline: 'Bicykle, servis a šport v Handlovej',
    domain: 'sport.peleton.sk',
  },
  mototechna: {
    name: 'Mototechna Peleton',
    marks: [{ viewBox: CAR_VIEWBOX, svg: carMark(COLORS.paper, COLORS.moto) }],
    accent: COLORS.moto,
    sub: 'MOTOTECHNA · AUTODIELY',
    headline: 'Autodiely a autoservis v Handlovej',
    domain: 'mototechna.peleton.sk',
  },
  hub: {
    name: 'Peleton Handlová',
    marks: [
      { viewBox: BIKE_VIEWBOX, svg: bikeMark(COLORS.paper, COLORS.sport) },
      { viewBox: CAR_VIEWBOX, svg: carMark(COLORS.paper, COLORS.moto) },
    ],
    accent: COLORS.sport,
    sub: 'ŠPORT A BICYKLE · MOTOTECHNA',
    headline: 'Dve predajne v Handlovej',
    domain: 'peleton.sk',
  },
};

const INK = '#16191c';

/** Square icon: mark centred on a rounded dark tile */
function iconSvg(site, size, { rounded = true } = {}) {
  const { viewBox, svg } = site.marks[0];
  const [, , vw, vh] = viewBox.split(' ').map(Number);
  const pad = size * 0.14;
  const scale = (size - pad * 2) / vw;
  const ty = (size - vh * scale) / 2;
  const r = rounded ? size * 0.22 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${r}" fill="${INK}"/>
    <g transform="translate(${pad} ${ty}) scale(${scale})">${svg}</g>
  </svg>`;
}

function ogSvg(site) {
  const W = 1200;
  const H = 630;
  const marks = site.marks
    .map(({ viewBox, svg }, i, all) => {
      const [, , vw] = viewBox.split(' ').map(Number);
      const w = all.length > 1 ? 330 : 400;
      const s = w / vw;
      const x = all.length > 1 ? 760 + i * 30 : 760;
      const y = all.length > 1 ? 120 + i * 230 : 190;
      return `<g transform="translate(${x} ${y}) scale(${s})">${svg}</g>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${INK}"/>
    <g transform="skewX(-30)" opacity="0.22">
      <rect x="760" y="120" width="900" height="12" rx="6" fill="${site.accent}"/>
      <rect x="900" y="150" width="700" height="12" rx="6" fill="${site.accent}" opacity="0.6"/>
    </g>
    <rect x="80" y="150" width="56" height="6" rx="3" fill="${site.accent}"/>
    ${text(site.sub, { font: fonts.displayUpright, size: 30, x: 152, y: 164, fill: site.accent, tracking: 4 })}
    ${text('PELETON', { font: fonts.display, size: 168, x: 74, y: 320, fill: COLORS.paper, tracking: 6 })}
    ${text(site.headline, { font: fonts.body, size: 40, x: 80, y: 400, fill: '#d7dbdf' })}
    ${text(site.domain, { font: fonts.body, size: 28, x: 80, y: 540, fill: '#a9b0b7' })}
    ${marks}
  </svg>`;
}

/** ICO container holding one PNG – supported by every browser */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

for (const [key, site] of Object.entries(SITES)) {
  const dir = new URL(`../public/${key}/`, import.meta.url);
  fs.mkdirSync(dir, { recursive: true });
  const write = (name, data) => fs.writeFileSync(new URL(name, dir), data);

  write('favicon.svg', iconSvg(site, 64));
  write('favicon.ico', pngToIco(await png(iconSvg(site, 64), 32), 32));
  write('apple-touch-icon.png', await png(iconSvg(site, 180, { rounded: false }), 180));
  write('icon-192.png', await png(iconSvg(site, 192), 192));
  write('icon-512.png', await png(iconSvg(site, 512), 512));
  write(
    'site.webmanifest',
    JSON.stringify(
      {
        name: site.name,
        short_name: site.name,
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: INK,
        background_color: INK,
        display: 'browser',
      },
      null,
      2,
    ),
  );
  write('og.png', await sharp(Buffer.from(ogSvg(site))).png({ compressionLevel: 9 }).toBuffer());
  console.log(`✓ public/${key}`);
}
