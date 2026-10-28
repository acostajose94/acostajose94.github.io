/* Apply the saved design before painting, including on internal pages. */
(function () {
  var design = 'original';
  try {
    design = localStorage.getItem('ja-design') || design;
    if (design === 'classic') design = 'original';
    if (design === 'atelier') design = 'contrast';
  } catch (error) { /* Storage may be disabled; the default remains usable. */ }
  document.documentElement.dataset.design = ['original', 'network', 'contrast', 'campus'].includes(design) ? design : 'original';
})();
