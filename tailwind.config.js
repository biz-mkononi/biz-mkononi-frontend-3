module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        72: '12rem',
        100: '25rem',
        36: '6.7rem',
        38: '10rem',
        30: '5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
