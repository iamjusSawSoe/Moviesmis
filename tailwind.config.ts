/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1b222a",
        secondary: "#7C9DC2",
        dimSecondary: "#e3dde7",
        whiteColor: "#E2F1F0",
        dimWhite: "#adbab9",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        dimBlack: "rgba(0,0,0,0.4)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        lmd: "868px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
      boxShadow: {
        "3xl": "0 0 25px #7C9DC2",
        "5xl": "0 0 40px #7C9DC2",
        more: "0 0 15px #7C9DC2",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
        mobileAuto: "repeat(auto-fill, minmax(157px, 1fr))",
      },
    },
  },
  plugins: [],
};
