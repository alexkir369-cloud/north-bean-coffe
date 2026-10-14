// Generates smaller copies of the photos in public/images for srcset (npm run images).
// Re-run after adding or replacing a photo; outputs are committed alongside the originals.
import { readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../public/images');
const WIDTHS = [480, 800];
const QUALITY = 78;
const generated = /-(\d+|mobile)\.webp$/;

// The hero always covers the full viewport height, so it gets a dedicated phone crop instead.
const skip = new Set(['hero-nyhavn-morning.webp']);

for (const file of readdirSync(dir).filter((f) => f.endsWith('.webp') && !generated.test(f) && !skip.has(f))) {
  const source = join(dir, file);
  const { width } = await sharp(source).metadata();
  for (const target of WIDTHS.filter((w) => w < width)) {
    const out = join(dir, file.replace(/\.webp$/, `-${target}.webp`));
    await sharp(source).resize({ width: target }).webp({ quality: QUALITY }).toFile(out);
    console.log(`${file} → ${target}px`);
  }
}

// Phones show only the left part of the hero (woman with coffee + canal), so they get a portrait crop.
await sharp(join(dir, 'hero-nyhavn-morning.webp'))
  .extract({ left: 110, top: 0, width: 560, height: 768 })
  .webp({ quality: QUALITY })
  .toFile(join(dir, 'hero-nyhavn-morning-mobile.webp'));
console.log('hero-nyhavn-morning.webp → mobile crop');
