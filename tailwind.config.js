const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/components/*.{html,tsx,ts,js}',
    './src/views/*.{html,tsx,ts,js}',
    './src/scripts/*.{html,tsx,ts,js}',
    './src/*.html'
  ],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        mint: {
          50: '#DAF2E3',
          100: '#BBDBC7',
          200: '#9EC3AD',
          300: '#83AB93',
          400: '#6B947B',
          500: '#547C64',
          600: '#40654F',
          700: '#2D4D3A',
          800: '#1D3627',
          900: '#0F1E15',
        },
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
