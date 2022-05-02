module.exports = {
  content: [
    './src/components/*.{html,tsx,js}',
    './src/views/*.{html,tsx,js}',
    './src/scripts/*.{html,tsx,js}',
  ],
  theme: {
    darkMode: 'class',
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
