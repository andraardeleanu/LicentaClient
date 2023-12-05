/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['nunito', 'sans-serif'],
        roboto: ['roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};
