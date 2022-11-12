const { e } = require("vitest/dist/index-220c1d70")

const basePalette = {
  "primary-100": "#00bca4",
  "primary-200": "#00a892",
  "primary-300": "#009481",
  "primary-400": "#008170",
  "primary-500": "#006d5f",
  "primary-600": "#00463d", // Figma primary reference (lightest)
  "primary-700": "#00322c",
  "primary-800": "#0f3433", // Figma primary reference
  "primary-900": "#001e1d", // Figma primary reference (darkest)
  "secondary-100": "#eaf4f1",
  "secondary-200": "#deede8",
  "secondary-300": "#d1e6e0",
  "secondary-400": "#c4dfd7",
  "secondary-500": "#b8d8cf",
  "secondary-600": "#abd1c6", // Figma secondary reference
  "secondary-700": "#9ecabd",
  "secondary-800": "#92c3b5",
  "secondary-900": "#85bcac",
  "tertiary-100": "#f1b3b4",
  "tertiary-200": "#eea3a4",
  "tertiary-300": "#ea9293",
  "tertiary-400": "#e78283",
  "tertiary-500": "#e47172",
  "tertiary-600": "#e16162", // Figma tertiary reference
  "tertiary-700": "#de5152",
  "tertiary-800": "#db4041",
  "tertiary-900": "#d83031",
  "neutral-100": "#fffffe", // Figma neutral reference (lightest)
  "neutral-200": "#e8e4e6", // Figma neutral reference
  "neutral-300": "#caccca",
  "neutral-400": "#c0c2c0",
  "neutral-500": "#b6b9b6",
  "neutral-600": "#acafac", // Figma neutral reference (darkest)
  "neutral-700": "#a2a5a2",
  "neutral-800": "#989c98",
  "neutral-900": "#848884"
}

const semanticPalette = {
  "primary-light": basePalette["primary-600"],
  "primary-normal": basePalette["primary-800"],
  "primary-dark": basePalette["primary-900"],
  "secondary-normal": basePalette["secondary-600"],
  "neutral-light": basePalette["neutral-100"],
  "neutral-normal": basePalette["neutral-200"],
  "neutral-dark": basePalette["neutral-600"]
}

const error = "#cb4747"
const success = "#79b869"

const highlight = "#f9bc60"

const warning = highlight
const danger = error

module.exports = {
  colors: {
    ...basePalette,
    ...semanticPalette,
    danger,
    error,
    highlight,
    success,
    warning
  }
}
