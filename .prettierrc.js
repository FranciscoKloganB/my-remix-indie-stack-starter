module.exports = {
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^~/(.*)$", "", "^[./]", "^[../]", ""],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxBracketSameLine: false,
  plugins: [".prettier-plugins.js"],
  printWidth: 88,
  semi: false,
  singleQuote: false,
  trailingComma: "none"
}
