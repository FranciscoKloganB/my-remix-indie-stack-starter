import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { getPostListings } from "~/models/post.server"
import { useOptionalAuthUser } from "~/utils"

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>
}

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings()

  return json<LoaderData>({ posts })
}

export default function PostsRoute() {
  const { posts } = useLoaderData<LoaderData>()

  const { isAdmin } = useOptionalAuthUser()

  return (
    <main>
      <h1>Posts</h1>
      {isAdmin && (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} prefetch="intent" className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
