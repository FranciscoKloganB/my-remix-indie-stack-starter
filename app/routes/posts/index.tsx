import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

interface IPost {
  slug: string
  title: string
}

export const loader = async () => {
  const posts: IPost[] = [
    {
      slug: "is-tracking-expenses-important",
      title: "Is tracking expenses is important?"
    },
    {
      slug: "why-use-green-couch",
      title: "Why use Green Couch"
    }
  ]

  return json({ posts })
}

export default function PostsRoute() {
  const { posts } = useLoaderData()

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: IPost) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
