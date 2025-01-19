/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#4C4DDC",
        primaryBackground: "#FFFFFF",
        BlueBackground: "#E4E4FA",
        text: "#101010",
        secondaryBlue: "#C8C8F4",
        secondaryBackground: "#E1E1E1",
        gray: "#6b7280",
      },
    },
  },
  plugins: [],
};
