/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontSize: {
        'hero-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-tablet': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-desktop': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      maxWidth: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1200px',
      },
      gridTemplateColumns: {
        'mobile': 'repeat(1, 1fr)',
        'tablet': 'repeat(2, 1fr)',
        'desktop': 'repeat(3, 1fr)',
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
};
