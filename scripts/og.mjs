// One-off: builds public/og.jpg (1200×630) for link previews from Kurisu's own
// torched-nigiri photo, with the logo on it. Run with `npm run og`.
import sharp from 'sharp';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const W = 1200;
const H = 630;
const RICE = '#f7f1e6';
const INK = '#42210b';
const TUNA = '#d33c4a';
const SPLIT = 740;

const FRAUNCES = 'scripts/fonts/Fraunces-Black-Soft.ttf';
const KARLA = 'scripts/fonts/Karla-Bold.ttf';

// Fonts aren't committed; fetch the static instances from Google Fonts on first run.
async function ensureFont(file, family) {
  if (existsSync(file)) return;
  await mkdir('scripts/fonts', { recursive: true });
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}`, { headers: { 'User-Agent': 'Wget/1.0' } })).text();
  const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`No TTF found for ${family}`);
  await writeFile(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
}
await ensureFont(FRAUNCES, 'Fraunces:opsz,wght,SOFT@144,900,100');
await ensureFont(KARLA, 'Karla:wght@700');

// The nigiri sits around (800, 600) in the 1600×1128 original; crop around it.
const photo = await sharp('research/photos/torched-nigiri-slate_resy2023.jpg')
  .extract({ left: 290, top: 176, width: 980, height: 834 })
  .resize(SPLIT, H)
  .toBuffer();

const logo = await sharp('research/photos/logo-current-nigiri.png').resize({ height: 318 }).toBuffer();
const logoMeta = await sharp(logo).metadata();

const text = (markup, fontfile, width) =>
  sharp({ text: { text: markup, fontfile, width, rgba: true, dpi: 72, align: 'centre', spacing: -14 } }).png().toBuffer();

const name = await text(
  `<span foreground="${INK}" font="Fraunces 144pt SuperSoft Black 66">Kurisu\nOmakase</span>`,
  FRAUNCES,
  420,
);
const line = await text(
  `<span foreground="${TUNA}" font="Karla Bold 25" letter_spacing="1200">EIGHT SEATS · BRIXTON</span>`,
  KARLA,
  420,
);

const panelCentre = SPLIT + (W - SPLIT) / 2;
const nameMeta = await sharp(name).metadata();
const lineMeta = await sharp(line).metadata();

const rule = Buffer.from(`<svg width="8" height="${H}"><rect width="8" height="${H}" fill="${INK}"/></svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: RICE } })
  .composite([
    { input: photo, left: 0, top: 0 },
    { input: rule, left: SPLIT - 4, top: 0 },
    { input: logo, left: Math.round(panelCentre - logoMeta.width / 2), top: 34 },
    { input: name, left: Math.round(panelCentre - nameMeta.width / 2), top: 370 },
    { input: line, left: Math.round(panelCentre - lineMeta.width / 2), top: 370 + nameMeta.height + 16 },
  ])
  .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile('public/og.jpg');

const meta = await sharp('public/og.jpg').metadata();
const { size } = await stat('public/og.jpg');
console.log(`og.jpg ${meta.width}×${meta.height}, ${(size / 1024).toFixed(1)} KB, ${meta.format}`);
