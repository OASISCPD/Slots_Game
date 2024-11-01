/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowMain: "#FFFF2B",
        redMain: "#FF0000",
        grayMain: "#b5b1b1",
        greenMain: "#29FD2F",
        greenDark: "#1D9D22",
        blueMain: "#023e8a",
        roseMain: '#fd27f1',
        purpleMain: "#5D0057",
        violetMain: '#45001C',
        roseRedMain: '#C70057',
        magentaMain: '#FF008D',
        fuchsiaMain: '#FF03FF'
        /*  magentaMain:'#FF' */
      }
    },
  },
  plugins: [],
}