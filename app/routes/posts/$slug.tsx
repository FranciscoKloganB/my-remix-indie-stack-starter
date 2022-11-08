import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/server-runtime/dist/router"

import { getPost } from "~/models/post.server"

type LoaderData = {
  post: Awaited<ReturnType<typeof getPost>>
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params

  if (slug) {
    const post = await getPost(slug)
    return json({ post })
  }

  return null
}

export default function PostRoute() {
  const { post } = useLoaderData<LoaderData>()

  if (!post) {
    throw new Error("PostRoute needs to deal with unexisting posts.")
  }

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
    </main>
  )
}
