const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
    },
    extend: {
    }
  },

  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
