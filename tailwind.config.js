const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   content: ['./*/*.html', ],
//   theme: {
//     extend: {},
//     fontFamily: {
//       sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
//     },
//   },
//   plugins: [],
// } 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'slider-bg-1': "url('assets/images/rapair-service-man.png')",
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      'blackOps': ["Black Ops One", "serif"]
    }
  },
  plugins: [],
}
