const path = require("path")
const fs = require("fs")

/**
 * Fix node package resolution from within storybook
 */
function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath))

  while (true) {
    if (fs.existsSync(path.join(currDir, "package.json"))) {
      return currDir
    }

    const { dir, root } = path.parse(currDir)

    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      )
    }

    currDir = dir
  }
}

module.exports = getPackageDir
