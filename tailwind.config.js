const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/components/*.{html,tsx,js}',
    './src/views/*.{html,tsx,js}',
    './src/scripts/*.{html,tsx,js}',
    './src/index.html'
  ],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        scheme: {
          1: colors.gray[50],
          2: colors.gray[100],
          3: colors.gray[200],
          4: colors.gray[300],
          5: colors.gray[400]
        },
        primary: {
          1: colors.red[700],
          2: colors.red[600],
          3: colors.red[500],
          4: colors.red[400],
          5: colors.red[300]
        },
        onscheme: {
          1: colors.black,
          2: colors.black,
          3: colors.black,
          4: colors.black,
          5: colors.black
        },
        onprimary: {
          1: colors.white,
          2: colors.white,
          3: colors.white,
          4: colors.white,
          5: colors.black
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
