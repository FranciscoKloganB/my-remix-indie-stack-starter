import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { IPost } from "~/interfaces/post.interfaces";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  const posts = await getPosts();

  return json({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData();

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
  );
}
