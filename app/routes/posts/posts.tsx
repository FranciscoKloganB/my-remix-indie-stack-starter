import { Outlet } from "@remix-run/react"

export default function PostsRoute() {
  return <Outlet />
}

export function ErrorBoundary({ error }: { error: unknown }) {
  console.error("Posts route or one it's children faced an unexpected error", error)

  return (
    <div>
      <p>{`Something went wrong. Please come back later.`}</p>
      {error instanceof Error ? <pre>{error.message}</pre> : null}
    </div>
  )
}
