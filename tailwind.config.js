module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        100: '25rem',
        36: '6.7rem',
        38: '10rem',
        30: '5rem',
      },
      colors: {
        bizLightBlue: '#bbe1fa',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')],
}
