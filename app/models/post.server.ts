import type { Post } from "@prisma/client"

import { prisma } from "~/db.server"

export function getPostListings() {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true
    }
  })
}

export function getPosts() {
  return prisma.post.findMany()
}

export function getPost(slug: Post["slug"]) {
  return prisma.post.findUnique({
    where: {
      slug
    }
  })
}

export function createPost(post: Pick<Post, "slug" | "title" | "markdown">) {
  return prisma.post.create({ data: post })
}

export function updatePost(
  slug: string,
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.update({ data: post, where: { slug } })
}
