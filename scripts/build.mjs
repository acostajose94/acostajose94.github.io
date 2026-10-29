import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { transform } from 'lightningcss';
import { minify } from 'terser';
import sharp from 'sharp';
import config from '../tailwind.config.cjs';

// Generated files are committed, so GitHub Pages needs no build server or runtime CDN.
process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const pages = ['index.html', 'portafolio/index.html', 'experiencia/index.html', 'estudios/index.html', 'contacto/index.html', '404.html'];
const scripts = ['js/reference-designs.js', 'js/modern-designs.js', 'js/index.js'];
const cssSources = ['css/index.css', 'css/themes.css', 'css/references.css', 'css/modern-designs.css'];
const read = file => readFile(file, 'utf8');
const hash = value => createHash('sha256').update(value).digest('hex').slice(0, 12);
await Promise.all(['fonts/local', 'licenses', 'img/optimized'].map(dir => mkdir(dir, { recursive: true })));

const fonts = [
  ['@fontsource-variable/space-grotesk', 'Space Grotesk', 'space-grotesk-latin-wght-normal.woff2', '300 700'],
  ['@fontsource/ibm-plex-mono', 'IBM Plex Mono', 'ibm-plex-mono-latin-400-normal.woff2', '400'],
  ['@fontsource/ibm-plex-mono', 'IBM Plex Mono', 'ibm-plex-mono-latin-500-normal.woff2', '500'],
  ['@fontsource-variable/outfit', 'Outfit', 'outfit-latin-wght-normal.woff2', '100 900'],
  ['@fontsource/lato', 'Lato', 'lato-latin-400-normal.woff2', '400'],
  ['@fontsource/lato', 'Lato', 'lato-latin-700-normal.woff2', '700'],
  ['@fontsource/lato', 'Lato', 'lato-latin-900-normal.woff2', '900'],
  ['@fontsource-variable/roboto', 'Roboto', 'roboto-latin-wght-normal.woff2', '100 900'],
  ['@fontsource-variable/source-serif-4', 'Source Serif 4', 'source-serif-4-latin-wght-normal.woff2', '200 900'],
];
let fontCss = '';
for (const [pkg, family, file, weight] of fonts) {
  await copyFile(`node_modules/${pkg}/files/${file}`, `fonts/local/${file}`);
  await copyFile(`node_modules/${pkg}/LICENSE`, `licenses/${pkg.split('/')[1]}.txt`);
  fontCss += `@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:${weight};src:url('../fonts/local/${file}') format('woff2');}\n`;
}

// Only ship the SVG paths actually used, rather than two 270 KiB icon fonts.
const content = (await Promise.all([...pages, ...scripts].map(read))).join('\n');
const iconMetadata = JSON.parse(await read('node_modules/@fortawesome/fontawesome-free/metadata/icon-families.json'));
const aliases = new Map();
for (const [name, icon] of Object.entries(iconMetadata)) {
  for (const alias of [name, ...(icon.aliases?.names || [])]) aliases.set(alias, icon);
}
let iconCss = '.fas,.fab,.fa-solid,.fa-brands{display:inline-block;font-style:normal;line-height:1;vertical-align:-.125em}.fas::before,.fab::before,.fa-solid::before,.fa-brands::before{content:"";display:block;width:var(--icon-width,1em);height:1em;background-color:currentColor;-webkit-mask:var(--icon) center/contain no-repeat;mask:var(--icon) center/contain no-repeat}';
let iconCount = 0;
for (const name of [...new Set([...content.matchAll(/\bfa-([a-z0-9-]+)\b/g)].map(match => match[1]))].sort()) {
  if (['solid', 'brands', 'spin'].includes(name)) continue;
  const icon = aliases.get(name);
  const svg = icon?.svgs.classic.solid || icon?.svgs.classic.brands;
  if (!svg) throw Error(`Missing free SVG icon: ${name}`);
  const uri = encodeURIComponent(svg.raw).replace(/'/g, '%27');
  iconCss += `.fa-${name}{--icon:url("data:image/svg+xml,${uri}");--icon-width:${svg.width / svg.height}em}`;
  iconCount++;
}
await copyFile('node_modules/@fortawesome/fontawesome-free/LICENSE.txt', 'licenses/fontawesome.txt');
await copyFile('node_modules/swiper/LICENSE', 'licenses/swiper.txt');
await copyFile('node_modules/tailwindcss/LICENSE', 'licenses/tailwindcss.txt');

const utilities = await postcss([tailwind(config)]).process('@tailwind base;@tailwind components;@tailwind utilities;', { from: undefined });
const css = transform({
  filename: 'site.min.css',
  code: Buffer.from([utilities.css, fontCss, iconCss, await read('node_modules/swiper/swiper-bundle.min.css'), ...await Promise.all(cssSources.map(read))].join('\n')),
  minify: true,
}).code;
await writeFile('css/site.min.css', css);
const app = await minify((await Promise.all(scripts.map(read))).join('\n'), { format: { comments: false } });
if (!app.code) throw Error('Empty application bundle');
await writeFile('js/site.min.js', app.code);
const carousel = (await read('node_modules/swiper/swiper-bundle.min.js')).replace(/\/\/# sourceMappingURL=.*$/gm, '');
await writeFile('js/carousel.min.js', carousel);
const theme = (await minify(await read('js/theme-init.js'))).code;

for (const name of ['web-development-project', 'corporate-project', 'institutional-project']) {
  const source = `img/${name}.png`;
  for (const width of [480, 800, 1200]) {
    await sharp(source).resize({ width, height: Math.round(width * 9 / 16), fit: 'cover', position: 'top', withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(`img/optimized/${name}-${width}.webp`);
  }
  // Larger images are fetched only when opening an explicit preview.
  await sharp(source).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(`img/optimized/${name}-preview.webp`);
}
await sharp('img/references/coding-poster.jpg').resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile('img/optimized/coding-poster.webp');

for (const page of pages) {
  let html = await read(page);
  const root = page === '404.html' ? '/' : page === 'index.html' ? '' : '../';
  const isError = page === '404.html';
  const head = [
    '<!-- site:head -->',
    ...(isError ? [] : [`  <script>${theme}</script>`]),
    `  <link rel="stylesheet" href="${root}css/site.min.css?v=${hash(css)}">`,
    '  <!-- /site:head -->',
  ].join('\n');
  if (!html.includes('<!-- site:head -->')) throw Error(`Missing head markers: ${page}`);
  html = html.replace(/<!-- site:head -->[\s\S]*?<!-- \/site:head -->/, head);
  if (!isError) {
    const tags = [
      '<!-- site:scripts -->',
      ...(page === 'index.html' ? [`  <script defer src="${root}js/carousel.min.js?v=${hash(carousel)}"></script>`] : []),
      `  <script defer src="${root}js/site.min.js?v=${hash(app.code)}"></script>`,
      '  <!-- /site:scripts -->',
    ].join('\n');
    if (!html.includes('<!-- site:scripts -->')) throw Error(`Missing script markers: ${page}`);
    html = html.replace(/<!-- site:scripts -->[\s\S]*?<!-- \/site:scripts -->/, tags);
  }
  await writeFile(page, html);
}
console.log(`Built local CSS (${css.length} bytes), application JS (${app.code.length} chars), ${iconCount} SVG icons and responsive WebP images.`);
