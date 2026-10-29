/* Apply the saved design before painting, including on internal pages. */
(function () {
  var design = 'original';
  try {
    design = localStorage.getItem('ja-design') || design;
    if (design === 'classic') design = 'original';
    if (design === 'atelier') design = 'contrast';
  } catch (error) { /* Storage may be disabled; the default remains usable. */ }
  design = ['original', 'network', 'contrast', 'campus'].includes(design) ? design : 'original';
  document.documentElement.dataset.design = design;
  // Start only the selected theme's first-screen fonts, before the stylesheet parses.
  var fonts = {
    original: ['space-grotesk-latin-wght-normal.woff2', 'ibm-plex-mono-latin-400-normal.woff2'],
    network: ['lato-latin-400-normal.woff2'],
    campus: ['roboto-latin-wght-normal.woff2', 'source-serif-4-latin-wght-normal.woff2'],
  };
  (fonts[design] || []).forEach(function (file) {
    var link = document.createElement('link');
    link.rel = 'preload'; link.as = 'font'; link.type = 'font/woff2';
    link.crossOrigin = 'anonymous'; link.href = '/fonts/local/' + file;
    document.head.appendChild(link);
  });
})();
