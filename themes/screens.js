const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
  "3xl": 1536
}

/**
 * Builds an object that can be passed to `.storybook/preview#parameters.viewport.viewports`
 *
 * @param {typeof breakpoints} appBreakpoints
 * @returns {Record<string, any>}
 */
function buildStorybookViewports(appBreakpoints) {
  return Object.fromEntries(
    Object.entries(appBreakpoints).map(
      (
        [/** @type {keyof typeof breakpoints>} */ key, /** @type {number} */ value],
        i
      ) => [
        key,
        {
          name: key,
          styles: {
            width: `${value}px`,
            height: `${(i + 5) * 10}vh`
          }
        }
      ]
    )
  )
}

/**
 * Builds an object that can be passed to `tailwind.config.js#theme.screens`
 *
 * @param {typeof breakpoints} appBreakpoints
 * @returns {Record<keyof typeof breakpoints, string>}
 */
function buildTailwindScreens(appBreakpoints) {
  /** @type {Record<string, string>} */
  const screens = {}

  Object.entries(appBreakpoints).forEach(
    ([/** @type {keyof typeof breakpoints>} */ key, /** @type {number} */ value]) => {
      screens[key] = `${value}px`
    }
  )

  return screens
}

module.exports = {
  breakpoints,
  buildTailwindScreens,
  buildStorybookViewports
}
