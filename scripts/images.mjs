// One-off: turns the venue's own photos in research/photos into web sizes in public/img,
// and the logo into favicons. Run with `npm run images`.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'research/photos';
const OUT = 'public/img';
const RICE = { r: 247, g: 241, b: 230, alpha: 1 };

const photos = [
  { id: 'chris-box', file: 'chris-with-fish-box_resy2023.jpg' },
  { id: 'torched', file: 'torched-nigiri-slate_resy2023.jpg' },
  { id: 'scallop', file: 'ig-2022-10-27_scallop.jpg' },
  { id: 'ageing', file: 'ig-2023-02-15_ageing-fish.jpg' },
  { id: 'osuimono', file: 'ig-2023-02-18_osuimono.jpg' },
  { id: 'tuna-loin', file: 'ig-2023-02-24_aged-tuna.jpg' },
  { id: 'ika', file: 'ig-2024-07-23_ika-nigiri.jpg' },
  { id: 'room', file: 'ichiban-ig-2021-12-04_room.jpg' },
  { id: 'ichiban-thai', file: 'ichiban-ig-2022-04-29_thai-dishes.jpg' },
  { id: 'ichiban-sashimi', file: 'ichiban-ig-2022-06-18_sashimi.jpg' },
  { id: 'ichiban-sushi', file: 'ichiban-ig-2021-12-14_sushi-platter.jpg' },
  { id: 'ichiban-katsu', file: 'ichiban-ig-2021-11-11_katsu-curry.jpg' },
  // The 2019 newsletter header is three hexagons; cut each nigiri out on its own.
  { id: 'prawn-2019', file: 'newsletter-2019_nigiri-trio.jpg', crop: { left: 615, top: 365, width: 1100, height: 720 } },
  { id: 'squid-2019', file: 'newsletter-2019_nigiri-trio.jpg', crop: { left: 2370, top: 365, width: 1100, height: 720 } },
  { id: 'whitefish-2019', file: 'newsletter-2019_nigiri-trio.jpg', crop: { left: 1500, top: 1222, width: 1100, height: 720 } },
];

const widths = [640, 1280];

await mkdir(OUT, { recursive: true });

for (const p of photos) {
  for (const w of widths) {
    let img = sharp(path.join(SRC, p.file)).rotate();
    if (p.crop) img = img.extract(p.crop);
    const meta = await img.clone().metadata();
    const width = Math.min(w, p.crop ? p.crop.width : meta.width);
    const base = img.resize({ width, withoutEnlargement: true });
    await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `${p.id}-${w}.jpg`));
    await base.clone().webp({ quality: 74 }).toFile(path.join(OUT, `${p.id}-${w}.webp`));
  }
  console.log('photo', p.id);
}

// Logo: transparent sticker for the page, plus icons cropped to the face so they read at 32px.
const LOGO = path.join(SRC, 'logo-current-nigiri.png');
await sharp(LOGO).resize({ width: 480 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo-480.png'));
await sharp(LOGO).resize({ width: 480 }).webp({ quality: 88 }).toFile(path.join(OUT, 'logo-480.webp'));

const face = { left: 330, top: 60, width: 1500, height: 1500 };
const faceOn = (size, bg) =>
  sharp(LOGO)
    .extract(face)
    .resize(size, size)
    .flatten({ background: bg });

await faceOn(32, RICE).png().toFile('public/favicon-32.png');
await faceOn(180, RICE).png().toFile('public/apple-touch-icon.png');
await faceOn(512, RICE).png().toFile('public/icon-512.png');
console.log('icons done');
