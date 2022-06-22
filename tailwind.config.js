/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            // colors: {
            //     accent: {
            //         50: "#f0f9ff",
            //         100: "#e0f2fe",
            //         200: "#bae6fd",
            //         300: "#7dd3fc",
            //         400: "#38bdf8",
            //         500: "#0ea5e9",
            //         600: "#0284c7",
            //         700: "#0369a1",
            //     },
            // },
            colors: {
                accent: colors.teal,
            },
        },
    },
    plugins: [],
};
