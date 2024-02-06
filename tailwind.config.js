const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        libre: [' Protest Guerrilla ', ...defaultTheme.fontFamily.sans],
        neu:['Bebas Neue', ...defaultTheme.fontFamily.sans],
        pop:['Poppins', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
});