<h1>Jose Ivan Acosta Figueroa - Peru - Lima </h1>
<p>Pagina web - Del curso de Html, CSS Y Javascript</p>

## Desarrollo y publicación

El portafolio y sus páginas profesionales son estáticos. Los archivos optimizados se incluyen en Git para que GitHub Pages no necesite Node ni servicios externos para mostrar los diseños.

Después de editar HTML, CSS, JavaScript o las capturas originales, usa Node 22 o posterior:

```powershell
npm ci
npm run build
npm test
```

- `tailwind.config.cjs`: clases y configuración de Tailwind compiladas antes de publicar, sin JavaScript de Tailwind en el navegador.
- `scripts/build.mjs`: genera `css/site.min.css`, `js/site.min.js`, `js/carousel.min.js`, `fonts/local/`, `img/optimized/` y las licencias en `licenses/`. Actualiza las versiones de los recursos y la selección temprana del diseño en los bloques `site:head` y `site:scripts` del HTML; no edites esos bloques a mano.
- Las capturas PNG se conservan como originales. Las tarjetas usan miniaturas WebP de 480/800/1200 px; las vistas previas completas se descargan solo al abrirlas.
- Los iconos utilizan únicamente los SVG necesarios de Font Awesome Free, sin descargar sus fuentes completas. Se conservan atribución y licencia. Las fuentes WOFF2 locales incluyen sus licencias OFL; Swiper conserva su licencia MIT.
- Los cambios generados también deben publicarse. No hace falta ejecutar npm en GitHub Pages. El minijuego independiente conserva su propia estructura.

Para ver el sitio localmente:

```powershell
python -m http.server 8000
```

Abre `http://localhost:8000/`. Ese servidor básico no comprime las respuestas: sus métricas de transferencia no equivalen a las de GitHub Pages. La caché HTTP y las cabeceras de seguridad las controla el alojamiento, no una etiqueta HTML.

Resultados y condiciones de la comparación: [PERFORMANCE.md](PERFORMANCE.md).
