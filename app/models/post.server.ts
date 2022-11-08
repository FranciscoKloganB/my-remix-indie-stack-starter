import { prisma } from "~/db.server";
import type { IPost } from "~/interfaces/post.interfaces";

export async function getPostListings(): Promise<
  Pick<IPost, "slug" | "title">[]
> {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
}

export async function getPosts(): Promise<IPost[]> {
  return prisma.post.findMany();
}
