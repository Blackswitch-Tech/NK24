const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        libre: [' Protest Guerrilla ', ...defaultTheme.fontFamily.sans],
        neu:['Bebas Neue', ...defaultTheme.fontFamily.sans],
        pop:['Poppins', ...defaultTheme.fontFamily.sans],
        aurora:['Aurora', ...defaultTheme.fontFamily.sans],
        milk:['Milk', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        
        sm: '480px',
      
      },
    },
  },
  plugins: [require("daisyui")],
});