import type { IPost } from "~/interfaces/post.interfaces"

export async function getPosts(): Promise<IPost[]> {
  return [
    {
      slug: "is-tracking-expenses-important",
      title: "Is tracking expenses is important?"
    },
    {
      slug: "why-use-green-couch",
      title: "Why use Green Couch"
    }
  ]
}
