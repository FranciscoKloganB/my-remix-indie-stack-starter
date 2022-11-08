// @ts-check
import React from "react"

import themes from "../themes/screens"

import "../app/styles/tailwind.css"

/**
 * This could be used to add Remix wrappers or Auth providers (e.g.: Auth0, React-Query)
 *
 *(Story) => (
 *   <AuthProvider>
 *     <Story />
 *   </AuthProvider>
 */
const decorators = [(Story) => <Story />]

const parameters = {
  /** Storybook */
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: "centered",
  viewMode: "docs",
  viewport: { viewports: themes.buildStorybookViewports(themes.breakpoints) }
  /** Internationalization - Remember to import i18n object from "../i18n.config"*/
  // i18n,
  // locale: "en",
  // locales: {
  //   en: "English",
  //   pt: "Portuguese"
  // },
  // default: "light"
}

export { decorators, parameters }
