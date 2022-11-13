import invariant from "tiny-invariant"

/**
 * Do not include any value that you wish to keep as secret
 *
 * This publicConfig is used to inject environment variables to the client side
 */
export function publicConfig() {
  invariant(process.env.ADMIN_EMAIL, "ADMIN_EMAIL should be defined")

  return {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
  }
}

type PublicConfig = ReturnType<typeof publicConfig>

declare global {
  var environ: PublicConfig
  interface Window {
    environ: PublicConfig
  }
}
