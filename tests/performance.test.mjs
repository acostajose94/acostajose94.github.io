import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const pages = ['index.html', 'portafolio/index.html', 'experiencia/index.html', 'estudios/index.html', 'contacto/index.html', '404.html'];
const read = file => readFile(path.join(root, file), 'utf8');

test('all portfolio pages serve local CSS/JS, with valid content hashes', async () => {
  for (const page of pages) {
    const html = await read(page);
    assert.doesNotMatch(html, /cdn\.tailwindcss|tailwind\.config|fonts\.googleapis|cdnjs\.cloudflare|cdn\.jsdelivr/);
    assert.equal((html.match(/rel="stylesheet"/g) || []).length, 1);
    for (const [, url] of html.matchAll(/(?:src|href)="([^"]+\.(?:css|js)\?v=[a-f0-9]+)"/g)) {
      const [file, query] = url.split('?');
      const local = file.startsWith('/') ? path.join(root, file.slice(1)) : path.resolve(root, path.dirname(page), file);
      const hash = createHash('sha256').update(await readFile(local)).digest('hex').slice(0, 12);
      assert.equal(query, 'v=' + hash, `Stale generated asset in ${page}: run npm run build`);
      if (file.endsWith('.js')) assert.ok(html.includes(`defer src="${url}"`));
    }
  }
  assert.doesNotMatch(await read('css/site.min.css'), /@import/);
});

test('image cards have native lazy loading, responsive sizes and separate previews', async () => {
  for (const page of ['index.html', 'portafolio/index.html']) {
    const html = await read(page);
    const cards = [...html.matchAll(/<img\b[^>]*data-preview="[^"]+"[^>]*>/g)];
    assert.equal(cards.length, 3);
    for (const [image] of cards) {
      assert.match(image, /loading="lazy"/);
      assert.match(image, /decoding="async"/);
      assert.match(image, /srcset="[^"]+480w[^\"]+800w[^\"]+1200w"/);
      assert.match(image, /width="1200" height="675"/);
    }
    assert.doesNotMatch(html, /<img[^>]+src="[^"]+-project\.png"/);
  }
  const html = await read('index.html');
  assert.doesNotMatch(html, /<video[^>]+\sposter=/);
  assert.match(html, /data-poster="img\/optimized\/coding-poster.webp"/);
});

test('generated thumbnails fit their declared dimensions and size budgets', async () => {
  for (const name of ['web-development-project', 'corporate-project', 'institutional-project']) {
    for (const width of [480, 800, 1200]) {
      const file = path.join(root, `img/optimized/${name}-${width}.webp`);
      const meta = await sharp(file).metadata();
      assert.equal(meta.width, width);
      assert.equal(meta.height, Math.round(width * 9 / 16));
      assert.ok((await stat(file)).size < 100 * 1024, `Oversized thumbnail: ${file}`);
    }
    await access(path.join(root, `img/optimized/${name}-preview.webp`));
  }
});

test('early theme selection handles defaults, saved values, legacy values and blocked storage', async () => {
  const code = await read('js/theme-init.js');
  for (const [saved, expected] of [[null, 'original'], ['network', 'network'], ['contrast', 'contrast'], ['campus', 'campus'], ['atelier', 'contrast'], ['classic', 'original'], ['invalid', 'original']]) {
    const links = [];
    const document = { documentElement: { dataset: {} }, createElement: () => ({}), head: { appendChild: link => links.push(link) } };
    runInNewContext(code, { document, localStorage: { getItem: () => saved } });
    assert.equal(document.documentElement.dataset.design, expected);
    assert.ok(links.every(link => link.rel === 'preload' && link.as === 'font' && link.href.startsWith('/fonts/local/')));
    assert.equal(links.length, expected === 'contrast' ? 0 : expected === 'network' ? 1 : 2);
    for (const link of links) await access(path.join(root, link.href.slice(1)));
  }
  const document = { documentElement: { dataset: {} }, createElement: () => ({}), head: { appendChild() {} } };
  runInNewContext(code, { document, localStorage: { getItem() { throw Error('Storage disabled'); } } });
  assert.equal(document.documentElement.dataset.design, 'original');
});

test('404 assets use absolute paths for deeply nested errors', async () => {
  const html = await read('404.html');
  assert.match(html, /href="\/css\/site\.min\.css\?v=/);
  assert.doesNotMatch(html, /<script/);
});
