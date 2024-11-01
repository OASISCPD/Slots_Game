/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowMain: "#FFFF00",
        redMain: "#FF0000",
        grayMain: "#b5b1b1",
        greenMain: "#29FD2F",
        greenDark: "#1D9D22",
        blueMain: "#023e8a",
        roseMain: '#fd27f1',
        purpleMain: "#5D0057",
        backgroundRed: '#45001C',
        violetMain: '#69005B',
        roseRedMain: '#C70057',
        magentaMain: '#FF008D',
        fuchsiaMain: '#FF03FF'
      }
    },
  },
  plugins: [],
}