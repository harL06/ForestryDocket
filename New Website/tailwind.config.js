/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#5267DF",
        "custom-red": "#FA5959",
        "custom-blue": "#5267DF",
        "custom-grey": "#9194A2",
        "custom-white": "#F7F7F7",
        "custom-green": "#6F8A5E",
        "custom-black": "#1A1E1A",
        "custom-lightgreen": "#839E71"
      }
    },
    fontFamily: {
      Urbanist: ["Urbanist, sans-serif"]
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      }
    },
  },
  plugins: [],
}

