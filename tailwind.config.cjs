module.exports = {
  content: [
    './index.html', './404.html', './portafolio/index.html',
    './experiencia/index.html', './estudios/index.html', './contacto/index.html',
    './js/index.js', './js/reference-designs.js', './js/modern-designs.js',
  ],
  theme: {
    extend: {
      colors: { slate: { 950: '#020617' } },
      animation: {
        gradient: 'gradient 3s ease infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
};
