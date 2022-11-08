module.exports = {
  "*.{js,jsx,ts,tsx}": [
    'eslint --fix --ext "**/*.{js,jsx,ts,tsx}"',
    'prettier --write "**/*.{js,jsx,ts,tsx}"'
  ],
  "*.prisma": ['prettier --write "**/*.prisma"'],
  "*.{css,json,scss,sass}": ['prettier --write "**/*.{css,json,scss,sass}"']
}
