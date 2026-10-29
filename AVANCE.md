# Avance del rediseño del portafolio

## Rendimiento — 28 de octubre de 2026

- Eliminados los CDN de presentación en las páginas profesionales y reemplazados por recursos locales generados con `npm run build`. Tailwind deja de compilar en el navegador; las fuentes y los iconos conservan sus licencias.
- Añadidas miniaturas WebP responsivas con carga diferida nativa y vistas previas completas bajo demanda. Se conservan los archivos originales como fuentes.
- Corregidas las áreas táctiles del carrusel y las etiquetas del monograma y del selector.
- Comparación móvil local con gzip: rendimiento **63 → 98**, LCP optimizado de **1,7–2,3 s** en dos ejecuciones, transferencia **7134 → 266 KiB**. Accesibilidad, prácticas recomendadas y SEO: **100**. No se publicó el sitio. Condiciones y límites: [PERFORMANCE.md](PERFORMANCE.md).
- Cinco pruebas automatizadas del build y 40 combinaciones funcionales verificadas. Las dependencias CDN descritas en los apartados históricos siguientes ya no se utilizan en las páginas profesionales.

## Nombres neutros — 28 de octubre de 2026

- Las variantes siguen llamándose Original, A, B y C. Sus identificadores internos son `original`, `network`, `contrast` y `campus`.
- Retirados los nombres y dominios de las webs de referencia de código, documentación, tarjetas y nombres de archivos. Se conservan las capturas, con rutas neutras, y los avisos sobre licencias.
- Una selección antigua cuyo identificador ya no sea válido vuelve a Original; la nueva selección se guarda normalmente.
- Verificados los cuatro diseños en cinco páginas a 390/1440 px (40 combinaciones): sin errores JavaScript, recursos locales rotos ni desbordamiento horizontal. Probados selector, menús, vistas previas, persistencia y recuperación ante valores no válidos.

## Estado actual — reproducción de las referencias

La adaptación anterior fue sustituida tras la aclaración del usuario: **se reproducen los estilos y las interacciones de los sitios de referencia, no solo sus colores sobre el diseño Original**.

- Diseño A: red de dos canvas nuevamente interactiva con mouse/clic/toque, resorte y colores originales; cabecera, ilustraciones, tarjetas, overlays, pie y contacto flotante de la referencia.
- Diseño B: puntero de 24/48 px y sus estados, cabecera transparente/amarilla, insignia animada, menú de 70vw, tipografía, títulos, tarjetas pastel y efectos de entrada/hover/arrastre de la referencia.
- Conservado el banner «JA.» aprobado y añadido un video de programación de Mixkit, optimizado y servido localmente, con control de pausa.
- Las reglas se separan en `css/references.css` y los comportamientos en `js/reference-designs.js`, para no mezclar los tres lenguajes visuales.

Procedencia de estilos y recursos, valores medidos, licencia del video y adaptaciones explícitas: **[REFERENCES.md](REFERENCES.md)**.

### Identidad personal

- Sustituidos los símbolos corporativos de las cabeceras por un monograma JA propio, común a las tres versiones y las cinco páginas del portafolio.
- Aplicado también a los pies de las variantes, al avatar de contacto y al favicon, incluyendo juego y página 404.
- Conservados el giro y revelado del nombre, los colores de cada tema, el puntero y las interacciones. El banner JA. aprobado no cambia.
- Las marcas de redes o tecnologías permanecen únicamente en ese contexto, no como identidad del sitio. Los proyectos de referencia usan títulos neutros; las capturas originales no se han retocado.

### Verificación de la reproducción

- Comparadas en navegador las dimensiones de la cabecera, del panel de menú y del puntero con las medidas de referencia del diseño B: 146 px de cabecera, 48 px de margen, panel de 1008 px a 1440 px y círculo de 24/48 px.
- Probados los cambios de contraste y símbolos, revelado del logo, cierre del menú, arrastre real de la galería, aparición de imágenes, vistas previas y navegación entre temas/páginas.
- Comprobado que el canvas cambia con el mouse y regenera los caminos al hacer clic, y que el video reproduce, pausa, se detiene fuera de pantalla y respeta movimiento reducido.
- Matriz de **75 combinaciones** (3 diseños, 5 páginas y anchos 320/390/768/1024/1440): sin desbordamientos, imágenes rotas, identificadores duplicados ni errores JavaScript; menús y modales operativos.
- Sintaxis JavaScript, referencias locales y `git diff --check` comprobados. No se enviaron mensajes reales ni se publicó el sitio.

## Adaptación anterior (histórico, sustituida) — 15 de octubre de 2026

Esta revisión sustituye los comportamientos descritos en la implementación inicial más abajo:

- Conservadas las tres identidades: Original violeta, A azul/cian y B negro/amarillo.
- Sustituidas las reglas globales por coincidencias parciales de clases y los numerosos `!important` por variables de tema y reglas acotadas a cada componente. Corregidos contrastes, etiquetas, campos, iconos, barras y estados de hover/foco.
- Unificada la cabecera en las cinco páginas, sin saltos de altura al desplazar. Menús adaptados a tableta/móvil y menú compacto de B también en escritorio.
- Corregidos tamaños de portada, separación entre bloques, contenido flexible y tarjetas de experiencia. Se conserva el orden de lectura al alternar diseños.
- Retirados el video industrial externo, el cursor artificial, la escritura progresiva, los pulsos, los rebotes y el avance automático de carruseles. La red de A ahora es estática, sin bucles de animación ni reacción a clics.
- Selector fijo compacto en la esquina inferior, con identificación del diseño, persistencia validada y aplicación antes de pintar también en páginas internas (`js/theme-init.js`).
- Vistas previas mediante botones accesibles, sin interferir con enlaces externos. Añadido el modal que faltaba en Portafolio; cierre visible, Escape, restauración y contención de foco, bloqueo del fondo y del desplazamiento.
- Corregida una capa decorativa del diseño Original que interceptaba clics. Los enlaces de diapositivas fuera de pantalla no reciben foco.

### Comprobaciones de esta revisión

- Chrome/Playwright: **75 combinaciones** de 3 diseños × 5 páginas × 5 anchos (320, 390, 768, 1024 y 1440 px), sin desbordamiento horizontal, imágenes locales rotas ni errores JavaScript.
- axe-core: **30 análisis** WCAG A/AA en móvil y escritorio, sin infracciones detectadas en las reglas automatizadas. Esto no equivale a una certificación de accesibilidad completa.
- Probados menús, modales, navegación por teclado, foco, persistencia, valores antiguos/no válidos y almacenamiento bloqueado, navegación a secciones y preferencia de movimiento reducido.
- Formulario probado con respuestas de éxito y error **simuladas**, sin enviar mensajes reales.
- Sintaxis JavaScript, identificadores HTML únicos y existencia de los recursos locales comprobados.
- Herramientas de auditoría instaladas temporalmente fuera del repositorio; no se añadieron dependencias de Node al sitio. No fue necesario instalar skills.

El sitio sigue usando los CDN existentes para Tailwind, Font Awesome, Swiper y fuentes de Google. La comprobación en navegador requiere conexión a esos servicios.

---

## Implementación inicial (histórico)

## Estado

Implementados tres modos de presentación con el contenido del portafolio:

1. **Original** — conserva el diseño violeta actual.
2. **A** — Lato, navegación blanca, azul `#3161A3`, cian `#00F8FF`, pie azul `#004C91` y portada con red animada interactiva en `#32E4B0`.
3. **B** — HelveticaNeueLTStd, amarillo `#FFDB00`, cabecera compacta con menú desplegable, portada audiovisual y cursor circular con estados de escala, contraste, suma y cierre.

El botón fijo a la derecha recorre los tres modos. La opción queda guardada en `localStorage` y se mantiene al navegar por las páginas internas. Las variantes conservan perfil, habilidades, formación, proyectos, aplicaciones, experiencia y contacto.

## Archivos principales

- `index.html`: selector, contenido común y recursos de portada.
- `css/themes.css`: estilos de las dos referencias; valores de color y tipografías comprobados en los sitios originales.
- `css/index.css`: estilos base del modo Original.
- `js/index.js`: alternancia persistente, animación de nodos/circuitos, estados del cursor y menú.
- `fonts/HelveticaNeueLTStd-Lt.otf` y `fonts/HelveticaNeueLTStd-Bd.otf`: tipografías del diseño B alojadas localmente.

El modo B utiliza una portada audiovisual. El modo A dibuja la red en canvas y reacciona al puntero y a los clics.

## Skills y herramienta instaladas

Instaladas globalmente para OpenCode en `~/.agents/skills/`:

- `frontend-design`
- `redesign-existing-projects`
- `industrial-brutalist-ui`
- `web-design-guidelines`
- `agent-browser`

También se instaló `agent-browser` y Chrome para la comprobación funcional del DOM.

## Verificaciones realizadas

- `node --check js/index.js` pasó.
- Las páginas `index.html`, `portafolio/`, `experiencia/`, `estudios/` y `contacto/` pasaron el análisis HTML.
- Comprobación funcional del ciclo Original → A → B → Original.
- Comprobados por DOM los colores, la cabecera, el canvas, la visibilidad del cursor, la apertura del menú y la persistencia de la selección.

## Probar localmente

Desde la raíz del proyecto:

```powershell
python -m http.server 8000
```

Abre `http://localhost:8000/` y pulsa el selector fijo a la derecha para cambiar de presentación.
