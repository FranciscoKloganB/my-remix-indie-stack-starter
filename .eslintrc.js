/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "prettier",
    "plugin:storybook/recommended"
  ],
  env: {
    "cypress/globals": true
  },
  plugins: ["cypress", "no-only-tests"],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it means we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 28
    }
  },
  rules: {
    curly: "error",
    quotes: [
      "error",
      "double",
      {
        avoidEscape: false,
        allowTemplateLiterals: true
      }
    ],
    "max-len": [
      "error",
      {
        code: 88,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true
      }
    ],
    "no-only-tests/no-only-tests": "error"
  }
}
