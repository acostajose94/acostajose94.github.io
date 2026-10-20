# Referencias visuales y multimedia

## Objetivo

Adaptar los componentes y las interacciones de las referencias con el **contenido y la identidad de José Acosta**. Las variantes públicas se llaman **A**, **B** y **C**; los nombres de las fuentes se documentan aquí únicamente para registrar su procedencia. **Original** tiene una dirección futurista propia y no utiliza el anterior diseño violeta.

Inspección de HTML, CSS, JavaScript y navegador realizada el **15 de octubre de 2026**.

## Sistemas Perú Web

- Sitio: <https://sistemasperuweb.com/>
- Estilos de referencia: <https://sistemasperuweb.com/css/estilos.css?v=1.4>
- Algoritmo de nodos: script inline de la portada, bloque `Animacion de inicio`.
- Ilustraciones de portada: `https://sistemasperuweb.com/img/diseno-web.png` y `https://sistemasperuweb.com/img/sistemas.png`, guardadas en `img/references/`.

Componentes reproducidos:

- Lato 400/700/900, azul `#3161A3`, cian `#00F8FF`, pie `#004C91`.
- Cabecera blanca de 106 px, contenedor de 1140 px, navegación en mayúsculas con hover azul redondeado y acceso social circular.
- Dos canvas, no un SVG: trayectorias `techy` con codos, cuadrícula de 100 px, líneas de fondo de 2 px y trazos activos verdes `#32E4B0` de 4 px. Resorte con `k = -8.5`, `b = -61` y masa/intervalo `200`.
- El movimiento horizontal del puntero cambia el progreso del trazo. Un clic o toque regenera las trayectorias desde ese punto. Se utilizan coordenadas locales para evitar el desfase del original al desplazar la página.
- Ilustraciones blancas de portada, etiquetas blancas redondeadas y botones «+» cian; tarjetas de servicios cian y de habilidades celestes; proyectos con overlay azul; pie por columnas y contacto flotante de WhatsApp con los datos del portafolio.

El dibujo se detiene al estabilizarse el resorte, salir del viewport, ocultarse la pestaña o cambiar de diseño. Con movimiento reducido se conserva la interacción de clic con un resultado estático.

## Tecnofil

- Sitio: <https://tecnofil.com.pe/es/>
- Tema de referencia: `https://tecnofil.com.pe/wp-content/themes/teampicol-tecnofil-institucional-12824b48d116/`
- Archivos inspeccionados: `style.css?v=1.2.3` y `concat.min.js?v=1.2.3`.
- Fuentes locales ya presentes: `fonts/HelveticaNeueLTStd-Lt.otf` y `fonts/HelveticaNeueLTStd-Bd.otf`.

Componentes reproducidos:

- HelveticaNeueLTStd, blanco/negro y amarillo `#FFDB00`; grandes títulos amarillos y tarjetas cuadradas en la gama pastel original.
- Cabecera transparente de 146 px a 1440 px de viewport, con 48 px de separación superior/lateral, monograma personal JA de 48 × 50 px y hamburguesa de 26 px. El monograma gira y revela el nombre del portafolio al pasar el puntero o recibir foco; no se utiliza la insignia de Tecnofil.
- Cabecera que se oculta al bajar, reaparece al subir y pasa a amarillo/negro fuera de la portada. En páginas sin portada comienza amarilla.
- Menú de 70vw con fondo de cobertura negro al 38 %, panel amarillo, textos Helvetica de 3.5vw a 1440 px, entradas escalonadas, submenú y dos enlaces cuadrados inferiores. En móvil ocupa el ancho completo.
- Puntero con contenedor de 48 px y círculo de 24 px, que crece a 48 px en controles; transición de .4 s y estados de contraste, «+», cierre y arrastre. A 981–1200 px se respeta la escala de 45/22.5 px del sitio fuente. Los iconos finos se dibujan con SVG en vez de distribuir Font Awesome Pro.
- El puntero sigue inmediatamente al mouse, sin retardo inventado. No se oculta el cursor nativo hasta que el personalizado esté listo, y no se activa en pantallas táctiles ni a 980 px o menos.
- Bloque de perfil con título único amarillo (`seccion__titulo`), sin segundo banner de imagen. Las especialidades usan una galería centrada, de ancho variable, arrastrable y circular, adaptando el comportamiento del slider de la referencia con Swiper ya disponible en la portada; no se agrega jQuery/Slick. Hay botones, teclado, posición anunciada y copias inactivas fuera de la navegación accesible. Al cambiar de diseño se restauran las tarjetas y su orden original. Las cifras mantienen la cuadrícula responsive original, sin slider; se amplían únicamente la altura de las tarjetas y la altura de línea de sus números para evitar recortes verticales. Productos/proyectos en cuadrícula con imágenes que aparecen al hover/foco durante .8 s; formulario blanco con bordes amarillos y pie amarillo por columnas.

Las medidas de cada componente se convierten a píxeles para no cambiar el tamaño raíz de las utilidades del modo Original. No se importan el reset de WordPress, el código de analítica, formularios ajenos ni dependencias completas de los sitios de referencia.

### Adaptaciones explícitas

- Se mantienen nombre, datos, formación, experiencia y enlaces del portafolio; no se incorporan textos corporativos, contactos comerciales ni catálogos ajenos.
- Los símbolos de marca de las empresas se sustituyeron por un **monograma JA propio**, dibujado para este portafolio y compartido por las tres cabeceras, pies de las variantes y avatar de contacto. Su vector maestro es `img/brand/jose-acosta-mark.svg`; el favicon usa una A simplificada.
- Los nombres, las capturas de proyectos y los iconos de plataformas/tecnologías conservan su función de referencia o enlace; no se usan como marca personal.
- `favicon.ico` y la ruta heredada `img/fav.ico` usan una única **A** blanca y sólida sobre fondo oscuro, definida en `img/brand/favicon.svg`, con imágenes de 16, 32, 48, 64, 128 y 256 px en un ICO real. El monograma JA del resto del sitio se conserva. Las siete páginas declaran las variantes ICO/SVG con rutas absolutas, también válidas desde una URL de error anidada.
- El banner inicial «José Acosta / JA.» es la excepción visual aprobada, con el nuevo video de programación detrás.
- El selector de diseños y los botones accesibles de vista previa son controles propios del portafolio.
- Todos los selectores flotantes se centran verticalmente; solo Original muestra texto, A/B/C mantienen su estilo propio con un icono y nombre accesible.
- Solo en B, Habilidades se integra como subsección de Sobre mí, conservando `#skills` y pasando su acceso de menú al submenú del perfil. Al cambiar de diseño vuelve a ser una sección independiente, con su jerarquía de títulos original.
- Se conservan Escape, foco de teclado, modales accesibles y preferencia de movimiento reducido. Los colores amarillos sobre blanco de los títulos de Tecnofil se reproducen por fidelidad: **no se afirma conformidad WCAG AA del esquema original**.
- Las ilustraciones y las fuentes de referencia no se presentan como recursos con licencia libre. Este documento registra su procedencia; para reutilizarlas fuera de esta demostración debe verificarse la autorización correspondiente. El monograma personal no utiliza trazados de los logos de las empresas.

## Video de programación

- Clip: **Software developer working on code, screen close up**, Mixkit #1728.
- Página del recurso: <https://mixkit.co/free-stock-video/software-developer-working-on-code-screen-close-up-1728/>
- Licencia indicada por la ficha del clip: **Mixkit Stock Video Free License**, <https://mixkit.co/license/#videoFree>.
- Archivo fuente indicado por esa ficha: `https://assets.mixkit.co/videos/1728/1728-720.mp4`.
- Póster: `https://assets.mixkit.co/videos/1728/1728-thumb-720-0.jpg`.
- Copia optimizada: `media/coding-banner.mp4`, 18 s, 1280 × 720, H.264, 24 fps, sin audio, `faststart`, unos 660 KiB.
- Póster local: `img/references/coding-poster.jpg`.

Se descarga y reproduce únicamente al activar Tecnofil. Se pausa fuera de pantalla, al ocultar la pestaña y al cambiar de diseño. El usuario puede pausar/reanudar; con movimiento reducido o ahorro de datos no se reproduce automáticamente.

## Implementación

- `css/themes.css`: primitivas compartidas, modo Original y composición aprobada del banner.
- `css/references.css`: reglas de los componentes de cada sitio, aisladas por `data-design`.
- `js/reference-designs.js`: estructura de referencia, canvas, puntero, cabecera, menú, galería, video, animaciones de entrada y contacto flotante.
- `js/index.js`: selector, ciclo de vida de Swiper en Original y C, navegación común, formularios y modales.
- `js/theme-init.js`: selección persistente antes de pintar.

## Modo C — referencia institucional

- Sitio inspeccionado: <https://cef.pucp.edu.pe/>, el **19 de octubre de 2026**.
- Hoja consultada: `https://cef.pucp.edu.pe/wp-content/themes/pucp-cef/style.css?ver=0.1.6`.
- Estructura adaptada: barra auxiliar y navegación principal sobre fondo `#0D0022`, banner `#00274F` dividido entre texto e imagen, títulos serif, controles circulares con indicadores lineales, proyectos en carrusel, secciones claras y pie en columnas.
- Tipografías: Roboto y Source Serif 4, obtenidas de Google Fonts. No se distribuye la fuente de iconos Pro del sitio de referencia.
- El banner tiene tres diapositivas del portafolio, botones anterior/siguiente, indicadores, navegación por flechas y anuncio de posición. No avanza automáticamente.
- Se utilizan el monograma JA, datos de contacto y contenido propios. No se descargan logos, afiches, fotografías institucionales, analítica, WordPress ni scripts de la universidad.
- Las imágenes del banner son recursos locales ya presentes y `img/brand/technology-core.svg`, una ilustración propia creada para este proyecto.
- Cabecera contrastada también con <https://cef.pucp.edu.pe/en/>: barra auxiliar de 53 px que desaparece al desplazar y fila principal de 100 px que permanece adherida arriba; contenido de 1170 px, logo de 60 px y enlaces Roboto de 18 px (16 px en escritorio estrecho). A 920 px o menos se oculta la barra auxiliar y se muestran búsqueda y menú, sin bordes decorativos.
- El menú móvil tiene fondo negro, navegación de 18 px y enlaces secundarios. Se conserva el cierre con Escape y el manejo del foco. Los saltos de sección descuentan la altura visible de la cabecera fija.
- La lupa abre una búsqueda local real de las secciones y páginas del portafolio, con filtro que admite acentos, enlaces navegables y diálogo nativo accesible. No se añaden controles ES/EN ficticios: el contenido del portafolio permanece en español.

## Original — interfaz tecnológica

- Paleta propia: negro azulado `#070D12`, paneles `#0D171F`, acento menta/cian `#6DEBC8`, tipografías Space Grotesk e IBM Plex Mono.
- Portada asimétrica, retícula técnica, panel de visualización, indicadores de especialidad y secciones numeradas. Las habilidades se muestran como herramientas, sin porcentajes de dominio arbitrarios en este modo.
- La franja superior y el panel con pestañas se eliminaron. El campo de partículas ocupa el fondo completo de la portada, con 42–126 nodos según el tamaño: el mouse los atrae e ilumina y un clic/toque en el fondo genera una onda. Un botón en primer plano permite activar el mismo efecto con Enter y Espacio. La capa gráfica no captura eventos ni bloquea los enlaces; una capa oscura mantiene la legibilidad del texto.
- El Canvas limita la densidad a 2 y solo anima al interactuar; se detiene al estabilizarse, salir de pantalla, ocultar la pestaña o cambiar de diseño. Con movimiento reducido la respuesta es inmediata y las ondas son estáticas. Incluye una alternativa SVG si Canvas no está disponible. Solo aparece en Original; se conserva la ilustración del banner C.
- `css/modern-designs.css` y `js/modern-designs.js` contienen ambos modos, aislados por `data-design`. Están integrados en la portada y en las cuatro páginas profesionales internas.
