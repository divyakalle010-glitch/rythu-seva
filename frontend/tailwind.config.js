module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#166534',
        'secondary-teal': '#0F766E',
        'tracking-blue': '#0284C7',
        'light-grey': '#F1F5F9',
        'dark-text': '#172033',
        'secondary-text': '#64748B',
        'warning-orange': '#F59E0B',
        'error-red': '#DC2626',
        'success-green': '#16A34A'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'xs': '360px',
      }
    },
  },
  plugins: [],
};
