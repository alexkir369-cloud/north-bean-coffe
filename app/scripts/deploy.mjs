// Copies app/dist into the repository root (GitHub Pages serves main from root).
// Old build files in the root are removed first; app/, .nojekyll, README.md,
// IMAGE-SOURCES.md and everything else not matching the patterns below stay untouched.
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const rootDir = resolve(appDir, '..');
const distDir = join(appDir, 'dist');

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('app/dist/index.html not found — run "npm run build" first.');
  process.exit(1);
}

const isOldBuildFile = (name) =>
  name === 'index.html' ||
  name === 'favicon.svg' ||
  name === 'assets' ||
  name === 'images' ||
  /^index-.+\.(js|css)$/.test(name) ||
  /\.jpe?g$/i.test(name);

for (const name of readdirSync(rootDir)) {
  if (isOldBuildFile(name)) {
    rmSync(join(rootDir, name), { recursive: true, force: true });
    console.log(`removed  ${name}`);
  }
}

for (const name of readdirSync(distDir)) {
  cpSync(join(distDir, name), join(rootDir, name), { recursive: true });
  console.log(`copied   ${name}`);
}
