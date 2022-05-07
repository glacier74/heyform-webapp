module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        'Public Sans',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    extend: {
      colors: {
        blue: {
          500: '#0252D7',
          600: '#0052CC'
        },
        grey: {
          900: '#111'
        },
      }
    }
  },

  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
