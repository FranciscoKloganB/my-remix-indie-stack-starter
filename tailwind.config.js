/** @type {import('tailwindcss').Config} */

const palette = require("./themes/palette")
const screens = require("./themes/screens")

// Uncomment once plugin is installed to support theming and add to plugins array as `tailwindcssThemer()`
// const tailwindcssThemer = require("./themes/themer")

/**
 * TODO: @xiasantos
 *
 * Add fonts here and other variables for the project here.
 * See example: https://tailwindcss.com/docs/font-family#using-custom-values
 * Complex things can go into folder ./themes, see ./themes/palette.js
 */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: "class",
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
  theme: {
    extend: {
      colors: { ...palette.colors },
      height: {
        "screen-1/4": "25vh",
        "screen-1/3": "33vh",
        "screen-2/5": "40vh",
        "screen-1/2": "50vh",
        "screen-3/5": "60vh",
        "screen-2/3": "66vh",
        "screen-4/5": "80vh"
      },
      zIndex: {
        // Use with caution - Only really useful for modals or other elements that must be above every other
        "1k": "1000",
        "2k": "2000"
      }
    },
    screens: {
      // The application only grows margins beyond 1536px
      ...screens.buildTailwindScreens(screens.breakpoints)
    }
  }
}
