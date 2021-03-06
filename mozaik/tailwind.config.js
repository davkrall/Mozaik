const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {

      stroke: ['hover', 'focus'],

      colors: {
        purple: "#6951F6",
        black: "#000000",
        white: "#FFFFFF",
        grey: "#EFEFEF",
        darkgrey: "#8F8F8F"
      },

      outline: {
        black: '1px solid #000000',
      },

      margin: {
        med: '120px',
      },

      height: {
        lg: '500px'
      },

      variants: {
        fill: ['hover', 'focus'],
      },

      fontFamily: {
        display: ['DM Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },

      screens: {
        sm: '375px',
        md: '796px',
        lg: '1024x',
        xl: '1440px',
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
