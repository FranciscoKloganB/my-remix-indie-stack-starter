import { prisma } from "~/db.server"
import type { IPost } from "~/interfaces/post.interfaces"

export async function getPosts(): Promise<IPost[]> {
  return prisma.post.findMany()
}
