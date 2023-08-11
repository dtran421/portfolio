/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: ["class"], // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1.25s linear infinite",
      },
      backgroundImage: () => ({
        "banner-img": "url('/city_night.jpg')",
      }),
      colors: {
        primary: colors.red["500"],
        secondary: colors.purple["600"],
      },
    },
    fontFamily: {
      display: ["Quicksand"],
      body: ["Quicksand"],
      Oxygen: ["Oxygen", "sans-serif"],
    },
  },
  plugins: [],
};
