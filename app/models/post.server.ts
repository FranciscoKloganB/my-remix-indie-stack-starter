import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export function getPostListings() {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
}

export function getPosts() {
  return prisma.post.findMany();
}

export function getPost(slug: Post["slug"]) {
  return prisma.post.findUnique({
    where: {
      slug,
    },
  });
}
