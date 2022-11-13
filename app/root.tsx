import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react"

import { publicConfig } from "./env/env.server"
import { getUser } from "./session.server"
import tailwindStylesheetUrl from "./styles/global.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1"
})

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
  environ: ReturnType<typeof publicConfig>
}

export async function loader({ request }: LoaderArgs) {
  return json<LoaderData>({
    user: await getUser(request),
    environ: publicConfig()
  })
}

export default function App() {
  const data = useLoaderData<LoaderData>()

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.environ = ${JSON.stringify(data.environ)}`
          }}
        />
        <LiveReload />
      </body>
    </html>
  )
}
