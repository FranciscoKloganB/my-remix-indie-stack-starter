import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/server-runtime/dist/router"

import { markedSanitized } from "~/helpers/markedSanitized"
import { getPost } from "~/models/post.server"

type LoaderData = { title: string; html: string }

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params

  if (slug) {
    const post = await getPost(slug)
    const html = markedSanitized(post?.markdown ?? "")

    return json({ title: post?.title, html })
  }

  return null
}

export default function PostRoute() {
  const { title, html } = useLoaderData<LoaderData>()

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </main>
  )
}
