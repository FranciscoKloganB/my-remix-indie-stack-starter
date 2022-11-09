import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { marked } from "marked"

import { isClientSide } from "./isClientSide"

type MarkedSanitizedOptions = {
  markedOpts?: marked.MarkedOptions
  dompurifyConfig?: DOMPurify.Config & {
    RETURN_TRUSTED_TYPE: true
  }
}

export function markedSanitized(src: string, options: MarkedSanitizedOptions = {}) {
  const markdown = marked(src, options.markedOpts)

  const window = isClientSide() ? global.window : new JSDOM("").window
  const purify = DOMPurify(window as unknown as Window)

  let clean
  if (options.dompurifyConfig) {
    clean = purify.sanitize(markdown, options.dompurifyConfig)
  } else {
    clean = purify.sanitize(markdown)
  }

  return clean
}
