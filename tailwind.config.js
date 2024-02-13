const colors = require('tailwindcss/colors');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}
function colorFamily(name) {
  return ({ opacityValue, shade }) => {}
}

module.exports = {
  darkMode: 'class',
  content: [
    './src/scripts/components/{*,**/*}.{html,tsx,ts,js,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk}',
    './src/_includes/scripts/{*,**/*}.{html,tsx,ts,js,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk}',
    './src/_includes/*.{html,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk}',
    './src/_includes/components/{*,**/*}.{html,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk,ts}',
    './src/_includes/scripts/components/{*,**/*}.{html,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk,ts}',
    './src/*.{html,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk}',
    './src/bridges/*.{html,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk}',
    './src/_includes/components/theme-switcher/lda-theme-tile.webc',
    './src/posts/{*,**/*}.{html,11ty.jsx,11ty.ts,11ty.tsx,mdx,md,webc,njk,ts}'
  ],
  theme: {
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
          1: withOpacityValue('--scheme-1'),
          2: withOpacityValue('--scheme-2'),
          3: withOpacityValue('--scheme-3'),
          4: withOpacityValue('--scheme-4'),
          5: withOpacityValue('--scheme-5'),
        },
        primary: {
          1: withOpacityValue('--primary-1'),
          2: withOpacityValue('--primary-2'),
          3: withOpacityValue('--primary-3'),
          4: withOpacityValue('--primary-4'),
          5: withOpacityValue('--primary-5'),
        },
        onscheme: {
          1: withOpacityValue('--onscheme-1'),
          2: withOpacityValue('--onscheme-2'),
          3: withOpacityValue('--onscheme-3'),
          4: withOpacityValue('--onscheme-4'),
          5: withOpacityValue('--onscheme-5'),
        },
        onprimary: {
          1: withOpacityValue('--onprimary-1'),
          2: withOpacityValue('--onprimary-2'),
          3: withOpacityValue('--onprimary-3'),
          4: withOpacityValue('--onprimary-4'),
          5: withOpacityValue('--onprimary-5'),
        },
        // scheme: {
        //   1: colors.gray[50],
        //   2: colors.gray[100],
        //   3: colors.gray[200],
        //   4: colors.gray[300],
        //   5: colors.gray[400]
        // },
        // primary: {
        //   1: colors.red[700],
        //   2: colors.red[600],
        //   3: colors.red[500],
        //   4: colors.red[400],
        //   5: colors.red[300]
        // },
        // onscheme: {
        //   1: colors.black,
        //   2: colors.black,
        //   3: colors.black,
        //   4: colors.black,
        //   5: colors.black
        // },
        // onprimary: {
        //   1: colors.white,
        //   2: colors.white,
        //   3: colors.white,
        //   4: colors.white,
        //   5: colors.black
        // },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
