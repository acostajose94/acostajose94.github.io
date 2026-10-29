# Optimización de carga — 28 de octubre de 2026

## Cambios

- Tailwind 3.4.17 compilado durante el build; eliminado su compilador en tiempo de ejecución.
- Una hoja CSS local minificada, sin `@import` de Google Fonts ni estilos de CDN. Fuentes WOFF2 locales con `font-display: swap`; precarga únicamente de las fuentes iniciales del diseño seleccionado.
- Font Awesome Free reducido a los 48 iconos SVG utilizados, como máscaras CSS. No se descargan sus dos fuentes completas. Licencias y atribución en `licenses/`.
- Scripts de aplicación agrupados y diferidos. Swiper local se carga solo en la portada, donde existen los carruseles.
- Miniaturas WebP responsivas, dimensiones explícitas y carga diferida declarada directamente en HTML. Las capturas completas solo se solicitan al ampliar; los originales se conservan como fuente del build.
- La portada oculta de C y el póster/video de B no se descargan anticipadamente en Original. El póster se optimizó a WebP.
- Selección persistente del diseño insertada antes del CSS, sin una petición bloqueante adicional. CSS y scripts generados llevan una versión basada en su contenido para evitar reutilizar una versión antigua tras un cambio.
- Paginación con botones nativos, etiquetas accesibles y áreas de 32 × 32 px, conservando los puntos visibles de 8 px. Corregidas las etiquetas del monograma y del selector; su ayuda se muestra fuera del botón.

## Comparación local reproducible

Lighthouse **13.6.0**, Chrome headless, configuración móvil y limitación simulada predeterminada. Se comparó la portada en **Original**, con almacenamiento nuevo, contra la revisión de Git previa a estos cambios. Ambas versiones se sirvieron localmente con compresión gzip de HTML/CSS/JS/SVG y caché de 600 s, para aproximar la entrega estática del alojamiento. Una ejecución de la versión anterior y dos de la optimizada, sin otras pruebas de navegador simultáneas. La tabla muestra la última ejecución:

| Métrica | Antes | Después |
| --- | ---: | ---: |
| Rendimiento | 63 | 98 |
| Accesibilidad | 97 | 100 |
| Prácticas recomendadas | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 3,2 s | 0,9 s |
| LCP | 3,2 s | 2,3 s |
| TBT | 690 ms | 60 ms |
| CLS | 0,005 | 0 |
| Speed Index | 7,8 s | 1,0 s |
| Transferencia | 7134 KiB | 266 KiB |

La ejecución optimizada anterior también obtuvo 98 en rendimiento, con LCP de 1,7 s. Esta variación ilustra por qué estos valores no sustituyen el informe público del usuario ni garantizan la misma puntuación en otros dispositivos, diseños o ejecuciones. La versión optimizada **no se publicó durante esta tarea**. Hay que repetir PageSpeed/Lighthouse tras desplegarla en GitHub Pages.

## Verificación adicional

- `npm test`: recursos locales y sus versiones, ausencia de CDN de presentación, miniaturas y presupuestos de tamaño, selección inicial/persistente, almacenamiento bloqueado y rutas absolutas de la página 404.
- Playwright: 40 combinaciones de cuatro diseños, cinco páginas y anchos de 390/1440 px. Sin imágenes rotas, desbordamiento horizontal ni errores JavaScript. Menús, vistas previas, selector y persistencia operativos.
- axe-core: cinco páginas profesionales en Original a 390 px, con las conexiones externas bloqueadas. Sin infracciones en las reglas WCAG A/AA ejecutadas. No equivale a una certificación completa ni a una auditoría de contraste de todas las variantes.
- No se enviaron formularios reales ni se modificaron los datos personales o la identidad visual.

## Límites del alojamiento

GitHub Pages fija el tiempo de caché y las cabeceras HTTP. Añadir `Cache-Control`, HSTS o políticas de aislamiento mediante etiquetas HTML o archivos de configuración de otro proveedor no las aplicaría. La reducción del tamaño transferido sí está implementada; cambiar esas políticas requiere un alojamiento o proxy que permita configurarlas.
