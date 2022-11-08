const sortTwClasses = require("prettier-plugin-tailwindcss")
const sortImportsPlugin = require("@ianvs/prettier-plugin-sort-imports")

module.exports = {
  parsers: {
    typescript: {
      ...sortTwClasses.parsers.typescript,
      preprocess: sortImportsPlugin.parsers.typescript.preprocess
    }
  },
  options: {
    ...sortImportsPlugin.options
  }
}
