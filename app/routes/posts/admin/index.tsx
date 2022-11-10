import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"

export const loader: LoaderFunction = async ({ request }) => {
  return json({})
}

export default function AdminIndexRoute() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  )
}
