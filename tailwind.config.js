/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                bounce: "bounce 1.25s linear infinite"
            },
            backgroundImage: () => ({
                "banner-img": "url('/city_night.jpg')"
            }),
            colors: {
                primary: colors.red["500"],
                secondary: colors.purple["500"],
                /* project colors */
                ml: "#a6cee3",
                data: "#ff7f0e"
            }
        },
        fontFamily: {
            display: ["Quicksand"],
            body: ["Quicksand"],
            Oxygen: ["Oxygen", "sans-serif"]
        }
    },
    plugins: []
};
