/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [require("daisyui", "flowbite/plugin")],
};
