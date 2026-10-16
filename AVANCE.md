# Avance del rediseño del portafolio

## Estado

Implementados tres modos de presentación con el contenido del portafolio:

1. **Original** — conserva el diseño violeta actual.
2. **Sistemas Perú Web** — reproduce su lenguaje visual: Lato, navegación blanca, azul `#3161A3`, cian `#00F8FF`, pie azul `#004C91` y portada con red animada interactiva en `#32E4B0`.
3. **Tecnofil** — reproduce su lenguaje visual: HelveticaNeueLTStd, amarillo `#FFDB00`, cabecera compacta con menú desplegable, portada audiovisual y cursor circular con estados de escala, contraste, suma y cierre.

El botón fijo a la derecha recorre los tres modos. La opción queda guardada en `localStorage` y se mantiene al navegar por las páginas internas. Las variantes conservan perfil, habilidades, formación, proyectos, aplicaciones, experiencia y contacto.

## Archivos principales

- `index.html`: selector, contenido común y recursos de portada.
- `css/themes.css`: estilos de las dos referencias; valores de color y tipografías comprobados en los sitios originales.
- `css/index.css`: estilos base del modo Original.
- `js/index.js`: alternancia persistente, animación de nodos/circuitos, estados del cursor y menú.
- `fonts/HelveticaNeueLTStd-Lt.otf` y `fonts/HelveticaNeueLTStd-Bd.otf`: tipografías de Tecnofil alojadas localmente.

El modo Tecnofil utiliza como portada su video y su imagen de póster de origen. El modo Sistemas Perú Web dibuja la red en canvas y reacciona al puntero y a los clics.

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
- Comprobación funcional del ciclo Original → Sistemas Perú Web → Tecnofil → Original.
- Comprobados por DOM los colores, la cabecera, el canvas, la visibilidad del cursor, la apertura del menú y la persistencia de la selección.

## Probar localmente

Desde la raíz del proyecto:

```powershell
python -m http.server 8000
```

Abre `http://localhost:8000/` y pulsa el selector fijo a la derecha para cambiar de presentación.
