const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        ['Inter', ...defaultTheme.fontFamily.sans],
        {
          fontFeatureSettings: '"cv11"'
        }
      ]
    },
    extend: {
      colors: {
        background: '#fff',
        input: 'rgb(9 9 11 / 15%)',
        primary: {
          DEFAULT: 'rgb(9 9 11)',
          light: '#fff'
        },
        secondary: {
          DEFAULT: 'rgb(113 113 122)',
          light: 'rgb(9 9 11 / 2.5%)'
        },
        accent: {
          DEFAULT: 'rgb(9 9 11 / 10%)',
          light: 'rgb(9 9 11 / 5%)'
        },
        error: '#dc2626'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')]
}
